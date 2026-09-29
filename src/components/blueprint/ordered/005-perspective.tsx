import Image from "next/image";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintSectionTitle,
  blueprintContainer,
} from "./shared";

export function Blueprint005Perspective() {
  return (
    <section
      id="perspectiva"
      className="relative bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={blueprintContainer}>
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-24">
          <div>
            <BlueprintEyebrow>Uma nova perspectiva</BlueprintEyebrow>

            <BlueprintSectionTitle className="mt-7">
              Informação existe em todo lugar.
              <span className="mt-3 block text-[#9A7938]">
                Decidir é outra coisa.
              </span>
            </BlueprintSectionTitle>

            <p className="mt-8 max-w-[500px] text-[1rem] leading-[1.85] text-[#514C44]">
              O desafio começa quando uma oportunidade está na sua frente:
              quanto pagar, como estruturar o capital, onde está o risco e qual
              estratégia faz sentido.
            </p>

            <p className="mt-8 max-w-[500px] border-l-2 border-[#9A7938] pl-6 text-[1.08rem] font-medium leading-[1.7] text-[#2B2824]">
              E, principalmente: com quem você pode discutir essas decisões?
            </p>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden bg-[#D9D3C6]">
            <Image
              src={content.gallery[0].src}
              alt="Visita de campo Checkmate em uma propriedade em reforma"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#DCC178]">
                Dentro da operação
              </p>
              <p className="mt-3 max-w-[450px] text-[1.15rem] font-medium leading-[1.45] tracking-[-0.02em] text-white">
                A operação real coloca perguntas na mesa que nenhum vídeo
                sozinho consegue responder.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
