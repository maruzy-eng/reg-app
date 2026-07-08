import { createClient } from "@supabase/supabase-js";
import {
  buildSubmissionTemplateContext,
  isValidEmail,
  normalizeRecipientsArray,
  renderTemplateString,
  type FormEmailRecord,
} from "@/lib/form-emails";
import { sendTransactionalEmail } from "@/lib/email-service";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type DynamicForm = {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  submit_button_label: string;
  thank_you_page_url: string | null;
  created_at: string;
  updated_at: string;
};

export type DynamicFormField = {
  id: string;
  form_id: string;
  label: string;
  name: string;
  type:
    | "text"
    | "email"
    | "phone"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "hidden"
    | "state"
    | "password";
  placeholder: string | null;
  help_text: string | null;
  required: boolean;
  options: JsonValue;
  default_value: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DynamicFormWebhook = {
  id: string;
  form_id: string;
  name: string;
  url: string;
  method: "POST" | "PUT" | "PATCH";
  enabled: boolean;
  headers: Record<string, string>;
  payload_template: Record<string, unknown>;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DynamicFormEmail = FormEmailRecord;

export type FormSubmission = {
  id: string;
  form_id: string | null;
  form_slug: string | null;
  data: Record<string, unknown>;
  source_url: string | null;
  user_agent: string | null;
  ip_address: string | null;
  webhook_status:
    | "pending"
    | "success"
    | "partial_error"
    | "error"
    | "not_configured";
  webhook_success_count: number;
  webhook_error_count: number;
  created_at: string;
};

export type SubmitFormResult = {
  success: boolean;
  submissionId?: string;
  thankYouPageUrl?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

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

function cleanPhoneNumber(value: unknown) {
  return onlyDigits(value);
}

function getPrimaryPhoneValue(data: Record<string, unknown>) {
  return (
    data.phone ??
    data.telephone ??
    data.telefone ??
    data.whatsapp ??
    data.numero ??
    data.number ??
    ""
  );
}

function isSensitiveFieldName(name: string) {
  const normalized = name.trim().toLowerCase();

  return (
    normalized === "password" ||
    normalized === "senha" ||
    normalized === "user_password" ||
    normalized === "user_senha" ||
    normalized === "confirm_password" ||
    normalized === "confirmar_senha"
  );
}

function getPrimaryPasswordValue(
  data: Record<string, unknown>,
  fields: DynamicFormField[] = [],
) {
  const passwordField = fields.find((field) => {
    return field.type === "password" || isSensitiveFieldName(field.name);
  });

  if (passwordField) {
    return data[passwordField.name] ?? "";
  }

  return (
    data.password ??
    data.senha ??
    data.user_password ??
    data.user_senha ??
    data.confirm_password ??
    data.confirmar_senha ??
    ""
  );
}

function buildWebhookData(params: {
  data: Record<string, unknown>;
  fields: DynamicFormField[];
}) {
  const phone = getPrimaryPhoneValue(params.data);
  const password = getPrimaryPasswordValue(params.data, params.fields);

  return {
    ...params.data,
    phone_clean: cleanPhoneNumber(phone),
    password,
  };
}

function getFieldOptionsMask(field: DynamicFormField) {
  const options = field.options;

  if (!options || typeof options !== "object" || Array.isArray(options)) {
    return null;
  }

  if (!("mask" in options) || typeof options.mask !== "string") {
    return null;
  }

  return options.mask;
}

function countMaskDigits(mask: string) {
  return [...mask].filter((char) => char === "9").length;
}

export function isSensitiveSubmissionField(
  key: string,
  field?: DynamicFormField | null,
) {
  return field?.type === "password" || isSensitiveFieldName(key);
}

export function maskSensitiveSubmissionValue(
  key: string,
  value: unknown,
  field?: DynamicFormField | null,
) {
  if (isSensitiveSubmissionField(key, field)) {
    return "••••••••";
  }

  return value;
}

export function sanitizeSubmissionDataForDisplay(
  data: Record<string, unknown>,
  fields: DynamicFormField[] = [],
) {
  const fieldMap = new Map(fields.map((field) => [field.name, field]));

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      maskSensitiveSubmissionValue(key, value, fieldMap.get(key)),
    ]),
  );
}

