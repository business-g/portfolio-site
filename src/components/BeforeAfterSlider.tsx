"use client";

import { useId, useState } from "react";
import Image from "next/image";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();

  return (
    <div className={`mx-auto max-w-[1000px] ${className}`.trim()}>
      <div className="relative overflow-hidden rounded-[12px] bg-[#F5F5F5]">
        <div className="relative aspect-[1000/675] w-full">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>

          <div
            className="pointer-events-none absolute bottom-0 top-0 z-10 w-px bg-white/90"
            style={{ left: `${position}%` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/95 shadow-[0_10px_30px_rgba(28,28,34,0.18)]"
            style={{ left: `${position}%` }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4 text-[#1C1C22]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6L4 10L8 14M12 6L16 10L12 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <label htmlFor={sliderId} className="sr-only">
            Compare old and updated interface
          </label>
          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            className="absolute inset-0 z-20 m-0 h-full w-full cursor-ew-resize opacity-0"
            aria-label="Before and after comparison slider"
          />
        </div>
      </div>
    </div>
  );
}
