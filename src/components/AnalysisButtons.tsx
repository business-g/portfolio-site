"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const analysisButtons = [
  {
    id: "marinade",
    src: "/gemra/analysis-marinade.svg",
    alt: "Marinade",
    width: 32,
    height: 32,
    className: "size-8",
  },
  {
    id: "everstake",
    src: "/gemra/analysis-everstake.svg",
    alt: "Everstake",
    width: 150,
    height: 40,
    className: "h-10 w-[90px] max-w-none object-contain md:h-8 md:w-[122px]",
  },
  {
    id: "chorus-one",
    src: "/gemra/analysis-chorus-one.svg",
    alt: "Chorus One Staking",
    width: 150,
    height: 40,
    className: "h-10 w-[90px] max-w-none object-contain md:h-8 md:w-[122px]",
  },
] as const;

const modalContent = {
  marinade: {
    title: "Marinade",
    subtitle: undefined,
    images: [
      {
        src: "/gemra/marinade-01.png",
        alt: "Marinade staking form",
        width: 240,
        height: 189,
        className:
          "block h-auto w-[calc(100%+2px)] max-w-none -translate-x-px -translate-y-px",
      },
      {
        src: "/gemra/marinade-02.png",
        alt: "Marinade portfolio overview",
        width: 340,
        height: 189,
        className: "block h-auto w-full",
      },
    ],
    items: [
      {
        label: "Estimated annual reward shown before committing",
        color: "#13A98B",
      },
      {
        label: "Tooltips for staking terminology",
        color: "#13A98B",
      },
      {
        label: "All positions can be unstaked with a single button",
        color: "#13A98B",
      },
      {
        label: "Clear data and status tracking per position",
        color: "#13A98B",
      },
      {
        label: "Reward growth chart with period filters",
        color: "#13A98B",
      },
      {
        label: "Rewards are shown as a total, not broken down per position",
        color: "#E4C723",
      },
    ],
  },
  everstake: {
    title: "Everstake",
    subtitle: undefined,
    images: [
      {
        src: "/gemra/everstake-01.png",
        alt: "Everstake staking form",
        width: 290,
        height: 189,
        className: "block h-auto w-full",
      },
      {
        src: "/gemra/everstake-02.png",
        alt: "Everstake dashboard overview",
        width: 290,
        height: 189,
        className: "block h-auto w-full",
      },
    ],
    items: [
      {
        label: "Generated rewards stats are available",
        color: "#13A98B",
      },
      {
        label: "All positions can be unstaked with a single button",
        color: "#13A98B",
      },
      {
        label: "No projected reward shown",
        color: "#E4C723",
      },
      {
        label: "Support link is hard to find",
        color: "#E4C723",
      },
      {
        label:
          "Positions are not separated, everything is aggregated into one total",
        color: "#E4C723",
      },
      {
        label: "No FAQ",
        color: "#EC5833",
      },
    ],
  },
  "chorus-one": {
    title: "Chorus One",
    subtitle: undefined,
    images: [
      {
        src: "/gemra/chorus-01-v2.png",
        alt: "Chorus One staking form",
        width: 240,
        height: 189,
        className: "block h-auto w-full",
      },
      {
        src: "/gemra/chorus-02-v2.png",
        alt: "Chorus One portfolio overview",
        width: 340,
        height: 189,
        className: "block h-auto w-full",
      },
    ],
    items: [
      {
        label: "Projected rewards are shown by period",
        color: "#13A98B",
      },
      {
        label: "FAQ is available",
        color: "#13A98B",
      },
      {
        label: "All positions can be unstaked with a single button",
        color: "#13A98B",
      },
      {
        label: "Reward growth chart with period filters",
        color: "#13A98B",
      },
      {
        label:
          "Positions are not separated, everything is aggregated into one total",
        color: "#E4C723",
      },
      {
        label: "Weak visual hierarchy when there is a lot of data",
        color: "#E4C723",
      },
    ],
  },
} as const;

const MODAL_ENTER_MS = 220;
const MODAL_EXIT_MS = 180;

type AnalysisButtonId = (typeof analysisButtons)[number]["id"];
type AnalysisButtonConfig = {
  id: AnalysisButtonId;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};
type ModalImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};
type ModalItem = {
  label: string;
  color: string;
};
type ModalConfig = {
  title: string;
  subtitle?: string;
  images: readonly ModalImage[];
  items: readonly ModalItem[];
};

type AnalysisButtonsProps = {
  buttons?: readonly AnalysisButtonConfig[];
  contentOverrides?: Partial<Record<AnalysisButtonId, Partial<ModalConfig>>>;
};

