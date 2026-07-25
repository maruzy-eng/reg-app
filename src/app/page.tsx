import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { mapHomeSettings } from "@/lib/home/settings";
import { getPublicProperties } from "@/lib/properties";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_KEYWORDS,
  buildPageMetadata,
} from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";
import { mapPropertyToCard } from "@/types/property";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Real Estate Strategy and Development",
    description: SEO_DEFAULT_DESCRIPTION,
    path: "/",
    keywords: [...SEO_DEFAULT_KEYWORDS],
  }),
  title: {
    absolute: "Checkmate REG | Real Estate Strategy and Development",
  },
};

export default async function RootPage() {
  const [settings, properties] = await Promise.all([
    getSiteSettings(),
    getPublicProperties(),
  ]);

  return (
    <HomePage
      settings={mapHomeSettings(settings)}
      properties={properties.map(mapPropertyToCard)}
    />
  );
}
