import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import { HomeContainer } from "@/components/home/home-ui";
import { ProductCard } from "@/components/products/product-card";
import { mapHomeSettings } from "@/lib/home/settings";
import { getPublishedProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/site-settings";
import { mapProductToCard } from "@/types/products";

export const metadata: Metadata = buildPageMetadata({
  title: "Products",
  description:
    "Explore Checkmate REG products and offers designed for investors and partners in the U.S. real estate market.",
  path: "/produtos",
  keywords: ["Checkmate products", "real estate offers"],
});

export default async function ProdutosPage() {
  const [rawSettings, products] = await Promise.all([
    getSiteSettings(),
    getPublishedProducts(),
  ]);

  const settings = mapHomeSettings(rawSettings);
  const cards = products.map(mapProductToCard);

  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow="Produtos"
        title="Soluções do"
        titleAccent="ecossistema."
        description="Produtos e ofertas disponíveis no ecossistema Checkmate."
        ctaHref="/contact"
        ctaLabel="Falar com a equipe"
      />

      <section className="bg-[#f8f6f1] py-16 sm:py-20 lg:py-24">
        <HomeContainer>
          {cards.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-black/15 bg-white px-6 py-16 text-center">
              <p className="text-[0.95rem] text-[#68635b]">
                Em breve publicaremos os primeiros produtos.
              </p>
            </div>
          )}
        </HomeContainer>
      </section>
    </SiteShell>
  );
}
