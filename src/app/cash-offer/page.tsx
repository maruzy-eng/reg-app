import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeDollarSign,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock3,
  Hammer,
  Home,
  ShieldCheck,
} from "lucide-react";

import { CashOfferForm } from "@/components/cash-offer/cash-offer-form";
import { HomeHeroBackground } from "@/components/home/home-hero-background";
import { HomeInteractions } from "@/components/home/home-interactions";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeBtnPrimaryDark,
  homeBtnPrimaryGold,
  homeEyebrowDark,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
  homeSectionTitleDark,
  homeTitleGradient,
} from "@/components/home/home-ui";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { mapHomeSettings } from "@/lib/home/settings";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Get My Fair Cash Offer",
  description:
    "Sell your house quickly for a fair cash price without repairs, listing, commissions, or months of waiting.",
  path: "/cash-offer",
  keywords: [
    "cash offer",
    "sell house fast",
    "we buy houses",
    "fair cash offer",
    "sell property as is",
  ],
});

const reasons = [
  "Need Cash Quickly",
  "Downsizing",
  "Close To Foreclosure",
  "Divorce, Separation",
  "Financial Difficulty",
  "Retiring, Relocating",
  "Inherited Property To Sell",
  "Capitalizing Before The Market Crash",
  "Expensive Repairs Needed",
  "Buying Another Property",
  "Behind On Payments",
  "Reducing Your Risk Of Overexposure",
] as const;

const reasonGroups = [
  reasons.slice(0, 3),
  reasons.slice(3, 6),
  reasons.slice(6, 9),
  reasons.slice(9, 12),
] as const;

const steps = [
  {
    icon: ClipboardList,
    title: "Complete the survey",
    description:
      "Fill out our convenient online survey form and discover your property's true value in only a couple of minutes.",
  },
  {
    icon: BadgeDollarSign,
    title: "Receive a fair cash offer",
    description:
      "We quickly evaluate your property and present a zero-obligation cash offer.",
  },
  {
    icon: CalendarCheck,
    title: "Choose your closing date",
    description:
      "If you are happy with our offer, we arrange a closing date that suits you and pay you in as little as 7 days.",
  },
] as const;

const benefits = [
  {
    icon: Clock3,
    title: "Fast closings",
    description:
      "We can often close in as little as seven days because the purchase does not depend on approved financing.",
  },
  {
    icon: Hammer,
    title: "Sell as is",
    description:
      "We buy homes in any condition, so you do not need costly repairs, upgrades, or cleaning services.",
  },
  {
    icon: Home,
    title: "No show-ready stress",
    description:
      "Your house will not need to be kept ready for months while you wait for a traditional buyer.",
  },
  {
    icon: ShieldCheck,
    title: "No fees or commissions",
    description:
      "We do not charge commission, visit fees, offer fees, or closing costs.",
  },
] as const;

const faqs = [
  {
    question: "How are real estate investors different from real estate agents?",
    answer:
      "When you work with a real estate agent, they list your house in the hope that someone will purchase it. We are a real estate investment and private cash fast house buyer company, which means we buy your home ourselves. We do not list your property and look for buyers; instead, we buy directly from you with cash.",
  },
  {
    question: "Is there any risk or obligation when I give you my information?",
    answer:
      "Absolutely not. Tell us about your property, and we will look at it when it is convenient for you. If we can buy your house or condo, we will make a fair cash offer. At that point, it is entirely up to you to decide whether to accept.",
  },
  {
    question: "What if I am in foreclosure or my house needs extensive repairs?",
    answer:
      "That is okay. We buy properties in any condition and work with homeowners in many situations, including foreclosure, inherited properties, needed repairs, and urgent relocations.",
  },
  {
    question: "Does it cost me anything to work with you?",
    answer:
      "No. We do not charge you to visit your property, make an offer, or close the purchase. If you decide not to accept the offer, you still will not owe us anything.",
  },
  {
    question: "How long does the process take?",
    answer:
      "It largely depends on you. We can often close within days if you need to move fast, or we can wait until you are ready. Because we do not need bank loan approval, we can move quickly.",
  },
] as const;