export function AnalysisButtons({
  buttons = analysisButtons,
  contentOverrides,
}: AnalysisButtonsProps) {
  const [activeButton, setActiveButton] = useState<AnalysisButtonId | null>(
    null,
  );
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModal = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setIsVisible(false);

    if (prefersReducedMotion) {
      setIsMounted(false);
      setActiveButton(null);
      return;
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsMounted(false);
      setActiveButton(null);
      closeTimeoutRef.current = null;
    }, MODAL_EXIT_MS);
  }, [prefersReducedMotion]);

  const openModal = useCallback(
    (buttonId: AnalysisButtonId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

      setActiveButton(buttonId);
    setIsMounted(true);
    },
    [],
  );

  const currentModal =
    activeButton === null
      ? null
      : {
          ...(modalContent[activeButton] as ModalConfig),
          ...contentOverrides?.[activeButton],
        };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isMounted]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="mx-auto mt-6 max-w-[584px]">
        <div className="relative pb-px md:h-[152px]">
          <div className="absolute left-[70px] right-0 top-2 h-px bg-[#EEEEEE]" />
          <div className="type-caption text-[var(--text-body)] uppercase">
            Analysis
          </div>
          <div className="mt-4 flex flex-col gap-3 md:absolute md:inset-x-0 md:top-8 md:mt-0 md:flex-row">
            {buttons.map((button) => (
              <button
                key={button.alt}
                type="button"
                onClick={() => openModal(button.id)}
                className="flex h-24 min-h-24 w-full cursor-pointer appearance-none items-center justify-center rounded-[12px] border-0 bg-[#F5F5F5] px-[34px] outline-none hover:bg-[#EBEBEB] focus-visible:bg-[#EBEBEB] md:flex-1"
                aria-label={`Open ${button.alt} analysis`}
              >
                <Image
                  src={button.src}
                  alt={button.alt}
                  width={button.width}
                  height={button.height}
                  className={button.className}
                />
              </button>
            ))}
          </div>
          <div className="mt-6 h-px bg-[#EEEEEE] md:absolute md:inset-x-0 md:bottom-0 md:mt-0" />
        </div>
      </section>

      {isMounted && currentModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity will-change-[opacity]"
          style={{
            backgroundColor: "rgba(28,28,34,0.18)",
            opacity: isVisible ? 1 : 0,
            transitionDuration: prefersReducedMotion
              ? "0ms"
              : `${isVisible ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          }}
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="analysis-modal-title"
            className="w-full max-w-[648px] rounded-[24px] bg-white p-8 transition-[opacity,transform] will-change-[opacity,transform]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: prefersReducedMotion
                ? "none"
                : isVisible
                  ? "translateY(0px) scale(1)"
                  : "translateY(16px) scale(0.985)",
              transitionDuration: prefersReducedMotion
                ? "0ms"
                : `${isVisible ? MODAL_ENTER_MS : MODAL_EXIT_MS}ms`,
              transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                id="analysis-modal-title"
                className="font-heading text-[17px] leading-6 font-medium text-[var(--text-strong)]"
              >
                {currentModal.title}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="type-caption flex cursor-pointer appearance-none items-center gap-1 border-0 bg-transparent p-0 uppercase text-[#8E8C95] outline-none transition-colors hover:text-[#A5A3AC] focus-visible:text-[#A5A3AC]"
                aria-label="Close analysis modal"
              >
                <span>ESC</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {currentModal.subtitle ? (
              <p className="mt-[14px] type-body-large text-[var(--text-body)]">
                {currentModal.subtitle}
              </p>
            ) : null}

            {currentModal.images.length <= 1 ? (
              <div className="mt-[14px] overflow-hidden rounded-[4px] shadow-[0_0_1px_rgba(0,0,0,0.16)]">
                <Image
                  src={currentModal.images[0].src}
                  alt={currentModal.images[0].alt}
                  width={currentModal.images[0].width}
                  height={currentModal.images[0].height}
                  className={currentModal.images[0].className}
                />
              </div>
            ) : (
              <div
                className={`mt-[14px] grid gap-1 ${
                  activeButton === "everstake" || activeButton === "chorus-one"
                    ? "md:grid-cols-2"
                    : "md:grid-cols-[240px_minmax(0,1fr)]"
                }`}
              >
                <div
                  className={`overflow-hidden rounded-[4px] border border-[#F5F5F5] bg-white ${
                    activeButton === "everstake" || activeButton === "chorus-one"
                      ? "h-[144px]"
                      : ""
                  }`}
                >
                  <Image
                    src={currentModal.images[0].src}
                    alt={currentModal.images[0].alt}
                    width={currentModal.images[0].width}
                    height={currentModal.images[0].height}
                    className={
                      activeButton === "everstake" || activeButton === "chorus-one"
                        ? "block h-full w-full object-cover object-top"
                        : currentModal.images[0].className
                    }
                  />
                </div>
                <div
                  className={`overflow-hidden rounded-[4px] border border-[#F5F5F5] bg-white ${
                    activeButton === "everstake" || activeButton === "chorus-one"
                      ? "h-[144px]"
                      : ""
                  }`}
                >
                  <Image
                    src={currentModal.images[1].src}
                    alt={currentModal.images[1].alt}
                    width={currentModal.images[1].width}
                    height={currentModal.images[1].height}
                    className={
                      activeButton === "everstake" || activeButton === "chorus-one"
                        ? "block h-full w-full object-cover object-top"
                        : currentModal.images[1].className
                    }
                  />
                </div>
              </div>
            )}

            <ul className="mt-8 space-y-3">
              {currentModal.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="type-body-large text-[var(--text-body)]">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
