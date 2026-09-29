import Image from "next/image";
import { ArrowDown } from "lucide-react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";

import {
  GoldButton,
  Section,
  SectionHeader,
} from "./ui";

import { BlueprintFinancing } from "./ecosystem";

/* =========================================================
   HERO
========================================================= */

export function BlueprintHero() {
  return (
    <section
      id="blueprint"
      tabIndex={-1}
      className="relative isolate min-h-[760px] overflow-hidden bg-[#070707] text-white lg:min-h-[94svh]"
    >
      {/* =====================================================
          PROPERTY
      ====================================================== */}

      <figure className="absolute inset-0 -z-30">
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-[72%_center]"
        />

        {/* Mobile treatment */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.60)_0%,rgba(7,7,7,0.72)_48%,#070707_100%)] lg:hidden"
        />

        {/* Desktop treatment */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.98)_28%,rgba(7,7,7,0.78)_48%,rgba(7,7,7,0.25)_72%,rgba(7,7,7,0.08)_100%)] lg:block"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent,#070707)]"
        />

        {/* Property caption */}
        <figcaption className="absolute bottom-8 right-6 hidden border-l border-white/20 pl-5 text-right lg:block lg:right-10 xl:right-[6vw]">
          <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-white/35">
            Do portfólio Checkmate
          </span>

          <strong className="mt-2 block text-[0.9rem] font-medium text-white/80">
            3 Weston St
          </strong>

          <span className="mt-1 block text-[0.66rem] text-white/38">
            Lexington, Massachusetts
          </span>
        </figcaption>
      </figure>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="mx-auto flex min-h-[760px] w-full max-w-[1440px] flex-col px-5 pb-10 pt-8 sm:px-8 lg:min-h-[94svh] lg:px-12 xl:px-16">
        <div className="flex flex-1 items-center py-20 lg:py-24">
          <div className="max-w-[760px]">
            <div
              data-reveal
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-9 bg-[#c5a258]" />

              <p className="text-[0.63rem] font-bold uppercase tracking-[0.2em] text-[#d3b264]">
                Real estate nos Estados Unidos
              </p>
            </div>

            <h1
              data-reveal
              className="max-w-[720px] text-[clamp(3.4rem,7vw,6.6rem)] font-medium leading-[0.86] tracking-[-0.065em] text-[#f5f3ee]"
            >
              Checkmate
              <span className="block text-[#c5a258]">
                Blueprint
              </span>
            </h1>

            <p
              data-reveal
              className="mt-7 max-w-[620px] text-balance text-[clamp(1.35rem,2.1vw,2rem)] font-medium leading-[1.2] tracking-[-0.035em] text-white/88"
            >
              Mais perto da operação.
              <br />
              Mais clareza para decidir.
            </p>

            <p
              data-reveal
              className="mt-6 max-w-[610px] text-[0.96rem] leading-[1.8] text-white/55 sm:text-[1.03rem]"
            >
              {content.hero.headline}
            </p>

            <div
              data-reveal
              className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
            >
              <GoldButton>
                Quero conhecer o Blueprint
              </GoldButton>

              <a
                href="#projetos"
                className="group inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/48 transition-colors duration-300 hover:text-white"
              >
                Ver projetos reais

                <ArrowDown
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            POSITIONING STRIP
        ==================================================== */}

        <div className="grid gap-y-5 border-t border-white/[0.12] py-7 sm:grid-cols-3 lg:max-w-[850px]">
          {[
            ["01", "Projetos reais"],
            ["02", "Acompanhamento"],
            ["03", "Ecossistema Checkmate"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={[
                "flex items-center gap-4",
                index > 0
                  ? "sm:border-l sm:border-white/[0.1] sm:pl-7"
                  : "",
              ].join(" ")}
            >
              <span className="text-[0.57rem] font-semibold tracking-[0.14em] text-[#c5a258]">
                {number}
              </span>

              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROBLEM / PERSPECTIVE
========================================================= */

export function BlueprintProblem() {
  return (
    <Section
      id="perspectiva"
      className="relative overflow-hidden bg-[#f2eee5] text-[#171614]"
    >
      <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        {/* ===================================================
            STATEMENT
        ==================================================== */}

        <div>
          <p className="mb-5 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#8b6a2e]">
            <span className="h-px w-8 bg-[#9a7938]" />
            Uma nova perspectiva
          </p>

          <h2
            data-reveal
            className="max-w-[620px] text-balance text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.96] tracking-[-0.055em]"
          >
            Informação existe em todo lugar.
            <span className="mt-2 block text-[#9a7938]">
              Decidir é outra coisa.
            </span>
          </h2>

          <p
            data-reveal
            className="mt-8 max-w-[540px] text-[1rem] leading-[1.85] text-[#655f55]"
          >
            O desafio começa quando uma oportunidade está na sua frente:
            quanto pagar, como estruturar o capital, onde está o risco e qual
            estratégia faz sentido.
          </p>

          <p
            data-reveal
            className="mt-6 max-w-[540px] border-l border-[#9a7938]/40 pl-5 text-[1.05rem] font-medium leading-[1.65] text-[#37332e]"
          >
            E, principalmente: com quem você pode discutir essas decisões?
          </p>
        </div>

        {/* ===================================================
            FIELD EXPERIENCE
        ==================================================== */}

        <div className="lg:pt-16">
          <div
            data-reveal
            className="relative aspect-[4/3] overflow-hidden bg-[#ded8cc]"
          >
            <Image
              src={content.gallery[0].src}
              alt="Visita de campo Checkmate em uma propriedade em reforma"
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,rgba(0,0,0,0.70)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#e0c27a]">
                Dentro da operação
              </span>

              <p className="mt-2 max-w-[450px] text-[1.15rem] font-medium leading-[1.3] tracking-[-0.025em] text-white">
                A operação real coloca perguntas na mesa que nenhum vídeo
                sozinho consegue responder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   PROFESSIONAL / AUDIENCE
========================================================= */

export function BlueprintProfessional() {
  return (
    <Section className="bg-[#070707] text-white">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        {/* ===================================================
            PHOTO
        ==================================================== */}

        <div
          data-reveal
          className="relative min-h-[460px] overflow-hidden lg:min-h-[680px]"
        >
          <Image
            src={content.gallery[0].src}
            alt="Visita de campo Checkmate em uma propriedade em reforma"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.78)_100%)]" />

          <span className="absolute bottom-6 left-6 text-[0.59rem] font-bold uppercase tracking-[0.17em] text-[#d3b264] sm:bottom-8 sm:left-8">
            Dentro do ecossistema Checkmate
          </span>
        </div>

        {/* ===================================================
            COPY
        ==================================================== */}

        <div data-reveal>
          <p className="mb-5 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d3b264]">
            <span className="h-px w-8 bg-[#c5a258]" />
            O outro lado da mesa
          </p>

          <SectionHeader {...content.sections.professional} />

          <p className="mt-7 max-w-[600px] text-[0.96rem] leading-[1.85] text-white/48">
            Uma operação imobiliária começa antes do canteiro e continua
            depois dele. O Blueprint aproxima sua experiência da lógica
            completa do negócio.
          </p>

          {/* OPERATION CHAIN */}

          <ol
            data-progress
            className="mt-10 border-y border-white/[0.1]"
          >
            {content.trades.map((trade, index) => (
              <li
                key={trade}
                className="grid grid-cols-[48px_1fr] items-center border-b border-white/[0.08] py-4 last:border-b-0"
              >
                <span className="text-[0.56rem] font-semibold text-[#c5a258]">
                  0{index + 1}
                </span>

                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/52">
                  {trade}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-7 max-w-[580px] text-[0.9rem] leading-[1.75] text-white/43">
            {content.professionalClosing}
          </p>
        </div>
      </div>

      {/* =====================================================
          AUDIENCE
      ====================================================== */}

      <div className="mt-20 border-t border-white/[0.1] pt-12 lg:mt-28 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div data-reveal>
            <p className="text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#d3b264]">
              Seu ponto de partida
            </p>

            <h3 className="mt-5 max-w-[500px] text-[clamp(2.3rem,4vw,4rem)] font-medium leading-[1] tracking-[-0.05em]">
              Onde você está hoje importa.
            </h3>
          </div>

          <p
            data-reveal
            className="max-w-[650px] text-[1rem] leading-[1.85] text-white/47 lg:pt-10"
          >
            {content.careerDescription}
          </p>
        </div>

        <div className="mt-12 border-t border-white/[0.1]">
          {content.audiences.map((audience, index) => (
            <article
              key={audience.title}
              data-reveal
              className="grid gap-4 border-b border-white/[0.1] py-8 sm:grid-cols-[70px_0.65fr_1.35fr] sm:items-start sm:gap-8 lg:py-10"
            >
              <span className="text-[0.58rem] font-semibold text-[#c5a258]">
                0{index + 1}
              </span>

              <h3 className="text-[1.2rem] font-medium tracking-[-0.025em] text-white/90">
                {audience.title}
              </h3>

              <p className="max-w-[620px] text-[0.86rem] leading-[1.75] text-white/42">
                {audience.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* =========================================================
   DIFFERENTIAL
========================================================= */

export function BlueprintDifferential() {
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
    <Section
      id="diferencial"
      className="bg-[#f3efe6] text-[#171614]"
    >
      {/* =====================================================
          INTRO
      ====================================================== */}

      <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#8b6a2e]">
            <span className="h-px w-8 bg-[#9a7938]" />
            O diferencial
          </p>

          <SectionHeader {...content.sections.differential} />
        </div>

        <div className="lg:pt-12">
          <p
            data-reveal
            className="max-w-[650px] text-[1.05rem] leading-[1.85] text-[#625d54]"
          >
            {content.differentialIntro}
          </p>

          <p
            data-reveal
            className="mt-7 max-w-[650px] text-balance text-[1.35rem] font-medium leading-[1.48] tracking-[-0.025em] text-[#37332e]"
          >
            Conteúdo faz parte do programa. O valor está no que acontece ao
            redor dele.
          </p>
        </div>
      </div>

      {/* =====================================================
          PILLARS
      ====================================================== */}

      <div className="mt-16 border-t border-black/[0.12]">
        {pillars.map((pillar) => (
          <article
            key={pillar.number}
            data-reveal
            className="grid gap-4 border-b border-black/[0.1] py-8 sm:grid-cols-[70px_0.7fr_1.3fr] sm:items-start sm:gap-8 lg:py-10"
          >
            <span className="text-[0.58rem] font-bold text-[#9a7938]">
              {pillar.number}
            </span>

            <h3 className="text-[1.3rem] font-medium tracking-[-0.035em] text-[#1d1b18]">
              {pillar.title}
            </h3>

            <p className="max-w-[620px] text-[0.88rem] leading-[1.75] text-[#716b61]">
              {pillar.text}
            </p>
          </article>
        ))}
      </div>

      {/* =====================================================
          CLOSING
      ====================================================== */}

      <div className="mt-14 grid gap-6 border-b border-black/[0.1] pb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <span className="text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#8b6a2e]">
          Blueprint
        </span>

        <div>
          <p className="max-w-[760px] text-balance text-[clamp(1.6rem,2.8vw,2.55rem)] font-medium leading-[1.25] tracking-[-0.04em] text-[#27241f]">
            Você não entra apenas para consumir conteúdo.
            <span className="block text-[#9a7938]">
              Entra para se aproximar de uma operação.
            </span>
          </p>

          <p className="mt-5 max-w-[620px] text-[0.86rem] leading-[1.7] text-[#777066]">
            {content.differentialClosing}
          </p>
        </div>
      </div>

      <BlueprintHowItWorks />
    </Section>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

export function BlueprintHowItWorks() {
  return (
    <div
      id="como-funciona"
      className="pt-20 sm:pt-24 lg:pt-28"
    >
      <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        {/* ===================================================
            INTRO
        ==================================================== */}

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#8b6a2e]">
            Sua jornada
          </p>

          <SectionHeader {...content.sections.journey} />

          <p className="mt-6 max-w-[460px] text-[0.78rem] leading-[1.7] text-[#827b71]">
            Encontros, canais e condições de acompanhamento devem ser
            confirmados com o analista na conversa inicial.
          </p>

          <div className="mt-8">
            <GoldButton>
              Quero conversar sobre o Blueprint
            </GoldButton>
          </div>
        </div>

        {/* ===================================================
            JOURNEY
        ==================================================== */}

        <ol
          data-progress
          className="border-t border-black/[0.12]"
        >
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-5 border-b border-black/[0.1] py-8 sm:grid-cols-[72px_1fr] sm:gap-8 lg:py-10"
            >
              <span className="text-[0.62rem] font-bold text-[#9a7938]">
                0{index + 1}
              </span>

              <div>
                <h3 className="text-[1.35rem] font-medium tracking-[-0.035em] text-[#1d1b18] sm:text-[1.5rem]">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-[620px] text-[0.88rem] leading-[1.75] text-[#726c62]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* =========================================================
   OPERATIONS
========================================================= */

export function BlueprintOperations() {
  const stages = [
    ["Aquisição", "Análise de oportunidades"],
    ["Capital", "Estrutura e financiamento"],
    ["New Construction", "Planejamento e gestão da obra"],
    ["Saída", "Estratégia e decisão"],
  ];

  return (
    <Section
      id="operacao"
      className="relative overflow-hidden bg-[#080808] text-white"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[0.61rem] font-bold uppercase tracking-[0.18em] text-[#d3b264]">
            <span className="h-px w-8 bg-[#c5a258]" />
            A operação por dentro
          </p>

          <SectionHeader {...content.sections.operations} />
        </div>

        <p
          data-reveal
          className="max-w-[620px] text-[1rem] leading-[1.85] text-white/46 lg:pb-2"
        >
          Uma oportunidade não deve ser analisada isoladamente. Aquisição,
          capital, construção e saída precisam fazer sentido juntas.
        </p>
      </div>

      {/* =====================================================
          OPERATION FLOW
      ====================================================== */}

      <div
        data-reveal
        className="mt-16 border-y border-white/[0.1] lg:mt-20"
      >
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          {/* Center message */}

          <div className="border-b border-white/[0.1] px-0 py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-12">
            <span className="text-[0.59rem] font-bold uppercase tracking-[0.18em] text-[#d3b264]">
              Checkmate Blueprint
            </span>

            <strong className="mt-5 block max-w-[380px] text-[clamp(2rem,3.5vw,3.6rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f3ee]">
              Você mais perto de cada decisão.
            </strong>

            <p className="mt-6 max-w-[380px] text-[0.84rem] leading-[1.75] text-white/38">
              O objetivo é entender como as partes da operação se conectam,
              em vez de olhar apenas para uma etapa isolada.
            </p>
          </div>

          {/* Stages */}

          <ol>
            {stages.map(([stage, detail], index) => (
              <li
                key={stage}
                className="grid grid-cols-[54px_1fr] gap-5 border-b border-white/[0.08] py-7 last:border-b-0 sm:grid-cols-[70px_0.8fr_1.2fr] sm:items-center sm:gap-8 lg:px-10 lg:py-8"
              >
                <span className="text-[0.58rem] font-bold text-[#c5a258]">
                  0{index + 1}
                </span>

                <strong className="text-[1.1rem] font-medium tracking-[-0.025em] text-white/90">
                  {stage}
                </strong>

                <small className="col-start-2 text-[0.75rem] leading-[1.65] text-white/37 sm:col-start-auto">
                  {detail}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* =====================================================
          FINANCING
      ====================================================== */}

      <div className="mt-20 lg:mt-24">
        <BlueprintFinancing />
      </div>
    </Section>
  );
}