"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function UpButton() {
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const scrollToTop = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    const startY = window.scrollY;

    if (startY <= 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const duration = 180;
    const startTime = performance.now();
    const easeOutSoft = (t: number) => 1 - Math.pow(1 - t, 1.35);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutSoft(progress);

      window.scrollTo(0, startY * (1 - eased));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
  }, []);

  const triggerPress = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setIsPressed(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      timeoutRef.current = null;
    }, 150);
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const target = document.getElementById("portfolio-shot-2");

      if (!target) {
        setIsVisible(false);
        return;
      }

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY;
      const triggerLine = window.scrollY + window.innerHeight;

      setIsVisible(triggerLine >= targetTop);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("portfolio-content-change", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      window.removeEventListener("portfolio-content-change", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      if (event.code === "KeyW") {
        triggerPress();
        scrollToTop();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollToTop, triggerPress]);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      className={`fixed bottom-0 left-6 hidden h-[77px] w-[126px] cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none ring-0 transition-[transform,opacity,filter] duration-200 will-change-transform focus:outline-none focus-visible:outline-none focus-visible:ring-0 lg:block ${
        isVisible
          ? "translate-y-0 opacity-100 blur-0 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
          : "translate-y-full opacity-0 blur-[6px] ease-[cubic-bezier(0.215,0.61,0.355,1)] pointer-events-none"
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none`}
      onClick={() => {
        triggerPress();
        scrollToTop();
      }}
    >
      <Image
        src="/up-button-bg.svg"
        alt=""
        width={126}
        height={77}
        className="absolute inset-0 h-full w-full"
      />
      <Image
        src="/up-button-arrow.svg"
        alt=""
        width={24}
        height={24}
        className="absolute left-[51px] top-[11px] size-6"
      />
      <span
        className={`absolute left-1/2 top-[39px] flex size-6 -translate-x-1/2 items-center justify-center overflow-hidden rounded-[4px] bg-white text-[12px] leading-[16px] font-medium text-[#5F5D68] shadow-[var(--shadow-soft)] will-change-transform transition-transform duration-150 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
          isPressed ? "scale-[0.96]" : "scale-100"
        }`}
      >
        W
      </span>
    </button>
  );
}
