"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  GripVertical,
  Image as ImageIcon,
  Save,
  Trash2,
} from "lucide-react";
import {
  deletePropertyImageAction,
  updatePropertyImagesOrderAction,
} from "@/app/admin/properties/actions";

type SortablePropertyImage = {
  id: string;
  image_url: string;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  position: number;
  is_cover: boolean;
};

type PropertyImageSortableGalleryProps = {
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
  images: SortablePropertyImage[];
};

function reorderImages(
  items: SortablePropertyImage[],
  fromIndex: number,
  toIndex: number,
) {
  const updatedItems = [...items];
  const [movedItem] = updatedItems.splice(fromIndex, 1);

  if (!movedItem) {
    return items;
  }

  updatedItems.splice(toIndex, 0, movedItem);

  return updatedItems.map((item, index) => ({
    ...item,
    position: index + 1,
  }));
}

export function PropertyImageSortableGallery({
  propertyId,
  propertySlug,
  propertyTitle,
  images,
}: PropertyImageSortableGalleryProps) {
  const initialImages = useMemo(() => {
    return [...images]
      .sort((a, b) => a.position - b.position)
      .map((image, index) => ({
        ...image,
        position: index + 1,
      }));
  }, [images]);

  const [items, setItems] = useState(initialImages);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function moveImage(imageId: string, direction: "up" | "down") {
    const currentIndex = items.findIndex((item) => item.id === imageId);

    if (currentIndex < 0) {
      return;
    }

    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex < 0 || nextIndex >= items.length) {
      return;
    }

    setItems((currentItems) =>
      reorderImages(currentItems, currentIndex, nextIndex),
    );
  }

  function handleDragStart(imageId: string) {
    setDraggedId(imageId);
  }

  function handleDragOver(
    event: React.DragEvent<HTMLDivElement>,
    imageId: string,
  ) {
    event.preventDefault();
    setDragOverId(imageId);
  }

  function handleDrop(
    event: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) {
    event.preventDefault();

    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const fromIndex = items.findIndex((item) => item.id === draggedId);
    const toIndex = items.findIndex((item) => item.id === targetId);

    if (fromIndex < 0 || toIndex < 0) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    setItems((currentItems) => reorderImages(currentItems, fromIndex, toIndex));
    setDraggedId(null);
    setDragOverId(null);
  }

  function handleDragEnd() {
    setDraggedId(null);
    setDragOverId(null);
  }

  function saveOrder() {
    const formData = new FormData();

    formData.set("property_id", propertyId);
    formData.set("property_slug", propertySlug);
    formData.set(
      "images_order",
      JSON.stringify(
        items.map((item, index) => ({
          id: item.id,
          position: index + 1,
        })),
      ),
    );

    startTransition(() => {
      updatePropertyImagesOrderAction(formData);
    });
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#0e3541]/10 bg-[#f8fafc] p-8 text-center">
        <ImageIcon className="mx-auto text-[#53bc76]" size={28} />

        <p className="mt-3 text-sm font-bold text-[#64748b]">
          No gallery images registered yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 rounded-[1.4rem] border border-[#0e3541]/10 bg-[#f8fafc] p-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-black text-[#0e3541]">
            Drag and drop to reorder gallery images
          </p>

          <p className="mt-1 text-xs leading-5 text-[#64748b]">
            The order below controls how images appear on the public property
            page.
          </p>
        </div>

        <button
          type="button"
          onClick={saveOrder}
          disabled={isPending}
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#22a75a_100%)] px-5 text-sm font-black text-white shadow-[0_14px_30px_rgba(83,188,118,0.22)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {isPending ? "Saving..." : "Save Order"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((image, index) => {
          const title = image.title || image.alt_text || "Property Image";
          const isDragging = draggedId === image.id;
          const isDragOver = dragOverId === image.id && draggedId !== image.id;

          return (
            <article
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(image.id)}
              onDragOver={(event) => handleDragOver(event, image.id)}
              onDrop={(event) => handleDrop(event, image.id)}
              onDragEnd={handleDragEnd}
              className={[
                "group overflow-hidden rounded-[1.6rem] border bg-white shadow-[0_14px_34px_rgba(12,41,51,0.06)] transition",
                "hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(12,41,51,0.10)]",
                isDragging
                  ? "scale-[0.98] border-[#53bc76] opacity-60"
                  : "border-[#0e3541]/10",
                isDragOver ? "ring-2 ring-[#53bc76]" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#0e3541]/10 bg-[#f8fafc] px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 cursor-grab items-center justify-center rounded-full bg-white text-[#0e3541] shadow-sm active:cursor-grabbing"
                    aria-label="Drag image"
                    title="Drag image"
                  >
                    <GripVertical size={18} />
                  </button>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#53bc76]">
                      Position #{index + 1}
                    </p>

                    <p className="mt-0.5 line-clamp-1 text-sm font-black text-[#0e3541]">
                      {title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(image.id, "up")}
                    disabled={index === 0}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0e3541] shadow-sm transition hover:bg-[#ecfdf5] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Move image up"
                    title="Move image up"
                  >
                    <ArrowUp size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveImage(image.id, "down")}
                    disabled={index === items.length - 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0e3541] shadow-sm transition hover:bg-[#ecfdf5] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Move image down"
                    title="Move image down"
                  >
                    <ArrowDown size={15} />
                  </button>
                </div>
              </div>

              <div className="relative h-[180px] w-full overflow-hidden bg-[#f3f8f5]">
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.alt_text || propertyTitle}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#53bc76]">
                    <ImageIcon size={42} />
                  </div>
                )}

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {image.is_cover ? (
                    <span className="rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-lg">
                      Cover
                    </span>
                  ) : null}

                  <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0e3541] shadow-sm backdrop-blur">
                    #{index + 1}
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="line-clamp-2 text-base font-black leading-tight tracking-[-0.04em] text-[#0e3541]">
                      {title}
                    </h4>

                    {image.caption ? (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#587469]">
                        {image.caption}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs leading-5 text-[#587469]">
                        Gallery image.
                      </p>
                    )}
                  </div>

                  <form action={deletePropertyImageAction} className="shrink-0">
                    <input type="hidden" name="property_id" value={propertyId} />
                    <input
                      type="hidden"
                      name="property_slug"
                      value={propertySlug}
                    />
                    <input type="hidden" name="image_id" value={image.id} />

                    <button
                      type="submit"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                      aria-label="Delete image"
                      title="Delete image"
                    >
                      <Trash2 size={17} />
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={image.image_url}
                    target="_blank"
                    className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full border border-[#0e3541]/10 bg-[#f8fbfc] px-3 text-xs font-bold text-[#0e3541] no-underline transition hover:bg-white hover:shadow-sm"
                  >
                    <ExternalLink size={13} />
                    Open
                  </Link>

                  <details>
                    <summary className="inline-flex min-h-[36px] cursor-pointer list-none items-center justify-center rounded-full border border-[#0e3541]/10 bg-[#f8fbfc] px-3 text-xs font-bold text-[#0e3541] transition hover:bg-white hover:shadow-sm">
                      URL
                    </summary>

                    <div className="mt-3 max-w-full rounded-2xl border border-[#0e3541]/10 bg-[#f8fbfc] p-3">
                      <p className="break-all text-xs leading-5 text-[#587469]">
                        {image.image_url}
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}