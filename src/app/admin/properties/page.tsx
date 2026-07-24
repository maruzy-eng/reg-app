import Link from "next/link";
import { Building2, Plus } from "lucide-react";
import { getAdminProperties } from "@/lib/properties";
import {
  currentAdminHasPermission,
  requireAdminPermission,
} from "@/lib/admin-permissions";
import { RoleGuard } from "@/components/admin/role-guard";
import { SortablePropertiesList } from "@/components/admin/sortable-properties-list";

type AdminPropertiesPageProps = {
  searchParams?: Promise<{
    deleted?: string;
    error?: string;
  }>;
};

function getErrorMessage(error: string | undefined) {
  if (!error) {
    return null;
  }

  const messages: Record<string, string> = {
    "missing-property-id": "Property ID was not found.",
    "property-not-found": "Property was not found.",
    "delete-failed": "Could not delete property. Please try again.",
  };

  return messages[error] || "Something went wrong. Please try again.";
}

export default async function AdminPropertiesPage({
  searchParams,
}: AdminPropertiesPageProps) {
  await requireAdminPermission("properties.read");

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const properties = await getAdminProperties();

  const canUpdate = await currentAdminHasPermission("properties.update");
  const canDelete = await currentAdminHasPermission("properties.delete");

  const totalProperties = properties.length;
  const publicProperties = properties.filter(
    (property) => property.visibility === "public",
  ).length;
  const draftProperties = properties.filter(
    (property) => property.status === "draft",
  ).length;
  const soldProperties = properties.filter(
    (property) => property.status === "sold",
  ).length;
  const rentedProperties = properties.filter(
    (property) => property.status === "rented",
  ).length;

  const errorMessage = getErrorMessage(resolvedSearchParams.error);

  const sortableProperties = properties.map((property) => {
    const propertyWithOrder = property as typeof property & {
      sort_order?: number | null;
    };

    return {
      id: property.id,
      title: property.title,
      slug: property.slug,
      visibility: property.visibility,
      status: property.status,
      property_type: property.property_type,
      address_line_1: property.address_line_1,
      city: property.city,
      state: property.state,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      cover_image_url: property.cover_image_url,
      short_description: property.short_description,
      sort_order: propertyWithOrder.sort_order || null,
    };
  });

  return (
    <div className="space-y-8">
      <div className="admin-card flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-end">
        <div>
          <div className="admin-badge inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Building2 size={17} />
            Property Management
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#171614]">
            Properties
          </h1>

          <p className="mt-3 max-w-2xl text-[#587469]">
            Manage public portfolio projects, media, property pages and display
            order. Drag and drop the list to control the order on the public
            website.
          </p>
        </div>

        <RoleGuard permission="properties.create">
        <Link
            href="/admin/properties/new"
            className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
          >
            <Plus size={18} />
            New Property
          </Link>
        </RoleGuard>
      </div>

      {resolvedSearchParams.deleted === "success" ? (
        <div className="rounded-2xl border border-[#ebca84]/50 bg-[#f7efd9] px-5 py-4 text-sm font-bold text-[#aa7732]">
          Property deleted successfully.
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-5">
        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#64748b]">Total</p>
          <p className="mt-2 text-3xl font-bold text-[#171614]">
            {totalProperties}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#64748b]">Public</p>
          <p className="mt-2 text-3xl font-bold text-[#171614]">
            {publicProperties}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#64748b]">Drafts</p>
          <p className="mt-2 text-3xl font-bold text-[#171614]">
            {draftProperties}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#64748b]">Sold</p>
          <p className="mt-2 text-3xl font-bold text-[#171614]">
            {soldProperties}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-[#64748b]">Rented</p>
          <p className="mt-2 text-3xl font-bold text-[#171614]">
            {rentedProperties}
          </p>
        </div>
      </div>

      {sortableProperties.length > 0 ? (
        <SortablePropertiesList
          properties={sortableProperties}
          canUpdate={canUpdate}
          canDelete={canDelete}
        />
      ) : (
        <div className="admin-card border-dashed border-[rgba(23,22,20,0.12)] p-10 text-center">
          <Building2 className="mx-auto text-[#c79a4b]" size={52} />

          <h2 className="mt-5 text-2xl font-bold text-[#171614]">
            No properties yet
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[#64748b]">
            Create your first property to start building your public portfolio.
          </p>

          <RoleGuard permission="properties.create">
            <Link
              href="/admin/properties/new"
              className="admin-primary-button mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
            >
              <Plus size={18} />
              New Property
            </Link>
          </RoleGuard>
        </div>
      )}
    </div>
  );
}
