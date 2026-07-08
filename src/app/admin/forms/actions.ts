"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminPermission } from "@/lib/admin-permissions";
import type { Database } from "@/types/database";

type LeadStatus = Database["public"]["Enums"]["lead_status"];

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdminPermission("forms.update");

  const supabase = createAdminClient();

  const leadId = getStringValue(formData, "lead_id");
  const status = getStringValue(formData, "status") as LeadStatus;

  if (!leadId) {
    throw new Error("Lead ID is required.");
  }

  if (!status) {
    throw new Error("Status is required.");
  }

  const { error } = await supabase
    .from("leads")
    .update({
      status,
    })
    .eq("id", leadId);

  if (error) {
    console.error("Error updating lead status:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/forms");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdminPermission("forms.delete");

  const supabase = createAdminClient();

  const leadId = getStringValue(formData, "lead_id");

  if (!leadId) {
    throw new Error("Lead ID is required.");
  }

  const { error } = await supabase.from("leads").delete().eq("id", leadId);

  if (error) {
    console.error("Error deleting lead:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/forms");
}