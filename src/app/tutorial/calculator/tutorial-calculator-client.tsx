"use client";

import { useEffect, useState } from "react";

type Lesson = {
  id: string;
  videoId: string;
  title: string;
  displayTitle: string;
  duration: string;
  description: string;
  thumbnail: string;
};

const lessons: Lesson[] = [
  {
    id: "step-1",
    videoId: "eqGlh7WAS-U",
    title: "Property information and visuals",
    displayTitle: "STEP 1 - Property Info and Visuals",
    duration: "Lesson 01 • 1:20",
    description:
      "Learn how to enter the initial property details and organize visual information so you can start deal analysis the right way.",
    thumbnail: "https://img.youtube.com/vi/eqGlh7WAS-U/maxresdefault.jpg",
  },
  {
    id: "step-2",
    videoId: "c1RZ21Mb-qY",
    title: "Mastering rehab estimation",
    displayTitle: "STEP 2 - Mastering Rehab Estimation",
    duration: "Lesson 02 • 8:09",
    description:
      "See how to structure a rehab estimate, understand costs, organize your numbers, and make decisions with more confidence.",
    thumbnail: "https://img.youtube.com/vi/c1RZ21Mb-qY/maxresdefault.jpg",
  },
  {
    id: "step-3",
    videoId: "VoLzeKiEEkU",
    title: "Profit projections with deal analysis",
    displayTitle: "STEP 3 - Profit Projections with Deal Analysis",
    duration: "Lesson 03 • 10:28",
    description:
      "Understand how to review profit projections, ROI, margins, and feasibility before deciding whether a project makes sense.",
    thumbnail: "https://img.youtube.com/vi/VoLzeKiEEkU/maxresdefault.jpg",
  },
  {
    id: "step-4",
    videoId: "cR0a1NFSdDs",
    title: "Project management and data retrieval",
    displayTitle: "STEP 4 - Project Management and Data Retrieval",
    duration: "Lesson 04 • 1:05",
    description:
      "Learn how to organize project data, retrieve information, and keep your operation more structured inside the platform.",
    thumbnail: "https://img.youtube.com/vi/cR0a1NFSdDs/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Enter property data",
    description:
      "Organize the address, images, core details, and essential information needed to start the analysis.",
  },
  {
    number: "02",
    title: "Estimate rehab costs",
    description:
      "Structure expected costs so you can understand the true size of the investment required.",
  },
  {
    number: "03",
    title: "Project profit and ROI",
    description:
      "Review margins, estimated return, net profit, and feasibility before making a decision.",
  },
  {
    number: "04",
    title: "Save and review data",
    description:
      "Keep your analyses organized so you can track opportunities and projects with clarity.",
  },
];

export function TutorialCalculatorClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmc-reveal");

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

  function scrollToPlayer() {
    const player = document.querySelector("#cmcPlayer");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmc-tutorial-page" id="cmcTutorialCalculator">
      <section className="cmc-hero">
        <div className="cmc-wrap">
          <div className="cmc-hero-grid">
            <div className="cmc-hero-copy cmc-reveal">
              <div className="cmc-kicker">
                <span className="cmc-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Learn how to use the{" "}
                <span className="cmc-gradient-text">Calculator</span> inside
                Checkmate.
              </h1>

              <p>
                A direct step-by-step tutorial to help you analyze deals,
                estimate rehab costs, project profit, organize data, and turn
                the numbers into smarter decisions inside Checkmate Property.
              </p>

              <div className="cmc-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmc-btn cmc-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/tutorial" className="cmc-btn cmc-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmc-stats">
                <div className="cmc-stat">
                  <strong>04</strong>
                  <span>Practical lessons in sequence</span>
                </div>

                <div className="cmc-stat">
                  <strong>21m</strong>
                  <span>Direct, applied content</span>
                </div>

                <div className="cmc-stat">
                  <strong>100%</strong>
                  <span>Focused on deal analysis</span>
                </div>
              </div>
            </div>

            <div className="cmc-hero-card cmc-reveal">
              <div className="cmc-mini-dashboard">
                <div className="cmc-dashboard-top">
                  <span>Calculator Preview</span>

                  <div className="cmc-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmc-preview"
                  aria-label="Watch Calculator tutorial"
                >
                  <div className="cmc-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmc-dashboard-list">
                  <div className="cmc-dashboard-item">
                    <div className="cmc-dashboard-icon">01</div>
                    <div>
                      <strong>Property data</strong>
                      <span>
                        Start by entering the essential information for the deal.
                      </span>
                    </div>
                  </div>

                  <div className="cmc-dashboard-item">
                    <div className="cmc-dashboard-icon">02</div>
                    <div>
                      <strong>Rehab estimate</strong>
                      <span>Organize costs and projections with more clarity.</span>
                    </div>
                  </div>

                  <div className="cmc-dashboard-item">
                    <div className="cmc-dashboard-icon">03</div>
                    <div>
                      <strong>Profit projection</strong>
                      <span>Review margins, ROI, and project feasibility.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmc-section" id="cmcPlayer">
        <div className="cmc-wrap">
          <div className="cmc-section-head cmc-reveal">
            <div>
              <div className="cmc-kicker">
                <span className="cmc-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lessons and move through each step.</h2>
            </div>

            <p>
              Click any lesson in the playlist to switch the main video without
              leaving this page.
            </p>
          </div>

          <div className="cmc-player-grid cmc-reveal">
            <div className="cmc-video-shell">
              <div className="cmc-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmc-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmc-playlist" aria-label="Lesson playlist">
              <div className="cmc-playlist-title">
                <strong>Playlist</strong>
                <span>4 videos</span>
              </div>

              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLesson(lesson)}
                  className={
                    activeLesson.id === lesson.id
                      ? "cmc-lesson is-active"
                      : "cmc-lesson"
                  }
                >
                  <span className="cmc-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmc-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmc-section">
        <div className="cmc-wrap">
          <div className="cmc-section-head cmc-reveal">
            <div>
              <div className="cmc-kicker">
                <span className="cmc-kicker-dot" />
                What You Will Learn
              </div>

              <h2>From data entry to final project analysis.</h2>
            </div>

            <p>
              The calculator was built to simplify important decisions in
              fix-and-flip and new construction projects.
            </p>
          </div>

          <div className="cmc-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmc-card cmc-reveal">
                <div className="cmc-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmc-cta">
        <div className="cmc-wrap">
          <div className="cmc-cta-box cmc-reveal">
            <div className="cmc-cta-content">
              <div className="cmc-kicker">
                <span className="cmc-kicker-dot" />
                Next Step
              </div>

              <h2>Now access the platform and analyze a real deal.</h2>

              <p>
                After watching the tutorial, enter Checkmate Property, practice
                with a property, and turn the numbers into a smarter investment
                decision.
              </p>

              <div className="cmc-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmc-btn cmc-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/tutorial" className="cmc-btn cmc-btn-ghost">
                  See All Tutorials
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
