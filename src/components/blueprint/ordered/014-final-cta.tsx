import Image from "next/image";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  blueprintContainer,
} from "./shared";

export function Blueprint014FinalCTA() {
  return (
    <section
      className="
        relative isolate
        overflow-hidden
        bg-[#060606]
        text-white
      "
    >
      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div className="relative min-h-[100svh] lg:hidden">
        {/* Image */}
        <div className="absolute inset-x-0 top-0 h-[54svh] -z-30 overflow-hidden">
          <Image
            src={content.hero.image}
            alt={content.hero.imageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </div>

        {/* Top shade */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 -z-20
            h-[180px]
            bg-gradient-to-b
            from-black/55
            via-black/20
            to-transparent
          "
        />

        {/* Cinematic fade */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 -z-20
            h-[74svh]
            bg-[linear-gradient(180deg,rgba(6,6,6,0.02)_0%,rgba(6,6,6,0.08)_30%,rgba(6,6,6,0.50)_58%,rgba(6,6,6,0.88)_76%,#060606_92%,#060606_100%)]
          "
        />

        {/* Side vignette */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10
            bg-[linear-gradient(90deg,rgba(6,6,6,0.18)_0%,transparent_45%,rgba(6,6,6,0.08)_100%)]
          "
        />

        <div
          className={`
            ${blueprintContainer}
            flex min-h-[100svh] flex-col
            px-5
            pb-7
            pt-[42svh]
          `}
        >
          <div className="relative z-10">
            {/* eyebrow */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-7 bg-[#C5A258]"
              />

              <p
                className="
                  text-[0.55rem]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#D3B264]
                "
              >
                {content.final.eyebrow}
              </p>
            </div>

            {/* headline */}
            <h2
              className="
                mt-5
                max-w-[360px]
                text-[clamp(2.55rem,11.5vw,3.5rem)]
                font-medium
                leading-[0.94]
                tracking-[-0.06em]
                text-[#F5F3EE]
              "
            >
              {content.final.title}
            </h2>

            {/* subtitle */}
            <p
              className="
                mt-6
                max-w-[350px]
                text-[1rem]
                font-medium
                leading-[1.5]
                text-white/82
              "
            >
              {content.final.subtitle}
            </p>

            {/* description */}
            <p
              className="
                mt-4
                max-w-[360px]
                text-[0.88rem]
                leading-[1.72]
                text-white/60
              "
            >
              {content.final.description}
            </p>

            {/* CTA */}
            <div className="mt-7">
              <BlueprintGoldButton full />
            </div>

            {/* Microcopy */}
            <div
              className="
                mt-6
                border-t
                border-white/[0.10]
                pt-5
              "
            >
              <p
                className="
                  max-w-[360px]
                  text-[0.68rem]
                  leading-[1.7]
                  text-white/45
                "
              >
                {content.final.microcopy}
              </p>
            </div>
          </div>

          {/* mobile footer label */}
          <div
            className="
              mt-auto
              flex
              items-end
              justify-between
              gap-6
              border-t
              border-white/[0.08]
              pt-5
            "
          >
            <div>
              <p
                className="
                  text-[0.5rem]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/35
                "
              >
                Checkmate Real Estate Group
              </p>

              <p
                className="
                  mt-1
                  text-[0.62rem]
                  text-white/50
                "
              >
                Real estate nos Estados Unidos
              </p>
            </div>

            <span
              className="
                text-[0.5rem]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#C5A258]
              "
            >
              Blueprint
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div className="relative hidden min-h-[78svh] lg:block">
        {/* Image */}
        <div className="absolute inset-0 -z-30">
          <Image
            src={content.hero.image}
            alt={content.hero.imageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </div>

        {/* Main dark overlay */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-20
            bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.985)_24%,rgba(6,6,6,0.93)_44%,rgba(6,6,6,0.62)_66%,rgba(6,6,6,0.18)_100%)]
          "
        />

        {/* Vertical depth */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 -z-10
            bg-[linear-gradient(180deg,rgba(6,6,6,0.12)_0%,transparent_36%,rgba(6,6,6,0.18)_72%,#060606_100%)]
          "
        />

        {/* Top editorial line */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#C5A258]/45
            to-transparent
          "
        />

        <div
          className={`
            ${blueprintContainer}
            relative z-10
            flex min-h-[78svh] flex-col
            justify-center
            py-24
          `}
        >
          <div className="max-w-[760px]">
            <BlueprintEyebrow dark>
              {content.final.eyebrow}
            </BlueprintEyebrow>

            <h2
              className="
                mt-7
                max-w-[720px]
                text-balance
                text-[clamp(3.2rem,5vw,5.2rem)]
                font-medium
                leading-[0.94]
                tracking-[-0.06em]
                text-[#F5F3EE]
              "
            >
              {content.final.title}
            </h2>

            <div
              className="
                mt-8
                max-w-[620px]
                border-l
                border-[#C5A258]/45
                pl-6
              "
            >
              <p
                className="
                  text-[1.08rem]
                  font-medium
                  leading-[1.55]
                  text-white/82
                "
              >
                {content.final.subtitle}
              </p>

              <p
                className="
                  mt-4
                  max-w-[540px]
                  text-[0.94rem]
                  leading-[1.8]
                  text-white/58
                "
              >
                {content.final.description}
              </p>
            </div>

            <div className="mt-9">
              <BlueprintGoldButton />
            </div>

            <p
              className="
                mt-6
                max-w-[500px]
                text-[0.68rem]
                leading-[1.75]
                text-white/42
              "
            >
              {content.final.microcopy}
            </p>
          </div>
        </div>

        {/* Property caption */}
        <div
          className="
            absolute
            bottom-9
            right-10
            border-l
            border-white/15
            pl-5
          "
        >
          <p
            className="
              text-[0.5rem]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#C5A258]
            "
          >
            Checkmate Portfolio
          </p>

          <p
            className="
              mt-2
              text-[0.75rem]
              font-medium
              text-white/75
            "
          >
            Real Estate · Massachusetts
          </p>
        </div>
      </div>
    </section>
  );
}