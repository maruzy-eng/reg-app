import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import { NewsCard } from "@/components/news/news-card";
import { HomeContainer } from "@/components/home/home-ui";
import { mapHomeSettings } from "@/lib/home/settings";
import { getPublishedPosts } from "@/lib/news";
import { getSiteSettings } from "@/lib/site-settings";
import { mapPostToCard } from "@/types/news";

export const metadata: Metadata = buildPageMetadata({
  title: "News",
  description:
    "Insights and updates from Checkmate REG on Flip Houses, New Construction, financing, and U.S. real estate strategy.",
  path: "/news",
  keywords: ["real estate news", "flip house insights", "new construction market"],
});

export default async function NewsPage() {
  const [rawSettings, posts] = await Promise.all([
    getSiteSettings(),
    getPublishedPosts(),
  ]);

  const settings = mapHomeSettings(rawSettings);
  const cards = posts.map(mapPostToCard);
  const [featured, ...rest] = cards;

  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow="News"
        title="Insights and updates"
        titleAccent="from the ecosystem."
        description="Content on Flip Houses, New Construction, structure, and operations in the U.S. real estate market."
        ctaHref="/blueprint"
        ctaLabel="Explore Blueprint"
      />

      <section className="bg-[#f8f6f1] py-16 sm:py-20 lg:py-24">
        <HomeContainer>
          {featured ? (
            <div className="mb-8 lg:mb-10">
              <NewsCard post={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : null}

          {cards.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-black/15 bg-white px-6 py-16 text-center">
              <p className="text-[0.95rem] text-[#68635b]">
                The first Checkmate News articles will be published soon.
              </p>
            </div>
          ) : null}
        </HomeContainer>
      </section>
    </SiteShell>
  );
}
