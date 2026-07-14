import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-settings";
import { getAbsoluteSiteUrl, getCanonicalSiteUrl } from "@/lib/site-url";

const DEFAULT_SITE_NAME = "Checkmate Property";

const DEFAULT_DESCRIPTION =
  "Checkmate Property is a real estate intelligence platform built to help investors search, analyze, and evaluate property opportunities across the United States.";

const DEFAULT_OG_IMAGE =
  "https://checkmateproperty.com/checkmate-property-og.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteUrl = getCanonicalSiteUrl();

  const siteName = settings.site_name?.trim() || DEFAULT_SITE_NAME;

  const description =
    settings.site_description?.trim() || DEFAULT_DESCRIPTION;

  const logoUrl = settings.logo_url
    ? getAbsoluteSiteUrl(settings.logo_url)
    : DEFAULT_OG_IMAGE;

  const faviconUrl = settings.favicon_url
    ? getAbsoluteSiteUrl(settings.favicon_url)
    : null;

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },

    description,

    applicationName: siteName,

    generator: "Next.js",

    referrer: "origin-when-cross-origin",

    creator: "Checkmate Real Estate Group",

    publisher: "Checkmate Real Estate Group",

    category: "Real Estate",

    keywords: [
      "Checkmate Property",
      "real estate investment platform",
      "property search",
      "real estate opportunities",
      "investment properties",
      "real estate analysis",
      "real estate projects",
      "property investment USA",
      "Massachusetts real estate",
      "New England real estate",
      "flip houses",
      "new construction",
      "ARV",
      "ROI",
      "real estate comps",
    ],

    alternates: {
      canonical: "/",
    },

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
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} — Real Estate Intelligence Platform`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: [logoUrl],
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
      telephone: false,
      address: false,
      email: false,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0E3541",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          id="rd-station-loader"
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/28965c7a-f3aa-4976-a78f-ea20ad5db0be-loader.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
