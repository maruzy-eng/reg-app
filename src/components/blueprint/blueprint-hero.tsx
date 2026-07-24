import {
  BLUEPRINT_ASSETS,
  blueprintHeroMetrics,
} from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeroHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintHero() {
  return (
    <section
      id="checkmate-blueprint"
      className="relative isolate overflow-hidden bg-[#050505] text-white"
    >
      <div
        className="absolute inset-0 -z-40 bg-cover bg-[center_36%] opacity-50"
        style={{
          backgroundImage: `url(${BLUEPRINT_ASSETS.heroImage})`,
        }}
      />

      <div className="absolute inset-0 -z-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.99)_0%,rgba(0,0,0,0.94)_46%,rgba(0,0,0,0.78)_76%,rgba(0,0,0,0.9)_100%)]" />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.44)_62%,#050505_100%)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(201,162,77,0.14),transparent_30%),radial-gradient(circle_at_12%_84%,rgba(201,162,77,0.07),transparent_25%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,217,146,0.65),transparent)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-190px] top-[120px] -z-10 h-[500px] w-[500px] rounded-full border border-[#c9a24d]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-70px] top-[230px] -z-10 h-[300px] w-[300px] rounded-full border border-[#c9a24d]/10"
      />

      <div
        className={[
          blueprintContainer,
          "mx-auto px-5 pb-16 pt-8",
          "sm:px-6 sm:pt-9",
          "lg:px-8 lg:pb-20 lg:pt-10",
        ].join(" ")}
      >
        <header className="flex items-center">
          <a
            href="#checkmate-blueprint"
            aria-label="Checkmate Real Estate Group"
            className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="h-auto w-[148px] object-contain sm:w-[162px]"
            />
          </a>
        </header>

        <div className="pb-8 pt-8 sm:pt-10 lg:pb-10 lg:pt-10">
          <div className="relative z-[2] max-w-[880px]">
            <BlueprintKicker dark>
              Flip House · New Construction
            </BlueprintKicker>

            <h1
              className={[
                "mt-5 max-w-[820px] text-white",
                blueprintHeroHeadingClass,
                "text-balance",
                "lg:text-[clamp(3.1rem,4.6vw,4.75rem)]",
                "lg:leading-[0.98]",
              ].join(" ")}
            >
              Aprenda a estruturar projetos de Flip Houses e New Construction
              nos EUA com{" "}
              <span className="bg-[linear-gradient(105deg,#fff7dc_0%,#efd992_35%,#d4ad55_70%,#a77d28_100%)] bg-clip-text text-transparent">
                financiamento de até 85% da aquisição e 100% da construção.
              </span>
            </h1>

            <p
              className={[
                blueprintBodyClass,
                "mt-7 max-w-[720px] text-pretty text-white/58",
              ].join(" ")}
            >
              Conheça o modelo utilizado pela Checkmate Real Estate Group em
              mais de US$ 20 milhões em projetos e descubra como encontrar
              oportunidades, estruturar operações e utilizar financiamento
              bancário.
            </p>

            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <BlueprintGoldButton href="#formb">
                Quero fazer parte do Blueprint
              </BlueprintGoldButton>

              <p className="flex max-w-[310px] items-center gap-3 text-[0.7rem] leading-[1.5] text-white/38">
                <span className="h-px w-7 shrink-0 bg-[#c9a24d]/70" />
                O Checkmate Blueprint é seu passaporte para essa transformação
              </p>
            </div>
          </div>
        </div>

        <div
          className={[
            "mt-4 grid w-full grid-cols-1 overflow-hidden",
            "rounded-[24px] border border-white/10",
            "bg-white/[0.035]",
            "shadow-[0_26px_76px_rgba(0,0,0,0.24)]",
            "backdrop-blur-2xl",
            "sm:grid-cols-3",
          ].join(" ")}
        >
          {blueprintHeroMetrics.map(([value, label], index) => (
            <article
              key={label}
              className={[
                "group relative",
                "flex min-h-[158px] items-center",
                "justify-between gap-6",
                "px-7 py-7",
                "transition-colors duration-300",
                "hover:bg-white/[0.04]",
                index > 0
                  ? "border-t border-white/10 sm:border-l sm:border-t-0"
                  : "",
                "lg:min-h-[174px] lg:px-9",
              ].join(" ")}
            >
              <div>
                <strong className="block text-[clamp(2rem,3vw,2.8rem)] font-semibold leading-none tracking-[-0.055em] text-[#e4c26e]">
                  {value}
                </strong>

                <p className="mt-4 max-w-[270px] text-[clamp(0.88rem,1vw,1rem)] font-medium leading-[1.55] text-white/58">
                  {label}
                </p>
              </div>

              <span
                aria-hidden="true"
                className={[
                  "hidden h-11 w-11 shrink-0 place-items-center",
                  "rounded-full border border-white/10",
                  "bg-white/[0.035] text-[#e4c26e]",
                  "transition-all duration-300",
                  "group-hover:border-[#c9a24d]/55",
                  "group-hover:bg-[#c9a24d]",
                  "group-hover:text-[#17110a]",
                  "lg:grid",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-[#c9a24d] transition-transform duration-300 group-hover:scale-x-100 lg:inset-x-9"
              />
            </article>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,#050505)]"
      />
    </section>
  );
}