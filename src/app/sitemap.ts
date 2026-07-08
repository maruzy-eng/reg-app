import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/lib/properties";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const properties = await getPublicProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${siteUrl}/properties/${property.slug}`,
    lastModified: property.updated_at
      ? new Date(property.updated_at)
      : new Date(),
    changeFrequency: "weekly",
    priority: property.is_featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}