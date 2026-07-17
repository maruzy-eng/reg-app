"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Boxes,
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
    | "complementos"
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
  complementos: Boxes,
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
    <nav className="mt-6 space-y-1">
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
              "admin-sidebar-nav-link flex min-h-[42px] items-center gap-2.5 rounded-[14px] px-2.5 text-[13px] no-underline",
              isActive && "admin-sidebar-nav-link-active",
            )}
          >
            <span
              className={cn(
                "admin-sidebar-nav-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-xl",
                isActive && "admin-sidebar-nav-icon-active",
              )}
            >
              <Icon size={15} />
            </span>

            <span
              className={cn(
                "admin-sidebar-nav-label",
                isActive && "admin-sidebar-nav-label-active",
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
