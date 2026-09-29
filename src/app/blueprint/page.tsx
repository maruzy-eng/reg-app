import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
} from "lucide-react";

import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { BlueprintHeader } from "@/components/blueprint/experience/header";
import {
  BlueprintExperiences,
  BlueprintProjects,
  BlueprintTestimonials,
} from "@/components/blueprint/experience/proof";

import "@/components/blueprint/experience/blueprint.css";

import { JsonLd } from "@/components/seo/json-ld";

import {
  blueprintExperience as content,
  selectBlueprintCases,
  verifiedBlueprintMetrics,
} from "@/lib/blueprint/experience";

import { SITE_CONTACT } from "@/lib/home/contact";
import { buildPageMetadata } from "@/lib/seo";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import { getPublicProperties } from "@/lib/properties";
import {
  getSiteSettings,
  type SiteSettingsValue,
} from "@/lib/site-settings";
import {
  mapPropertyToCard,
  type PropertyCard,
} from "@/types/property";

/* =========================================================
   METADATA
========================================================= */

const pageMetadata = buildPageMetadata({
  title: "Checkmate Blueprint | Real Estate nos Estados Unidos",
  description:
    "Programa de acompanhamento para brasileiros que querem entender, estruturar e desenvolver projetos de real estate nos Estados Unidos com a experiência e o ecossistema da Checkmate.",
  path: "/blueprint",
  keywords: [
    "Checkmate Blueprint",
    "real estate USA",
    "new construction USA",
    "flip house education",
  ],
});

export const metadata: Metadata = {
  ...pageMetadata,
  title: {
    absolute: "Checkmate Blueprint | Real Estate nos Estados Unidos",
  },
  openGraph: {
    ...pageMetadata.openGraph,
    title: "Checkmate Blueprint | Real Estate nos Estados Unidos",
    locale: "pt_BR",
  },
  twitter: {
    ...pageMetadata.twitter,
    title: "Checkmate Blueprint | Real Estate nos Estados Unidos",
  },
};

/* =========================================================
   PAGE
========================================================= */

export default async function BlueprintRoutePage() {
  const [properties, blueprintForm, settings] = await Promise.all([
    getPublicProperties(),
    getPublishedFormByPageKey("blueprint"),
    getSiteSettings(),
  ]);

  const propertyCards = properties.map(mapPropertyToCard);

  return (
    <>
      <JsonLd
        id="blueprint-faq-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "pt-BR",
          mainEntity: content.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          })),
        }}
      />

      <div
        lang="pt-BR"
        className="min-h-screen overflow-x-hidden bg-[#070707] text-[#F5F3EE]"
      >
        <a
          href="#blueprint"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-[#C5A258] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#090909] transition-transform focus:translate-y-0"
        >
          Ir para o conteúdo
        </a>

        <BlueprintHeader />

        <main>
          <BlueprintHero />

          <BlueprintStats properties={propertyCards} />

          {/*
            Estes três componentes continuam sendo os componentes reais
            existentes do projeto, preservando os dados atuais.
          */}
          <BlueprintProjects
            projects={selectBlueprintCases(propertyCards)}
          />

          <BlueprintPerspective />

          <BlueprintDifferential />

          <BlueprintJourney />

          <BlueprintOperations />

          <BlueprintFinancing />

          <BlueprintExperiences />

          <BlueprintTestimonials />

          <BlueprintOffer
            form={blueprintForm.form}
            fields={blueprintForm.fields}
          />

          <BlueprintFAQ />

          <BlueprintFinalCTA />
        </main>

        <BlueprintFooter settings={settings} />
      </div>
    </>
  );
}

/* =========================================================
   DESIGN PRIMITIVES
========================================================= */

const container =
  "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16";

const lightSection =
  "relative bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32";

const darkSection =
  "relative bg-[#070707] py-20 text-[#F5F3EE] sm:py-24 lg:py-28 xl:py-32";

