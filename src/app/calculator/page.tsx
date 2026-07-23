import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  Check,
  CircleDollarSign,
  FolderKanban,
  Gauge,
  Mail,
  MessagesSquare,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { CampaignSignupForm } from "@/components/public/campaign-signup-form";
import { CalculatorFooter } from "@/components/public/calculator-footer";
import { CalculatorHeader } from "@/components/public/calculator-header";
import { CalculatorPageReveal } from "@/components/public/calculator-page-reveal";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { getSiteSettings } from "@/lib/site-settings";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import "./calculator-page.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-calc",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = getCanonicalSiteUrl();

const PAGE_TITLE = "FREE Flip Calculator | Checkmate Property";
const PAGE_DESCRIPTION =
  "Analyze real estate investments with Checkmate Property's FREE Flip Calculator. Estimate rehab costs, ROI, profit and acquisition scenarios without complicated spreadsheets.";

const HERO_IMAGE =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/property-media/properties/WhatsApp%20Image%202026-07-07%20at%2022.47.54.jpeg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/calculator",
    siteName: "Checkmate Property",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

const BENEFITS = [
  {
    title: "Complete Deal Analysis",
    description:
      "Bring purchase price, rehab, financing, holding and selling costs into one guided workflow.",
    icon: Calculator,
  },
  {
    title: "Instant ROI Insights",
    description:
      "See estimated profit, ROI and required capital immediately as your deal assumptions change.",
    icon: BarChart3,
  },
  {
    title: "Scenario Comparison",
    description:
      "Test different purchase prices, renovation budgets and projected ARVs before you commit.",
    icon: SlidersHorizontal,
  },
  {
    title: "Organized Deal Data",
    description:
      "Save, download and keep your project information structured and ready to revisit anytime.",
    icon: FolderKanban,
  },
  {
    title: "Investor Communication",
    description:
      "Share a clearer deal analysis with investors, partners and team members when decisions matter.",
    icon: Mail,
  },
  {
    title: "Faster Decisions",
    description:
      "Reduce manual calculations and understand whether an opportunity fits your strategy sooner.",
    icon: Gauge,
  },
] as const;

const STEPS = [
  {
    number: "01",
    title: "Add the property numbers",
    description:
      "Enter purchase price, rehab costs, financing details and projected sale value.",
  },
  {
    number: "02",
    title: "Review the complete analysis",
    description:
      "See estimated profit, ROI, closing costs, carrying expenses and required capital.",
  },
  {
    number: "03",
    title: "Make a more informed decision",
    description:
      "Compare scenarios and understand whether the deal matches your investment strategy.",
  },
] as const;

function TryCalculatorCta({
  className,
  label = "Start analyzing for free",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a href="#register" className={className || "calc-cta"}>
      <span>{label}</span>
      <ArrowRight size={18} className="calc-cta-arrow" aria-hidden="true" />
    </a>
  );
}

function ProductPreview() {
  return (
    <div className="calc-product-preview calc-reveal is-visible" aria-label="Calculator interface preview">
      <div className="calc-browser-bar">
        <div className="calc-browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="calc-browser-title">Flip Calculator</span>
        <span className="calc-browser-status">Live analysis</span>
      </div>

      <div className="calc-product-body">
        <div className="calc-product-form">
          <div className="calc-mini-label">Property information</div>
          <div className="calc-mini-field">
            <span>Purchase price</span>
            <strong>$320,000</strong>
          </div>
          <div className="calc-mini-field">
            <span>Rehab estimate</span>
            <strong>$65,000</strong>
          </div>
          <div className="calc-mini-field">
            <span>Projected ARV</span>
            <strong>$495,000</strong>
          </div>
          <div className="calc-mini-progress" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="calc-product-results">
          <div className="calc-mini-label">Deal results</div>
          <div className="calc-result-card calc-result-card-featured">
            <span>Estimated profit</span>
            <strong>$67,500</strong>
            <small>Illustrative estimate</small>
          </div>
          <div className="calc-result-grid">
            <div className="calc-result-card">
              <span>ROI</span>
              <strong>17.8%</strong>
            </div>
            <div className="calc-result-card">
              <span>Required capital</span>
              <strong>$92.4K</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-floating-chip calc-chip-profit">
        <TrendingUp size={16} />
        <span>Profit potential</span>
        <strong>+$67.5K</strong>
      </div>
      <div className="calc-floating-chip calc-chip-roi">
        <CircleDollarSign size={16} />
        <span>Estimated ROI</span>
        <strong>17.8%</strong>
      </div>
    </div>
  );
}

