"use client";

import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { normalizeEmailList, type FormEmailType } from "@/lib/form-emails";

type EmailBuilderFormValues = {
  id?: string;
  name: string;
  type: FormEmailType;
  enabled: boolean;
  recipient_field: string;
  recipients: string[];
  subject_template: string;
  body_html_template: string;
  from_name: string;
  reply_to_field: string;
  sort_order: number;
};

type EmailBuilderFormProps = {
  formId: string;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  initialValues?: Partial<EmailBuilderFormValues>;
};

const defaultTemplate = `<html>
  <body style="font-family: Arial, sans-serif; color: #0c2933;">
    <h1>Hello {{name}}</h1>
    <p>This is a sample email body.</p>
    <p>Form: {{form_name}}</p>
    <p>Submission ID: {{submission_id}}</p>
  </body>
</html>`;

export function EmailBuilderForm({
  formId,
  action,
  submitLabel,
  initialValues,
}: EmailBuilderFormProps) {
  const [type, setType] = useState<FormEmailType>(initialValues?.type || "user");
  const [recipientsText, setRecipientsText] = useState(
    initialValues?.recipients?.join("\n") || "",
  );

  const isUserEmail = type === "user";
  const isSaveAction = submitLabel.toLowerCase().includes("save");
  const SubmitIcon = isSaveAction ? Save : Plus;

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="form_id" value={formId} />
      {initialValues?.id ? (
        <input type="hidden" name="email_id" value={initialValues.id} />
      ) : null}
      <input type="hidden" name="recipients" value={JSON.stringify(normalizeEmailList(recipientsText))} />

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Internal name
          </label>

          <input
            name="name"
            type="text"
            required
            defaultValue={initialValues?.name || ""}
            placeholder="Welcome Email"
            className="admin-input min-h-[48px] px-4"
          />
        </div>

        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Type
          </label>

          <select
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value as FormEmailType)}
            className="admin-input min-h-[48px] px-4"
          >
            <option value="user">User email</option>
            <option value="admin">Admin email</option>
          </select>

          <p className="admin-form-list-meta mt-2 text-xs">
            {type === "user"
              ? "Sends to a submission field like email."
              : "Sends to the admins list configured below."}
          </p>
        </div>

        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Order
          </label>

          <input
            name="sort_order"
            type="number"
            defaultValue={initialValues?.sort_order ?? 0}
            className="admin-input min-h-[48px] px-4"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="admin-check-row flex min-h-[48px] items-center gap-2 rounded-2xl px-4 text-sm font-bold">
          <input
            name="enabled"
            type="checkbox"
            defaultChecked={initialValues?.enabled ?? true}
            className="h-4 w-4 accent-[#53bc76]"
          />
          Enabled
        </label>

        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            From name
          </label>

          <input
            name="from_name"
            type="text"
            defaultValue={initialValues?.from_name || ""}
            placeholder="Checkmate Property"
            className="admin-input min-h-[48px] px-4"
          />
        </div>

        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Reply-to field
          </label>

          <input
            name="reply_to_field"
            type="text"
            defaultValue={initialValues?.reply_to_field || ""}
            placeholder="email"
            className="admin-input min-h-[48px] px-4"
          />
        </div>
      </div>

      {isUserEmail ? (
        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Recipient field
          </label>

          <input
            name="recipient_field"
            type="text"
            required
            defaultValue={initialValues?.recipient_field || "email"}
            placeholder="email"
            className="admin-input min-h-[48px] px-4"
          />

          <p className="admin-form-list-meta mt-2 text-xs">
            Example: <span className="font-mono">{`{{email}}`}</span>
          </p>
        </div>
      ) : (
        <div>
          <label className="admin-form-list-title mb-2 block text-sm font-bold">
            Recipients
          </label>

          <textarea
            name="recipients_text"
            rows={5}
            value={recipientsText}
            onChange={(event) => setRecipientsText(event.target.value)}
            placeholder="admin@checkmateproperty.com"
            className="admin-input resize-none px-4 py-3 font-mono text-xs leading-5"
          />

          <p className="admin-form-list-meta mt-2 text-xs">
            One e-mail per line. Stored as a JSON array behind the scenes.
          </p>
        </div>
      )}

      <div>
        <label className="admin-form-list-title mb-2 block text-sm font-bold">
          Subject template
        </label>

        <input
          name="subject_template"
          type="text"
          required
          defaultValue={initialValues?.subject_template || ""}
          placeholder="New lead from {{form_name}}"
          className="admin-input min-h-[48px] px-4"
        />

        <p className="admin-form-list-meta mt-2 text-xs">
          Variables available: <code>{`{{name}}`}</code>,{" "}
          <code>{`{{email}}`}</code>, <code>{`{{form_name}}`}</code>,{" "}
          <code>{`{{submission_id}}`}</code>.
        </p>
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 rounded-2xl border border-[rgba(12,41,51,0.08)] bg-white/70 p-4 sm:flex-row">
        <button
          type="submit"
          className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
        >
          <SubmitIcon size={17} />
          {submitLabel}
        </button>
      </div>

      <div>
        <label className="admin-form-list-title mb-2 block text-sm font-bold">
          Body HTML template
        </label>

        <textarea
          name="body_html_template"
          rows={14}
          required
          defaultValue={initialValues?.body_html_template || defaultTemplate}
          placeholder="<html>...</html>"
          className="admin-input resize-none px-4 py-3 font-mono text-xs leading-5"
        />

        <p className="admin-form-list-meta mt-2 text-xs">
          Paste HTML directly. You can use the same variables as the webhook
          templates.
        </p>

        <pre className="admin-code-block mt-3 overflow-x-auto rounded-2xl p-4 text-xs leading-5">
{`<html>
  <body style="font-family: Arial, sans-serif; color: #0c2933;">
    <h1>Hello {{name}}</h1>
    <p>Form: {{form_name}}</p>
    <p>Email: {{email}}</p>
  </body>
</html>`}
        </pre>
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 border-t border-[rgba(12,41,51,0.08)] pt-6 sm:flex-row">
        <button
          type="submit"
          className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
        >
          <SubmitIcon size={17} />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
