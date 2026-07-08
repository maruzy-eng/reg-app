import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type FormSubmissionRow =
  Database["public"]["Tables"]["form_submissions"]["Row"];
export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];

export type LeadWithProperty = LeadRow & {
  properties?: Pick<
    PropertyRow,
    "id" | "title" | "slug" | "address_line_1" | "city" | "state"
  > | null;
};

export type FormSubmissionWithRelations = FormSubmissionRow & {
  leads?: Pick<LeadRow, "id" | "status" | "source"> | null;
  properties?: Pick<
    PropertyRow,
    "id" | "title" | "slug" | "address_line_1" | "city" | "state"
  > | null;
};

export async function getAdminLeads(): Promise<LeadWithProperty[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("leads")
    .select(
      `
      *,
      properties (
        id,
        title,
        slug,
        address_line_1,
        city,
        state
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin leads:", error.message);
    return [];
  }

  return (data || []) as unknown as LeadWithProperty[];
}

export async function getAdminFormSubmissions(): Promise<
  FormSubmissionWithRelations[]
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("form_submissions")
    .select(
      `
      *,
      leads (
        id,
        status,
        source
      ),
      properties (
        id,
        title,
        slug,
        address_line_1,
        city,
        state
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin form submissions:", error.message);
    return [];
  }

  return (data || []) as unknown as FormSubmissionWithRelations[];
}

export function getLeadStatusLabel(status: LeadRow["status"]) {
  const labels: Record<LeadRow["status"], string> = {
    new: "New",
    contacted: "Contacted",
    qualified: "Qualified",
    converted: "Converted",
    lost: "Lost",
    archived: "Archived",
  };

  return labels[status] || status;
}

export function getLeadStatusClassName(status: LeadRow["status"]) {
  const classes: Record<LeadRow["status"], string> = {
    new: "bg-blue-50 text-[#2680d8]",
    contacted: "bg-amber-50 text-amber-700",
    qualified: "bg-emerald-50 text-emerald-700",
    converted: "bg-green-50 text-green-700",
    lost: "bg-red-50 text-red-700",
    archived: "bg-gray-100 text-gray-600",
  };

  return classes[status] || "bg-gray-100 text-gray-600";
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
