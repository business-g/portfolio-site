import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    const immutableHeader = {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    };

    return [
      {
        source: "/portfolio/:path*",
        headers: [immutableHeader],
      },
      {
        source: "/gemra/:path*",
        headers: [immutableHeader],
      },
      {
        source: "/wawan/:path*",
        headers: [immutableHeader],
      },
      {
        source: "/copy-success.svg",
        headers: [immutableHeader],
      },
      {
        source: "/gemra-case-study-cover.svg",
        headers: [immutableHeader],
      },
      {
        source: "/kelvpn-case-study-cover.svg",
        headers: [immutableHeader],
      },
      {
        source: "/site-avatar-main.png",
        headers: [immutableHeader],
      },
      {
        source: "/coffee-icon.gif",
        headers: [immutableHeader],
      },
      {
        source: "/social-preview-portfolio.png",
        headers: [immutableHeader],
      },
      {
        source: "/cv-bogdan-kachatov.pdf",
        headers: [immutableHeader],
      },
    ];
  },
};

export default nextConfig;
