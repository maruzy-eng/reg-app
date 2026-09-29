import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  blueprintBodyClass,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintHero() {
  return (
    <section
      id="checkmate-blueprint"
      className="relative isolate min-h-[760px] overflow-hidden bg-[#050505] text-white lg:min-h-[100svh]"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-50
          scale-[1.015]
          bg-cover
          bg-[position:64%_center]
          opacity-[0.52]
          lg:bg-[position:72%_center]
          lg:opacity-[0.7]
        "
        style={{
          backgroundImage: `url(${BLUEPRINT_ASSETS.heroImage})`,
        }}
      />

      {/* =====================================================
          IMAGE TREATMENT
      ====================================================== */}

      {/* Mobile: escurece toda a imagem */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-40
          bg-[linear-gradient(180deg,rgba(5,5,5,0.76)_0%,rgba(5,5,5,0.68)_42%,rgba(5,5,5,0.94)_100%)]
          lg:hidden
        "
      />

      {/* Desktop: conteúdo escuro à esquerda / arquitetura visível à direita */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-40 hidden
          bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.97)_18%,rgba(5,5,5,0.88)_38%,rgba(5,5,5,0.48)_62%,rgba(5,5,5,0.14)_82%,rgba(5,5,5,0.32)_100%)]
          lg:block
        "
      />

      {/* Fade inferior */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 -z-30 h-[42%]
          bg-[linear-gradient(180deg,transparent_0%,rgba(5,5,5,0.42)_48%,#050505_100%)]
        "
      />

      {/* Luz quente muito discreta */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-[12%] top-[20%] -z-20
          hidden h-[520px] w-[520px]
          rounded-full
          bg-[#c5a258]/[0.06]
          blur-[140px]
          lg:block
        "
      />

      {/* Linha superior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 z-10 h-px
          bg-[linear-gradient(90deg,transparent_0%,rgba(197,162,88,0.5)_50%,transparent_100%)]
        "
      />

      {/* =====================================================
          PAGE CONTAINER
      ====================================================== */}

      <div
        className={[
          blueprintContainer,
          "relative mx-auto flex min-h-[760px] flex-col",
          "px-5 pb-8 pt-7",
          "sm:px-6 sm:pb-10 sm:pt-8",
          "lg:min-h-[100svh] lg:px-8 lg:pb-9 lg:pt-8",
        ].join(" ")}
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <header className="flex items-center justify-between">
          <a
            href="#checkmate-blueprint"
            aria-label="Checkmate Real Estate Group"
            className="
              inline-flex
              transition-opacity duration-300
              hover:opacity-75
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#c5a258]
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#050505]
            "
          >
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="
                h-auto w-[138px] object-contain
                sm:w-[150px]
                lg:w-[164px]
              "
            />
          </a>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-px w-8 bg-[#c5a258]/60" />

            <span className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Blueprint · Real Estate USA
            </span>
          </div>
        </header>

        {/* ===================================================
            HERO CONTENT
        ==================================================== */}

        <div
          className="
            flex flex-1 items-center
            py-16
            sm:py-20
            lg:py-16
            xl:py-20
          "
        >
          <div className="w-full max-w-[790px]">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3 sm:mb-8">
              <span className="h-px w-8 bg-[#c5a258] sm:w-10" />

              <span
                className="
                  text-[0.64rem] font-bold uppercase
                  tracking-[0.19em] text-[#d3b264]
                  sm:text-[0.68rem]
                "
              >
                Checkmate Blueprint
              </span>
            </div>

            {/* Headline */}
            <h1
              className="
                max-w-[780px]
                text-balance
                text-[clamp(2.65rem,5vw,4.65rem)]
                font-medium
                leading-[0.98]
                tracking-[-0.052em]
                text-[#f5f3ee]
              "
            >
              Aprenda a estruturar projetos de{" "}
              <span className="text-[#d3b264]">
                New Construction
              </span>{" "}
              e Flip Houses nos Estados Unidos.
            </h1>

            {/* Supporting copy */}
            <p
              className={[
                blueprintBodyClass,
                "mt-7 max-w-[650px]",
                "text-pretty",
                "text-[0.96rem] leading-[1.8] text-white/62",
                "sm:text-[1.02rem]",
                "lg:mt-8 lg:text-[1.06rem]",
              ].join(" ")}
            >
              Conheça o modelo aplicado pela{" "}
              <strong className="font-semibold text-white/90">
                Checkmate Real Estate Group
              </strong>{" "}
              em mais de{" "}
              <strong className="font-semibold text-[#d3b264]">
                US$ 20 milhões em projetos
              </strong>
              , e entenda como analisar oportunidades, estruturar operações e
              acessar possibilidades de financiamento para projetos
              imobiliários nos EUA.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-6">
              <BlueprintGoldButton href="#formb">
                Quero fazer parte do Blueprint
              </BlueprintGoldButton>

              <span
                className="
                  max-w-[260px]
                  text-[0.68rem]
                  font-medium
                  leading-[1.6]
                  tracking-[0.02em]
                  text-white/35
                "
              >
                Acompanhamento, estratégia e execução no mercado imobiliário
                americano.
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            AUTHORITY / FINANCING
        ==================================================== */}

        <div
          className="
            border-t border-white/[0.12]
            pt-6
            sm:pt-7
            lg:pt-6
          "
        >
          <div
            className="
              grid grid-cols-1
              gap-y-5
              sm:grid-cols-3
              sm:gap-y-0
            "
          >
            {/* Metric 01 */}
            <div
              className="
                flex items-baseline justify-between
                border-b border-white/[0.08] pb-5
                sm:block sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8
              "
            >
              <div
                className="
                  text-[1.65rem]
                  font-medium
                  tracking-[-0.045em]
                  text-[#f5f3ee]
                  lg:text-[1.9rem]
                "
              >
                US$ 20M+
              </div>

              <div
                className="
                  mt-1
                  text-right text-[0.62rem]
                  font-semibold uppercase
                  tracking-[0.14em]
                  text-white/35
                  sm:text-left
                "
              >
                em projetos
              </div>
            </div>

            {/* Metric 02 */}
            <div
              className="
                flex items-baseline justify-between
                border-b border-white/[0.08] pb-5
                sm:block sm:border-b-0 sm:border-r sm:px-8 sm:pb-0
              "
            >
              <div
                className="
                  text-[1.65rem]
                  font-medium
                  tracking-[-0.045em]
                  text-[#d3b264]
                  lg:text-[1.9rem]
                "
              >
                até 85%
              </div>

              <div
                className="
                  mt-1
                  text-right text-[0.62rem]
                  font-semibold uppercase
                  tracking-[0.14em]
                  text-white/35
                  sm:text-left
                "
              >
                da aquisição*
              </div>
            </div>

            {/* Metric 03 */}
            <div
              className="
                flex items-baseline justify-between
                sm:block sm:pl-8
              "
            >
              <div
                className="
                  text-[1.65rem]
                  font-medium
                  tracking-[-0.045em]
                  text-[#d3b264]
                  lg:text-[1.9rem]
                "
              >
                até 100%
              </div>

              <div
                className="
                  mt-1
                  text-right text-[0.62rem]
                  font-semibold uppercase
                  tracking-[0.14em]
                  text-white/35
                  sm:text-left
                "
              >
                da construção*
              </div>
            </div>
          </div>

          <p
            className="
              mt-5 max-w-[720px]
              text-[0.58rem]
              leading-[1.6]
              tracking-[0.02em]
              text-white/24
            "
          >
            * As condições de financiamento dependem do projeto, perfil do
            tomador, instituição financeira e respectiva análise de crédito.
          </p>
        </div>
      </div>
    </section>
  );
}