export default async function CalculatorLandingPage() {
  const [settings, calculatorFormResult] = await Promise.all([
    getSiteSettings(),
    getPublishedFormByPageKey("calculator"),
  ]);

  const calculatorForm = calculatorFormResult.form
    ? {
        form: calculatorFormResult.form,
        fields: calculatorFormResult.fields,
      }
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/calculator`,
    isPartOf: {
      "@type": "WebSite",
      name: "Checkmate Property",
      url: SITE_URL,
    },
  };

  return (
    <main className={`${manrope.variable} calc-page`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <CalculatorPageReveal />
      <CalculatorHeader settings={settings} />

      <section className="calc-hero">
        <Image
          src={HERO_IMAGE}
          alt="Residential real estate property for flip analysis"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="calc-hero-image"
        />
        <div className="calc-hero-overlay" aria-hidden="true" />
        <div className="calc-hero-glow" aria-hidden="true" />

        <div className="calc-wrap calc-hero-grid">
          <div className="calc-hero-copy">
            <p className="calc-eyebrow calc-reveal is-visible">
              <Sparkles size={15} aria-hidden="true" />
              Free real estate investment calculator
            </p>

            <h1 className="calc-reveal is-visible">
              Analyze your next{" "}
              <span className="calc-gradient-text">real estate deal</span> with
              confidence.
            </h1>

            <p className="calc-hero-support calc-reveal is-visible">
              Estimate purchase costs, rehab, ARV, ROI and potential profit in
              minutes — without complicated spreadsheets.
            </p>

            <div className="calc-hero-actions calc-reveal is-visible">
              <TryCalculatorCta />
              <a href="#how-it-works" className="calc-secondary-cta">
                See how it works
              </a>
            </div>

            <div className="calc-hero-proof calc-reveal is-visible">
              <span><Check size={15} /> Free access</span>
              <span><Check size={15} /> No credit card required</span>
            </div>
          </div>

          <ProductPreview />
        </div>
      </section>

      <section className="calc-section calc-future">
        <div className="calc-wrap calc-future-grid">
          <div className="calc-reveal">
            <p className="calc-kicker">
              <span className="calc-kicker-dot" aria-hidden="true" />
              A clearer way to evaluate deals
            </p>
            <h2>
              From scattered spreadsheets to{" "}
              <span className="calc-gradient-text">
                clear investment decisions
              </span>
              .
            </h2>
          </div>

          <div className="calc-compare-card calc-reveal calc-delay-1">
            <div className="calc-compare-column calc-compare-before">
              <span className="calc-compare-label">Before</span>
              <ul>
                <li>Manual calculations</li>
                <li>Disconnected spreadsheets</li>
                <li>Inconsistent formulas</li>
                <li>Slow deal analysis</li>
              </ul>
            </div>
            <div className="calc-compare-column calc-compare-after">
              <span className="calc-compare-label">With Checkmate Property</span>
              <ul>
                <li>One guided workflow</li>
                <li>Real-time calculations</li>
                <li>Clear ROI and profit estimates</li>
                <li>Faster investment decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="calc-section calc-how" id="how-it-works">
        <div className="calc-wrap">
          <div className="calc-section-head calc-reveal">
            <p className="calc-kicker">
              <span className="calc-kicker-dot" aria-hidden="true" />
              How it works
            </p>
            <h2>
              Analyze a deal in{" "}
              <span className="calc-gradient-text">three simple steps</span>.
            </h2>
            <p>
              Go from raw property numbers to a structured deal overview without
              building formulas from scratch.
            </p>
          </div>

          <div className="calc-steps-grid">
            {STEPS.map((step, index) => (
              <article
                className={`calc-step-card calc-reveal ${index === 1 ? "calc-delay-1" : ""}`}
                key={step.number}
              >
                <span className="calc-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="calc-section calc-benefits">
        <div className="calc-wrap">
          <div className="calc-section-head calc-reveal">
            <p className="calc-kicker">
              <span className="calc-kicker-dot" aria-hidden="true" />
              Key benefits
            </p>
            <h2>
              Everything you need to evaluate a deal with{" "}
              <span className="calc-gradient-text">more clarity</span>.
            </h2>
          </div>

          <div className="calc-benefits-grid">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className={`calc-benefit calc-reveal ${index % 3 === 1 ? "calc-delay-1" : ""}`}
                >
                  <div className="calc-benefit-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>

          <div className="calc-section-cta calc-reveal">
            <TryCalculatorCta />
          </div>
        </div>
      </section>

      <section className="calc-section calc-example">
        <div className="calc-wrap calc-example-grid">
          <div className="calc-example-copy calc-reveal">
            <p className="calc-kicker calc-kicker-on-dark">
              <span className="calc-kicker-dot" aria-hidden="true" />
              See the numbers clearly
            </p>
            <h2>
              Understand the{" "}
              <span className="calc-gradient-text">financial picture</span>{" "}
              before you move forward.
            </h2>
            <p>
              The calculator brings your major cost assumptions together so you
              can see what is driving the projected outcome.
            </p>
            <div className="calc-example-points">
              <span><WalletCards size={18} /> Acquisition and financing costs</span>
              <span><Building2 size={18} /> Rehab and project expenses</span>
              <span><TrendingUp size={18} /> Estimated profit and ROI</span>
            </div>
          </div>

          <div className="calc-deal-card calc-reveal calc-delay-1">
            <div className="calc-deal-card-head">
              <div>
                <span>Example deal analysis</span>
                <strong>Residential Flip</strong>
              </div>
              <div className="calc-deal-badge">Illustrative</div>
            </div>
            <dl>
              <div><dt>Purchase price</dt><dd>$320,000</dd></div>
              <div><dt>Rehab estimate</dt><dd>$65,000</dd></div>
              <div><dt>Projected ARV</dt><dd>$495,000</dd></div>
              <div><dt>Estimated costs</dt><dd>$42,500</dd></div>
            </dl>
            <div className="calc-deal-summary">
              <div><span>Estimated profit</span><strong>$67,500</strong></div>
              <div><span>Estimated ROI</span><strong>17.8%</strong></div>
            </div>
            <small>Illustrative example only. Actual results may vary.</small>
          </div>
        </div>
      </section>

      <section className="calc-section calc-about">
        <div className="calc-wrap calc-about-grid">
          <div className="calc-reveal">
            <p className="calc-kicker calc-kicker-on-dark">
              <span className="calc-kicker-dot" aria-hidden="true" />
              Built from real market experience
            </p>
            <h2>
              Built by people who analyze, finance, build and manage{" "}
              <span className="calc-gradient-text">real estate projects</span>.
            </h2>
          </div>

          <div className="calc-about-copy calc-reveal calc-delay-1">
            <p>
              Checkmate Property combines practical real estate experience with
              technology designed to simplify complex investment decisions.
            </p>
            <p>
              Our tools are shaped by the same challenges investors, builders,
              developers and operators face every day.
            </p>

            <div className="calc-about-credentials">
              <span><Building2 size={18} /> Real project experience</span>
              <span><Sparkles size={18} /> Technology-driven analysis</span>
              <span><Users size={18} /> Built for real estate operators</span>
            </div>

            <div className="calc-about-note">
              <MessagesSquare size={20} aria-hidden="true" />
              <span>
                Built for investors, contractors, brokers and agents who want
                clearer numbers — faster.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="calc-section calc-register" id="register">
        <div className="calc-wrap calc-register-grid">
          <div className="calc-register-copy calc-reveal">
            <p className="calc-kicker">
              <span className="calc-kicker-dot" aria-hidden="true" />
              Free access
            </p>
            <h2>
              Create your account and start analyzing{" "}
              <span className="calc-gradient-text">your first deal</span>.
            </h2>
            <p>
              Get access to the FREE Flip Calculator and replace scattered
              spreadsheets with one clear, guided workflow.
            </p>

            <div className="calc-register-benefits">
              <span><Check size={18} /> Free account</span>
              <span><Check size={18} /> No credit card required</span>
              <span><Check size={18} /> Immediate calculator access</span>
            </div>
          </div>

          <div className="calc-form-shell calc-reveal calc-delay-1">
            <div className="calc-form-header">
              <div className="calc-form-icon" aria-hidden="true">
                <Calculator size={22} />
              </div>
              <p>Free sign up</p>
              <h3>Create your free account</h3>
              <span>
                Complete the form below to access Checkmate Property and start
                using the FREE Flip Calculator.
              </span>
            </div>

            <CampaignSignupForm
              searchForm={calculatorForm}
              signupSource="calculator_page"
              showSignInForm={false}
              trackMetaLeadOnSuccess
              missingFormHint="Connect a published form to the Flip Calculator page in Admin > Forms."
              className="calc-form-body"
            />
          </div>
        </div>
      </section>

      <CalculatorFooter settings={settings} />
    </main>
  );
}