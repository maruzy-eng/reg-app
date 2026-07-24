import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomeProjects } from "@/components/home/home-projects";
import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import { mapHomeSettings } from "@/lib/home/settings";
import { getPublicProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/site-settings";
import { mapPropertyToCard } from "@/types/property";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Explore Checkmate REG residential projects across the United States, from development strategy to construction execution.",
  path: "/projects",
  keywords: ["real estate projects", "residential development projects", "Checkmate projects"],
});

export default async function ProjectsPage() {
  const [rawSettings, properties] = await Promise.all([
    getSiteSettings(),
    getPublicProperties(),
  ]);

  const settings = mapHomeSettings(rawSettings);

  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow="Projects"
        title="Real projects."
        titleAccent="Real execution."
        description="Fix-and-flip and new construction projects developed and executed by Checkmate in 2026 — powered by our own technology and data at every stage."
        ctaHref="/contact"
        ctaLabel="Talk to Our Team"
      />

      <HomeProjects properties={properties.map(mapPropertyToCard)} />
    </SiteShell>
  );
}
