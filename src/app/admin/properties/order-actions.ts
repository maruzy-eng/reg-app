"use server";

import { revalidatePath } from "next/cache";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { createAdminClient } from "@/lib/supabase/admin";

export async function updatePropertyOrderAction(propertyIds: string[]) {
  await requireAdminPermission("properties.update");

  if (!Array.isArray(propertyIds) || propertyIds.length === 0) {
    return {
      ok: false,
      message: "No properties received.",
    };
  }

  const supabase = createAdminClient();

  for (let index = 0; index < propertyIds.length; index += 1) {
    const propertyId = propertyIds[index];

    const { error } = await supabase
      .from("properties")
      .update({
        sort_order: index + 1,
      } as never)
      .eq("id", propertyId);

    if (error) {
      console.error("Could not update property order:", error.message);

      return {
        ok: false,
        message: error.message,
      };
    }
  }

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/admin/properties");
  revalidatePath("/admin/dashboard");

  return {
    ok: true,
    message: "Property order updated successfully.",
  };
}