"use client";

import { useEffect } from "react";

export function LpThanksReveal() {
  useEffect(() => {
    const root = document.querySelector("#checkmate-thank-you-page");

    if (!root) {
      return;
    }

    const revealElements = root.querySelectorAll(".cm-reveal");

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
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}