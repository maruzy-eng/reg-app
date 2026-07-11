"use client";

import { useEffect, useMemo, useState } from "react";

type TutorialCategory = "all" | "analysis" | "funding" | "management" | "marketing";

type TutorialCard = {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  badge: string;
  category: Exclude<TutorialCategory, "all">;
  alt: string;
};

const tutorialCards: TutorialCard[] = [
  {
    title: "Calculator",
    description:
      "Learn how to use the deal analyzer to calculate numbers, margins, ROI, costs, and project feasibility.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/09/01-CALCULATOR.png",
    href: "/tutorial/calculator",
    badge: "Analysis",
    category: "analysis",
    alt: "Calculator tutorial",
  },
  {
    title: "Hard Money",
    description:
      "Understand how hard money can support your real estate investment strategy and project execution.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/09/02-HARD-MONEY.png",
    href: "/tutorial/hard-money",
    badge: "Funding",
    category: "funding",
    alt: "Tutorial Hard Money",
  },
  {
    title: "Projects",
    description:
      "Organize projects in one place and keep deal information structured throughout the operation.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/09/03-PROJECTS.png",
    href: "/tutorial/projects",
    badge: "Management",
    category: "management",
    alt: "Projects tutorial",
  },
  {
    title: "Properties",
    description:
      "Learn how to search, review, and organize on-market and off-market properties inside the platform.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/09/04-PROPERTIES.png",
    href: "/tutorial/properties",
    badge: "Properties",
    category: "analysis",
    alt: "Properties tutorial",
  },
  {
    title: "Skip Trace",
    description:
      "Learn how to use Skip Trace to support property research and find owner contacts during acquisition.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/09/05-SKIP-TRACE.png",
    href: "/tutorial/skip-trace",
    badge: "Data",
    category: "analysis",
    alt: "Skip Trace tutorial",
  },
  {
    title: "Marketing Campaigns",
    description:
      "See how automated campaigns help organize contacts, outreach, and a more consistent acquisition workflow.",
    imageUrl:
      "https://tutorial.checkmateproperty.com/wp-content/uploads/2023/12/MARKETING-CAMPAIGN.png",
    href: "/tutorial/marketing-campaigns",
    badge: "Marketing",
    category: "marketing",
    alt: "Marketing Campaigns tutorial",
  },
];

const filters: {
  label: string;
  value: TutorialCategory;
}[] = [
  { label: "All", value: "all" },
  { label: "Analysis", value: "analysis" },
  { label: "Funding", value: "funding" },
  { label: "Management", value: "management" },
  { label: "Marketing", value: "marketing" },
];

