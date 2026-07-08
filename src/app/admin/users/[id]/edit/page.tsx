import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Save, UserCog } from "lucide-react";
import { getAdminUserById } from "@/lib/admin-users";
import { updateAdminUserAction } from "@/app/admin/users/actions";
import { requireAdminPermission } from "@/lib/admin-permissions";

type EditAdminUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdminUserPage({
  params,
}: EditAdminUserPageProps) {
  await requireAdminPermission("users.update");

  const { id } = await params;
  const user = await getAdminUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#587469] transition hover:text-[#0e3541]"
        >
          <ArrowLeft size={18} />
          Back to users
        </Link>
      </div>

      <div className="admin-card p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="admin-icon-box flex h-12 w-12 items-center justify-center rounded-2xl">
            <UserCog size={24} />
          </span>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#53bc76]">
              Edit User
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#0e3541]">
              {user.name}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#587469]">
          Update this admin user. Leave password empty if you do not want to
          change it.
        </p>

        <form action={updateAdminUserAction} className="mt-8 space-y-5">
          <input type="hidden" name="user_id" value={user.id} />

          <label className="block">
            <span className="text-sm font-bold text-[#0e3541]">Name *</span>

            <input
              name="name"
              required
              defaultValue={user.name}
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#0e3541]">Email *</span>

            <input
              name="email"
              type="email"
              required
              defaultValue={user.email}
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#0e3541]">
              New Password
            </span>

            <input
              name="password"
              type="password"
              placeholder="Leave empty to keep current password"
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[#0e3541]">Role</span>

              <select
                name="role"
                defaultValue={user.role}
                className="admin-input mt-2 w-full px-4 py-3 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-[#0e3541]">Status</span>

              <select
                name="status"
                defaultValue={user.status}
                className="admin-input mt-2 w-full px-4 py-3 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-[#0e3541]">Avatar URL</span>

            <input
              name="avatar_url"
              defaultValue={user.avatar_url || ""}
              placeholder="https://..."
              className="admin-input mt-2 w-full px-4 py-3 text-sm"
            />
          </label>

          <div className="rounded-2xl bg-[#f8fafc] p-4 text-sm text-[#64748b]">
            <p>
              <strong className="text-[#0e3541]">Created:</strong>{" "}
              {new Date(user.created_at).toLocaleString("en-US")}
            </p>

            <p className="mt-1">
              <strong className="text-[#0e3541]">Last update:</strong>{" "}
              {new Date(user.updated_at).toLocaleString("en-US")}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <Link
              href="/admin/users"
              className="admin-secondary-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm transition hover:bg-[#f8fafc]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
