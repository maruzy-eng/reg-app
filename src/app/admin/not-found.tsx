import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AdminNotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc] px-5 py-10">
      <div className="admin-card max-w-lg rounded-[2rem] p-8 text-center shadow-[0_20px_60px_rgba(14,53,65,0.08)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f8fafc] text-[#53bc76]">
          <LayoutDashboard size={30} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#0e3541]">
          Admin page not found
        </h1>

        <p className="mt-3 text-[#587469]">
          The admin page you are trying to access does not exist or has been
          moved.
        </p>

        <Link
          href="/admin/dashboard"
          className="admin-primary-button mt-6 inline-flex rounded-2xl px-5 py-3 text-sm transition hover:brightness-105"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
