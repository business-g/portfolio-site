"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { PortfolioSwitcher } from "@/components/PortfolioSwitcher";

const portfolioShots = [
  {
    type: "image",
    src: "/portfolio/visual-01.svg",
    alt: "Router admin panel portfolio shot",
    width: 1622,
    height: 1080,
  },
  {
    type: "video",
    src: "/portfolio/transfer-flow.mp4",
    alt: "Transfer flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/visual-02.svg",
    alt: "SaaS dashboard portfolio shot",
    width: 1120,
    height: 746,
  },
  {
    type: "image",
    src: "/portfolio/visual-03.svg",
    alt: "DEX portfolio shot",
    width: 1648,
    height: 1113,
  },
  {
    type: "video",
    src: "/portfolio/claim-reward-4-v2.mp4",
    alt: "Send tokens flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/visual-08.svg",
    alt: "Portfolio visual shot eight",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/visual-05.svg",
    alt: "Settings portfolio shot",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/visual-06.svg",
    alt: "Portfolio visual shot six",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/visual-04.svg",
    alt: "Portfolio visual shot four",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/visual-07.svg",
    alt: "Portfolio visual shot seven",
    width: 2048,
    height: 1384,
  },
  {
    type: "video",
    src: "/portfolio/send-message-updated-v2.mp4",
    alt: "Send message portfolio motion shot",
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
    src: "/portfolio/features-visual.svg",
    alt: "Features visual portfolio shot",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/hero-visual.png",
    alt: "Hero visual portfolio shot",
    width: 2048,
    height: 1384,
  },
  {
    type: "image",
    src: "/portfolio/visual-09.svg",
    alt: "Portfolio visual shot nine",
    width: 2048,
    height: 1384,
  },
] as const;

type HomeTab = "visual" | "case-studies";

type HomePortfolioContentProps = {
  tabLabels?: Partial<Record<HomeTab, string>>;
  caseStudiesNote?: string;
  gemraCaseStudyTitle?: string;
  gemraCaseStudyDescription?: ReactNode;
  wawenCaseStudyTitle?: string;
  wawenCaseStudyDescription?: ReactNode;
  kelvpnCaseStudyTitle?: string;
  kelvpnCaseStudyDescription?: ReactNode;
};

export function HomePortfolioContent({
  tabLabels,
  caseStudiesNote,
  gemraCaseStudyTitle = "Gemra — staking platform",
  gemraCaseStudyDescription = (
    <>
      Designed a fixed-term staking platform from 0 to launch, covering user
      research, product decisions, and interface design.{" "}
      <span className="text-[#1C1C22]">
        Attracted $500K+ in staked tokens.
      </span>{" "}
      Post-launch iteration{" "}
      <span className="text-[#1C1C22]">
        increased auto-compound adoption by 44%.
      </span>
    </>
  ),
  wawenCaseStudyTitle = "Wawen — router admin panel",
  wawenCaseStudyDescription = (
    <>
      Designed a router admin panel from scratch for both casual users and
      network administrators. Reorganized a&nbsp;complex networking product
      into clearer flows, with Basic and Advanced modes for different levels of
      control.
    </>
  ),
  kelvpnCaseStudyTitle = "KelVPN — VPN application",
  kelvpnCaseStudyDescription = (
    <>
      Designed the complete product interface and worked on ongoing product
      iterations. Created the trial-period flow and designed NoCDB order flows
      for renting VPS servers with flexible rental duration. Also simplified
      the Hybrid VPN experience through multiple UX iterations to make advanced
      networking functionality more accessible for users.
    </>
  ),
}: HomePortfolioContentProps = {}) {
  const searchParams = useSearchParams();
  const [manualTab, setManualTab] = useState<HomeTab | null>(null);
  const queryTab =
    searchParams.get("tab") === "case-studies" ? "case-studies" : "visual";
  const [hasVisitedCaseStudies, setHasVisitedCaseStudies] = useState(
    queryTab === "case-studies",
  );
  const activeTab = manualTab ?? queryTab;
  const shouldRenderCaseStudies =
    activeTab === "case-studies" || hasVisitedCaseStudies;

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-content-change"));
  }, [activeTab]);

  return (
    <>
      <div className="mx-auto w-full md:max-w-[584px]">
        <div className="mt-12 md:mt-16 md:flex md:items-center md:gap-6">
          <PortfolioSwitcher
            activeTab={activeTab}
            labels={tabLabels}
            onTabChange={(tab) => {
              if (tab === "case-studies") {
                setHasVisitedCaseStudies(true);
              }
              setManualTab(tab);
            }}
          />
          {activeTab === "case-studies" && caseStudiesNote ? (
            <p className="type-caption mt-3 hidden whitespace-nowrap text-[var(--text-body)] md:mt-0 md:block">
              {caseStudiesNote}
            </p>
          ) : null}
        </div>
      </div>

      {activeTab === "visual" ? (
        <div className="relative left-1/2 mt-6 flex w-screen max-w-none -translate-x-1/2 flex-col gap-2 px-0">
          {portfolioShots.map((shot, index) => (
            <div
              key={shot.src}
              id={index === 1 ? "portfolio-shot-2" : undefined}
              className="overflow-hidden bg-[var(--surface-muted)]"
            >
              {shot.type === "video" ? (
                <div className="flex aspect-[1512/820] w-full items-center justify-center bg-[#F5F5F5]">
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
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  unoptimized={shot.src.endsWith(".svg")}
                  sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 1416px"
                  className="block h-auto w-full"
                />
              )}
            </div>
          ))}
        </div>
      ) : null}

      {shouldRenderCaseStudies ? (
        <div
          aria-hidden={activeTab !== "case-studies"}
          className={`mx-auto mt-6 max-w-[1000px] flex-col gap-12 md:gap-14 ${
            activeTab === "case-studies" ? "flex" : "hidden"
          }`}
        >
          <article className="bg-transparent">
            <Link
              href="/gemra"
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[24px]"
            >
              <Image
                src="/gemra-case-study-cover-v2.svg"
                alt="Gemra staking platform case study cover"
                width={1000}
                height={675}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:rounded-[24px]"
              />
            </Link>
            <div className="mx-auto mt-4 max-w-[584px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                {gemraCaseStudyTitle}
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                {gemraCaseStudyDescription}
              </p>
            </div>
          </article>

          <article
            id={activeTab === "case-studies" ? "portfolio-shot-2" : undefined}
            className="bg-transparent"
          >
            <Link
              href="/wawen"
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[24px]"
            >
              <Image
                src="/portfolio/router-admin-panel.svg"
                alt="Wawen router admin panel case study cover"
                width={1622}
                height={1080}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:rounded-[24px]"
              />
            </Link>
            <div className="mx-auto mt-4 max-w-[584px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                {wawenCaseStudyTitle}
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                {wawenCaseStudyDescription}
              </p>
            </div>
          </article>

          <article className="bg-transparent">
            <div className="relative overflow-hidden rounded-[16px] md:rounded-[24px]">
              <div className="absolute right-4 top-4 z-10 flex h-6 items-center rounded-full bg-[#FDFDFC] px-[10px] font-mono text-[12px] leading-4 font-medium text-[#5F5D68] shadow-[0_0_1px_rgba(0,0,0,0.08)]">
                COMING SOON
              </div>
              <Image
                src="/kelvpn-case-study-cover-v2.svg"
                alt="KelVPN application case study cover"
                width={1152}
                height={768}
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="block h-auto w-full rounded-[16px] md:rounded-[24px]"
              />
            </div>
            <div className="mx-auto mt-4 max-w-[584px]">
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
