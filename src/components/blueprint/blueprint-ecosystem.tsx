import {
  BLUEPRINT_ASSETS,
  blueprintTimeline,
} from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintEcosystem() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[#c9a24d]/[0.05] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(201,162,77,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.055)_1px,transparent_1px)] [background-size:52px_52px]"
      />

      <div className={`relative z-[1] ${blueprintContainer}`}>
        <div className="border-b border-black/[0.08] pb-10 text-left lg:pb-14">
          <BlueprintKicker>Ecossistema Checkmate</BlueprintKicker>

          <h2
            className={[
              "mt-5 max-w-[1080px]",
              blueprintHeadingClass,
              "text-balance text-left text-[#171614]",
              "lg:text-[clamp(2.8rem,4.5vw,4.6rem)]",
            ].join(" ")}
          >
            Você vai entrar em um{" "}
            <span className="text-[#a77d28]">ecossistema</span> onde vai
            aprender a
          </h2>

          <p
            className={[
              blueprintBodyClass,
              "mt-5 max-w-[720px] text-left text-[#68635b]",
            ].join(" ")}
          >
            Um método validado para comprar, construir e lucrar com imóveis nos
            EUA.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[34px] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(201,162,77,0.28),rgba(201,162,77,0.95),rgba(201,162,77,0.28),transparent)] lg:block"
          />

          <div className="grid gap-5 lg:grid-cols-4 lg:gap-6">
            {blueprintTimeline.map((item, index) => (
              <article
                key={item.number}
                className="group relative lg:pt-[70px]"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[22px] z-10 hidden h-6 w-6 -translate-x-1/2 rounded-full border-2 border-[#c9a24d] bg-white shadow-[0_0_0_8px_rgba(201,162,77,0.12),0_10px_26px_rgba(201,162,77,0.2)] transition-transform duration-300 group-hover:scale-110 lg:block"
                >
                  <span className="absolute inset-[6px] rounded-full bg-[#c9a24d]" />
                </div>

                <div
                  className={[
                    "relative h-full overflow-hidden",
                    "rounded-[28px]",
                    "border border-black/[0.075]",
                    "bg-[#fbfaf7] p-7",
                    "shadow-[0_18px_55px_rgba(15,15,15,0.055)]",
                    "transition-[transform,box-shadow,border-color] duration-500",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:-translate-y-2",
                    "group-hover:border-[#c9a24d]/35",
                    "group-hover:shadow-[0_30px_78px_rgba(15,15,15,0.11)]",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#c9a24d]/0 blur-[70px] transition-colors duration-500 group-hover:bg-[#c9a24d]/10"
                  />

                  <div className="relative z-[1] flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a24d]/25 bg-[#f7efd9] text-[0.68rem] font-bold tracking-[0.08em] text-[#a77d28]">
                      {item.number}
                    </span>

                    <span className="text-[0.58rem] font-bold tracking-[0.16em] text-[#a77d28]/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-[1] mt-10">
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#9b7435]/55">
                      Etapa do método
                    </span>

                    <h3 className="mt-3 text-[1.3rem] font-semibold leading-[1.18] tracking-[-0.04em] text-[#171614]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-[0.9rem] leading-[1.68] text-[#68635b]">
                      {item.description}
                    </p>

                    <span
                      aria-hidden="true"
                      className="mt-7 block h-px w-10 bg-[#a77d28]/35 transition-all duration-500 group-hover:w-20 group-hover:bg-[#a77d28]"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#9f7625,#e4c26e,#9f7625)] transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className={[
            "relative mt-14 overflow-hidden",
            "rounded-[32px]",
            "border border-white/[0.08]",
            "bg-[#090909]",
            "px-6 py-12 text-center text-white",
            "shadow-[0_34px_100px_rgba(0,0,0,0.2)]",
            "sm:px-10 sm:py-14",
            "lg:px-16 lg:py-16",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(201,162,77,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.11)_1px,transparent_1px)] [background-size:42px_42px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-180px] h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-[#c9a24d]/14 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-[#c9a24d]/[0.06] blur-[110px]"
          />

          <div className="relative z-[1] mx-auto flex max-w-[860px] flex-col items-center">
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="mb-7 h-auto w-[120px]"
            />

            <BlueprintKicker dark>
              Método · Suporte · Direção
            </BlueprintKicker>

            <h2
              className={[
                "mt-5 max-w-[760px]",
                blueprintHeadingClass,
                "text-balance text-white",
              ].join(" ")}
            >
              Nada aqui é improviso.
            </h2>

            <p
              className={[
                blueprintBodyClass,
                "mx-auto mt-5 max-w-[720px] text-center text-white/58",
              ].join(" ")}
            >
              Você entra em um ecossistema com método, suporte, tecnologia e
              direção para entender como o mercado imobiliário americano
              funciona na prática.
            </p>

            <p
              className={[
                blueprintBodyClass,
                "mx-auto mt-4 max-w-[780px] text-center text-white/76",
              ].join(" ")}
            >
              O Checkmate Blueprint conecta educação, análise de projetos,
              estrutura jurídica, tecnologia imobiliária, mentoria e parcerias
              reais para quem deseja operar com visão profissional e construir
              patrimônio nos Estados Unidos.
            </p>

            <div className="mt-9 flex justify-center">
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