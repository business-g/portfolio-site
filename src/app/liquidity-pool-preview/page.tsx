"use client";

import { Liveline, type LivelinePoint } from "liveline";
import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const timeFilters = ["1H", "1D", "1W", "1M", "1Y"] as const;
const categoryFilters = ["Price", "Volume", "Liquidity"] as const;
const categoryWidths = [56, 71, 78];
const timeWidths = [39, 39, 42, 41, 38];
const poolAddress = "0x2bd7...298af";

type Timeframe = (typeof timeFilters)[number];
type Category = (typeof categoryFilters)[number];

type VolumePoint = {
  label: string;
  dateLabel: string;
  fees: number;
  value: number;
};

type VolumeDataset = {
  range: string;
  points: VolumePoint[];
  xLabels: string[];
  yMax: number;
};

type PriceDataset = {
  points: number[];
  range: string;
  xLabels: string[];
};

type ChartModel = {
  headline: string;
  range: string;
  points: VolumePoint[];
  xLabels: string[];
  yAxis: string[];
  yMin: number;
  yMax: number;
  valueLabel: string;
  formatValue: (value: number) => string;
};

type BarHitboxStyle = CSSProperties & {
  "--bar-width": string;
  "--hover-left-extension": string;
};

type BarStyle = CSSProperties & {
  "--bar-index": number;
};

type LiquidityBinStyle = CSSProperties & {
  "--bin-index": number;
};

type PriceHoverPoint = {
  time: number;
  value: number;
  x: number;
  y: number;
};

type LiquidityBin = {
  ethAmount: number;
  isActive: boolean;
  liquidity: number;
  lowerPrice: number;
  primaryShare: number;
  tokenSymbol: "ETH" | "USDT";
  tone: "active" | "eth" | "usdt";
  upperPrice: number;
  usdtAmount: number;
};

