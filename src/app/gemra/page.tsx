import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnalysisButtons } from "@/components/AnalysisButtons";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Gemra case — Bogdan, product designer",
  description: "Case study for the Gemra staking platform project.",
};

const introParagraphs = [
  "A blockchain project needed a staking platform for its native token, from scratch.",
  "I worked on it as the product designer end to end: from research and problem framing to the staking flow and portfolio interface. I spoke with token holders, mapped the trust barriers specific to a young project without major CEX listings, and turned those findings into product decisions.",
  "This was fixed-term staking with lock periods from 3 to 12 months. Unlike flexible staking, users had to commit upfront with no early exit, which changed both the psychology of the decision and what the interface needed to explain before they could move forward.",
  "The product launched and attracted $500K+ in total value locked. After launch, a targeted iteration on the auto-compound feature increased its adoption by 44%.",
  "I vibe-coded this fully functional prototype to bring the case to life — the project name has been changed, but every interaction works as designed: staking, lock period selection, auto-compound toggle, and position management.",
] as const;

const challengeParagraphs = [
  "Most staking platforms offer flexible mechanics — users can withdraw their tokens at any time. This project took a different approach: fixed-term staking with lock periods from 3 to 12 months, where longer commitment means higher APY.",
  "Unlike flexible staking, fixed-term requires users to commit upfront. They lock their tokens for months with no way to exit, regardless of what happens to the market. That changes everything about how people make decisions and what they need from the interface to feel confident doing it.",
  "The design had to be built on a deep understanding of this specific audience, as\u00a0there were no direct competitors with the same mechanics to learn from.",
] as const;

const competitiveAnalysisParagraphs = [
  "I started with competitive analysis to understand what already exists. I walked through the full staking flow on several platforms: Marinade, Chorus One, Everstake. For each one I looked at how the staking form works and how the portfolio tab is structured.",
  "The pattern was consistent. Every platform offered flexible staking. Users could deposit and withdraw freely, with no commitment to a specific term.",
  "One thing all three got right: projected reward calculations. Users want to see what they'll earn before committing. That became a baseline requirement.",
  "Fixed-term staking with multiple lock periods and differentiated APY is a rare mechanic in the market. There were very few references to learn from, which made it especially important to talk to actual users before making design decisions.",
] as const;

const interviewParagraphs = [
  "Competitive analysis helped me understand the category, but it could not answer the main question: how would people decide whether to lock this specific token for months?",
  "The token was new, niche, and not listed on major CEXs. It could only be bought through DEX and one smaller exchange. That meant its holders were not random users. They had already made a conscious bet on an early-stage project, so staking was not a casual \"why not try it\" decision. It was closer to: do I trust this project enough to commit even more and lock my tokens for months?",
  "Before design, I discussed this with the stakeholder. The pressure to launch fast was real, and the first instinct was to copy other staking platforms. But most of those products were built around flexible staking with no lock. Our mechanics were different: fixed lock periods, no early exit, and a much higher psychological cost of making the wrong choice.",
  "So I suggested a short round of user interviews before moving forward.",
  "The research was intentionally lightweight. We did not need a recruiting budget because the project already had an active Telegram community of token holders. One message in the group was enough to find participants, which made the research both fast and highly relevant.",
  "I ran 8 short interviews, 15 to 25 minutes each, with token holders who came in with very different levels of staking and DeFi experience.",
  "I was not trying to prove that people wanted staking. That part was already clear. I wanted to understand what makes them trust it, what makes them hesitate, and what they need to see before they are ready to lock.",
  "To keep the conversations structured, I used JTBD and the Switch framework. This helped me look at the decision from four angles: current behavior, what pushes people to change, what makes staking appealing, and what creates anxiety around locking. The conversations themselves were informal, and the table below was more of a guide than a strict script.",
] as const;

