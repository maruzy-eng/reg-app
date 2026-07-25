"use client";

import { useEffect, useState } from "react";

import { BlueprintLightbox } from "@/components/blueprint/blueprint-lightbox";
import {
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";
import { blueprintMedia } from "@/lib/blueprint/content";

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
  );
}

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
      <section className="relative isolate overflow-hidden bg-[#f7f4ed] py-16 sm:py-20 lg:py-24 xl:py-28">
        {/* Grid decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 opacity-35 [background-image:linear-gradient(rgba(201,162,77,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.055)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:52px_52px]"
        />

        {/* Brilho superior esquerdo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 -z-20 h-[320px] w-[320px] rounded-full bg-[#c9a24d]/10 blur-[110px] sm:-left-40 sm:h-[420px] sm:w-[420px]"
        />

        {/* Brilho inferior direito */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-24 -z-20 h-[360px] w-[360px] rounded-full bg-[#a77d28]/[0.08] blur-[120px] sm:h-[440px] sm:w-[440px]"
        />

        <div className={`relative z-[1] ${blueprintContainer}`}>
          {/* Cabeçalho alinhado à esquerda */}
          <div className="max-w-[820px] border-b border-black/[0.08] pb-8 sm:pb-10 lg:pb-12">
            <div className="text-left">
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
          </div>

          {/* Grade: 2 no mobile e 3 no desktop */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {blueprintMedia.map((item) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setLightboxImage(item.image)}
                aria-label={`Abrir imagem: ${item.label}`}
                className={[
                  "group relative isolate aspect-[4/5] w-full overflow-hidden",
                  "rounded-[16px] sm:rounded-[22px]",
                  "border border-black/[0.07]",
                  "bg-[#171614] text-left",
                  "shadow-[0_12px_36px_rgba(15,15,15,0.07)]",
                  "transition-[transform,border-color,box-shadow]",
                  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "motion-safe:hover:-translate-y-1.5",
                  "hover:border-[#c9a24d]/35",
                  "hover:shadow-[0_24px_65px_rgba(15,15,15,0.13)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[#c9a24d]/60",
                  "focus-visible:ring-offset-4",
                  "focus-visible:ring-offset-[#f7f4ed]",
                ].join(" ")}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className={[
                    "absolute inset-0 h-full w-full object-cover",
                    "transition-transform duration-700 ease-out",
                    "motion-safe:group-hover:scale-[1.035]",
                  ].join(" ")}
                />

                {/* Gradiente inferior */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.05)_48%,rgba(0,0,0,0.84)_100%)]"
                />

                {/* Contraste lateral */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12),transparent_55%)]"
                />

                {/* Etiqueta superior */}
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2 py-1.5 text-[0.42rem] font-bold uppercase tracking-[0.11em] text-white/80 backdrop-blur-md sm:left-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-2 sm:text-[0.5rem]">
                  <span className="h-1 w-1 rounded-full bg-[#e4c26e] sm:h-1.5 sm:w-1.5" />
                  <span className="sm:hidden">Mídia</span>
                  <span className="hidden sm:inline">Mídia Checkmate</span>
                </span>

                {/* Botão expandir */}
                <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/35 text-white/75 backdrop-blur-md transition-all duration-300 group-hover:border-[#c9a24d] group-hover:bg-[#c9a24d] group-hover:text-[#17110a] sm:right-4 sm:top-4 sm:h-9 sm:w-9">
                  <ExpandIcon />
                </span>

                {/* Conteúdo inferior */}
                <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="block text-[0.45rem] font-bold uppercase tracking-[0.14em] text-[#e4c26e] sm:text-[0.54rem]">
                    {item.number}
                  </span>

                  <span className="mt-1.5 block text-balance text-[0.82rem] font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:mt-2 sm:text-[1.02rem] lg:text-[1.12rem]">
                    {item.label}
                  </span>

                  <span className="mt-3 hidden items-center gap-2 text-[0.5rem] font-bold uppercase tracking-[0.13em] text-white/40 transition-colors duration-300 group-hover:text-white/70 sm:inline-flex">
                    Visualizar publicação
                    <span aria-hidden="true">↗</span>
                  </span>
                </span>

                {/* Linha dourada no hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#9f7625,#e4c26e,#9f7625)] transition-transform duration-500 motion-safe:group-hover:scale-x-100"
                />
              </button>
            ))}
          </div>

          <p className="mt-8 max-w-[620px] text-left text-[0.72rem] leading-[1.65] text-[#7b746b] sm:mt-10">
            Selecione uma publicação para visualizar a imagem em tamanho
            ampliado.
          </p>
        </div>
      </section>

      <BlueprintLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}