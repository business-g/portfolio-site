"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { PortfolioSwitcher } from "@/components/PortfolioSwitcher";
import { PaymentFlowShot } from "@/components/PaymentFlowShot";
import { VpnPreviewShot } from "@/components/VpnPreviewShot";

const interactiveShots = [
  {
    type: "interactive",
    variant: "liquidity-pool",
    alt: "Interactive liquidity pool portfolio shot",
  },
  {
    type: "interactive",
    variant: "vpn",
    alt: "Interactive VPN application portfolio shot",
  },
  {
    type: "interactive",
    variant: "payment-flow",
    alt: "Interactive payment flow portfolio shot",
  },
] as const;

const visualShots = [
  {
    type: "image",
    src: "/portfolio/visual-3x-01.webp",
    alt: "Crypto wallet dashboard portfolio shot",
    width: 3360,
    height: 2063,
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-02.webp",
    alt: "SaaS analytics dashboard portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-03.webp",
    alt: "Crypto exchange dashboard portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-04.webp",
    alt: "Router admin dashboard portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "video",
    src: "/portfolio/transfer-flow.mp4",
    alt: "Transfer flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-05.webp",
    alt: "Mobile crypto wallet portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-06.webp",
    alt: "Mobile VPN application portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-07.webp",
    alt: "Wallet connection interface portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "video",
    src: "/portfolio/claim-reward-4-v2.mp4",
    alt: "Send tokens flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-08.webp",
    alt: "Messenger settings portfolio shot",
    width: 3360,
    height: 2064,
  },
  {
    type: "video",
    src: "/portfolio/no-zoom-edited-v2.mp4",
    alt: "Messaging interface portfolio motion shot",
    playbackRate: 1.25,
  },
  {
    type: "video",
    src: "/portfolio/dynamic-island.mp4",
    alt: "Dynamic island portfolio motion shot",
  },
  {
    type: "video",
    src: "/portfolio/final-shot.mp4",
    alt: "Final portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/visual-3x-09.webp",
    alt: "Crypto wallet landing page portfolio shot",
    width: 3360,
    height: 2064,
  },
] as const;

type HomeTab = "visual" | "interactive" | "case-studies";

type HomePortfolioContentProps = {
  tabLabels?: Partial<Record<HomeTab, string>>;
  caseStudiesNote?: string;
  interactiveShotBadgeLabel?: string;
  gemraCaseStudyHref?: string;
  gemraCaseStudyTitle?: string;
  gemraCaseStudyDescription?: ReactNode;
  wawenCaseStudyHref?: string;
  wawenCaseStudyTitle?: string;
  wawenCaseStudyDescription?: ReactNode;
  kelvpnCaseStudyTitle?: string;
  kelvpnCaseStudyDescription?: ReactNode;
};

