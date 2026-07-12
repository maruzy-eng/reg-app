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
    id: "properties-1",
    videoId: "pRHJA9S-TDI",
    title: "Filtering properties with precision",
    displayTitle: "STEP 1 - Filtering Properties with Precision",
    duration: "Lesson 01 • 1:30",
    description:
      "Learn how to use strategic filters to find properties more precisely inside Checkmate Property.",
    thumbnail: "https://img.youtube.com/vi/pRHJA9S-TDI/maxresdefault.jpg",
  },
  {
    id: "properties-2",
    videoId: "QRFtpN7rw1o",
    title: "Spotting properties on the map",
    displayTitle: "STEP 2 - Spotting Properties on the Map",
    duration: "Lesson 02 • 1:10",
    description:
      "See how to view properties on the map and identify opportunities by region with more clarity.",
    thumbnail: "https://img.youtube.com/vi/QRFtpN7rw1o/maxresdefault.jpg",
  },
  {
    id: "properties-3",
    videoId: "wVG5nSd-vfA",
    title: "Diving into property details",
    displayTitle: "STEP 3 - Dive into Property Details",
    duration: "Lesson 03 • 2:56",
    description:
      "Learn how to access and interpret each property’s details to evaluate opportunities more effectively.",
    thumbnail: "https://img.youtube.com/vi/wVG5nSd-vfA/maxresdefault.jpg",
  },
  {
    id: "properties-4",
    videoId: "st_dgp1mJIY",
    title: "Exploring foreclosure opportunities",
    displayTitle: "STEP 4 - Exploring Foreclosure Opportunities",
    duration: "Lesson 04 • 2:16",
    description:
      "Understand how to explore foreclosure opportunities and identify properties that may generate strong deals.",
    thumbnail: "https://img.youtube.com/vi/st_dgp1mJIY/maxresdefault.jpg",
  },
  {
    id: "properties-5",
    videoId: "7YZ9cv4yAEw",
    title: "Uncovering off-market opportunities",
    displayTitle: "STEP 5 - Uncover Off-Market Treasures",
    duration: "Lesson 05 • 1:48",
    description:
      "Learn how to find off-market opportunities and expand your view beyond properties listed in the traditional market.",
    thumbnail: "https://img.youtube.com/vi/7YZ9cv4yAEw/maxresdefault.jpg",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Filter properties",
    description:
      "Use filters to find properties aligned with your investment strategy.",
  },
  {
    number: "02",
    title: "Navigate the map",
    description:
      "View opportunities by location and better understand regions, neighborhoods, and markets.",
  },
  {
    number: "03",
    title: "Analyze details",
    description:
      "Access key property information to evaluate each opportunity with more confidence.",
  },
  {
    number: "04",
    title: "Find off-market deals",
    description:
      "Explore foreclosures and off-market opportunities to expand your acquisition pipeline.",
  },
];

