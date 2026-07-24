"use client";

import { useEffect, useState } from "react";

import { blueprintMedia } from "@/lib/blueprint/content";
import {
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";
import { BlueprintLightbox } from "@/components/blueprint/blueprint-lightbox";

export function BlueprintMedia() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightboxImage]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f4ed] py-24 sm:py-28 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(201,162,77,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.06)_1px,transparent_1px)] [background-size:52px_52px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#c9a24d]/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#a77d28]/[0.08] blur-[120px]"
        />

        <div className={`relative z-[1] ${blueprintContainer}`}>
          <div className="border-b border-black/[0.08] pb-10 lg:pb-14">
            <BlueprintSectionHeading
              kicker="Presença e autoridade"
              title={
                <>
                  Nosso método{" "}
                  <span className="text-[#a77d28]">na mídia</span>
                </>
              }
              description="Capas, matérias e aparições jornalísticas que reforçam a presença da Checkmate no mercado imobiliário."
            />
          </div>

          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-4 lg:auto-rows-[280px]">
            {blueprintMedia.map((item, index) => {
              const isFeatured = index === 0;

              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setLightboxImage(item.image)}
                  aria-label={`Abrir ${item.label}`}
                  className={[
                    "group relative isolate overflow-hidden",
                    "rounded-[26px]",
                    "border border-black/[0.07]",
                    "bg-white text-left",
                    "shadow-[0_18px_52px_rgba(15,15,15,0.07)]",
                    "transition-[transform,border-color,box-shadow] duration-500",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:-translate-y-1.5",
                    "hover:border-[#c9a24d]/35",
                    "hover:shadow-[0_30px_80px_rgba(15,15,15,0.13)]",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-[#c9a24d]/50",
                    isFeatured
                      ? "sm:col-span-2 sm:row-span-2 lg:col-span-2"
                      : "",
                  ].join(" ")}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    loading={isFeatured ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.76)_100%)]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),transparent_45%)] opacity-60"
                  />

                  <span className="absolute left-5 top-5 inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[0.56rem] font-bold uppercase tracking-[0.15em] text-white/78 backdrop-blur-md">
                    Mídia Checkmate
                  </span>

                  <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/30 text-white/75 backdrop-blur-md transition-all duration-300 group-hover:border-[#c9a24d] group-hover:bg-[#c9a24d] group-hover:text-[#17110a]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M8 3H3v5" />
                      <path d="m3 3 6 6" />
                      <path d="M16 3h5v5" />
                      <path d="m21 3-6 6" />
                      <path d="M8 21H3v-5" />
                      <path d="m3 21 6-6" />
                      <path d="M16 21h5v-5" />
                      <path d="m21 21-6-6" />
                    </svg>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="flex items-end justify-between gap-5">
                      <span>
                        <span className="block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#e4c26e]">
                          {item.number}
                        </span>

                        <span
                          className={[
                            "mt-2 block font-semibold text-white",
                            "leading-[1.14] tracking-[-0.035em]",
                            isFeatured
                              ? "max-w-[520px] text-[clamp(1.35rem,2.8vw,2rem)]"
                              : "max-w-[260px] text-[1.05rem]",
                          ].join(" ")}
                        >
                          {item.label}
                        </span>
                      </span>

                      <span className="hidden text-[0.56rem] font-bold uppercase tracking-[0.14em] text-white/35 sm:block">
                        Ver imagem
                      </span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#9f7625,#e4c26e,#9f7625)] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <BlueprintLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}