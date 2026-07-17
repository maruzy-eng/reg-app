"use client";

import type { ReactNode } from "react";

type AdminRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AdminReveal({
  children,
  className,
  delay = 1,
}: AdminRevealProps) {
  return (
    <div
      className={cn(
        "admin-reveal",
        `admin-reveal-delay-${delay}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
