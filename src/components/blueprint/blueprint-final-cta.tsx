import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintFinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#030303] py-24 text-center text-white sm:py-28 lg:py-32">
      {/* Fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_12%,rgba(201,162,77,0.13),transparent_34%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,#030303_0%,#090806_48%,#030303_100%)]"
      />

      {/* Brilho central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[26%] -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[#c9a24d]/10 blur-[140px]"
      />

      {/* Círculos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a24d]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a24d]/[0.06]"
      />

      {/* Linhas superiores */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(228,194,110,0.55),transparent)]"
      />

      <div className={`relative mx-auto px-5 sm:px-6 lg:px-8 ${blueprintContainer}`}>
        <div
          className={[
            "relative mx-auto max-w-[860px]",
            "rounded-[28px] border border-white/[0.08]",
            "bg-white/[0.025]",
            "px-6 py-14",
            "shadow-[0_30px_100px_rgba(0,0,0,0.42)]",
            "backdrop-blur-xl",
            "sm:px-10 sm:py-16",
            "lg:px-16 lg:py-20",
          ].join(" ")}
        >
          {/* Linha dourada interna */}
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(228,194,110,0.6),transparent)]"
          />

          <div className="flex justify-center">
            <BlueprintKicker dark>Próximo passo</BlueprintKicker>
          </div>

          <h2
            className={[
              blueprintHeadingClass,
              "mx-auto mt-6 max-w-[760px]",
              "text-balance tracking-[-0.045em]",
              "text-white",
            ].join(" ")}
          >
            Quer entender como entrar no mercado imobiliário americano com{" "}
            <span className="bg-[linear-gradient(105deg,#fff8df_0%,#efd992_35%,#d5ae55_70%,#aa7d29_100%)] bg-clip-text text-transparent">
              método, estratégia e estrutura?
            </span>
          </h2>

          <div className="mx-auto mt-7 flex max-w-[240px] items-center gap-4">
            <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,162,77,0.7))]" />

            <span className="h-1.5 w-1.5 rotate-45 border border-[#d9b65d] bg-[#080706]" />

            <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,162,77,0.7),transparent)]" />
          </div>

          <p
            className={[
              blueprintBodyClass,
              "mx-auto mt-7 max-w-[650px]",
              "text-pretty text-white/58",
              "sm:text-[1.05rem]",
              "lg:leading-[1.8]",
            ].join(" ")}
          >
            Fale com um analista da Checkmate e descubra como o Blueprint pode
            ajudar você a estruturar seu próximo passo no mercado imobiliário
            dos Estados Unidos.
          </p>

          <div className="mt-9 flex justify-center">
            <BlueprintGoldButton href="#formb">
              Falar com um analista
            </BlueprintGoldButton>
          </div>

          <div className="mx-auto mt-6 flex max-w-[520px] items-start justify-center gap-3 text-left">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d9b65d]" />

            <p className="text-[0.73rem] leading-[1.65] text-white/38 sm:text-[0.78rem]">
              Preencha o formulário e nosso time entrará em contato para
              entender seu momento e orientar os próximos passos.
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,#030303)]"
      />
    </section>
  );
}