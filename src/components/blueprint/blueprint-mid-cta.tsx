import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintMidCta() {
  return (
    <section id="aplicacao" className="bg-white py-20 sm:py-24">
      <div className={blueprintContainer}>
        <div className="relative overflow-hidden rounded-[28px] bg-[#090909] px-6 py-10 text-center text-white shadow-[0_35px_100px_rgba(0,0,0,0.2)] sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#c9a24d]/20 blur-[125px]" />
          <div className="relative mx-auto max-w-[40rem]">
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="mx-auto mb-6 h-auto w-[120px]"
            />
            <BlueprintKicker dark>Próximo passo</BlueprintKicker>
            <h2 className={`mt-4 ${blueprintHeadingClass}`}>
              Comece sua jornada com o{" "}
              <span className="text-[#e4c26e]">Checkmate Blueprint</span>
            </h2>
            <p className={`${blueprintBodyClass} mx-auto text-white/55`}>
              Faça sua aplicação agora e dê o próximo passo para aprender a
              comprar, reformar, construir e estruturar projetos imobiliários
              nos Estados Unidos com método, suporte e visão profissional.
            </p>
            <div className="mt-8 flex justify-center">
              <BlueprintGoldButton href="#formb">
                Quero fazer parte do Blueprint
              </BlueprintGoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
