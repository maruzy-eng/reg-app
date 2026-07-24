import {
  BLUEPRINT_ASSETS,
  blueprintApprovalMetrics,
} from "@/lib/blueprint/content";
import {
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

export function BlueprintApproval() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#c9a24d]/12 blur-[140px]" />
      <div
        className={`relative ${blueprintContainer} grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16`}
      >
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 shadow-[0_28px_85px_rgba(0,0,0,0.45)]">
          <img
            src={BLUEPRINT_ASSETS.approvalImage}
            alt="Projeto em processo de aprovação Checkmate"
            className="aspect-[4/3] h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(0,0,0,0.78))]" />
          <span className="absolute bottom-6 left-6 rounded-full bg-[#c9a24d] px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-white">
            Status atual
          </span>
        </div>
        <div>
          <BlueprintKicker dark>Projeto em desenvolvimento</BlueprintKicker>
          <h2 className={`mt-4 text-white ${blueprintHeadingClass}`}>
            Projeto em processo de{" "}
            <span className="text-[#e4c26e]">aprovação.</span>
          </h2>
          <p className={`${blueprintBodyClass} text-white/55`}>
            Um projeto residencial em fase estratégica, com potencial de
            múltiplas unidades, investimento estruturado e projeção relevante de
            venda no mercado imobiliário americano.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {blueprintApprovalMetrics.map(([label, value, text]) => (
              <article
                key={label}
                className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="text-[0.58rem] font-bold uppercase tracking-[0.13em] text-[#e4c26e]">
                  {label}
                </span>
                <strong className="mt-4 block text-[1.7rem] font-semibold leading-none tracking-[-0.05em] text-white">
                  {value}
                </strong>
                <p className="mt-3 text-[0.7rem] leading-[1.5] text-white/45">
                  {text}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[0.7rem] leading-[1.55] text-white/35">
            Informações apresentadas como projeções do projeto em fase de
            aprovação. Valores e quantidade de unidades podem variar conforme
            aprovação, custos, mercado e execução.
          </p>
        </div>
      </div>
    </section>
  );
}
