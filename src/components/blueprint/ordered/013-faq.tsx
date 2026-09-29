import { Plus } from "lucide-react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  blueprintContainer,
} from "./shared";

export function Blueprint013FAQ() {
  return (
    <section
      id="faq"
      className="bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={blueprintContainer}>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BlueprintEyebrow>Antes de dar o próximo passo</BlueprintEyebrow>

            <h2 className="mt-7 max-w-[480px] text-[clamp(2.5rem,4.3vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#171614]">
              Boas perguntas.
              <span className="mt-2 block text-[#9A7938]">
                Respostas claras.
              </span>
            </h2>

            <p className="mt-7 max-w-[420px] text-[0.95rem] leading-[1.8] text-[#514C44]">
              Entenda melhor como funciona o Blueprint antes de conversar com
              nossa equipe.
            </p>
          </div>

          <div className="border-t border-black/15">
            {content.faq.map(([question, answer]) => (
              <details
                key={question}
                name="blueprint-faq"
                className="group border-b border-black/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1rem] font-medium leading-[1.4] tracking-[-0.02em] text-[#1F1C18] sm:py-7 sm:text-[1.12rem] [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <Plus
                    size={18}
                    className="shrink-0 text-[#9A7938] transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="pb-7 pr-10">
                  <p className="max-w-[680px] text-[0.9rem] leading-[1.85] text-[#5F5951]">
                    {answer}
                  </p>
                </div>
              </details>
            ))}

            <div className="mt-10">
              <BlueprintGoldButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
