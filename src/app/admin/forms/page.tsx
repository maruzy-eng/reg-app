import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Eye,
  FileText,
  Link2,
  Plus,
  RadioTower,
  Send,
} from "lucide-react";
import { DuplicateFormButton } from "@/components/admin/forms/duplicate-form-button";
import { duplicateAdminFormAction, getAdminForms } from "@/lib/admin-forms";
import { getFormPageConnectionDefinition } from "@/lib/form-page-connections";

function getStatusClass(status: string) {
  if (status === "published") {
    return "admin-user-pill-active";
  }

  if (status === "archived") {
    return "admin-user-pill-viewer";
  }

  return "admin-user-pill-viewer";
}

export default async function AdminFormsPage() {
  const forms = await getAdminForms();

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="admin-icon-box h-12 w-12">
              <ClipboardList size={22} />
            </div>

            <h2 className="admin-list-title mt-5 text-3xl font-bold tracking-normal">
              Dynamic Forms
            </h2>

            <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
              Create different forms with custom fields, multiple webhooks,
              specific thank you pages and different automation workflows.
            </p>
          </div>

          <Link
            href="/admin/forms/new"
            className="admin-primary-button min-h-[48px] gap-2 px-5 text-sm no-underline"
          >
            <Plus size={18} />
            New Form
          </Link>
        </div>
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
          <div>
            <h3 className="admin-list-title text-lg font-bold tracking-normal">
              All forms
            </h3>
            <p className="admin-list-meta mt-1 text-sm">
              Manage public forms and their automations.
            </p>
          </div>

          <span className="admin-badge px-3 py-1">{forms.length} total</span>
        </div>

          {forms.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="admin-icon-box h-14 w-14">
                <FileText size={24} />
              </div>

              <h3 className="admin-list-title mt-5 text-xl font-bold">
                No forms yet
              </h3>

              <p className="admin-list-meta mt-2 max-w-md text-sm leading-6">
                Create your first dynamic form to start receiving submissions
                and triggering webhooks.
              </p>

              <Link
                href="/admin/forms/new"
                className="admin-primary-button mt-6 min-h-[46px] gap-2 px-5 text-sm no-underline"
              >
                <Plus size={17} />
                Create Form
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] border-collapse text-left">
                <thead>
                  <tr className="admin-panel-header">
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Form
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Status
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Page
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Fields
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Webhooks
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em]">
                      Submissions
                    </th>
                    <th className="admin-list-meta px-6 py-4 text-right text-xs font-extrabold uppercase tracking-[0.12em]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {forms.map((form) => (
                    <tr
                      key={form.id}
                      className="border-b border-[rgba(12,41,51,0.06)] last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <div className="admin-icon-box mt-0.5 h-10 w-10 shrink-0">
                            <FileText size={18} />
                          </div>

                          <div>
                            <p className="admin-list-title font-bold">
                              {form.name}
                            </p>

                            <p className="admin-list-meta mt-1 text-sm">
                              /forms/{form.slug}
                            </p>

                            <p className="admin-list-meta mt-1 max-w-md truncate text-xs">
                              {form.title}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`admin-user-pill px-3 py-1 text-xs uppercase tracking-[0.08em] ${getStatusClass(
                            form.status,
                          )}`}
                        >
                          {form.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {(form.page_connections || []).length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {(form.page_connections || []).map((connection) => {
                              const definition = getFormPageConnectionDefinition(
                                connection.page_key,
                              );

                              return (
                                <div
                                  key={connection.id}
                                  className="admin-list-title flex items-center gap-2 text-sm font-bold"
                                >
                                  <Link2
                                    size={16}
                                    className="shrink-0 text-[#53bc76]"
                                  />
                                  <span>
                                    {definition?.label || connection.page_key}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="admin-list-meta text-sm">—</span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <div className="admin-list-title flex items-center gap-2 text-sm font-bold">
                          <ClipboardList size={16} className="text-slate-400" />
                          {form.fields_count || 0}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="admin-list-title flex items-center gap-2 text-sm font-bold">
                          <RadioTower size={16} className="text-slate-400" />
                          {form.webhooks_count || 0}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="admin-list-title flex items-center gap-2 text-sm font-bold">
                          <Send size={16} className="text-slate-400" />
                          {form.submissions_count || 0}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <form action={duplicateAdminFormAction}>
                            <input type="hidden" name="id" value={form.id} />
                            <DuplicateFormButton />
                          </form>

                          <Link
                            href={`/forms/${form.slug}`}
                            target="_blank"
                            className="admin-secondary-button min-h-[40px] gap-2 px-4 text-xs no-underline"
                          >
                            <Eye size={15} />
                            View
                          </Link>

                          <Link
                            href={`/admin/forms/${form.id}`}
                            className="admin-primary-button min-h-[40px] gap-2 px-4 text-xs no-underline"
                          >
                            Edit
                            <ArrowRight size={15} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </section>
    </div>
  );
}