export function HomePortfolioContent({
  tabLabels,
  caseStudiesNote,
  interactiveShotBadgeLabel = "Clickable",
  gemraCaseStudyHref = "/gemra",
  gemraCaseStudyTitle = "Gemra — staking platform",
  gemraCaseStudyDescription = (
    <>
      Designed a fixed-lock staking platform end-to-end: research, product
      decisions and interface.{" "}
      <span className="text-[#1C1C22]">
        Attracted $500K+ in staked tokens.
      </span>{" "}
      A post-launch iteration{" "}
      <span className="text-[#1C1C22]">
        increased auto-compound adoption by 44%.
      </span>
    </>
  ),
  wawenCaseStudyHref = "/wawen",
  wawenCaseStudyTitle = "Wawen — router admin panel",
  wawenCaseStudyDescription = (
    <>
      Designed a router admin panel from scratch. Worked through information
      architecture, network management flows, and VPN settings — making the
      interface approachable for beginners without limiting advanced users.
    </>
  ),
  kelvpnCaseStudyTitle = "KelVPN — VPN application",
  kelvpnCaseStudyDescription = (
    <>
      Designed a VPN app supporting two activation methods: key-based
      connection and VPS rental. Worked through server rental flows with crypto
      payments, order management, and Hybrid VPN configuration.
    </>
  ),
}: HomePortfolioContentProps = {}) {
  const searchParams = useSearchParams();
  const [manualTab, setManualTab] = useState<HomeTab | null>(null);
  const [showInteractiveTab, setShowInteractiveTab] = useState(true);
  const [hasLoadedFirstVisual, setHasLoadedFirstVisual] = useState(false);
  const queryTab = (() => {
    const tab = searchParams.get("tab");
    if (tab === "interactive") return "interactive";
    if (tab === "case-studies") return "case-studies";
    return "visual";
  })();
  const [hasVisitedCaseStudies, setHasVisitedCaseStudies] = useState(
    queryTab === "case-studies",
  );
  const [hasVisitedInteractive, setHasVisitedInteractive] = useState(
    queryTab === "interactive",
  );
  const activeTab = manualTab ?? queryTab;
  const resolvedActiveTab =
    !showInteractiveTab && activeTab === "interactive" ? "visual" : activeTab;
  const shouldRenderCaseStudies =
    resolvedActiveTab === "case-studies" || hasVisitedCaseStudies;
  const shouldRenderInteractive =
    showInteractiveTab &&
    (resolvedActiveTab === "interactive" || hasVisitedInteractive);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncTabs = () => {
      const isDesktop = mediaQuery.matches;
      setShowInteractiveTab(isDesktop);

      if (!isDesktop && (manualTab ?? queryTab) === "interactive") {
        setManualTab("visual");
      }
    };

    syncTabs();
    mediaQuery.addEventListener("change", syncTabs);

    return () => mediaQuery.removeEventListener("change", syncTabs);
  }, [manualTab, queryTab]);

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-content-change"));
  }, [resolvedActiveTab]);

  const visualTabShots = visualShots;

  const renderPortfolioShot = (
    shot: (typeof interactiveShots)[number] | (typeof visualShots)[number],
    index: number,
    portfolioShotAnchorIndex?: number,
  ) => {
    const isFirstVisual = portfolioShotAnchorIndex !== undefined && index === 0;

    return (
      <div
      key={shot.type === "interactive" ? `interactive-${shot.variant}` : shot.src}
      id={index === portfolioShotAnchorIndex ? "portfolio-shot-2" : undefined}
      className={`overflow-hidden rounded-[32px] bg-[var(--surface-muted)] ${
        isFirstVisual ? "relative" : ""
      }`}
    >
      {shot.type === "interactive" ? (
        <div className="relative">
          <div className="pointer-events-none absolute right-4 top-4 z-10 flex h-6 items-center rounded-full bg-[#FDFDFC] px-[10px] font-mono text-[12px] leading-4 font-medium uppercase text-[#5F5D68] shadow-[0_0_1px_rgba(0,0,0,0.08)]">
            {interactiveShotBadgeLabel}
          </div>
          {shot.variant === "vpn" ? (
            <Image
              src="/portfolio/visual-vpn-mobile.png"
              alt={shot.alt}
              width={3024}
              height={1640}
              sizes="100vw"
              className="block h-auto w-full md:hidden"
            />
          ) : null}
          <div
            className={`aspect-[1512/820] w-full items-center justify-center bg-[#F5F5F5] ${
              shot.variant === "vpn" ? "hidden md:flex" : "flex"
            }`}
          >
            <div
              className={`overflow-hidden rounded-[20px] bg-transparent ${
                shot.variant === "vpn"
                  ? "aspect-[453/918]"
                  : shot.variant === "payment-flow"
                    ? "aspect-[602/646]"
                    : "aspect-[1196/616]"
              }`}
              style={{
                width:
                  shot.variant === "vpn"
                    ? "clamp(198px, 21.6vw, 326px)"
                    : shot.variant === "payment-flow"
                      ? "clamp(325px, 40vw, 575px)"
                      : "1196px",
              }}
            >
              {shot.variant === "vpn" ? (
                <VpnPreviewShot />
              ) : shot.variant === "payment-flow" ? (
                <PaymentFlowShot />
              ) : (
                <iframe
                  src="/liquidity-pool-preview"
                  title={shot.alt}
                  loading="lazy"
                  scrolling="no"
                  className="block h-full w-full border-0 bg-transparent"
                />
              )}
            </div>
          </div>
        </div>
      ) : shot.type === "video" ? (
        <div className="flex aspect-[4480/2752] w-full items-center justify-center bg-[#F5F5F5]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-label={shot.alt}
            onLoadedMetadata={(event) => {
              if ("playbackRate" in shot && shot.playbackRate) {
                event.currentTarget.playbackRate = shot.playbackRate;
              }
            }}
            className="block h-full w-full object-contain"
          >
            <source src={shot.src} type="video/mp4" />
          </video>
        </div>
      ) : (
        <>
          {isFirstVisual ? (
            <Image
                src="/portfolio/visual-3x-01-placeholder.webp"
              alt=""
              width={64}
              height={39}
              unoptimized
              aria-hidden="true"
              className={`portfolio-first-visual-placeholder pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover ${
                hasLoadedFirstVisual ? "is-loaded" : ""
              }`}
            />
          ) : null}
          <Image
              src={shot.src}
            alt={shot.alt}
              width={shot.width}
              height={shot.height}
            unoptimized
            priority={isFirstVisual}
            sizes="(max-width: 1119px) 100vw, 1120px"
            onLoad={isFirstVisual ? () => setHasLoadedFirstVisual(true) : undefined}
            className={`block h-auto w-full ${
              isFirstVisual
                ? hasLoadedFirstVisual
                  ? "portfolio-first-visual is-loaded"
                  : "portfolio-first-visual"
                : ""
            }`}
          />
        </>
      )}
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto w-full px-4 md:max-w-[508px] md:px-0">
        <div className="home-reveal mt-12 md:mt-16 md:flex md:items-center md:gap-6" style={{ animationDelay: "180ms" }}>
          <PortfolioSwitcher
            activeTab={resolvedActiveTab}
            labels={tabLabels}
            showInteractiveTab={showInteractiveTab}
            onTabChange={(tab) => {
              if (tab === "case-studies") {
                setHasVisitedCaseStudies(true);
              }
              if (tab === "interactive") {
                setHasVisitedInteractive(true);
              }
              setManualTab(tab);
            }}
          />
          {resolvedActiveTab === "case-studies" && caseStudiesNote ? (
            <p className="type-caption mt-3 hidden whitespace-nowrap text-[var(--text-body)] md:mt-0 md:block">
              {caseStudiesNote}
            </p>
          ) : null}
        </div>
      </div>

      {resolvedActiveTab === "visual" ? (
        <div className="home-reveal-gallery mx-auto mt-6 flex w-full max-w-[1120px] flex-col gap-2" style={{ animationDelay: "220ms" }}>
          <div className="flex flex-col gap-2 md:hidden">
            {interactiveShots.map((shot, index) =>
              renderPortfolioShot(shot, index),
            )}
          </div>
          {visualTabShots.map((shot, index) =>
            renderPortfolioShot(shot, index, 1),
          )}
        </div>
      ) : null}

      {shouldRenderInteractive ? (
        <div
          aria-hidden={resolvedActiveTab !== "interactive"}
          className={`mx-auto mt-6 w-full max-w-[1120px] flex-col gap-2 ${
            resolvedActiveTab === "interactive" ? "flex" : "hidden"
          }`}
        >
          {interactiveShots.map((shot, index) => renderPortfolioShot(shot, index))}
        </div>
      ) : null}

      {shouldRenderCaseStudies ? (
        <div
          aria-hidden={resolvedActiveTab !== "case-studies"}
          className={`mx-auto mt-6 max-w-[1000px] flex-col gap-12 px-4 md:gap-14 md:px-0 ${
            resolvedActiveTab === "case-studies" ? "flex" : "hidden"
          }`}
        >
          <article className="bg-transparent">
            <Link
              href={gemraCaseStudyHref}
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[32px]"
            >
              <Image
                src="/gemra-mobile-cover.svg"
                alt="Gemra staking platform case study cover"
                width={1000}
                height={650}
                sizes="(max-width: 767px) 100vw, 0px"
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:hidden"
              />
              <div className="hidden aspect-[1000/650] w-full max-w-[1000px] items-center justify-center rounded-[32px] bg-[#F5F5F5] md:flex">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label="Gemra staking platform case study preview"
                  className="block max-h-[546px] max-w-[894px] rounded-[20px] object-contain transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                >
                  <source src="/gemra-preview-cover-v3.mp4" type="video/mp4" />
                  <source
                    src="/gemra-preview-cover-v3.mov"
                    type="video/quicktime"
                  />
                </video>
              </div>
            </Link>
            <div className="mx-auto mt-4 max-w-[520px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                {gemraCaseStudyTitle}
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                {gemraCaseStudyDescription}
              </p>
            </div>
          </article>

          <article
            id={resolvedActiveTab === "case-studies" ? "portfolio-shot-2" : undefined}
            className="bg-transparent"
          >
            <Link
              href={wawenCaseStudyHref}
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[32px]"
            >
              <Image
                src="/portfolio/wawen-cover-v2.svg"
                alt="Wawen router admin panel case study cover"
                width={1622}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:rounded-[32px]"
              />
            </Link>
            <div className="mx-auto mt-4 max-w-[520px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                {wawenCaseStudyTitle}
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                {wawenCaseStudyDescription}
              </p>
            </div>
          </article>

          <article className="bg-transparent">
            <div className="relative overflow-hidden rounded-[16px] md:rounded-[32px]">
              <div className="absolute right-4 top-4 z-10 flex h-6 items-center rounded-full bg-[#FDFDFC] px-[10px] font-mono text-[12px] leading-4 font-medium text-[#5F5D68] shadow-[0_0_1px_rgba(0,0,0,0.08)]">
                COMING SOON
              </div>
              <Image
                src="/kelvpn-case-study-cover-v3.svg"
                alt="KelVPN application case study cover"
                width={1152}
                height={768}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="block h-auto w-full rounded-[16px] md:rounded-[32px]"
              />
            </div>
            <div className="mx-auto mt-4 max-w-[520px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                {kelvpnCaseStudyTitle}
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                {kelvpnCaseStudyDescription}
              </p>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
