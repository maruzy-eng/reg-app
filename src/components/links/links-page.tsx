"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { LINKS_LOGO, linksCards, type LinksCard } from "@/lib/links/content";

function CardIcon({ icon }: { icon: LinksCard["icon"] }) {
  switch (icon) {
    case "layers":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7L12 3L20 7L12 11L4 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 12L12 16L20 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 17L12 21L20 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M2.5 12S6 5.5 12 5.5S21.5 12 21.5 12S18 18.5 12 18.5S2.5 12 2.5 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "site":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V5.5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M4 8H20" stroke="currentColor" strokeWidth="2" />
          <path
            d="M8 13H12M8 16H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.5 10.5L12 4L20.5 10.5V20H5.5V10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 20V14H14.5V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.5 10.8C7.95 13.65 10.35 16.02 13.2 17.5L15.4 15.3C15.67 15.03 16.07 14.94 16.42 15.06C17.54 15.43 18.74 15.63 20 15.63C20.55 15.63 21 16.08 21 16.63V20.1C21 20.65 20.55 21.1 20 21.1C10.61 21.1 2.9 13.39 2.9 4C2.9 3.45 3.35 3 3.9 3H7.38C7.93 3 8.38 3.45 8.38 4C8.38 5.26 8.58 6.46 8.95 7.58C9.06 7.93 8.98 8.32 8.7 8.6L6.5 10.8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "house":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 11.5L12 5L20 11.5V20H4V11.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 20V14H15V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 9.2V5H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardContent({ card }: { card: LinksCard }) {
  return (
    <>
      <div className="cm-card-image">
        <img src={card.image} alt={card.imageAlt} loading="lazy" />
        <div className="cm-card-icon">
          <CardIcon icon={card.icon} />
        </div>
      </div>

      <div className="cm-card-body">
        <span className="cm-card-kicker">{card.kicker}</span>
        <h2 className="cm-card-title">{card.title}</h2>
        <p className="cm-card-desc">{card.description}</p>
        <span className="cm-card-link">
          {card.cta}
          <ArrowIcon />
        </span>
      </div>
    </>
  );
}

export function LinksPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".cm-card"),
    );
    const footerNote = section.querySelector<HTMLElement>(".cm-footer-note");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      cards.forEach((card) => card.classList.add("is-visible"));
      footerNote?.classList.add("is-visible");
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    const cleanups: Array<() => void> = [];

    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 90}ms`;
      revealObserver.observe(card);

      function onMouseMove(event: MouseEvent) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = (y / rect.height - 0.5) * -4;
        const rotateY = (x / rect.width - 0.5) * 4;

        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }

      function onMouseLeave() {
        card.style.transform = "";
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "20%");
      }

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    if (footerNote) {
      revealObserver.observe(footerNote);
    }

    return () => {
      revealObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section ref={sectionRef} className="cm-links-page">
      <div className="cm-container">
        <header className="cm-header">
          <div className="cm-logo-wrap">
            <div className="cm-logo-card">
              <img
                className="cm-logo-img"
                src={LINKS_LOGO}
                alt="Checkmate Real Estate Group"
                loading="lazy"
              />
            </div>
          </div>

          <div className="cm-pill">Links úteis</div>

          <h1 className="cm-title">
            Checkmate <span>Group</span>
          </h1>

          <p className="cm-subtitle">
            Acesse rapidamente os principais canais, plataformas e soluções do
            ecossistema Checkmate.
          </p>
        </header>

        <div className="cm-grid">
          {linksCards.map((card) => (
            <article key={card.id} className="cm-card">
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.ariaLabel}
                >
                  <CardContent card={card} />
                </a>
              ) : (
                <Link href={card.href} aria-label={card.ariaLabel}>
                  <CardContent card={card} />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="cm-footer-note">
          Checkmate Real Estate Group — estrutura, tecnologia e direção para
          quem deseja avançar no mercado imobiliário americano.
        </div>
      </div>
    </section>
  );
}
