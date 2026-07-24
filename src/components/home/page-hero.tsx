import Link from "next/link";
import {
  HomeContainer,
  cx,
  homeBtnPrimaryGold,
  homeEyebrowDark,
  homeReveal,
  homeTitleGradient,
} from "@/components/home/home-ui";
import { HOME_HERO_IMAGE } from "@/lib/home/branding";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  ctaHref = "/contact",
  ctaLabel = "Talk to Our Team",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-40 scale-[1.035] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HOME_HERO_IMAGE}')` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.88)_38%,rgba(0,0,0,0.68)_66%,rgba(0,0,0,0.78)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.86)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-[-12%] -z-10 h-[360px] w-[360px] rounded-full bg-[#ebca84]/10 blur-[145px] sm:h-[460px] sm:w-[460px]"
      />

      <HomeContainer className="pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="max-w-[860px]">
          <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
            <span className="h-px w-9 bg-[#ebca84]/70" />
            {eyebrow}
          </span>

          <h1
            data-reveal
            className={cx(
              homeReveal(1),
              "mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white",
            )}
          >
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className={homeTitleGradient}>{titleAccent}</span>
              </>
            ) : null}
          </h1>

          <p
            data-reveal
            className={cx(
              homeReveal(2),
              "mt-6 max-w-[620px] text-[0.98rem] leading-[1.75] text-white/55 sm:text-[1.05rem]",
            )}
          >
            {description}
          </p>

          <div data-reveal className={cx(homeReveal(3), "mt-9")}>
            <Link href={ctaHref} className={homeBtnPrimaryGold}>
              <span className="relative z-[2]">{ctaLabel}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="relative z-[2] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
