import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LpThanksReveal } from "@/components/lp/lp-thanks-reveal";
import { LP_LOGO_URL } from "@/lib/lp-assets";
import "./lp-obrigado.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Account Created | Checkmate Property",
  description:
    "Your Checkmate Property account has been created successfully. See the next steps to access the platform.",
};

export default function LpObrigadoPage() {
  return (
    <section
      className={`${inter.variable} cm-thanks`}
      id="checkmate-thank-you-page"
    >
      <LpThanksReveal />

      <section className="cm-thanks-section">
        <div className="cm-bg-grid" />

        <div className="cm-squares">
          <span className="cm-square s1" />
          <span className="cm-square s2" />
          <span className="cm-square s3" />
          <span className="cm-square s4" />
        </div>

        <div className="cm-blur one" />
        <div className="cm-blur two" />

        <div className="cm-thanks-container">
          <div className="cm-hero-card cm-reveal">
            <div className="cm-logo-wrap">
              <img
                className="cm-logo"
                src={LP_LOGO_URL}
                alt="Checkmate Property"
              />
            </div>

            <div className="cm-kicker">Account created</div>

            <h1 className="cm-title">
              Welcome to{" "}
              <span className="cm-gradient-text">Checkmate Property.</span>
            </h1>

            <p className="cm-subtitle">
              Your registration was completed successfully. You now have access
              to a platform designed to help investors search, analyze, and
              evaluate real estate opportunities with more clarity and control.
            </p>
          </div>

          <div className="cm-main-grid">
            <div className="cm-card cm-reveal cm-delay-1">
              <h2 className="cm-card-title">Next steps</h2>

              <p className="cm-card-subtitle">
                Follow these simple steps to start using Checkmate Property.
              </p>

              <div className="cm-steps">
                <div className="cm-step">
                  <div className="cm-step-number">1</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Step 1</span>
                      <span className="cm-pill">Completed</span>
                    </div>

                    <h3 className="cm-step-title">Registration confirmed</h3>

                    <p className="cm-step-text">
                      Your account information was received and your access
                      request has been processed.
                    </p>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">2</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Step 2</span>
                      <span className="cm-pill blue">Now</span>
                    </div>

                    <h3 className="cm-step-title">
                      Download the Checkmate Property app
                    </h3>

                    <p className="cm-step-text">
                      The app is where you can access your account, search
                      opportunities, review information, and continue exploring
                      the Checkmate Property platform.
                    </p>

                    <div className="cm-store-buttons">
                      <a
                        className="cm-store-btn"
                        href="https://apps.apple.com/br/app/checkmate-property/id6736963772"
                        target="_blank"
                        rel="noopener"
                      >
                        <span className="cm-store-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M17.2 13.1c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4.1 1-.8 0-2.1-1-3.5-.9-1.8 0-3.5 1.1-4.4 2.7-1.9 3.3-.5 8.1 1.3 10.7.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.6 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.4-2.9 1.4-3-.1-.1-2.9-1.2-2.9-4.4Z"
                              fill="currentColor"
                            />
                            <path
                              d="M14.6 5.1c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.1-1.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>

                        <span className="cm-store-copy">
                          <span className="cm-store-small">Download on the</span>
                          <span className="cm-store-main">App Store</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">3</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Step 3</span>
                      <span className="cm-pill blue">Access</span>
                    </div>

                    <h3 className="cm-step-title">
                      Open the app and access your account
                    </h3>

                    <p className="cm-step-text">
                      Use the same account information you submitted during
                      registration to access the Checkmate Property experience.
                    </p>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">4</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Step 4</span>
                      <span className="cm-pill blue">Explore</span>
                    </div>

                    <h3 className="cm-step-title">
                      Start searching real estate opportunities
                    </h3>

                    <p className="cm-step-text">
                      Search properties, review market information, and use the
                      platform to support smarter real estate decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="cm-card cm-summary-card cm-reveal cm-delay-2">
              <div className="cm-summary-content">
                <span className="cm-summary-kicker">Your account summary</span>

                <h2 className="cm-summary-title">You are ready to start</h2>

                <p className="cm-summary-text">
                  Your account has been created. The ideal flow is simple:
                  download the app, access your account, and start exploring
                  real estate opportunities with Checkmate Property.
                </p>

                <div className="cm-status-grid">
                  <div className="cm-status-box">
                    <div className="cm-status-label">Estimated time</div>
                    <div className="cm-status-value">2 min</div>
                  </div>

                  <div className="cm-status-box">
                    <div className="cm-status-label">Access</div>
                    <div className="cm-status-value">Ready</div>
                  </div>
                </div>

                <div className="cm-summary-line" />

                <div className="cm-summary-note">
                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>
                      Download the Checkmate Property app on your phone.
                    </span>
                  </div>

                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>Open the app and access your account.</span>
                  </div>

                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>
                      Start searching and reviewing real estate opportunities.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="cm-footer cm-reveal cm-delay-3">
            © 2026 Checkmate Real Estate Group
          </div>
        </div>
      </section>
    </section>
  );
}