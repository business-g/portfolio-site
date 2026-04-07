import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--page-background)] pb-24">
      <section className="mx-auto max-w-[1512px] px-6 pt-[4.5rem] lg:px-12">
        <div className="mx-auto max-w-[584px]">
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

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#" tone="primary">
              Telegram
            </Button>
            <Button href="#" tone="secondary">
              View CV
            </Button>
            <Button href="mailto:hello@example.com" tone="secondary">
              Copy Email
            </Button>
          </div>

          <div className="relative mt-16 h-[79px] text-[var(--text-body)]">
            <span className="type-caption absolute left-0 top-0 uppercase">
              Stack
            </span>
            <span className="absolute left-12 top-2 h-px w-[calc(100%-3rem)] bg-[var(--border-soft)]" />
            <div className="absolute left-0 top-8 flex flex-nowrap items-center gap-5">
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

          <div className="mt-16 inline-flex rounded-full bg-[var(--surface-elevated)] p-0.5">
            <div className="type-body-medium flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[var(--text-strong)] shadow-[var(--shadow-soft)]">
              <span className="type-caption">◔</span>
              Visual
            </div>
            <div className="type-body-medium flex items-center gap-2 px-4 py-2 text-[var(--text-body)]">
              <span className="type-caption">⌲</span>
              Case stuides
            </div>
          </div>
        </div>

      </section>

      <button
        type="button"
        aria-label="Scroll to top"
        className="fixed bottom-6 left-6 flex h-[77px] w-[126px] items-start justify-center rounded-t-[40px] rounded-b-[28px] bg-[radial-gradient(circle_at_top,#f7f7f7,rgba(245,245,245,0.88)_55%,rgba(245,245,245,0.1)_100%)]"
      >
        <span className="mt-3 text-[1.25rem] text-[var(--text-muted)]">↑</span>
        <span className="type-caption absolute bottom-3 rounded-[4px] bg-white px-2 py-1 text-[var(--text-body)] shadow-[var(--shadow-soft)]">
          W
        </span>
      </button>
    </main>
  );
}
