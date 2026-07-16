import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getCanonicalSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/projects",
          "/properties",
          "/properties/",
          "/en/contact-us",
          "/lp",
          "/lp-br",
          "/aprenda",
          "/tutorial",
          "/privacy-policy",
          "/terms-of-use",
          "/data-policy",
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