const clarityParagraphs = [
  "The interviews helped me separate two layers of hesitation.",
  "One came from the project itself. Since the token was new and not listed on major CEXs, some users were naturally cautious about committing for months. Design could not remove that completely, but it could make the decision feel clearer and less uncertain.",
  "The more actionable part was around the staking decision itself. Before locking, people wanted answers to a few simple questions: How much will I get? When do I unlock? Will I be able to get my tokens back at the end of the lock? And what does auto-compound actually mean?",
  "I also noticed that people were asking those questions for different reasons. Some were mostly afraid of making a mistake. Others cared more about reward math, volatility, and whether a longer lock really made sense.",
  "That was the point where I stopped looking at token holders as one group. The product was the same, but the decision patterns were different. That led me to define the main segments.",
] as const;

const segmentsParagraphs = [
  "After the interviews, I grouped participants into three segments.",
  "The point was not to invent three different audiences or three different flows. Everyone wanted roughly the same thing: to earn on tokens they were already planning to hold. And everyone needed the same basics from the interface: expected reward, unlock timing, and a clear explanation of what happens after staking.",
  "What segmentation gave me was a better read on the question behind the screen. The same tooltip or helper text could land very differently depending on who was reading it. If I only described the mechanic, I could still miss the actual doubt that was blocking the decision. That mattered later when I translated the research into interface copy, explanations, and decision support inside one shared flow.",
] as const;

const cjmParagraphs = [
  "I used JTBD and Switch thinking to understand what drives or blocks the staking decision. I did not create a separate journey map for each interview, because the flow itself was consistent across participants.",
  "What changed was not the sequence of steps, but the question each step had to answer for different segments. That is why one shared CJM worked better here: it\u00a0made it easier to see where the same screen had to resolve different kinds of\u00a0hesitation.",
] as const;

const interfaceParagraphs = [
  "The research gave me a more specific checklist for the interface.",
  "It had to explain how locked tokens come back, compare periods in token terms instead of APY alone, show what auto-compound changes in practice, add a review step before signing, and make the success state reassuring enough that users do not feel lost right after staking.",
  "That is what I designed next.",
] as const;

const setupParagraphs = [
  "This is the main staking setup screen, so its job was not just to collect inputs. It had to answer the questions that came up in research before the user moved closer to signing.",
  "I split the flow into steps, so staking would not feel like one heavy action from the start. That gave users a clearer sense of progress and reduced the fear of making a mistake before confirmation.",
  "I added tooltip-based explanations next to the decisions themselves, especially around lock period and reward settings. The goal was not to \"educate\" in general, but to answer the exact questions users had in research: what happens to the tokens after staking, what stays fixed, and what auto-compound actually changes.",
  "The reward block works as a live calculation layer. As users change the amount, lock period, and auto-compound setting, the projected outcome updates immediately. That makes the choice easier to evaluate in token terms instead of leaving the decision at the level of APY alone.",
  "I also added an FAQ block below the form. It closes the basic questions that still matter before commitment, without forcing users to leave the flow and search for answers elsewhere.",
] as const;

const unstakeParagraphs = [
  "The unstaking flow also handles an important edge case. If auto-compound was off, rewards accumulated separately. When the user unstakes that position, any unclaimed rewards are automatically claimed in the same action.",
  "I made that explicit in the interface, so users understand that they are receiving both the unstaked amount and the pending rewards, without needing to go through a separate claim flow.",
] as const;

const iterationParagraphs = [
  "After launch, only 37% of users who created a stake left auto-compound enabled.",
  "This mattered at the product level. For the project, auto-compound meant more rewards staying inside staking instead of sitting separately as claimable balance. In practice, that increases the share of tokens that remain staked, supports TVL growth over time, and makes the staking program work better as a retention and token-holding mechanism.",
  "My hypothesis was that the existing tooltip was too weak as the main explanation layer. Many users likely never opened it, and even when they did, it still required extra effort to translate the mechanic into an outcome. Instead of hiding the explanation behind an optional interaction, I wanted the interface to state the consequence of the choice directly inside the auto-compound block.",
] as const;

