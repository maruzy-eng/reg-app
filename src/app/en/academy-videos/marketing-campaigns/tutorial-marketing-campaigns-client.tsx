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
    id: "marketing-campaigns-1",
    videoId: "zPZeFlsCDs4",
    title: "Getting started with Marketing Campaigns",
    displayTitle: "STEP 1 - Marketing Campaigns",
    duration: "Lesson 01 • 0:45",
    description:
      "Start by understanding the Marketing Campaigns area and how it can help you organize automated campaigns inside Checkmate Property.",
    thumbnail: "https://img.youtube.com/vi/zPZeFlsCDs4/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-2",
    videoId: "thLZ0tiQ5dk",
    title: "Setting up your marketing campaign",
    displayTitle: "STEP 2 - Marketing Campaigns",
    duration: "Lesson 02 • 2:21",
    description:
      "Learn how to move forward with campaign setup by organizing the key information needed to run automation with more clarity.",
    thumbnail: "https://img.youtube.com/vi/thLZ0tiQ5dk/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-3",
    videoId: "ltu93MJjzAs",
    title: "Structuring your automated campaign",
    displayTitle: "STEP 3 - Marketing Campaigns",
    duration: "Lesson 03 • 2:16",
    description:
      "See how to structure an automated campaign so your marketing operation becomes more organized and efficient.",
    thumbnail: "https://img.youtube.com/vi/ltu93MJjzAs/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-4",
    videoId: "sK_Vi_vGTe8",
    title: "Adjusting campaign steps",
    displayTitle: "STEP 4 - Marketing Campaigns",
    duration: "Lesson 04 • 1:28",
    description:
      "Understand how to adjust important campaign steps to keep the flow aligned with your strategy.",
    thumbnail: "https://img.youtube.com/vi/sK_Vi_vGTe8/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-5",
    videoId: "O9cYe6KuC-c",
    title: "Preparing your campaign for execution",
    displayTitle: "STEP 5 - Marketing Campaigns",
    duration: "Lesson 05 • 1:29",
    description:
      "Learn how to prepare your campaign for execution by reviewing the essential points before moving forward.",
    thumbnail: "https://img.youtube.com/vi/O9cYe6KuC-c/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-6",
    videoId: "WnP_rE4Gcic",
    title: "Organizing campaign automation",
    displayTitle: "STEP 6 - Marketing Campaigns",
    duration: "Lesson 06 • 1:05",
    description:
      "See how to keep automation organized so the campaign runs more smoothly inside the platform.",
    thumbnail: "https://img.youtube.com/vi/WnP_rE4Gcic/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-7",
    videoId: "31EX-3VCPus",
    title: "Reviewing and finishing the campaign",
    displayTitle: "STEP 7 - Marketing Campaigns",
    duration: "Lesson 07 • 1:09",
    description:
      "Understand how to review the campaign and check the final details before putting it into action.",
    thumbnail: "https://img.youtube.com/vi/31EX-3VCPus/maxresdefault.jpg",
  },
  {
    id: "marketing-campaigns-8",
    videoId: "adSRGaRdMhw",
    title: "Final adjustments in Marketing Campaigns",
    displayTitle: "STEP 8 - Marketing Campaigns",
    duration: "Lesson 08 • 0:54",
    description:
      "Finish the process by understanding the final campaign adjustments and how to move into execution inside the platform.",
    thumbnail: "https://img.youtube.com/vi/adSRGaRdMhw/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Set up campaigns",
    description:
      "Learn how to start a campaign and organize the main information the right way from the beginning.",
  },
  {
    number: "02",
    title: "Automate steps",
    description:
      "Understand how the platform helps you structure flows and repetitive actions with more efficiency.",
  },
  {
    number: "03",
    title: "Organize prospecting",
    description:
      "Use campaigns to better work contacts, leads, and opportunities inside your operation.",
  },
  {
    number: "04",
    title: "Execute at scale",
    description:
      "Gain clarity to run campaigns in a more structured, professional, and scalable way.",
  },
];

export function TutorialMarketingCampaignsClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems =
      document.querySelectorAll<HTMLElement>(".cmmc-reveal");

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
    const player = document.querySelector("#cmmcPlayerMarketingCampaigns");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmmc-tutorial-page" id="cmmcTutorialMarketingCampaigns">
      <section className="cmmc-hero">
        <div className="cmmc-wrap">
          <div className="cmmc-hero-grid">
            <div className="cmmc-hero-copy cmmc-reveal">
              <div className="cmmc-kicker">
                <span className="cmmc-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Learn how to create automated{" "}
                <span className="cmmc-gradient-text">Marketing Campaigns</span>.
              </h1>

              <p>
                A practical step-by-step tutorial to help you configure marketing
                campaigns inside Checkmate Property, organize lists, structure
                automated actions, and accelerate opportunity generation in the
                U.S. real estate market.
              </p>

              <div className="cmmc-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmmc-btn cmmc-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/en/academy-videos" className="cmmc-btn cmmc-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmmc-stats">
                <div className="cmmc-stat">
                  <strong>08</strong>
                  <span>Practical lessons in sequence</span>
                </div>

                <div className="cmmc-stat">
                  <strong>12m27s</strong>
                  <span>Objective and applied content</span>
                </div>

                <div className="cmmc-stat">
                  <strong>100%</strong>
                  <span>Focused on automated campaigns</span>
                </div>
              </div>
            </div>

            <div className="cmmc-hero-card cmmc-reveal">
              <div className="cmmc-mini-dashboard">
                <div className="cmmc-dashboard-top">
                  <span>Marketing Campaign Preview</span>

                  <div className="cmmc-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmmc-preview"
                  aria-label="Watch Marketing Campaigns tutorial"
                >
                  <div className="cmmc-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmmc-dashboard-list">
                  <div className="cmmc-dashboard-item">
                    <div className="cmmc-dashboard-icon">01</div>
                    <div>
                      <strong>Automated campaigns</strong>
                      <span>
                        Configure campaigns to support your lead generation and
                        opportunity pipeline.
                      </span>
                    </div>
                  </div>

                  <div className="cmmc-dashboard-item">
                    <div className="cmmc-dashboard-icon">02</div>
                    <div>
                      <strong>Contact organization</strong>
                      <span>
                        Use lists, criteria, and flows to work your prospects
                        with more structure.
                      </span>
                    </div>
                  </div>

                  <div className="cmmc-dashboard-item">
                    <div className="cmmc-dashboard-icon">03</div>
                    <div>
                      <strong>Execution at scale</strong>
                      <span>
                        Understand how automation can make your operation more
                        efficient.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmmc-section" id="cmmcPlayerMarketingCampaigns">
        <div className="cmmc-wrap">
          <div className="cmmc-section-head cmmc-reveal">
            <div>
              <div className="cmmc-kicker">
                <span className="cmmc-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lessons and learn how to configure campaigns.</h2>
            </div>

            <p>
              Click any lesson in the playlist to switch the main video without
              leaving this page.
            </p>
          </div>

          <div className="cmmc-player-grid cmmc-reveal">
            <div className="cmmc-video-shell">
              <div className="cmmc-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmmc-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmmc-playlist" aria-label="Lesson playlist">
              <div className="cmmc-playlist-title">
                <strong>Playlist</strong>
                <span>8 videos</span>
              </div>

              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLesson(lesson)}
                  className={
                    activeLesson.id === lesson.id
                      ? "cmmc-lesson is-active"
                      : "cmmc-lesson"
                  }
                >
                  <span className="cmmc-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmmc-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmmc-section">
        <div className="cmmc-wrap">
          <div className="cmmc-section-head cmmc-reveal">
            <div>
              <div className="cmmc-kicker">
                <span className="cmmc-kicker-dot" />
                What You Will Learn
              </div>

              <h2>From initial setup to campaign execution.</h2>
            </div>

            <p>
              The Marketing Campaigns area helps you organize automated actions
              for prospecting, relationship building, and opportunity generation.
            </p>
          </div>

          <div className="cmmc-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmmc-card cmmc-reveal">
                <div className="cmmc-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmmc-cta">
        <div className="cmmc-wrap">
          <div className="cmmc-cta-box cmmc-reveal">
            <div className="cmmc-cta-content">
              <div className="cmmc-kicker">
                <span className="cmmc-kicker-dot" />
                Next Step
              </div>

              <h2>Now access the platform and configure your campaign.</h2>

              <p>
                After watching the tutorial, enter Checkmate Property and
                practice creating an automated campaign to support your
                opportunity generation in the real estate market.
              </p>

              <div className="cmmc-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmmc-btn cmmc-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/en/academy-videos" className="cmmc-btn cmmc-btn-ghost">
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