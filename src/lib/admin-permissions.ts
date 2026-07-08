import "server-only";

import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

export type AdminRole = "admin" | "editor" | "viewer";

export type AdminPermission =
  | "dashboard.read"
  | "properties.read"
  | "properties.create"
  | "properties.update"
  | "properties.delete"
  | "forms.read"
  | "forms.update"
  | "forms.delete"
  | "submissions.read"
  | "users.read"
  | "users.create"
  | "users.update"
  | "users.delete"
  | "settings.read"
  | "settings.update";

const rolePermissions: Record<AdminRole, AdminPermission[]> = {
  admin: [
    "dashboard.read",
    "properties.read",
    "properties.create",
    "properties.update",
    "properties.delete",
    "forms.read",
    "forms.update",
    "forms.delete",
    "submissions.read",
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
    "settings.read",
    "settings.update",
  ],

  editor: [
    "dashboard.read",
    "properties.read",
    "properties.create",
    "properties.update",
    "forms.read",
    "forms.update",
    "submissions.read",
    "settings.read",
  ],

  viewer: [
    "dashboard.read",
    "properties.read",
    "forms.read",
    "submissions.read",
    "settings.read",
  ],
};

export function roleHasPermission(
  role: AdminRole | string | undefined,
  permission: AdminPermission,
) {
  if (!role) {
    return false;
  }

  const normalizedRole = role as AdminRole;
  const permissions = rolePermissions[normalizedRole];

  if (!permissions) {
    return false;
  }

  return permissions.includes(permission);
}

export async function currentAdminHasPermission(permission: AdminPermission) {
  const session = await getAdminSession();

  if (!session) {
    return false;
  }

  return roleHasPermission(session.role, permission);
}

export async function requireAdminPermission(permission: AdminPermission) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (!roleHasPermission(session.role, permission)) {
    redirect("/admin/access-denied");
  }

  return session;
}

export function getAdminRoleLabel(role: AdminRole | string) {
  const labels: Record<string, string> = {
    admin: "Admin",
    editor: "Editor",
    viewer: "Viewer",
  };

  return labels[role] || role;
}

export function getAdminRoleDescription(role: AdminRole | string) {
  const descriptions: Record<string, string> = {
    admin: "Full access to properties, users, leads, settings and system actions.",
    editor:
      "Can create and edit properties, manage leads and view settings. Cannot manage users.",
    viewer: "Read-only access to properties, leads and settings.",
  };

  return descriptions[role] || "Custom administrative role.";
}
