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
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getPublicProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/site-settings";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  mapPropertyToCard,
} from "@/types/property";

export const revalidate = 60;

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

export default async function ProjectsPage() {
  const [properties, settings] = await Promise.all([
    getPublicProperties(),
    getSiteSettings(),
  ]);

  const propertyCards = properties.map(mapPropertyToCard);

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader settings={settings} />

      <div
        className="bg-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(83,188,118,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,175,242,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      >
        <section className="px-5 pb-14 pt-20 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-[1220px]">
            <div className="mx-auto max-w-[920px] text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#53bc76]/25 bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0e3541] shadow-[0_12px_30px_rgba(9,24,39,0.06)]">
                <span className="h-2 w-2 rounded-full bg-[#53bc76] shadow-[0_0_0_7px_rgba(83,188,118,0.14)]" />
                Checkmate Group Transparency Portal
              </div>

              <h1 className="mx-auto mt-7 max-w-[900px] text-[44px] font-semibold leading-[0.92] tracking-[-0.085em] text-[#111111] md:text-[76px]">
                Real-Time Visibility Into Every{" "}
                <span className="text-[#53bc76]">
                  Published Property Project
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[760px] text-base font-normal leading-7 text-[#5f5f5f] md:text-lg">
                Follow Checkmate Group projects with clear public information,
                project media, location details, property type, videos, floor
                plans, and organized transparency pages for each address.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="#projects"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-6 py-3 text-sm font-bold !text-white shadow-[0_16px_34px_rgba(83,188,118,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(83,188,118,0.32)]"
                >
                  View Projects
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#111111] shadow-[0_14px_34px_rgba(9,24,39,0.06)] transition hover:-translate-y-0.5 hover:border-[#53bc76]/45"
                >
                  How It Works
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <span className="inline-flex min-h-[38px] items-center rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-normal text-[#5f5f5f] shadow-[0_10px_26px_rgba(9,24,39,0.04)]">
                  Published properties
                </span>

                <span className="inline-flex min-h-[38px] items-center rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-normal text-[#5f5f5f] shadow-[0_10px_26px_rgba(9,24,39,0.04)]">
                  Photos and videos
                </span>

                <span className="inline-flex min-h-[38px] items-center rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-normal text-[#5f5f5f] shadow-[0_10px_26px_rgba(9,24,39,0.04)]">
                  Floor plans when available
                </span>

                <span className="inline-flex min-h-[38px] items-center rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-normal text-[#5f5f5f] shadow-[0_10px_26px_rgba(9,24,39,0.04)]">
                  Public project visibility
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-5 pb-20 md:pb-24">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-[720px]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0e3541]">
                Published Projects
              </p>

              <h2 className="mt-4 text-[34px] font-semibold leading-[0.96] tracking-[-0.07em] text-[#111111] md:text-[52px]">
                Explore our latest projects with complete transparency.
              </h2>

              <p className="mt-4 text-base font-normal leading-7 text-[#111111]/80">
                Explore Checkmate Group’s curated portfolio of residential
                developments across the United States. Select any property to
                access an immersive presentation featuring photos, location
                details, specifications, videos, image galleries, and floor
                plans whenever available.
              </p>
            </div>

            <div className="mt-8 grid max-w-[700px] gap-5 rounded-[28px] border border-[#53bc76]/25 bg-white/95 p-5 shadow-[0_24px_70px_rgba(9,24,39,0.08)] md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0e3541]">
                  <span className="h-2 w-2 rounded-full bg-[#53bc76] shadow-[0_0_0_7px_rgba(83,188,118,0.14)]" />
                  2026 Portfolio
                </div>

                <h3 className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.06em] text-[#111111] md:text-[36px]">
                  2026 Development Portfolio
                </h3>
              </div>

              <div className="rounded-[22px] bg-[#0e3541] px-7 py-5 text-left text-white md:min-w-[230px] md:text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
                  Projected Sellout
                </p>

                <strong className="mt-2 block text-[36px] font-semibold leading-none tracking-[-0.06em] text-white">
                  $22.0M
                </strong>
              </div>
            </div>

            {propertyCards.length > 0 ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {propertyCards.map((property) => {
                  const propertyUrl = `/properties/${property.slug}?from=projects`;

                  return (
                    <article
                      key={property.id}
                      className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_48px_rgba(17,17,17,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(17,17,17,0.12)]"
                    >
                      <Link
                        href={propertyUrl}
                        aria-label={`Open property ${property.title}`}
                        className="relative block h-[235px] overflow-hidden bg-gray-100"
                      >
                        {property.imageUrl ? (
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#39aff2]">
                            <Building2 size={54} />
                          </div>
                        )}
                      </Link>

                      <div className="p-5">
                        <Link href={propertyUrl} className="block">
                          <p className="text-[27px] font-semibold leading-none tracking-[-0.045em] text-[#101820] transition group-hover:text-[#39aff2]">
                            {formatCurrency(property.price)}
                          </p>
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

                          <span className="text-[13px] font-normal leading-5 text-[#64748b] transition group-hover:text-[#0e3541]">
                            {property.address}, {property.city},{" "}
                            {property.state}
                          </span>
                        </Link>

                        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                          <span
                            className={`inline-flex min-h-[30px] items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${getStatusClassName(
                              property.status,
                            )}`}
                          >
                            {getPropertyStatusLabel(property.status)}
                          </span>

                          <Link
                            href={propertyUrl}
                            className="text-[13px] font-semibold text-[#101820] transition hover:text-[#39aff2]"
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
              <div className="mt-12 rounded-[28px] border border-dashed border-black/15 bg-white p-10 text-center shadow-sm">
                <Building2 className="mx-auto text-[#39aff2]" size={54} />

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#101820]">
                  No published projects yet
                </h3>

                <p className="mx-auto mt-2 max-w-xl text-sm font-normal leading-6 text-gray-500">
                  Publish properties in the admin panel to display them on this
                  public projects page.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="px-5 pb-20 md:pb-24">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-[680px]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0e3541]">
                How It Works
              </p>

              <h2 className="mt-4 text-[34px] font-semibold leading-[0.96] tracking-[-0.07em] text-[#111111] md:text-[52px]">
                A Simple Public View of Each Project.
              </h2>

              <p className="mt-4 text-base font-normal leading-7 text-[#111111]/80">
                Each property page organizes the available project information
                in one place for easier public access.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[22px] border border-black/10 bg-white/95 p-6 shadow-[0_16px_40px_rgba(9,24,39,0.05)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#53bc76]/10 text-[#0e3541]">
                  <CheckCircle2 size={22} />
                </div>

                <span className="inline-flex rounded-full bg-[#53bc76]/10 px-3 py-1 text-xs font-bold text-[#0e3541]">
                  01
                </span>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-[#111111]">
                  Property Listed
                </h3>

                <p className="mt-2 text-sm font-normal leading-6 text-[#5f5f5f]">
                  The project is published with address, city, state, type, and
                  main image.
                </p>
              </div>

              <div className="rounded-[22px] border border-black/10 bg-white/95 p-6 shadow-[0_16px_40px_rgba(9,24,39,0.05)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#53bc76]/10 text-[#0e3541]">
                  <ImageIcon size={22} />
                </div>

                <span className="inline-flex rounded-full bg-[#53bc76]/10 px-3 py-1 text-xs font-bold text-[#0e3541]">
                  02
                </span>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-[#111111]">
                  Media Added
                </h3>

                <p className="mt-2 text-sm font-normal leading-6 text-[#5f5f5f]">
                  Photos, videos, and visual updates are attached when they are
                  available.
                </p>
              </div>

              <div className="rounded-[22px] border border-black/10 bg-white/95 p-6 shadow-[0_16px_40px_rgba(9,24,39,0.05)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#53bc76]/10 text-[#0e3541]">
                  <FileText size={22} />
                </div>

                <span className="inline-flex rounded-full bg-[#53bc76]/10 px-3 py-1 text-xs font-bold text-[#0e3541]">
                  03
                </span>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-[#111111]">
                  Documents
                </h3>

                <p className="mt-2 text-sm font-normal leading-6 text-[#5f5f5f]">
                  Floor plans or project files can be added to the public
                  project page.
                </p>
              </div>

              <div className="rounded-[22px] border border-black/10 bg-white/95 p-6 shadow-[0_16px_40px_rgba(9,24,39,0.05)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#53bc76]/10 text-[#0e3541]">
                  <PlayCircle size={22} />
                </div>

                <span className="inline-flex rounded-full bg-[#53bc76]/10 px-3 py-1 text-xs font-bold text-[#0e3541]">
                  04
                </span>

                <h3 className="mt-5 text-lg font-bold tracking-[-0.04em] text-[#111111]">
                  Transparency
                </h3>

                <p className="mt-2 text-sm font-normal leading-6 text-[#5f5f5f]">
                  Each address gets its own page with organized information and
                  project visibility.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <PublicFooter settings={settings} />
    </main>
  );
}
