import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  PlayCircle,
  Ruler,
} from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import { getPublicPropertyComplementBlocks } from "@/lib/property-complements";
import { getSiteSettings } from "@/lib/site-settings";
import {
  PropertyImageCarousel,
  type PropertyCarouselImage,
} from "@/components/public/property-image-carousel";
import { PropertyBackButton } from "@/components/public/property-back-button";
import { PropertyLeadForm } from "@/components/public/property-lead-form";
import {
  formatCurrency,
  formatNumber,
  getMainPropertyImage,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";

export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://checkmateproperty.com";

const DEFAULT_DESCRIPTION =
  "Explore real estate investment opportunities, property details, media, videos, floor plans and market information with Checkmate Property.";

type PropertyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type PropertyImageWithMediaGroup = {
  id?: string | null;
  image_url?: string | null;
  url?: string | null;
  src?: string | null;
  alt_text?: string | null;
  alt?: string | null;
  title?: string | null;
  caption?: string | null;
  position?: number | null;
  is_cover?: boolean | null;
  media_group?: string | null;
};

function getAbsoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) {
    return SITE_URL;
  }

  try {
    return new URL(pathOrUrl).toString();
  } catch {
    try {
      return new URL(pathOrUrl, SITE_URL).toString();
    } catch {
      return SITE_URL;
    }
  }
}

