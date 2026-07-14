"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useRef, useState } from "react";

import {
  ChessKingIcon,
  type ChessKingIconHandle,
} from "@/components/ui/chess-king";
import {
  CursorClickIcon,
  type CursorClickIconHandle,
} from "@/components/ui/cursor-click";
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
    mobileHidden: false,
  },
  {
    id: "interactive",
    label: "Interactive",
    Icon: CursorClickIcon,
    mobileHidden: true,
  },
  {
    id: "case-studies",
    label: "Case studies",
    Icon: FolderOpenIcon,
    mobileHidden: false,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];
type TabLabels = Partial<Record<TabId, string>>;
type SwitcherVariant = "plain" | "pill";

type PortfolioSwitcherProps = {
  className?: string;
  activeTab?: TabId;
  defaultTab?: TabId;
  onTabChange?: (tab: TabId) => void;
  labels?: TabLabels;
  showInteractiveTab?: boolean;
  variant?: SwitcherVariant;
};

export function PortfolioSwitcher({
  className = "",
  activeTab: controlledActiveTab,
  defaultTab = "visual",
  onTabChange,
  labels,
  showInteractiveTab = true,
  variant = "plain",
}: PortfolioSwitcherProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<TabId>(defaultTab);
  const prefersReducedMotion = useReducedMotion();
  const chessKingRef = useRef<ChessKingIconHandle>(null);
  const cursorClickRef = useRef<CursorClickIconHandle>(null);
  const folderRef = useRef<FolderOpenIconHandle>(null);
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const visibleTabs = tabs.filter(
    (tab) => showInteractiveTab || tab.id !== "interactive"
  );

  const handleTabChange = (tab: TabId) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tab);
    }

    onTabChange?.(tab);
  };

  const getIconRef = (id: TabId) =>
    id === "visual"
      ? chessKingRef
      : id === "interactive"
        ? cursorClickRef
        : folderRef;

  if (variant === "plain") {
    return (
      <div
        className={cn("inline-flex items-center gap-4", className)}
        role="tablist"
        aria-label="Portfolio categories"
      >
        {visibleTabs.map(({ id, label, Icon, mobileHidden }, index) => {
          const isActive = activeTab === id;
          const iconRef = getIconRef(id);
          const tabLabel = labels?.[id] ?? label;

          return (
            <Fragment key={id}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={`size-1 shrink-0 rounded-full bg-[#D1D1D1] ${
                    id === "interactive" ? "hidden md:block" : ""
                  }`}
                />
              ) : null}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                id={`${id}-tab`}
                onClick={() => handleTabChange(id)}
                onMouseEnter={() => iconRef.current?.startAnimation()}
                onMouseLeave={() => iconRef.current?.stopAnimation()}
                className={`type-body-medium inline-flex cursor-pointer appearance-none items-center gap-2 border-0 bg-transparent p-0 transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8C6CF] motion-reduce:transition-none motion-reduce:active:scale-100 ${
                  mobileHidden ? "hidden md:inline-flex" : ""
                } ${
                  isActive
                    ? "text-[var(--text-strong)]"
                    : "text-[var(--text-body)]"
                }`}
              >
                <Icon
                  ref={iconRef}
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0"
                />
                {tabLabel}
              </button>
            </Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-full bg-[var(--surface-elevated)] p-0.5",
        className
      )}
      role="tablist"
      aria-label="Portfolio categories"
    >
      {visibleTabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        const iconRef = getIconRef(id);
        const tabLabel = labels?.[id] ?? label;

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
                size={18}
                strokeWidth={1.5}
                className={isActive ? "text-[var(--text-strong)]" : "text-[var(--text-body)]"}
              />
              {tabLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