export function TutorialPropertiesClient() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".cmpp-reveal");

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
    const player = document.querySelector("#cmppPlayerProperties");

    if (!player) {
      return;
    }

    player.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="cmpp-tutorial-page" id="cmppTutorialProperties">
      <section className="cmpp-hero">
        <div className="cmpp-wrap">
          <div className="cmpp-hero-grid">
            <div className="cmpp-hero-copy cmpp-reveal">
              <div className="cmpp-kicker">
                <span className="cmpp-kicker-dot" />
                Checkmate Academy Tutorial
              </div>

              <h1>
                Learn how to find{" "}
                <span className="cmpp-gradient-text">Properties</span> with
                more precision.
              </h1>

              <p>
                A practical step-by-step tutorial to help you use the Properties
                section inside Checkmate Property, filter opportunities, navigate
                the map, analyze property details, explore foreclosures, and
                uncover off-market opportunities.
              </p>

              <div className="cmpp-hero-actions">
                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmpp-btn cmpp-btn-primary"
                >
                  Watch Tutorial
                  <span>→</span>
                </button>

                <a href="/en/academy-videos" className="cmpp-btn cmpp-btn-ghost">
                  Back to Academy
                  <span>↗</span>
                </a>
              </div>

              <div className="cmpp-stats">
                <div className="cmpp-stat">
                  <strong>05</strong>
                  <span>Practical lessons in sequence</span>
                </div>

                <div className="cmpp-stat">
                  <strong>9m40s</strong>
                  <span>Quick and direct content</span>
                </div>

                <div className="cmpp-stat">
                  <strong>100%</strong>
                  <span>Focused on finding opportunities</span>
                </div>
              </div>
            </div>

            <div className="cmpp-hero-card cmpp-reveal">
              <div className="cmpp-mini-dashboard">
                <div className="cmpp-dashboard-top">
                  <span>Properties Preview</span>

                  <div className="cmpp-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToPlayer}
                  className="cmpp-preview"
                  aria-label="Watch Properties tutorial"
                >
                  <div className="cmpp-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                <div className="cmpp-dashboard-list">
                  <div className="cmpp-dashboard-item">
                    <div className="cmpp-dashboard-icon">01</div>
                    <div>
                      <strong>Smart filters</strong>
                      <span>
                        Find properties with more precision using strategic
                        search criteria.
                      </span>
                    </div>
                  </div>

                  <div className="cmpp-dashboard-item">
                    <div className="cmpp-dashboard-icon">02</div>
                    <div>
                      <strong>Opportunity map</strong>
                      <span>
                        Visualize properties and regions with more clarity
                        inside the platform.
                      </span>
                    </div>
                  </div>

                  <div className="cmpp-dashboard-item">
                    <div className="cmpp-dashboard-icon">03</div>
                    <div>
                      <strong>On-market and off-market</strong>
                      <span>
                        Explore listed properties, foreclosures, and off-market
                        opportunities.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmpp-section" id="cmppPlayerProperties">
        <div className="cmpp-wrap">
          <div className="cmpp-section-head cmpp-reveal">
            <div>
              <div className="cmpp-kicker">
                <span className="cmpp-kicker-dot" />
                Tutorial Playlist
              </div>

              <h2>Watch the lessons and learn how to search properties.</h2>
            </div>

            <p>
              Click any lesson in the playlist to switch the main video without
              leaving this page.
            </p>
          </div>

          <div className="cmpp-player-grid cmpp-reveal">
            <div className="cmpp-video-shell">
              <div className="cmpp-video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0`}
                  title={activeLesson.displayTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="cmpp-video-info">
                <small>{activeLesson.duration}</small>

                <h3>{activeLesson.title}</h3>

                <p>{activeLesson.description}</p>
              </div>
            </div>

            <aside className="cmpp-playlist" aria-label="Lesson playlist">
              <div className="cmpp-playlist-title">
                <strong>Playlist</strong>
                <span>5 videos</span>
              </div>

              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => setActiveLesson(lesson)}
                  className={
                    activeLesson.id === lesson.id
                      ? "cmpp-lesson is-active"
                      : "cmpp-lesson"
                  }
                >
                  <span className="cmpp-thumb">
                    <img src={lesson.thumbnail} alt={lesson.displayTitle} />
                  </span>

                  <span className="cmpp-lesson-content">
                    <strong>{lesson.displayTitle}</strong>
                    <span>{lesson.duration.replace(/^Lesson \d+ • /, "")}</span>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="cmpp-section">
        <div className="cmpp-wrap">
          <div className="cmpp-section-head cmpp-reveal">
            <div>
              <div className="cmpp-kicker">
                <span className="cmpp-kicker-dot" />
                What You Will Learn
              </div>

              <h2>
                From the first search to discovering off-market opportunities.
              </h2>
            </div>

            <p>
              The Properties section helps you find, visualize, and analyze real
              estate opportunities with more intelligence.
            </p>
          </div>

          <div className="cmpp-cards-grid">
            {learningCards.map((card) => (
              <div key={card.number} className="cmpp-card cmpp-reveal">
                <div className="cmpp-card-number">{card.number}</div>

                <h3>{card.title}</h3>

                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cmpp-cta">
        <div className="cmpp-wrap">
          <div className="cmpp-cta-box cmpp-reveal">
            <div className="cmpp-cta-content">
              <div className="cmpp-kicker">
                <span className="cmpp-kicker-dot" />
                Next Step
              </div>

              <h2>Now access the platform and start searching properties.</h2>

              <p>
                After watching the tutorial, enter Checkmate Property and
                practice using the Properties section to find opportunities,
                compare regions, and start your analysis with more clarity.
              </p>

              <div className="cmpp-cta-actions">
                <a
                  href="https://app.tutorial.checkmateproperty.com/#/login"
                  target="_blank"
                  rel="noreferrer"
                  className="cmpp-btn cmpp-btn-primary"
                >
                  Access Platform
                  <span>↗</span>
                </a>

                <a href="/en/academy-videos" className="cmpp-btn cmpp-btn-ghost">
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