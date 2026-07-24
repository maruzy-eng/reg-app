import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SitePixels } from "@/components/site-pixels";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_KEYWORDS,
  SEO_DEFAULT_OG_IMAGE,
  SEO_SITE_NAME,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";
import { getAbsoluteSiteUrl, getCanonicalSiteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteUrl = getCanonicalSiteUrl();
  const siteName = settings.site_name?.trim() || SEO_SITE_NAME;
  const description =
    settings.site_description?.trim() || SEO_DEFAULT_DESCRIPTION;

  const ogImage = settings.logo_url
    ? getAbsoluteSiteUrl(settings.logo_url)
    : SEO_DEFAULT_OG_IMAGE;

  const faviconUrl = settings.favicon_url
    ? getAbsoluteSiteUrl(settings.favicon_url)
    : null;

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: `${siteName} | Real Estate Strategy and Development`,
      template: `%s | ${siteName}`,
    },

    description,

    applicationName: siteName,

    referrer: "origin-when-cross-origin",

    creator: "Checkmate Real Estate Group",

    publisher: "Checkmate Real Estate Group",

    category: "Real Estate",

    keywords: [...SEO_DEFAULT_KEYWORDS],

    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : {
          icon: "/favicon.ico",
          shortcut: "/favicon.ico",
          apple: "/apple-touch-icon.png",
        },

    openGraph: {
      title: `${siteName} | Real Estate Strategy and Development`,
      description,
      url: `${siteUrl}/reg`,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} — Real Estate Strategy and Development`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Real Estate Strategy and Development`,
      description,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    appleWebApp: {
      capable: true,
      title: siteName,
      statusBarStyle: "default",
    },

    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070707",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const sameAs = [
    settings.facebook_url,
    settings.instagram_url,
    settings.linkedin_url,
    settings.youtube_url,
  ]
    .map((value) => value?.trim() || "")
    .filter(Boolean);

  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <JsonLd
          id="organization-schema"
          data={buildOrganizationJsonLd(sameAs)}
        />
        <JsonLd id="website-schema" data={buildWebsiteJsonLd()} />

        {children}

        <SitePixels
          metaPixelId={
            process.env.NEXT_PUBLIC_META_PIXEL_ID || settings.meta_pixel_id
          }
          googleTagId={settings.google_tag_id}
        />

        <Script
          id="rd-station-loader"
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/28965c7a-f3aa-4976-a78f-ea20ad5db0be-loader.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
