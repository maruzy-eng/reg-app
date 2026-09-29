import Image from "next/image";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  blueprintContainer,
} from "./shared";

export function Blueprint014FinalCTA() {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#060606] text-white">
      <Image
        src={content.hero.image}
        alt={content.hero.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />

      <div className="absolute inset-0 bg-black/55 lg:bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.96)_32%,rgba(6,6,6,0.65)_58%,rgba(6,6,6,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#060606]" />

      <div
        className={`${blueprintContainer} relative z-10 flex min-h-[70svh] items-center py-20 lg:py-24`}
      >
        <div className="max-w-[760px]">
          <BlueprintEyebrow dark>{content.final.eyebrow}</BlueprintEyebrow>

          <h2 className="mt-7 max-w-[740px] text-balance text-[clamp(2.8rem,5.2vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[#F5F3EE]">
            {content.final.title}
          </h2>

          <p className="mt-7 max-w-[580px] text-[1.1rem] font-medium leading-[1.5] text-white/80">
            {content.final.subtitle}
          </p>

          <p className="mt-5 max-w-[540px] text-[0.95rem] leading-[1.8] text-white/65">
            {content.final.description}
          </p>

          <div className="mt-9">
            <BlueprintGoldButton />
          </div>

          <p className="mt-6 text-[0.7rem] leading-6 text-white/50">
            {content.final.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
