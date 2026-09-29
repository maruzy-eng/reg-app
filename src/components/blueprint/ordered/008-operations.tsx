import {
  BlueprintEyebrow,
  BlueprintSectionTitle,
  blueprintContainer,
  blueprintDarkSection,
} from "./shared";

export function Blueprint008Operations() {
  const stages = [
    ["Aquisição", "Análise de oportunidades"],
    ["Capital", "Estrutura e financiamento"],
    ["New Construction", "Planejamento e gestão da obra"],
    ["Saída", "Estratégia e decisão"],
  ];

  return (
    <section id="operacao" className={blueprintDarkSection}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A258]/40 to-transparent"
      />

      <div className={blueprintContainer}>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-24">
          <div>
            <BlueprintEyebrow dark>A operação por dentro</BlueprintEyebrow>

            <BlueprintSectionTitle dark className="mt-7">
              Enxergue o projeto inteiro.
              <span className="mt-2 block text-[#D3B264]">
                Não apenas a sua etapa.
              </span>
            </BlueprintSectionTitle>
          </div>

          <p className="max-w-[580px] text-[1rem] leading-[1.9] text-white/65">
            Uma oportunidade não deve ser analisada isoladamente. Aquisição,
            capital, construção e saída precisam fazer sentido juntas.
          </p>
        </div>

        <div className="mt-16 border-y border-white/15 lg:mt-20">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-white/15 py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#D3B264]">
                Checkmate Blueprint
              </p>
              <strong className="mt-6 block max-w-[380px] text-[clamp(2rem,3.4vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.05em] text-[#F5F3EE]">
                Você mais perto de cada decisão.
              </strong>
              <p className="mt-6 max-w-[360px] text-[0.9rem] leading-[1.8] text-white/60">
                O objetivo é entender como as partes da operação se conectam,
                em vez de olhar apenas para uma etapa isolada.
              </p>
            </div>

            <ol>
              {stages.map(([stage, detail], index) => (
                <li
                  key={stage}
                  className="grid grid-cols-[50px_1fr] gap-4 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-[65px_0.8fr_1.2fr] sm:items-center sm:gap-8 lg:px-12 lg:py-9"
                >
                  <span className="text-[0.58rem] font-bold text-[#C5A258]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-[1.05rem] font-medium text-white">
                    {stage}
                  </strong>
                  <span className="col-start-2 text-[0.82rem] leading-[1.7] text-white/55 sm:col-start-auto">
                    {detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
