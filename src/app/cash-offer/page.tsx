import type { Metadata } from "next";
import Image from "next/image";
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
    title: "Request your offer online, no prep work or showings.",
    description:
      "Fill out our convenient online survey form and discover your property's 'True Value' in only a couple of minutes.",
  },
  {
    icon: BadgeDollarSign,
    title: "Get a competitive cash offer within 7 minutes.",
    description:
      "We will quickly evaluate your property and present you with a fair cash offer. You’re under no obligation; this is simply us letting you know what we’ll pay for your home.",
  },
  {
    icon: CalendarCheck,
    title: "Hassle free, quick closing & get paid in as little as 7 days!",
    description:
      "If you are happy with our offer, we will take the process further and arrange a closing date that will suit you. This is also when we pay you, in as little as 7 days.",
  },
] as const;

const benefits = [
  {
    icon: Clock3,
    title: "Fast closings.",
    description:
      "We can often close in as little as seven days because our purchase does not depend on approved financing, home inspections, or appraised values.",
  },
  {
    icon: Hammer,
    title: "Selling “as is.”",
    description:
      "We buy homes in any condition, so you won’t have to worry about costly repairs or upgrades that would typically be required.",
  },
  {
    icon: Home,
    title: "No need to move before selling.",
    description:
      "Your house won’t need to be “kept “show ready” for months while you live somewhere else, shouldering the cost of monthly payments.",
  },
  {
    icon: ShieldCheck,
    title: "Avoid contingency clauses.",
    description:
      "House contracts are notorious for “back out” clauses that protect buyers but not sellers. With Home Flippers, you won’t have to worry about the sale falling through at the last minute.",
  },
] as const;

