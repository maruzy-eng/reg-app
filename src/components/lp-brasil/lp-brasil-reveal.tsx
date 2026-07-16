"use client";

import { useEffect } from "react";

const ROOT_SELECTOR = "#checkmate-invest-eua";

export function LpBrasilReveal() {
  useEffect(() => {
    const root = document.querySelector(ROOT_SELECTOR);

    if (!root) {
      return;
    }

    const revealElements = Array.from(root.querySelectorAll(".cmp-reveal"));

    root.classList.add("js-reveal");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return () => {
        root.classList.remove("js-reveal");
      };
    }

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
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    const anchorLinks = root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const cleanups: Array<() => void> = [];

    anchorLinks.forEach((link) => {
      const handleClick = (event: MouseEvent) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }

        const target = root.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const top =
          target.getBoundingClientRect().top + window.pageYOffset - 24;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      };

      link.addEventListener("click", handleClick);

      cleanups.push(() => {
        link.removeEventListener("click", handleClick);
      });
    });

    return () => {
      root.classList.remove("js-reveal");
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
