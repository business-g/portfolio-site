import { Suspense } from "react";
import Image from "next/image";

import { ContactLink } from "@/components/ContactLink";
import { HomePortfolioContent } from "@/components/HomePortfolioContent";
import { UpButton } from "@/components/UpButton";

export default function Home() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[var(--page-background)] pb-8"
    >
      <section className="mx-auto max-w-[1120px] pt-4 md:pt-[4.5rem]">
        <div className="mx-auto w-full px-4 md:max-w-[508px] md:px-0">
          <div className="home-reveal relative inline-flex" style={{ animationDelay: "0ms" }}>
            <Image
              src="/avatar-site.webp"
              alt="Bogdan avatar"
              width={60}
              height={60}
              sizes="60px"
              priority
              className="size-[60px] rounded-full object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute bottom-0 right-[-4px] size-5 overflow-hidden rounded-[4px] bg-white shadow-[0_0_1px_rgba(0,0,0,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/coffee-icon.gif"
                alt=""
                width={12}
                height={14}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute left-1/2 top-1/2 h-[14px] w-3 -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </div>
          </div>

          <div className="mt-4 max-w-[508px] space-y-3">
            <p className="home-reveal type-body-large text-[var(--text-strong)]" style={{ animationDelay: "40ms" }}>
              Hey, I’m Bogdan, a&nbsp;product designer.
            </p>
            <p className="home-reveal type-body-large text-[var(--text-body)]" style={{ animationDelay: "75ms" }}>
              I like getting into a product early, understanding how it works,
              and helping&nbsp;shape ideas into thoughtful, usable experiences.
            </p>
            <p className="home-reveal type-body-large text-[var(--text-body)]" style={{ animationDelay: "110ms" }}>
              I care a lot about interaction, motion, and the small details that
              make a&nbsp;product feel polished. AI is part of my design process,
              from early exploration to production-ready prototypes.
            </p>
            <p className="home-reveal type-body-large text-[var(--text-body)]" style={{ animationDelay: "145ms" }}>
              My experience includes working with startups and product teams
              in&nbsp;Web3, HR tech, DevTools, workplace software, and e-commerce.
            </p>
            <p className="home-reveal type-body-large text-[var(--text-body)]" style={{ animationDelay: "180ms" }}>
              You can reach me on{" "}
              <ContactLink
                href="https://x.com/kctv_b"
                target="_blank"
                rel="noreferrer"
                lineClassName="contact-link-line pointer-events-none absolute left-1/2 top-[calc(100%+1px)] block h-1 w-[62px] -translate-x-1/2 bg-[#0D0D0D] [mask-image:url('/link-line.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/link-line.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
              >
                X (Twitter)
              </ContactLink>
              ,{" "}
              <ContactLink
                href="https://t.me/kctv_b"
                target="_blank"
                rel="noreferrer"
                lineClassName="contact-link-line pointer-events-none absolute left-1/2 top-[calc(100%+1px)] block h-1 w-[62px] -translate-x-1/2 bg-[#2DA0D9] [mask-image:url('/link-line.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/link-line.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
              >
                Telegram
              </ContactLink>
              , or by{" "}
              <ContactLink
                href="mailto:exlambo@gmail.com"
                lineClassName="contact-link-line pointer-events-none absolute left-1/2 top-[calc(100%+1px)] block h-[5px] w-[38px] -translate-x-1/2 bg-[#F4B342] [mask-image:url('/email-line.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/email-line.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
              >
                Email
              </ContactLink>
              .
            </p>
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
