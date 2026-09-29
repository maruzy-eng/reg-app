import { blueprintExperience as content } from "@/lib/blueprint/experience";
import {
  BlueprintEyebrow,
  BlueprintGoldButton,
  BlueprintSectionTitle,
  blueprintContainer,
} from "./shared";

export function Blueprint007Journey() {
  return (
    <section
      id="como-funciona"
      className="bg-[#EDE7DC] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={blueprintContainer}>
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BlueprintEyebrow>Sua jornada</BlueprintEyebrow>

            <BlueprintSectionTitle className="mt-7">
              Entrou para o Blueprint.
              <span className="mt-2 block text-[#9A7938]">E agora?</span>
            </BlueprintSectionTitle>

            <p className="mt-7 max-w-[440px] text-[0.95rem] leading-[1.8] text-[#514C44]">
              Uma visão mais clara de onde você está, das decisões à frente e
              das pessoas que podem caminhar com você.
            </p>
            <p className="mt-5 max-w-[430px] text-[0.75rem] leading-[1.7] text-[#6A645B]">
              Encontros, canais e condições de acompanhamento devem ser
              confirmados com o analista na conversa inicial.
            </p>

            <div className="mt-9">
              <BlueprintGoldButton>
                Quero conversar sobre o Blueprint
              </BlueprintGoldButton>
            </div>
          </div>

          <ol className="border-t border-black/15">
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                className="group grid gap-4 border-b border-black/10 py-8 sm:grid-cols-[70px_1fr] sm:gap-8 lg:py-10"
              >
                <span className="pt-1 text-[0.58rem] font-bold text-[#9A7938]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.35rem] font-medium tracking-[-0.035em] text-[#171614] transition-colors group-hover:text-[#9A7938] sm:text-[1.55rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[580px] text-[0.92rem] leading-[1.8] text-[#5F5951]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
