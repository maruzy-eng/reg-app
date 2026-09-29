"use client";

import { useEffect } from "react";

export function BlueprintMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".bp-experience");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    function setup() {
      cleanup();
      if (!root || preference.matches) return;
      const reveals = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("bp-pending");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      reveals.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight)
          element.classList.add("bp-pending");
        observer.observe(element);
      });
      cleanup = () => {
        observer.disconnect();
        reveals.forEach((element) => element.classList.remove("bp-pending"));
      };
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
