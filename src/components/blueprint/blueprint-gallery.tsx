"use client";

import { useEffect, useState } from "react";

import { blueprintGallery } from "@/lib/blueprint/content";
import {
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

const GALLERY_LOOPS = 3;

function GalleryCard({
  image,
  index,
  decorative = false,
}: {
  image: string;
  index: number;
  decorative?: boolean;
}) {
  return (
    <figure
      data-gallery-card
      aria-hidden={decorative || undefined}
      className={[
        "group relative",
        "aspect-[4/5]",
        "w-[78vw] max-w-[340px]",
        "shrink-0",
        "overflow-hidden rounded-[28px]",
        "border border-black/[0.06]",
        "bg-[#f2f0eb]",
        "shadow-[0_18px_52px_rgba(17,16,13,0.08)]",
        "transition-[transform,box-shadow] duration-500",
        "hover:-translate-y-1",
        "hover:shadow-[0_26px_70px_rgba(17,16,13,0.15)]",
        "sm:w-[300px]",
        "lg:w-[320px]",
      ].join(" ")}
    >
      <img
        src={image}
        alt={
          decorative
            ? ""
            : `Galeria Checkmate Blueprint ${index + 1}`
        }
        loading="lazy"
        draggable={false}
        className="pointer-events-none h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.72)_100%)] opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-6">
        <div>
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#efd992]">
            Checkmate Blueprint
          </span>
          <p className="mt-1.5 text-[0.8rem] font-medium text-white/88">
            Ecossistema em movimento
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/25 text-[0.67rem] font-bold tracking-[0.12em] text-white backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#a77d28,#efd992,#a77d28)] transition-transform duration-500 group-hover:scale-x-100"
      />
    </figure>
  );
}

export function BlueprintGallery() {
  const [paused, setPaused] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncMotion() {
      setReducedMotion(media.matches);
    }

    syncMotion();
    media.addEventListener("change", syncMotion);

    return () => media.removeEventListener("change", syncMotion);
  }, []);

  const loopedGallery = Array.from({ length: GALLERY_LOOPS }, (_, loop) =>
    blueprintGallery.map((image, index) => ({
      image,
      index,
      key: `${loop}-${index}`,
      decorative: loop > 0,
    })),
  ).flat();

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-[#c9a24d]/[0.06] blur-[130px]"
      />

      <div className="relative z-[1]">
        <div className={blueprintContainer}>
          <BlueprintSectionHeading
            kicker="Galeria Checkmate"
            title={
              <>
                Momentos reais do{" "}
                <span className="text-[#a77d28]">ecossistema Checkmate</span>
              </>
            }
            description="Bastidores, encontros, obras, eventos e experiências com quem já está construindo esse caminho."
          />
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-[1180px] justify-end gap-3 px-4 sm:px-6 lg:px-0">
          <button
            type="button"
            aria-label="Inverter direção do carrossel"
            onClick={() => setReverse(true)}
            className={[
              "group inline-flex h-12 w-12 items-center justify-center",
              "rounded-full border border-black/[0.09]",
              "bg-white text-[#171614]",
              "shadow-[0_12px_32px_rgba(17,16,13,0.08)]",
              "transition-all duration-300",
              "hover:-translate-y-0.5",
              "hover:border-[#c9a24d]/45",
              "hover:bg-[#171614]",
              "hover:text-white",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#c9a24d]/45",
              reverse ? "border-[#c9a24d]/45 bg-[#171614] text-white" : "",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Direção normal do carrossel"
            onClick={() => setReverse(false)}
            className={[
              "group inline-flex h-12 w-12 items-center justify-center",
              "rounded-full border border-[#c9a24d]/40",
              "bg-[#171614] text-white",
              "shadow-[0_14px_36px_rgba(17,16,13,0.16)]",
              "transition-all duration-300",
              "hover:-translate-y-0.5",
              "hover:border-[#c9a24d]",
              "hover:bg-[#c9a24d]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#c9a24d]/45",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>
        </div>

        <div
          className="mt-6 overflow-hidden pb-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div
            className={[
              "blueprint-gallery-track flex gap-4 px-4 sm:px-6",
              reverse ? "is-reverse" : "",
              paused || reducedMotion ? "is-paused" : "",
              reducedMotion ? "overflow-x-auto scroll-smooth" : "",
            ].join(" ")}
            role="list"
            aria-label="Galeria Checkmate em carrossel infinito"
          >
            {(reducedMotion
              ? blueprintGallery.map((image, index) => ({
                  image,
                  index,
                  key: `static-${index}`,
                  decorative: false,
                }))
              : loopedGallery
            ).map((item) => (
              <GalleryCard
                key={item.key}
                image={item.image}
                index={item.index}
                decorative={item.decorative}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-2 flex max-w-[1180px] items-center justify-center gap-3 px-4 text-center text-[0.68rem] text-[#7a746b] sm:px-6 lg:px-0">
          <span className="h-px w-8 bg-[#c9a24d]/55" />
          Carrossel infinito · passe o mouse para pausar
          <span className="h-px w-8 bg-[#c9a24d]/55" />
        </p>
      </div>
    </section>
  );
}
