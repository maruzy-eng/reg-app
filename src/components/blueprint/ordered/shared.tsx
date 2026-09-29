import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export const blueprintContainer =
  "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16";

export const blueprintDarkSection =
  "relative bg-[#070707] py-20 text-[#F5F3EE] sm:py-24 lg:py-28 xl:py-32";

export function BlueprintGoldButton({
  children = "Quero conhecer o Blueprint",
  href = "#formb",
  full = false,
}: {
  children?: ReactNode;
  href?: string;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "group inline-flex min-h-[52px] items-center justify-center gap-3",
        "border border-[#C5A258] bg-[#C5A258]",
        "px-6 py-3.5",
        "text-[0.67rem] font-bold uppercase tracking-[0.14em] text-[#0B0B0B]",
        "transition duration-300",
        "hover:border-[#D3B264] hover:bg-[#D3B264]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3B264]",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <span>{children}</span>
      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function BlueprintEyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={[
          "h-px w-8 shrink-0",
          dark ? "bg-[#C5A258]" : "bg-[#9A7938]",
        ].join(" ")}
      />
      <p
        className={[
          "text-[0.58rem] font-bold uppercase tracking-[0.2em]",
          dark ? "text-[#D3B264]" : "text-[#8B6A2E]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

export function BlueprintSectionTitle({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={[
        "text-balance text-[clamp(2.4rem,4.4vw,4.6rem)]",
        "font-medium leading-[0.98] tracking-[-0.055em]",
        dark ? "text-[#F5F3EE]" : "text-[#171614]",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}
