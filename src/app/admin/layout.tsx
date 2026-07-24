import Link from "next/link";
import { headers } from "next/headers";
import { Building2, Home, LogOut } from "lucide-react";
import { logoutAdminAction } from "@/app/admin/login/actions";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import {
  AdminThemeProvider,
  AdminThemeToggle,
} from "@/components/admin/admin-theme";
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
    label: "News",
    href: "/admin/news",
    icon: "news",
    permission: "news.read",
  },
  {
    label: "Produtos",
    href: "/admin/produtos",
    icon: "products",
    permission: "products.read",
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
      <aside className="admin-sidebar-shell fixed left-0 top-0 hidden h-screen w-64 p-4 lg:block">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2.5 no-underline"
        >
          <span className="admin-sidebar-brand-icon flex h-9 w-9 items-center justify-center rounded-xl">
            <Building2 size={18} />
          </span>

          <div>
            <p className="admin-sidebar-brand-title">Checkmate REG</p>
            <p className="admin-sidebar-brand-subtitle mt-0.5">Admin Panel</p>
          </div>
        </Link>

        <AdminSidebarNav items={visibleNavItems} />

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          {session ? (
            <div className="admin-user-card rounded-xl p-3">
              <p className="admin-user-card-eyebrow text-[10px] font-semibold uppercase tracking-[0.12em]">
                Logged as
              </p>

              <p className="admin-user-card-name mt-1 truncate text-[13px] font-semibold">
                {session.name}
              </p>

              <p className="admin-user-card-email mt-0.5 truncate text-[11px]">
                {session.email}
              </p>

              <span className="admin-user-card-role mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]">
                {session.role}
              </span>
            </div>
          ) : null}

          <Link
            href="/reg"
            className="admin-sidebar-view-site flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition"
          >
            <Home size={15} />
            View Website
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="admin-sidebar-logout flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition"
            >
              <LogOut size={15} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <section className="lg:pl-64">
        <header className="admin-header sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div>
              <p className="admin-header-eyebrow">Admin</p>

              <h1 className="admin-header-title mt-0.5">
                REG Management
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <AdminThemeToggle />

              {session ? (
                <span className="admin-badge hidden px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] sm:inline-flex">
                  {session.role}
                </span>
              ) : null}

              <Link
                href="/reg"
                className="admin-primary-button rounded-xl px-3.5 py-1.5 text-[12px] font-semibold no-underline"
              >
                Public Site
              </Link>

              <form action={logoutAdminAction} className="hidden sm:block">
                <button
                  type="submit"
                  className="admin-top-logout rounded-xl px-3.5 py-1.5 text-[12px] font-semibold transition"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="admin-content px-4 py-5 lg:px-6 lg:py-6">
          {children}
        </div>
      </section>
    </AdminThemeProvider>
  );
}
