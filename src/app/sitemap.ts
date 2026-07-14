import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/lib/properties";
import { getCanonicalSiteUrl } from "@/lib/site-url";

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

function getStaticRoutes(siteUrl: string): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/en/contact-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms-of-use`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/data-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/lp`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/lp-br`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tutorial`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/aprenda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

async function getPropertyRoutes(siteUrl: string): Promise<MetadataRoute.Sitemap> {
  try {
    const properties = await getPublicProperties();
    const usedSlugs = new Set<string>();

    return properties.flatMap((property) => {
      const slug = property.slug?.trim();

      if (!slug || usedSlugs.has(slug)) {
        return [];
      }

      usedSlugs.add(slug);

      return [
        {
          url: `${siteUrl}/properties/${encodeURIComponent(slug)}`,
          lastModified: getLastModified(property.updated_at),
          changeFrequency: "weekly" as const,
          priority: property.is_featured ? 0.9 : 0.7,
        },
      ];
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error building property sitemap routes:", message);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getCanonicalSiteUrl();
  const staticRoutes = getStaticRoutes(siteUrl);
  const propertyRoutes = await getPropertyRoutes(siteUrl);

  return [...staticRoutes, ...propertyRoutes];
}
