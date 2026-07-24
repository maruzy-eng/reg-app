import type { Metadata } from "next";

import { HOME_HERO_IMAGE, HOME_LOGO_COLOR } from "@/lib/home/branding";
import { SITE_CONTACT } from "@/lib/home/contact";
import { getCanonicalSiteUrl } from "@/lib/site-url";

export const SEO_SITE_NAME = "Checkmate REG";
export const SEO_ORG_NAME = "Checkmate Real Estate Group";
export const SEO_DEFAULT_OG_IMAGE = HOME_HERO_IMAGE;
export const SEO_LOGO = HOME_LOGO_COLOR;

export const SEO_DEFAULT_DESCRIPTION =
  "Checkmate REG connects technology, development, construction, and strategic partnerships across U.S. residential real estate.";

export const SEO_DEFAULT_KEYWORDS = [
  "Checkmate REG",
  "Checkmate Real Estate Group",
  "real estate Orlando",
  "U.S. real estate investment",
  "residential development",
  "flip house",
  "new construction",
  "construction management",
  "real estate strategy",
  "strategic partnerships",
] as const;

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  const siteUrl = getCanonicalSiteUrl();
  if (!path || path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = SEO_DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || SEO_DEFAULT_OG_IMAGE;
  const alt = imageAlt || `${title} | ${SEO_SITE_NAME}`;

  return {
    title,
    description,
    keywords: [...SEO_DEFAULT_KEYWORDS, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SEO_SITE_NAME}`,
      description,
      url,
      siteName: SEO_SITE_NAME,
      type,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SEO_SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function buildOrganizationJsonLd(sameAs: string[] = []) {
  const siteUrl = getCanonicalSiteUrl();
  const socialProfiles = sameAs.map((url) => url.trim()).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: SEO_ORG_NAME,
    alternateName: [SEO_SITE_NAME, "Checkmate Property"],
    url: `${siteUrl}/reg`,
    logo: SEO_LOGO,
    image: SEO_DEFAULT_OG_IMAGE,
    description: SEO_DEFAULT_DESCRIPTION,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6675 Westwood Blvd",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32821",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONTACT.phone,
        contactType: "customer service",
        email: SITE_CONTACT.email,
        areaServed: "US",
        availableLanguage: ["English", "Portuguese"],
      },
    ],
  };
}

export function buildWebsiteJsonLd() {
  const siteUrl = getCanonicalSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SEO_SITE_NAME,
    description: SEO_DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  authorName?: string | null;
  category?: string | null;
}) {
  const siteUrl = getCanonicalSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? [input.image] : [SEO_DEFAULT_OG_IMAGE],
    datePublished: input.publishedAt || undefined,
    dateModified: input.updatedAt || input.publishedAt || undefined,
    author: {
      "@type": "Person",
      name: input.authorName || SEO_SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: SEO_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    articleSection: input.category || undefined,
    inLanguage: "pt-BR",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  };
}
