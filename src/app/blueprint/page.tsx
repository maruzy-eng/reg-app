import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";

import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { BlueprintHeader } from "@/components/blueprint/experience/header";
import { BlueprintMotion } from "@/components/blueprint/experience/motion";
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
import { getSiteSettings, type SiteSettingsValue } from "@/lib/site-settings";
import { mapPropertyToCard, type PropertyCard } from "@/types/property";

const pageMetadata = buildPageMetadata({
  title: "Checkmate Blueprint | Real Estate nos Estados Unidos",
  description:
    "Programa de acompanhamento para brasileiros que querem entender, estruturar e desenvolver projetos de real estate nos Estados Unidos com a experiência e o ecossistema da Checkmate.",
  path: "/blueprint",
  keywords: [
    "Checkmate Blueprint",
    "flip house education",
    "new construction USA",
  ],
});

export const metadata: Metadata = {
  ...pageMetadata,
  title: { absolute: "Checkmate Blueprint | Real Estate nos Estados Unidos" },
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
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />

      <div className="bp-experience" lang="pt-BR">
        <a href="#blueprint" className="bp-skip">
          Ir para o conteúdo
        </a>
        <BlueprintHeader />
        <main>
          <BlueprintHero />
          <BlueprintStats properties={propertyCards} />
          <BlueprintProjects projects={selectBlueprintCases(propertyCards)} />
          <BlueprintProblem />
          <BlueprintDifferential />
          <BlueprintOperations />
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
        <BlueprintMotion />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────── */

function GoldButton({
  children = content.cta,
  href = "#formb",
}: {
  children?: ReactNode;
  href?: string;
}) {
  return (
    <a
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#c5a258] px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a] transition-all duration-500 hover:bg-[#d4b56a] hover:shadow-[0_0_40px_-8px_rgba(197,162,88,0.45)]"
      href={href}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </a>
  );
}

function Section({
  children,
  id,
  light = false,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  id?: string;
  light?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      className={`bp-section ${light ? "bp-light" : ""} ${className}`}
      aria-label={ariaLabel}
    >
      <div className="bp-container">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  accent?: string;
}) {
  return (
    <div className="bp-section-heading" data-reveal>
      <p className="bp-eyebrow">{eyebrow.replace(/^\d+\s*\/\s*/, "")}</p>
      <h2>
        {title}
        {accent && (
          <>
            <br />
            <span className="bp-heading-accent">{accent}</span>
          </>
        )}
      </h2>
      {description && <p className="bp-lead">{description}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero — cinematic, editorial, premium
───────────────────────────────────────────── */

function BlueprintHero() {
  return (
    <section
      id="blueprint"
      tabIndex={-1}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#060606] text-white"
    >
      {/* Background image */}
      <figure className="absolute inset-0 -z-30">
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-[68%_center] scale-105 lg:object-[72%_center]"
        />
        {/* Mobile gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0.70)_40%,rgba(6,6,6,0.92)_75%,#060606_100%)] lg:hidden"
        />
        {/* Desktop cinematic gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-[linear-gradient(105deg,#060606_0%,rgba(6,6,6,0.97)_22%,rgba(6,6,6,0.82)_42%,rgba(6,6,6,0.35)_62%,rgba(6,6,6,0.08)_82%,transparent_100%)] lg:block"
        />
        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,transparent,#060606)]"
        />
        {/* Subtle grain overlay for texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <figcaption className="absolute bottom-10 right-8 hidden border-l border-white/15 pl-5 text-right lg:block lg:right-12 xl:right-[5vw]">
          <span className="block text-[0.52rem] font-medium uppercase tracking-[0.22em] text-white/30">
            Do portfólio Checkmate
          </span>
          <strong className="mt-1.5 block text-[0.85rem] font-medium tracking-[-0.01em] text-white/70">
            3 Weston St
          </strong>
          <span className="mt-0.5 block text-[0.62rem] text-white/30">
            Lexington, Massachusetts
          </span>
        </figcaption>
      </figure>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-1 items-center py-24 lg:py-28">
          <div className="max-w-[720px]">
            {/* Eyebrow */}
            <div data-reveal className="mb-8 flex items-center gap-3.5">
              <span className="h-px w-10 bg-[#c5a258]/80" />
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#d3b264]/90">
                Real estate nos Estados Unidos
              </p>
            </div>

            {/* Title */}
            <h1
              data-reveal
              className="max-w-[680px] text-[clamp(3.6rem,8vw,7.2rem)] font-medium leading-[0.84] tracking-[-0.07em] text-[#f7f5f0]"
            >
              Checkmate
              <span className="mt-1 block bg-gradient-to-r from-[#c5a258] via-[#d4b56a] to-[#c5a258] bg-clip-text text-transparent">
                Blueprint
              </span>
            </h1>

            {/* Tagline */}
            <p
              data-reveal
              className="mt-8 max-w-[560px] text-balance text-[clamp(1.25rem,2vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.03em] text-white/85"
            >
              Mais perto da operação.
              <br className="hidden sm:block" />
              <span className="text-white/55"> Mais clareza para decidir.</span>
            </p>

            {/* Body */}
            <p
              data-reveal
              className="mt-7 max-w-[540px] text-[0.95rem] leading-[1.85] text-white/45 sm:text-[1rem]"
            >
              {content.hero.headline}
            </p>

            {/* CTAs */}
            <div
              data-reveal
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <GoldButton>Quero conhecer o Blueprint</GoldButton>
              <a
                href="#projetos"
                className="group inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 hover:text-white/80"
              >
                Ver projetos reais
                <ArrowDown
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="grid gap-y-4 border-t border-white/[0.08] py-6 sm:grid-cols-3 lg:max-w-[780px]">
          {[
            ["01", "Projetos reais"],
            ["02", "Acompanhamento"],
            ["03", "Ecossistema Checkmate"],
          ].map(([number, label], index) => (
            <div
              key={label}
              className={[
                "flex items-center gap-3.5",
                index > 0 ? "sm:border-l sm:border-white/[0.08] sm:pl-7" : "",
              ].join(" ")}
            >
              <span className="text-[0.55rem] font-semibold tracking-[0.16em] text-[#c5a258]/90">
                {number}
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/40">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Stats — authority bar
───────────────────────────────────────────── */

function BlueprintStats({ properties }: { properties: PropertyCard[] }) {
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
            properties.map((property) => property.state).filter(Boolean),
          ).size,
          suffix: "",
          label: "estados com propriedades publicadas",
          source: "Localização dos imóveis publicados",
        },
      ].filter((metric) => metric.value > 0);

  if (!metrics.length) return null;

  return (
    <Section className="bp-stats" ariaLabel="Portfólio público">
      <p className="bp-authority-label">
        Checkmate Real Estate Group
        <span>Uma operação real nos Estados Unidos.</span>
      </p>
      <div>
        {metrics.map((metric) => (
          <article key={metric.label}>
            <strong>
              {metric.value}
              {metric.suffix}
            </strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
      <small>
        Dados do portfólio público exibido no site; o inventário pode variar.
      </small>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   Problem — editorial two-column
───────────────────────────────────────────── */

function BlueprintProblem() {
  return (
    <Section
      id="perspectiva"
      className="relative overflow-hidden bg-[#f0ebe3] text-[#171614]"
    >
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="flex flex-col justify-center">
          <p className="mb-6 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8b6a2e]">
            <span className="h-px w-8 bg-[#9a7938]/70" />
            Uma nova perspectiva
          </p>
          <h2
            data-reveal
            className="max-w-[580px] text-balance text-[clamp(2.6rem,4.8vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.05em]"
          >
            Informação existe em todo lugar.
            <span className="mt-3 block text-[#9a7938]">
              Decidir é outra coisa.
            </span>
          </h2>
          <p
            data-reveal
            className="mt-8 max-w-[480px] text-[0.98rem] leading-[1.9] text-[#6a645a]"
          >
            O desafio começa quando uma oportunidade está na sua frente: quanto
            pagar, como estruturar o capital, onde está o risco e qual
            estratégia faz sentido.
          </p>
          <p
            data-reveal
            className="mt-7 max-w-[480px] border-l-2 border-[#9a7938]/50 pl-5 text-[1.05rem] font-medium leading-[1.7] text-[#2e2b26]"
          >
            E, principalmente: com quem você pode discutir essas decisões?
          </p>
        </div>

        <div className="lg:pt-8">
          <div
            data-reveal
            className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#d9d3c6]"
          >
            <Image
              src={content.gallery[0].src}
              alt="Visita de campo Checkmate em uma propriedade em reforma"
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.75)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#e0c27a]">
                Dentro da operação
              </span>
              <p className="mt-2.5 max-w-[420px] text-[1.1rem] font-medium leading-[1.35] tracking-[-0.02em] text-white">
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

/* ─────────────────────────────────────────────
   Differential + How it works
───────────────────────────────────────────── */

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
    <Section id="diferencial" className="bg-[#f3efe6] text-[#171614]">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <p className="mb-6 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8b6a2e]">
            <span className="h-px w-8 bg-[#9a7938]/70" />
            O diferencial
          </p>
          <SectionHeader {...content.sections.differential} />
        </div>
        <div className="flex flex-col justify-center lg:pt-10">
          <p
            data-reveal
            className="max-w-[600px] text-[1.02rem] leading-[1.9] text-[#625d54]"
          >
            {content.differentialIntro}
          </p>
          <p
            data-reveal
            className="mt-8 max-w-[600px] text-balance text-[1.3rem] font-medium leading-[1.5] tracking-[-0.025em] text-[#2e2b26]"
          >
            Conteúdo faz parte do programa. O valor está no que acontece ao
            redor dele.
          </p>
        </div>
      </div>

      {/* Pillars — refined list */}
      <div className="mt-20 border-t border-black/[0.08]">
        {pillars.map((pillar) => (
          <article
            key={pillar.number}
            data-reveal
            className="group grid gap-3 border-b border-black/[0.07] py-9 transition-colors duration-300 hover:bg-black/[0.015] sm:grid-cols-[64px_0.65fr_1.35fr] sm:items-baseline sm:gap-10 lg:py-11"
          >
            <span className="text-[0.55rem] font-semibold tracking-[0.08em] text-[#9a7938]/80">
              {pillar.number}
            </span>
            <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] text-[#1a1815] transition-colors duration-300 group-hover:text-[#9a7938]">
              {pillar.title}
            </h3>
            <p className="max-w-[580px] text-[0.9rem] leading-[1.8] text-[#6e6860]">
              {pillar.text}
            </p>
          </article>
        ))}
      </div>

      {/* Closing statement */}
      <div className="mt-16 grid gap-6 border-b border-black/[0.08] pb-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8b6a2e]">
          Blueprint
        </span>
        <div>
          <p className="max-w-[720px] text-balance text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.28] tracking-[-0.035em] text-[#1f1c18]">
            Você não entra apenas para consumir conteúdo.
            <span className="mt-1 block text-[#9a7938]">
              Entra para se aproximar de uma operação.
            </span>
          </p>
          <p className="mt-6 max-w-[560px] text-[0.88rem] leading-[1.75] text-[#716b61]">
            {content.differentialClosing}
          </p>
        </div>
      </div>

      <BlueprintHowItWorks />
    </Section>
  );
}

function BlueprintHowItWorks() {
  return (
    <div id="como-funciona" className="pt-24 sm:pt-28 lg:pt-32">
      <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#8b6a2e]">
            Sua jornada
          </p>
          <SectionHeader {...content.sections.journey} />
          <p className="mt-7 max-w-[420px] text-[0.8rem] leading-[1.75] text-[#7a746a]">
            Encontros, canais e condições de acompanhamento devem ser
            confirmados com o analista na conversa inicial.
          </p>
          <div className="mt-9">
            <GoldButton>Quero conversar sobre o Blueprint</GoldButton>
          </div>
        </div>

        <ol data-progress className="border-t border-black/[0.08]">
          {content.steps.map((step, index) => (
            <li
              key={step.title}
              className="group grid gap-4 border-b border-black/[0.07] py-9 sm:grid-cols-[64px_1fr] sm:gap-10 lg:py-11"
            >
              <span className="text-[0.58rem] font-semibold tracking-[0.08em] text-[#9a7938]/80 transition-colors duration-300 group-hover:text-[#9a7938]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-[1.3rem] font-medium tracking-[-0.03em] text-[#1a1815] transition-colors duration-300 group-hover:text-[#9a7938] sm:text-[1.45rem]">
                  {step.title}
                </h3>
                <p className="mt-3.5 max-w-[560px] text-[0.9rem] leading-[1.8] text-[#6e6860]">
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

/* ─────────────────────────────────────────────
   Operations — dark cinematic section
───────────────────────────────────────────── */

function BlueprintOperations() {
  const stages = [
    ["Aquisição", "Análise de oportunidades"],
    ["Capital", "Estrutura e financiamento"],
    ["New Construction", "Planejamento e gestão da obra"],
    ["Saída", "Estratégia e decisão"],
  ];

  return (
    <Section
      id="operacao"
      className="relative overflow-hidden bg-[#070707] text-white"
    >
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a258]/30 to-transparent"
      />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
        <div>
          <p className="mb-6 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#d3b264]">
            <span className="h-px w-8 bg-[#c5a258]/70" />
            A operação por dentro
          </p>
          <SectionHeader {...content.sections.operations} />
        </div>
        <p
          data-reveal
          className="max-w-[560px] text-[0.98rem] leading-[1.9] text-white/40 lg:pb-1"
        >
          Uma oportunidade não deve ser analisada isoladamente. Aquisição,
          capital, construção e saída precisam fazer sentido juntas.
        </p>
      </div>

      <div data-reveal className="mt-18 border-y border-white/[0.07] lg:mt-22">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-white/[0.07] px-0 py-12 lg:border-b-0 lg:border-r lg:border-white/[0.07] lg:py-16 lg:pr-14">
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#d3b264]/80">
              Checkmate Blueprint
            </span>
            <strong className="mt-6 block max-w-[360px] text-[clamp(1.9rem,3.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#f5f3ee]">
              Você mais perto de cada decisão.
            </strong>
            <p className="mt-6 max-w-[340px] text-[0.85rem] leading-[1.8] text-white/30">
              O objetivo é entender como as partes da operação se conectam, em
              vez de olhar apenas para uma etapa isolada.
            </p>
          </div>

          <ol>
            {stages.map(([stage, detail], index) => (
              <li
                key={stage}
                className="group grid grid-cols-[52px_1fr] gap-4 border-b border-white/[0.06] py-7 last:border-b-0 sm:grid-cols-[64px_0.75fr_1.25fr] sm:items-center sm:gap-8 lg:px-12 lg:py-9"
              >
                <span className="text-[0.55rem] font-semibold tracking-[0.08em] text-[#c5a258]/70 transition-colors duration-300 group-hover:text-[#c5a258]">
                  0{index + 1}
                </span>
                <strong className="text-[1.05rem] font-medium tracking-[-0.02em] text-white/85 transition-colors duration-300 group-hover:text-white">
                  {stage}
                </strong>
                <small className="col-start-2 text-[0.78rem] leading-[1.7] text-white/30 sm:col-start-auto">
                  {detail}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-22 lg:mt-28">
        <BlueprintFinancing />
      </div>
    </Section>
  );
}

function BlueprintFinancing() {
  return (
    <div className="bp-financing">
      <div className="bp-split">
        <div className="bp-section-heading" data-reveal>
          <p className="bp-eyebrow">{content.sections.financing.eyebrow}</p>
          <h3>{content.sections.financing.title}</h3>
          <p className="bp-lead">{content.sections.financing.description}</p>
        </div>
        <div className="bp-capital-list">
          {content.financingSteps.map(([number, title, text]) => (
            <div key={number} data-reveal>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="bp-disclaimer">{content.financingDisclaimer}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Offer / Form — high-conversion premium
───────────────────────────────────────────── */

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
    ...(field.type === "phone" && field.help_text === "US phone format."
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

  return (
    <Section id="formb" className="bp-offer">
      <div className="bp-split">
        <div className="bp-application-intro">
          <SectionHeader {...content.sections.offer} />
          <ul className="bp-offer-list">
            {content.offerItems.map((item) => (
              <li key={item}>
                <ArrowUpRight size={16} className="text-[#c5a258]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="bp-form-note">
            Apresente seu cenário e esclareça o escopo, o formato e as
            condições de participação antes de decidir.
          </p>
        </div>
        <div className="bp-lead-form blueprint-dynamic-form">
          <p className="bp-eyebrow">Checkmate Blueprint / Perfil de interesse</p>
          <h3>Apresente seu perfil.</h3>
          {form ? (
            <DynamicFormComponent
              form={{ ...form, submit_button_label: content.conversation }}
              fields={displayFields}
            />
          ) : (
            <div className="bp-form-fallback">
              <p>Nosso time pode ajudar você a conhecer o Blueprint.</p>
              <a className="bp-button" href={SITE_CONTACT.phoneHref}>
                Falar com o time
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
          <p className="bp-privacy">
            Seus dados serão tratados conforme nossa{" "}
            <a href="/privacy-policy">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */

function BlueprintFAQ() {
  return (
    <Section id="faq" className="bp-faq-section">
      <div className="bp-faq-layout">
        <SectionHeader {...content.sections.faq} />
        <div>
          {content.faq.map(([question, answer]) => (
            <details
              className="bp-faq-item group"
              key={question}
              name="blueprint-faq"
            >
              <summary>
                {question}
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
          <div className="bp-faq-cta">
            <GoldButton />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   Final CTA — full-bleed cinematic
───────────────────────────────────────────── */

function BlueprintFinalCTA() {
  return (
    <section className="bp-final relative isolate min-h-[70svh] overflow-hidden">
      <Image
        src={content.hero.image}
        alt={content.hero.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        className="bp-cover object-cover"
      />
      <div className="bp-final-shade absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.75)_0%,rgba(6,6,6,0.88)_50%,#060606_100%)]" />
      <div className="bp-container relative z-10 flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <p className="bp-eyebrow mb-6 text-[#d3b264]">{content.final.eyebrow}</p>
        <h2 className="max-w-[700px] text-balance text-[clamp(2.4rem,4.5vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[#f5f3ee]">
          {content.final.title}
        </h2>
        <p className="bp-final-subtitle mt-5 max-w-[480px] text-[1.15rem] font-medium tracking-[-0.02em] text-white/70">
          {content.final.subtitle}
        </p>
        <p className="mt-5 max-w-[440px] text-[0.92rem] leading-[1.8] text-white/40">
          {content.final.description}
        </p>
        <div className="mt-10">
          <GoldButton />
        </div>
        <small className="mt-6 text-[0.72rem] text-white/25">
          {content.final.microcopy}
        </small>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */

function BlueprintFooter({ settings }: { settings: SiteSettingsValue }) {
  const socials = [
    ["Instagram", settings.instagram_url],
    ["YouTube", settings.youtube_url],
    ["LinkedIn", settings.linkedin_url],
    ["Facebook", settings.facebook_url],
  ].filter(([, href]) => href && /^https?:\/\//.test(href));

  return (
    <footer className="bp-footer border-t border-white/[0.06] bg-[#060606]">
      <div className="bp-container">
        <div className="bp-footer-top">
          <Link href="/" aria-label="Checkmate Real Estate Group, página inicial">
            <Image
              src={content.logo}
              alt="Checkmate Real Estate Group"
              width={2048}
              height={658}
            />
          </Link>
          <p className="text-white/40">
            Experiência real.
            <br />
            Seu próximo passo, acompanhado.
          </p>
          <nav aria-label="Redes sociais" className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-[0.75rem] text-white/35 transition-colors duration-300 hover:text-white/70"
              >
                {label}
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </nav>
        </div>
        <div className="bp-footer-bottom border-t border-white/[0.06] pt-6">
          <small className="text-white/25">
            Copyright © {new Date().getFullYear()} Checkmate Real Estate Group.
            All rights reserved.
          </small>
          <nav aria-label="Links legais" className="flex gap-6">
            <a href="/privacy-policy" className="text-white/30 transition-colors hover:text-white/60">
              Privacy
            </a>
            <a href="/terms-of-use" className="text-white/30 transition-colors hover:text-white/60">
              Terms
            </a>
            <a href="/blueprint-terms" className="text-white/30 transition-colors hover:text-white/60">
              Blueprint Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}