import { blueprintExperience as content } from "@/lib/blueprint/experience";
import { BlueprintEyebrow, blueprintContainer } from "./shared";

export function Blueprint006Differential() {
  const pillars = [
    {
      number: "01",
      title: "Estratégia",
      text: "Analise oportunidades e decisões olhando a operação como um todo.",
    },
    {
      number: "02",
      title: "Acompanhamento",
      text: "Leve dúvidas, situações e projetos para perto de quem vive esse mercado.",
    },
    {
      number: "03",
      title: "Projetos reais",
      text: "Veja como aquisição, capital, construção e saída se conectam na prática.",
    },
    {
      number: "04",
      title: "Conexões",
      text: "Aproxime-se das pessoas e relações que fazem parte do ecossistema.",
    },
  ];

  return (
    <section
      id="diferencial"
      className="relative border-t border-black/10 bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={blueprintContainer}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <BlueprintEyebrow>O diferencial</BlueprintEyebrow>

            <h2 className="mt-7 max-w-[600px] text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.97] tracking-[-0.055em] text-[#171614]">
              Acompanhamento
              <br />
              para decidir.
              <span className="mt-2 block text-[#9A7938]">
                Proximidade
                <br />
                para executar.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-center lg:pt-12">
            <p className="max-w-[600px] text-[1.02rem] leading-[1.9] text-[#514C44]">
              {content.differentialIntro}
            </p>
            <p className="mt-8 max-w-[600px] text-[1.35rem] font-medium leading-[1.5] tracking-[-0.025em] text-[#2B2824]">
              Conteúdo faz parte do programa. O valor está no que acontece ao
              redor dele.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-black/15 lg:mt-20">
          {pillars.map((pillar) => (
            <article
              key={pillar.number}
              className="group grid gap-3 border-b border-black/10 py-8 sm:grid-cols-[70px_0.7fr_1.3fr] sm:items-baseline sm:gap-8 lg:py-10"
            >
              <span className="text-[0.58rem] font-bold text-[#9A7938]">
                {pillar.number}
              </span>
              <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] text-[#171614] transition-colors group-hover:text-[#9A7938]">
                {pillar.title}
              </h3>
              <p className="max-w-[600px] text-[0.92rem] leading-[1.8] text-[#5F5951]">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-b border-black/10 pb-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#8B6A2E]">
            Checkmate Blueprint
          </p>
          <div>
            <p className="max-w-[760px] text-[clamp(1.6rem,2.8vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.04em] text-[#1F1C18]">
              Você não entra apenas para consumir conteúdo.
              <span className="mt-2 block text-[#9A7938]">
                Entra para se aproximar de uma operação.
              </span>
            </p>
            <p className="mt-6 max-w-[590px] text-[0.92rem] leading-[1.8] text-[#5F5951]">
              {content.differentialClosing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
