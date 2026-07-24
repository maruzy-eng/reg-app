"use client";

import { useEffect } from "react";

function animateCounter(element: HTMLElement) {
  const target = Number(element.dataset.target || "0");

  if (!Number.isFinite(target) || target <= 0) {
    element.textContent = "0";
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    element.textContent = String(target);
    return;
  }

  const durationMs = 1200;
  const start = performance.now();

  function frame(now: number) {
    const progress = Math.min((now - start) / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

export function HomeInteractions() {
  useEffect(() => {
    const root = document.querySelector(".checkmate-home");

    if (!root) {
      return;
    }

    const revealNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const counters = Array.from(
      root.querySelectorAll<HTMLElement>(".counter[data-target]"),
    );
    const heroLight = document.getElementById("heroLight");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      revealNodes.forEach((node) => {
        node.dataset.visible = "true";
      });
      counters.forEach((node) => {
        node.textContent = node.dataset.target || "0";
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const node = entry.target as HTMLElement;
          node.dataset.visible = "true";
          revealObserver.unobserve(node);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealNodes.forEach((node) => revealObserver.observe(node));

    const counted = new WeakSet<HTMLElement>();
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const node = entry.target as HTMLElement;

          if (counted.has(node)) {
            return;
          }

          counted.add(node);
          animateCounter(node);
          counterObserver.unobserve(node);
        });
      },
      {
        threshold: 0.4,
      },
    );

    counters.forEach((node) => counterObserver.observe(node));

    function handlePointerMove(event: PointerEvent) {
      if (!heroLight) {
        return;
      }

      const x = (event.clientX / window.innerWidth - 0.5) * 28;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      heroLight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return null;
}
