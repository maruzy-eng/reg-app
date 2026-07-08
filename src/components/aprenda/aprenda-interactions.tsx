"use client";

import { useEffect } from "react";

export function AprendaInteractions() {
  useEffect(() => {
    const inteligenciaRoot = document.querySelector("#cmpInteligenciaImobiliaria");

    if (inteligenciaRoot) {
      const counters = inteligenciaRoot.querySelectorAll<HTMLElement>(".cmp-intel-value");
      const bars = inteligenciaRoot.querySelectorAll<HTMLElement>(".cmp-intel-bar span");
      let hasAnimated = false;

      const animateCounter = (element: HTMLElement) => {
        const target = Number.parseInt(element.getAttribute("data-target") || "0", 10) || 0;
        const duration = 1800;
        const startTime = performance.now();

        const updateCounter = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easedProgress * target);

          element.textContent = String(currentValue);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = String(target);
          }
        };

        requestAnimationFrame(updateCounter);
      };

      const runAnimations = () => {
        if (hasAnimated) {
          return;
        }

        hasAnimated = true;

        counters.forEach((counter) => {
          animateCounter(counter);
        });

        bars.forEach((bar) => {
          const targetWidth = bar.style.getPropertyValue("--target-width");

          if (targetWidth) {
            window.setTimeout(() => {
              bar.style.width = targetWidth;
            }, 120);
          }
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runAnimations();
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.28,
        },
      );

      observer.observe(inteligenciaRoot);
    }

    const faqRoot = document.querySelector("#cmpFaqWhite");
    const questions = faqRoot?.querySelectorAll<HTMLButtonElement>(".cmp-faq-question") || [];

    const cleanups: Array<() => void> = [];

    questions.forEach((button) => {
      const onClick = () => {
        const item = button.closest(".cmp-faq-item");

        if (!item) {
          return;
        }

        item.classList.toggle("is-open");
      };

      button.addEventListener("click", onClick);

      cleanups.push(() => {
        button.removeEventListener("click", onClick);
      });
    });

    const yearElement = document.querySelector("#cmpFooterWhiteYear");

    if (yearElement) {
      yearElement.textContent = String(new Date().getFullYear());
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
