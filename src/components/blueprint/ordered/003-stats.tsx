import { blueprintContainer } from "./shared";

const metrics = [
  {
    value: "US$ 45M+",
    label: "investidos em real estate nos Estados Unidos",
  },
  {
    value: "11",
    label: "propriedades no portfólio público",
  },
] as const;

export function Blueprint003Stats() {
  return (
    <section
      aria-label="Números da Checkmate"
      className="
        relative
        overflow-hidden
        border-y
        border-black/10
        bg-[#EDE7DC]
        text-[#171614]
      "
    >
      {/* subtle background detail */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          w-[42%]
          bg-[linear-gradient(135deg,transparent_0%,rgba(154,121,56,0.035)_100%)]
        "
      />

      <div
        className={`
          ${blueprintContainer}
          relative
          py-10
          sm:py-12
          lg:py-14
        `}
      >
        {/* =================================================
            TOP
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
            border-b
            border-black/10
            pb-4
          "
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="
                h-px
                w-7
                bg-[#9A7938]
              "
            />

            <p
              className="
                text-[0.55rem]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#8B6A2E]
              "
            >
              Checkmate em números
            </p>
          </div>

          <p
            className="
              text-[0.54rem]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#6A645B]
            "
          >
            2026
          </p>
        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className="
            grid
            gap-9
            pt-8
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
            lg:gap-16
            lg:pt-10
          "
        >
          {/* LEFT COPY */}
          <div>
            <p
              className="
                max-w-[360px]
                text-[clamp(1.35rem,2vw,1.85rem)]
                font-medium
                leading-[1.2]
                tracking-[-0.035em]
                text-[#24211D]
              "
            >
              Experiência construída
              <span className="block text-[#9A7938]">
                dentro da operação.
              </span>
            </p>

            <p
              className="
                mt-4
                max-w-[350px]
                text-[0.8rem]
                leading-[1.7]
                text-[#625C54]
              "
            >
              Projetos, capital e decisões reais dentro do mercado imobiliário
              americano.
            </p>
          </div>

          {/* =================================================
              METRICS
          ================================================== */}

          <div
            className="
              grid
              border-t
              border-black/15
              sm:grid-cols-2
              lg:border-t-0
            "
          >
            {metrics.map((metric, index) => (
              <article
                key={metric.label}
                className={[
                  "py-7 sm:py-2",
                  index === 0
                    ? "border-b border-black/10 sm:border-b-0 sm:border-r sm:pr-8 lg:pr-10"
                    : "sm:pl-8 lg:pl-10",
                ].join(" ")}
              >
                <strong
                  className="
                    block
                    whitespace-nowrap
                    text-[clamp(2.45rem,4vw,3.7rem)]
                    font-medium
                    leading-[0.92]
                    tracking-[-0.055em]
                    text-[#171614]
                  "
                >
                  {metric.value}
                </strong>

                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mt-[0.35rem]
                      h-1.5
                      w-1.5
                      shrink-0
                      bg-[#9A7938]
                    "
                  />

                  <p
                    className="
                      max-w-[220px]
                      text-[0.6rem]
                      font-semibold
                      uppercase
                      leading-[1.55]
                      tracking-[0.1em]
                      text-[#514C44]
                    "
                  >
                    {metric.label}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =================================================
            FOOTNOTE
        ================================================== */}

        <div
          className="
            mt-9
            flex
            flex-col
            gap-2
            border-t
            border-black/10
            pt-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[0.6rem]
              leading-[1.7]
              text-[#716A60]
            "
          >
            Números referentes a 2026.
          </p>

          <p
            className="
              text-[0.6rem]
              leading-[1.7]
              text-[#716A60]
            "
          >
            O portfólio público pode variar ao longo do período.
          </p>
        </div>
      </div>
    </section>
  );
}