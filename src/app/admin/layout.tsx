import Link from "next/link";
import { headers } from "next/headers";
import {
  Building2,
  Home,
  LogOut,
} from "lucide-react";
import { logoutAdminAction } from "@/app/admin/login/actions";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import { AdminThemeProvider, AdminThemeToggle } from "@/components/admin/admin-theme";
import { getAdminSession, requireAdminSession } from "@/lib/admin-auth";
import { roleHasPermission } from "@/lib/admin-permissions";

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
    permission: "dashboard.read",
  },
  {
    label: "Properties",
    href: "/admin/properties",
    icon: "properties",
    permission: "properties.read",
  },
  {
    label: "Complementos",
    href: "/admin/complementos",
    icon: "complementos",
    permission: "properties.read",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: "users",
    permission: "users.read",
  },
  {
    label: "Forms",
    href: "/admin/forms",
    icon: "forms",
    permission: "forms.read",
  },
  {
    label: "Submissions",
    href: "/admin/submissions",
    icon: "submissions",
    permission: "submissions.read",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "settings",
    permission: "settings.read",
  },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return children;
  }

  await requireAdminSession();
  const session = await getAdminSession();

  const visibleNavItems = adminNavItems.filter((item) =>
    roleHasPermission(session?.role, item.permission),
  );

  return (
    <AdminThemeProvider>
      <aside className="admin-sidebar-shell fixed left-0 top-0 hidden h-screen w-72 p-5 lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-3 no-underline">
          <span className="admin-sidebar-brand-icon flex h-11 w-11 items-center justify-center rounded-2xl">
            <Building2 size={22} />
          </span>

          <div>
            <p className="admin-sidebar-brand-title font-bold">Property Portal</p>
            <p className="admin-sidebar-brand-subtitle text-xs">Admin Panel</p>
          </div>
        </Link>

        <AdminSidebarNav items={visibleNavItems} />

        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          {session ? (
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-xs font-semibold text-white/45">Logged as</p>

              <p className="mt-1 truncate text-sm font-bold text-white">
                {session.name}
              </p>

              <p className="mt-1 truncate text-xs text-white/60">
                {session.email}
              </p>

              <span className="admin-user-card-role mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase">
                {session.role}
              </span>
            </div>
          ) : null}

          <Link
            href="/"
            className="admin-sidebar-view-site flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition"
          >
            <Home size={18} />
            View Website
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="admin-sidebar-logout flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <section className="lg:pl-72">
        <header className="admin-header sticky top-0 z-20">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="admin-header-eyebrow text-sm">Admin</p>

              <h1 className="admin-header-title text-xl font-bold">
                Property Management
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <AdminThemeToggle />

              {session ? (
                <span className="admin-badge hidden px-3 py-1 text-xs uppercase sm:inline-flex">
                  {session.role}
                </span>
              ) : null}

              <Link
                href="/"
                className="admin-primary-button rounded-2xl px-4 py-2 text-sm"
              >
                Public Site
              </Link>

              <form action={logoutAdminAction} className="hidden sm:block">
                <button
                  type="submit"
                  className="admin-top-logout rounded-2xl px-4 py-2 text-sm font-bold transition"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="admin-content px-5 py-6 lg:px-8">{children}</div>
      </section>
    </AdminThemeProvider>
  );
}