const impactItems = [
  "Designed the staking product end to end: from research and problem framing to the staking flow, portfolio dashboard, and post-launch iteration.",
  "Turned user interviews into concrete product decisions for a fixed-term staking model with no early exit, where trust and commitment were much bigger factors than in a typical flexible staking flow.",
  "Built a step-based staking setup with inline explanations, token-based reward calculation, FAQ support, portfolio tracking, and unstake handling for positions with pending rewards.",
  "Helped the project to reach $500K+ in total value locked.",
  "After launch, increased auto-compound adoption among new staking users by 44% relative to the original baseline.",
] as const;

const segmentDetails = [
  {
    title: "New to staking",
    badgeSrc: "/gemra/badge-1.png",
    description:
      "They were not thinking about optimization yet. First they wanted to feel safe using the product at all. Their core concern was understanding what happens to their tokens after staking and feeling confident they would be able\u00a0to get them back when the lock ends.",
  },
  {
    title: "CEX-native users",
    badgeSrc: "/gemra/badge-2.png",
    description:
      "They already understood the value of staking, but mostly through big mainstream platforms. What they needed here was a decision that felt concrete enough to trust outside a CEX: clear reward, clear timing, and a\u00a0clear understanding of what exactly they were agreeing to.",
  },
  {
    title: "Active DeFi users",
    badgeSrc: "/gemra/badge-3.png",
    description:
      "They did not need the mechanics explained from scratch. They were evaluating the tradeoff: how much extra reward each period adds, what auto-compound changes in practice, and whether the additional yield is\u00a0worth giving up flexibility.",
  },
] as const;

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.75 11.25L11.25 4.75M11.25 4.75H6.25M11.25 4.75V9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaseButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="type-body-medium inline-flex h-12 w-full items-center justify-center gap-1 rounded-[12px] bg-[#F5F5F5] text-[var(--text-strong)] hover:bg-[#EBEBEB] focus-visible:bg-[#EBEBEB]"
    >
      <span>{children}</span>
      <ArrowUpRight />
    </a>
  );
}

function CaseSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-[584px] ${className}`.trim()}>
      <h2 className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function TextStack({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="type-body-large text-[var(--text-body)]">
          {paragraph}
        </p>
      ))}
    </>
  );
}

function VisualFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[12px] bg-[#f5f5f5] shadow-[0_0_0_1px_rgba(28,28,34,0.03)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function HeroCover() {
  return (
    <div className="overflow-hidden rounded-[12px]">
      <Image
        src="/gemra/image-cover-gemra.svg"
        alt="Gemra case study cover"
        width={1000}
        height={492}
        className="h-auto w-full"
        priority
      />
    </div>
  );
}

function SegmentsDetailCards() {
  return (
    <div className="mx-auto mt-6 flex max-w-[584px] flex-col gap-3">
      {segmentDetails.map((segment) => (
        <div
          key={segment.title}
          className="relative overflow-hidden rounded-[12px] bg-[#F5F5F5] px-6 py-6 md:overflow-visible"
        >
          <Image
            src={segment.badgeSrc}
            alt=""
            width={75}
            height={76}
            className="pointer-events-none absolute right-3 top-3 z-10 h-[38px] w-[38px] rotate-[15deg] object-contain md:right-[-36px] md:top-[8px] md:h-[76px] md:w-[75px]"
          />
          <p className="type-body-large text-[var(--text-strong)]">
            {segment.title}
          </p>
          <div className="mt-3 h-px bg-[#EEEEEE]" />
          <p className="mt-3 type-body-large text-[var(--text-body)]">
            {segment.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function ImpactSummary() {
  return (
    <div className="mx-auto max-w-[584px] rounded-2xl bg-[#f5f5f5] px-5 py-6 md:px-6">
      <p className="type-body-large text-[var(--text-body)]">
        After the update, the share of new staking users who left
        auto-compound enabled rose from 37% to 53.3% —{" "}
        <span className="text-[#1C1C22]">
          a 44% relative increase from the original baseline.
        </span>
      </p>
    </div>
  );
}

export default function GemraPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] px-4 pb-8 pt-6 md:px-6 md:pb-24 md:pt-12 lg:px-12">
      <div className="mx-auto max-w-[1512px]">
        <div className="mx-auto max-w-[1000px]">
          <HeroCover />
        </div>

        <section className="mx-auto mt-8 max-w-[584px] md:mt-10">
          <h1 className="font-heading text-[20px] leading-6 font-medium text-[var(--text-strong)]">
            Gemra — staking platform
          </h1>
          <div className="mt-3 space-y-3">
            {introParagraphs.map((paragraph, index) => (
              <p key={paragraph} className="type-body-large text-[var(--text-body)]">
                {index === 3 ? (
                  <>
                    The product launched and attracted{" "}
                    <span className="text-[var(--text-strong)]">
                      $500K+ in total value locked.
                    </span>{" "}
                    After launch, a targeted iteration on the auto-compound
                    feature{" "}
                    <span className="text-[var(--text-strong)]">
                      increased its adoption by 44%.
                    </span>
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
          <div className="mt-4">
            <CaseButton href="#">Try live prototype</CaseButton>
          </div>
        </section>

        <CaseSection title="The challenge" className="mt-14 md:mt-16">
          <TextStack paragraphs={challengeParagraphs} />
        </CaseSection>

        <CaseSection
          title="Competitive analysis"
          className="mt-14 md:mt-16"
        >
          <TextStack paragraphs={competitiveAnalysisParagraphs} />
        </CaseSection>
        <AnalysisButtons />

        <CaseSection title="User interviews" className="mt-14 md:mt-16">
          <TextStack paragraphs={interviewParagraphs} />
        </CaseSection>
        <div className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[12px]">
          <Image
            src="/gemra/questions-1.svg"
            alt="Questions framework"
            width={1000}
            height={600}
            className="h-auto w-full"
          />
        </div>

        <CaseSection title="What became clear" className="mt-14 md:mt-16">
          <TextStack paragraphs={clarityParagraphs} />
        </CaseSection>

        <CaseSection title="Segments" className="mt-14 md:mt-16">
          <TextStack paragraphs={segmentsParagraphs} />
        </CaseSection>
        <SegmentsDetailCards />

        <CaseSection title="CJM" className="mt-14 md:mt-16">
          <TextStack paragraphs={cjmParagraphs} />
        </CaseSection>
        <div className="mx-auto mt-6 max-w-[1000px] overflow-hidden rounded-[12px]">
          <Image
            src="/gemra/cjm.svg"
            alt="Customer journey map"
            width={1000}
            height={600}
            className="h-auto w-full"
          />
        </div>

        <CaseSection title="Interface" className="mt-14 md:mt-16">
          <TextStack paragraphs={interfaceParagraphs} />
          <div className="pt-1">
            <CaseButton href="#">Try live prototype</CaseButton>
          </div>
        </CaseSection>

        <div className="mx-auto mt-6 max-w-[1000px]">
          <VisualFrame>
            <Image
              src="/gemra/interface-1.svg"
              alt="Gemra staking interface"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <VisualFrame>
                <Image
                  src="/gemra/lock-period-tooltip.svg"
                  alt="Lock period tooltip"
                  width={494}
                  height={458}
                  className="h-auto w-full"
                />
              </VisualFrame>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                Lock period tooltip
              </p>
            </div>
            <div>
              <VisualFrame>
                <Image
                  src="/gemra/auto-compound-tooltip.svg"
                  alt="Auto-compound tooltip"
                  width={494}
                  height={458}
                  className="h-auto w-full"
                />
              </VisualFrame>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                Auto-compound tooltip
              </p>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-[584px] md:mt-12">
          <div className="flex flex-col gap-3">
            <TextStack paragraphs={setupParagraphs} />
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[1000px] space-y-3">
          <VisualFrame>
            <Image
              src="/gemra/interface-02.svg"
              alt="Interface screen 2"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
          <VisualFrame>
            <Image
              src="/gemra/interface-03.svg"
              alt="Interface screen 3"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
          <VisualFrame>
            <Image
              src="/gemra/interface-04.svg"
              alt="Interface screen 4"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
        </div>

        <p className="mx-auto mt-14 max-w-[584px] text-center type-body-large text-[var(--text-body)]">
          Unstake screens
        </p>

        <div className="mx-auto mt-6 max-w-[1000px] space-y-3">
          <VisualFrame>
            <Image
              src="/gemra/unstake-interface.svg"
              alt="Unstake interface"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
          <VisualFrame>
            <Image
              src="/gemra/unstake-blank.png"
              alt="Unstake empty state"
              width={3000}
              height={2025}
              className="h-auto w-full"
            />
          </VisualFrame>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <VisualFrame>
                <Image
                  src="/gemra/unstake-modal-01.svg"
                  alt="Pending rewards included in unstake"
                  width={494}
                  height={458}
                  className="h-auto w-full"
                />
              </VisualFrame>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                Pending rewards included in unstake
              </p>
            </div>
            <div>
              <VisualFrame>
                <Image
                  src="/gemra/unstake-modal-02.svg"
                  alt="No pending rewards to claim"
                  width={494}
                  height={458}
                  className="h-auto w-full"
                />
              </VisualFrame>
              <p className="type-caption mt-3 text-center text-[#5F5D68]">
                No pending rewards to claim
              </p>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-14 max-w-[584px]">
          <div className="flex flex-col gap-3">
            <TextStack paragraphs={unstakeParagraphs} />
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-[584px]">
          <div className="h-px w-full bg-[#EEEEEE]" />
        </div>

        <div className="mx-auto mt-14 max-w-[1000px]">
          <VisualFrame>
            <Image
              src="/gemra/portfolio-img.svg"
              alt="Portfolio"
              width={1000}
              height={675}
              className="h-auto w-full"
            />
          </VisualFrame>
          <p className="type-caption mt-3 text-center text-[#5F5D68]">
            Portfolio
          </p>

          <VisualFrame className="mt-6">
            <Image
              src="/gemra/harvesting-img.svg"
              alt="Harvest all available rewards"
              width={1000}
              height={637}
              className="block h-auto w-full"
            />
          </VisualFrame>
          <p className="type-caption mt-3 text-center text-[#5F5D68]">
            Harvest all available rewards
          </p>

          <VisualFrame className="mt-6">
            <Image
              src="/gemra/wallet-img.svg"
              alt="Wallet overview"
              width={1000}
              height={637}
              className="block h-auto w-full"
            />
          </VisualFrame>
          <p className="type-caption mt-3 text-center text-[#5F5D68]">
            Wallet overview
          </p>
        </div>

        <CaseSection
          title="Post-launch iteration: increasing auto-compound adoption"
          className="mt-14 md:mt-16"
        >
          <TextStack paragraphs={iterationParagraphs} />
        </CaseSection>

        <BeforeAfterSlider
          className="mt-6"
          beforeSrc="/gemra/old-interface.svg"
          afterSrc="/gemra/updated-interface.svg"
          beforeAlt="Old interface"
          afterAlt="Updated interface"
        />

        <div className="mt-6">
          <ImpactSummary />
        </div>

        <CaseSection title="Impact" className="mt-14 md:mt-16">
          {impactItems.map((item) => (
            <p key={item} className="type-body-large text-[var(--text-body)]">
              — {item}
            </p>
          ))}
        </CaseSection>

        <div className="mx-auto mt-12 max-w-[584px]">
          <Link
            href="/?tab=case-studies"
            className="type-body-medium flex h-12 items-center justify-center rounded-[12px] bg-[#F5F5F5] text-[var(--text-strong)] hover:bg-[#EBEBEB] focus-visible:bg-[#EBEBEB]"
          >
            Home page
          </Link>
        </div>
      </div>
    </main>
  );
}
