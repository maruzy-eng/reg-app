export type FormEmailType = "user" | "admin";

export type FormEmailRecord = {
  id: string;
  form_id: string;
  name: string;
  type: FormEmailType;
  enabled: boolean;
  recipient_field: string | null;
  recipients: string[];
  subject_template: string;
  body_html_template: string;
  from_name: string | null;
  reply_to_field: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FormEmailLogRecord = {
  id: string;
  submission_id: string;
  form_email_id: string | null;
  form_email_name: string | null;
  status: "success" | "error";
  email_type: FormEmailType | null;
  recipients: string[];
  subject: string | null;
  body_html: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  created_at: string;
};

type SubmissionTemplateContextParams = {
  form: {
    id: string;
    name: string;
    slug: string;
    title: string;
  };
  submission: {
    id: string;
    data: Record<string, unknown>;
    source_url: string | null;
    created_at: string;
  };
};

function onlyDigits(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value).replace(/\D/g, "");
}

function normalizePhoneDigits(value: unknown) {
  let digits = onlyDigits(value);

  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  return digits;
}

export function isValidEmail(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function normalizeEmailList(value: string) {
  const seen = new Set<string>();
  const emails: string[] = [];

  for (const rawLine of value.split(/[\n,]+/)) {
    const email = rawLine.trim();

    if (!email || !isValidEmail(email) || seen.has(email.toLowerCase())) {
      continue;
    }

    seen.add(email.toLowerCase());
    emails.push(email);
  }

  return emails;
}

export function normalizeRecipientsArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<string>();
  const recipients: string[] = [];

  for (const item of value) {
    if (typeof item !== "string") {
      continue;
    }

    const email = item.trim();

    if (!email || !isValidEmail(email) || seen.has(email.toLowerCase())) {
      continue;
    }

    seen.add(email.toLowerCase());
    recipients.push(email);
  }

  return recipients;
}

export function buildSubmissionTemplateContext(
  params: SubmissionTemplateContextParams,
) {
  const extraData: Record<string, unknown> = {
    form_id: params.form.id,
    form_name: params.form.name,
    form_slug: params.form.slug,
    form_title: params.form.title,
    submission_id: params.submission.id,
    submission_created_at: params.submission.created_at,
    source_url: params.submission.source_url,
  };

  for (const [key, value] of Object.entries(params.submission.data)) {
    if (
      key === "phone" ||
      key === "telefone" ||
      key.endsWith("_phone") ||
      key.includes("phone")
    ) {
      extraData[`${key}_clean`] = normalizePhoneDigits(value);
    }
  }

  if (params.submission.data.phone !== undefined) {
    extraData.phone_clean = normalizePhoneDigits(params.submission.data.phone);
  }

  return extraData;
}

export function renderTemplateString(
  template: string,
  submissionData: Record<string, unknown>,
  extraData: Record<string, unknown>,
) {
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key: string) => {
    const dataValue = submissionData[key];
    const extraValue = extraData[key];

    if (dataValue !== undefined && dataValue !== null) {
      return String(dataValue);
    }

    if (extraValue !== undefined && extraValue !== null) {
      return String(extraValue);
    }

    return "";
  });
}