export function TutorialPageClient() {
  const [activeFilter, setActiveFilter] = useState<TutorialCategory>("all");

  const visibleCards = useMemo(() => {
    if (activeFilter === "all") {
      return tutorialCards;
    }

    return tutorialCards.filter((card) => card.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmp-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  function scrollToTutorials() {
    const tutorials = document.querySelector("#cmpTutorials");

    if (!tutorials) {
      return;
    }

    tutorials.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmp-tutorial-page" id="cmpTutorialPage">
      <section className="cmp-hero">
        <div className="cmp-wrap">
          <div className="cmp-hero-grid">
            <div className="cmp-hero-copy cmp-reveal">
              <div className="cmp-kicker">
                <span className="cmp-kicker-dot" />
                Checkmate Academy Tutorials
              </div>

              <h1>
                Learn how to use{" "}
                <span className="cmp-gradient-text">Checkmate Property</span>{" "}
                with confidence.
              </h1>

              <p>
                Step-by-step tutorials that help you master platform tools,
                analyze deals with more confidence, organize projects, find
                properties, and execute with more clarity inside Checkmate.
              </p>

              <div className="cmp-hero-actions">
                <button
                  type="button"
                  onClick={scrollToTutorials}
                  className="cmp-btn cmp-btn-primary"
                >
                  View Tutorials
                  <span>→</span>
                </button>

                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmp-btn cmp-btn-ghost"
                >
                  Access Platform
                  <span>↗</span>
                </a>
              </div>

              <div className="cmp-stats">
                <div className="cmp-stat">
                  <strong>06</strong>
                  <span>Core tutorial modules</span>
                </div>

                <div className="cmp-stat">
                  <strong>100%</strong>
                  <span>Focused on practical application</span>
                </div>

                <div className="cmp-stat">
                  <strong>24/7</strong>
                  <span>Available for members</span>
                </div>
              </div>
            </div>

            <div className="cmp-hero-panel cmp-reveal">
              <div className="cmp-device">
                <div className="cmp-device-top">
                  <span>Academy Preview</span>

                  <div className="cmp-device-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="cmp-video-preview">
                  <div className="cmp-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="cmp-device-list">
                  <div className="cmp-device-item">
                    <div className="cmp-device-icon">✓</div>
                    <div>
                      <strong>Deal analysis tutorials</strong>
                      <span>Learn how to use the calculator and reports.</span>
                    </div>
                  </div>

                  <div className="cmp-device-item">
                    <div className="cmp-device-icon">↗</div>
                    <div>
                      <strong>Execution-focused learning</strong>
                      <span>
                        Built for real estate investors and operators.
                      </span>
                    </div>
                  </div>

                  <div className="cmp-device-item">
                    <div className="cmp-device-icon">▶</div>
                    <div>
                      <strong>Short, direct, practical lessons</strong>
                      <span>Watch, apply, and move to the next step.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section" id="cmpTutorials">
        <div className="cmp-wrap">
          <div className="cmp-section-head cmp-reveal">
            <div>
              <div className="cmp-kicker">
                <span className="cmp-kicker-dot" />
                Tutorial Library
              </div>

              <h2>
                Choose a tutorial and start using the platform with more clarity.
              </h2>
            </div>

            <p>
              Each module is organized to guide you through the main Checkmate
              Property tools in a simple, visual, and practical way.
            </p>
          </div>

          <div className="cmp-filter-bar cmp-reveal" aria-label="Tutorial filters">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? "cmp-filter-btn is-active"
                    : "cmp-filter-btn"
                }
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="cmp-tutorial-grid">
            {visibleCards.map((card) => (
              <article
                key={card.href}
                className="cmp-card cmp-reveal"
                data-category={card.category}
              >
                <a className="cmp-card-media" href={card.href}>
                  <img src={card.imageUrl} alt={card.alt} />
                  <span className="cmp-card-badge">{card.badge}</span>
                  <span className="cmp-card-play">▶</span>
                </a>

                <div className="cmp-card-body">
                  <h3>{card.title}</h3>

                  <p>{card.description}</p>

                  <a className="cmp-card-link" href={card.href}>
                    Open Tutorial <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-wrap">
          <div className="cmp-process">
            <div className="cmp-process-card cmp-reveal">
              <div className="cmp-kicker">
                <span className="cmp-kicker-dot" />
                How to Use It
              </div>

              <h2>A simple path to better execution.</h2>

              <p>
                The tutorial page works like a guided academy: choose a module,
                watch the lesson, apply it inside the platform, and move to the
                next step.
              </p>
            </div>

            <div className="cmp-steps">
              <div className="cmp-step cmp-reveal">
                <div className="cmp-step-number">01</div>
                <div>
                  <h3>Choose the tutorial</h3>
                  <p>
                    Select the platform area you want to learn: calculator,
                    projects, properties, funding, or campaigns.
                  </p>
                </div>
              </div>

              <div className="cmp-step cmp-reveal">
                <div className="cmp-step-number">02</div>
                <div>
                  <h3>Watch the practical walkthrough</h3>
                  <p>
                    Follow a clear explanation designed to help users understand
                    each feature without friction.
                  </p>
                </div>
              </div>

              <div className="cmp-step cmp-reveal">
                <div className="cmp-step-number">03</div>
                <div>
                  <h3>Apply it inside Checkmate Property</h3>
                  <p>
                    Use what you learned inside the app to analyze deals,
                    organize projects, and move real estate opportunities forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-cta">
        <div className="cmp-wrap">
          <div className="cmp-cta-box cmp-reveal">
            <div className="cmp-cta-content">
              <div className="cmp-kicker">
                <span className="cmp-kicker-dot" />
                Ready to Execute?
              </div>

              <h2>Access the platform and turn tutorials into action.</h2>

              <p>
                Use the Academy to understand the tools, then enter Checkmate
                Property to apply the process to real opportunities.
              </p>

              <div className="cmp-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmp-btn cmp-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <button
                  type="button"
                  onClick={scrollToTutorials}
                  className="cmp-btn cmp-btn-ghost"
                >
                  Back to Tutorials
                  <span>↑</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
