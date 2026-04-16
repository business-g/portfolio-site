import { Suspense } from "react";
import Image from "next/image";
import { HomeActionButtons } from "@/components/HomeActionButtons";
import { HomePortfolioContent } from "@/components/HomePortfolioContent";
import { UpButton } from "@/components/UpButton";

const stackItems = [
  {
    label: "Figma",
    src: "/stack-figma.svg",
  },
  {
    label: "Claude code",
    src: "/stack-claude-code.svg",
  },
  {
    label: "Codex",
    src: "/stack-codex.svg",
  },
  {
    label: "Jitter",
    src: "/stack-jitter.svg",
  },
  {
    label: "Pencil",
    src: "/stack-pencil.svg",
  },
  {
    label: "Midjourney",
    src: "/stack-midjourney.svg",
  },
] as const;

function InlineArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 8"
      className="mx-0.5 inline-block h-2 w-2.5 align-[0.02em]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4H8M8 4L5.5 1.5M8 4L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[var(--page-background)] pb-8"
    >
      <section className="mx-auto max-w-[1512px] px-4 pt-4 md:px-6 md:pt-[4.5rem] lg:px-12">
        <div className="mx-auto w-full md:max-w-[584px]">
          <div className="relative inline-flex">
            <Image
              src="/site-avatar-main.png"
              alt="Bogdan avatar"
              width={52}
              height={52}
              className="rounded-full object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute bottom-0 right-[-4px] size-5 overflow-hidden rounded-[4px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.12)]">
              <Image
                src="/coffee-icon.png"
                alt=""
                width={12}
                height={14}
                className="absolute left-1/2 top-1/2 h-[14px] w-3 -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="type-body-large text-[var(--text-strong)]">
              Hey, I’m Bogdan, a product designer.
            </p>
            <p className="type-body-large text-[var(--text-body)]">
              I’ve worked on products from 0
              <InlineArrowRight />
              1 and kept improving them after launch.
            </p>
            <p className="type-body-large text-[var(--text-body)]">
              Most of my experience is in Web3 and products with complex logic:
              dashboards, crypto wallet, VPN apps, and admin panels.
            </p>
            <p className="type-body-large text-[var(--text-body)]">
              I treat design as a question of timing and payoff: what needs to be
              solid now, what can ship lean, and what’s still too early to overbuild.
            </p>
          </div>

          <HomeActionButtons />

          <div className="relative mt-12 h-[105px] text-[var(--text-body)] md:mt-16 md:h-[79px]">
            <span className="type-caption absolute left-0 top-0 uppercase">
              Stack
            </span>
            <span className="absolute left-12 top-2 h-px w-[calc(100%-3rem)] bg-[var(--border-soft)]" />
            <div className="absolute left-0 top-7 flex w-[calc(100%-4px)] flex-wrap items-center gap-x-5 gap-y-3 md:top-8 md:w-auto md:flex-nowrap">
              {stackItems.map((item) => (
                <div
                  key={item.label}
                  className="type-body-large flex shrink-0 items-center gap-[5px] whitespace-nowrap"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    <Image
                      src={item.src}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--border-soft)]" />
          </div>
        </div>
        <Suspense fallback={null}>
          <HomePortfolioContent />
        </Suspense>

      </section>

      <UpButton />
    </main>
  );
}