export function sanitizeSubmissionDataForTemplates(
  data: Record<string, unknown>,
  fields: DynamicFormField[] = [],
) {
  const fieldMap = new Map(fields.map((field) => [field.name, field]));

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => {
      return !isSensitiveSubmissionField(key, fieldMap.get(key));
    }),
  );
}

export function normalizeFormData(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data as Record<string, unknown>).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.trim()];
      }

      return [key, value];
    }),
  );
}

export function getClientIpFromHeaders(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    headers.get("x-client-ip") ||
    null
  );
}

export function validateRequiredFields(
  fields: DynamicFormField[],
  data: Record<string, unknown>,
) {
  const fieldErrors: Record<string, string> = {};

  for (const field of fields) {
    if (!field.required) {
      continue;
    }

    const value = data[field.name];

    const isEmptyString = typeof value === "string" && value.trim() === "";
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isMissing = value === undefined || value === null;

    if (isMissing || isEmptyString || isEmptyArray) {
      fieldErrors[field.name] = `${field.label} is required.`;
    }
  }

  return fieldErrors;
}

export function validateEmailFields(
  fields: DynamicFormField[],
  data: Record<string, unknown>,
) {
  const fieldErrors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (const field of fields) {
    if (field.type !== "email") {
      continue;
    }

    const value = data[field.name];

    if (!value) {
      continue;
    }

    if (typeof value !== "string" || !emailRegex.test(value.trim())) {
      fieldErrors[field.name] = `${field.label} must be a valid email.`;
    }
  }

  return fieldErrors;
}

export function validatePhoneFields(
  fields: DynamicFormField[],
  data: Record<string, unknown>,
) {
  const fieldErrors: Record<string, string> = {};

  for (const field of fields) {
    if (field.type !== "phone") {
      continue;
    }

    const value = data[field.name];

    if (!value) {
      continue;
    }

    if (typeof value !== "string") {
      fieldErrors[field.name] = `${field.label} must be a valid phone number.`;
      continue;
    }

    const mask = getFieldOptionsMask(field);
    const expectedDigits = mask ? countMaskDigits(mask) : 0;
    const digits = mask ? onlyDigits(value) : normalizePhoneDigits(value);
    const normalizedDigits =
      mask &&
      expectedDigits === 10 &&
      digits.length === 11 &&
      digits.startsWith("1")
        ? digits.slice(1)
        : digits;

    if (mask && expectedDigits > 0) {
      if (normalizedDigits.length !== expectedDigits) {
        fieldErrors[field.name] = `${field.label} must match ${mask}.`;
      }

      continue;
    }

    if (normalizedDigits.length !== 10) {
      fieldErrors[field.name] =
        `${field.label} must be a valid USA phone number.`;
    }
  }

  return fieldErrors;
}

export function validateStateFields(
  fields: DynamicFormField[],
  data: Record<string, unknown>,
) {
  const fieldErrors: Record<string, string> = {};

  const validStateCodes = new Set([
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "DC",
  ]);

  for (const field of fields) {
    if (field.type !== "state") {
      continue;
    }

    const value = data[field.name];

    if (!value) {
      continue;
    }

    if (typeof value !== "string" || !validStateCodes.has(value)) {
      fieldErrors[field.name] = `${field.label} must be a valid US state.`;
    }
  }

  return fieldErrors;
}

export async function getPublishedFormBySlug(slug: string) {
  const supabase = getSupabaseAdmin();

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<DynamicForm>();

  if (formError || !form) {
    return {
      form: null,
      fields: [],
      error: "Form not found or not published.",
    };
  }

  const { data: fields, error: fieldsError } = await supabase
    .from("form_fields")
    .select("*")
    .eq("form_id", form.id)
    .order("sort_order", { ascending: true })
    .returns<DynamicFormField[]>();

  if (fieldsError) {
    return {
      form: null,
      fields: [],
      error: "Unable to load form fields.",
    };
  }

  return {
    form,
    fields: fields || [],
    error: null,
  };
}

