import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/lib/properties";

const DEFAULT_SITE_URL = "https://checkmateproperty.com";

function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function getLastModified(value?: string | Date | null) {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const properties = await getPublicProperties();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/lp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${siteUrl}/properties/${property.slug}`,
    lastModified: getLastModified(property.updated_at),
    changeFrequency: "weekly",
    priority: property.is_featured ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes];
}