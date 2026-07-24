import type { ReactNode } from "react";

/** Shared type scale for Blueprint page headings. */
export const blueprintHeadingClass =
  "text-[clamp(2.1rem,3.8vw,4rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance";

export const blueprintHeroHeadingClass =
  "text-[clamp(2.4rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.048em] text-balance";

export const blueprintBodyClass =
  "mt-5 max-w-[40rem] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.7]";

export function BlueprintArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlueprintKicker({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
        "text-[0.625rem] font-semibold uppercase tracking-[0.14em]",
        dark
          ? "border-[#c9a24d]/30 bg-[#c9a24d]/10 text-[#e4c26e]"
          : "border-[#c9a24d]/25 bg-[#c9a24d]/10 text-[#76591f]",
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#c9a24d]" />
      {children}
    </span>
  );
}

export function BlueprintSectionHeading({
  kicker,
  title,
  description,
  dark = false,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-[40rem] text-left">
      <BlueprintKicker dark={dark}>{kicker}</BlueprintKicker>
      <h2
        className={[
          "mt-4",
          blueprintHeadingClass,
          dark ? "text-white" : "text-[#171614]",
        ].join(" ")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={[
            blueprintBodyClass,
            dark ? "text-white/55" : "text-[#68635b]",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function BlueprintGoldButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={[
        "group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6",
        "bg-[linear-gradient(135deg,#d8b55e_0%,#c9a24d_50%,#9f7625_100%)]",
        "text-[0.8125rem] font-semibold text-white shadow-[0_16px_40px_rgba(201,162,77,0.28)]",
        "transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(201,162,77,0.38)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24d] focus-visible:ring-offset-4",
      ].join(" ")}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <BlueprintArrowIcon />
      </span>
    </a>
  );
}

export const blueprintContainer =
  "mx-auto w-[min(1180px,calc(100%-32px))]";
