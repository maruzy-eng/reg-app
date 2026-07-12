import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileJson,
  Globe,
  Mail,
  RadioTower,
  Send,
  ServerCrash,
  XCircle,
} from "lucide-react";
import {
  getAdminSubmissionDetails,
  getLeadDisplayName,
} from "@/lib/admin-submissions";
import { sanitizeSubmissionDataForDisplay } from "@/lib/forms";

type AdminSubmissionDetailsPageProps = {
  params: Promise<{
    id: string;
    submissionId: string;
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

function toRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function getTextValue(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "—";
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

  if (status === "not_configured") {
    return "admin-status-pill admin-status-pill-neutral";
  }

  return "admin-status-pill admin-status-pill-info";
}

function getLogStatusClass(status: string) {
  if (status === "success") {
    return "admin-status-pill admin-status-pill-success";
  }

  return "admin-status-pill admin-status-pill-danger";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "success") {
    return <CheckCircle2 size={18} className="text-[#53bc76]" />;
  }

  if (status === "error") {
    return <XCircle size={18} className="text-red-600" />;
  }

  return <Clock size={18} className="text-slate-500" />;
}

function MiniCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="admin-kpi-card p-5">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-3 truncate text-base font-bold text-[#0c2933]">
        {value}
      </p>
    </div>
  );
}

