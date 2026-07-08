import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Ruler,
} from "lucide-react";
import { getAdminProperties } from "@/lib/properties";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";

export default async function AdminPropertiesPage() {
  const properties = await getAdminProperties();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#53bc76]">
            CRUD
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#0e3541]">
            Properties
          </h2>

          <p className="mt-2 text-[#587469]">
            Manage property listings, prices, status, media and investment data
            directly from Supabase.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
        >
          <Plus size={18} />
          New Property
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#587469]">Total</p>
          <p className="mt-2 text-3xl font-bold text-[#0e3541]">
            {properties.length}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#587469]">Available</p>
          <p className="mt-2 text-3xl font-bold text-[#0e3541]">
            {
              properties.filter((property) => property.status === "available")
                .length
            }
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#587469]">In Progress</p>
          <p className="mt-2 text-3xl font-bold text-[#0e3541]">
            {
              properties.filter((property) => property.status === "in_progress")
                .length
            }
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#587469]">Sold</p>
          <p className="mt-2 text-3xl font-bold text-[#0e3541]">
            {properties.filter((property) => property.status === "sold").length}
          </p>
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="mt-6 grid gap-5">
          {properties.map((property) => (
            <div
              key={property.id}
            className="admin-card grid gap-5 p-4 md:grid-cols-[220px_1fr_auto]"
            >
              {property.cover_image_url ? (
                <img
                  src={property.cover_image_url}
                  alt={property.title}
                  className="h-48 w-full rounded-[1.4rem] object-cover md:h-full"
                />
              ) : (
                <div className="admin-icon-box flex h-48 w-full items-center justify-center rounded-[1.4rem] md:h-full">
                  <Building2 size={42} />
                </div>
              )}

              <div className="py-2">
                <div className="flex flex-wrap gap-2">
                  <span className="admin-badge px-3 py-1 text-xs">
                    {getPropertyStatusLabel(property.status)}
                  </span>

                  <span className="admin-badge bg-[#ecf9f0] px-3 py-1 text-xs">
                    {getPropertyTypeLabel(property.property_type)}
                  </span>

                  <span className="admin-badge bg-[#ecf9f0] px-3 py-1 text-xs">
                    {property.visibility}
                  </span>

                  {property.is_featured ? (
                    <span className="admin-badge bg-amber-50 px-3 py-1 text-xs text-amber-700">
                      Featured
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-2xl font-bold text-[#0e3541]">
                  {property.title}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-[#587469]">
                  <MapPin size={17} />
                  {property.address_line_1}, {property.city}, {property.state}
                  {property.zip_code ? ` ${property.zip_code}` : ""}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#587469]">
                  {property.short_description ||
                    property.description ||
                    "No description available."}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#64748b]">
                  <span className="admin-badge inline-flex items-center gap-2 bg-[#f8fafc] px-3 py-2">
                    <BedDouble size={16} />
                    {property.bedrooms || 0} beds
                  </span>

                  <span className="admin-badge inline-flex items-center gap-2 bg-[#f8fafc] px-3 py-2">
                    <Bath size={16} />
                    {property.bathrooms || 0} baths
                  </span>

                  <span className="admin-badge inline-flex items-center gap-2 bg-[#f8fafc] px-3 py-2">
                    <Ruler size={16} />
                    {formatNumber(property.sqft)} sqft
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-3 md:flex-col md:items-end md:justify-between">
                <div className="md:text-right">
                  <p className="text-sm font-semibold text-[#587469]">Price</p>

                  <p className="text-2xl font-bold text-[#0e3541]">
                    {formatCurrency(property.price)}
                  </p>

                  <p className="mt-2 text-sm text-[#587469]">
                    ARV:{" "}
                    <span className="font-bold text-[#0e3541]">
                      {formatCurrency(property.projected_arv)}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2">
                  {property.visibility === "public" &&
                  property.status !== "draft" &&
                  property.status !== "archived" ? (
                    <Link
                      href={`/properties/${property.slug}`}
                    className="admin-secondary-button inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition hover:bg-[#f8fafc]"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  ) : null}

                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="admin-primary-button inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition hover:brightness-105"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card mt-6 border-dashed border-[rgba(14,53,65,0.12)] p-10 text-center">
          <Building2 className="mx-auto text-[#53bc76]" size={44} />

          <h3 className="mt-4 text-2xl font-bold text-[#0e3541]">
            No properties found
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-[#587469]">
            The admin query is connected to Supabase, but no properties were
            found in the database.
          </p>

          <Link
            href="/admin/properties/new"
            className="admin-primary-button mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
          >
            <Plus size={18} />
            Add First Property
          </Link>
        </div>
      )}
    </div>
  );
}
