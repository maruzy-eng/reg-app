import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  RadioTower,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { EmailBuilderForm } from "@/components/admin/forms/email-builder-form";
import { FieldBuilderForm } from "@/components/admin/forms/field-builder-form";
import { DuplicateFormButton } from "@/components/admin/forms/duplicate-form-button";
import {
  createAdminFormFieldAction,
  createAdminFormWebhookAction,
  deleteAdminFormAction,
  deleteAdminFormFieldAction,
  deleteAdminFormWebhookAction,
  duplicateAdminFormAction,
  getAdminFormDetails,
  toggleAdminFormWebhookAction,
  updateAdminFormAction,
} from "@/lib/admin-forms";
import {
  createAdminFormEmailAction,
  deleteAdminFormEmailAction,
  toggleAdminFormEmailAction,
} from "@/lib/admin-form-emails";

type AdminFormDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    duplicated?: string;
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

function stringifyJson(value: unknown) {
  return JSON.stringify(value || {}, null, 2);
}

function getSubmissionStatusClass(status: string) {
  if (status === "success") {
    return "admin-status-pill admin-status-pill-success";
  }

  if (status === "partial_error") {
    return "admin-status-pill admin-status-pill-warning";
  }

  if (status === "error") {
    return "admin-status-pill admin-status-pill-danger";
  }

  if (status === "not_configured") {
    return "admin-status-pill admin-status-pill-neutral";
  }

  return "admin-status-pill admin-status-pill-info";
}

function getFieldTypeLabel(type: string) {
  if (type === "state") {
    return "States US";
  }

  if (type === "radio") {
    return "Radio";
  }

  if (type === "select") {
    return "Select";
  }

  if (type === "textarea") {
    return "Textarea";
  }

  if (type === "checkbox") {
    return "Checkbox";
  }

  if (type === "hidden") {
    return "Hidden";
  }

  if (type === "phone") {
    return "Phone";
  }

  if (type === "email") {
    return "Email";
  }

  if (type === "number") {
    return "Number";
  }

  return "Text";
}

