"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import {
  ChessKingIcon,
  type ChessKingIconHandle,
} from "@/components/ui/chess-king";
import {
  FolderOpenIcon,
  type FolderOpenIconHandle,
} from "@/components/ui/folder-open";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "visual",
    label: "Visual",
    Icon: ChessKingIcon,
  },
  {
    id: "case-studies",
    label: "Case studies",
    Icon: FolderOpenIcon,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

type PortfolioSwitcherProps = {
  className?: string;
  activeTab?: TabId;
  defaultTab?: TabId;
  onTabChange?: (tab: TabId) => void;
};

export function PortfolioSwitcher({
  className = "",
  activeTab: controlledActiveTab,
  defaultTab = "visual",
  onTabChange,
}: PortfolioSwitcherProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<TabId>(defaultTab);
  const prefersReducedMotion = useReducedMotion();
  const chessKingRef = useRef<ChessKingIconHandle>(null);
  const folderRef = useRef<FolderOpenIconHandle>(null);
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = (tab: TabId) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tab);
    }

    onTabChange?.(tab);
  };

  return (
    <div
      className={cn(
        "inline-flex rounded-full bg-[var(--surface-elevated)] p-0.5",
        className
      )}
      role="tablist"
      aria-label="Portfolio categories"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        const iconRef = id === "visual" ? chessKingRef : folderRef;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${id}-panel`}
            id={`${id}-tab`}
            onClick={() => handleTabChange(id)}
            onMouseEnter={() => iconRef.current?.startAnimation()}
            onMouseLeave={() => iconRef.current?.stopAnimation()}
            className={`type-body-medium relative inline-flex cursor-pointer appearance-none items-center gap-2 rounded-full border-0 px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
              isActive
                ? "text-[var(--text-strong)]"
                : "text-[var(--text-body)]"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="portfolio-switcher-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[var(--shadow-soft)]"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.22,
                        ease: [0.645, 0.045, 0.355, 1],
                      }
                }
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              <Icon
                ref={iconRef}
                size={16}
                strokeWidth={1.5}
                className={isActive ? "text-[var(--text-strong)]" : "text-[var(--text-body)]"}
              />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