export async function createFormSubmission(params: {
  form: DynamicForm;
  data: Record<string, unknown>;
  sourceUrl: string | null;
  userAgent: string | null;
  ipAddress: string | null;
}) {
  const supabase = getSupabaseAdmin();

  const { data: submission, error } = await supabase
    .from("form_submissions")
    .insert({
      form_id: params.form.id,
      form_slug: params.form.slug,
      data: params.data,
      source_url: params.sourceUrl,
      user_agent: params.userAgent,
      ip_address: params.ipAddress,
      webhook_status: "pending",
      webhook_success_count: 0,
      webhook_error_count: 0,
    })
    .select("*")
    .single<FormSubmission>();

  if (error || !submission) {
    throw new Error(error?.message || "Unable to create form submission.");
  }

  return submission;
}

export async function getActiveWebhooksByFormId(formId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("form_webhooks")
    .select("*")
    .eq("form_id", formId)
    .eq("enabled", true)
    .order("sort_order", { ascending: true })
    .returns<DynamicFormWebhook[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getActiveFormEmailsByFormId(formId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("form_emails")
    .select("*")
    .eq("form_id", formId)
    .eq("enabled", true)
    .order("sort_order", { ascending: true })
    .returns<DynamicFormEmail[]>();

  if (error) {
    if (
      error.code === "42P01" ||
      error.message?.includes("Could not find the table")
    ) {
      return [];
    }

    throw new Error(error.message);
  }

  return (data || []).map((email) => ({
    ...email,
    recipients: normalizeRecipientsArray(email.recipients),
  }));
}

function buildWebhookTemplateContext(params: {
  form: DynamicForm;
  submission: FormSubmission;
  data: Record<string, unknown>;
}) {
  const baseContext = buildSubmissionTemplateContext({
    form: params.form,
    submission: {
      ...params.submission,
      data: params.data,
    },
  });

  return {
    ...baseContext,
    phone_clean: cleanPhoneNumber(getPrimaryPhoneValue(params.data)),
    password: getPrimaryPasswordValue(params.data),
  };
}

function replaceTemplateValue(
  value: unknown,
  submissionData: Record<string, unknown>,
  extraData: Record<string, unknown>,
): unknown {
  if (typeof value === "string") {
    return value.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key: string) => {
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

  if (Array.isArray(value)) {
    return value.map((item) =>
      replaceTemplateValue(item, submissionData, extraData),
    );
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        replaceTemplateValue(item, submissionData, extraData),
      ]),
    );
  }

  return value;
}

export function buildWebhookPayload(params: {
  webhook: DynamicFormWebhook;
  form: DynamicForm;
  submission: FormSubmission;
  data?: Record<string, unknown>;
}) {
  const template = params.webhook.payload_template || {};
  const hasTemplate = Object.keys(template).length > 0;
  const webhookData = params.data || params.submission.data;

  const extraData = buildWebhookTemplateContext({
    form: params.form,
    submission: params.submission,
    data: webhookData,
  });

  const defaultPayload = {
    form: {
      id: params.form.id,
      name: params.form.name,
      slug: params.form.slug,
      title: params.form.title,
    },
    submission: {
      id: params.submission.id,
      created_at: params.submission.created_at,
      source_url: params.submission.source_url,
    },
    data: webhookData,
    computed: extraData,
  };

  if (!hasTemplate) {
    return defaultPayload;
  }

  return replaceTemplateValue(template, webhookData, extraData);
}

export async function logWebhookResult(params: {
  submissionId: string;
  webhookId: string | null;
  webhookName: string | null;
  status: "success" | "error";
  requestUrl: string;
  requestMethod: string;
  requestHeaders: Record<string, string>;
  requestPayload: unknown;
  responseStatus?: number | null;
  responseBody?: string | null;
  errorMessage?: string | null;
}) {
  const supabase = getSupabaseAdmin();

  await supabase.from("form_webhook_logs").insert({
    submission_id: params.submissionId,
    webhook_id: params.webhookId,
    webhook_name: params.webhookName,
    status: params.status,
    request_url: params.requestUrl,
    request_method: params.requestMethod,
    request_headers: params.requestHeaders,
    request_payload: params.requestPayload,
    response_status: params.responseStatus ?? null,
    response_body: params.responseBody ?? null,
    error_message: params.errorMessage ?? null,
  });
}

function sanitizeWebhookPayloadForLogs(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeWebhookPayloadForLogs(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        isSensitiveFieldName(key)
          ? "••••••••"
          : sanitizeWebhookPayloadForLogs(item),
      ]),
    );
  }

  return value;
}

