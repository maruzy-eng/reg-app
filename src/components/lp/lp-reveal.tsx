"use client";

import { useEffect } from "react";

export function LpReveal() {
  useEffect(() => {
    const root = document.querySelector(".cmp-free");

    if (!root) {
      return;
    }

    const revealElements = root.querySelectorAll(".cmp-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
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

        if (!targetId) {
          return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const top = target.getBoundingClientRect().top + window.pageYOffset - 24;

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
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