export default async function AdminFormDetailsPage({
  params,
  searchParams,
}: AdminFormDetailsPageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const details = await getAdminFormDetails(id);

  if (!details) {
    notFound();
  }

  const { form, fields, emails, webhooks, submissions } = details;
  const wasDuplicated = resolvedSearchParams.duplicated === "1";

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
                <ClipboardList size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">Forms</p>

                <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#0c2933]">
                  {form.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Public URL: /forms/{form.slug}
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage settings, custom fields, multiple webhooks and recent
                  submissions for this form.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <form action={duplicateAdminFormAction}>
              <input type="hidden" name="id" value={form.id} />
              <DuplicateFormButton className="admin-secondary-button min-h-[44px] gap-2 px-4 text-sm" />
            </form>

            <Link
              href={`/forms/${form.slug}`}
              target="_blank"
              className="admin-secondary-button min-h-[44px] gap-2 px-4 text-sm no-underline"
            >
              <Eye size={16} />
              View Form
            </Link>

            <form action={deleteAdminFormAction}>
              <input type="hidden" name="id" value={form.id} />

              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={16} />
                Delete Form
              </button>
            </form>
          </div>
        </div>
      </section>

      {wasDuplicated ? (
        <section className="rounded-[24px] border border-[#53bc76]/25 bg-[#53bc76]/10 px-5 py-4 text-sm font-semibold text-[#0c2933]">
          Form duplicated successfully. This copy is saved as a draft and can be
          edited before publishing.
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-4">
        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-slate-500">Status</p>
          <p className="mt-2 text-2xl font-bold capitalize text-[#0c2933]">
            {form.status}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-slate-500">Fields</p>
          <p className="mt-2 text-2xl font-bold text-[#0c2933]">
            {fields.length}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-slate-500">Webhooks</p>
          <p className="mt-2 text-2xl font-bold text-[#0c2933]">
            {webhooks.length}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <p className="text-sm font-semibold text-slate-500">Submissions</p>
          <p className="mt-2 text-2xl font-bold text-[#0c2933]">
            {submissions.length}
          </p>
        </div>
      </section>

      <section className="admin-section p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="admin-icon-box h-11 w-11">
            <Save size={20} />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Settings
            </h3>

            <p className="text-sm text-slate-500">
              Update the public form information and redirect destination.
            </p>
          </div>
        </div>

        <form action={updateAdminFormAction} className="grid gap-6">
          <input type="hidden" name="id" value={form.id} />

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Internal name
              </label>

              <input
                name="name"
                type="text"
                required
                defaultValue={form.name}
                className="admin-input min-h-[48px] px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Slug
              </label>

              <input
                name="slug"
                type="text"
                required
                defaultValue={form.slug}
                className="admin-input min-h-[48px] px-4"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Public title
            </label>

            <input
              name="title"
              type="text"
              required
              defaultValue={form.title}
              className="admin-input min-h-[48px] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Public description
            </label>

            <textarea
              name="description"
              rows={4}
              defaultValue={form.description || ""}
              className="admin-input resize-none px-4 py-3"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Status
              </label>

              <select
                name="status"
                defaultValue={form.status}
                className="admin-input min-h-[48px] px-4"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Submit button
              </label>

              <input
                name="submit_button_label"
                type="text"
                defaultValue={form.submit_button_label}
                className="admin-input min-h-[48px] px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Thank you URL
              </label>

              <input
                name="thank_you_page_url"
                type="text"
                defaultValue={form.thank_you_page_url || "/thank-you/default"}
                className="admin-input min-h-[48px] px-4"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-[rgba(12,41,51,0.08)] pt-6">
            <button
              type="submit"
              className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <div className="admin-section p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11">
              <FileText size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
                Fields
              </h3>

              <p className="text-sm text-slate-500">
                Add fields that will appear on the public form.
              </p>
            </div>
          </div>

          <FieldBuilderForm
            formId={form.id}
            nextSortOrder={fields.length + 1}
            action={createAdminFormFieldAction}
          />

          <div className="mt-8 space-y-3">
            {fields.length === 0 ? (
              <p className="admin-empty-state rounded-2xl p-5 text-sm">
                No fields yet.
              </p>
            ) : (
              fields.map((field) => (
                <div
                  key={field.id}
                  className="admin-form-list-item rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="admin-form-list-title font-bold">
                        {field.label}
                      </p>

                      <p className="admin-form-list-meta mt-1 text-xs">
                        {field.name} · {getFieldTypeLabel(field.type)} · order{" "}
                        {field.sort_order}
                        {field.required ? " · required" : ""}
                      </p>

                      {field.type === "radio" || field.type === "select" ? (
                        <pre className="admin-code-block mt-3 max-h-[180px] overflow-auto rounded-xl p-3 text-xs">
                          {stringifyJson(field.options)}
                        </pre>
                      ) : null}
                    </div>

                    <form action={deleteAdminFormFieldAction}>
                      <input type="hidden" name="form_id" value={form.id} />

                      <input
                        type="hidden"
                        name="field_id"
                        value={field.id}
                      />

                      <button
                        type="submit"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                        aria-label="Delete field"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="admin-section p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11">
              <RadioTower size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
                Webhooks
              </h3>

              <p className="text-sm text-slate-500">
                Add as many webhooks as this form needs.
              </p>
            </div>
          </div>

          <form action={createAdminFormWebhookAction} className="grid gap-4">
            <input type="hidden" name="form_id" value={form.id} />

            <input
              name="name"
              type="text"
              required
              placeholder="Webhook name"
              className="admin-input min-h-[46px] px-4"
            />

            <input
              name="url"
              type="url"
              required
              placeholder="https://hook.us1.make.com/..."
              className="admin-input min-h-[46px] px-4"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <select
                name="method"
                defaultValue="POST"
                className="admin-input min-h-[46px] px-4"
              >
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
              </select>

              <input
                name="sort_order"
                type="number"
                placeholder="Order"
                defaultValue={webhooks.length + 1}
                className="admin-input min-h-[46px] px-4"
              />

              <label className="admin-check-row flex min-h-[46px] items-center gap-2 rounded-2xl px-4 text-sm font-bold">
                <input
                  name="enabled"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-[#53bc76]"
                />
                Enabled
              </label>
            </div>

            <textarea
              name="headers"
              rows={4}
              placeholder='Headers JSON. Example: {"Authorization":"Bearer token"}'
              className="admin-input resize-none px-4 py-3 font-mono text-xs"
            />

            <textarea
              name="payload_template"
              rows={5}
              placeholder='Payload template JSON. Example: {"name":"{{name}}","email":"{{email}}"}'
              className="admin-input resize-none px-4 py-3 font-mono text-xs"
            />

            <button
              type="submit"
              className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
            >
              Add Webhook
            </button>
          </form>

          <div className="mt-8 space-y-3">
            {webhooks.length === 0 ? (
              <p className="admin-empty-state rounded-2xl p-5 text-sm">
                No webhooks configured.
              </p>
            ) : (
              webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="admin-form-list-item rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="admin-form-list-title font-bold">
                          {webhook.name}
                        </p>

                        <span
                          className={`admin-status-pill px-2.5 py-1 ${
                            webhook.enabled
                              ? "admin-status-pill-success"
                              : "admin-status-pill-neutral"
                          }`}
                        >
                          {webhook.enabled ? "Active" : "Disabled"}
                        </span>
                      </div>

                      <p className="admin-form-list-meta mt-1 truncate text-xs">
                        {webhook.method} · {webhook.url}
                      </p>

                      <details className="mt-3">
                        <summary className="admin-form-list-title cursor-pointer text-xs font-bold">
                          View payload config
                        </summary>

                        <pre className="admin-code-block mt-2 overflow-x-auto rounded-xl p-3 text-xs">
                          {stringifyJson(webhook.payload_template)}
                        </pre>
                      </details>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Link
                        href={`/admin/forms/${form.id}/webhooks/${webhook.id}`}
                        className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-3 text-xs font-bold text-[#0c2933] no-underline hover:bg-slate-200"
                      >
                        Edit
                      </Link>

                      <form action={toggleAdminFormWebhookAction}>
                        <input type="hidden" name="form_id" value={form.id} />

                        <input
                          type="hidden"
                          name="webhook_id"
                          value={webhook.id}
                        />

                        <input
                          type="hidden"
                          name="enabled"
                          value={webhook.enabled ? "false" : "true"}
                        />

                        <button
                          type="submit"
                          className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-3 text-xs font-bold text-[#0c2933] hover:bg-slate-200"
                        >
                          {webhook.enabled ? "Disable" : "Enable"}
                        </button>
                      </form>

                      <form action={deleteAdminFormWebhookAction}>
                        <input type="hidden" name="form_id" value={form.id} />

                        <input
                          type="hidden"
                          name="webhook_id"
                          value={webhook.id}
                        />

                        <button
                          type="submit"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                          aria-label="Delete webhook"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="admin-section overflow-hidden p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="admin-icon-box h-11 w-11">
            <Mail size={20} />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Emails
            </h3>

            <p className="text-sm text-slate-500">
              Send notifications to the submitter or to the admin team after a
              form submission.
            </p>
          </div>
        </div>

        <EmailBuilderForm
          formId={form.id}
          action={createAdminFormEmailAction}
          submitLabel="Add Email"
        />

        <div className="mt-8 space-y-3">
          {emails.length === 0 ? (
            <p className="admin-empty-state rounded-2xl p-5 text-sm">
              No emails configured yet.
            </p>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className="admin-form-list-item rounded-2xl p-4"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="admin-form-list-title font-bold">
                        {email.name}
                      </p>

                      <span className="admin-badge px-3 py-1 text-[11px] uppercase tracking-[0.08em]">
                        {email.type === "user" ? "User email" : "Admin email"}
                      </span>

                      <span
                        className={`admin-status-pill px-3 py-1 text-[11px] tracking-[0.08em] ${
                          email.enabled
                            ? "admin-status-pill-success"
                            : "admin-status-pill-neutral"
                        }`}
                      >
                        {email.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>

                    <p className="admin-form-list-meta mt-1 break-all text-xs">
                      {email.type === "user"
                        ? `Recipient field: ${email.recipient_field || "email"}`
                        : `Recipients: ${email.recipients.join(", ") || "—"}`}
                    </p>

                    <p className="admin-form-list-meta mt-1 text-xs">
                      Subject: {email.subject_template}
                    </p>

                    <p className="admin-form-list-meta mt-1 text-xs">
                      Order {email.sort_order}
                      {email.from_name ? ` · From ${email.from_name}` : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Link
                      href={`/admin/forms/${form.id}/emails/${email.id}`}
                      className="admin-secondary-button min-h-[40px] gap-2 px-4 text-xs no-underline"
                    >
                      Edit
                    </Link>

                    <form action={toggleAdminFormEmailAction}>
                      <input type="hidden" name="form_id" value={form.id} />
                      <input type="hidden" name="email_id" value={email.id} />
                      <input
                        type="hidden"
                        name="enabled"
                        value={email.enabled ? "false" : "true"}
                      />

                      <button
                        type="submit"
                        className="admin-secondary-button min-h-[40px] gap-2 px-4 text-xs"
                      >
                        {email.enabled ? "Disable" : "Enable"}
                      </button>
                    </form>

                    <form action={deleteAdminFormEmailAction}>
                      <input type="hidden" name="form_id" value={form.id} />
                      <input type="hidden" name="email_id" value={email.id} />

                      <button
                        type="submit"
                        className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-xs font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11">
              <Send size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
                Recent submissions
              </h3>

              <p className="text-sm text-slate-500">
                Last 20 submissions received by this form.
              </p>
            </div>
          </div>

          <Link
            href={`/forms/${form.slug}`}
            target="_blank"
            className="admin-secondary-button hidden min-h-[42px] gap-2 px-4 text-sm no-underline md:inline-flex"
          >
            Test Form
            <ExternalLink size={15} />
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">No submissions yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(12,41,51,0.08)]">
            {submissions.map((submission) => (
              <div key={submission.id} className="p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/forms/${form.id}/submissions/${submission.id}`}
                        className="font-bold text-[#0c2933] no-underline hover:text-[#53bc76]"
                      >
                        Submission {submission.id.slice(0, 8)}
                      </Link>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getSubmissionStatusClass(
                          submission.webhook_status,
                        )}`}
                      >
                        {submission.webhook_status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(submission.created_at)}
                    </p>

                    {submission.source_url ? (
                      <p className="mt-1 max-w-2xl truncate text-xs text-slate-400">
                        Source: {submission.source_url}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-sm font-bold text-[#0c2933]">
                    {submission.webhook_success_count} success ·{" "}
                    {submission.webhook_error_count} errors
                  </div>
                </div>

                <pre className="admin-code-block mt-4 overflow-x-auto rounded-2xl p-4 text-xs leading-5">
                  {stringifyJson(submission.data)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
