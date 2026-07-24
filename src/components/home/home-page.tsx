import Link from "next/link";
import { HomeAssistant } from "@/components/home/home-assistant";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHeader } from "@/components/home/home-header";
import { HomeInteractions } from "@/components/home/home-interactions";
import { HomeProjects } from "@/components/home/home-projects";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeBtnPrimaryDark,
  homeBtnPrimaryGold,
  homeBtnSecondaryDark,
  homeContainer,
  homeEyebrowDark,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
  homeSectionTitleDark,
  homeTitleGradient,
} from "@/components/home/home-ui";
import type { HomePageSettings } from "@/lib/home/types";
import { HOME_HERO_IMAGE } from "@/lib/home/branding";
import type { PropertyCard } from "@/types/property";

type HomePageProps = {
  settings: HomePageSettings;
  properties: PropertyCard[];
};

const heroFocus = [
  {
    number: "01",
    title: "Property Intelligence",
    description: "Data, research, and deal analysis.",
  },
  {
    number: "02",
    title: "Residential Development",
    description: "From opportunity to project strategy.",
  },
  {
    number: "03",
    title: "Construction",
    description: "Professional delivery and oversight.",
  },
] as const;

const heroMetrics = [
  { target: 7, prefix: "", suffix: "+", label: "Years of Experience" },
  { target: 150, prefix: "", suffix: "+", label: "Completed Projects" },
  { target: 10, prefix: "", suffix: "+", label: "States of Operation" },
  { target: 50, prefix: "$", suffix: "M+", label: "Project Value" },
] as const;

const aboutPillars = [
  {
    number: "01",
    title: "Technology",
    description: "Property intelligence and digital tools.",
  },
  {
    number: "02",
    title: "Development",
    description: "Residential strategy and project planning.",
  },
  {
    number: "03",
    title: "Construction",
    description: "Professional delivery and oversight.",
  },
  {
    number: "04",
    title: "Partnerships",
    description: "Aligned relationships built for long-term value.",
  },
] as const;

const divisions = [
  {
    number: "01",
    title: "Checkmate Academy",
    category: "Education",
    description: "Practical education and a connected professional network.",
    href: "/contact",
  },
  {
    number: "02",
    title: "Checkmate Property",
    category: "Technology",
    description: "Real estate intelligence, search, analysis, and decision tools.",
    href: "/contact",
  },
  {
    number: "03",
    title: "Checkmate Builder",
    category: "Construction",
    description: "Residential development, construction, and project delivery.",
    href: "/contact",
  },
  {
    number: "04",
    title: "Checkmate X Partners",
    category: "Partnerships",
    description: "Strategic real estate relationships built around aligned execution.",
    href: "/contact",
  },
] as const;

const operatePillars = [
  {
    number: "01",
    title: "Clear intelligence",
    description: "Decisions begin with market context, data, and disciplined analysis.",
  },
  {
    number: "02",
    title: "Structured planning",
    description: "Each opportunity is translated into a clear execution framework.",
  },
  {
    number: "03",
    title: "Professional execution",
    description: "Experienced teams manage delivery with visibility and accountability.",
  },
  {
    number: "04",
    title: "Long-term alignment",
    description: "Every relationship is built around quality, trust, and lasting value.",
  },
] as const;

const operatingPath = [
  {
    number: "01",
    step: "Step 1",
    title: "Learn",
    description:
      "Master the U.S. real estate market with our proven methodology.",
  },
  {
    number: "02",
    step: "Step 2",
    title: "Analyze",
    description:
      "Use professional tools and expert support to evaluate deals.",
  },
  {
    number: "03",
    step: "Step 3",
    title: "Build",
    description:
      "Participate in real projects and watch your profits take shape.",
  },
  {
    number: "04",
    step: "Step 4",
    title: "Grow",
    description:
      "Expand your network and turn knowledge into long-term prosperity.",
  },
] as const;

