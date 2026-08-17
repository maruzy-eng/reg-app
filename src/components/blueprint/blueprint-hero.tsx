import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintHero() {
  return (
    <section
      id="checkmate-blueprint"
      className="relative isolate min-h-[720px] overflow-hidden bg-[#030303] text-white"
    >
      {/* Imagem da casa */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-50 bg-cover bg-center opacity-[0.2]"
        style={{
          backgroundImage: `url(${BLUEPRINT_ASSETS.heroImage})`,
        }}
      />

      {/* Escurecimento horizontal */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-40 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.76)_50%,rgba(0,0,0,0.94)_100%)]"
      />

      {/* Escurecimento vertical */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.32)_48%,rgba(0,0,0,0.9)_100%)]"
      />

      {/* Vinheta */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.84)_100%)]"
      />

      {/* Brilho dourado central */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[48%] -z-10 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a24d]/[0.04] blur-[100px]"
      />

      {/* Arco grande central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9b65d]/15"
      />

      {/* Arco lateral */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-410px] top-[-330px] -z-10 h-[920px] w-[920px] rounded-full border border-[#d9b65d]/20"
      />

      {/* Linha superior */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,217,146,0.45),transparent)]"
      />

      <div
        className={[
          blueprintContainer,
          "relative mx-auto flex min-h-[720px] flex-col px-5 pb-14 pt-7",
          "sm:px-6 sm:pt-8",
          "lg:px-8 lg:pb-16 lg:pt-8",
        ].join(" ")}
      >
        {/* Logo */}
        <header className="flex justify-center">
          <a
            href="#checkmate-blueprint"
            aria-label="Checkmate Real Estate Group"
            className="inline-flex transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="h-auto w-[150px] object-contain sm:w-[165px] lg:w-[180px]"
            />
          </a>
        </header>

        {/* Conteúdo */}
        <div className="flex flex-1 items-center justify-center py-12 sm:py-14 lg:py-16">
          <div className="mx-auto w-full max-w-[980px] text-center">
            <div className="flex justify-center">
              <BlueprintKicker dark>
                Flip House · New Construction
              </BlueprintKicker>
            </div>

            <h1
              className={[
                "mx-auto mt-6 max-w-[940px]",
                "text-balance font-semibold tracking-[-0.045em]",
                "text-[clamp(2.35rem,4.4vw,4rem)]",
                "leading-[1.05]",
              ].join(" ")}
            >
              <span className="text-white">
                Aprenda a estruturar projetos de{" "}
              </span>

              <span className="bg-[linear-gradient(105deg,#fff8df_0%,#efd992_32%,#d5ae55_68%,#aa7d29_100%)] bg-clip-text text-transparent">
                Flip Houses e New Construction
              </span>

              <span className="text-white">
                {" "}
                nos EUA com financiamento de até{" "}
              </span>

              <span className="bg-[linear-gradient(105deg,#fff8df_0%,#efd992_32%,#d5ae55_68%,#aa7d29_100%)] bg-clip-text text-transparent">
                85% da aquisição e 100% da construção.
              </span>
            </h1>

            {/* Divisor */}
            <div className="mx-auto mt-7 flex max-w-[320px] items-center gap-4">
              <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,162,77,0.65))]" />

              <span className="h-1.5 w-1.5 rotate-45 border border-[#d9b65d] bg-[#080706]" />

              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,162,77,0.65),transparent)]" />
            </div>

            <p
              className={[
                blueprintBodyClass,
                "mx-auto mt-7 max-w-[760px]",
                "text-pretty text-center text-white/58",
                "text-[0.95rem] leading-[1.75]",
                "sm:text-[1rem]",
                "lg:text-[1.05rem]",
              ].join(" ")}
            >
              Conheça o modelo utilizado pela{" "}
              <strong className="font-medium text-[#e6c66f]">
                Checkmate Real Estate Group
              </strong>{" "}
              em mais de{" "}
              <strong className="font-medium text-[#e6c66f]">
                US$ 20 milhões em projetos
              </strong>{" "}
              e descubra como encontrar oportunidades, estruturar operações e
              utilizar financiamento bancário.
            </p>

            <div className="mt-8 flex justify-center">
              <BlueprintGoldButton href="#formb">
                Quero fazer parte do Blueprint
              </BlueprintGoldButton>
            </div>

            <p className="mx-auto mt-5 max-w-[430px] text-[0.62rem] font-medium uppercase leading-[1.7] tracking-[0.14em] text-white/28">
              Estrutura, estratégia e financiamento para desenvolver projetos
              imobiliários nos Estados Unidos
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
