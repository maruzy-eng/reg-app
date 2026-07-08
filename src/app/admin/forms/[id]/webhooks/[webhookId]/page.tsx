import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, RadioTower, Save } from "lucide-react";
import {
  getAdminWebhookEditDetails,
  updateAdminFormWebhookAction,
} from "@/lib/admin-webhooks";

type EditWebhookPageProps = {
  params: Promise<{
    id: string;
    webhookId: string;
  }>;
};

function stringifyJson(value: unknown) {
  return JSON.stringify(value || {}, null, 2);
}

export default async function EditWebhookPage({ params }: EditWebhookPageProps) {
  const { id, webhookId } = await params;

  const details = await getAdminWebhookEditDetails({
    formId: id,
    webhookId,
  });

  if (!details) {
    notFound();
  }

  const { form, webhook } = details;

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
                <RadioTower size={22} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {form.name}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#0c2933]">
                  Edit Webhook
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Update the webhook destination, headers and payload template
                  used when this form receives a submission.
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/forms/${form.slug}`}
            target="_blank"
            className="admin-primary-button min-h-[44px] gap-2 px-4 text-sm no-underline"
          >
            <Eye size={16} />
            View Public Form
          </Link>
        </div>
      </section>

      <form
        action={updateAdminFormWebhookAction}
        className="admin-section p-6 md:p-8"
      >
        <input type="hidden" name="form_id" value={form.id} />
        <input type="hidden" name="webhook_id" value={webhook.id} />

        <div className="grid gap-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Webhook name
            </label>

            <input
              name="name"
              type="text"
              required
              defaultValue={webhook.name}
              placeholder="Property System Register"
              className="admin-input min-h-[48px] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Webhook URL
            </label>

            <input
              name="url"
              type="url"
              required
              defaultValue={webhook.url}
              placeholder="https://api.checkmateproperty.com/api/auth/register"
              className="admin-input min-h-[48px] px-4"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Method
              </label>

              <select
                name="method"
                defaultValue={webhook.method}
                className="admin-input min-h-[48px] px-4"
              >
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Order
              </label>

              <input
                name="sort_order"
                type="number"
                defaultValue={webhook.sort_order}
                className="admin-input min-h-[48px] px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#0c2933]">
                Status
              </label>

              <label className="admin-check-row flex min-h-[48px] items-center gap-2 rounded-2xl px-4 text-sm font-bold">
                <input
                  name="enabled"
                  type="checkbox"
                  defaultChecked={webhook.enabled}
                  className="h-4 w-4 accent-[#53bc76]"
                />
                Enabled
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Headers JSON
            </label>

            <textarea
              name="headers"
              rows={6}
              defaultValue={stringifyJson(webhook.headers)}
              placeholder='{"Content-Type":"application/json","Accept":"application/json"}'
              className="admin-input resize-none px-4 py-3 font-mono text-xs leading-5"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Example:
            </p>

            <pre className="admin-code-block mt-2 overflow-x-auto rounded-xl p-3 text-xs">
{`{
  "Content-Type": "application/json",
  "Accept": "application/json"
}`}
            </pre>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#0c2933]">
              Payload template JSON
            </label>

            <textarea
              name="payload_template"
              rows={12}
              defaultValue={stringifyJson(webhook.payload_template)}
              placeholder='{"name":"{{name}}","email":"{{email}}","phone":"{{phone_clean}}"}'
              className="admin-input resize-none px-4 py-3 font-mono text-xs leading-5"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              You can use form variables like {"{{name}}"}, {"{{email}}"},{" "}
              {"{{phone}}"}, {"{{phone_clean}}"}, {"{{form_name}}"},{" "}
              {"{{submission_id}}"}.
            </p>

            <pre className="admin-code-block mt-2 overflow-x-auto rounded-xl p-3 text-xs">
{`{
  "name": "{{name}}",
  "email": "{{email}}",
  "phone": "{{phone_clean}}",
  "password": "fliphouses2026"
}`}
            </pre>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-[rgba(12,41,51,0.08)] pt-6 sm:flex-row">
          <Link
            href={`/admin/forms/${form.id}`}
            className="admin-secondary-button min-h-[46px] px-5 text-sm no-underline"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
          >
            <Save size={17} />
            Save Webhook
          </button>
        </div>
      </form>
    </div>
  );
}