function GoldButton({
  children = "Quero conhecer o Blueprint",
  href = "#formb",
  full = false,
}: {
  children?: ReactNode;
  href?: string;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        "group inline-flex min-h-[52px] items-center justify-center gap-3",
        "border border-[#C5A258] bg-[#C5A258]",
        "px-6 py-3.5",
        "text-[0.67rem] font-bold uppercase tracking-[0.14em] text-[#0B0B0B]",
        "transition duration-300",
        "hover:border-[#D3B264] hover:bg-[#D3B264]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3B264]",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <span>{children}</span>

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={[
          "h-px w-8 shrink-0",
          dark ? "bg-[#C5A258]" : "bg-[#9A7938]",
        ].join(" ")}
      />

      <p
        className={[
          "text-[0.58rem] font-bold uppercase tracking-[0.2em]",
          dark ? "text-[#D3B264]" : "text-[#8B6A2E]",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

function SectionTitle({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={[
        "text-balance text-[clamp(2.4rem,4.4vw,4.6rem)]",
        "font-medium leading-[0.98] tracking-[-0.055em]",
        dark ? "text-[#F5F3EE]" : "text-[#171614]",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}

/* =========================================================
   HERO
========================================================= */

function BlueprintHero() {
  return (
    <section
      id="blueprint"
      tabIndex={-1}
      className="relative isolate min-h-[92svh] overflow-hidden bg-[#060606] text-white"
    >
      <div className="absolute inset-0 -z-30">
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_center] lg:object-[72%_center]"
        />
      </div>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0.68)_55%,#060606_100%)] lg:hidden"
      />

      {/* Desktop overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.98)_22%,rgba(6,6,6,0.90)_40%,rgba(6,6,6,0.52)_60%,rgba(6,6,6,0.12)_82%,rgba(6,6,6,0.04)_100%)] lg:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[35%] bg-gradient-to-b from-transparent to-[#060606]"
      />

      <div
        className={`${container} flex min-h-[92svh] flex-col justify-between pb-7 pt-28 lg:pt-32`}
      >
        <div className="flex flex-1 items-center py-14 lg:py-20">
          <div className="max-w-[790px]">
            <Eyebrow dark>
              Programa de acompanhamento · Real estate nos EUA
            </Eyebrow>

            <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/60">
              Checkmate Blueprint
            </p>

            <h1 className="mt-5 max-w-[790px] text-balance text-[clamp(3rem,6.2vw,6rem)] font-medium leading-[0.92] tracking-[-0.065em] text-[#F5F3EE]">
              Mais perto da operação.
              <span className="mt-2 block text-[#D3B264]">
                Mais clareza para decidir.
              </span>
            </h1>

            <p className="mt-8 max-w-[620px] text-[0.98rem] leading-[1.8] text-white/70 sm:text-[1.05rem]">
              {content.hero.headline}
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <GoldButton />

              <a
                href="#projetos"
                className="group inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white"
              >
                Ver projetos reais

                <ArrowDown
                  size={14}
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid border-t border-white/15 sm:grid-cols-3 lg:max-w-[900px]">
          {[
            ["01", "Projetos reais"],
            ["02", "Acompanhamento"],
            ["03", "Ecossistema Checkmate"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={[
                "flex items-center gap-4 py-5",
                index > 0
                  ? "sm:border-l sm:border-white/10 sm:pl-7"
                  : "",
              ].join(" ")}
            >
              <span className="text-[0.56rem] font-bold text-[#D3B264]">
                {number}
              </span>

              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-10 hidden border-l border-white/20 pl-5 lg:block">
        <span className="block text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-white/50">
          Projeto do portfólio
        </span>

        <strong className="mt-2 block text-sm font-medium text-white/90">
          3 Weston St
        </strong>

        <span className="mt-1 block text-[0.65rem] text-white/55">
          Lexington, Massachusetts
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   AUTHORITY / STATS
========================================================= */

function BlueprintStats({
  properties,
}: {
  properties: PropertyCard[];
}) {
  const metrics = verifiedBlueprintMetrics.length
    ? verifiedBlueprintMetrics
    : [
        {
          value: properties.length,
          suffix: "",
          label: "propriedades no portfólio público",
          source: "Inventário público da Checkmate",
        },
        {
          value: new Set(
            properties
              .map((property) => property.state)
              .filter(Boolean),
          ).size,
          suffix: "",
          label: "estados com propriedades publicadas",
          source: "Localização dos imóveis publicados",
        },
      ].filter((metric) => metric.value > 0);

  if (!metrics.length) {
    return null;
  }

  return (
    <section className="border-y border-black/10 bg-[#EDE7DC] text-[#171614]">
      <div className={`${container} py-10 lg:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#8B6A2E]">
              Checkmate Real Estate Group
            </p>

            <p className="mt-4 max-w-[390px] text-[1.25rem] font-medium leading-[1.4] tracking-[-0.025em] text-[#2B2824]">
              Experiência construída dentro de uma operação real nos Estados
              Unidos.
            </p>
          </div>

          <div
            className={[
              "grid gap-8",
              metrics.length > 1 ? "sm:grid-cols-2" : "",
            ].join(" ")}
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-l border-black/15 pl-6"
              >
                <strong className="block text-[clamp(2.7rem,4.5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-[#171614]">
                  {metric.value}
                  {metric.suffix}
                </strong>

                <p className="mt-4 max-w-[260px] text-[0.7rem] font-semibold uppercase leading-[1.55] tracking-[0.1em] text-[#514C44]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[0.66rem] leading-6 text-[#6A645B]">
          Dados do portfólio público exibido no site; o inventário pode variar.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   PERSPECTIVE
========================================================= */

function BlueprintPerspective() {
  return (
    <section
      id="perspectiva"
      className="relative bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-24">
          <div>
            <Eyebrow>Uma nova perspectiva</Eyebrow>

            <SectionTitle className="mt-7">
              Informação existe em todo lugar.
              <span className="mt-3 block text-[#9A7938]">
                Decidir é outra coisa.
              </span>
            </SectionTitle>

            <p className="mt-8 max-w-[500px] text-[1rem] leading-[1.85] text-[#514C44]">
              O desafio começa quando uma oportunidade está na sua frente:
              quanto pagar, como estruturar o capital, onde está o risco e qual
              estratégia faz sentido.
            </p>

            <p className="mt-8 max-w-[500px] border-l-2 border-[#9A7938] pl-6 text-[1.08rem] font-medium leading-[1.7] text-[#2B2824]">
              E, principalmente: com quem você pode discutir essas decisões?
            </p>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden bg-[#D9D3C6]">
            <Image
              src={content.gallery[0].src}
              alt="Visita de campo Checkmate em uma propriedade em reforma"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#DCC178]">
                Dentro da operação
              </p>

              <p className="mt-3 max-w-[450px] text-[1.15rem] font-medium leading-[1.45] tracking-[-0.02em] text-white">
                A operação real coloca perguntas na mesa que nenhum vídeo
                sozinho consegue responder.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DIFFERENTIAL
========================================================= */

function BlueprintDifferential() {
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
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <Eyebrow>O diferencial</Eyebrow>

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

/* =========================================================
   JOURNEY
========================================================= */

function BlueprintJourney() {
  return (
    <section
      id="como-funciona"
      className="bg-[#EDE7DC] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Sua jornada</Eyebrow>

            <SectionTitle className="mt-7">
              Entrou para o Blueprint.
              <span className="mt-2 block text-[#9A7938]">
                E agora?
              </span>
            </SectionTitle>

            <p className="mt-7 max-w-[440px] text-[0.95rem] leading-[1.8] text-[#514C44]">
              Uma visão mais clara de onde você está, das decisões à frente e
              das pessoas que podem caminhar com você.
            </p>

            <p className="mt-5 max-w-[430px] text-[0.75rem] leading-[1.7] text-[#6A645B]">
              Encontros, canais e condições de acompanhamento devem ser
              confirmados com o analista na conversa inicial.
            </p>

            <div className="mt-9">
              <GoldButton>
                Quero conversar sobre o Blueprint
              </GoldButton>
            </div>
          </div>

          <ol className="border-t border-black/15">
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                className="group grid gap-4 border-b border-black/10 py-8 sm:grid-cols-[70px_1fr] sm:gap-8 lg:py-10"
              >
                <span className="pt-1 text-[0.58rem] font-bold text-[#9A7938]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-[1.35rem] font-medium tracking-[-0.035em] text-[#171614] transition-colors group-hover:text-[#9A7938] sm:text-[1.55rem]">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-[580px] text-[0.92rem] leading-[1.8] text-[#5F5951]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   OPERATIONS
========================================================= */

function BlueprintOperations() {
  const stages = [
    ["Aquisição", "Análise de oportunidades"],
    ["Capital", "Estrutura e financiamento"],
    ["New Construction", "Planejamento e gestão da obra"],
    ["Saída", "Estratégia e decisão"],
  ];

  return (
    <section id="operacao" className={darkSection}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A258]/40 to-transparent"
      />

      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-24">
          <div>
            <Eyebrow dark>A operação por dentro</Eyebrow>

            <SectionTitle dark className="mt-7">
              Enxergue o projeto inteiro.
              <span className="mt-2 block text-[#D3B264]">
                Não apenas a sua etapa.
              </span>
            </SectionTitle>
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

/* =========================================================
   FINANCING
========================================================= */

function BlueprintFinancing() {
  return (
    <section className="border-t border-white/10 bg-[#0B0B0A] py-20 text-white sm:py-24 lg:py-28 xl:py-32">
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow dark>
              {content.sections.financing.eyebrow}
            </Eyebrow>

            <h2 className="mt-7 max-w-[560px] text-[clamp(2.4rem,4.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#F5F3EE]">
              {content.sections.financing.title}
            </h2>

            <p className="mt-7 max-w-[500px] text-[0.98rem] leading-[1.85] text-white/65">
              {content.sections.financing.description}
            </p>
          </div>

          <div className="border-t border-white/15">
            {content.financingSteps.map(([number, title, text]) => (
              <article
                key={number}
                className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[70px_1fr] sm:gap-8"
              >
                <span className="pt-1 text-[0.58rem] font-bold text-[#D3B264]">
                  {number}
                </span>

                <div>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] text-white">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-[580px] text-[0.88rem] leading-[1.8] text-white/60">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-[1050px] border-t border-white/10 pt-6 text-[0.7rem] leading-[1.75] text-white/50">
          {content.financingDisclaimer}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   OFFER / FORM
========================================================= */

function BlueprintOffer({
  form,
  fields,
}: {
  form: DynamicForm | null;
  fields: DynamicFormField[];
}) {
  const hasMoment = fields.some((field) =>
    /momento|perfil|moment|profile|occupation/i.test(
      `${field.name} ${field.label}`,
    ),
  );

  const displayFields: DynamicFormField[] = fields.map((field) => ({
    ...field,

    ...(field.type === "state" ||
    /^(states?(_us)?|us_state|estado)$/i.test(field.name)
      ? { label: "Estado" }
      : {}),

    ...(field.type === "phone" &&
    field.help_text === "US phone format."
      ? { help_text: "Telefone dos Estados Unidos." }
      : {}),
  }));

  if (form && !hasMoment) {
    displayFields.push({
      id: "blueprint-current-moment",
      form_id: form.id,
      name: "blueprint_moment",
      label: "Qual seu momento hoje?",
      type: "select",
      required: true,
      placeholder: "Selecione seu momento",
      help_text: null,
      default_value: null,
      options: [...content.momentOptions],
      sort_order: fields.length,
      created_at: form.created_at,
      updated_at: form.updated_at,
    });
  }

  const benefits = [
    "Acompanhamento",
    "Projetos reais",
    "Estratégia",
    "Networking",
    "Ecossistema Checkmate",
  ];

  return (
    <section
      id="formb"
      className="bg-[#EDE7DC] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div className="lg:pt-4">
            <Eyebrow>Seu próximo passo</Eyebrow>

            <h2 className="mt-7 max-w-[560px] text-[clamp(2.6rem,4.6vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#171614]">
              Vamos entender
              <span className="mt-2 block text-[#9A7938]">
                o seu momento.
              </span>
            </h2>

            <p className="mt-8 max-w-[510px] text-[1rem] leading-[1.85] text-[#514C44]">
              Converse com um analista da Checkmate e entenda se o Blueprint
              faz sentido para o momento em que você está agora.
            </p>

            <ul className="mt-10 max-w-[520px] border-t border-black/15">
              {benefits.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[44px_1fr] items-center border-b border-black/10 py-4"
                >
                  <span className="text-[0.56rem] font-bold text-[#9A7938]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[0.84rem] font-medium text-[#3F3A34]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[500px] text-[0.75rem] leading-[1.75] text-[#6A645B]">
              Apresente seu cenário e esclareça o escopo, o formato e as
              condições de participação antes de decidir.
            </p>
          </div>

          <div className="border-t-2 border-[#C5A258] bg-[#F8F5EF] p-6 shadow-[0_30px_70px_rgba(38,31,19,0.08)] sm:p-8 lg:p-10 xl:p-12">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#8B6A2E]">
              Checkmate Blueprint · Qualificação
            </p>

            <h3 className="mt-5 max-w-[500px] text-[clamp(1.9rem,3vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[#1B1916]">
              Conte um pouco sobre o seu momento.
            </h3>

            <p className="mt-4 max-w-[520px] text-[0.86rem] leading-[1.75] text-[#5F5951]">
              Não é uma inscrição automática. A conversa serve para entender
              seu perfil, seus objetivos e o tipo de próximo passo que faz
              sentido.
            </p>

            <div className="blueprint-dynamic-form mt-9">
              {form ? (
                <DynamicFormComponent
                  form={{
                    ...form,
                    submit_button_label: content.conversation,
                  }}
                  fields={displayFields}
                />
              ) : (
                <div className="border border-black/10 bg-white p-6">
                  <p className="text-sm leading-7 text-[#514C44]">
                    Nosso time pode ajudar você a conhecer o Blueprint.
                  </p>

                  <a
                    href={SITE_CONTACT.phoneHref}
                    className="mt-5 inline-flex min-h-12 items-center gap-3 bg-[#C5A258] px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#0B0B0B]"
                  >
                    Falar com o time
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
            </div>

            <p className="mt-6 text-[0.68rem] leading-[1.7] text-[#6A645B]">
              Seus dados serão tratados conforme nossa{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-[#514C44] underline underline-offset-4"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function BlueprintFAQ() {
  return (
    <section
      id="faq"
      className="bg-[#F3EFE6] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={container}>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Antes de dar o próximo passo</Eyebrow>

            <h2 className="mt-7 max-w-[480px] text-[clamp(2.5rem,4.3vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#171614]">
              Boas perguntas.
              <span className="mt-2 block text-[#9A7938]">
                Respostas claras.
              </span>
            </h2>

            <p className="mt-7 max-w-[420px] text-[0.95rem] leading-[1.8] text-[#514C44]">
              Entenda melhor como funciona o Blueprint antes de conversar com
              nossa equipe.
            </p>
          </div>

          <div className="border-t border-black/15">
            {content.faq.map(([question, answer]) => (
              <details
                key={question}
                name="blueprint-faq"
                className="group border-b border-black/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1rem] font-medium leading-[1.4] tracking-[-0.02em] text-[#1F1C18] sm:py-7 sm:text-[1.12rem] [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>

                  <Plus
                    size={18}
                    className="shrink-0 text-[#9A7938] transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>

                <div className="pb-7 pr-10">
                  <p className="max-w-[680px] text-[0.9rem] leading-[1.85] text-[#5F5951]">
                    {answer}
                  </p>
                </div>
              </details>
            ))}

            <div className="mt-10">
              <GoldButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function BlueprintFinalCTA() {
  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-[#060606] text-white">
      <Image
        src={content.hero.image}
        alt={content.hero.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />

      <div className="absolute inset-0 bg-black/55 lg:bg-[linear-gradient(90deg,#060606_0%,rgba(6,6,6,0.96)_32%,rgba(6,6,6,0.65)_58%,rgba(6,6,6,0.25)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#060606]" />

      <div
        className={`${container} relative z-10 flex min-h-[70svh] items-center py-20 lg:py-24`}
      >
        <div className="max-w-[760px]">
          <Eyebrow dark>{content.final.eyebrow}</Eyebrow>

          <h2 className="mt-7 max-w-[740px] text-balance text-[clamp(2.8rem,5.2vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[#F5F3EE]">
            {content.final.title}
          </h2>

          <p className="mt-7 max-w-[580px] text-[1.1rem] font-medium leading-[1.5] text-white/80">
            {content.final.subtitle}
          </p>

          <p className="mt-5 max-w-[540px] text-[0.95rem] leading-[1.8] text-white/65">
            {content.final.description}
          </p>

          <div className="mt-9">
            <GoldButton />
          </div>

          <p className="mt-6 text-[0.7rem] leading-6 text-white/50">
            {content.final.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function BlueprintFooter({
  settings,
}: {
  settings: SiteSettingsValue;
}) {
  const socials = [
    ["Instagram", settings.instagram_url],
    ["YouTube", settings.youtube_url],
    ["LinkedIn", settings.linkedin_url],
    ["Facebook", settings.facebook_url],
  ].filter(
    ([, href]) =>
      typeof href === "string" && /^https?:\/\//.test(href),
  );

  return (
    <footer className="border-t border-white/10 bg-[#060606] text-white">
      <div className={`${container} py-12 lg:py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <Link
              href="/"
              aria-label="Checkmate Real Estate Group, página inicial"
              className="inline-block"
            >
              <Image
                src={content.logo}
                alt="Checkmate Real Estate Group"
                width={2048}
                height={658}
                className="h-auto w-[180px]"
              />
            </Link>
          </div>

          <p className="max-w-[300px] text-[0.85rem] leading-[1.7] text-white/60">
            Experiência real.
            <br />
            Seu próximo passo, acompanhado.
          </p>

          {socials.length > 0 && (
            <nav
              aria-label="Redes sociais"
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.72rem] text-white/60 transition-colors hover:text-white"
                >
                  {label}

                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 text-[0.68rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/50">
            Copyright © {new Date().getFullYear()} Checkmate Real Estate Group.
            All rights reserved.
          </p>

          <nav
            aria-label="Links legais"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <a
              href="/privacy-policy"
              className="text-white/55 transition-colors hover:text-white"
            >
              Privacy
            </a>

            <a
              href="/terms-of-use"
              className="text-white/55 transition-colors hover:text-white"
            >
              Terms
            </a>

            <a
              href="/blueprint-terms"
              className="text-white/55 transition-colors hover:text-white"
            >
              Blueprint Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}