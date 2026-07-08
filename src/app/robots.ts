import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://checkmateproperty.com";

function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/projects",
          "/properties",
          "/lp",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/forms",
          "/forms/",
          "/search-thanks-you",
          "/lp-obrigado",
          "/_next/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}