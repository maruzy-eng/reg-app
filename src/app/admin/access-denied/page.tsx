import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminRoleDescription, getAdminRoleLabel } from "@/lib/admin-permissions";

export default async function AdminAccessDeniedPage() {
  const session = await getAdminSession();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc] px-5 py-10">
      <div className="admin-card max-w-lg rounded-[2rem] p-8 text-center shadow-[0_20px_60px_rgba(14,53,65,0.08)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-700">
          <ShieldAlert size={32} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#0e3541]">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#587469]">
          Your current admin role does not have permission to access this area
          or perform this action.
        </p>

        {session ? (
          <div className="mt-6 rounded-2xl bg-[#f8fafc] p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#587469]">
              Current role
            </p>

            <p className="mt-2 text-lg font-bold text-[#0e3541]">
              {getAdminRoleLabel(session.role)}
            </p>

            <p className="mt-1 text-sm leading-6 text-[#587469]">
              {getAdminRoleDescription(session.role)}
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/admin/dashboard"
            className="admin-primary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm transition hover:brightness-105"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/"
            className="admin-secondary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm transition hover:bg-[#f8fafc]"
          >
            Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
