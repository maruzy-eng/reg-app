"use client";

import { useState } from "react";

import { blueprintTestimonials } from "@/lib/blueprint/content";
import {
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

const testimonialCovers: Record<string, string> = {
  "01": "/images/blueprint/depoimento-01.jpg",
  "02": "/images/blueprint/depoimento-02.jpg",
};

function getYoutubeId(src: string) {
  try {
    const url = new URL(src);
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");

    if (embedIndex >= 0 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }

    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

function getTestimonialCover(number: string, src: string) {
  if (testimonialCovers[number]) {
    return testimonialCovers[number];
  }

  const youtubeId = getYoutubeId(src);

  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  return "/images/blueprint/depoimento-01.jpg";
}

function addAutoplay(url: string) {
  try {
    const parsedUrl = new URL(url);

    parsedUrl.searchParams.set("autoplay", "1");
    parsedUrl.searchParams.set("rel", "0");
    parsedUrl.searchParams.set("modestbranding", "1");

    return parsedUrl.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}autoplay=1&rel=0`;
  }
}

export function BlueprintTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="relative isolate overflow-hidden bg-white py-24 text-[#171614] sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_10%,rgba(201,162,77,0.08),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(201,162,77,0.05),transparent_28%)]"
      />

      <div className={`relative z-[1] ${blueprintContainer}`}>
        <div className="border-b border-black/[0.08] pb-10 lg:pb-12">
          <BlueprintSectionHeading
            kicker="Depoimentos"
            title={
              <>
                Quem já está{" "}
                <span className="text-[#a77d28]">no jogo</span>
              </>
            }
            description="Experiências reais dentro do ecossistema Checkmate."
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {blueprintTestimonials.map((item, index) => {
            const isActive = activeVideo === item.number;

            return (
              <article
                key={item.number}
                className={[
                  "group overflow-hidden",
                  "rounded-[28px]",
                  "border border-black/[0.07]",
                  "bg-[#fbfaf7]",
                  "shadow-[0_18px_58px_rgba(15,15,15,0.06)]",
                  "transition-[transform,border-color,box-shadow] duration-500",
                  "hover:-translate-y-1.5",
                  "hover:border-[#c9a24d]/35",
                  "hover:shadow-[0_30px_80px_rgba(15,15,15,0.11)]",
                ].join(" ")}
              >
                <div className="relative aspect-video overflow-hidden bg-[#171614]">
                  {isActive ? (
                    <iframe
                      src={addAutoplay(item.src)}
                      title={`Depoimento Checkmate Blueprint ${item.number}`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      aria-label={`Assistir depoimento ${item.number}`}
                      onClick={() => setActiveVideo(item.number)}
                      className="absolute inset-0 h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a24d]"
                    >
                      <img
                        src={getTestimonialCover(item.number, item.src)}
                        alt={`Capa do depoimento ${item.number}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />

                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.62)_100%)]"
                      />

                      <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/40 px-3 py-2 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:left-6 sm:top-6">
                        Depoimento {item.number}
                      </span>

                      <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-black/50 text-white shadow-[0_0_0_10px_rgba(201,162,77,0.12),0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#efd992]/60 group-hover:bg-[#c9a24d] group-hover:text-[#17110a] sm:h-24 sm:w-24">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
                        >
                          <path d="M8 5.6v12.8L18.5 12 8 5.6Z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex items-start justify-between gap-5 p-6 sm:p-7">
                  <div>
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#8b6721]">
                      Parceiro Checkmate
                    </span>

                    <h3 className="mt-2 text-[1.25rem] font-semibold leading-[1.15] tracking-[-0.035em] text-[#171614]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[0.84rem] leading-[1.65] text-[#68635b]">
                      {item.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-[0.68rem] font-bold tracking-[0.15em] text-black/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
