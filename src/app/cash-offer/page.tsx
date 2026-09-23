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
import { SiteShell } from "@/components/home/site-shell";
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

  return (
    <SiteShell settings={settings}>
      <JsonLd
        id="cash-offer-breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cash Offer", path: "/cash-offer" },
        ])}
      />

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

        <HomeContainer className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div className="grid gap-12 lg:min-h-[710px] lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-center lg:gap-16">
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
                "rounded-[8px] border border-white/12 bg-white/[0.06] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-6",
              )}
            >
              <div className="rounded-[8px] border border-[#ebca84]/18 bg-[#11100e]/88 p-6">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
                  We are looking to buy houses in your area
                </p>
                <p className="mt-4 text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                  Any condition.
                </p>
                <p className="mt-5 text-[0.98rem] leading-7 text-white/58">
                  Complete the short survey and we will call you. We buy houses
                  for cash. Top price guaranteed.
                </p>
                <Link
                  href="#cash"
                  className={cx(homeBtnPrimaryGold, "mt-8 w-full")}
                >
                  <span className="relative z-[2]">Start the survey</span>
                </Link>
              </div>
            </div>
          </div>
        </HomeContainer>
      </section>

      <HomeSection tone="cream">
        <HomeContainer>
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
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

            <div className="grid gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    data-reveal
                    className={cx(
                      homeReveal(index + 1),
                      "grid gap-5 rounded-[8px] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_rgba(15,15,15,0.05)] sm:grid-cols-[56px_1fr] sm:p-7",
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

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <div
                key={reason}
                data-reveal
                className={cx(
                  homeReveal(index % 4),
                  "flex min-h-[74px] items-center gap-3 rounded-[8px] border border-black/[0.07] bg-[#fbfaf7] px-5 py-4",
                )}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ebca84] text-[#171614]">
                  <Check size={16} strokeWidth={2.4} />
                </span>
                <p className="text-[0.95rem] font-semibold leading-6 text-[#171614]">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection tone="dark">
        <HomeContainer>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
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

            <div className="grid gap-4 sm:grid-cols-2">
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

      <HomeSection tone="cream" id="cash">
        <HomeContainer>
          <div className="mx-auto max-w-[820px]">
            <div data-reveal className={cx(homeReveal(), "text-center")}>
              <span className={cx(homeEyebrowLight, "justify-center")}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Questions? Complete the short survey
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                Answer a few simple questions to get an instant offer.
              </h2>
              <p className={cx("mx-auto mt-4 max-w-[590px]", homeBody)}>
                We will call you, review the property, and let you know what we
                can pay for your home.
              </p>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(1),
                "mt-10 rounded-[8px] border border-black/[0.07] bg-white px-5 py-7 shadow-[0_24px_70px_rgba(15,15,15,0.06)] sm:px-8 sm:py-9",
              )}
            >
              {form ? (
                <CashOfferForm form={form} />
              ) : (
                <div className="rounded-[8px] border border-dashed border-black/15 bg-[#f8f6f1] px-6 py-12 text-center">
                  <p className="text-[0.95rem] leading-7 text-[#68635b]">
                    The cash offer form is not published yet. Connect a
                    published form to “Cash Offer page” in the Forms admin area,
                    or publish a form with the slug “cash-offer”.
                  </p>
                </div>
              )}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
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
    </SiteShell>
  );
}
