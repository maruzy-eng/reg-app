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
  homeEyebrowDark,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
  homeSectionTitleDark,
} from "@/components/home/home-ui";

import {
  aboutPillars,
  principles,
} from "@/lib/home/content";

import { mapHomeSettings } from "@/lib/home/settings";
import { getSiteSettings } from "@/lib/site-settings";

const positioningItems = [
  {
    number: "01",
    title: "Integrated Structure",
    description:
      "Technology, development, construction, and strategic partnerships connected through one coordinated operating model.",
  },
  {
    number: "02",
    title: "Real Market Experience",
    description:
      "Our decisions are shaped by practical experience across residential projects in the United States.",
  },
  {
    number: "03",
    title: "Long-Term Value",
    description:
      "Every project and relationship is guided by discipline, accountability, and sustainable growth.",
  },
] as const;

const institutionalMetrics = [
  {
    value: "7+",
    label: "Years of Experience",
  },
  {
    value: "150+",
    label: "Completed Projects",
  },
  {
    value: "10+",
    label: "States of Operation",
  },
  {
    value: "$50M+",
    label: "Project Value",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about Checkmate REG, a U.S. real estate group connecting technology, development, construction, and strategic partnerships.",
  path: "/about",
  keywords: ["about Checkmate REG", "real estate group USA"],
});

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  const settings = mapHomeSettings(siteSettings);

  const siteDescription =
    settings.site_description ||
    "Checkmate REG brings together real estate intelligence, residential development, construction management, and strategic relationships through one integrated structure.";

  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow="About Checkmate REG"
        title="One group. Multiple capabilities."
        titleAccent="One direction."
        description="Checkmate REG connects strategy, technology, development, construction, and strategic partnerships to create sustainable value across the U.S. residential real estate market."
        ctaHref="/contact"
      />

      <HomeSection
        tone="white"
        className="overflow-hidden"
      >
        <HomeContainer>
          <div
            className={[
              "grid grid-cols-1 gap-12",
              "border-b border-black/[0.08]",
              "pb-12",
              "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
              "lg:items-end lg:gap-24 lg:pb-16",
            ].join(" ")}
          >
            <div>
              <span
                data-reveal
                className={cx(
                  homeReveal(),
                  homeEyebrowLight,
                )}
              >
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Who We Are
              </span>

              <h2
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 max-w-[680px]",
                  homeSectionTitle,
                )}
              >
                Built from real market experience,
                not theory alone.
              </h2>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(2),
                "max-w-[640px]",
                "lg:justify-self-end",
                "lg:border-l",
                "lg:border-black/[0.08]",
                "lg:pl-12",
              )}
            >
              <p className={homeBody}>
                {siteDescription}
              </p>

              <p
                className={[
                  "mt-5",
                  "text-[0.86rem]",
                  "leading-[1.75]",
                  "text-[#777168]",
                ].join(" ")}
              >
                Our work is guided by disciplined analysis,
                professional execution, and a long-term
                commitment to quality, trust, and sustainable
                value.
              </p>
            </div>
          </div>

          <div
            data-reveal
            className={cx(
              homeReveal(),
              "relative mt-12 overflow-hidden",
              "rounded-[28px]",
              "border border-black/[0.08]",
              "bg-[#f8f6f1]",
              "lg:mt-16",
            )}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute",
                "-right-24 -top-24",
                "h-[280px] w-[280px]",
                "rounded-full",
                "bg-[#c79a4b]/10",
                "blur-[110px]",
              ].join(" ")}
            />

            <div
              className={[
                "relative z-[1]",
                "grid grid-cols-1",
                "sm:grid-cols-2",
                "lg:grid-cols-4",
              ].join(" ")}
            >
              {aboutPillars.map((pillar, index) => (
                <article
                  key={pillar.number}
                  data-reveal
                  className={[
                    homeReveal(index + 1),
                    "group relative",
                    "flex min-h-[250px]",
                    "flex-col justify-between",
                    "px-7 py-8",
                    "border-b border-black/[0.08]",
                    index % 2 === 0
                      ? "sm:border-r"
                      : "",
                    index >= 2
                      ? "sm:border-b-0"
                      : "",
                    index !== aboutPillars.length - 1
                      ? "lg:border-r"
                      : "",
                    "lg:border-b-0",
                    "lg:px-8 lg:py-9",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={[
                      "flex items-start",
                      "justify-between gap-5",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-[0.62rem]",
                        "font-bold",
                        "tracking-[0.18em]",
                        "text-[#9b7435]/60",
                      ].join(" ")}
                    >
                      {pillar.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "mt-1 h-px w-9",
                        "bg-[#9b7435]/25",
                        "transition-all duration-500",
                        "group-hover:w-14",
                        "group-hover:bg-[#9b7435]/65",
                      ].join(" ")}
                    />
                  </div>

                  <div className="pt-16">
                    <h3
                      className={[
                        "text-[clamp(1.35rem,2vw,1.7rem)]",
                        "font-semibold",
                        "tracking-[-0.04em]",
                        "text-[#211f1b]",
                      ].join(" ")}
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className={[
                        "mt-4 max-w-[270px]",
                        "text-[0.82rem]",
                        "leading-[1.72]",
                        "text-[#69645c]",
                      ].join(" ")}
                    >
                      {pillar.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-0 bottom-0",
                      "h-px origin-left",
                      "scale-x-0",
                      "bg-[#9b7435]",
                      "transition-transform duration-500",
                      "group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </article>
              ))}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection
        tone="cream"
        className="overflow-hidden"
      >
        <HomeContainer>
          <div
            className={[
              "grid grid-cols-1 gap-12",
              "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]",
              "lg:gap-24",
            ].join(" ")}
          >
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span
                data-reveal
                className={cx(
                  homeReveal(),
                  homeEyebrowLight,
                )}
              >
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Our Positioning
              </span>

              <h2
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 max-w-[620px]",
                  homeSectionTitle,
                )}
              >
                A connected operating model designed
                for better execution.
              </h2>

              <p
                data-reveal
                className={cx(
                  homeReveal(2),
                  homeBody,
                  "mt-6 max-w-[520px]",
                )}
              >
                Each capability operates with a clear role
                while sharing the same standards,
                infrastructure, and strategic direction.
              </p>
            </div>

            <div className="border-t border-black/[0.08]">
              {positioningItems.map((item, index) => (
                <article
                  key={item.number}
                  data-reveal
                  className={cx(
                    homeReveal(index + 1),
                    "group grid",
                    "grid-cols-[52px_minmax(0,1fr)]",
                    "gap-5",
                    "border-b border-black/[0.08]",
                    "py-8",
                    "sm:grid-cols-[72px_minmax(0,1fr)]",
                    "sm:gap-8 sm:py-10",
                  )}
                >
                  <span
                    className={[
                      "pt-1",
                      "text-[0.65rem]",
                      "font-bold",
                      "tracking-[0.17em]",
                      "text-[#9b7435]/60",
                    ].join(" ")}
                  >
                    {item.number}
                  </span>

                  <div>
                    <div
                      className={[
                        "flex items-start",
                        "justify-between gap-6",
                      ].join(" ")}
                    >
                      <h3
                        className={[
                          "text-[clamp(1.4rem,2.2vw,2rem)]",
                          "font-semibold",
                          "tracking-[-0.04em]",
                          "text-[#171614]",
                        ].join(" ")}
                      >
                        {item.title}
                      </h3>

                      <span
                        aria-hidden="true"
                        className={[
                          "mt-3 hidden h-px w-10",
                          "bg-[#9b7435]/25",
                          "transition-all duration-500",
                          "group-hover:w-16",
                          "group-hover:bg-[#9b7435]/70",
                          "sm:block",
                        ].join(" ")}
                      />
                    </div>

                    <p
                      className={[
                        "mt-4 max-w-[620px]",
                        "text-[0.86rem]",
                        "leading-[1.75]",
                        "text-[#69645c]",
                      ].join(" ")}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection
        tone="dark"
        className={[
          "overflow-hidden",
          "bg-[radial-gradient(circle_at_88%_18%,rgba(199,154,75,0.16),transparent_30%),radial-gradient(circle_at_8%_90%,rgba(235,202,132,0.06),transparent_26%),#080808]",
        ].join(" ")}
      >
        <HomeContainer>
          <div
            className={[
              "grid grid-cols-1 gap-10",
              "border-b border-white/[0.1]",
              "pb-10",
              "lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.68fr)]",
              "lg:items-end lg:gap-24 lg:pb-14",
            ].join(" ")}
          >
            <div>
              <span
                data-reveal
                className={cx(
                  homeReveal(),
                  homeEyebrowDark,
                )}
              >
                <span className="h-px w-9 bg-[#ebca84]/70" />
                Mission, Vision and Values
              </span>

              <h2
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 max-w-[780px]",
                  homeSectionTitleDark,
                )}
              >
                Purpose that guides every decision
                and every project.
              </h2>
            </div>

            <p
              data-reveal
              className={cx(
                homeReveal(2),
                "max-w-[510px]",
                "text-[0.9rem]",
                "leading-[1.75]",
                "text-white/48",
                "lg:justify-self-end",
              )}
            >
              A clear mission, a long-term vision, and
              values that define how Checkmate REG operates,
              grows, and creates sustainable impact.
            </p>
          </div>

          <div
            className={[
              "mt-12 grid grid-cols-1 gap-px",
              "overflow-hidden rounded-[28px]",
              "border border-white/[0.1]",
              "bg-white/[0.1]",
              "lg:grid-cols-3",
            ].join(" ")}
          >
            {principles.map((principle, index) => (
              <article
                key={principle.title}
                data-reveal
                className={cx(
                  homeReveal(index + 1),
                  "group relative",
                  "min-h-[340px]",
                  "overflow-hidden",
                  "bg-[#101010]",
                  "p-8 sm:p-10",
                )}
              >
                <div
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute",
                    "-right-16 -top-16",
                    "h-48 w-48",
                    "rounded-full",
                    "bg-[#ebca84]/0",
                    "blur-[90px]",
                    "transition-colors duration-500",
                    "group-hover:bg-[#ebca84]/10",
                  ].join(" ")}
                />

                <div
                  className={[
                    "relative z-[1]",
                    "flex h-full flex-col",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex items-start",
                      "justify-between gap-6",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-[0.64rem]",
                        "font-semibold",
                        "tracking-[0.18em]",
                        "text-[#ebca84]/55",
                      ].join(" ")}
                    >
                      {principle.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "mt-1 h-px w-10",
                        "bg-[#ebca84]/25",
                        "transition-all duration-500",
                        "group-hover:w-16",
                        "group-hover:bg-[#ebca84]/70",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-auto pt-24">
                    <h3
                      className={[
                        "text-[clamp(1.8rem,2.7vw,2.55rem)]",
                        "font-semibold",
                        "tracking-[-0.05em]",
                        "text-white",
                      ].join(" ")}
                    >
                      {principle.title}
                    </h3>

                    <p
                      className={[
                        "mt-5 max-w-[420px]",
                        "text-[0.86rem]",
                        "leading-[1.78]",
                        "text-white/50",
                      ].join(" ")}
                    >
                      {principle.description}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-0 bottom-0",
                    "h-px origin-left scale-x-0",
                    "bg-[#ebca84]",
                    "transition-transform duration-500",
                    "group-hover:scale-x-100",
                  ].join(" ")}
                />
              </article>
            ))}
          </div>

          <div
            data-reveal
            className={cx(
              homeReveal(2),
              "mt-12 grid grid-cols-2",
              "overflow-hidden rounded-[24px]",
              "border border-white/[0.1]",
              "bg-white/[0.04]",
              "lg:grid-cols-4",
            )}
          >
            {institutionalMetrics.map((metric, index) => (
              <article
                key={metric.label}
                className={[
                  "group relative",
                  "flex min-h-[150px]",
                  "flex-col justify-center",
                  "px-6 py-7",
                  index % 2 !== 0
                    ? "border-l border-white/[0.08]"
                    : "",
                  index >= 2
                    ? "border-t border-white/[0.08] lg:border-t-0"
                    : "",
                  index === 2
                    ? "lg:border-l"
                    : "",
                  "lg:min-h-[170px]",
                  "lg:px-8",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <strong
                  className={[
                    "text-[clamp(2rem,3.2vw,3.2rem)]",
                    "font-semibold",
                    "tracking-[-0.055em]",
                    "text-[#ebca84]",
                  ].join(" ")}
                >
                  {metric.value}
                </strong>

                <span
                  className={[
                    "mt-3",
                    "text-[0.72rem]",
                    "leading-[1.5]",
                    "text-white/42",
                  ].join(" ")}
                >
                  {metric.label}
                </span>

                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-0 bottom-0",
                    "h-px origin-left scale-x-0",
                    "bg-[#ebca84]",
                    "transition-transform duration-500",
                    "group-hover:scale-x-100",
                  ].join(" ")}
                />
              </article>
            ))}
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection tone="white">
        <HomeContainer>
          <div
            data-reveal
            className={cx(
              homeReveal(),
              "relative overflow-hidden",
              "rounded-[30px]",
              "border border-black/[0.07]",
              "bg-[#f4efe4]",
              "px-6 py-12",
              "sm:px-10 sm:py-14",
              "lg:px-14 lg:py-16",
            )}
          >
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute",
                "-right-24 -top-24",
                "h-[300px] w-[300px]",
                "rounded-full",
                "bg-[#c79a4b]/10",
                "blur-[105px]",
              ].join(" ")}
            />

            <div
              className={[
                "relative z-[1]",
                "grid grid-cols-1 gap-10",
                "lg:grid-cols-[minmax(0,1fr)_auto]",
                "lg:items-end lg:gap-16",
              ].join(" ")}
            >
              <div className="max-w-[760px]">
                <span
                  data-reveal
                  className={cx(
                    homeReveal(),
                    homeEyebrowLight,
                  )}
                >
                  <span className="h-px w-9 bg-[#8f672b]/70" />
                  Work with Checkmate REG
                </span>

                <h2
                  data-reveal
                  className={cx(
                    homeReveal(1),
                    "mt-6 max-w-[720px]",
                    homeSectionTitle,
                  )}
                >
                  Real estate strategy supported
                  by professional execution.
                </h2>

                <p
                  data-reveal
                  className={cx(
                    homeReveal(2),
                    homeBody,
                    "mt-6 max-w-[620px]",
                  )}
                >
                  Connect with our team to explore
                  development, construction, technology,
                  and strategic partnership opportunities.
                </p>
              </div>

              <Link
                href="/contact"
                className={[
                  "group inline-flex",
                  "min-h-[54px] w-fit",
                  "items-center justify-center gap-3",
                  "rounded-full",
                  "bg-[#171614]",
                  "px-7",
                  "text-[0.73rem]",
                  "font-bold uppercase",
                  "tracking-[0.11em]",
                  "text-white",
                  "shadow-[0_16px_36px_rgba(17,16,13,0.14)]",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-black",
                  "hover:shadow-[0_20px_44px_rgba(17,16,13,0.2)]",
                ].join(" ")}
              >
                Talk to Our Team

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={[
                    "h-4 w-4",
                    "text-[#ebca84]",
                    "transition-transform duration-300",
                    "group-hover:translate-x-1",
                  ].join(" ")}
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
