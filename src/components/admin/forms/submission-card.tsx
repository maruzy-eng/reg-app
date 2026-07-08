import { CheckCircle2, ChevronDown, CircleAlert, Send } from "lucide-react";

type SubmissionRecord = Record<string, unknown>;

type SubmissionItem = {
  id: string;
  created_at?: string | null;
  status?: string | null;
  data?: SubmissionRecord | null;
  source_url?: string | null;
  success_count?: number | null;
  error_count?: number | null;
  webhook_success_count?: number | null;
  webhook_error_count?: number | null;
  email_success_count?: number | null;
  email_error_count?: number | null;
};

type SubmissionCardProps = {
  submission: SubmissionItem;
};

const PRIORITY_KEYS = [
  "name",
  "nome",
  "email",
  "phone",
  "whatsapp",
  "telefone",
  "state",
  "estado",
  "city",
  "cidade",
  "goal",
  "objetivo",
];

const LABEL_MAP: Record<string, string> = {
  name: "Name",
  nome: "Nome",
  email: "Email",
  phone: "Phone",
  whatsapp: "WhatsApp",
  telefone: "Telefone",
  state: "State",
  estado: "Estado",
  city: "City",
  cidade: "Cidade",
  goal: "Goal",
  objetivo: "Objetivo",
  form_name: "Form",
  submission_id: "Submission ID",
};

function formatDate(value?: string | null) {
  if (!value) {
    return "No date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toLabel(key: string) {
  return LABEL_MAP[key] || key.replace(/[_-]+/g, " ");
}

function toDisplayValue(value: unknown) {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "string") {
    return value.trim() || "—";
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "—";
    }
  }

  return String(value);
}

function getFlatEntries(data?: SubmissionRecord | null) {
  if (!data || typeof data !== "object") {
    return [] as Array<[string, unknown]>;
  }

  return Object.entries(data).filter(([, value]) => {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    return true;
  });
}

function getSummaryEntries(data?: SubmissionRecord | null) {
  const entries = getFlatEntries(data);
  const used = new Set<string>();
  const result: Array<[string, unknown]> = [];

  for (const key of PRIORITY_KEYS) {
    const match = entries.find(([entryKey]) => entryKey === key);

    if (match && !used.has(match[0])) {
      result.push(match);
      used.add(match[0]);
    }

    if (result.length >= 4) {
      return result;
    }
  }

  for (const entry of entries) {
    if (!used.has(entry[0])) {
      result.push(entry);
      used.add(entry[0]);
    }

    if (result.length >= 4) {
      break;
    }
  }

  return result;
}

function getCounts(submission: SubmissionItem) {
  const explicitSuccess =
    typeof submission.success_count === "number"
      ? submission.success_count
      : null;

  const explicitError =
    typeof submission.error_count === "number" ? submission.error_count : null;

  if (explicitSuccess !== null || explicitError !== null) {
    return {
      successCount: explicitSuccess ?? 0,
      errorCount: explicitError ?? 0,
    };
  }

  const successCount =
    (submission.webhook_success_count ?? 0) +
    (submission.email_success_count ?? 0);

  const errorCount =
    (submission.webhook_error_count ?? 0) + (submission.email_error_count ?? 0);

  return {
    successCount,
    errorCount,
  };
}

function getStatus(submission: SubmissionItem, errorCount: number) {
  const rawStatus = (submission.status || "").toLowerCase();

  if (rawStatus === "error" || rawStatus === "failed" || errorCount > 0) {
    return "error";
  }

  return "success";
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const summaryEntries = getSummaryEntries(submission.data);
  const allEntries = getFlatEntries(submission.data);
  const { successCount, errorCount } = getCounts(submission);
  const status = getStatus(submission, errorCount);

  return (
    <details className="admin-card overflow-hidden rounded-[28px] border border-[rgba(12,41,51,0.08)] bg-white">
      <summary className="list-none cursor-pointer">
        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="admin-icon-box h-12 w-12 shrink-0">
                {status === "success" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <CircleAlert size={20} />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#0c2933]">
                    Submission {submission.id.slice(0, 8)}
                  </h3>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                      status === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[#6b7f88]">
                  {formatDate(submission.created_at)}
                </p>
              </div>
            </div>

            {summaryEntries.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {summaryEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[20px] border border-[rgba(12,41,51,0.08)] bg-[#f8fbfc] px-4 py-3"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                      {toLabel(key)}
                    </p>

                    <p className="mt-2 break-words text-sm font-semibold leading-6 text-[#0c2933]">
                      {toDisplayValue(value)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[20px] border border-[rgba(12,41,51,0.08)] bg-[#f8fbfc] px-4 py-4 text-sm text-[#6b7f88]">
                No submission preview fields available.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-[220px] lg:items-end">
            <div className="rounded-[20px] border border-[rgba(12,41,51,0.08)] bg-[#f8fbfc] px-4 py-3 text-left lg:min-w-[180px] lg:text-right">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                Result
              </p>

              <p className="mt-2 text-sm font-bold text-[#0c2933]">
                {successCount} success · {errorCount} errors
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(57,175,242,0.16)]">
              View Details
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </summary>

      <div className="border-t border-[rgba(12,41,51,0.08)] px-6 pb-6 pt-5">
        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-[24px] border border-[rgba(12,41,51,0.08)] bg-[#fbfcfd] p-5">
            <h4 className="text-base font-bold text-[#0c2933]">
              Submitted data
            </h4>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {allEntries.length > 0 ? (
                allEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[18px] border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                      {toLabel(key)}
                    </p>

                    <p className="mt-2 break-words text-sm leading-6 text-[#0c2933]">
                      {toDisplayValue(value)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#6b7f88]">
                  No submission data available.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-[rgba(12,41,51,0.08)] bg-[#fbfcfd] p-5">
            <h4 className="text-base font-bold text-[#0c2933]">
              Submission info
            </h4>

            <div className="mt-4 space-y-4">
              <div className="rounded-[18px] border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                  Submission ID
                </p>
                <p className="mt-2 break-all text-sm leading-6 text-[#0c2933]">
                  {submission.id}
                </p>
              </div>

              <div className="rounded-[18px] border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                  Created at
                </p>
                <p className="mt-2 text-sm leading-6 text-[#0c2933]">
                  {formatDate(submission.created_at)}
                </p>
              </div>

              <div className="rounded-[18px] border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                  Source URL
                </p>

                {submission.source_url ? (
                  <a
                    href={submission.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 break-all text-sm font-semibold text-[#0c2933] underline underline-offset-4"
                  >
                    <Send size={14} />
                    {submission.source_url}
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-[#6b7f88]">—</p>
                )}
              </div>

              <div className="rounded-[18px] border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8f98]">
                  Execution result
                </p>
                <p className="mt-2 text-sm leading-6 text-[#0c2933]">
                  {successCount} success · {errorCount} errors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}