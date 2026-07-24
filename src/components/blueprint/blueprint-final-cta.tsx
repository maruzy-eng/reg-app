import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintFinalCta() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-center text-white sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[#c9a24d]/12 blur-[140px]" />
      <div className={`relative ${blueprintContainer}`}>
        <div className="mx-auto max-w-[40rem]">
          <BlueprintKicker dark>Próximo passo</BlueprintKicker>
          <h2 className={`mt-4 ${blueprintHeadingClass}`}>
            Quer entender como entrar no mercado imobiliário americano com{" "}
            <span className="text-[#e4c26e]">método e estrutura?</span>
          </h2>
          <p className={`${blueprintBodyClass} mx-auto text-white/55`}>
            Fale com um analista da Checkmate e descubra se o Blueprint faz
            sentido para o seu momento.
          </p>
          <div className="mt-8 flex justify-center">
            <BlueprintGoldButton href="#formb">
              Falar com um analista
            </BlueprintGoldButton>
          </div>
          <p className="mt-4 text-[0.72rem] text-white/35">
            Preencha o formulário e nosso time entrará em contato para orientar
            o próximo passo.
          </p>
        </div>
      </div>
    </section>
  );
}