function stripHtml(value?: string | null) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value: string, maxLength = 155) {
  const cleanValue = stripHtml(value);

  if (cleanValue.length <= maxLength) {
    return cleanValue;
  }

  return `${cleanValue.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
}

function getPropertySeoDescription({
  metaDescription,
  shortDescription,
  description,
  fallback,
}: {
  metaDescription?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  fallback?: string | null;
}) {
  return (
    truncateText(metaDescription || "") ||
    truncateText(shortDescription || "") ||
    truncateText(description || "") ||
    truncateText(fallback || "") ||
    DEFAULT_DESCRIPTION
  );
}

function getPropertyLocationText(property: {
  address_line_1?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
}) {
  return [
    property.address_line_1,
    property.city,
    property.state,
    property.zip_code,
  ]
    .filter(Boolean)
    .join(", ");
}

function getSeoTitle({
  metaTitle,
  title,
  city,
  state,
}: {
  metaTitle?: string | null;
  title: string;
  city?: string | null;
  state?: string | null;
}) {
  if (metaTitle?.trim()) {
    return metaTitle.trim();
  }

  const location = [city, state].filter(Boolean).join(", ");

  if (location) {
    return `${title} | Real Estate Opportunity in ${location}`;
  }

  return `${title} | Real Estate Opportunity`;
}

function cleanRichDescription(description?: string | null) {
  if (!description) {
    return "";
  }

  return description
    .replace(/&nbsp;/g, " ")
    .replace(/<div><br><\/div>/g, "<br />")
    .replace(/<div><br\/><\/div>/g, "<br />")
    .replace(/<div><br \/><\/div>/g, "<br />")
    .replace(/<div>\s*<\/div>/g, "")
    .trim();
}

function normalizeCarouselImages({
  propertyTitle,
  mainImage,
  galleryImages,
}: {
  propertyTitle: string;
  mainImage: string | null;
  galleryImages: unknown[];
}): PropertyCarouselImage[] {
  const images: PropertyCarouselImage[] = [];
  const usedUrls = new Set<string>();

  function addImage(params: {
    id: string;
    src?: string | null;
    alt?: string | null;
    title?: string | null;
    caption?: string | null;
  }) {
    if (!params.src) {
      return;
    }

    if (usedUrls.has(params.src)) {
      return;
    }

    usedUrls.add(params.src);

    images.push({
      id: params.id,
      src: params.src,
      alt: params.alt || propertyTitle,
      title: params.title || null,
      caption: params.caption || null,
    });
  }

  addImage({
    id: "main-image",
    src: mainImage,
    alt: propertyTitle,
    title: propertyTitle,
  });

  galleryImages.forEach((image, index) => {
    if (typeof image === "string") {
      addImage({
        id: `gallery-image-${index}`,
        src: image,
        alt: propertyTitle,
      });

      return;
    }

    if (image && typeof image === "object") {
      const item = image as PropertyImageWithMediaGroup;

      addImage({
        id: item.id || `gallery-image-${index}`,
        src: item.image_url || item.url || item.src,
        alt: item.alt_text || item.alt || propertyTitle,
        title: item.title || null,
        caption: item.caption || null,
      });
    }
  });

  return images;
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The property you are looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const settings = await getSiteSettings();
  const mainImage = getMainPropertyImage(property);
  const propertyUrl = `/properties/${property.slug}`;
  const absolutePropertyUrl = getAbsoluteUrl(propertyUrl);

  const title = getSeoTitle({
    metaTitle: property.meta_title,
    title: property.title,
    city: property.city,
    state: property.state,
  });

  const description = getPropertySeoDescription({
    metaDescription: property.meta_description,
    shortDescription: property.short_description,
    description: property.description,
    fallback: settings.site_description,
  });

  const imageUrl = mainImage ? getAbsoluteUrl(mainImage) : undefined;

  return {
    title,
    description,
    keywords: [
      property.title,
      property.city,
      property.state,
      property.address_line_1,
      "Checkmate Property",
      "real estate investment",
      "investment property",
      "property opportunity",
      "real estate project",
      "property details",
      "real estate comps",
      "ARV",
      "ROI",
      "flip house",
      "new construction",
    ].filter(Boolean) as string[],
    alternates: {
      canonical: propertyUrl,
    },
    openGraph: {
      title,
      description,
      url: absolutePropertyUrl,
      siteName: "Checkmate Property",
      type: "article",
      locale: "en_US",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${property.title} — ${getPropertyLocationText(property)}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
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
}

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

function isUploadedVideoUrl(value: string) {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(value);
}

function getYouTubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtube.com" && url.pathname.startsWith("/embed/")) {
      return value;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId = url.searchParams.get("v");

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function getVimeoEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname !== "vimeo.com" && hostname !== "player.vimeo.com") {
      return null;
    }

    if (hostname === "player.vimeo.com") {
      return value;
    }

    const videoId = url.pathname.split("/").filter(Boolean)[0];

    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  } catch {
    return null;
  }
}

function getVideoEmbedUrl(value: string) {
  return getYouTubeEmbedUrl(value) || getVimeoEmbedUrl(value);
}

function PropertyFactCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#53bc76]/20 bg-white p-5 shadow-[0_16px_42px_rgba(14,53,65,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#53bc76]/40 hover:shadow-[0_24px_60px_rgba(14,53,65,0.10)]">
      <div className="absolute right-[-34px] top-[-34px] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(83,188,118,0.18),transparent_68%)]" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(83,188,118,0.16),rgba(57,175,242,0.10))] text-[#53bc76] ring-1 ring-[#53bc76]/20 transition duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,rgba(83,188,118,0.22),rgba(57,175,242,0.16))]">
          {icon}
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#64748b]">
          {label}
        </p>

        <p className="mt-2 text-2xl font-semibold leading-none tracking-[-0.04em] text-[#0e3541]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ComplementItemCard({
  item,
  blockEyebrow,
  propertyTitle,
}: {
  item: PropertyImageWithMediaGroup;
  blockEyebrow: string;
  propertyTitle: string;
}) {
  const imageUrl = item.image_url || item.url || item.src || "";
  const title = item.title || "Complement";
  const description = item.caption || "";
  const altText = item.alt_text || item.alt || title || propertyTitle;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#0e3541]/10 bg-white shadow-[0_18px_48px_rgba(14,53,65,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#53bc76]/30 hover:shadow-[0_28px_70px_rgba(14,53,65,0.12)]">
      <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative flex h-[260px] min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#f8fafc] p-4 md:h-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              width={560}
              height={520}
              sizes="(max-width: 768px) 100vw, 280px"
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[20px] border border-dashed border-[#0e3541]/15 bg-white px-5 text-center text-sm font-bold text-[#94a3b8]">
              No image available
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0e3541] shadow-sm backdrop-blur">
            {blockEyebrow}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center p-6 md:p-7 lg:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
              Included Item
            </p>

            <h3 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-[-0.045em] text-[#0e3541] md:text-[26px]">
              {title}
            </h3>

            <div className="mt-5 h-px w-full bg-[#0e3541]/10" />

            {description ? (
              <p className="mt-5 text-sm font-normal leading-7 text-[#64748b] md:text-[15px] md:leading-8">
                {description}
              </p>
            ) : (
              <p className="mt-5 text-sm font-normal leading-7 text-[#64748b] md:text-[15px] md:leading-8">
                No description available for this item.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function getPropertyStructuredData({
  property,
  mainImage,
  description,
}: {
  property: Awaited<ReturnType<typeof getPropertyBySlug>>;
  mainImage: string | null;
  description: string;
}) {
  if (!property) {
    return null;
  }

  const propertyUrl = getAbsoluteUrl(`/properties/${property.slug}`);
  const imageUrl = mainImage ? getAbsoluteUrl(mainImage) : undefined;
  const locationText = getPropertyLocationText(property);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${propertyUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Properties",
            item: `${SITE_URL}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: property.title,
            item: propertyUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${propertyUrl}#webpage`,
        url: propertyUrl,
        name: property.title,
        description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@id": `${propertyUrl}#breadcrumb`,
        },
        primaryImageOfPage: imageUrl
          ? {
              "@type": "ImageObject",
              url: imageUrl,
            }
          : undefined,
      },
      {
        "@type": "Residence",
        "@id": `${propertyUrl}#property`,
        name: property.title,
        description,
        url: propertyUrl,
        image: imageUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: property.address_line_1 || undefined,
          addressLocality: property.city || undefined,
          addressRegion: property.state || undefined,
          postalCode: property.zip_code || undefined,
          addressCountry: "US",
        },
        numberOfRooms: property.bedrooms || undefined,
        floorSize: property.sqft
          ? {
              "@type": "QuantitativeValue",
              value: property.sqft,
              unitText: "SQFT",
            }
          : undefined,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Status",
            value: getPropertyStatusLabel(property.status),
          },
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: getPropertyTypeLabel(property.property_type),
          },
          {
            "@type": "PropertyValue",
            name: "Bathrooms",
            value: property.bathrooms || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Location",
            value: locationText,
          },
        ],
        offers: property.price
          ? {
              "@type": "Offer",
              price: property.price,
              priceCurrency: "USD",
              availability:
                property.status === "available"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/LimitedAvailability",
              url: propertyUrl,
            }
          : undefined,
      },
    ],
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;

  const [property, settings] = await Promise.all([
    getPropertyBySlug(slug),
    getSiteSettings(),
  ]);

  if (!property) {
    notFound();
  }

  const allPropertyImages = [...(property.property_images || [])]
    .sort((a, b) => a.position - b.position)
    .map((image) => image as PropertyImageWithMediaGroup);

  const complementBlocks = await getPublicPropertyComplementBlocks(property.id);
  const complementSlugs = new Set(
    complementBlocks.map((block) => block.slug),
  );

  const galleryImages = allPropertyImages.filter(
    (image) => !complementSlugs.has(image.media_group || ""),
  );

  const mainImage = getMainPropertyImage(property);
  const cleanDescription = cleanRichDescription(property.description);

  const carouselImages = normalizeCarouselImages({
    propertyTitle: property.title,
    mainImage,
    galleryImages,
  });

  const seoDescription = getPropertySeoDescription({
    metaDescription: property.meta_description,
    shortDescription: property.short_description,
    description: property.description,
    fallback: settings.site_description,
  });

  const structuredData = getPropertyStructuredData({
    property,
    mainImage,
    description: seoDescription,
  });

  const videos = [...(property.property_videos || [])].sort(
    (a, b) => a.position - b.position,
  );

  const documents = [...(property.property_documents || [])]
    .filter((document) => document.is_public)
    .sort((a, b) => a.position - b.position);

  const features = [...(property.property_features || [])].sort(
    (a, b) => a.position - b.position,
  );

  const propertyLocation = getPropertyLocationText(property);

  return (
    <main className="min-h-screen bg-white">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      ) : null}

      <section
        className="bg-white px-5 py-10 md:py-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(83,188,118,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,175,242,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      >
        <div className="mx-auto max-w-[1220px]">
          <PropertyBackButton />

          <article className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.08)] md:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 lg:flex-row lg:items-start">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex min-h-[32px] items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClassName(
                      property.status,
                    )}`}
                  >
                    {getPropertyStatusLabel(property.status)}
                  </span>

                  <span className="inline-flex min-h-[32px] items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0e3541]">
                    {getPropertyTypeLabel(property.property_type)}
                  </span>
                </div>

                <h1 className="max-w-4xl text-[38px] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0e3541] md:text-[58px]">
                  {property.title}
                </h1>

                <p className="mt-4 flex items-center gap-2 text-sm font-normal text-[#64748b] md:text-base">
                  <MapPin size={18} className="shrink-0 text-[#53bc76]" />
                  <span>{propertyLocation}</span>
                </p>
              </div>

              <div className="shrink-0 rounded-[22px] bg-gray-50 px-6 py-5 lg:text-right">
                <p className="text-sm font-semibold text-gray-500">Price</p>

                <p className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.05em] text-[#101820]">
                  {formatCurrency(property.price)}
                </p>
              </div>
            </div>

            <PropertyImageCarousel
              title={property.title}
              images={carouselImages}
            />
          </article>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)] md:p-8">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                      Overview
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0e3541]">
                      Property Facts
                    </h2>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <PropertyFactCard
                    icon={<BedDouble size={24} strokeWidth={2.2} />}
                    label="Bedrooms"
                    value={formatNumber(property.bedrooms)}
                  />

                  <PropertyFactCard
                    icon={<Bath size={24} strokeWidth={2.2} />}
                    label="Bathrooms"
                    value={formatNumber(property.bathrooms)}
                  />

                  <PropertyFactCard
                    icon={<Ruler size={24} strokeWidth={2.2} />}
                    label="Square Feet"
                    value={formatNumber(property.sqft)}
                  />

                  <PropertyFactCard
                    icon={<Calendar size={24} strokeWidth={2.2} />}
                    label="Year Built"
                    value={property.year_built || "N/A"}
                  />
                </div>
              </section>

              {documents.length > 0 ? (
                <section className="rounded-[28px] border border-[#53bc76]/20 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)] md:p-8">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                        Floor Plan
                      </p>

                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0e3541]">
                        Documents & Floor Plans
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm font-normal leading-6 text-[#64748b]">
                        View architectural plans, floor plans, and project
                        documents available for this property.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex flex-col justify-between gap-5 rounded-[24px] border border-[#53bc76]/20 bg-[linear-gradient(135deg,rgba(83,188,118,0.08),rgba(57,175,242,0.05))] p-5 md:flex-row md:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#53bc76] shadow-sm ring-1 ring-[#53bc76]/20">
                            <FileText size={26} />
                          </span>

                          <div>
                            <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#0e3541]">
                              {document.title}
                            </h3>

                            <p className="mt-1 text-sm font-normal leading-6 text-[#64748b]">
                              {document.description ||
                                "Architectural plan or project document."}
                            </p>
                          </div>
                        </div>

                        <a
                          href={document.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-6 py-3 text-sm font-bold !text-white shadow-[0_16px_34px_rgba(83,188,118,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(83,188,118,0.32)]"
                        >
                          <Download size={18} />
                          {document.button_label || "View PDF"}
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {videos.length > 0 ? (
                <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)] md:p-8">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0e3541]">
                    Videos
                  </h2>

                  <div className="mt-6 grid gap-5">
                    {videos.map((video) => {
                      const embedUrl = getVideoEmbedUrl(video.video_url);

                      return (
                        <div
                          key={video.id}
                          className="overflow-hidden rounded-[22px] bg-[#0e3541]"
                        >
                          {video.provider === "uploaded" ||
                          isUploadedVideoUrl(video.video_url) ? (
                            <video
                              src={video.video_url}
                              controls
                              preload="metadata"
                              poster={video.thumbnail_url || undefined}
                              className="h-auto w-full"
                            />
                          ) : embedUrl ? (
                            <iframe
                              src={embedUrl}
                              title={video.title || property.title}
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="aspect-video w-full"
                            />
                          ) : (
                            <a
                              href={video.video_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex aspect-video w-full items-center justify-center gap-2 bg-[#0e3541] px-6 text-sm font-bold !text-white"
                            >
                              <PlayCircle size={20} />
                              Open Video
                              <ExternalLink size={16} />
                            </a>
                          )}

                          <div className="flex items-center gap-2 p-4 text-white">
                            <PlayCircle size={18} />

                            <span className="text-sm font-semibold">
                              {video.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)] md:p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0e3541]">
                  Description
                </h2>

                <div className="mt-4 md:mt-5">
                  {cleanDescription ? (
                    <div
                      className="
                        property-rich-description
                        text-[15px]
                        font-normal
                        leading-7
                        text-[#334155]
                        md:text-base
                        md:leading-8
                        [&_a]:font-bold
                        [&_a]:text-[#39aff2]
                        [&_a]:underline
                        [&_b]:font-bold
                        [&_b]:text-[#0e3541]
                        [&_br]:block
                        [&_div]:mb-2
                        [&_div]:leading-7
                        md:[&_div]:mb-3
                        md:[&_div]:leading-8
                        [&_li]:mb-1.5
                        md:[&_li]:mb-2
                        [&_ol]:my-3
                        [&_ol]:list-decimal
                        [&_ol]:pl-5
                        md:[&_ol]:my-4
                        md:[&_ol]:pl-6
                        [&_p]:mb-2
                        [&_p]:leading-7
                        md:[&_p]:mb-3
                        md:[&_p]:leading-8
                        [&_strong]:font-bold
                        [&_strong]:text-[#0e3541]
                        [&_ul]:my-3
                        [&_ul]:list-disc
                        [&_ul]:pl-5
                        md:[&_ul]:my-4
                        md:[&_ul]:pl-6
                      "
                      dangerouslySetInnerHTML={{ __html: cleanDescription }}
                    />
                  ) : (
                    <p className="text-base font-normal leading-8 text-[#334155]">
                      No description available for this property.
                    </p>
                  )}
                </div>
              </section>

              {complementBlocks.map((block) => (
                <section
                  key={block.id}
                  className="rounded-[28px] border border-[#53bc76]/20 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)] md:p-8"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                        {block.eyebrow || block.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#0e3541]">
                        {block.title}
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm font-normal leading-6 text-[#64748b]">
                        {block.description ||
                          "Review the included items for this property."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-5">
                    {block.items.map((item, index) => (
                      <ComplementItemCard
                        key={item.id || `${block.slug}-${index}`}
                        item={item}
                        blockEyebrow={block.eyebrow || block.title}
                        propertyTitle={property.title}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="sticky top-28 space-y-6">
                <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
                  <h2 className="text-xl font-semibold tracking-[-0.04em] text-[#0e3541]">
                    Property Details
                  </h2>

                  <div className="mt-5 space-y-3">
                    <DetailRow
                      label="Status"
                      value={getPropertyStatusLabel(property.status)}
                    />

                    <DetailRow
                      label="Type"
                      value={getPropertyTypeLabel(property.property_type)}
                    />

                    <DetailRow label="City" value={property.city} />
                    <DetailRow label="State" value={property.state} />

                    <DetailRow
                      label="Lot Size"
                      value={
                        property.lot_size_sqft
                          ? `${formatNumber(property.lot_size_sqft)} sqft`
                          : "N/A"
                      }
                    />

                    <DetailRow
                      label="Price"
                      value={formatCurrency(property.price)}
                    />

                    {features.map((feature) => (
                      <DetailRow
                        key={feature.id}
                        label={feature.label}
                        value={feature.value || "N/A"}
                      />
                    ))}
                  </div>
                </section>

                <section
                  id="contact"
                  className="rounded-[28px] border border-[#53bc76]/20 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.08)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                    Contact
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#0e3541]">
                    Interested in this property?
                  </h2>

                  <p className="mt-3 text-sm font-normal leading-6 text-[#64748b]">
                    Fill out the form below and our team will contact you with
                    more information about this project.
                  </p>

                  <PropertyLeadForm
                    propertyId={property.id}
                    propertySlug={property.slug}
                    propertyTitle={property.title}
                  />
                </section>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-gray-50 px-4 py-3">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
        {label}
      </span>

      <strong className="text-right text-sm font-semibold text-[#101820]">
        {value}
      </strong>
    </div>
  );
}
