"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PortfolioSwitcher } from "@/components/PortfolioSwitcher";

const portfolioShots = [
  {
    type: "image",
    src: "/portfolio/router-admin-panel.svg",
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
    src: "/portfolio/saas-dashboard.svg",
    alt: "SaaS dashboard portfolio shot",
    width: 1120,
    height: 746,
  },
  {
    type: "image",
    src: "/portfolio/dex.svg",
    alt: "DEX portfolio shot",
    width: 1648,
    height: 1113,
  },
  {
    type: "video",
    src: "/portfolio/send-tokens-flow.mp4",
    alt: "Send tokens flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/settings.avif",
    alt: "Settings portfolio shot",
    width: 2048,
    height: 1384,
  },
  {
    type: "video",
    src: "/portfolio/dashboard-anim.mp4",
    alt: "Dashboard animation portfolio motion shot",
  },
  {
    type: "video",
    src: "/portfolio/messenger-flow.mp4",
    alt: "Messenger flow portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/wallet-portfolio-updated.png",
    alt: "Wallet portfolio updated shot",
    width: 5145,
    height: 3477,
  },
  {
    type: "image",
    src: "/portfolio/updated-apr.png",
    alt: "Updated APR portfolio shot",
    width: 5145,
    height: 3477,
  },
  {
    type: "image",
    src: "/portfolio/updated-apr-1.png",
    alt: "Updated APR portfolio shot 2",
    width: 5145,
    height: 3477,
  },
  {
    type: "image",
    src: "/portfolio/updated-apr-2.png",
    alt: "Updated APR portfolio shot 3",
    width: 5145,
    height: 3477,
  },
  {
    type: "video",
    src: "/portfolio/dynamic-island.mp4",
    alt: "Dynamic island portfolio motion shot",
  },
  {
    type: "image",
    src: "/portfolio/connect-wallet.webp",
    alt: "Connect wallet portfolio shot",
    width: 2048,
    height: 1384,
  },
  {
    type: "video",
    src: "/portfolio/final-shot.mp4",
    alt: "Final portfolio motion shot",
  },
] as const;

type HomeTab = "visual" | "case-studies";

export function HomePortfolioContent() {
  const searchParams = useSearchParams();
  const [manualTab, setManualTab] = useState<HomeTab | null>(null);
  const queryTab =
    searchParams.get("tab") === "case-studies" ? "case-studies" : "visual";
  const activeTab = manualTab ?? queryTab;

  useEffect(() => {
    window.dispatchEvent(new Event("portfolio-content-change"));
  }, [activeTab]);

  return (
    <>
      <div className="mx-auto w-full md:max-w-[584px]">
        <PortfolioSwitcher
          className="mt-12 md:mt-16"
          activeTab={activeTab}
          onTabChange={setManualTab}
        />
      </div>

      {activeTab === "visual" ? (
        <div className="mx-auto mt-6 flex max-w-[1000px] flex-col gap-3">
          {portfolioShots.map((shot, index) => (
            <div
              key={shot.src}
              id={index === 1 ? "portfolio-shot-2" : undefined}
              className="overflow-hidden rounded-[16px] bg-[var(--surface-muted)] md:rounded-[24px]"
            >
              {shot.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={shot.alt}
                  className="block h-auto w-full"
                >
                  <source src={shot.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  unoptimized
                  className="block h-auto w-full"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-6 flex max-w-[1000px] flex-col gap-12 md:gap-14">
          <article className="bg-transparent">
            <Link
              href="/gemra"
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[24px]"
            >
              <Image
                src="/gemra-case-study-cover.svg"
                alt="Gemra staking platform case study cover"
                width={1000}
                height={675}
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:rounded-[24px]"
              />
            </Link>
            <div className="mx-auto mt-4 max-w-[584px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                Gemra — staking platform
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                Designed a fixed-term staking platform from 0 to launch,
                covering user research, product decisions, and interface
                design.{" "}
                <span className="text-[#1C1C22]">
                  Attracted $500K+ in staked tokens.
                </span>{" "}
                Post-launch iteration{" "}
                <span className="text-[#1C1C22]">
                  increased auto-compound adoption by 44%.
                </span>
              </p>
            </div>
          </article>

          <article id="portfolio-shot-2" className="bg-transparent">
            <Link
              href="/wawen"
              className="group block cursor-pointer overflow-hidden rounded-[16px] md:rounded-[24px]"
            >
              <Image
                src="/portfolio/router-admin-panel.svg"
                alt="Wawen router admin panel case study cover"
                width={1622}
                height={1080}
                className="block h-auto w-full rounded-[16px] transition-transform duration-[240ms] ease-[ease] will-change-transform group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:rounded-[24px]"
              />
            </Link>
            <div className="mx-auto mt-4 max-w-[584px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                Wawen — router admin panel
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                Designed a router admin panel from scratch for both casual
                users and network administrators. Reorganized a&nbsp;complex
                networking product into clearer flows, with Basic and Advanced
                modes for different levels of control.
              </p>
            </div>
          </article>

          <article className="bg-transparent">
            <div className="relative overflow-hidden rounded-[16px] md:rounded-[24px]">
              <div className="absolute right-4 top-4 z-10 flex h-6 items-center rounded-full bg-[#FDFDFC] px-[10px] font-mono text-[12px] leading-4 font-medium text-[#5F5D68] shadow-[0_0_1px_rgba(0,0,0,0.08)]">
                COMING SOON
              </div>
              <Image
                src="/kelvpn-case-study-cover-white.png"
                alt="KelVPN application case study cover"
                width={1152}
                height={768}
                className="block h-auto w-full rounded-[16px] md:rounded-[24px]"
              />
            </div>
            <div className="mx-auto mt-4 max-w-[584px]">
              <h2 className="font-heading text-[17px] leading-6 font-medium text-[#1C1C22]">
                KelVPN — VPN application
              </h2>
              <p className="type-body-large mt-3 text-[var(--text-body)]">
                Designed the complete interface and drove product iterations.
                Created a trial-to-purchase flow that{" "}
                <span className="text-[#1C1C22]">
                  increased free-to-paid conversion by 18%.
                </span>{" "}
                Simplified the hybrid VPN feature through 3 iterations,{" "}
                <span className="text-[#1C1C22]">
                  growing adoption by 27%.
                </span>
              </p>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
