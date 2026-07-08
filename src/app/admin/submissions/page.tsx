import type { ReactNode } from "react";
import Link from "next/link";
import { Inbox, ArrowLeft, ArrowRight, Eye, FileText, Search, Send } from "lucide-react";
import {
  getAdminSubmissions,
  getLeadDisplayName,
  getSubmissionEmailStatusLabel,
  getSubmissionEmailStatusKey,
  type AdminSubmissionSearchParams,
} from "@/lib/admin-submissions";

type AdminSubmissionsPageProps = {
  searchParams: Promise<{
    status?: string;
    form_id?: string;
    email_status?: string;
    search?: string;
    date_from?: string;
    date_to?: string;
    page?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusBadgeClass(status: string) {
  if (status === "success") {
    return "admin-status-pill admin-status-pill-success";
  }

  if (status === "partial_error") {
    return "admin-status-pill admin-status-pill-warning";
  }

  if (status === "error") {
    return "admin-status-pill admin-status-pill-danger";
  }

  if (status === "pending") {
    return "admin-status-pill admin-status-pill-info";
  }

  return "admin-status-pill admin-status-pill-neutral";
}

function buildQueryString(
  current: Record<string, string | undefined>,
  overrides: Record<string, string | number | undefined>,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(current)) {
    if (value) {
      params.set(key, value);
    }
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined || value === "") {
      params.delete(key);
      continue;
    }

    params.set(key, String(value));
  }

  return params.toString();
}

