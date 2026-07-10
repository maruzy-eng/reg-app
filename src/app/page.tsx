import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  BrainCircuit,
  Building2,
  ChartNoAxesColumnIncreasing,
  Check,
  Ellipsis,
  Gift,
  Home,
  HousePlus,
  Mail,
  MapPin,
  Ruler,
  Search,
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
import "./home-page.css";

export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://checkmateproperty.com";

const HOME_TITLE =
  "Checkmate Property | Real Estate Investment Search Platform";

const HOME_DESCRIPTION =
  "Search real estate opportunities, investment properties, development projects, comps, ARV, ROI, and market data with Checkmate Property.";

const DEFAULT_HERO_IMAGE =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/property-media/properties/4great-rock-f8d8d89155f740bb8eeeefc6049e3a18-uncropped_scaled_within_1536_1152.webp";

const heroFeatures = [
  {
    id: "skip-trace",
    label: "Skip Trace",
    icon: Search,
    tone: "green",
  },
  {
    id: "direct-mail",
    label: "Direct Mail Postcards",
    icon: Mail,
    tone: "blue",
  },
  {
    id: "flip-new-construction",
    label: "Flip & New Construction Analysis",
    icon: HousePlus,
    tone: "green",
  },
  {
    id: "comps-market-data",
    label: "Comps & Market Data",
    icon: ChartNoAxesColumnIncreasing,
    tone: "blue",
  },
  {
    id: "artificial-intelligence",
    label: "Artificial Intelligence",
    icon: BrainCircuit,
    tone: "green",
  },
  {
    id: "many-more",
    label: "And Many More",
    icon: Ellipsis,
    tone: "blue",
  },
];

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
    return "home-status home-status-sold";
  }

  if (normalizedStatus === "rented") {
    return "home-status home-status-rented";
  }

  if (normalizedStatus === "available") {
    return "home-status home-status-available";
  }

  if (normalizedStatus === "under_contract") {
    return "home-status home-status-under-contract";
  }

  if (normalizedStatus === "in_progress") {
    return "home-status home-status-in-progress";
  }

  return "home-status home-status-default";
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
    <main className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <PublicHeader settings={settings} />

      <section className="home-hero">
        <Image
          src={heroImage}
          alt="Checkmate Property real estate search"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="home-hero-image"
        />

        <div className="home-hero-overlay" />
        <div className="home-hero-glow" />

        <div className="home-hero-inner">
          <div className="home-hero-badge">
            <span />
            Real Estate Intelligence Search
          </div>

          <h1>Find your next real estate opportunity.</h1>

          <p>
            Search Checkmate Property projects by address, city, property type,
            status, price, beds, baths, or square footage.
          </p>

          <div className="home-hero-features">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.id}
                  className={
                    index < heroFeatures.length - 1
                      ? "home-hero-feature home-hero-feature-bordered"
                      : "home-hero-feature"
                  }
                >
                  <div className="home-hero-feature-icon">
                    <Icon
                      className={
                        feature.tone === "green"
                          ? "home-icon-green"
                          : "home-icon-blue"
                      }
                      size={36}
                      strokeWidth={1.9}
                    />
                  </div>

                  <p>{feature.label}</p>
                </div>
              );
            })}
          </div>

          <div className="home-search-shell">
            <HeroLocationSearch searchForm={searchForm} />
          </div>

          <div className="home-signup-card">
            <div className="home-signup-main">
              <div className="home-signup-icon">
                <Gift size={42} strokeWidth={1.8} />
              </div>

              <div>
                <p className="home-signup-title">Free Sign Up</p>

                <p className="home-signup-text">
                  Create your free account and start accessing powerful real
                  estate tools.
                </p>
              </div>
            </div>

            <div className="home-signup-list">
              <div>
                <Check size={18} />
                No credit card required
              </div>

              <div>
                <Check size={18} />
                Access core features
              </div>

              <div>
                <Check size={18} />
                Upgrade anytime
              </div>
            </div>

            <Link
              href="https://app.checkmateproperty.com"
              className="home-signup-button"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="home-projects-section">
        <div className="home-projects-container">
          <div className="home-projects-header">
            <p>Checkmate Property Projects</p>

            <h2>
              Technology Built by Those Who Live the Real Estate Market
            </h2>

            <span>
              At Checkmate Property, we understand your challenges because we
              work directly in fix-and-flips and new construction, using our own
              technology and data in real-world projects. Now, we are making
              that same technology available to others in the industry.
            </span>
          </div>

          {propertyCards.length > 0 ? (
            <div className="home-property-grid">
              {propertyCards.map((property) => {
                const propertyUrl = `/properties/${property.slug}?from=home`;

                return (
                  <article key={property.id} className="home-property-card">
                    <Link
                      href={propertyUrl}
                      aria-label={`Open property ${property.title}`}
                      className="home-property-image"
                    >
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={`${property.title} real estate property in ${property.city}, ${property.state}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="home-property-placeholder">
                          <Building2 size={54} />
                        </div>
                      )}
                    </Link>

                    <div className="home-property-body">
                      <Link href={propertyUrl} className="home-price-link">
                        <h3>{formatCurrency(property.price)}</h3>
                      </Link>

                      <div className="home-property-specs">
                        <span>
                          <BedDouble size={14} />
                          {formatNumber(property.bedrooms)} beds
                        </span>

                        <span>
                          <Bath size={14} />
                          {formatNumber(property.bathrooms)} baths
                        </span>

                        <span>
                          <Ruler size={14} />
                          {formatNumber(property.sqft)} sqft
                        </span>
                      </div>

                      <Link href={propertyUrl} className="home-property-address">
                        <MapPin size={14} />
                        <span>
                          {property.address}, {property.city}, {property.state}
                        </span>
                      </Link>

                      <div className="home-property-footer">
                        <span className={getStatusClassName(property.status)}>
                          {getPropertyStatusLabel(property.status)}
                        </span>

                        <Link href={propertyUrl}>View details →</Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="home-empty-state">
              <div>
                <Home size={32} />
              </div>

              <h2>No properties available yet</h2>

              <p>
                Publish properties from the admin panel to display them on the
                homepage.
              </p>

              <Link href="/admin/properties">Open Admin</Link>
            </div>
          )}
        </div>
      </section>

      <PublicFooter settings={settings} />
    </main>
  );
}