export async function executeWebhook(params: {
  webhook: DynamicFormWebhook;
  form: DynamicForm;
  submission: FormSubmission;
  webhookData?: Record<string, unknown>;
}) {
  const payload = buildWebhookPayload({
    webhook: params.webhook,
    form: params.form,
    submission: params.submission,
    data: params.webhookData || params.submission.data,
  });

  const safeLogPayload = sanitizeWebhookPayloadForLogs(payload);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(params.webhook.headers || {}),
  };

  try {
    const response = await fetch(params.webhook.url, {
      method: params.webhook.method,
      headers,
      body: JSON.stringify(payload),
    });

    const responseBody = await response.text();

    await logWebhookResult({
      submissionId: params.submission.id,
      webhookId: params.webhook.id,
      webhookName: params.webhook.name,
      status: response.ok ? "success" : "error",
      requestUrl: params.webhook.url,
      requestMethod: params.webhook.method,
      requestHeaders: headers,
      requestPayload: safeLogPayload,
      responseStatus: response.status,
      responseBody,
      errorMessage: response.ok
        ? null
        : `Webhook returned status ${response.status}`,
    });

    return {
      success: response.ok,
      responseStatus: response.status,
      responseBody,
      errorMessage: response.ok
        ? null
        : `Webhook returned status ${response.status}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown webhook error.";

    await logWebhookResult({
      submissionId: params.submission.id,
      webhookId: params.webhook.id,
      webhookName: params.webhook.name,
      status: "error",
      requestUrl: params.webhook.url,
      requestMethod: params.webhook.method,
      requestHeaders: headers,
      requestPayload: safeLogPayload,
      responseStatus: null,
      responseBody: null,
      errorMessage,
    });

    return {
      success: false,
      responseStatus: null,
      responseBody: null,
      errorMessage,
    };
  }
}

export async function updateSubmissionWebhookStatus(params: {
  submissionId: string;
  successCount: number;
  errorCount: number;
}) {
  const supabase = getSupabaseAdmin();

  let webhookStatus:
    | "success"
    | "partial_error"
    | "error"
    | "not_configured" = "not_configured";

  if (params.successCount > 0 && params.errorCount === 0) {
    webhookStatus = "success";
  }

  if (params.successCount > 0 && params.errorCount > 0) {
    webhookStatus = "partial_error";
  }

  if (params.successCount === 0 && params.errorCount > 0) {
    webhookStatus = "error";
  }

  const { error } = await supabase
    .from("form_submissions")
    .update({
      webhook_status: webhookStatus,
      webhook_success_count: params.successCount,
      webhook_error_count: params.errorCount,
    })
    .eq("id", params.submissionId);

  if (error) {
    throw new Error(error.message);
  }

  return webhookStatus;
}

export async function logFormEmailResult(params: {
  submissionId: string;
  formEmailId: string | null;
  formEmailName: string | null;
  status: "success" | "error";
  emailType: "user" | "admin" | null;
  recipients: string[];
  subject: string | null;
  bodyHtml: string | null;
  providerMessageId?: string | null;
  errorMessage?: string | null;
}) {
  const supabase = getSupabaseAdmin();

  await supabase.from("form_email_logs").insert({
    submission_id: params.submissionId,
    form_email_id: params.formEmailId,
    form_email_name: params.formEmailName,
    status: params.status,
    email_type: params.emailType,
    recipients: params.recipients,
    subject: params.subject,
    body_html: params.bodyHtml,
    provider_message_id: params.providerMessageId ?? null,
    error_message: params.errorMessage ?? null,
  });
}

async function executeFormEmail(params: {
  email: DynamicFormEmail;
  form: DynamicForm;
  submission: FormSubmission;
}) {
  const sanitizedSubmission = {
    ...params.submission,
    data: sanitizeSubmissionDataForTemplates(params.submission.data),
  };

  const extraData = buildSubmissionTemplateContext({
    form: params.form,
    submission: sanitizedSubmission,
  });

  const subject = renderTemplateString(
    params.email.subject_template,
    sanitizedSubmission.data,
    extraData,
  );

  const bodyHtml = renderTemplateString(
    params.email.body_html_template,
    sanitizedSubmission.data,
    extraData,
  );

  const replyToField = params.email.reply_to_field || null;
  const replyToValue =
    replyToField && typeof params.submission.data[replyToField] === "string"
      ? String(params.submission.data[replyToField]).trim()
      : "";

  const resolvedReplyTo = isValidEmail(replyToValue) ? replyToValue : null;
  const recipients =
    params.email.type === "user"
      ? (() => {
          const recipientField = params.email.recipient_field || "";
          const recipientValue = params.submission.data[recipientField];

          if (!isValidEmail(recipientValue)) {
            return [];
          }

          return [String(recipientValue).trim()];
        })()
      : params.email.recipients;

  if (recipients.length === 0) {
    await logFormEmailResult({
      submissionId: params.submission.id,
      formEmailId: params.email.id,
      formEmailName: params.email.name,
      status: "error",
      emailType: params.email.type,
      recipients: [],
      subject,
      bodyHtml,
      errorMessage:
        params.email.type === "user"
          ? `Recipient field ${
              params.email.recipient_field || "email"
            } is missing or invalid.`
          : "No valid admin recipients configured.",
    });

    return {
      success: false,
      errorMessage: "Missing email recipients.",
    };
  }

  const result = await sendTransactionalEmail({
    to: recipients,
    subject,
    html: bodyHtml,
    fromName: params.email.from_name,
    replyTo: resolvedReplyTo,
  });

  await logFormEmailResult({
    submissionId: params.submission.id,
    formEmailId: params.email.id,
    formEmailName: params.email.name,
    status: result.success ? "success" : "error",
    emailType: params.email.type,
    recipients,
    subject,
    bodyHtml,
    providerMessageId: result.providerMessageId || null,
    errorMessage: result.errorMessage || null,
  });

  return result;
}

export async function submitDynamicForm(params: {
  slug: string;
  data: Record<string, unknown>;
  sourceUrl: string | null;
  userAgent: string | null;
  ipAddress: string | null;
}): Promise<SubmitFormResult> {
  const { form, fields, error } = await getPublishedFormBySlug(params.slug);

  if (error || !form) {
    return {
      success: false,
      error: error || "Form not found.",
    };
  }

  const normalizedData = normalizeFormData(params.data);

  const requiredErrors = validateRequiredFields(fields, normalizedData);
  const emailErrors = validateEmailFields(fields, normalizedData);
  const phoneErrors = validatePhoneFields(fields, normalizedData);
  const stateErrors = validateStateFields(fields, normalizedData);

  const fieldErrors = {
    ...requiredErrors,
    ...emailErrors,
    ...phoneErrors,
    ...stateErrors,
  };

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Validation error.",
      fieldErrors,
    };
  }

  const displayData = sanitizeSubmissionDataForDisplay(normalizedData, fields);

  const webhookData = buildWebhookData({
    data: normalizedData,
    fields,
  });

  const submission = await createFormSubmission({
    form,
    data: displayData,
    sourceUrl: params.sourceUrl,
    userAgent: params.userAgent,
    ipAddress: params.ipAddress,
  });

  const emails = await getActiveFormEmailsByFormId(form.id);
  const webhooks = await getActiveWebhooksByFormId(form.id);

  for (const email of emails) {
    await executeFormEmail({
      email,
      form,
      submission,
    });
  }

  if (webhooks.length === 0) {
    await updateSubmissionWebhookStatus({
      submissionId: submission.id,
      successCount: 0,
      errorCount: 0,
    });

    return {
      success: true,
      submissionId: submission.id,
      thankYouPageUrl: form.thank_you_page_url || "/thank-you/default",
    };
  }

  let successCount = 0;
  let errorCount = 0;

  for (const webhook of webhooks) {
    const result = await executeWebhook({
      webhook,
      form,
      submission,
      webhookData,
    });

    if (result.success) {
      successCount += 1;
    } else {
      errorCount += 1;
    }
  }

  await updateSubmissionWebhookStatus({
    submissionId: submission.id,
    successCount,
    errorCount,
  });

  return {
    success: true,
    submissionId: submission.id,
    thankYouPageUrl: form.thank_you_page_url || "/thank-you/default",
  };
}