export default async function AdminSubmissionDetailsPage({
  params,
}: AdminSubmissionDetailsPageProps) {
  const { id, submissionId } = await params;

  const details = await getAdminSubmissionDetails({
    formId: id,
    submissionId,
  });

  if (!details || !details.form) {
    notFound();
  }

  const { form, submission, webhookLogs: logs, emailLogs } = details;
  const submissionData = toRecord(submission.data);
  const maskedSubmissionData = sanitizeSubmissionDataForDisplay(submissionData);
  const lead = getLeadDisplayName(submissionData, submission.id);

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              <Link
                href={`/admin/forms/${form.id}`}
                className="admin-secondary-button min-h-[42px] w-fit gap-2 px-4 text-sm no-underline"
              >
                <ArrowLeft size={16} />
                Back to Form
              </Link>

              <Link
                href="/admin/submissions"
                className="admin-secondary-button min-h-[42px] w-fit gap-2 px-4 text-sm no-underline"
              >
                <ArrowLeft size={16} />
                Back to Submissions
              </Link>
            </div>

            <div className="flex items-start gap-4">
              <div className="admin-icon-box h-12 w-12 shrink-0">
                <Send size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {form.name}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#0c2933]">
                  Submission details
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Received on {formatDate(submission.created_at)}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={getStatusBadgeClass("success")}>
                    received
                  </span>

                  <span
                    className={getStatusBadgeClass(submission.webhook_status)}
                  >
                    webhook: {submission.webhook_status}
                  </span>

                  <span className="admin-badge px-3 py-1">
                    {submission.webhook_success_count} success
                  </span>

                  <span className="admin-badge px-3 py-1">
                    {submission.webhook_error_count} errors
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/forms/${form.slug}`}
            target="_blank"
            className="admin-primary-button min-h-[44px] gap-2 px-4 text-sm no-underline"
          >
            View Public Form
            <ExternalLink size={15} />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="admin-kpi-card p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <FileJson size={16} />
            Form
          </div>

          <p className="mt-2 truncate text-lg font-bold text-[#0c2933]">
            {form.name}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <RadioTower size={16} />
            Webhook logs
          </div>

          <p className="mt-2 text-2xl font-bold text-[#0c2933]">
            {logs.length}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Globe size={16} />
            IP address
          </div>

          <p className="mt-2 truncate text-lg font-bold text-[#0c2933]">
            {submission.ip_address || "—"}
          </p>
        </div>

        <div className="admin-kpi-card p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Clock size={16} />
            Created
          </div>

          <p className="mt-2 text-sm font-bold text-[#0c2933]">
            {formatDate(submission.created_at)}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MiniCard title="Name" value={lead.name} />
        <MiniCard title="Email" value={lead.email || "—"} />
        <MiniCard title="Phone" value={lead.phone || "—"} />
        <MiniCard title="Country" value={getTextValue(maskedSubmissionData, ["country", "pais"]) } />
        <MiniCard title="State" value={getTextValue(maskedSubmissionData, ["state", "estado"]) } />
        <MiniCard title="City" value={getTextValue(maskedSubmissionData, ["city", "cidade"]) } />
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="admin-section overflow-hidden">
          <div className="border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Submitted data
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Complete JSON payload submitted by the public form.
            </p>
          </div>

          <div className="p-6">
            <pre className="admin-code-block max-h-[620px] overflow-auto rounded-2xl p-4 text-xs leading-5">
              {stringifyJson(maskedSubmissionData)}
            </pre>
          </div>
        </div>

        <div className="admin-section overflow-hidden">
          <div className="border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Request metadata
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Source URL, browser agent and technical details.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="admin-form-list-item rounded-2xl p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
                Source URL
              </p>

              <p className="admin-form-list-title mt-2 break-all text-sm font-semibold">
                {submission.source_url || "—"}
              </p>
            </div>

            <div className="admin-form-list-item rounded-2xl p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
                User agent
              </p>

              <p className="admin-form-list-title mt-2 break-all text-sm font-semibold">
                {submission.user_agent || "—"}
              </p>
            </div>

            <div className="admin-form-list-item rounded-2xl p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
                Submission ID
              </p>

              <p className="admin-form-list-title mt-2 break-all font-mono text-xs font-semibold">
                {submission.id}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
              Webhook logs
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Every webhook call executed for this submission.
            </p>
          </div>

          <span className="admin-badge px-3 py-1">{logs.length} logs</span>
        </div>

        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="admin-icon-box h-14 w-14">
              <ServerCrash size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0c2933]">
              No webhook logs
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              This submission did not execute any webhook. This usually means
              the form had no active webhooks configured at the time of
              submission.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(12,41,51,0.08)]">
            {logs.map((log, index) => (
              <div key={log.id} className="p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusIcon status={log.status} />

                      <p className="font-bold text-[#0c2933]">
                        {index + 1}. {log.webhook_name || "Webhook"}
                      </p>

                      <span
                        className={getLogStatusClass(log.status)}
                      >
                        {log.status}
                      </span>

                      {log.response_status ? (
                        <span className="admin-badge px-3 py-1">
                          HTTP {log.response_status}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 break-all text-xs text-slate-500">
                      {log.request_method || "POST"} · {log.request_url || "—"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(log.created_at)}
                    </p>

                    {log.error_message ? (
                      <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-red-500">
                          Error
                        </p>

                        <p className="mt-2 text-sm font-semibold text-red-700">
                          {log.error_message}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  <details className="admin-form-list-item rounded-2xl p-4">
                    <summary className="admin-form-list-title cursor-pointer text-sm font-bold">
                      Request payload
                    </summary>

                    <pre className="admin-code-block mt-4 max-h-[420px] overflow-auto rounded-xl p-4 text-xs leading-5">
                      {stringifyJson(log.request_payload)}
                    </pre>
                  </details>

                  <details className="admin-form-list-item rounded-2xl p-4">
                    <summary className="admin-form-list-title cursor-pointer text-sm font-bold">
                      Response body
                    </summary>

                    <pre className="admin-code-block mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl p-4 text-xs leading-5">
                      {log.response_body || "No response body."}
                    </pre>
                  </details>
                </div>

                <details className="admin-form-list-item mt-5 rounded-2xl p-4">
                  <summary className="admin-form-list-title cursor-pointer text-sm font-bold">
                    Request headers
                  </summary>

                  <pre className="admin-code-block mt-4 max-h-[320px] overflow-auto rounded-xl p-4 text-xs leading-5">
                    {stringifyJson(log.request_headers)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(12,41,51,0.08)] px-6 py-5">
          <div>
                <h3 className="text-xl font-bold tracking-[-0.04em] text-[#0c2933]">
                  Email logs
                </h3>

            <p className="mt-1 text-sm text-slate-500">
              Every transactional email executed for this submission.
            </p>
          </div>

          <span className="admin-badge px-3 py-1">{emailLogs.length} logs</span>
        </div>

        {emailLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="admin-icon-box h-14 w-14">
              <Mail size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#0c2933]">
              No email logs
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              This submission did not trigger a transactional email or the form
              had no active email rules configured at the time.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(12,41,51,0.08)]">
            {emailLogs.map((log, index) => (
              <div key={log.id} className="p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <CheckCircle2
                        size={18}
                        className={
                          log.status === "success"
                            ? "text-[#53bc76]"
                            : "text-red-500"
                        }
                      />

                      <p className="font-bold text-[#0c2933]">
                        {index + 1}. {log.form_email_name || "Email"}
                      </p>

                      <span
                        className={getLogStatusClass(log.status)}
                      >
                        {log.status}
                      </span>

                      {log.provider_message_id ? (
                        <span className="admin-badge px-3 py-1">
                          {log.provider_message_id}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 break-all text-xs text-slate-500">
                      {log.email_type || "—"} ·{" "}
                      {log.recipients.length > 0
                        ? log.recipients.join(", ")
                        : "No recipients"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(log.created_at)}
                    </p>

                    {log.error_message ? (
                      <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-red-500">
                          Error
                        </p>

                        <p className="mt-2 text-sm font-semibold text-red-700">
                          {log.error_message}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  <details className="admin-form-list-item rounded-2xl p-4">
                    <summary className="admin-form-list-title cursor-pointer text-sm font-bold">
                      Email HTML
                    </summary>

                    <pre className="admin-code-block mt-4 max-h-[420px] overflow-auto rounded-xl p-4 text-xs leading-5">
                      {log.body_html || "No email body recorded."}
                    </pre>
                  </details>

                  <details className="admin-form-list-item rounded-2xl p-4">
                    <summary className="admin-form-list-title cursor-pointer text-sm font-bold">
                      Recipients
                    </summary>

                    <pre className="admin-code-block mt-4 max-h-[420px] overflow-auto rounded-xl p-4 text-xs leading-5">
                      {JSON.stringify(log.recipients || [], null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
