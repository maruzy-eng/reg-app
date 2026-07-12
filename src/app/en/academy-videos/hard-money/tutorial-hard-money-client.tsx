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
    id: "hard-money-1",
    videoId: "fLpO-lZQ8zY",
    title: "Maximize your investments with hard money",
    displayTitle: "Maximize Your Investments with Hard Money",
    duration: "Lesson 01 • 1:23",
    description:
      "Learn how hard money can be used as a strategic tool to support real estate projects, accelerate decisions, and structure an operation more effectively.",
    thumbnail: "https://img.youtube.com/vi/fLpO-lZQ8zY/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "What hard money is",
    description:
      "Understand the concept and why investors use this type of capital in real estate transactions.",
  },
  {
    number: "02",
    title: "When it can make sense",
    description:
      "See which types of opportunities hard money can help move forward faster.",
  },
  {
    number: "03",
    title: "Impact on the deal",
    description:
      "Learn how to consider cost, speed, risk, and return inside your project analysis.",
  },
  {
    number: "04",
    title: "Strategic view",
    description:
      "Build a more professional view of financing, investing, and execution.",
  },
];

export function TutorialHardMoneyClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmh-reveal");

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
    const player = document.querySelector("#cmhPlayerHardMoney");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmh-tutorial-page" id="cmhTutorialHardMoney">
      <section className="cmh-hero">
        <div className="cmh-wrap">
          <div className="cmh-hero-grid">
            <div className="cmh-hero-copy cmh-reveal">
              <div className="cmh-kicker">
                <span className="cmh-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Understand how to use{" "}
                <span className="cmh-gradient-text">Hard Money</span> in your
                projects.
              </h1>

              <p>
                A direct tutorial to help you understand how hard money can
                support real estate transactions, structure investment capital,
                and accelerate decisions in fix-and-flip and new construction
                projects.
              </p>

              <div className="cmh-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmh-btn cmh-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/en/academy-videos" className="cmh-btn cmh-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmh-stats">
                <div className="cmh-stat">
                  <strong>01</strong>
                  <span>Practical and direct lesson</span>
                </div>

                <div className="cmh-stat">
                  <strong>1:23</strong>
                  <span>Quick content you can apply</span>
                </div>

                <div className="cmh-stat">
                  <strong>100%</strong>
                  <span>Focused on funding and investing</span>
                </div>
              </div>
            </div>

            <div className="cmh-hero-card cmh-reveal">
              <div className="cmh-mini-dashboard">
                <div className="cmh-dashboard-top">
                  <span>Hard Money Preview</span>

                  <div className="cmh-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmh-preview"
                  aria-label="Watch Hard Money tutorial"
                >
                  <div className="cmh-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmh-dashboard-list">
                  <div className="cmh-dashboard-item">
                    <div className="cmh-dashboard-icon">01</div>
                    <div>
                      <strong>Project capital</strong>
                      <span>
                        Understand how hard money fits into the structure of a
                        transaction.
                      </span>
                    </div>
                  </div>

                  <div className="cmh-dashboard-item">
                    <div className="cmh-dashboard-icon">02</div>
                    <div>
                      <strong>Faster execution</strong>
                      <span>
                        See why this type of capital can help accelerate
                        opportunities.
                      </span>
                    </div>
                  </div>

                  <div className="cmh-dashboard-item">
                    <div className="cmh-dashboard-icon">03</div>
                    <div>
                      <strong>Investor perspective</strong>
                      <span>
                        Learn how to think about financing inside deal analysis.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmh-section" id="cmhPlayerHardMoney">
        <div className="cmh-wrap">
          <div className="cmh-section-head cmh-reveal">
            <div>
              <div className="cmh-kicker">
                <span className="cmh-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lesson and understand the role of hard money.</h2>
            </div>

            <p>
              Click the playlist lesson to watch the main video without leaving
              this page.
            </p>
          </div>

          <div className="cmh-player-grid cmh-reveal">
            <div className="cmh-video-shell">
              <div className="cmh-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmh-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmh-playlist" aria-label="Lesson playlist">
              <div className="cmh-playlist-title">
                <strong>Playlist</strong>
                <span>1 video</span>
              </div>

              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLesson(lesson)}
                  className={
                    activeLesson.id === lesson.id
                      ? "cmh-lesson is-active"
                      : "cmh-lesson"
                  }
                >
                  <span className="cmh-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmh-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmh-section">
        <div className="cmh-wrap">
          <div className="cmh-section-head cmh-reveal">
            <div>
              <div className="cmh-kicker">
                <span className="cmh-kicker-dot" />
                What You Will Learn
              </div>

              <h2>Hard money explained in a clear, practical way.</h2>
            </div>

            <p>
              Understand how this type of capital can fit into U.S. real estate
              project analysis.
            </p>
          </div>

          <div className="cmh-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmh-card cmh-reveal">
                <div className="cmh-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmh-cta">
        <div className="cmh-wrap">
          <div className="cmh-cta-box cmh-reveal">
            <div className="cmh-cta-content">
              <div className="cmh-kicker">
                <span className="cmh-kicker-dot" />
                Next Step
              </div>

              <h2>Now move into the next Academy tutorials.</h2>

              <p>
                After understanding the role of hard money, keep building your
                command of the U.S. real estate market inside Checkmate
                Property.
              </p>

              <div className="cmh-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmh-btn cmh-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/en/academy-videos" className="cmh-btn cmh-btn-ghost">
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
