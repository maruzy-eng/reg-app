import Link from "next/link";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { createAdminUserAction } from "@/app/admin/users/actions";
import { requireAdminPermission } from "@/lib/admin-permissions";

export default async function NewAdminUserPage() {
  await requireAdminPermission("users.create");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#587469] transition hover:text-[#171614]"
        >
          <ArrowLeft size={18} />
          Back to users
        </Link>
      </div>

      <div className="admin-card p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="admin-icon-box flex h-12 w-12 items-center justify-center rounded-2xl">
            <UserPlus size={24} />
          </span>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c79a4b]">
              New User
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#171614]">
              Create Admin User
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#587469]">
          This user will be able to sign in at /admin/login using the email and
          password created here.
        </p>

        <form action={createAdminUserAction} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-[#171614]">Name *</span>

            <input
              name="name"
              required
              placeholder="Admin User"
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#171614]">Email *</span>

            <input
              name="email"
              type="email"
              required
              placeholder="admin@property.com"
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#171614]">Password *</span>

            <input
              name="password"
              type="password"
              required
              placeholder="Create a secure password"
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[#171614]">Role</span>

              <select
                name="role"
                defaultValue="viewer"
                className="admin-input mt-2 w-full px-4 py-3 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-[#171614]">Status</span>

              <select
                name="status"
                defaultValue="active"
                className="admin-input mt-2 w-full px-4 py-3 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-[#171614]">Avatar URL</span>

            <input
              name="avatar_url"
              placeholder="https://..."
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <Link
              href="/admin/users"
              className="admin-secondary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm transition hover:bg-[#f8f6f1]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
            >
              <Save size={18} />
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
