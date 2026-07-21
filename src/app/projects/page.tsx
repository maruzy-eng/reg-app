import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  FileText,
  ImageIcon,
  MapPin,
  PlayCircle,
  Ruler,
} from "lucide-react";
import { getPublicProperties } from "@/lib/properties";
import { getCanonicalSiteUrl } from "@/lib/site-url";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  mapPropertyToCard,
} from "@/types/property";
import "./projects-page.css";

export const revalidate = 60;

const SITE_URL = getCanonicalSiteUrl();

const PAGE_TITLE = "Published Real Estate Projects | Checkmate Property";

const PAGE_DESCRIPTION =
  "Explore Checkmate Property published real estate projects, residential developments, investment opportunities, property media, floor plans, videos, and project details across the United States.";

const DEFAULT_OG_IMAGE =
  "https://checkmateproperty.com/checkmate-property-og.jpg";

const CHECKMATE_LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/site-assets/branding/logo-1783036134455-checkmate-logo-color.jpg";

const portfolioStats = [
  {
    id: "published-portfolio",
    label: "Published Portfolio",
    value: "2026",
    highlighted: false,
  },
  {
    id: "projected-sellout",
    label: "Projected Sellout",
    value: "$22.0M",
    highlighted: true,
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Checkmate Property projects",
    "published real estate projects",
    "real estate development portfolio",
    "investment properties",
    "property projects",
    "real estate opportunities",
    "residential developments",
    "Massachusetts real estate",
    "New England real estate",
    "flip house projects",
    "new construction projects",
    "property transparency",
    "real estate media",
    "floor plans",
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/projects`,
    siteName: "Checkmate Property",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Checkmate Property published real estate projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
    return "projects-status projects-status-sold";
  }

  if (normalizedStatus === "rented") {
    return "projects-status projects-status-rented";
  }

  if (normalizedStatus === "available") {
    return "projects-status projects-status-available";
  }

  if (normalizedStatus === "under_contract") {
    return "projects-status projects-status-under-contract";
  }

  if (normalizedStatus === "in_progress") {
    return "projects-status projects-status-in-progress";
  }

  return "projects-status projects-status-default";
}

function getStructuredData(properties: ReturnType<typeof mapPropertyToCard>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Checkmate Property",
        url: SITE_URL,
        logo: CHECKMATE_LOGO_URL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Checkmate Property",
        description:
          "Real estate intelligence platform for searching and evaluating property opportunities.",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/projects#collection`,
        url: `${SITE_URL}/projects`,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Published real estate projects",
          numberOfItems: properties.length,
          itemListElement: properties.map((property, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/properties/${property.slug}`,
            name: property.title,
          })),
        },
      },
    ],
  };
}

export default async function ProjectsPage() {
  const properties = await getPublicProperties();

  const propertyCards = properties.map(mapPropertyToCard);
  const structuredData = getStructuredData(propertyCards);

  return (
    <main className="projects-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ProjectsHeader />

      <div className="projects-grid-bg">
        <section className="projects-hero">
          <div className="projects-hero-glow" />

          <div className="projects-container projects-hero-container">
            <div className="projects-hero-content">
              <div className="projects-eyebrow">
                <span />
                Checkmate Property Portfolio
              </div>

              <h1>
                Real-Time Visibility Into Every
                <strong> Published Property Project</strong>
              </h1>

              <p>
                Follow Checkmate Property projects with clear public
                information, project media, location details, property type,
                videos, floor plans, and organized pages for each address.
              </p>

              <div className="projects-hero-actions">
                <Link href="#projects" className="projects-primary-button">
                  Explore Projects
                </Link>

                <Link href="#how-it-works" className="projects-secondary-button">
                  See How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-list-section">
          <div className="projects-container">
            <div className="projects-section-header projects-section-header-centered">
              <p>Checkmate Property Projects</p>

              <h2>Technology Built by Those Who Live the Real Estate Market</h2>

              <span>
                At Checkmate Property, we understand your challenges because we
                work directly in fix-and-flips and new construction, using our
                own technology and data in real-world projects. Now, we are
                making that same technology available to others in the industry.
                <br />
                Explore our 2026 projects, including active developments,
                available opportunities, rented assets, and sold properties.
              </span>
            </div>

            <div className="projects-portfolio-card projects-portfolio-card-centered">
              <div>
                <p>
                  <span />
                  2026 Portfolio
                </p>

                <h3>2026 Development Portfolio</h3>
              </div>

              <div className="projects-portfolio-stats-grid">
                {portfolioStats.map((stat) => (
                  <div
                    key={stat.id}
                    className={
                      stat.highlighted
                        ? "projects-portfolio-stat projects-portfolio-stat-highlighted"
                        : "projects-portfolio-stat"
                    }
                  >
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {propertyCards.length > 0 ? (
              <div className="projects-property-grid">
                {propertyCards.map((property) => {
                  const propertyUrl = `/properties/${property.slug}?from=projects`;

                  return (
                    <article key={property.id} className="projects-property-card">
                      <Link
                        href={propertyUrl}
                        aria-label={`Open property ${property.title}`}
                        className="projects-property-image"
                      >
                        {property.imageUrl ? (
                          <Image
                            src={property.imageUrl}
                            alt={`${property.title} real estate project in ${property.city}, ${property.state}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="projects-property-placeholder">
                            <Building2 size={54} />
                          </div>
                        )}
                      </Link>

                      <div className="projects-property-body">
                        <Link href={propertyUrl} className="projects-price-link">
                          <h3>
                            {property.condActive && property.condListedPrice
                              ? property.condListedPrice
                              : formatCurrency(property.price)}
                          </h3>
                        </Link>

                        {property.condActive ? (
                          <>
                            {property.condSqft != null ? (
                              <div className="projects-property-specs">
                                <span>
                                  <Ruler size={14} />
                                  {formatNumber(property.condSqft)} sqft
                                </span>
                              </div>
                            ) : null}

                            {property.condAvgPrice ? (
                              <p className="projects-property-avg-price">
                                Avg. Price: {property.condAvgPrice}
                              </p>
                            ) : null}
                          </>
                        ) : (
                          <div className="projects-property-specs">
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
                        )}

                        <Link href={propertyUrl} className="projects-address">
                          <MapPin size={14} />

                          <span>
                            {property.address}, {property.city},{" "}
                            {property.state}
                          </span>
                        </Link>

                        <div className="projects-property-footer">
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
              <div className="projects-empty-state">
                <Building2 size={54} />

                <h3>No published projects yet</h3>

                <p>
                  Publish properties in the admin panel to display them on this
                  public projects page.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="projects-how-section">
          <div className="projects-dark-grid" />

          <div className="projects-glow projects-glow-left" />
          <div className="projects-glow projects-glow-right" />

          <div className="projects-container projects-how-content">
            <div className="projects-how-header">
              <p>How It Works</p>

              <h2>A Simple Public View of Each Project.</h2>

              <span>
                Each property page organizes available project information in
                one place for easier public access, stronger transparency, and a
                better presentation of each address.
              </span>
            </div>

            <div className="projects-process-grid">
              <ProcessCard
                icon={<CheckCircle2 size={22} />}
                number="01"
                title="Property Listed"
                description="The project is published with address, city, state, type, pricing, specifications, and main image."
              />

              <ProcessCard
                icon={<ImageIcon size={22} />}
                number="02"
                title="Media Added"
                description="Photos, videos, and visual updates are attached when they are available."
              />

              <ProcessCard
                icon={<FileText size={22} />}
                number="03"
                title="Documents"
                description="Floor plans or project files can be added to the public project page."
              />

              <ProcessCard
                icon={<PlayCircle size={22} />}
                number="04"
                title="Transparency"
                description="Each address gets its own page with organized information and project visibility."
              />
            </div>
          </div>
        </section>
      </div>

      <ProjectsFooter />
    </main>
  );
}

function ProjectsHeader() {
  return (
    <header className="projects-header">
      <div className="projects-header-inner">
        <Link href="/" className="projects-header-logo-link">
          <Image
            src={CHECKMATE_LOGO_URL}
            alt="Checkmate Property"
            width={180}
            height={44}
            sizes="(max-width: 720px) 180px, 155px"
            className="projects-header-logo"
            priority
          />
        </Link>

        <nav aria-label="Projects navigation" className="projects-header-nav">
          <Link href="/projects" className="projects-header-link">
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProjectsFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="projects-copyright-section">
      <div className="projects-copyright-inner">
        <p>{currentYear} © Checkmate Property Inc.</p>
        <span>Smarter real estate decisions.</span>
      </div>
    </footer>
  );
}

function ProcessCard({
  icon,
  number,
  title,
  description,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="projects-process-card">
      <div className="projects-process-icon">{icon}</div>

      <span>{number}</span>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}
