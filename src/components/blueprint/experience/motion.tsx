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
      const progress = Array.from(
        root.querySelectorAll<HTMLElement>("[data-progress]"),
      );
      const hero = root.querySelector<HTMLElement>(".bp-hero-media");
      let frame = 0;
      function update() {
        frame = 0;
        progress.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const value = Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight * 0.75 - rect.top) /
                Math.max(1, rect.height - window.innerHeight * 0.2),
            ),
          );
          element.style.setProperty("--progress", String(value));
        });
        if (hero && window.innerWidth >= 1024)
          hero.style.transform = `translateY(${Math.min(window.scrollY * 0.12, 100)}px)`;
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        reveals.forEach((element) => element.classList.remove("bp-pending"));
        progress.forEach((element) =>
          element.style.removeProperty("--progress"),
        );
        if (hero) hero.style.removeProperty("transform");
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
