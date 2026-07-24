import Link from "next/link";
import {
  Mail,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";
import {
  formatAdminDate,
  getAdminRoleClassName,
  getAdminRoleLabel,
  getAdminStatusClassName,
  getAdminUsers,
} from "@/lib/admin-users";
import { deleteAdminUserAction } from "@/app/admin/users/actions";
import { RoleGuard } from "@/components/admin/role-guard";
import { requireAdminPermission } from "@/lib/admin-permissions";

export default async function AdminUsersPage() {
  await requireAdminPermission("users.read");

  const users = await getAdminUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const editorUsers = users.filter((user) => user.role === "editor").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c79a4b]">
            Access
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#171614]">Users</h2>

          <p className="mt-2 text-[#64748b]">
            Manage administrative users, roles and access status.
          </p>
        </div>

        <RoleGuard permission="users.create">
          <Link
            href="/admin/users/new"
            className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
          >
            <Plus size={18} />
            New User
          </Link>
        </RoleGuard>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="admin-kpi-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#64748b]">Total Users</p>
            <Users size={20} className="text-[#c79a4b]" />
          </div>

          <p className="mt-4 text-3xl font-bold text-[#171614]">
            {totalUsers}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#64748b]">Active</p>
            <ShieldCheck size={20} className="text-[#c79a4b]" />
          </div>

          <p className="mt-4 text-3xl font-bold text-[#171614]">
            {activeUsers}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#64748b]">Admins</p>
            <User size={20} className="text-[#c79a4b]" />
          </div>

          <p className="mt-4 text-3xl font-bold text-[#171614]">
            {adminUsers}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#64748b]">Editors</p>
            <Pencil size={20} className="text-[#c79a4b]" />
          </div>

          <p className="mt-4 text-3xl font-bold text-[#171614]">
            {editorUsers}
          </p>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="admin-table mt-6">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-[rgba(23,22,20,0.1)] bg-[#f8f6f1] text-[#64748b]">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Last Login</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black/10">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="h-11 w-11 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="admin-icon-box flex h-11 w-11 items-center justify-center rounded-2xl">
                          <User size={20} />
                        </div>
                      )}

                      <div>
                        <p className="font-bold text-[#171614]">{user.name}</p>
                        <p className="text-xs text-[#94a3b8]">{user.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#64748b]">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-[#c79a4b]" />
                      {user.email}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getAdminRoleClassName(
                        user.role,
                      )}`}
                    >
                      {getAdminRoleLabel(user.role)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getAdminStatusClassName(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#64748b]">
                    {formatAdminDate(user.last_login_at)}
                  </td>

                  <td className="px-5 py-4 text-[#64748b]">
                    {formatAdminDate(user.created_at)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <RoleGuard permission="users.update">
                        <Link
                          href={`/admin/users/${user.id}/edit`}
                          className="admin-primary-button inline-flex items-center justify-center gap-2 px-4 py-2 text-sm transition hover:brightness-105"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>
                      </RoleGuard>

                      <RoleGuard permission="users.delete">
                        <form action={deleteAdminUserAction}>
                          <input type="hidden" name="user_id" value={user.id} />

                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </form>
                      </RoleGuard>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 rounded-[2rem] border border-dashed border-[rgba(23,22,20,0.15)] bg-white p-10 text-center">
          <Users className="mx-auto text-[#c79a4b]" size={44} />

          <h3 className="mt-4 text-2xl font-bold text-[#171614]">
            No admin users found
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-[#64748b]">
            Create your first administrative user to organize team access.
          </p>

          <RoleGuard permission="users.create">
            <Link
              href="/admin/users/new"
              className="admin-primary-button mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
            >
              <Plus size={18} />
              Add First User
            </Link>
          </RoleGuard>
        </div>
      )}
    </div>
  );
}
