import type { Metadata } from "next";

import { Blueprint001Header } from "@/components/blueprint/ordered/001-header";
import { Blueprint002Hero } from "@/components/blueprint/ordered/002-hero";
import { Blueprint003Stats } from "@/components/blueprint/ordered/003-stats";
import { Blueprint004Projects } from "@/components/blueprint/ordered/004-projects";
import { Blueprint005Perspective } from "@/components/blueprint/ordered/005-perspective";
import { Blueprint006Differential } from "@/components/blueprint/ordered/006-differential";
import { Blueprint007Journey } from "@/components/blueprint/ordered/007-journey";
import { Blueprint008Operations } from "@/components/blueprint/ordered/008-operations";
import { Blueprint009Financing } from "@/components/blueprint/ordered/009-financing";
import { Blueprint010Experiences } from "@/components/blueprint/ordered/010-experiences";
import { Blueprint011Testimonials } from "@/components/blueprint/ordered/011-testimonials";
import { Blueprint012Offer } from "@/components/blueprint/ordered/012-offer";
import { Blueprint013FAQ } from "@/components/blueprint/ordered/013-faq";
import { Blueprint014FinalCTA } from "@/components/blueprint/ordered/014-final-cta";
import { Blueprint015Footer } from "@/components/blueprint/ordered/015-footer";
import "@/components/blueprint/experience/blueprint.css";

import { JsonLd } from "@/components/seo/json-ld";
import {
  blueprintExperience as content,
  selectBlueprintCases,
} from "@/lib/blueprint/experience";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { getPublicProperties } from "@/lib/properties";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";
import { mapPropertyToCard } from "@/types/property";

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

        <Blueprint001Header />

        <main>
          <Blueprint002Hero />
          <Blueprint003Stats properties={propertyCards} />
          <Blueprint004Projects
            projects={selectBlueprintCases(propertyCards)}
          />
          <Blueprint005Perspective />
          <Blueprint006Differential />
          <Blueprint007Journey />
          <Blueprint008Operations />
          <Blueprint009Financing />
          <Blueprint010Experiences />
          <Blueprint011Testimonials />
          <Blueprint012Offer
            form={blueprintForm.form}
            fields={blueprintForm.fields}
          />
          <Blueprint013FAQ />
          <Blueprint014FinalCTA />
        </main>

        <Blueprint015Footer settings={settings} />
      </div>
    </>
  );
}