export default async function AdminSubmissionsPage({
  searchParams,
}: AdminSubmissionsPageProps) {
  const resolvedSearchParams = await searchParams;

  const params: AdminSubmissionSearchParams = {
    status: resolvedSearchParams.status,
    form_id: resolvedSearchParams.form_id,
    email_status: resolvedSearchParams.email_status,
    search: resolvedSearchParams.search,
    date_from: resolvedSearchParams.date_from,
    date_to: resolvedSearchParams.date_to,
    page: resolvedSearchParams.page,
  };

  const result = await getAdminSubmissions(params);

  const currentFilters = {
    status: resolvedSearchParams.status,
    form_id: resolvedSearchParams.form_id,
    email_status: resolvedSearchParams.email_status,
    search: resolvedSearchParams.search,
    date_from: resolvedSearchParams.date_from,
    date_to: resolvedSearchParams.date_to,
  };

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <Link
              href="/admin/forms"
              className="admin-secondary-button mb-6 min-h-[42px] w-fit gap-2 px-4 text-sm no-underline"
            >
              <ArrowLeft size={16} />
              Back to Forms
            </Link>

            <div className="flex items-start gap-4">
              <div className="admin-icon-box h-12 w-12 shrink-0">
                <Inbox size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">Admin</p>

                <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#0c2933]">
                  Submissions
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Track every form submission, webhook result and email
                  delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="admin-badge px-3 py-1 text-[11px] uppercase tracking-[0.08em]">
              {result.stats.total_submissions} total
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard title="Total submissions" value={result.stats.total_submissions} icon={<FileText size={20} />} />
        <StatCard title="Successful submissions" value={result.stats.successful_submissions} icon={<Send size={20} />} />
        <StatCard title="Submissions with errors" value={result.stats.error_submissions} icon={<Inbox size={20} />} />
        <StatCard title="Webhook errors" value={result.stats.webhook_errors} icon={<Inbox size={20} />} />
        <StatCard title="Emails sent" value={result.stats.emails_sent} icon={<Send size={20} />} />
        <StatCard title="Email errors" value={result.stats.email_errors} icon={<Inbox size={20} />} />
      </section>

      <section className="admin-section p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="admin-icon-box h-11 w-11">
            <Search size={20} />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Filters
            </h3>

            <p className="text-sm text-slate-500">
              Narrow submissions by status, form, date and free text search.
            </p>
          </div>
        </div>

        <form
          method="get"
          action="/admin/submissions"
          className="grid gap-4 lg:grid-cols-2 xl:grid-cols-6"
        >
          <input type="hidden" name="page" value="1" />

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Status
            </label>

            <select
              name="status"
              defaultValue={resolvedSearchParams.status || "all"}
              className="admin-input min-h-[46px] px-4"
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="partial_error">Partial error</option>
              <option value="not_configured">Not configured</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Form
            </label>

            <select
              name="form_id"
              defaultValue={resolvedSearchParams.form_id || "all"}
              className="admin-input min-h-[46px] px-4"
            >
              <option value="all">All forms</option>
              {result.forms.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Email status
            </label>

            <select
              name="email_status"
              defaultValue={resolvedSearchParams.email_status || "all"}
              className="admin-input min-h-[46px] px-4"
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="xl:col-span-2">
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Search
            </label>

            <input
              name="search"
              type="search"
              defaultValue={resolvedSearchParams.search || ""}
              placeholder="Name, email, phone or JSON text"
              className="admin-input min-h-[46px] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Date from
            </label>

            <input
              name="date_from"
              type="date"
              defaultValue={resolvedSearchParams.date_from || ""}
              className="admin-input min-h-[46px] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Date to
            </label>

            <input
              name="date_to"
              type="date"
              defaultValue={resolvedSearchParams.date_to || ""}
              className="admin-input min-h-[46px] px-4"
            />
          </div>

          <div className="flex items-end gap-3 xl:col-span-6">
            <button
              type="submit"
              className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
            >
              Apply filters
            </button>

            <Link
              href="/admin/submissions"
              className="admin-secondary-button min-h-[46px] gap-2 px-5 text-sm no-underline"
            >
              Reset
            </Link>
          </div>
        </form>
      </section>

      <section className="admin-table">
        <div className="flex flex-col gap-3 border-b border-[rgba(12,41,51,0.08)] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              All submissions
            </h3>

            <p className="text-sm text-slate-500">
              Page {result.page} of {Math.max(1, Math.ceil(result.stats.total_submissions / result.pageSize))}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="admin-badge px-3 py-1">{result.items.length} shown</span>
            <span className="admin-badge px-3 py-1">
              {result.hasNextPage ? "More results" : "End of results"}
            </span>
          </div>
        </div>

        {result.items.length === 0 ? (
          <div className="admin-empty-state flex flex-col items-center justify-center px-6 py-16 text-center">
            <Inbox size={28} />

            <h3 className="mt-5 text-xl font-bold text-[#0c2933]">
              No submissions found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try clearing filters or check if submissions have already been
              received by the public forms.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1320px] border-collapse text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Form
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Lead
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Webhook Status
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Email Status
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Webhooks
                  </th>
                  <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Emails
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {result.items.map((item) => {
                  const lead = getLeadDisplayName(item.data, item.id);
                  const emailStatusKey = getSubmissionEmailStatusKey(item);
                  const emailStatus = getSubmissionEmailStatusLabel(item);

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[rgba(12,41,51,0.06)] last:border-b-0"
                    >
                      <td className="px-6 py-5 align-top text-sm text-[#0c2933]">
                        <div className="font-bold">{formatDate(item.created_at)}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {item.id.slice(0, 8)}
                        </div>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="max-w-[240px]">
                          <p className="font-bold text-[#0c2933]">
                            {item.form_name || "Unknown form"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {item.form_title || item.form_slug || "—"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="max-w-[280px]">
                          <p className="font-bold text-[#0c2933]">
                            {lead.name}
                          </p>

                          {lead.email ? (
                            <p className="mt-1 truncate text-xs text-slate-500">
                              {lead.email}
                            </p>
                          ) : null}

                          {lead.phone ? (
                            <p className="mt-1 text-xs text-slate-500">
                              {lead.phone}
                            </p>
                          ) : null}
                        </div>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <span
                          className={getStatusBadgeClass(item.webhook_status)}
                        >
                          {item.webhook_status}
                        </span>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <span
                          className={getStatusBadgeClass(emailStatusKey)}
                        >
                          {emailStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="space-y-1 text-sm font-bold text-[#0c2933]">
                          <p>{item.webhook_success_count} success</p>
                          <p className="text-xs text-slate-500">
                            {item.webhook_error_count} errors
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="space-y-1 text-sm font-bold text-[#0c2933]">
                          <p>{item.email_success_count} sent</p>
                          <p className="text-xs text-slate-500">
                            {item.email_error_count} errors
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={
                              item.form_id
                                ? `/admin/forms/${item.form_id}/submissions/${item.id}`
                                : "#"
                            }
                            className="admin-secondary-button min-h-[40px] gap-2 px-4 text-xs no-underline"
                          >
                            View
                            <Eye size={15} />
                          </Link>

                          <Link
                            href={item.form_id ? `/admin/forms/${item.form_id}` : "#"}
                            className="admin-primary-button min-h-[40px] gap-2 px-4 text-xs no-underline"
                          >
                            Open Form
                            <ArrowRight size={15} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-[rgba(12,41,51,0.08)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing page {result.page} of{" "}
            {Math.max(1, Math.ceil(result.stats.total_submissions / result.pageSize))}
          </p>

          <div className="flex items-center gap-2">
            <Link
              href={
                result.page > 1
                  ? `/admin/submissions?${buildQueryString(currentFilters, {
                      page: result.page - 1,
                    })}`
                  : "#"
              }
              aria-disabled={result.page <= 1}
              className="admin-secondary-button min-h-[42px] gap-2 px-4 text-sm no-underline aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <ArrowLeft size={15} />
              Previous
            </Link>

            <span className="admin-badge px-3 py-2 text-xs">
              Page {result.page}
            </span>

            <Link
              href={
                result.hasNextPage
                  ? `/admin/submissions?${buildQueryString(currentFilters, {
                      page: result.page + 1,
                    })}`
                  : "#"
              }
              aria-disabled={!result.hasNextPage}
              className="admin-secondary-button min-h-[42px] gap-2 px-4 text-sm no-underline aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              Next
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="admin-kpi-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-[#0c2933]">{value}</p>
        </div>

        <span className="admin-icon-box h-11 w-11">{icon}</span>
      </div>
    </div>
  );
}
