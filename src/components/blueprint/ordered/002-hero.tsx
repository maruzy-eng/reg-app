import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  blueprintContainer,
} from "./shared";

export function Blueprint002Hero() {
  return (
    <section
      id="blueprint"
      tabIndex={-1}
      className="relative isolate min-h-[92svh] overflow-hidden bg-[#060606] text-white"
    >
      <div className="absolute inset-0 -z-30">
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_center] lg:object-[72%_center]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.68)_55%,#060606_100%)] lg:hidden"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.98)_22%,rgba(6,6,6,0.90)_40%,rgba(6,6,6,0.52)_60%,rgba(6,6,6,0.12)_82%,rgba(6,6,6,0.04)_100%)] lg:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[35%] bg-gradient-to-b from-transparent to-[#060606]"
      />

      <div
        className={`${blueprintContainer} flex min-h-[92svh] flex-col justify-between pb-7 pt-28 lg:pt-32`}
      >
        <div className="flex flex-1 items-center py-14 lg:py-20">
          <div className="max-w-[790px]">
            <BlueprintEyebrow dark>
              Programa de acompanhamento · Real estate nos EUA
            </BlueprintEyebrow>

            <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Checkmate Blueprint
            </p>

            <h1 className="mt-5 max-w-[790px] text-balance text-[clamp(3rem,6.2vw,6rem)] font-medium leading-[0.92] tracking-[-0.065em] text-[#F5F3EE]">
              Mais perto da operação.
              <span className="mt-2 block text-[#D3B264]">
                Mais clareza para decidir.
              </span>
            </h1>

            <p className="mt-8 max-w-[620px] text-[0.98rem] leading-[1.8] text-white/70 sm:text-[1.05rem]">
              {content.hero.headline}
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <BlueprintGoldButton />

              <a
                href="#projetos"
                className="group inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white"
              >
                Ver projetos reais
                <ArrowDown
                  size={14}
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid border-t border-white/15 sm:grid-cols-3 lg:max-w-[900px]">
          {[
            ["01", "Projetos reais"],
            ["02", "Acompanhamento"],
            ["03", "Ecossistema Checkmate"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={[
                "flex items-center gap-4 py-5",
                index > 0 ? "sm:border-l sm:border-white/10 sm:pl-7" : "",
              ].join(" ")}
            >
              <span className="text-[0.56rem] font-bold text-[#D3B264]">
                {number}
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-10 hidden border-l border-white/20 pl-5 lg:block">
        <span className="block text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-white/50">
          Projeto do portfólio
        </span>
        <strong className="mt-2 block text-sm font-medium text-white/90">
          3 Weston St
        </strong>
        <span className="mt-1 block text-[0.65rem] text-white/55">
          Lexington, Massachusetts
        </span>
      </div>
    </section>
  );
}