const faqs = [
  {
    question: "How are real estate investors different from real estate agents?",
    answer: [
      "When you work with a real estate agent, they will list your house in the hope that someone will purchase it. This process can be long and stressful, and it will also cost you a chunk of what you make on the house (agents typically charge three to six percent of the sale price).",
      "We are a real estate investment and private cash fast house buyer company, which means that we buy your home ourselves.",
      "We won’t list your property and look for buyers; instead, we’ll buy directly from you with cash. This approach gives us the freedom to decide and complete the purchase quickly, sometimes in just a matter of days. We do this because we then repair or renovate the property and put it back on the market to find a buyer. It’s a win-win situation that gets you out from under your house / condo fast and turns a profit for us.",
    ],
  },
  {
    question: "Is there any risk or obligation when I give you my information?",
    answer: [
      "Absolutely not. You can tell us about your property, and we’ll come and look at it when it’s convenient for you. If we can buy your house or condo, we’ll make you a fair cash offer. At that point, it’s entirely up to you to decide whether to accept our offer or not. We won’t pressure you, harass you, or hassle you – and we won’t charge you anything even if you don’t accept. You have nothing to lose by contacting us.",
    ],
  },
  {
    question: "What if I’m in foreclosure or my house needs extensive repairs?",
    answer: [
      "That’s okay! We buy properties in any condition and join forces with homeowners in a wide variety of situations. Whether you are in or near foreclosure, can’t or don’t want to perform the repairs your house or condo needs, have inherited a property you can’t afford to keep, need to move fast for work, or whatever your situation, we can help.",
    ],
  },
  {
    question: "Does it cost me anything to work with you?",
    answer: [
      "We do not charge you any fees at all at any point in the process. We do not charge you to visit your property or make you an offer. If you decide not to accept our offer, that’s okay – you still won’t owe us anything. We do not charge any commission the way real estate agents do, either. We’ll even cover the closing costs. You will not have to pay for repairs, upgrades, cleaning services, or anything else when you work with us.",
    ],
  },
  {
    question: "How long does the process take?",
    answer: [
      "It largely depends on you. We can often close within days if you need to move fast – or we can wait until you’re ready. Most people come to us because they need to sell their homes as quickly as possible. Because we don’t need to wait for a bank loan approval, we can close fast and get you paid within days or weeks.",
    ],
  },
  {
    question: "Why Choose A Cash Buyer Over A Realtor?",
    answer: [
      "Working with us has some distinct advantages over selling through a real estate agent. We are not real estate agents; we are investors who buy houses for cash fast.",
      "Some of the benefits of working with us are:",
    ],
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
        <HomeContainer className="flex min-h-[68px] items-center justify-between gap-3 sm:min-h-[76px] sm:gap-5">
          <Link
            href="/cash-offer"
            className="flex items-center gap-3 text-white"
            aria-label={`${siteName} Cash Offer`}
          >
            <Image
              src="/images/cash-offer/logo-reg.webp"
              alt={siteName}
              width={200}
              height={92}
              priority
              className="h-auto w-[150px] max-w-[50vw] sm:w-[200px]"
            />
          </Link>

          <Link
            href="#cash"
            className="inline-flex min-h-[38px] shrink-0 items-center justify-center rounded-[8px] border border-[#ebca84]/35 bg-[#ebca84] px-3 text-[0.62rem] font-extrabold uppercase tracking-[0.08em] text-[#171614] transition hover:bg-[#f1d79d] sm:min-h-[42px] sm:px-4 sm:text-[0.68rem] sm:tracking-[0.1em]"
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

        <HomeContainer className="pb-14 pt-24 sm:pb-20 sm:pt-32 lg:pb-20 lg:pt-28">
          <div className="grid gap-8 lg:min-h-[760px] lg:grid-cols-[minmax(0,0.9fr)_minmax(430px,1.1fr)] lg:items-center lg:gap-12">
            <div className="max-w-[780px]">
              <span data-reveal className={cx(homeReveal(), homeEyebrowDark, "flex-wrap")}>
                <span className="h-px w-9 bg-[#ebca84]/70" />
                FILL OUT THE SURVEY TO
              </span>

              <h1
                data-reveal
                className={cx(
                  homeReveal(1),
                  "mt-5 text-[clamp(2.25rem,11vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:mt-6 sm:tracking-[-0.055em]",
                )}
              >
                GET A FAIR CASH OFFER{" "}
                <span className={homeTitleGradient}>WITHIN 24 HOURS</span>
              </h1>

              <p
                data-reveal
                className={cx(
                  homeReveal(2),
                  "mt-5 max-w-[660px] text-[0.98rem] leading-[1.7] text-white/62 sm:mt-6 sm:text-[1.08rem] sm:leading-[1.75]",
                )}
              >
                Sell Your House Quickly For A Fair Price WITHOUT the stress of
                making repairs, listing your house, and waiting months for
                closing
              </p>

              <div
                data-reveal
                className={cx(
                  homeReveal(3),
                  "mt-7 flex flex-col items-start gap-3 sm:mt-9",
                )}
              >
                <Link
                  href="#cash"
                  className={cx(homeBtnPrimaryGold, "w-full !text-white sm:w-auto [&_*]:!text-white")}
                >
                  <span className="relative z-[2]">Get My Fair Cash Offer!</span>
                </Link>
                <p className="max-w-[320px] text-[0.76rem] font-bold uppercase tracking-[0.14em] text-white/48">
                  Get A ZERO Obligation Instant Cash Offer
                </p>
              </div>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(2),
                "rounded-[8px] border border-white/12 bg-white/[0.08] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-5",
              )}
            >
              <div
                id="cash"
                className="rounded-[8px] border border-[#ebca84]/18 bg-[#fbfaf7] p-4 text-[#171614] sm:p-6"
              >
                <div className="mb-5 border-b border-black/[0.08] pb-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#8f672b]">
                    We buy houses for cash
                  </p>
                  <h2 className="mt-2 text-[clamp(1.32rem,7vw,2.05rem)] font-semibold leading-tight tracking-[-0.04em] text-[#171614]">
                    Answer A Few Simple Questions To Get An Instant Offer
                  </h2>
                  <p className="mt-3 text-[0.84rem] font-extrabold uppercase tracking-[0.12em] text-[#8f672b]">
                    get your offer now!
                  </p>
                </div>

                <CashOfferForm formSlug={form?.slug || "cash-offer"} />
              </div>
            </div>
          </div>
        </HomeContainer>
      </section>

      <HomeSection tone="cream">
        <HomeContainer>
          <div
            data-reveal
            className={cx(
              homeReveal(),
              "mx-auto max-w-[900px] rounded-[8px] border border-black/[0.07] bg-white px-5 py-10 text-center shadow-[0_24px_70px_rgba(15,15,15,0.06)] sm:px-10 sm:py-12 lg:px-16",
            )}
          >
            <div className="mx-auto max-w-[720px]">
              <span className={cx(homeEyebrowLight, "justify-center text-center")}>
                <span className="hidden h-px w-9 bg-[#8f672b]/70 sm:block" />
                We are looking to buy houses in your area
                <span className="hidden h-px w-9 bg-[#8f672b]/70 sm:block" />
              </span>

              <h2 className="mt-6 text-[clamp(2.35rem,13vw,5rem)] font-semibold leading-none tracking-[-0.055em] text-[#171614]">
                ANY CONDITION!
              </h2>

              <p className="mx-auto mt-7 max-w-[620px] text-[0.92rem] font-extrabold uppercase leading-7 tracking-[0.08em] text-[#171614] sm:text-[1rem] sm:tracking-[0.1em]">
                QUESTIONS? COMPLETE THE SHORT SURVEY & WE’LL CALL YOU!
              </p>

              <p className="mx-auto mt-4 max-w-[520px] text-[0.82rem] font-bold uppercase leading-6 tracking-[0.1em] text-[#8f672b] sm:text-[0.88rem] sm:tracking-[0.12em]">
                We Buy Houses For Cash. Top Price Guaranteed.
              </p>
            </div>

            <div className="mt-9 flex justify-center">
              <Link href="#cash" className={cx(homeBtnPrimaryDark, "w-full sm:w-auto")}>
                Get My Fair Cash Offer!
              </Link>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={cx(homeEyebrowLight, "flex-wrap")}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Your 3 Step Process Is Simple
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                Your 3 Step Process Is Simple
              </h2>
            </div>

            <div className="relative grid gap-4 lg:grid-cols-3">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-[#c79a4b]/28 lg:block"
              />

              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    data-reveal
                    className={cx(
                      homeReveal(index + 1),
                      "relative z-[1] rounded-[8px] border border-black/[0.07] bg-white p-6 text-left shadow-[0_18px_50px_rgba(15,15,15,0.05)] sm:p-8",
                    )}
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#171614] text-[#ebca84] shadow-[0_14px_35px_rgba(23,22,20,0.16)] sm:h-16 sm:w-16">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <div className="mt-7">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8f672b]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-4 max-w-[300px] text-[1.22rem] font-semibold leading-tight tracking-[-0.03em] text-[#171614] sm:text-[1.35rem]">
                        {step.title}
                      </h3>
                      <p className={cx("mt-5 max-w-[320px]", homeBody)}>
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div data-reveal className={cx(homeReveal(4), "flex justify-center")}>
              <Link href="#cash" className={cx(homeBtnPrimaryDark, "w-full sm:w-auto")}>
                Get My Fair Cash Offer!
              </Link>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div data-reveal className={cx(homeReveal(), "mx-auto max-w-[820px] text-center")}>
            <span className={cx(homeEyebrowLight, "justify-center text-center")}>
              <span className="hidden h-px w-9 bg-[#8f672b]/70 sm:block" />
              No Matter What Your Reason Is, We Can Help!
              <span className="hidden h-px w-9 bg-[#8f672b]/70 sm:block" />
            </span>
            <h2 className={cx("mt-5", homeSectionTitle)}>
              No Matter What Your Reason Is, We Can Help!
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasonGroups.map((group, index) => (
              <div
                key={group.join("-")}
                data-reveal
                className={cx(
                  homeReveal(index + 1),
                  "rounded-[8px] border border-black/[0.07] bg-[#fbfaf7] p-5 shadow-[0_16px_45px_rgba(15,15,15,0.04)]",
                )}
              >
                <div className="grid gap-3">
                  {group.map((reason) => (
                    <div
                      key={reason}
                      className="flex min-h-[60px] items-center gap-3 rounded-[8px] border border-black/[0.055] bg-white px-4 py-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ebca84] text-[#171614]">
                        <Check size={15} strokeWidth={2.4} />
                      </span>
                      <p className="text-left text-[0.92rem] font-extrabold leading-5 text-[#171614]">
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className={cx(homeReveal(4), "mt-10 flex justify-center")}>
            <Link href="#cash" className={cx(homeBtnPrimaryDark, "w-full sm:w-auto")}>
              Get My Fair Cash Offer!
            </Link>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection tone="dark">
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={cx(homeEyebrowDark, "flex-wrap")}>
                <span className="h-px w-9 bg-[#ebca84]/70" />
                Cash buyer advantage
              </span>
              <h2 className={cx("mt-5", homeSectionTitleDark)}>
                Why Choose A Cash Buyer Over A Realtor?
              </h2>
              <p className="mt-5 max-w-[560px] text-[0.98rem] leading-[1.75] text-white/58">
                Working with us has some distinct advantages over selling
                through a real estate agent. We are not real estate agents; we
                are investors who buy houses for cash fast.
              </p>
              <p className="mt-5 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#ebca84]">
                Some of the benefits of working with us are:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

            <div data-reveal className={cx(homeReveal(4), "flex justify-center")}>
              <Link href="#cash" className={cx(homeBtnPrimaryGold, "w-full sm:w-auto")}>
                <span className="relative z-[2]">Get My Fair Cash Offer!</span>
              </Link>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>

      <HomeSection>
        <HomeContainer>
          <div className="grid gap-10">
            <div data-reveal className={homeReveal()}>
              <span className={cx(homeEyebrowLight, "flex-wrap")}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Frequently Asked Questions
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                Frequently Asked Questions
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
                  <div className="mt-3 grid gap-4">
                    {faq.answer.map((paragraph) => (
                      <p key={paragraph} className={homeBody}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div data-reveal className={cx(homeReveal(4), "flex justify-center")}>
              <Link href="#cash" className={cx(homeBtnPrimaryDark, "w-full sm:w-auto")}>
                Get My Fair Cash Offer!
              </Link>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>
      <footer className="border-t border-black/[0.08] bg-[#050505] py-8 text-center">
        <p className="text-sm font-medium text-white/52">
          Copyright © 2025. All rights reserved.
        </p>
      </footer>
      <HomeInteractions />
    </div>
  );
}
