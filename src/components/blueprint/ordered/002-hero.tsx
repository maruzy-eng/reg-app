import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  blueprintContainer,
} from "./shared";

export function Blueprint002Hero() {
  const proofItems = [
    ["01", "Projetos reais"],
    ["02", "Acompanhamento"],
    ["03", "Ecossistema Checkmate"],
  ];

  return (
    <section
      id="blueprint"
      tabIndex={-1}
      className="relative isolate overflow-hidden bg-[#060606] text-white"
    >
      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div className="relative min-h-[100svh] lg:hidden">
        {/* Image area */}
        <div className="absolute inset-x-0 top-0 h-[56svh] -z-30 overflow-hidden">
          <Image
            src={content.hero.image}
            alt={content.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>

        {/* Subtle shade behind header */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 -z-20
            h-[150px]
            bg-gradient-to-b
            from-black/70
            via-black/30
            to-transparent
          "
        />

        {/* Main cinematic fade */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 -z-20
            h-[72svh]
            bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.12)_34%,rgba(6,6,6,0.68)_64%,#060606_88%,#060606_100%)]
          "
        />

        {/* Side vignette */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10
            bg-[linear-gradient(90deg,rgba(6,6,6,0.22)_0%,transparent_35%,transparent_70%,rgba(6,6,6,0.10)_100%)]
          "
        />

        <div
          className={`
            ${blueprintContainer}
            flex min-h-[100svh] flex-col
            px-5
            pb-6
            pt-[43svh]
          `}
        >
          {/* Main copy */}
          <div className="relative z-10">
            <p
              className="
                text-[0.58rem]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#D3B264]
              "
            >
              Checkmate Blueprint
            </p>

            <h1
              className="
                mt-4
                max-w-[350px]
                text-[clamp(2.65rem,12vw,3.55rem)]
                font-medium
                leading-[0.92]
                tracking-[-0.065em]
                text-[#F5F3EE]
              "
            >
              Mais perto
              <span className="block">da operação.</span>

              <span className="mt-2 block text-[#D3B264]">
                Mais clareza
              </span>

              <span className="block text-[#D3B264]">
                para decidir.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[360px]
                text-[0.9rem]
                leading-[1.72]
                text-white/[0.68]
              "
            >
              {content.hero.headline}
            </p>

            {/* Actions */}
            <div className="mt-7">
              <BlueprintGoldButton full />

              <a
                href="#projetos"
                className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-3
                  text-[0.6rem]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white/55
                  transition-colors
                  hover:text-white
                "
              >
                Ver projetos reais

                <ArrowDown
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </a>
            </div>
          </div>

          {/* Mobile proof strip */}
          <div
            className="
              mt-9
              grid grid-cols-3
              border-t
              border-white/[0.12]
            "
          >
            {proofItems.map(([number, label], index) => (
              <div
                key={label}
                className={[
                  "py-4",
                  index > 0
                    ? "border-l border-white/[0.10] pl-3"
                    : "pr-3",
                ].join(" ")}
              >
                <span
                  className="
                    block
                    text-[0.52rem]
                    font-bold
                    text-[#D3B264]
                  "
                >
                  {number}
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-[0.5rem]
                    font-semibold
                    uppercase
                    leading-[1.45]
                    tracking-[0.1em]
                    text-white/50
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div className="relative hidden min-h-[92svh] lg:block">
        {/* Background image */}
        <div className="absolute inset-0 -z-30">
          <Image
            src={content.hero.image}
            alt={content.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>

        {/* Desktop overlay */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-20
            bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.98)_22%,rgba(6,6,6,0.90)_40%,rgba(6,6,6,0.52)_60%,rgba(6,6,6,0.12)_82%,rgba(6,6,6,0.04)_100%)]
          "
        />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 bottom-0 -z-10
            h-[35%]
            bg-gradient-to-b
            from-transparent
            to-[#060606]
          "
        />

        <div
          className={`
            ${blueprintContainer}
            flex min-h-[92svh] flex-col
            justify-between
            pb-7
            pt-32
          `}
        >
          <div className="flex flex-1 items-center py-20">
            <div className="max-w-[790px]">
              <BlueprintEyebrow dark>
                Programa de acompanhamento · Real estate nos EUA
              </BlueprintEyebrow>

              <p
                className="
                  mt-8
                  text-[0.68rem]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/60
                "
              >
                Checkmate Blueprint
              </p>

              <h1
                className="
                  mt-5
                  max-w-[790px]
                  text-balance
                  text-[clamp(3rem,6.2vw,6rem)]
                  font-medium
                  leading-[0.92]
                  tracking-[-0.065em]
                  text-[#F5F3EE]
                "
              >
                Mais perto da operação.

                <span className="mt-2 block text-[#D3B264]">
                  Mais clareza para decidir.
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-[620px]
                  text-[1.05rem]
                  leading-[1.8]
                  text-white/70
                "
              >
                {content.hero.headline}
              </p>

              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-8
                "
              >
                <BlueprintGoldButton />

                <a
                  href="#projetos"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    text-[0.65rem]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white/65
                    transition-colors
                    hover:text-white
                  "
                >
                  Ver projetos reais

                  <ArrowDown
                    size={14}
                    className="
                      transition-transform
                      group-hover:translate-y-1
                    "
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop proof strip */}
          <div className="grid max-w-[900px] grid-cols-3 border-t border-white/15">
            {proofItems.map(([number, label], index) => (
              <div
                key={label}
                className={[
                  "flex items-center gap-4 py-5",
                  index > 0
                    ? "border-l border-white/10 pl-7"
                    : "",
                ].join(" ")}
              >
                <span className="text-[0.56rem] font-bold text-[#D3B264]">
                  {number}
                </span>

                <span
                  className="
                    text-[0.62rem]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-white/60
                  "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Property identification */}
        <div
          className="
            absolute
            bottom-8
            right-10
            border-l
            border-white/20
            pl-5
          "
        >
          <span
            className="
              block
              text-[0.5rem]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/50
            "
          >
            Projeto do portfólio
          </span>

          <strong className="mt-2 block text-sm font-medium text-white/90">
            3 Weston St
          </strong>

          <span className="mt-1 block text-[0.65rem] text-white/55">
            Lexington, Massachusetts
          </span>
        </div>
      </div>
    </section>
  );
}