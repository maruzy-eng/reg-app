import {
  BLUEPRINT_ASSETS,
  blueprintApprovalMetrics,
} from "@/lib/blueprint/content";

import {
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintApproval() {
  return (
    <section className="relative overflow-hidden bg-[#070707] py-24 text-white sm:py-28 lg:py-32">
      {/* =====================================================
          AMBIENT LIGHT
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-12%]
          top-[12%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#c5a258]/[0.055]
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-[linear-gradient(90deg,transparent,rgba(197,162,88,0.18),transparent)]
        "
      />

      <div className={`relative ${blueprintContainer}`}>
        {/* ===================================================
            SECTION INTRO
        ==================================================== */}

        <div
          className="
            mb-12
            grid
            gap-8
            lg:mb-16
            lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <BlueprintKicker dark>
              Projeto em desenvolvimento
            </BlueprintKicker>

            <h2
              className="
                mt-5
                max-w-[660px]
                text-balance
                text-[clamp(2.5rem,4.4vw,4.4rem)]
                font-medium
                leading-[0.98]
                tracking-[-0.05em]
                text-[#f5f3ee]
              "
            >
              Um projeto que começa muito antes da obra.
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className={[
                blueprintBodyClass,
                "max-w-[620px]",
                "text-pretty",
                "text-[0.96rem] leading-[1.85] text-white/52",
                "sm:text-[1rem]",
                "lg:text-[1.04rem]",
              ].join(" ")}
            >
              Em desenvolvimento e processo de aprovação, este projeto
              residencial representa uma etapa importante da operação:
              estruturação, análise, planejamento e preparação antes da
              execução.
            </p>
          </div>
        </div>

        {/* ===================================================
            MAIN CASE STUDY
        ==================================================== */}

        <div
          className="
            grid
            gap-0
            border-y
            border-white/[0.1]
            lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]
          "
        >
          {/* =================================================
              IMAGE
          ================================================== */}

          <div
            className="
              relative
              min-h-[360px]
              overflow-hidden
              border-b
              border-white/[0.1]
              sm:min-h-[460px]
              lg:min-h-[640px]
              lg:border-b-0
              lg:border-r
            "
          >
            <img
              src={BLUEPRINT_ASSETS.approvalImage}
              alt="Projeto residencial Checkmate em processo de aprovação"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                hover:scale-[1.015]
              "
            />

            {/* Image treatment */}
            <div
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.02)_55%,rgba(0,0,0,0.72)_100%)]
              "
            />

            {/* Case label */}
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-white/[0.12]
                  bg-black/35
                  px-4
                  py-2.5
                  backdrop-blur-md
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#d3b264]" />

                <span
                  className="
                    text-[0.58rem]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/70
                  "
                >
                  Em aprovação
                </span>
              </div>
            </div>

            {/* Image footer */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
              <div className="flex items-end justify-between gap-8">
                <div>
                  <span
                    className="
                      block
                      text-[0.58rem]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#d3b264]
                    "
                  >
                    Case Study
                  </span>

                  <strong
                    className="
                      mt-2
                      block
                      max-w-[440px]
                      text-[1.35rem]
                      font-medium
                      leading-[1.12]
                      tracking-[-0.035em]
                      text-white
                      sm:text-[1.6rem]
                    "
                  >
                    Projeto residencial em desenvolvimento
                  </strong>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    hidden
                    text-[0.7rem]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white/30
                    sm:block
                  "
                >
                  Blueprint
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              PROJECT DATA
          ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-between
              bg-[#0a0a0a]
              px-5
              py-8
              sm:px-7
              sm:py-10
              lg:px-9
              lg:py-10
              xl:px-11
              xl:py-12
            "
          >
            <div>
              <span
                className="
                  text-[0.6rem]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#d3b264]
                "
              >
                Estrutura do projeto
              </span>

              <h3
                className="
                  mt-4
                  max-w-[420px]
                  text-[1.8rem]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-[#f5f3ee]
                  sm:text-[2rem]
                  lg:text-[2.2rem]
                "
              >
                Da análise à aprovação.
              </h3>

              <p
                className="
                  mt-5
                  max-w-[430px]
                  text-[0.9rem]
                  leading-[1.75]
                  text-white/45
                "
              >
                O projeto está em uma etapa estratégica de preparação,
                avaliação e aprovação, com potencial de múltiplas unidades e
                estrutura de investimento voltada ao mercado imobiliário
                americano.
              </p>
            </div>

            {/* Metrics */}
            <div className="mt-10 border-t border-white/[0.1]">
              {blueprintApprovalMetrics.map(([label, value, text], index) => (
                <div
                  key={label}
                  className="
                    grid
                    grid-cols-[minmax(0,0.8fr)_minmax(120px,1.2fr)]
                    gap-6
                    border-b
                    border-white/[0.08]
                    py-6
                    last:border-b-0
                  "
                >
                  <div>
                    <span
                      className="
                        text-[0.56rem]
                        font-bold
                        uppercase
                        tracking-[0.17em]
                        text-white/28
                      "
                    >
                      0{index + 1}
                    </span>

                    <span
                      className="
                        mt-2
                        block
                        text-[0.62rem]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-white/45
                      "
                    >
                      {label}
                    </span>
                  </div>

                  <div>
                    <strong
                      className="
                        block
                        text-[1.7rem]
                        font-medium
                        leading-none
                        tracking-[-0.045em]
                        text-[#f5f3ee]
                        sm:text-[1.9rem]
                      "
                    >
                      {value}
                    </strong>

                    <p
                      className="
                        mt-3
                        max-w-[260px]
                        text-[0.72rem]
                        leading-[1.6]
                        text-white/38
                      "
                    >
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="
                mt-8
                max-w-[420px]
                text-[0.62rem]
                leading-[1.7]
                text-white/25
              "
            >
              Informações apresentadas como projeções do projeto em fase de
              aprovação. Valores e quantidade de unidades podem variar conforme
              aprovação, custos, condições de mercado e execução.
            </p>
          </div>
        </div>

        {/* ===================================================
            BOTTOM STATEMENT
        ==================================================== */}

        <div
          className="
            mt-12
            grid
            gap-6
            border-b
            border-white/[0.1]
            pb-12
            sm:mt-14
            sm:pb-14
            lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
            lg:gap-16
          "
        >
          <div>
            <span
              className="
                text-[0.6rem]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#d3b264]
              "
            >
              Visão de operação
            </span>
          </div>

          <p
            className="
              max-w-[700px]
              text-balance
              text-[1.25rem]
              font-medium
              leading-[1.45]
              tracking-[-0.025em]
              text-white/68
              sm:text-[1.4rem]
              lg:text-[1.55rem]
            "
          >
            Antes da construção, existem decisões de terreno, projeto,
            capital, aprovação e estratégia. É essa visão completa da operação
            que o Blueprint busca desenvolver.
          </p>
        </div>
      </div>
    </section>
  );
}