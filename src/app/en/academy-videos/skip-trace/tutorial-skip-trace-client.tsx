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
    id: "skip-trace-1",
    videoId: "faf0lqFoQwc",
    title: "Skip Trace with property details",
    displayTitle: "STEP 1 - Skiptrace with Property Details",
    duration: "Lesson 01 • 0:50",
    description:
      "Learn how to access Skip Trace from the property details page and use this feature to move forward with prospecting opportunities.",
    thumbnail: "https://img.youtube.com/vi/faf0lqFoQwc/maxresdefault.jpg",
  },
  {
    id: "skip-trace-2",
    videoId: "G5tPh6_Sk5k",
    title: "Skip Trace from your dashboard",
    displayTitle: "STEP 2 - Skiptrace from Your Dashboard",
    duration: "Lesson 02 • 0:46",
    description:
      "See how to use Skip Trace directly from your platform dashboard, making the process faster and more organized.",
    thumbnail: "https://img.youtube.com/vi/G5tPh6_Sk5k/maxresdefault.jpg",
  },
  {
    id: "skip-trace-3",
    videoId: "dND5iyDjVOs",
    title: "Managing Skip Trace access and wallet",
    displayTitle: "STEP 3 - Managing Skiptrace Access and Wallet",
    duration: "Lesson 03 • 1:52",
    description:
      "Understand how to manage Skip Trace access, track available resources, and control wallet usage inside the platform.",
    thumbnail: "https://img.youtube.com/vi/dND5iyDjVOs/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Use it from property details",
    description:
      "Learn how to trigger Skip Trace directly inside the property details page.",
  },
  {
    number: "02",
    title: "Use it from the dashboard",
    description:
      "See how to access the feature from the main dashboard and speed up your prospecting workflow.",
  },
  {
    number: "03",
    title: "Manage access",
    description:
      "Understand how permissions and feature availability work inside the platform.",
  },
  {
    number: "04",
    title: "Control wallet usage",
    description:
      "Track balance, usage, and available resources to operate with more organization.",
  },
];

export function TutorialSkipTraceClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmst-reveal");

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
    const player = document.querySelector("#cmstPlayerSkipTrace");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmst-tutorial-page" id="cmstTutorialSkipTrace">
      <section className="cmst-hero">
        <div className="cmst-wrap">
          <div className="cmst-hero-grid">
            <div className="cmst-hero-copy cmst-reveal">
              <div className="cmst-kicker">
                <span className="cmst-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Learn how to use{" "}
                <span className="cmst-gradient-text">Skip Trace</span> inside
                Checkmate.
              </h1>

              <p>
                A practical tutorial to help you find owner contact information,
                access Skip Trace from property details or from the dashboard,
                and understand how to manage wallet balance and access inside
                Checkmate Property.
              </p>

              <div className="cmst-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmst-btn cmst-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/en/academy-videos" className="cmst-btn cmst-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmst-stats">
                <div className="cmst-stat">
                  <strong>03</strong>
                  <span>Practical lessons in sequence</span>
                </div>

                <div className="cmst-stat">
                  <strong>3m28s</strong>
                  <span>Quick and direct content</span>
                </div>

                <div className="cmst-stat">
                  <strong>100%</strong>
                  <span>Focused on contacts and prospecting</span>
                </div>
              </div>
            </div>

            <div className="cmst-hero-card cmst-reveal">
              <div className="cmst-mini-dashboard">
                <div className="cmst-dashboard-top">
                  <span>Skip Trace Preview</span>

                  <div className="cmst-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmst-preview"
                  aria-label="Watch Skip Trace tutorial"
                >
                  <div className="cmst-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmst-dashboard-list">
                  <div className="cmst-dashboard-item">
                    <div className="cmst-dashboard-icon">01</div>
                    <div>
                      <strong>Owner contact information</strong>
                      <span>
                        Use Skip Trace to search for contact data connected to a
                        property.
                      </span>
                    </div>
                  </div>

                  <div className="cmst-dashboard-item">
                    <div className="cmst-dashboard-icon">02</div>
                    <div>
                      <strong>Dashboard access</strong>
                      <span>
                        Understand how to trigger the tool directly inside the
                        platform.
                      </span>
                    </div>
                  </div>

                  <div className="cmst-dashboard-item">
                    <div className="cmst-dashboard-icon">03</div>
                    <div>
                      <strong>Wallet and permissions</strong>
                      <span>
                        See how to manage access, balance, and Skip Trace usage.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmst-section" id="cmstPlayerSkipTrace">
        <div className="cmst-wrap">
          <div className="cmst-section-head cmst-reveal">
            <div>
              <div className="cmst-kicker">
                <span className="cmst-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lessons and learn how to use Skip Trace.</h2>
            </div>

            <p>
              Click any lesson in the playlist to switch the main video without
              leaving this page.
            </p>
          </div>

          <div className="cmst-player-grid cmst-reveal">
            <div className="cmst-video-shell">
              <div className="cmst-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmst-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmst-playlist" aria-label="Lesson playlist">
              <div className="cmst-playlist-title">
                <strong>Playlist</strong>
                <span>3 videos</span>
              </div>

              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLesson(lesson)}
                  className={
                    activeLesson.id === lesson.id
                      ? "cmst-lesson is-active"
                      : "cmst-lesson"
                  }
                >
                  <span className="cmst-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmst-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmst-section">
        <div className="cmst-wrap">
          <div className="cmst-section-head cmst-reveal">
            <div>
              <div className="cmst-kicker">
                <span className="cmst-kicker-dot" />
                What You Will Learn
              </div>

              <h2>From contact search to wallet control.</h2>
            </div>

            <p>
              Skip Trace helps you turn a property into a real contact
              opportunity.
            </p>
          </div>

          <div className="cmst-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmst-card cmst-reveal">
                <div className="cmst-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmst-cta">
        <div className="cmst-wrap">
          <div className="cmst-cta-box cmst-reveal">
            <div className="cmst-cta-content">
              <div className="cmst-kicker">
                <span className="cmst-kicker-dot" />
                Next Step
              </div>

              <h2>Now access the platform and practice Skip Trace.</h2>

              <p>
                After watching the tutorial, enter Checkmate Property and
                practice contact search inside the Properties area and dashboard.
              </p>

              <div className="cmst-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmst-btn cmst-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/en/academy-videos" className="cmst-btn cmst-btn-ghost">
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