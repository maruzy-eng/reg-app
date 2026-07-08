import { currentAdminHasPermission } from "@/lib/admin-permissions";
import type { AdminPermission } from "@/lib/admin-permissions";

export async function RoleGuard({
  permission,
  children,
  fallback = null,
}: {
  permission: AdminPermission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const allowed = await currentAdminHasPermission(permission);

  if (!allowed) {
    return fallback;
  }

  return children;
}