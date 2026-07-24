import type { ReactNode } from "react";

export const homeContainer =
  "mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10";

export const homeEyebrowLight =
  "inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#8f672b]";

export const homeEyebrowDark =
  "inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]";

export const homeSectionTitle =
  "text-[clamp(2.1rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[#171614]";

export const homeSectionTitleDark =
  "bg-[linear-gradient(105deg,#ffffff_0%,#ebca84_55%,#c79a4b_100%)] bg-clip-text text-[clamp(2.1rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-transparent";

export const homeTitleGradient =
  "bg-[linear-gradient(105deg,#ffffff_0%,#ebca84_55%,#c79a4b_100%)] bg-clip-text text-transparent";

export const homeBody =
  "text-[0.95rem] leading-[1.75] text-[#68635B] sm:text-[1.02rem]";

export const homeBtnPrimaryGold =
  "group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#ebca84_0%,#c79a4b_100%)] px-7 text-[0.73rem] font-bold uppercase tracking-[0.11em] text-[#17110a] shadow-[0_16px_40px_rgba(199,154,75,0.18)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(199,154,75,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebca84]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

export const homeBtnSecondaryDark =
  "group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-full border border-white/18 bg-white/[0.04] px-6 text-[0.76rem] font-bold uppercase tracking-[0.1em] text-white transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#ebca84]/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebca84]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

export const homeBtnPrimaryDark =
  "group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden rounded-full bg-[#171614] px-6 text-[0.76rem] font-bold uppercase tracking-[0.1em] !text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c79a4b]/40 focus-visible:ring-offset-2 [&_*]:!text-white";

const HOME_REVEAL_DELAY: Record<number, string> = {
  1: "delay-[80ms]",
  2: "delay-[140ms]",
  3: "delay-[200ms]",
  4: "delay-[260ms]",
};

/** Fade-up reveal utilities (replaces home-motion.css). */
export function homeReveal(delay?: number) {
  const delayClass =
    typeof delay === "number" ? HOME_REVEAL_DELAY[delay] || "" : "";

  return [
    "opacity-0 translate-y-[22px] transition-[opacity,transform] duration-700 ease-out will-change-transform",
    "data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
    "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:delay-0",
    delayClass,
  ]
    .filter(Boolean)
    .join(" ");
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type HomeContainerProps = {
  children: ReactNode;
  className?: string;
};

export function HomeContainer({ children, className = "" }: HomeContainerProps) {
  return <div className={cx(homeContainer, className)}>{children}</div>;
}

type HomeSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "cream" | "dark";
};

export function HomeSection({
  id,
  children,
  className = "",
  tone = "white",
}: HomeSectionProps) {
  const toneClass =
    tone === "dark"
      ? "bg-[#080808] text-white"
      : tone === "cream"
        ? "bg-[#F8F6F1] text-[#171614]"
        : "bg-white text-[#171614]";

  return (
    <section
      id={id}
      className={cx(
        "scroll-mt-24 py-[clamp(4.5rem,8vw,7rem)]",
        toneClass,
        className,
      )}
    >
      {children}
    </section>
  );
}