export default async function CashOfferPage() {
  const [rawSettings, cashOfferForm] = await Promise.all([
    getSiteSettings(),
    getPublishedFormByPageKey("cash-offer"),
  ]);

  const settings = mapHomeSettings(rawSettings);
  const { form } = cashOfferForm;
  const siteName = settings.site_name || "Checkmate REG";

  return (
    <div className="checkmate-home min-h-screen overflow-x-hidden bg-white text-[#171614] antialiased selection:bg-[#ebca84] selection:text-[#171614]">
      <JsonLd
        id="cash-offer-breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cash Offer", path: "/cash-offer" },
        ])}
      />

      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-[#050505]/72 backdrop-blur-md">
        <HomeContainer className="flex min-h-[76px] items-center justify-between gap-5">
          <Link
            href="/cash-offer"
            className="flex items-center gap-3 text-white"
            aria-label={`${siteName} Cash Offer`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#ebca84] text-[0.72rem] font-extrabold tracking-[0.08em] text-[#171614]">
              REG
            </span>
            <span className="grid leading-none">
              <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">
                {siteName}
              </span>
              <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#ebca84]">
                Cash Offer
              </span>
            </span>
          </Link>

          <Link
            href="#cash"
            className="inline-flex min-h-[42px] items-center justify-center rounded-[8px] border border-[#ebca84]/35 bg-[#ebca84] px-4 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-[#171614] transition hover:bg-[#f1d79d]"
          >
            Start Survey
          </Link>
        </HomeContainer>
      </header>

      <section className="relative isolate overflow-hidden bg-[#050505] text-white">
        <HomeHeroBackground priority />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.86)_44%,rgba(0,0,0,0.58)_72%,rgba(0,0,0,0.8)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.9)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
        />

        <HomeContainer className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-20 lg:pt-28">
          <div className="grid gap-10 lg:min-h-[760px] lg:grid-cols-[minmax(0,0.9fr)_minmax(430px,1.1fr)] lg:items-center lg:gap-12">
            <div className="max-w-[780px]">
              <span data-reveal className={cx(homeReveal(), homeEyebrowDark)}>
                <span className="h-px w-9 bg-[#ebca84]/70" />
                Fill out the survey to
              </span>

              <h1
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-6 text-[clamp(2.55rem,5.2vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white",
                )}
              >
                Sell your house quickly for a{" "}
                <span className={homeTitleGradient}>fair cash price.</span>
              </h1>

              <p
                data-reveal
                className={cx(
                  homeReveal(2),
                  "mt-6 max-w-[660px] text-[1rem] leading-[1.75] text-white/62 sm:text-[1.08rem]",
                )}
              >
                Without the stress of making repairs, listing your house, and
                waiting months for closing.
              </p>

              <div
                data-reveal
                className={cx(
                  homeReveal(3),
                  "mt-9 flex flex-col gap-4 sm:flex-row sm:items-center",
                )}
              >
                <Link href="#cash" className={homeBtnPrimaryGold}>
                  <span className="relative z-[2]">Get My Fair Cash Offer</span>
                </Link>
                <p className="max-w-[260px] text-[0.76rem] font-bold uppercase tracking-[0.14em] text-white/48">
                  Zero obligation instant cash offer
                </p>
              </div>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(2),
                "rounded-[8px] border border-white/12 bg-white/[0.08] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-5",
              )}
            >
              <div
                id="cash"
                className="rounded-[8px] border border-[#ebca84]/18 bg-[#fbfaf7] p-5 text-[#171614] sm:p-6"
              >
                <div className="mb-5 border-b border-black/[0.08] pb-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#8f672b]">
                    We buy houses for cash
                  </p>
                  <h2 className="mt-2 text-[clamp(1.45rem,2.3vw,2.05rem)] font-semibold leading-tight tracking-[-0.04em] text-[#171614]">
                    Answer a few simple questions to get an instant offer.
                  </h2>
                </div>

                <CashOfferForm formSlug={form?.slug || "cash-offer"} />
              </div>
            </div>
          </div>
        </HomeContainer>
      </section>

      <HomeSection tone="cream">
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={homeEyebrowLight}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Simple process
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                Get a clear answer in only a couple of minutes.
              </h2>
              <p className={cx("mt-5 max-w-[540px]", homeBody)}>
                You are under no obligation. This is simply us letting you know
                what we will pay for your home.
              </p>
              <Link href="#cash" className={cx(homeBtnPrimaryDark, "mt-8")}>
                Get My Fair Cash Offer
              </Link>
            </div>

            <div className="relative grid gap-4 lg:grid-cols-3">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-[#c79a4b]/28 lg:block"
              />

              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    data-reveal
                    className={cx(
                      homeReveal(index + 1),
                      "relative z-[1] rounded-[8px] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_rgba(15,15,15,0.05)] sm:p-7",
                    )}
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#171614] text-[#ebca84]">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#8f672b]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.03em] text-[#171614]">
                        {step.title}
                      </h3>
                      <p className={cx("mt-3", homeBody)}>
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div data-reveal className={cx(homeReveal(), "max-w-[760px]")}>
            <span className={homeEyebrowLight}>
              <span className="h-px w-9 bg-[#8f672b]/70" />
              We can help when you are
            </span>
            <h2 className={cx("mt-5", homeSectionTitle)}>
              Selling because life needs a faster path forward.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {reasonGroups.map((group, index) => (
              <div
                key={group.join("-")}
                data-reveal
                className={cx(
                  homeReveal(index + 1),
                  "rounded-[8px] border border-black/[0.07] bg-[#fbfaf7] p-5",
                )}
              >
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#8f672b]">
                  Situation {index + 1}
                </p>

                <div className="mt-5 grid gap-4">
                  {group.map((reason) => (
                    <div key={reason} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ebca84] text-[#171614]">
                        <Check size={15} strokeWidth={2.4} />
                      </span>
                      <p className="text-[0.94rem] font-semibold leading-6 text-[#171614]">
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection tone="dark">
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={homeEyebrowDark}>
                <span className="h-px w-9 bg-[#ebca84]/70" />
                Cash buyer advantage
              </span>
              <h2 className={cx("mt-5", homeSectionTitleDark)}>
                Why choose a cash buyer over a realtor?
              </h2>
              <p className="mt-5 max-w-[560px] text-[0.98rem] leading-[1.75] text-white/58">
                Working with us has distinct advantages over selling through a
                real estate agent. We are investors who buy houses for cash
                fast.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    data-reveal
                    className={cx(
                      homeReveal(index + 1),
                      "rounded-[8px] border border-white/10 bg-white/[0.045] p-6",
                    )}
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#ebca84] text-[#171614]">
                      <Icon size={22} strokeWidth={1.9} />
                    </div>
                    <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.025em] text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-7 text-white/54">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={homeEyebrowLight}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Common questions
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                No pressure, no fees, no obligation.
              </h2>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq, index) => (
                <article
                  key={faq.question}
                  data-reveal
                  className={cx(
                    homeReveal(index % 4),
                    "rounded-[8px] border border-black/[0.07] bg-[#fbfaf7] p-6",
                  )}
                >
                  <h3 className="text-[1.1rem] font-semibold tracking-[-0.025em] text-[#171614]">
                    {faq.question}
                  </h3>
                  <p className={cx("mt-3", homeBody)}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>
      <HomeInteractions />
    </div>
  );
}
