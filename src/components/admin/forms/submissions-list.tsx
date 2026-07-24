import Link from "next/link";
import { Send, ExternalLink } from "lucide-react";
import { SubmissionCard } from "@/components/admin/forms/submission-card";

type SubmissionItem = {
  id: string;
  created_at?: string | null;
  status?: string | null;
  data?: Record<string, unknown> | null;
  source_url?: string | null;
  success_count?: number | null;
  error_count?: number | null;
  webhook_success_count?: number | null;
  webhook_error_count?: number | null;
  email_success_count?: number | null;
  email_error_count?: number | null;
};

type SubmissionsListProps = {
  submissions: SubmissionItem[];
  testFormHref?: string;
};

export function SubmissionsList({
  submissions,
  testFormHref,
}: SubmissionsListProps) {
  const visibleSubmissions = submissions.slice(0, 20);

  return (
    <section className="admin-section overflow-hidden p-0">
      <div className="flex flex-col justify-between gap-5 border-b border-[rgba(12,41,51,0.08)] px-6 py-6 md:flex-row md:items-start md:px-8">
        <div className="flex items-start gap-4">
          <div className="admin-icon-box h-12 w-12 shrink-0">
            <Send size={20} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#171614]">
                Recent submissions
              </h3>

              <span className="inline-flex rounded-full bg-[#eef7f1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#171614]">
                {visibleSubmissions.length} shown
              </span>
            </div>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6b7f88]">
              Last 20 submissions received by this form. Details stay collapsed
              by default to keep the dashboard cleaner.
            </p>
          </div>
        </div>

        {testFormHref ? (
          <Link
            href={testFormHref}
            target="_blank"
            className="admin-secondary-button inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-sm no-underline"
          >
            Test Form
            <ExternalLink size={16} />
          </Link>
        ) : null}
      </div>

      <div className="p-6 md:p-8">
        {visibleSubmissions.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[rgba(12,41,51,0.12)] bg-[#fbfcfd] px-6 py-10 text-center">
            <h4 className="text-xl font-bold text-[#171614]">
              No submissions yet
            </h4>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#6b7f88]">
              Once users start submitting this form, the latest records will
              appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {visibleSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}