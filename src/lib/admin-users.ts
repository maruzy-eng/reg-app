import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export type AdminUserRow = Database["public"]["Tables"]["admin_users"]["Row"];
export type AdminUserInsert =
  Database["public"]["Tables"]["admin_users"]["Insert"];
export type AdminUserUpdate =
  Database["public"]["Tables"]["admin_users"]["Update"];

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin users:", error.message);
    return [];
  }

  return data || [];
}

export async function getAdminUserById(
  id: string,
): Promise<AdminUserRow | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching admin user by id:", error.message);
    return null;
  }

  return data;
}

export function getAdminRoleLabel(role: AdminUserRow["role"]) {
  const labels: Record<AdminUserRow["role"], string> = {
    admin: "Admin",
    editor: "Editor",
    viewer: "Viewer",
  };

  return labels[role] || role;
}

export function getAdminRoleClassName(role: AdminUserRow["role"]) {
  const classes: Record<AdminUserRow["role"], string> = {
    admin: "admin-user-pill admin-user-pill-admin",
    editor: "admin-user-pill admin-user-pill-editor",
    viewer: "admin-user-pill admin-user-pill-viewer",
  };

  return classes[role] || "admin-user-pill admin-user-pill-viewer";
}

export function getAdminStatusClassName(status: string) {
  const classes: Record<string, string> = {
    active: "admin-user-pill admin-user-pill-active",
    inactive: "admin-user-pill admin-user-pill-inactive",
  };

  return classes[status] || "admin-user-pill admin-user-pill-viewer";
}

export function formatAdminDate(value: string | null | undefined) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
