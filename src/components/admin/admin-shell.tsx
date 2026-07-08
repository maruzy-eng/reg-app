"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ClipboardList,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  MoonStar,
  Settings,
  SunMedium,
  Users,
  X,
} from "lucide-react";
import { useAdminThemeController } from "@/components/admin/admin-theme";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
};

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Forms",
    href: "/admin/forms",
    icon: ClipboardList,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AdminShell({
  children,
  title = "Property Management",
  eyebrow = "Admin",
  user,
}: AdminShellProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useAdminThemeController();

  const displayName = user?.name || "Environment Admin";
  const displayEmail = user?.email || "admin@checkmateproperty.com";
  const displayRole = user?.role || "Admin";

  function closeMobileMenu() {
    setIsMobileOpen(false);
  }

  return (
    <div className={cn("admin-page", isDark && "admin-dark")}>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="admin-mobile-menu-button fixed left-4 top-4 z-[90] flex h-11 w-11 items-center justify-center rounded-2xl lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu size={22} />
      </button>

      {isMobileOpen ? (
        <button
          type="button"
          onClick={closeMobileMenu}
          className="admin-mobile-backdrop fixed inset-0 z-[95] lg:hidden"
          aria-label="Close admin menu"
        />
      ) : null}

      <aside
        className={cn(
          "admin-sidebar-shell fixed bottom-0 left-0 top-0 z-[100] w-[272px] overflow-hidden transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex min-h-[88px] items-center justify-between border-b border-white/10 px-5">
            <Link
              href="/admin/dashboard"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 no-underline"
            >
              <span className="admin-sidebar-brand-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Building2 size={23} />
              </span>

              <span>
                <span className="admin-sidebar-brand-title block text-base font-bold leading-tight">
                  Property Portal
                </span>

                <span className="admin-sidebar-brand-subtitle mt-1 block text-xs font-normal">
                  Admin Panel
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="admin-sidebar-close-button flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              aria-label="Close admin menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1.5 px-4 py-6">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive ? "true" : undefined}
                  className={cn(
                    "admin-sidebar-nav-link flex min-h-[50px] items-center gap-3 rounded-[18px] px-3.5 text-sm font-semibold no-underline transition",
                    isActive && "admin-sidebar-nav-link-active",
                  )}
                >
                  <span
                    className={cn(
                      "admin-sidebar-nav-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl",
                      isActive && "admin-sidebar-nav-icon-active",
                    )}
                  >
                    <Icon size={18} />
                  </span>

                  <span
                    className={cn(
                      "admin-sidebar-nav-label font-semibold",
                      isActive && "admin-sidebar-nav-label-active font-bold",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-4">
            <div data-admin-user-card className="admin-user-card rounded-[24px] p-4">
              <p className="admin-user-card-eyebrow text-[11px] font-bold uppercase tracking-[0.18em]">
                Logged in as
              </p>

              <p className="admin-user-card-name mt-2 text-sm font-bold leading-tight">
                {displayName}
              </p>

              <p className="admin-user-card-email mt-1 truncate text-xs font-normal">
                {displayEmail}
              </p>

              <span className="admin-user-card-role mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]">
                {displayRole}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="admin-sidebar-view-site mt-3 flex min-h-[46px] items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-bold transition"
            >
              <ExternalLink size={16} />
              View Website
            </Link>

            <Link
              href="/admin/logout"
              className="admin-sidebar-logout mt-3 flex min-h-[46px] items-center justify-center gap-2 rounded-[18px] px-4 text-sm font-bold transition"
            >
              <LogOut size={16} />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[272px]">
        <header className="admin-header sticky top-0 z-[80] px-5 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-5">
            <div className="pl-14 lg:pl-0">
              <p className="text-sm font-medium">{eyebrow}</p>

              <h1 className="mt-0.5 text-2xl font-bold tracking-[-0.045em]">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="admin-secondary-button hidden min-h-[42px] items-center gap-2 px-4 text-sm md:inline-flex"
                aria-label="Toggle admin theme"
              >
                {isDark ? <SunMedium size={15} /> : <MoonStar size={15} />}
                {isDark ? "Light" : "Dark"}
              </button>

              <span className="admin-badge hidden px-4 py-2 uppercase tracking-[0.12em] md:inline-flex">
                {displayRole}
              </span>

              <Link
                href="/"
                target="_blank"
                className="admin-primary-button inline-flex min-h-[42px] gap-2 px-5 text-sm no-underline transition"
              >
                Public Site
                <ExternalLink size={15} />
              </Link>

              <Link
                href="/admin/logout"
                className="admin-top-logout hidden min-h-[42px] items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition md:inline-flex"
              >
                <LogOut size={15} />
                Logout
              </Link>
            </div>
          </div>
        </header>

        <main className="admin-content w-full px-5 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