const volumeDatasets: Record<Timeframe, VolumeDataset> = {
  "1H": {
    range: "Jun 10, 2026, 13:00 - 14:00",
    yMax: 1_600_000,
    xLabels: ["13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00"],
    points: [
      360_000, 410_000, 530_000, 650_000, 840_000, 930_000, 1_180_000, 960_000,
      820_000, 1_050_000, 1_360_000, 940_000,
    ].map((value, index) => {
      const minutes = index * 5;
      const label = `${13 + Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

      return {
        label,
        dateLabel: `Jun 10, 2026, ${label}`,
        fees: makeMockFees(value, index),
        value,
      };
    }),
  },
  "1D": {
    range: "Jun 10, 2026",
    yMax: 16_000_000,
    xLabels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    points: [
      5_400_000, 4_900_000, 4_200_000, 3_800_000, 4_600_000, 5_800_000,
      7_300_000, 6_500_000, 8_100_000, 9_400_000, 7_900_000, 6_700_000,
      8_800_000, 11_300_000, 13_900_000, 10_600_000, 9_500_000, 8_200_000,
      7_700_000, 9_100_000, 12_400_000, 10_900_000, 8_600_000, 7_200_000,
    ].map((value, index) => ({
      label: `${index}:00`,
      dateLabel: `Jun 10, 2026, ${String(index).padStart(2, "0")}:00`,
      fees: makeMockFees(value, index),
      value,
    })),
  },
  "1W": {
    range: "Jun 4, 2026 - Jun 10, 2026",
    yMax: 8_000_000,
    xLabels: ["Jun 4", "Jun 5", "Jun 6", "Jun 7", "Jun 8", "Jun 9", "Jun 10"],
    points: [
      3_140_000, 2_430_000, 4_920_000, 7_020_000, 2_520_000, 4_730_000,
      6_320_000,
    ].map((value, index) => ({
      label: `Jun ${index + 4}`,
      dateLabel: `Jun ${index + 4}, 2026`,
      fees: makeMockFees(value, index),
      value,
    })),
  },
  "1M": {
    range: "May 12, 2026 - Jun 10, 2026",
    yMax: 42_000_000,
    xLabels: ["May 12", "May 17", "May 22", "May 27", "Jun 1", "Jun 6", "Jun 10"],
    points: [
      18_400_000, 20_100_000, 16_700_000, 22_600_000, 24_300_000, 28_900_000,
      21_700_000, 23_600_000, 30_400_000, 34_700_000, 24_600_000, 19_500_000,
      32_100_000, 26_900_000, 36_800_000,
    ].map((value, index) => {
      const startDay = index * 2 + 12;
      const month = startDay <= 31 ? "May" : "Jun";
      const day = startDay <= 31 ? startDay : startDay - 31;

      return {
        label: `${month} ${day}`,
        dateLabel: `${month} ${day}, 2026`,
        fees: makeMockFees(value, index),
        value,
      };
    }),
  },
  "1Y": {
    range: "Jun 2025 - Jun 2026",
    yMax: 920_000_000,
    xLabels: ["Jul", "Sep", "Nov", "Jan", "Mar", "May", "Jun"],
    points: [
      410_000_000, 438_000_000, 392_000_000, 452_000_000, 506_000_000,
      533_000_000, 611_000_000, 592_000_000, 682_000_000, 748_000_000,
      694_000_000, 811_000_000,
    ].map((value, index) => {
      const label = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][index];
      const year = index < 6 ? 2025 : 2026;

      return {
        label,
        dateLabel: `${label} ${year}`,
        fees: makeMockFees(value, index),
        value,
      };
    }),
  },
};

function makeWavyPriceSeries(anchors: number[], count: number, wave: number) {
  return Array.from({ length: count }, (_, index) => {
    if (index === count - 1) return anchors[anchors.length - 1];

    const progress = index / (count - 1);
    const scaled = progress * (anchors.length - 1);
    const anchorIndex = Math.min(Math.floor(scaled), anchors.length - 2);
    const localT = scaled - anchorIndex;
    const easedT = localT * localT * (3 - 2 * localT);
    const base = anchors[anchorIndex] + (anchors[anchorIndex + 1] - anchors[anchorIndex]) * easedT;
    const micro =
      Math.sin(index * 1.73) * wave +
      Math.sin(index * 4.11) * wave * 0.38 +
      (((index * 17) % 11) - 5) * wave * 0.12;

    return Number((base + micro).toFixed(1));
  });
}

const priceDatasets: Record<Timeframe, PriceDataset> = {
  "1H": {
    range: "Jun 10, 2026, 13:00 - 14:00",
    xLabels: ["13:00", "13:10", "13:20", "13:30", "13:40", "13:50", "14:00"],
    points: makeWavyPriceSeries(
      [1746.2, 1744.8, 1747.1, 1742.4, 1745.6, 1741.8, 1744.5, 1743.4],
      48,
      1.1,
    ),
  },
  "1D": {
    range: "Jun 10, 2026",
    xLabels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    points: makeWavyPriceSeries(
      [1769.8, 1758.2, 1764.6, 1744.1, 1726.4, 1715.8, 1733.9, 1756.1, 1736.6, 1749.8, 1743.4],
      72,
      4.2,
    ),
  },
  "1W": {
    range: "Jun 4, 2026 - Jun 10, 2026",
    xLabels: ["Jun 4", "Jun 5", "Jun 6", "Jun 7", "Jun 8", "Jun 9", "Jun 10"],
    points: makeWavyPriceSeries(
      [1848.6, 1831.4, 1766.2, 1628.3, 1704.8, 1662.4, 1764.2, 1743.4],
      84,
      12,
    ),
  },
  "1M": {
    range: "May 12, 2026 - Jun 10, 2026",
    xLabels: ["May 12", "May 17", "May 22", "May 27", "Jun 1", "Jun 6", "Jun 10"],
    points: makeWavyPriceSeries(
      [
        2112.5, 2134.8, 2050.2, 2091.4, 2024.6, 1988.7, 2012.9, 1864.3, 1768.8,
        1558.9, 1616.4, 1692.7, 1631.6, 1684.1, 1662.3, 1712.8, 1824.5, 1743.4,
      ],
      128,
      18,
    ),
  },
  "1Y": {
    range: "Jun 2025 - Jun 2026",
    xLabels: ["Jul", "Sep", "Nov", "Jan", "Mar", "May", "Jun"],
    points: makeWavyPriceSeries(
      [2468.2, 2624.6, 2388.4, 2817.3, 3312.8, 3618.5, 3244.9, 2876.7, 2289.4, 1968.2, 2074.6, 1743.4],
      104,
      34,
    ),
  },
};

function makeMockFees(volume: number, index: number) {
  const realizedFeeRate = 0.003;
  const variance = 0.86 + ((index * 17) % 29) / 100;

  return Math.round(volume * realizedFeeRate * variance);
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 100_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }

  if (value >= 10_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  return `$${(value / 1_000_000).toFixed(2)}M`;
}

function formatFeeCurrency(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 10_000) return `$${(value / 1_000).toFixed(1)}K`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;

  return `$${value.toLocaleString("en-US")}`;
}

function makeYAxis(max: number) {
  return Array.from({ length: 8 }, (_, index) => formatCompactCurrency(max - index * (max / 8)));
}

function formatPrice(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPriceAmount(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPricePair(value: number) {
  return `1 ETH = ${formatPriceAmount(value)} USDT`;
}

function formatPriceAxis(value: number) {
  return formatPriceAmount(value);
}

function formatBarValue(category: Category, value: number) {
  if (category === "Price") return formatPrice(value);

  return formatCompactCurrency(value);
}

function makeRangeAxis(max: number, min: number, formatter: (value: number) => string) {
  return Array.from({ length: 8 }, (_, index) => {
    const value = max - index * ((max - min) / 8);

    return formatter(value);
  });
}

function derivePoints(
  dataset: VolumeDataset,
  transform: (point: VolumePoint, index: number) => number,
) {
  return dataset.points.map((point, index) => ({
    dateLabel: point.dateLabel,
    fees: point.fees,
    label: point.label,
    value: transform(point, index),
  }));
}

function getChartModel(category: Category, timeframe: Timeframe): ChartModel {
  const dataset = volumeDatasets[timeframe];

  if (category === "Volume") {
    const total = dataset.points.reduce((sum, point) => sum + point.value, 0);

    return {
      headline: formatCompactCurrency(total),
      range: dataset.range,
      points: dataset.points,
      xLabels: dataset.xLabels,
      yAxis: makeYAxis(dataset.yMax),
      yMin: 0,
      yMax: dataset.yMax,
      valueLabel: "Volume",
      formatValue: formatCompactCurrency,
    };
  }

  if (category === "Price") {
    const priceDataset = priceDatasets[timeframe];
    const points = priceDataset.points.map((value, index) => {
      const fallbackPoint = dataset.points[Math.min(index, dataset.points.length - 1)];

      return {
        dateLabel: fallbackPoint.dateLabel,
        fees: fallbackPoint.fees,
        label: fallbackPoint.label,
        value,
      };
    });
    const latest = points[points.length - 1].value;
    const axisDepth: Record<Timeframe, { max: number; min: number }> = {
      "1H": { max: 1_800, min: 1_700 },
      "1D": { max: 1_900, min: 1_600 },
      "1W": { max: 2_200, min: 1_400 },
      "1M": { max: 2_400, min: 1_400 },
      "1Y": { max: 4_000, min: 1_000 },
    };
    const { max: yMax, min: yMin } = axisDepth[timeframe];

    return {
      headline: formatPrice(latest),
      range: priceDataset.range,
      points,
      xLabels: priceDataset.xLabels,
      yAxis: makeRangeAxis(yMax, yMin, formatPriceAxis),
      yMin,
      yMax,
      valueLabel: "Price",
      formatValue: formatPrice,
    };
  }

  if (category === "Liquidity") {
    const baseByTimeframe: Record<Timeframe, number> = {
      "1H": 101_200_000,
      "1D": 100_900_000,
      "1W": 99_800_000,
      "1M": 96_500_000,
      "1Y": 82_000_000,
    };
    const base = baseByTimeframe[timeframe];
    const points = derivePoints(dataset, (point, index) => {
      const drift = index * (timeframe === "1Y" ? 2_300_000 : timeframe === "1M" ? 420_000 : 90_000);
      const flow = (point.value / dataset.yMax - 0.5) * (timeframe === "1Y" ? 44_000_000 : 8_000_000);
      return Math.round(base + drift + flow);
    });
    const latest = points[points.length - 1].value;
    const yMax = Math.ceil(Math.max(...points.map((point) => point.value)) / 10_000_000) * 10_000_000;

    return {
      headline: formatCompactCurrency(latest),
      range: dataset.range,
      points,
      xLabels: dataset.xLabels,
      yAxis: makeYAxis(yMax),
      yMin: 0,
      yMax,
      valueLabel: "Liquidity",
      formatValue: formatCompactCurrency,
    };
  }

  return getChartModel("Volume", timeframe);
}

function getBarWidth(count: number) {
  return (583 - 4 * (count - 1)) / count;
}

function formatStatsMillions(value: number, fractionDigits: number) {
  return `$${(value / 1_000_000).toFixed(fractionDigits)}M`;
}

function formatLiquidityValue(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;

  return `$${value.toFixed(0)}`;
}

function formatBpsFees(liquidity: number) {
  return `${formatLiquidityValue(liquidity * 0.0017)} / bps`;
}

function makeStatsData() {
  const oneDayVolume = volumeDatasets["1D"].points.reduce((sum, point) => sum + point.value, 0);
  const oneDayFees = volumeDatasets["1D"].points.reduce((sum, point) => sum + point.fees, 0);
  const latestEthPrice = getChartModel("Price", "1D").points.at(-1)?.value ?? 2752;
  const usdtBalance = 52_600_000;
  const ethAmount = 18_300;
  const ethBalance = ethAmount * latestEthPrice;
  const tvl = usdtBalance + ethBalance;

  return {
    ethAmount: `${(ethAmount / 1_000).toFixed(1)}K ETH`,
    fees: formatFeeCurrency(oneDayFees),
    tvl: formatStatsMillions(tvl, 2),
    usdtBalance: `${formatStatsMillions(usdtBalance, 1)} USDT`,
    usdtShare: (usdtBalance / tvl) * 100,
    volume: formatStatsMillions(oneDayVolume, 1),
  };
}

const statsData = makeStatsData();

function makeLiquidityDistribution(currentPrice: number, zoomLevel = 1): LiquidityBin[] {
  const ethNotional = 18_300 * currentPrice;
  const usdtNotional = 52_600_000;
  const totalNotional = ethNotional + usdtNotional;
  const zoomSpans = [1_620, 1_200, 780, 520];
  const span = zoomSpans[zoomLevel] ?? zoomSpans[1];
  const minPrice = currentPrice - span / 2;
  const maxPrice = currentPrice + span / 2;
  const binCount = 22;
  const binSize = (maxPrice - minPrice) / binCount;
  const activeIndex = Math.min(
    binCount - 1,
    Math.max(0, Math.floor((currentPrice - minPrice) / binSize)),
  );
  const positions = [
    { lower: 1_200, upper: 2_400, liquidityUsd: totalNotional * 0.07 },
    { lower: 1_360, upper: 2_180, liquidityUsd: totalNotional * 0.16 },
    { lower: 1_480, upper: 1_980, liquidityUsd: totalNotional * 0.22 },
    { lower: 1_560, upper: 1_860, liquidityUsd: totalNotional * 0.26 },
    { lower: 1_660, upper: 1_800, liquidityUsd: totalNotional * 0.2 },
    { lower: 1_710, upper: 1_760, liquidityUsd: totalNotional * 0.09 },
  ];

  return Array.from({ length: binCount }, (_, index) => {
    const lowerPrice = minPrice + index * binSize;
    const upperPrice = lowerPrice + binSize;
    const midPrice = (lowerPrice + upperPrice) / 2;
    const rangeLiquidity = positions.reduce((sum, position) => {
      const overlap = Math.max(
        0,
        Math.min(upperPrice, position.upper) - Math.max(lowerPrice, position.lower),
      );

      if (overlap === 0) return sum;

      return sum + position.liquidityUsd * (overlap / (position.upper - position.lower));
    }, 0);
    const activeDistance = (midPrice - currentPrice) / 118;
    const activeBoost = Math.exp(-(activeDistance * activeDistance)) * totalNotional * 0.03;
    const liquidity = rangeLiquidity + activeBoost;
    const isActive = index === activeIndex;
    const belowCurrent = upperPrice <= currentPrice;
    const aboveCurrent = lowerPrice >= currentPrice;
    const activeUsdtShare = 0.2274;
    const usdtAmount = isActive
      ? liquidity * activeUsdtShare
      : aboveCurrent
        ? 0
        : belowCurrent
          ? liquidity
          : liquidity * activeUsdtShare;
    const ethAmount = belowCurrent
      ? 0
      : isActive
        ? (liquidity * (1 - activeUsdtShare)) / currentPrice
        : aboveCurrent
        ? liquidity / currentPrice
        : (liquidity * (1 - activeUsdtShare)) / currentPrice;
    const tokenSymbol = belowCurrent || isActive ? "USDT" : "ETH";
    const primaryShare = tokenSymbol === "USDT" ? usdtAmount / liquidity : (ethAmount * currentPrice) / liquidity;

    return {
      ethAmount,
      isActive,
      liquidity,
      lowerPrice,
      primaryShare,
      tokenSymbol,
      tone: isActive ? "active" : belowCurrent ? "usdt" : "eth",
      upperPrice,
      usdtAmount,
    };
  });
}

function getPointTime(timeframe: Timeframe, index: number) {
  if (timeframe === "1H") {
    return Math.floor(new Date(2026, 5, 10, 13, index * 5).getTime() / 1000);
  }

  if (timeframe === "1D") {
    return Math.floor(new Date(2026, 5, 10, index).getTime() / 1000);
  }

  if (timeframe === "1W") {
    return Math.floor(new Date(2026, 5, 4 + index).getTime() / 1000);
  }

  if (timeframe === "1M") {
    return Math.floor(new Date(2026, 4, 12 + index * 2).getTime() / 1000);
  }

  return Math.floor(new Date(2025, 6 + index).getTime() / 1000);
}

function getTimeframeMockRange(timeframe: Timeframe) {
  const ranges: Record<Timeframe, { end: number; start: number }> = {
    "1H": {
      start: Math.floor(new Date(2026, 5, 10, 13, 0).getTime() / 1000),
      end: Math.floor(new Date(2026, 5, 10, 14, 0).getTime() / 1000),
    },
    "1D": {
      start: Math.floor(new Date(2026, 5, 10, 0, 0).getTime() / 1000),
      end: Math.floor(new Date(2026, 5, 11, 0, 0).getTime() / 1000),
    },
    "1W": {
      start: Math.floor(new Date(2026, 5, 4).getTime() / 1000),
      end: Math.floor(new Date(2026, 5, 10).getTime() / 1000),
    },
    "1M": {
      start: Math.floor(new Date(2026, 4, 12).getTime() / 1000),
      end: Math.floor(new Date(2026, 5, 10).getTime() / 1000),
    },
    "1Y": {
      start: Math.floor(new Date(2025, 6, 1).getTime() / 1000),
      end: Math.floor(new Date(2026, 5, 1).getTime() / 1000),
    },
  };

  return ranges[timeframe];
}

function getPriceLineData(
  timeframe: Timeframe,
  points: VolumePoint[],
  renderEndTime: number,
): LivelinePoint[] {
  const windowSeconds = getLivelineWindowSeconds(timeframe);
  const renderStartTime = renderEndTime - windowSeconds;
  const step = points.length > 1 ? windowSeconds / (points.length - 1) : 0;

  return points.map((point, index) => ({
    time: Math.round(renderStartTime + step * index),
    value: point.value,
  }));
}

function formatPriceHoverTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return `${month} ${day}, ${date.getFullYear()}, ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  })}`;
}

function getLivelineWindowSeconds(timeframe: Timeframe) {
  const windows: Record<Timeframe, number> = {
    "1H": 60 * 60,
    "1D": 24 * 60 * 60,
    "1W": 7 * 24 * 60 * 60,
    "1M": 30 * 24 * 60 * 60,
    "1Y": 365 * 24 * 60 * 60,
  };

  return windows[timeframe];
}

function mapRenderTimeToMockTime(
  renderTime: number,
  timeframe: Timeframe,
  pointCount: number,
  renderEndTime: number,
) {
  const windowSeconds = getLivelineWindowSeconds(timeframe);
  const renderStartTime = renderEndTime - windowSeconds;
  const { start: mockStartTime, end: mockEndTime } = getTimeframeMockRange(timeframe);
  const progress = Math.min(1, Math.max(0, (renderTime - renderStartTime) / windowSeconds));

  return mockStartTime + progress * (mockEndTime - mockStartTime);
}

function getPriceChange(points: VolumePoint[], currentValue: number) {
  const first = points[0]?.value ?? 0;
  if (first === 0) return "0.0%";

  const change = ((currentValue - first) / first) * 100;
  const sign = change > 0 ? "+" : "";

  return `${sign}${change.toFixed(1)}%`;
}

function PriceLineChart({
  chart,
  timeframe,
}: {
  chart: ChartModel;
  timeframe: Timeframe;
}) {
  const [hoverPoint, setHoverPoint] = useState<PriceHoverPoint | null>(null);
  const [renderEndTime] = useState(() => Math.floor(Date.now() / 1000));
  const lineData = getPriceLineData(timeframe, chart.points, renderEndTime);
  const latestValue = lineData.at(-1)?.value ?? 0;
  const displayValue = hoverPoint ? hoverPoint.value : latestValue;
  const displayTime = hoverPoint
    ? mapRenderTimeToMockTime(hoverPoint.time, timeframe, chart.points.length, renderEndTime)
    : null;
  const priceChange = getPriceChange(chart.points, displayValue);
  const isPriceDown = priceChange.startsWith("-");
  const tooltipLeft = hoverPoint ? Math.min(575, Math.max(86, 32 + hoverPoint.x)) : 32;
  const tooltipTop = hoverPoint ? Math.max(100, 129 + hoverPoint.y - 54) : 100;

  const handlePriceMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, event.clientX - rect.left));
    const progress = rect.width === 0 ? 0 : x / rect.width;
    const scaledIndex = progress * (chart.points.length - 1);
    const leftIndex = Math.min(Math.floor(scaledIndex), chart.points.length - 1);
    const rightIndex = Math.min(leftIndex + 1, chart.points.length - 1);
    const localT = scaledIndex - leftIndex;
    const leftValue = chart.points[leftIndex]?.value ?? latestValue;
    const rightValue = chart.points[rightIndex]?.value ?? leftValue;
    const value = leftValue + (rightValue - leftValue) * localT;
    const windowSeconds = getLivelineWindowSeconds(timeframe);
    const time = renderEndTime - windowSeconds + progress * windowSeconds;
    const plotTop = 22;
    const plotHeight = 371 - 22 - 28;
    const y =
      plotTop +
      ((chart.yMax - value) / Math.max(chart.yMax - chart.yMin, 1)) * plotHeight;

    setHoverPoint({ time, value, x, y });
  };

  return (
    <>
      <div className="chart-title price-chart-title">
        <div className="price-metric-line">
          <div className="metric">{formatPricePair(displayValue)}</div>
          <span className={`change price-change ${isPriceDown ? "negative" : ""}`}>
            {priceChange}
          </span>
        </div>
        <div className="range">
          {displayTime ? formatPriceHoverTime(displayTime) : "Current"}
        </div>
      </div>

      <div
        className="price-line-chart"
        onMouseMove={handlePriceMouseMove}
        onMouseLeave={() => setHoverPoint(null)}
      >
        <Liveline
          key={timeframe}
          data={lineData}
          value={latestValue}
          window={getLivelineWindowSeconds(timeframe)}
          theme="light"
          color="#FF79BE"
          grid={false}
          badge={false}
          fill
          scrub
          pulse={false}
          momentum={false}
          tooltipY={-1000}
          tooltipOutline={false}
          lineWidth={3}
          lerpSpeed={0.14}
          padding={{ top: 22, right: 0, bottom: 28, left: 0 }}
          formatValue={formatPrice}
          formatTime={() => ""}
          cursor="default"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {hoverPoint ? (
        <div
          className="chart-tooltip price-tooltip"
          style={{
            left: `${tooltipLeft}px`,
            top: `${tooltipTop}px`,
          }}
        >
          <span>{formatPricePair(hoverPoint.value)}</span>
        </div>
      ) : null}
    </>
  );
}

function LiquidityChart() {
  const [hoveredBinIndex, setHoveredBinIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const currentPrice = priceDatasets["1M"].points.at(-1) ?? 1743.4;
  const inversePrice = 1 / currentPrice;
  const bins = makeLiquidityDistribution(currentPrice, zoomLevel);
  const maxLiquidity = Math.max(...bins.map((bin) => bin.liquidity));
  const hoveredBin = hoveredBinIndex === null ? null : bins[hoveredBinIndex];
  const hoveredUsdtValue = hoveredBin?.usdtAmount ?? 0;
  const hoveredEthValue = hoveredBin ? hoveredBin.ethAmount * currentPrice : 0;
  const hoveredTotal = hoveredUsdtValue + hoveredEthValue || hoveredBin?.liquidity || 1;
  const hoveredUsdtShare = hoveredUsdtValue / hoveredTotal;
  const hoveredEthShare = hoveredEthValue / hoveredTotal;
  const binStep = 652 / bins.length;
  const liquidityPlotMaxHeight = 374;
  const liquidityPlotBaseline = 524;
  const hoveredBinHeight = hoveredBin
    ? Math.max(6, Math.round((hoveredBin.liquidity / maxLiquidity) * liquidityPlotMaxHeight))
    : 0;
  const tooltipLeft =
    hoveredBinIndex === null ? 32 : Math.min(570, Math.max(108, 32 + hoveredBinIndex * binStep + binStep / 2));
  const tooltipTop = hoveredBin ? Math.max(110, liquidityPlotBaseline - hoveredBinHeight) : 110;
  const handleLiquidityMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(rect.width - 1, Math.max(0, event.clientX - rect.left));
    const nextIndex = Math.min(bins.length - 1, Math.max(0, Math.floor(x / (rect.width / bins.length))));

    setHoveredBinIndex(nextIndex);
  };
  const handleZoomOut = () => {
    setHoveredBinIndex(null);
    setZoomLevel((level) => Math.max(0, level - 1));
  };
  const handleZoomIn = () => {
    setHoveredBinIndex(null);
    setZoomLevel((level) => Math.min(3, level + 1));
  };
  const handleZoomReset = () => {
    setHoveredBinIndex(null);
    setZoomLevel(1);
  };

  return (
    <div className="liquidity-chart">
      <div className="liquidity-copy">
        <div className="liquidity-price-line">
          1 ETH = {formatPriceAmount(currentPrice)} USDT
        </div>
        <div className="liquidity-price-line">
          1 USDT = {inversePrice.toFixed(7)} ETH
        </div>
        <div className="liquidity-subtitle">Active tick range</div>
      </div>

      <div
        className={`liquidity-bars ${hoveredBinIndex === null ? "" : "has-hover"}`}
        aria-label="Liquidity distribution chart"
        onMouseMove={handleLiquidityMouseMove}
        onMouseLeave={() => setHoveredBinIndex(null)}
      >
        {bins.map((bin, index) => (
          <span
            key={`liquidity-bin-${index}`}
            className={`liquidity-bin ${bin.tone} ${
              hoveredBinIndex === index ? "is-hovered" : ""
            } ${hoveredBinIndex !== null && hoveredBinIndex !== index ? "is-dimmed" : ""}`}
            tabIndex={0}
            aria-label={`Liquidity from ${formatPriceAmount(bin.lowerPrice)} to ${formatPriceAmount(
              bin.upperPrice,
            )} USDT: ${formatLiquidityValue(bin.liquidity)}`}
            onFocus={() => setHoveredBinIndex(index)}
            onBlur={() => setHoveredBinIndex(null)}
            onMouseEnter={() => setHoveredBinIndex(index)}
            style={{
              "--bin-index": index,
              height: `${Math.max(6, Math.round((bin.liquidity / maxLiquidity) * liquidityPlotMaxHeight))}px`,
              background: bin.isActive
                ? `linear-gradient(90deg, #26a17b 0 ${(bin.usdtAmount / bin.liquidity) * 100}%, #627eea ${(bin.usdtAmount / bin.liquidity) * 100}% 100%)`
                : undefined,
              opacity: hoveredBinIndex === null ? 0.96 : hoveredBinIndex === index ? 1 : 0.28,
              transform: hoveredBinIndex === index ? "translateY(-2px)" : "translateY(0)",
            } as LiquidityBinStyle}
          />
        ))}
      </div>

      {hoveredBin ? (
        <div
          className={`chart-tooltip liquidity-tooltip ${
            hoveredBin.isActive ? "liquidity-tooltip-current" : ""
          }`}
          style={{
            left: `${tooltipLeft}px`,
            top: `${tooltipTop}px`,
          }}
        >
          {hoveredBin.isActive ? (
            <>
              <span className="liquidity-tooltip-header">
                <span className="liquidity-tooltip-range">
                  {formatPriceAmount(currentPrice)} USDT/ETH
                </span>
                <span className="liquidity-current-pill">Current</span>
              </span>
              <span className="liquidity-tooltip-token-row">
                <span className="liquidity-token-dot usdt">₮</span>
                <span className="liquidity-token-symbol">USDT</span>
                <span className="liquidity-token-value">
                  {formatLiquidityValue(hoveredUsdtValue)}
                </span>
                <span className="liquidity-token-share">
                  {(hoveredUsdtShare * 100).toFixed(2)}%
                </span>
              </span>
              <span className="liquidity-tooltip-token-row">
                <span className="liquidity-token-dot eth">
                  <img src="/liquidity-pool-preview/icons/eth-small.svg" alt="" />
                </span>
                <span className="liquidity-token-symbol">ETH</span>
                <span className="liquidity-token-value">
                  {formatLiquidityValue(hoveredEthValue)}
                </span>
                <span className="liquidity-token-share">
                  {(hoveredEthShare * 100).toFixed(2)}%
                </span>
              </span>
              <span className="liquidity-tooltip-bps">{formatBpsFees(hoveredBin.liquidity)}</span>
            </>
          ) : (
            <>
              <span className="liquidity-tooltip-range">
                {formatPriceAmount(hoveredBin.lowerPrice)} - {formatPriceAmount(hoveredBin.upperPrice)} USDT
              </span>
              <span className="liquidity-tooltip-token-row">
                <span className={`liquidity-token-dot ${hoveredBin.tokenSymbol.toLowerCase()}`}>
                  {hoveredBin.tokenSymbol === "USDT" ? (
                    "₮"
                  ) : (
                    <img src="/liquidity-pool-preview/icons/eth-small.svg" alt="" />
                  )}
                </span>
                <span className="liquidity-token-symbol">{hoveredBin.tokenSymbol}</span>
                <span className="liquidity-token-value">
                  {hoveredBin.tokenSymbol === "USDT"
                    ? formatLiquidityValue(hoveredBin.usdtAmount)
                    : `${hoveredBin.ethAmount.toFixed(1)} ETH`}
                </span>
                <span className="liquidity-token-share">
                  {Math.round(hoveredBin.primaryShare * 100)}%
                </span>
              </span>
              <span className="liquidity-tooltip-bps">{formatBpsFees(hoveredBin.liquidity)}</span>
            </>
          )}
        </div>
      ) : null}

      <div className="liquidity-controls" aria-label="Liquidity chart zoom controls">
        <button
          className="zoom-control zoom-out"
          type="button"
          aria-label="Zoom out liquidity chart"
          disabled={zoomLevel === 0}
          onClick={handleZoomOut}
        >
          <img src="/liquidity-pool-preview/icons/minus-icon.svg" alt="" />
        </button>
        <button
          className="fit-control"
          type="button"
          aria-label="Reset liquidity chart zoom"
          disabled={zoomLevel === 1}
          onClick={handleZoomReset}
        >
          <img src="/liquidity-pool-preview/icons/maximize-icon.svg" alt="" />
        </button>
        <button
          className="zoom-control zoom-in"
          type="button"
          aria-label="Zoom in liquidity chart"
          disabled={zoomLevel === 3}
          onClick={handleZoomIn}
        >
          <img src="/liquidity-pool-preview/icons/plus-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

