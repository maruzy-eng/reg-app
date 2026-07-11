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
    id: "projects-1",
    videoId: "UPKtwdsySOc",
    title: "Master Project Management with Checkmate",
    displayTitle: "Master Project Management with Checkmate",
    duration: "Lesson 01 • 1:12",
    description:
      "Learn how to use the Projects section to organize information, track each stage, and manage your real estate projects more effectively inside the platform.",
    thumbnail: "https://img.youtube.com/vi/UPKtwdsySOc/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Organize project information",
    description:
      "Centralize essential project details to make research, tracking, and decision-making easier.",
  },
  {
    number: "02",
    title: "Track project stages",
    description:
      "Follow project progress with more clarity and maintain a better overview of the operation.",
  },
  {
    number: "03",
    title: "Improve control",
    description:
      "Use the platform to reduce disorganization and bring a more professional structure to your workflow.",
  },
  {
    number: "04",
    title: "Gain efficiency",
    description:
      "Keep your projects clearer, your data accessible, and your decisions faster throughout execution.",
  },
];

export function TutorialProjectsClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmpj-reveal");

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
    const player = document.querySelector("#cmpjPlayerProjects");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmpj-tutorial-page" id="cmpjTutorialProjects">
      <section className="cmpj-hero">
        <div className="cmpj-wrap">
          <div className="cmpj-hero-grid">
            <div className="cmpj-hero-copy cmpj-reveal">
              <div className="cmpj-kicker">
                <span className="cmpj-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Master{" "}
                <span className="cmpj-gradient-text">Projects</span>{" "}
                management inside Checkmate.
              </h1>

              <p>
                Learn how to organize, track, and manage projects inside
                Checkmate Property. This quick and practical tutorial shows you
                how to use the Projects section with more clarity, control, and
                professional structure.
              </p>

              <div className="cmpj-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmpj-btn cmpj-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/tutorial" className="cmpj-btn cmpj-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmpj-stats">
                <div className="cmpj-stat">
                  <strong>01</strong>
                  <span>Practical and direct lesson</span>
                </div>

                <div className="cmpj-stat">
                  <strong>1:12</strong>
                  <span>Quick content you can apply</span>
                </div>

                <div className="cmpj-stat">
                  <strong>100%</strong>
                  <span>Focused on project organization</span>
                </div>
              </div>
            </div>

            <div className="cmpj-hero-card cmpj-reveal">
              <div className="cmpj-mini-dashboard">
                <div className="cmpj-dashboard-top">
                  <span>Projects Preview</span>

                  <div className="cmpj-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmpj-preview"
                  aria-label="Watch Projects tutorial"
                >
                  <div className="cmpj-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmpj-dashboard-list">
                  <div className="cmpj-dashboard-item">
                    <div className="cmpj-dashboard-icon">01</div>
                    <div>
                      <strong>Project organization</strong>
                      <span>
                        Centralize important information in a structured area.
                      </span>
                    </div>
                  </div>

                  <div className="cmpj-dashboard-item">
                    <div className="cmpj-dashboard-icon">02</div>
                    <div>
                      <strong>Visual tracking</strong>
                      <span>
                        Follow project progress with more clarity and control.
                      </span>
                    </div>
                  </div>

                  <div className="cmpj-dashboard-item">
                    <div className="cmpj-dashboard-icon">03</div>
                    <div>
                      <strong>More efficient management</strong>
                      <span>
                        Use the platform to keep your operation more
                        professional.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmpj-section" id="cmpjPlayerProjects">
        <div className="cmpj-wrap">
          <div className="cmpj-section-head cmpj-reveal">
            <div>
              <div className="cmpj-kicker">
                <span className="cmpj-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lesson and learn how to manage projects.</h2>
            </div>

            <p>
              Click the playlist lesson to watch the main video without leaving
              this page.
            </p>
          </div>

          <div className="cmpj-player-grid cmpj-reveal">
            <div className="cmpj-video-shell">
              <div className="cmpj-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmpj-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmpj-playlist" aria-label="Lesson playlist">
              <div className="cmpj-playlist-title">
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
                      ? "cmpj-lesson is-active"
                      : "cmpj-lesson"
                  }
                >
                  <span className="cmpj-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmpj-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmpj-section">
        <div className="cmpj-wrap">
          <div className="cmpj-section-head cmpj-reveal">
            <div>
              <div className="cmpj-kicker">
                <span className="cmpj-kicker-dot" />
                What You Will Learn
              </div>

              <h2>Clearer, more visual, and more organized project management.</h2>
            </div>

            <p>
              Understand how the Projects section can help you track your real
              estate operation with more clarity.
            </p>
          </div>

          <div className="cmpj-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmpj-card cmpj-reveal">
                <div className="cmpj-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmpj-cta">
        <div className="cmpj-wrap">
          <div className="cmpj-cta-box cmpj-reveal">
            <div className="cmpj-cta-content">
              <div className="cmpj-kicker">
                <span className="cmpj-kicker-dot" />
                Next Step
              </div>

              <h2>Now access the platform and organize your projects.</h2>

              <p>
                After watching the tutorial, enter Checkmate Property and
                practice using the Projects section to track your operation with
                more structure and clarity.
              </p>

              <div className="cmpj-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmpj-btn cmpj-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/tutorial" className="cmpj-btn cmpj-btn-ghost">
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
