import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BlueprintPage } from "@/components/blueprint/blueprint-page";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { getPublicProperties } from "@/lib/properties";
import { mapPropertyToCard } from "@/types/property";
import { getSiteSettings } from "@/lib/site-settings";
import { JsonLd } from "@/components/seo/json-ld";
import { blueprintExperience } from "@/lib/blueprint/experience";

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

  return (
    <>
      <JsonLd
        id="blueprint-faq-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "pt-BR",
          mainEntity: blueprintExperience.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <BlueprintPage
        properties={properties.map(mapPropertyToCard)}
        form={blueprintForm.form}
        fields={blueprintForm.fields}
        settings={settings}
      />
    </>
  );
}
