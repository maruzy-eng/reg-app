import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  Home,
  MapPin,
  Ruler,
} from "lucide-react";
import { getPublicProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/site-settings";
import { getPublishedFormBySlug } from "@/lib/forms";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { HeroLocationSearch } from "@/components/public/hero-location-search";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  mapPropertyToCard,
} from "@/types/property";

export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://checkmateproperty.com";

const HOME_TITLE =
  "Checkmate Property | Real Estate Investment Search Platform";

const HOME_DESCRIPTION =
  "Search real estate opportunities, investment properties, development projects, comps, ARV, ROI, and market data with Checkmate Property.";

const DEFAULT_HERO_IMAGE =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/property-media/properties/4great-rock-f8d8d89155f740bb8eeeefc6049e3a18-uncropped_scaled_within_1536_1152.webp";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    "Checkmate Property",
    "real estate investment platform",
    "property search",
    "investment properties",
    "real estate opportunities",
    "real estate projects",
    "Massachusetts real estate",
    "New England real estate",
    "ARV",
    "ROI",
    "real estate comps",
    "flip houses",
    "new construction",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: "Checkmate Property",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Checkmate Property real estate investment search platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_HERO_IMAGE],
  },
  robots: {
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

function getStatusClassName(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "sold") {
    return "bg-[#101820] text-white";
  }

  if (normalizedStatus === "rented") {
    return "bg-violet-50 text-violet-700";
  }

  if (normalizedStatus === "available") {
    return "bg-emerald-50 text-[#0e3541]";
  }

  if (normalizedStatus === "under_contract") {
    return "bg-amber-50 text-amber-700";
  }

  if (normalizedStatus === "in_progress") {
    return "bg-sky-50 text-[#0e3541]";
  }

  return "bg-sky-50 text-[#0e3541]";
}

function getStructuredData(propertyCount: number) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Checkmate Property",
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
        sameAs: ["https://checkmateproperty.com"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Checkmate Property",
        description: HOME_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/#homepage`,
        url: SITE_URL,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Public real estate opportunities",
          numberOfItems: propertyCount,
        },
      },
    ],
  };
}

export default async function HomePage() {
  const [properties, settings, searchFormResult] = await Promise.all([
    getPublicProperties(),
    getSiteSettings(),
    getPublishedFormBySlug("search"),
  ]);

  const propertyCards = properties.map(mapPropertyToCard);

  const heroImage =
    propertyCards.find((property) => property.imageUrl)?.imageUrl ||
    DEFAULT_HERO_IMAGE;

  const searchForm = searchFormResult.form
    ? {
        form: searchFormResult.form,
        fields: searchFormResult.fields,
      }
    : null;

  const structuredData = getStructuredData(propertyCards.length);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <PublicHeader settings={settings} />

      <section
        className="relative z-30 flex min-h-[560px] items-center justify-center overflow-visible bg-[#0e3541] px-4 py-16 text-white sm:px-5 md:min-h-[590px] md:py-20"
      >
        <Image
          src={heroImage}
          alt="Checkmate Property real estate search"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(14,53,65,0.54),rgba(14,53,65,0.58))]" />

        <div className="relative z-40 mx-auto w-full max-w-5xl text-center">
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/18 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur sm:text-xs">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#53bc76] shadow-[0_0_0_6px_rgba(83,188,118,0.18)]" />
            Real Estate Intelligence Search
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-[42px] font-semibold leading-[0.98] tracking-[-0.065em] text-white sm:text-[52px] md:text-[72px]">
            Find your next real estate opportunity.
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm font-normal leading-7 text-white/86 sm:text-base md:text-lg">
            Search Checkmate Property projects by address, city, property type,
            status, price, beds, baths, or square footage.
          </p>

          <HeroLocationSearch searchForm={searchForm} />
        </div>
      </section>

      <section
        id="projects"
        className="relative z-0 bg-white px-4 py-12 sm:px-5 md:py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(83,188,118,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,175,242,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      >
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#53bc76]">
              Public projects
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-[#0e3541] sm:text-4xl">
              Explore real estate investment opportunities.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#587469] sm:text-base">
              Browse published Checkmate Property projects and review key
              property details, pricing, status, location, bedrooms, bathrooms,
              square footage, and media.
            </p>
          </div>

          {propertyCards.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {propertyCards.map((property) => {
                const propertyUrl = `/properties/${property.slug}?from=home`;

                return (
                  <article
                    key={property.id}
                    className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_48px_rgba(17,17,17,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(17,17,17,0.12)]"
                  >
                    <Link
                      href={propertyUrl}
                      aria-label={`Open property ${property.title}`}
                      className="relative block h-[220px] overflow-hidden bg-gray-100 sm:h-[235px]"
                    >
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={`${property.title} real estate property in ${property.city}, ${property.state}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#39aff2]">
                          <Building2 size={54} />
                        </div>
                      )}
                    </Link>

                    <div className="p-5">
                      <Link href={propertyUrl} className="block">
                        <h3 className="text-[27px] font-semibold leading-none tracking-[-0.045em] text-[#101820]">
                          {formatCurrency(property.price)}
                        </h3>
                      </Link>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-[#516675]">
                        <span className="inline-flex items-center gap-1.5">
                          <BedDouble size={14} />
                          {formatNumber(property.bedrooms)} beds
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Bath size={14} />
                          {formatNumber(property.bathrooms)} baths
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Ruler size={14} />
                          {formatNumber(property.sqft)} sqft
                        </span>
                      </div>

                      <Link
                        href={propertyUrl}
                        className="mt-3 flex items-start gap-2"
                      >
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0 text-[#64748b]"
                        />

                        <span className="text-[13px] font-normal leading-5 text-[#64748b]">
                          {property.address}, {property.city}, {property.state}
                        </span>
                      </Link>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                        <span
                          className={`inline-flex min-h-[30px] items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClassName(
                            property.status,
                          )}`}
                        >
                          {getPropertyStatusLabel(property.status)}
                        </span>

                        <Link
                          href={propertyUrl}
                          className="shrink-0 text-[13px] font-semibold text-[#101820]"
                        >
                          View details →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[28px] border border-dashed border-black/15 bg-white p-8 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#39aff2]">
                <Home size={32} />
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#101820]">
                No properties available yet
              </h2>

              <p className="mt-2 text-sm font-normal leading-6 text-gray-500">
                Publish properties from the admin panel to display them on the
                homepage.
              </p>

              <Link
                href="/admin/properties"
                className="mt-6 inline-flex rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-5 py-3 text-sm font-bold !text-white"
              >
                Open Admin
              </Link>
            </div>
          )}
        </div>
      </section>

      <PublicFooter settings={settings} />
    </main>
  );
}
