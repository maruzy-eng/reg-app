import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Save } from "lucide-react";
import { EmailBuilderForm } from "@/components/admin/forms/email-builder-form";
import {
  deleteAdminFormEmailAction,
  getAdminFormEmailEditDetails,
  toggleAdminFormEmailAction,
  updateAdminFormEmailAction,
} from "@/lib/admin-form-emails";

type EditEmailPageProps = {
  params: Promise<{
    id: string;
    emailId: string;
  }>;
};

export default async function EditEmailPage({ params }: EditEmailPageProps) {
  const { id, emailId } = await params;

  const details = await getAdminFormEmailEditDetails({
    formId: id,
    emailId,
  });

  if (!details) {
    notFound();
  }

  const { form, email } = details;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <Link
              href={`/admin/forms/${form.id}`}
              className="admin-secondary-button mb-6 min-h-[42px] w-fit gap-2 px-4 text-sm no-underline"
            >
              <ArrowLeft size={16} />
              Back to Form
            </Link>

            <div className="flex items-start gap-4">
              <div className="admin-icon-box h-12 w-12 shrink-0">
                <Mail size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {form.name}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#171614]">
                  Edit Email
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Update the subject, recipients and HTML template used for this
                  notification.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
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
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
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
                className="admin-secondary-button min-h-[44px] gap-2 px-4 text-sm"
              >
                {email.enabled ? "Disable" : "Enable"}
              </button>
            </form>

            <form action={deleteAdminFormEmailAction}>
              <input type="hidden" name="form_id" value={form.id} />
              <input type="hidden" name="email_id" value={email.id} />

              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="admin-section p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="admin-icon-box h-11 w-11">
            <Save size={20} />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-[-0.04em] text-[#171614]">
              Email settings
            </h3>

            <p className="text-sm text-slate-500">
              The HTML body supports the same template variables used by
              webhooks.
            </p>
          </div>
        </div>

        <EmailBuilderForm
          formId={form.id}
          action={updateAdminFormEmailAction}
          submitLabel="Save Email"
          initialValues={{
            id: email.id,
            name: email.name,
            type: email.type,
            enabled: email.enabled,
            recipient_field: email.recipient_field || "",
            recipients: email.recipients,
            subject_template: email.subject_template,
            body_html_template: email.body_html_template,
            from_name: email.from_name || "",
            reply_to_field: email.reply_to_field || "",
            sort_order: email.sort_order,
          }}
        />
      </section>
    </div>
  );
}
