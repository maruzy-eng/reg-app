import type { Metadata } from "next";

import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { SiteShell } from "@/components/home/site-shell";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
} from "@/components/home/home-ui";
import { PageHero } from "@/components/home/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { mapHomeSettings } from "@/lib/home/settings";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Blueprint — Compra parcelada",
  description:
    "Adquira o Programa BluePrint com pagamento parcelado. Preencha o formulário para garantir sua vaga.",
  path: "/compra-parcelada",
  keywords: [
    "Checkmate Blueprint",
    "compra parcelada",
    "Blueprint parcelado",
    "programa Blueprint",
  ],
});

export default async function CompraParceladaPage() {
  const [rawSettings, parceladaForm] = await Promise.all([
    getSiteSettings(),
    getPublishedFormByPageKey("blueprint-parcelada"),
  ]);

  const settings = mapHomeSettings(rawSettings);
  const { form, fields } = parceladaForm;

  return (
    <SiteShell settings={settings}>
      <JsonLd
        id="compra-parcelada-breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Compra parcelada", path: "/compra-parcelada" },
        ])}
      />

      <PageHero
        eyebrow="Checkmate Blueprint"
        title="Adquira o Programa BluePrint"
        titleAccent="com pagamento parcelado."
        description="Preencha o formulário abaixo para garantir sua vaga."
        ctaHref="#formulario"
        ctaLabel="Garantir minha vaga"
      />

      <HomeSection tone="cream" id="formulario">
        <HomeContainer>
          <div className="mx-auto max-w-[720px]">
            <div
              data-reveal
              className={cx(homeReveal(), "mb-10 text-center sm:mb-12")}
            >
              <span className={cx(homeEyebrowLight, "justify-center")}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Inscrição
              </span>
              <h2 className={cx("mt-5", homeSectionTitle)}>
                Preencha o formulário abaixo para garantir sua vaga.
              </h2>
              <p className={cx("mx-auto mt-4 max-w-[540px]", homeBody)}>
                Adquira o Programa BluePrint com pagamento parcelado. Nossa
                equipe recebe sua inscrição e retorna com os próximos passos.
              </p>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(1),
                "rounded-[30px] border border-black/[0.07] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(15,15,15,0.06)] sm:px-9 sm:py-10",
              )}
            >
              {form ? (
                <DynamicFormComponent form={form} fields={fields} />
              ) : (
                <div className="rounded-[24px] border border-dashed border-black/15 bg-[#f8f6f1] px-6 py-12 text-center">
                  <p className="text-[0.95rem] text-[#68635b]">
                    O formulário ainda não está publicado. Conecte o formulário
                    “Blueprint - Compra parcelada” na área administrativa de
                    Forms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </HomeContainer>
      </HomeSection>
    </SiteShell>
  );
}
