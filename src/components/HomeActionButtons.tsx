"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const EMAIL = "exlambo@gmail.com";
const TOAST_DURATION_MS = 2200;
const TOAST_ENTER_MS = 180;
const TOAST_EXIT_MS = 120;
type ToastPhase = "entering" | "visible" | "exiting";

export function HomeActionButtons() {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<ToastPhase>("entering");
  const hideTimeoutRef = useRef<number | null>(null);
  const unmountTimeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (unmountTimeoutRef.current !== null) {
      window.clearTimeout(unmountTimeoutRef.current);
      unmountTimeoutRef.current = null;
    }

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    clearTimers();

    setIsMounted(true);
    setPhase("entering");
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = window.requestAnimationFrame(() => {
        setPhase("visible");
        frameRef.current = null;
      });
    });

    hideTimeoutRef.current = window.setTimeout(() => {
      setPhase("exiting");
      hideTimeoutRef.current = null;

      unmountTimeoutRef.current = window.setTimeout(() => {
        setIsMounted(false);
        unmountTimeoutRef.current = null;
      }, TOAST_EXIT_MS);
    }, TOAST_DURATION_MS);
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="#" tone="primary">
          Telegram
        </Button>
        <Button
          href="/cv-bogdan-kachatov.pdf"
          target="_blank"
          rel="noreferrer"
          tone="secondary"
        >
          View CV
        </Button>
        <Button tone="secondary" onClick={handleCopyEmail}>
          Copy Email
        </Button>
      </div>

      {isMounted ? (
        <div
          aria-live="polite"
          style={{
            transitionDuration: `${
              phase === "exiting" ? TOAST_EXIT_MS : TOAST_ENTER_MS
            }ms`,
          }}
          className={`pointer-events-none fixed right-4 top-4 z-50 will-change-transform transition-[opacity,transform] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
            phase === "visible"
              ? "translate-y-0 opacity-100"
              : phase === "entering"
                ? "-translate-y-1 opacity-0"
                : "translate-y-0 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-[6px] rounded-[12px] bg-white px-4 py-3 shadow-[0_0_1px_rgba(0,0,0,0.24)]">
            <Image
              src="/copy-success.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
            <p className="type-body-medium whitespace-nowrap text-center text-[#1C1C22]">
              Email copied
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
