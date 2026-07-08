"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deletePropertyAction } from "@/app/admin/properties/delete-actions";

type DeletePropertyButtonProps = {
  propertyId: string;
  propertyTitle: string;
  variant?: "card" | "page";
};

export function DeletePropertyButton({
  propertyId,
  propertyTitle,
  variant = "card",
}: DeletePropertyButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar o imóvel "${propertyTitle}"?\n\nEssa ação não pode ser desfeita.`,
    );

    if (!confirmed) {
      return;
    }

    startTransition(() => {
      deletePropertyAction(formData);
    });
  }

  if (variant === "page") {
    return (
      <form action={handleSubmit}>
        <input type="hidden" name="property_id" value={propertyId} />

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 size={17} />
          {isPending ? "Deleting..." : "Delete Property"}
        </button>
      </form>
    );
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="property_id" value={propertyId} />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 size={15} />
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}