"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function CaseBackButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const href = pathname.startsWith("/ru") || from === "ru"
    ? "/ru?tab=case-studies"
    : "/?tab=case-studies";

  return (
    <Link
      href={href}
      aria-label="Back to case studies"
      className="inline-flex size-14 items-center justify-center rounded-full bg-[#F5F5F5] transition-colors duration-150 hover:bg-[#ECECEC] focus-visible:bg-[#ECECEC]"
    >
      <Image
        src="/arrow-left.svg"
        alt=""
        width={24}
        height={24}
        className="size-6"
      />
    </Link>
  );
}
