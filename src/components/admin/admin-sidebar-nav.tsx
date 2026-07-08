"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Inbox,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

type AdminSidebarNavItem = {
  label: string;
  href: string;
  icon:
    | "dashboard"
    | "properties"
    | "users"
    | "forms"
    | "submissions"
    | "settings";
};

type AdminSidebarNavProps = {
  items: AdminSidebarNavItem[];
};

const adminSidebarIcons = {
  dashboard: LayoutDashboard,
  properties: Building2,
  users: Users,
  forms: FileText,
  submissions: Inbox,
  settings: Settings,
} satisfies Record<AdminSidebarNavItem["icon"], typeof LayoutDashboard>;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AdminSidebarNav({ items }: AdminSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-2">
      {items.map((item) => {
        const Icon = adminSidebarIcons[item.icon];
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
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
  );
}
