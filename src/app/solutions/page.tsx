import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeBtnPrimaryGold,
  homeEyebrowDark,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
  homeSectionTitleDark,
} from "@/components/home/home-ui";
import { operatePillars, solutions } from "@/lib/home/content";
import { mapHomeSettings } from "@/lib/home/settings";
import { getSiteSettings } from "@/lib/site-settings";

const solutionHighlights = [
  "Shared operating standards",
  "Connected infrastructure",
  "Disciplined execution",
  "Long-term alignment",
] as const;

const operatingMetrics = [
  { value: "01", label: "Unified strategy" },
  { value: "04", label: "Specialized divisions" },
  { value: "360°", label: "Real estate ecosystem" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions",
  description:
    "Discover Checkmate REG solutions for property intelligence, residential development, construction management, and strategic partnerships.",
  path: "/solutions",
  keywords: ["real estate solutions", "construction management", "property intelligence"],
});

export default async function SolutionsPage() {
  const settings = mapHomeSettings(await getSiteSettings());

  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow="Checkmate Solutions"
        title="Four specialized divisions."
        titleAccent="One connected ecosystem."
        description="Education, technology, construction, and strategic partnerships working together through one coordinated real estate structure."
        ctaHref="/contact"
      />

      <HomeSection tone="white" className="overflow-hidden">
        <HomeContainer>
          <div className="grid grid-cols-1 gap-10 border-b border-black/[0.08] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.62fr)] lg:items-end lg:gap-24 lg:pb-14">
            <div>
              <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Our Divisions
              </span>
              <h2
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 max-w-[800px]",
                  homeSectionTitle,
                )}
              >
                Solutions designed for every stage of real estate.
              </h2>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(2),
                "max-w-[540px] lg:justify-self-end",
              )}
            >
              <p className={homeBody}>
                Each division has a distinct role while sharing the same
                strategy, infrastructure, execution standards, and long-term
                commitment to value.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {solutionHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-8 items-center rounded-full border border-black/[0.1] bg-[#f8f6f1] px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#746f67]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            {solutions.map((solution, index) => (
              <article
                key={solution.number}
                data-reveal
                className={cx(
                  homeReveal((index % 3) + 1),
                  "group relative isolate grid grid-cols-[48px_minmax(0,1fr)] items-start gap-5 overflow-hidden border-b border-black/[0.09] px-0 py-9 transition-[padding,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-transparent hover:bg-[#080808] hover:px-5 sm:grid-cols-[68px_minmax(0,1fr)] sm:gap-7 sm:py-11 lg:grid-cols-[76px_minmax(280px,0.86fr)_minmax(260px,0.64fr)_54px] lg:items-center lg:gap-10",
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(235,202,132,0.06),transparent_42%),radial-gradient(circle_at_90%_50%,rgba(199,154,75,0.16),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="pt-1 text-[0.68rem] font-semibold tracking-[0.18em] text-[#8f672b] transition-colors duration-300 group-hover:text-[#ebca84]">
                  {solution.number}
                </span>

                <div className="min-w-0">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#9b7435]/70 transition-colors duration-300 group-hover:text-[#ebca84]/70">
                    {solution.category}
                  </span>
                  <h3 className="mt-2.5 text-[clamp(1.7rem,3vw,2.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#171614] transition-colors duration-300 group-hover:text-white">
                    {solution.title}
                  </h3>
                  <p className="mt-4 max-w-[560px] text-[0.84rem] leading-[1.72] text-[#69645c] transition-colors duration-300 group-hover:text-white/55 lg:hidden">
                    {solution.description}
                  </p>
                </div>

                <p className="hidden max-w-[410px] text-[0.88rem] leading-[1.75] text-[#5f5b54] transition-colors duration-300 group-hover:text-white/58 lg:block">
                  {solution.description}
                </p>

                <span
                  aria-hidden="true"
                  className="hidden h-12 w-12 place-items-center rounded-full border border-black/[0.12] bg-[#faf9f6] text-[#171614] transition-[transform,background-color,border-color,color] duration-300 group-hover:translate-x-1 group-hover:border-[#ebca84] group-hover:bg-[#ebca84] group-hover:text-[#17110a] lg:grid"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-[#ebca84] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                />
              </article>
            ))}
          </div>

          <div
            data-reveal
            className={cx(
              homeReveal(2),
              "mt-12 grid grid-cols-1 overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#fbfaf7] sm:grid-cols-3",
            )}
          >
            {operatingMetrics.map((metric, index) => (
              <article
                key={metric.label}
                className={[
                  "relative min-h-[150px] px-7 py-8",
                  index !== operatingMetrics.length - 1
                    ? "border-b border-black/[0.08] sm:border-b-0 sm:border-r"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <strong className="text-[clamp(2rem,3.3vw,3.3rem)] font-semibold tracking-[-0.06em] text-[#8f672b]">
                  {metric.value}
                </strong>
                <p className="mt-4 text-[0.73rem] leading-[1.5] text-[#746f67]">
                  {metric.label}
                </p>
              </article>
            ))}
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection
        tone="dark"
        className="overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(199,154,75,0.14),transparent_28%),radial-gradient(circle_at_90%_88%,rgba(235,202,132,0.06),transparent_24%),#080808]"
      >
        <HomeContainer>
          <div className="grid grid-cols-1 gap-10 border-b border-white/[0.1] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] lg:items-end lg:gap-20 lg:pb-14">
            <div>
              <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
                <span className="h-px w-9 bg-[#ebca84]/70" />
                How We Operate
              </span>
              <h2
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 max-w-[720px]",
                  homeSectionTitleDark,
                )}
              >
                A disciplined path from intelligence to execution.
              </h2>
            </div>

            <p
              data-reveal
              className={cx(
                homeReveal(2),
                "max-w-[520px] text-[0.88rem] leading-[1.72] text-white/48 lg:justify-self-end",
              )}
            >
              Opportunities move through a clear operating framework designed
              to improve visibility, accountability, quality, and long-term
              results.
            </p>
          </div>

          <ol className="relative mt-14 grid grid-cols-1 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-8 hidden h-px bg-white/[0.1] lg:block"
            />

            {operatePillars.map((pillar, index) => (
              <li
                key={pillar.number}
                data-reveal
                className={cx(
                  homeReveal(index + 1),
                  "group relative grid grid-cols-[64px_minmax(0,1fr)] gap-5 border-b border-white/[0.1] py-8 lg:block lg:border-b-0 lg:px-6 lg:py-0",
                  index === 0 ? "lg:pl-0" : "",
                  index === operatePillars.length - 1
                    ? "border-b-0 lg:pr-0"
                    : "",
                )}
              >
                <div className="relative z-[1] grid h-16 w-16 place-items-center rounded-full border border-[#ebca84]/30 bg-white/[0.04] transition-[transform,background-color,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-[#ebca84] group-hover:bg-[#ebca84]">
                  <span className="text-[0.68rem] font-bold tracking-[0.17em] text-[#ebca84] transition-colors duration-300 group-hover:text-[#17110a]">
                    {pillar.number}
                  </span>
                </div>

                <div className="pt-1 lg:pt-9">
                  <span className="text-[0.59rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]/55">
                    Operating principle
                  </span>
                  <h3 className="mt-3 text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.045em] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-[300px] text-[0.82rem] leading-[1.72] text-white/48">
                    {pillar.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-7 block h-px w-10 bg-[#ebca84]/30 transition-all duration-500 group-hover:w-20 group-hover:bg-[#ebca84]"
                  />
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className={cx(homeReveal(), "mt-14")}>
            <Link href="/contact" className={homeBtnPrimaryGold}>
              <span className="relative z-[2]">Talk to Our Team</span>
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
        </HomeContainer>
      </HomeSection>

      <HomeSection tone="cream">
        <HomeContainer>
          <div
            data-reveal
            className={cx(
              homeReveal(),
              "relative overflow-hidden rounded-[32px] border border-black/[0.07] bg-[#171614] px-6 py-12 text-white shadow-[0_30px_80px_rgba(17,16,13,0.14)] sm:px-10 sm:py-14 lg:px-14 lg:py-16",
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-[#c79a4b]/18 blur-[115px]"
            />

            <div className="relative z-[1] grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div className="max-w-[760px]">
                <span className="inline-flex items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
                  <span className="h-px w-9 bg-[#ebca84]/60" />
                  Build with Checkmate
                </span>
                <h2 className="mt-6 max-w-[760px] text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
                  The right capabilities.
                  <span className="block bg-[linear-gradient(105deg,#ffffff_0%,#ebca84_54%,#c79a4b_100%)] bg-clip-text text-transparent">
                    Connected through one direction.
                  </span>
                </h2>
                <p className="mt-6 max-w-[620px] text-[0.9rem] leading-[1.75] text-white/50">
                  Connect with our team to identify the Checkmate division,
                  solution, or strategic relationship that best supports your
                  next real estate objective.
                </p>
              </div>

              <Link href="/contact" className={homeBtnPrimaryGold}>
                <span className="relative z-[2]">Talk to Our Team</span>
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
      </HomeSection>
    </SiteShell>
  );
}