const principles = [
  {
    number: "01",
    title: "Mission",
    description:
      "To be a global reference in real estate, innovating and creating a positive impact in the communities where we operate.",
  },
  {
    number: "02",
    title: "Vision",
    description:
      "To transform properties into sustainable value by combining intelligence, agility, and excellence.",
  },
  {
    number: "03",
    title: "Values",
    description:
      "Innovation, Excellence, Integrity, Collaboration, Client Focus.",
  },
] as const;

const performanceItems = [
  {
    target: 150,
    prefix: "",
    suffix: "+",
    title: "Residential Projects",
  },
  {
    target: 600,
    prefix: "",
    suffix: "+",
    title: "Connected Professionals",
  },
  {
    target: 50,
    prefix: "$",
    suffix: "M+",
    title: "Project Value",
  },
  {
    target: 10,
    prefix: "",
    suffix: "+",
    title: "States Reached",
  },
] as const;

export function HomePage({ settings, properties }: HomePageProps) {
  const siteName = settings.site_name || "Checkmate REG";
  const contactEmail = settings.support_email?.trim();
  const contactHref = contactEmail ? `mailto:${contactEmail}` : "/contact";

  return (
    <div className="checkmate-home min-h-screen overflow-x-hidden bg-white text-[#171614] antialiased selection:bg-[#ebca84] selection:text-[#171614]">
      <HomeHeader siteName={siteName} />

      <main>
        <section
          id="home"
          className="hero relative isolate overflow-hidden bg-[#050505] text-white"
        >
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
            id="heroLight"
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12%] top-[-12%] -z-10 h-[460px] w-[460px] rounded-full bg-[#ebca84]/10 blur-[145px] transition-transform duration-300 sm:h-[560px] sm:w-[560px] lg:h-[720px] lg:w-[720px]"
          />

          <div className={homeContainer}>
            <div className="grid grid-cols-1 gap-14 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:min-h-[760px] lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] lg:items-center lg:gap-24 lg:pb-20 lg:pt-36">
              <div className="max-w-[840px]">
                <div
                  data-reveal
                  className={cx(homeReveal(), "inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.045] px-3 py-2 backdrop-blur-md")}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ebca84] text-[0.58rem] font-extrabold tracking-[0.08em] text-[#181108]">
                    US
                  </span>

                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-white/58">
                    Integrated Real Estate Group
                  </span>
                </div>

                <h1
                  data-reveal
                  className={cx(
                    homeReveal(1),
                    "mt-8 max-w-[840px] text-[clamp(3rem,6.25vw,6rem)] font-semibold leading-[0.91] tracking-[-0.068em] text-white",
                  )}
                >
                  Building the future of{" "}
                  <span className={homeTitleGradient}>
                    American real estate.
                  </span>
                </h1>

                <p
                  data-reveal
                  className={cx(homeReveal(2), "mt-7 max-w-[620px] text-[clamp(1rem,1.4vw,1.12rem)] leading-[1.72] text-white/58")}
                >
                  Technology, development, construction, and strategic
                  partnerships connected through one real estate ecosystem.
                </p>

                <div
                  data-reveal
                  className={cx(homeReveal(3), "mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap")}
                >
                  <a href="/solutions" className={homeBtnPrimaryGold}>
                    <span className="relative z-[2]">Explore Our Divisions</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="relative z-[2] h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>

                  <a href={contactHref} className={homeBtnSecondaryDark}>
                    <span className="relative z-[2]">Talk to Our Team</span>
                  </a>
                </div>

                <div
                  data-reveal
                  className={cx(homeReveal(3), "mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.69rem] font-medium text-white/36")}
                >
                  <span>Built from real market experience</span>
                  <span className="hidden h-1 w-1 rounded-full bg-[#ebca84]/50 sm:block" />
                  <span>Focused on U.S. residential real estate</span>
                </div>
              </div>

              <aside
                data-reveal
                className={cx(homeReveal(2), "relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-7 lg:p-8")}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[-80px] top-[-80px] h-[210px] w-[210px] rounded-full bg-[#ebca84]/10 blur-[90px]"
                />

                <div className="relative z-[1]">
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-[0.63rem] font-bold uppercase tracking-[0.19em] text-[#ebca84]">
                      Core Focus
                    </span>
                    <span className="text-[0.59rem] font-semibold uppercase tracking-[0.14em] text-white/25">
                      End-to-End
                    </span>
                  </div>

                  <div className="mt-6 border-t border-white/[0.09]">
                    {heroFocus.map((item) => (
                      <article
                        key={item.number}
                        className="group grid grid-cols-[38px_minmax(0,1fr)] gap-4 border-b border-white/[0.08] py-5"
                      >
                        <span className="pt-0.5 text-[0.61rem] font-semibold tracking-[0.15em] text-[#ebca84]/55">
                          {item.number}
                        </span>
                        <div>
                          <h2 className="text-[0.95rem] font-semibold tracking-[-0.018em] text-white/82">
                            {item.title}
                          </h2>
                          <p className="mt-1.5 text-[0.72rem] leading-[1.55] text-white/38">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-5">
                    <span className="text-[0.69rem] leading-[1.5] text-white/40">
                      One coordinated structure.
                    </span>
                    <a
                      href="/about"
                      className="group inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#ebca84] transition-colors duration-200 hover:text-white"
                    >
                      About
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <div className="relative border-t border-white/[0.09] bg-black/35 backdrop-blur-sm">
            <div
              data-reveal
              className={[
                homeReveal(),"grid grid-cols-2 lg:grid-cols-4", homeContainer].join(
                " ",
              )}
            >
              {heroMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={[
                    "flex min-h-[106px] flex-col justify-center py-6",
                    "px-5 sm:px-7 lg:min-h-[116px] lg:px-8",
                    index === 0 ? "pl-0 sm:pl-0 lg:pl-0" : "",
                    index % 2 !== 0 ? "border-l border-white/[0.09]" : "",
                    index >= 2
                      ? "border-t border-white/[0.09] lg:border-t-0"
                      : "",
                    index === 2 ? "lg:border-l" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <strong className="block text-[1.85rem] font-semibold tracking-[-0.05em] text-[#ebca84] sm:text-[2.08rem]">
                    {metric.prefix}
                    <span className="counter" data-target={metric.target}>
                      0
                    </span>
                    {metric.suffix}
                  </strong>
                  <span className="mt-1.5 block text-[0.68rem] leading-[1.45] text-white/38">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomeSection id="about" tone="white">
          <HomeContainer>
            <div className="grid grid-cols-1 gap-12 border-b border-black/[0.08] pb-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end lg:gap-24 lg:pb-16">
              <div>
                <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
                  <span className="h-px w-9 bg-[#8f672b]/70" />
                  About Checkmate
                </span>
                <h2
                  data-reveal
                  className={[
                    homeReveal(1),"mt-6 max-w-[650px]", homeSectionTitle].join(" ")}
                >
                  One group. Multiple capabilities. One direction.
                </h2>
              </div>

              <div
                data-reveal
                className={cx(homeReveal(2), "max-w-[620px] lg:justify-self-end lg:border-l lg:border-black/[0.08] lg:pl-12")}
              >
                <p className={homeBody}>
                  Checkmate connects technology, development, construction, and
                  strategic partnerships to execute residential real estate
                  opportunities across the United States.
                </p>
              </div>
            </div>

            <div
              data-reveal
              className={cx(homeReveal(), "mt-12 overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#fbfaf7] lg:mt-14")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {aboutPillars.map((pillar, index) => (
                  <article
                    key={pillar.number}
                    data-reveal
                    className={[
                      homeReveal(index + 1),
                      "group relative min-h-[200px] px-6 py-7",
                      "border-b border-black/[0.08]",
                      index % 2 === 0 ? "sm:border-r" : "",
                      index >= 2 ? "sm:border-b-0" : "",
                      index !== aboutPillars.length - 1 ? "lg:border-r" : "",
                      "lg:border-b-0 lg:px-8 lg:py-8",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="text-[0.62rem] font-bold tracking-[0.16em] text-[#9b7435]/60">
                        {pillar.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 h-px w-8 bg-[#9b7435]/25 transition-all duration-300 group-hover:w-12 group-hover:bg-[#9b7435]/60"
                      />
                    </div>
                    <div className="mt-10">
                      <h3 className="text-[1.08rem] font-semibold tracking-[-0.025em] text-[#211f1b]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 max-w-[250px] text-[0.8rem] leading-[1.68] text-[#6a655e]">
                        {pillar.description}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#9b7435] transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </article>
                ))}
              </div>
            </div>

            <div
              data-reveal
              className={cx(homeReveal(), "mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between")}
            >
              <p className="max-w-[760px] text-[0.77rem] leading-[1.65] text-[#746f67]">
                Integrated capabilities. Clear accountability. Professional
                execution.
              </p>
              <a
                href="/solutions"
                className="group inline-flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-[#8f672b] transition-colors duration-200 hover:text-[#171614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c79a4b]/40 focus-visible:ring-offset-2"
              >
                Explore the ecosystem
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </HomeContainer>
        </HomeSection>

        <HomeSection
          id="principles"
          tone="dark"
          className="bg-[radial-gradient(circle_at_88%_18%,rgba(199,154,75,0.16),transparent_30%),radial-gradient(circle_at_8%_90%,rgba(235,202,132,0.06),transparent_26%),#080808]"
        >
          <HomeContainer>
            <div className="grid grid-cols-1 gap-10 border-b border-white/[0.1] pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.68fr)] lg:items-end lg:gap-24 lg:pb-14">
              <div>
                <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
                  <span className="h-px w-9 bg-[#ebca84]/70" />
                  Our Principles
                </span>
                <h2
                  data-reveal
                  className={[
                    homeReveal(1),"mt-6 max-w-[760px]", homeSectionTitleDark].join(
                    " ",
                  )}
                >
                  Purpose that guides every decision and every project.
                </h2>
              </div>
              <p
                data-reveal
                className={cx(homeReveal(2), "max-w-[500px] text-[0.88rem] leading-[1.72] text-white/48 lg:justify-self-end")}
              >
                A clear mission, a long-term vision, and values that shape how
                Checkmate creates sustainable impact.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/[0.1] bg-white/[0.1] lg:grid-cols-3">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  data-reveal
                  className={cx(
                    homeReveal(index + 1),
                    "group relative min-h-[300px] overflow-hidden bg-[#101010] p-8 sm:p-10",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#ebca84]/0 blur-[80px] transition-colors duration-500 group-hover:bg-[#ebca84]/10"
                  />
                  <div className="relative z-[1] flex h-full flex-col">
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-[0.64rem] font-semibold tracking-[0.18em] text-[#ebca84]/55">
                        {principle.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 h-px w-10 bg-[#ebca84]/25 transition-all duration-500 group-hover:w-16 group-hover:bg-[#ebca84]/70"
                      />
                    </div>
                    <div className="mt-auto pt-20">
                      <h3 className="text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold tracking-[-0.045em] text-white">
                        {principle.title}
                      </h3>
                      <p className="mt-5 max-w-[420px] text-[0.84rem] leading-[1.75] text-white/48">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#ebca84] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              ))}
            </div>
          </HomeContainer>
        </HomeSection>

        <HomeProjects properties={properties} />

        <HomeSection
          id="divisions"
          tone="dark"
          className="overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(199,154,75,0.12),transparent_28%),radial-gradient(circle_at_90%_88%,rgba(235,202,132,0.05),transparent_24%),#080808]"
        >
          <HomeContainer>
            <div className="grid grid-cols-1 gap-10 border-b border-white/[0.1] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.62fr)] lg:items-end lg:gap-24 lg:pb-14">
              <div>
                <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
                  <span className="h-px w-9 bg-[#ebca84]/70" />
                  Our Divisions
                </span>
                <h2
                  data-reveal
                  className={[
                    homeReveal(1),
                    "mt-6 max-w-[780px]",
                    homeSectionTitleDark,
                  ].join(" ")}
                >
                  Four specialized divisions. One connected ecosystem.
                </h2>
              </div>
              <p
                data-reveal
                className={cx(
                  homeReveal(2),
                  "max-w-[520px] text-[0.88rem] leading-[1.72] text-white/48 lg:justify-self-end",
                )}
              >
                Each division operates with a clear role while sharing the same
                strategy, infrastructure, and execution standards.
              </p>
            </div>

            <div className="mt-5">
              {divisions.map((division, index) => (
                <Link
                  key={division.number}
                  href={division.href}
                  data-reveal
                  className={cx(
                    homeReveal((index % 3) + 1),
                    "group relative isolate grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-4 overflow-hidden border-b border-white/[0.1] px-0 py-7 transition-[padding,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/0 hover:bg-white/[0.04] hover:px-5 focus-visible:bg-white/[0.04] focus-visible:px-5 focus-visible:outline-none sm:grid-cols-[62px_minmax(0,1fr)_54px] sm:gap-7 sm:py-9 lg:grid-cols-[72px_minmax(280px,0.85fr)_minmax(260px,0.65fr)_56px] lg:gap-10 lg:py-10",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(235,202,132,0.04),transparent_42%),radial-gradient(circle_at_88%_50%,rgba(235,202,132,0.18),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#ebca84]/70 transition-colors duration-300 group-hover:text-[#ebca84]">
                    {division.number}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-[#ebca84]/55 transition-colors duration-300 group-hover:text-[#ebca84]/70">
                      {division.category}
                    </span>
                    <h3 className="mt-2 text-[clamp(1.45rem,2.55vw,2.35rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white transition-colors duration-300">
                      {division.title}
                    </h3>
                    <p className="mt-2.5 max-w-[520px] text-[0.82rem] leading-[1.62] text-white/48 transition-colors duration-300 group-hover:text-white/60 lg:hidden">
                      {division.description}
                    </p>
                  </div>
                  <p className="hidden max-w-[390px] text-[0.86rem] leading-[1.68] text-white/45 transition-colors duration-300 group-hover:text-white/58 lg:block">
                    {division.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/18 text-white transition-[transform,background-color,border-color,color] duration-300 group-hover:translate-x-1 group-hover:border-[#ebca84] group-hover:bg-[#ebca84] group-hover:text-[#080808]"
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
                </Link>
              ))}
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(),
                "mt-10 flex flex-col gap-4 border-t border-white/[0.1] pt-7 sm:flex-row sm:items-center sm:justify-between",
              )}
            >
              <p className="max-w-[720px] text-[0.76rem] leading-[1.65] text-white/42">
                Education, technology, construction, and strategic partnerships
                connected through one operating structure.
              </p>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-[#ebca84] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c79a4b]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                Work with Checkmate
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </HomeContainer>
        </HomeSection>

        <HomeSection id="operate" tone="white">
          <HomeContainer>
            <div className="mb-10 max-w-[760px] lg:mb-12">
              <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                How We Operate
              </span>
              <h2
                data-reveal
                className={[
                  homeReveal(1),"mt-6", homeSectionTitle].join(" ")}
              >
                A disciplined approach to residential real estate.
              </h2>
            </div>

            <ol className="grid grid-cols-1 overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#fbfaf7] sm:grid-cols-2 lg:grid-cols-4">
              {operatePillars.map((pillar, index) => (
                <li
                  key={pillar.number}
                  data-reveal
                  className={[
                    homeReveal(index + 1),
                    "group relative flex min-h-[220px] flex-col justify-between p-7",
                    "border-b border-black/[0.08]",
                    index % 2 === 0 ? "sm:border-r" : "",
                    index >= 2 ? "sm:border-b-0" : "",
                    index !== operatePillars.length - 1 ? "lg:border-r" : "",
                    "lg:border-b-0 lg:p-8",
                  ].join(" ")}
                >
                  <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-[#8f672b]">
                    {pillar.number}
                  </span>
                  <div className="mt-12">
                    <h3 className="text-[clamp(1.22rem,1.9vw,1.5rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-[#171614]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[0.8rem] leading-[1.65] text-[#6a655e]">
                      {pillar.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#9b7435] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ol>
          </HomeContainer>
        </HomeSection>

        <HomeSection
          id="operating-path"
          tone="cream"
          className="overflow-hidden"
        >
          <HomeContainer>
            <div className="grid grid-cols-1 gap-10 border-b border-black/[0.08] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.64fr)] lg:items-end lg:gap-24 lg:pb-14">
              <div>
                <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
                  <span className="h-px w-9 bg-[#8f672b]/70" />
                  Operating Path
                </span>
                <h2
                  data-reveal
                  className={[
                    homeReveal(1),"mt-6 max-w-[780px]", homeSectionTitle].join(" ")}
                >
                  Your Journey with Checkmate
                </h2>
              </div>
              <p
                data-reveal
                className={[
                  homeReveal(2),"max-w-[520px] lg:justify-self-end", homeBody].join(
                  " ",
                )}
              >
                A structured path designed to transform knowledge into action and
                action into long-term growth.
              </p>
            </div>

            <ol className="relative mt-14 grid grid-cols-1 gap-0 lg:grid-cols-4">
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-8 hidden h-px bg-black/[0.1] lg:block"
              />
              {operatingPath.map((item, index) => (
                <li
                  key={item.number}
                  data-reveal
                  className={[
                    homeReveal(index + 1),
                    "group relative grid grid-cols-[64px_minmax(0,1fr)] gap-5 border-b border-black/[0.08] py-8",
                    "lg:block lg:border-b-0 lg:px-6 lg:py-0",
                    index === 0 ? "lg:pl-0" : "",
                    index === operatingPath.length - 1
                      ? "border-b-0 lg:pr-0"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="relative z-[1] grid h-16 w-16 place-items-center rounded-full border border-[#b98b43]/30 bg-[#f4efe4] shadow-[0_12px_30px_rgba(45,32,14,0.08)] transition-[transform,background-color,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-[#9b7435] group-hover:bg-[#171614]">
                    <span className="text-[0.69rem] font-bold tracking-[0.16em] text-[#8f672b] transition-colors duration-300 group-hover:text-[#ebca84]">
                      {item.number}
                    </span>
                  </div>
                  <div className="pt-1 lg:pt-9">
                    <span className="text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#9b7435]/65">
                      {item.step}
                    </span>
                    <h3 className="mt-3 text-[clamp(1.55rem,2.3vw,2.15rem)] font-semibold tracking-[-0.045em] text-[#171614]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[310px] text-[0.82rem] leading-[1.72] text-[#69645c]">
                      {item.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-7 block h-px w-10 bg-[#9b7435]/30 transition-all duration-500 group-hover:w-20 group-hover:bg-[#9b7435]"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </HomeContainer>
        </HomeSection>

        <HomeSection
          id="performance"
          tone="dark"
          className="bg-[radial-gradient(circle_at_85%_18%,rgba(199,154,75,0.14),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(235,202,132,0.055),transparent_28%),#080808]"
        >
          <HomeContainer>
            <div className="grid grid-cols-1 gap-8 border-b border-white/[0.1] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)] lg:items-end lg:gap-20 lg:pb-12">
              <div>
                <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
                  <span className="h-px w-9 bg-[#ebca84]/70" />
                  Results
                </span>
                <h2
                  data-reveal
                  className={[
                    homeReveal(1),"mt-6 max-w-[760px]", homeSectionTitleDark].join(
                    " ",
                  )}
                >
                  Built through real projects and practical experience.
                </h2>
              </div>
              <p
                data-reveal
                className={cx(homeReveal(2), "max-w-[430px] text-[0.88rem] leading-[1.72] text-white/48")}
              >
                Measurable outcomes shaped by hands-on execution in the U.S.
                residential real estate market.
              </p>
            </div>

            <div
              data-reveal
              className={cx(homeReveal(), "mt-12 grid grid-cols-1 overflow-hidden rounded-[22px] border border-white/[0.1] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4")}
            >
              {performanceItems.map((item, index) => (
                <article
                  key={item.title}
                  className={[
                    "group relative min-h-[210px] bg-[#101010] p-8",
                    "border-b border-white/[0.08]",
                    index % 2 === 0 ? "sm:border-r" : "",
                    index >= 2 ? "sm:border-b-0" : "",
                    index !== performanceItems.length - 1 ? "lg:border-r" : "",
                    "lg:border-b-0 lg:p-9",
                  ].join(" ")}
                >
                  <strong className="block text-[clamp(2.9rem,4vw,4.4rem)] font-medium tracking-[-0.065em] text-[#ebca84]">
                    {item.prefix}
                    <span className="counter" data-target={item.target}>
                      0
                    </span>
                    {item.suffix}
                  </strong>
                  <h3 className="mt-8 text-[0.92rem] font-medium tracking-[-0.015em] text-white/72">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#ebca84] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              ))}
            </div>
          </HomeContainer>
        </HomeSection>

        <HomeSection id="contact" tone="cream">
          <HomeContainer>
            <div
              data-reveal
              className={cx(homeReveal(), "relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#f4efe4] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16")}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#c79a4b]/10 blur-[105px]"
              />
              <div className="relative z-[1] grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
                <div className="max-w-[760px]">
                  <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
                    <span className="h-px w-9 bg-[#8f672b]/70" />
                    Ready to Build with Checkmate?
                  </span>
                  <h2
                    data-reveal
                    className={[
                      homeReveal(1),"mt-6 max-w-[720px]", homeSectionTitle].join(
                      " ",
                    )}
                  >
                    Better strategy.{" "}
                    <span className="bg-[linear-gradient(105deg,#7d5724_0%,#c79a4b_52%,#ebca84_100%)] bg-clip-text text-transparent">
                      Stronger execution.
                    </span>
                  </h2>
                  <p
                    data-reveal
                    className={[
                      homeReveal(2),"mt-6 max-w-[620px]", homeBody].join(" ")}
                  >
                    Connect with our team to explore technology, development,
                    construction, and strategic partnership opportunities.
                  </p>
                </div>

                <div
                  data-reveal
                  className={cx(homeReveal(3), "flex flex-col gap-3 sm:flex-row lg:flex-col")}
                >
                  <a href={contactHref} className={homeBtnPrimaryDark}>
                    <span className="relative z-[2]">Talk to Our Team</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="relative z-[2] h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </a>
                  <a
                    href="/solutions"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-black/[0.12] px-6 text-[0.76rem] font-bold uppercase tracking-[0.1em] text-[#171614] transition-[background-color,color,border-color] duration-300 hover:border-[#171614] hover:bg-[#171614] hover:text-white"
                  >
                    Explore Divisions
                  </a>
                </div>
              </div>
            </div>
          </HomeContainer>
        </HomeSection>
      </main>

      <HomeFooter
        siteName={siteName}
        siteDescription={settings.site_description}
        supportEmail={settings.support_email}
        facebookUrl={settings.facebook_url}
        instagramUrl={settings.instagram_url}
        linkedinUrl={settings.linkedin_url}
        youtubeUrl={settings.youtube_url}
        copyrightText={settings.copyright_text}
      />

      <HomeAssistant />
      <HomeInteractions />
    </div>
  );
}
