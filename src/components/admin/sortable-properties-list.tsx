"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  Eye,
  GripVertical,
  MapPin,
  Pencil,
  Ruler,
  Save,
} from "lucide-react";
import { DeletePropertyButton } from "@/components/admin/delete-property-button";
import { updatePropertyOrderAction } from "@/app/admin/properties/order-actions";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusClassName,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";

export type SortableAdminProperty = {
  id: string;
  title: string;
  slug: string;
  visibility: string | null;
  status: string;
  property_type: string;
  address_line_1: string;
  city: string;
  state: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  cover_image_url: string | null;
  short_description: string | null;
  sort_order?: number | null;
};

type SortablePropertiesListProps = {
  properties: SortableAdminProperty[];
  canUpdate: boolean;
  canDelete: boolean;
};

export function SortablePropertiesList({
  properties,
  canUpdate,
  canDelete,
}: SortablePropertiesListProps) {
  const [items, setItems] = useState(properties);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const hasChanges = useMemo(() => {
    const originalIds = properties.map((property) => property.id).join(",");
    const currentIds = items.map((property) => property.id).join(",");

    return originalIds !== currentIds;
  }, [items, properties]);

  function moveItem(sourceId: string, targetId: string) {
    if (sourceId === targetId) {
      return;
    }

    setItems((currentItems) => {
      const sourceIndex = currentItems.findIndex((item) => item.id === sourceId);
      const targetIndex = currentItems.findIndex((item) => item.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) {
        return currentItems;
      }

      const nextItems = [...currentItems];
      const [removedItem] = nextItems.splice(sourceIndex, 1);
      nextItems.splice(targetIndex, 0, removedItem);

      return nextItems;
    });
  }

  function saveOrder() {
    setSavedMessage("");

    startTransition(async () => {
      const result = await updatePropertyOrderAction(
        items.map((property) => property.id),
      );

      if (result.ok) {
        setSavedMessage("Order saved successfully.");
      } else {
        setSavedMessage(result.message || "Could not save order.");
      }
    });
  }

  return (
    <div className="space-y-5">
      <div className="admin-card flex flex-col justify-between gap-3 p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-lg font-bold text-[#0c2933]">
            Property Display Order
          </h2>

          <p className="mt-1 text-sm text-[#64748b]">
            Drag properties up or down to choose the order shown on the public
            website.
          </p>

          {savedMessage ? (
            <p className="mt-2 text-sm font-bold text-emerald-700">
              {savedMessage}
            </p>
          ) : null}
        </div>

        {canUpdate ? (
          <button
            type="button"
            onClick={saveOrder}
            disabled={isPending || !hasChanges}
            className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />
            {isPending ? "Saving..." : "Save Order"}
          </button>
        ) : null}
      </div>

      <div className="space-y-4">
        {items.map((property, index) => {
          const publicUrl =
            property.visibility === "public" &&
            !["draft", "archived"].includes(property.status)
              ? `/properties/${property.slug}`
              : null;

          return (
            <article
              key={property.id}
              draggable={canUpdate}
              onDragStart={() => {
                if (!canUpdate) {
                  return;
                }

                setDraggedId(property.id);
              }}
              onDragOver={(event) => {
                if (!canUpdate || !draggedId) {
                  return;
                }

                event.preventDefault();
                moveItem(draggedId, property.id);
              }}
              onDragEnd={() => setDraggedId(null)}
              className={`admin-card overflow-hidden transition ${
                draggedId === property.id
                  ? "border-[#53bc76] opacity-60"
                  : "border-[rgba(14,53,65,0.1)]"
              }`}
            >
              <div className="grid gap-0 lg:grid-cols-[74px_260px_1fr]">
                <div className="flex items-center justify-center border-b border-[rgba(14,53,65,0.1)] bg-[#f8fafc] p-4 lg:border-b-0 lg:border-r">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0c2933] shadow-sm">
                      {index + 1}
                    </span>

                    {canUpdate ? (
                      <span className="cursor-grab text-[#64748b] active:cursor-grabbing">
                        <GripVertical size={22} />
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="relative min-h-[210px] bg-[#f8fafc]">
                  {property.cover_image_url ? (
                    <img
                      src={property.cover_image_url}
                      alt={property.title}
                      className="h-full min-h-[210px] w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[210px] items-center justify-center text-[#53bc76]">
                      <Building2 size={48} />
                    </div>
                  )}

                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${getPropertyStatusClassName(
                        property.status as never,
                      )}`}
                    >
                      {getPropertyStatusLabel(property.status as never)}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
                    <div>
                      <h3 className="text-2xl font-bold leading-tight text-[#0c2933]">
                        {property.title}
                      </h3>

                      <p className="mt-2 flex items-start gap-2 text-sm text-[#64748b]">
                        <MapPin size={15} className="mt-0.5 shrink-0" />
                        {property.address_line_1}, {property.city},{" "}
                        {property.state}
                      </p>
                    </div>

                    <div className="admin-badge px-3 py-1 text-xs">
                      {getPropertyTypeLabel(property.property_type as never)}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
                    <div>
                      <p className="text-3xl font-bold text-[#0c2933]">
                        {formatCurrency(property.price)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#64748b]">
                        <span className="admin-badge flex items-center gap-1 px-3 py-2">
                          <BedDouble size={15} />
                          {formatNumber(property.bedrooms)}
                        </span>

                        <span className="admin-badge flex items-center gap-1 px-3 py-2">
                          <Bath size={15} />
                          {formatNumber(property.bathrooms)}
                        </span>

                        <span className="admin-badge flex items-center gap-1 px-3 py-2">
                          <Ruler size={15} />
                          {formatNumber(property.sqft)}
                        </span>
                      </div>

                      {property.short_description ? (
                        <p className="mt-4 line-clamp-2 max-w-3xl text-sm leading-6 text-[#64748b]">
                          {property.short_description}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-3 xl:justify-end">
                      {canUpdate ? (
                        <Link
                          href={`/admin/properties/${property.id}/edit`}
                          className="admin-primary-button inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition hover:brightness-105"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>
                      ) : null}

                      {publicUrl ? (
                        <Link
                          href={publicUrl}
                          target="_blank"
                          className="admin-secondary-button inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition hover:bg-[#f8fafc]"
                        >
                          <Eye size={15} />
                          View
                        </Link>
                      ) : (
                        <span className="admin-badge inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#94a3b8]">
                          <Eye size={15} />
                          Hidden
                        </span>
                      )}

                      {canDelete ? (
                        <DeletePropertyButton
                          propertyId={property.id}
                          propertyTitle={property.title}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