function Segmented({
  items,
  value,
  onChange,
  className,
  widths,
}: {
  items: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className: string;
  widths: number[];
}) {
  const activeIndex = Math.max(0, items.indexOf(value));
  const indicatorX = widths.slice(0, activeIndex).reduce((sum, width) => sum + width, 0);

  return (
    <div className={`segmented ${className}`}>
      <span
        className="segmented-indicator"
        style={{
          width: `${widths[activeIndex]}px`,
          transform: `translate3d(${indicatorX}px, 0, 0)`,
        }}
      />
      {items.map((item, index) => (
        <button
          key={item}
          className={index === activeIndex ? "active" : ""}
          type="button"
          style={{ width: `${widths[index]}px` }}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1600);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      // The visual confirmation should still run if clipboard access is blocked.
    }

    setCopied(true);
  };

  return (
    <button
      className={`copy-button ${copied ? "copied" : ""}`}
      type="button"
      aria-label={copied ? "Copied" : "Copy address"}
      onClick={handleCopy}
    >
      <svg
        className="copy-svg"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10.6666 8.59999V11.4C10.6666 13.7333 9.73331 14.6667 7.39998 14.6667H4.59998C2.26665 14.6667 1.33331 13.7333 1.33331 11.4V8.59999C1.33331 6.26666 2.26665 5.33333 4.59998 5.33333H7.39998C9.73331 5.33333 10.6666 6.26666 10.6666 8.59999Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6666 4.59999V7.39999C14.6666 9.73333 13.7333 10.6667 11.4 10.6667H10.6666V8.59999C10.6666 6.26666 9.73331 5.33333 7.39998 5.33333H5.33331V4.59999C5.33331 2.26666 6.26665 1.33333 8.59998 1.33333H11.4C13.7333 1.33333 14.6666 2.26666 14.6666 4.59999Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        className="check-svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <rect width="16" height="16" rx="8" fill="#26A17B" />
        <path
          d="M4 7.98476L6.53846 11L12 5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PairHeader({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: Category;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <div className="upper-one">
      <div className="upper-block">
        <div className="pair-icons" aria-hidden="true">
          <img className="token-usdt" src="/liquidity-pool-preview/icons/usdt.svg" alt="" />
          <img className="token-eth" src="/liquidity-pool-preview/icons/eth.svg" alt="" />
        </div>

        <div className="pair-data">
          <div className="pair-name">USDT/ETH</div>
          <div className="address">
            <span className="address-text">{poolAddress}</span>
            <CopyButton value={poolAddress} />
            <span className="pool-meta-divider" aria-hidden="true" />
            <span className="pool-meta-text">V3</span>
            <span className="pool-meta-divider" aria-hidden="true" />
            <span className="pool-meta-text">0.3%</span>
          </div>
        </div>
      </div>

      <Segmented
        className="category-filter"
        items={categoryFilters}
        value={activeCategory}
        onChange={onCategoryChange}
        widths={categoryWidths}
      />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="upper-data-two">
      <button className="top-secondary-button" type="button">
        <img src="/liquidity-pool-preview/icons/coins-swap-02.svg" alt="" />
        <span>Swap</span>
      </button>
      <button className="top-primary-button" type="button">
        <img src="/liquidity-pool-preview/icons/add-icon.svg" alt="" />
        <span>Add liquidity</span>
      </button>
    </div>
  );
}

function PoolChart({
  category,
  timeframe,
  onTimeframeChange,
}: {
  category: Category;
  timeframe: Timeframe;
  onTimeframeChange: (value: string) => void;
}) {
  const chart = getChartModel(category, timeframe);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredPoint = hoveredIndex === null ? null : chart.points[hoveredIndex];
  const displayedHeadline = hoveredPoint ? chart.formatValue(hoveredPoint.value) : chart.headline;
  const displayedRange = hoveredPoint ? hoveredPoint.dateLabel : chart.range;
  const hoveredHeight =
    hoveredPoint === null ? 0 : Math.max(18, Math.round((hoveredPoint.value / chart.yMax) * 314));
  const barWidth = getBarWidth(chart.points.length);
  const bucketWidth = barWidth + 4;
  const barStep = chart.points.length > 1 ? bucketWidth : 0;
  const tooltipLeft =
    hoveredIndex === null
      ? 32
      : Math.min(575, Math.max(86, 32 + hoveredIndex * barStep + barWidth / 2));
  const tooltipTop = Math.max(100, 186 + 314 - hoveredHeight - 62);
  const isPriceChart = category === "Price";
  const isLiquidityChart = category === "Liquidity";
  const xLabelPositions =
    timeframe === "1W" && !isPriceChart
      ? chart.xLabels.map((_, index) => index * bucketWidth + barWidth / 2)
      : chart.xLabels.map((_, index) => (index / Math.max(chart.xLabels.length - 1, 1)) * 583);
  const shouldPinXAxisEdges = isPriceChart || timeframe !== "1W";

  return (
    <section className="data-block">
      {isPriceChart ? (
        <PriceLineChart key={timeframe} chart={chart} timeframe={timeframe} />
      ) : isLiquidityChart ? (
        <LiquidityChart />
      ) : (
        <>
          <div className="chart-title">
            <div className="metric">{displayedHeadline}</div>
            <div className="range">{displayedRange}</div>
          </div>

          <div
            className={`bars ${category === "Volume" ? "volume-bars" : ""} ${
              hoveredIndex === null ? "" : "has-hover"
            }`}
            aria-label={`${timeframe} ${category.toLowerCase()} chart`}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {chart.points.map((point, index) => {
              const hitboxStyle: BarHitboxStyle = {
                width: `${bucketWidth}px`,
                "--bar-width": `${barWidth}px`,
                "--hover-left-extension": index === 0 ? "0px" : "4px",
              };

              return (
                <span
                  key={`${category}-${timeframe}-${point.label}`}
                  className={`bar-hitbox ${hoveredIndex === index ? "is-hovered" : ""}`}
                  tabIndex={0}
                  aria-label={`${chart.valueLabel}: ${chart.formatValue(point.value)}, ${point.label}`}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  style={hitboxStyle}
                >
                  <span
                    className="bar"
                  style={{
                    height: `${Math.max(18, Math.round((point.value / chart.yMax) * 314))}px`,
                    width: `${barWidth}px`,
                    "--bar-index": index,
                  } as BarStyle}
                >
                    <i />
                  </span>
                </span>
              );
            })}
          </div>

          {hoveredPoint ? (
            <div
              className="chart-tooltip"
              style={{
                left: `${tooltipLeft}px`,
                top: `${tooltipTop}px`,
              }}
            >
              <span>Fees: {formatFeeCurrency(hoveredPoint.fees)}</span>
            </div>
          ) : null}
        </>
      )}

      {!isLiquidityChart ? (
        <>
          <Segmented
            className="time-filter"
            items={timeFilters}
            value={timeframe}
            onChange={onTimeframeChange}
            widths={timeWidths}
          />

          <div className="y-axis">
            {chart.yAxis.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="x-axis">
            {chart.xLabels.map((item, index) => (
              <span
                key={item}
                className={
                  shouldPinXAxisEdges && index === 0
                    ? "edge-start"
                    : shouldPinXAxisEdges && index === chart.xLabels.length - 1
                      ? "edge-end"
                      : ""
                }
                style={{
                  left: `${xLabelPositions[index]}px`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}

function TotalApr() {
  return (
    <section className="total-apr-card">
      <div className="small-stat">
        <div className="stat-label">Total APR</div>
        <div className="stat-value">28.81%</div>
      </div>
    </section>
  );
}

function StatRow({
  label,
  value,
  change,
  className,
}: {
  label: string;
  value: string;
  change?: string;
  className: string;
}) {
  return (
    <div className={`stat-row ${className}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value-line">
        <div className="stat-value">{value}</div>
        {change ? <span className="change">{change}</span> : null}
      </div>
    </div>
  );
}

function StatsPanel() {
  return (
    <aside className="stats-card">
      <h2>Stats</h2>
      <div className="divider first" />

      <section className="pool-balance">
        <div className="stat-label">Pool balances</div>
        <div className="balance-bar">
          <span className="usdt-fill" style={{ width: `${statsData.usdtShare}%` }} />
          <span className="eth-fill" />
        </div>
        <div className="balance-values">
          <span>{statsData.usdtBalance}</span>
          <span>{statsData.ethAmount}</span>
        </div>
      </section>

      <div className="divider d1" />
      <StatRow className="tvl" label="TVL" value={statsData.tvl} change="+2.4%" />
      <div className="divider d2" />
      <StatRow className="volume" label="24H volume" value={statsData.volume} change="+18.9%" />
      <div className="divider d3" />
      <StatRow className="fees" label="24H fees" value={statsData.fees} />
    </aside>
  );
}

export default function LiquidityPoolMain() {
  const [activeCategory, setActiveCategory] = useState<Category>("Volume");
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const rootRef = useRef<HTMLElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const updateScale = () => {
      const bounds = node.getBoundingClientRect();
      const nextScale = Math.min(bounds.width / 1196, bounds.height / 616);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="figma-page"
      style={
        {
          "--liquidity-scale": scale.toString(),
        } as CSSProperties
      }
    >
      <div className="liquidity-pool-stage">
        <div className="liquidity-pool">
        <PairHeader
          activeCategory={activeCategory}
          onCategoryChange={(value) => setActiveCategory(value as Category)}
        />
        <HeaderActions />
        <PoolChart
          category={activeCategory}
          timeframe={timeframe}
          onTimeframeChange={(value) => setTimeframe(value as Timeframe)}
        />
        <TotalApr />
        <StatsPanel />
        </div>
      </div>
    </main>
  );
}
