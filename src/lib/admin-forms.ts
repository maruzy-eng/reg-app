"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  getAdminFormEmailsByFormId,
  type AdminFormEmail,
  type AdminFormEmailLog,
} from "@/lib/admin-form-emails";
import { requireAdminPermission } from "@/lib/admin-permissions";

export type AdminForm = {
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

export type AdminFormField = {
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
    | "state";
  placeholder: string | null;
  help_text: string | null;
  required: boolean;
  options: unknown;
  default_value: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AdminFormWebhook = {
  id: string;
  form_id: string;
  name: string;
  url: string;
  method: "POST" | "PUT" | "PATCH";
  enabled: boolean;
  headers: Record<string, unknown>;
  payload_template: Record<string, unknown>;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AdminFormSubmission = {
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

export type AdminFormWebhookLog = {
  id: string;
  submission_id: string | null;
  webhook_id: string | null;
  webhook_name: string | null;
  status: "success" | "error";
  request_url: string | null;
  request_method: string | null;
  request_headers: Record<string, unknown> | null;
  request_payload:
    | Record<string, unknown>
    | unknown[]
    | string
    | number
    | boolean
    | null;
  response_status: number | null;
  response_body: string | null;
  error_message: string | null;
  created_at: string;
};

export type AdminFormWithCounts = AdminForm & {
  fields_count?: number;
  webhooks_count?: number;
  submissions_count?: number;
};

export type AdminFormDetails = {
  form: AdminForm;
  fields: AdminFormField[];
  emails: AdminFormEmail[];
  webhooks: AdminFormWebhook[];
  submissions: AdminFormSubmission[];
};

export type AdminSubmissionDetails = {
  form: AdminForm;
  submission: AdminFormSubmission;
  logs: AdminFormWebhookLog[];
  emailLogs: AdminFormEmailLog[];
};

type AdminFormFieldPresetType = "state_br" | "whatsapp_us" | "whatsapp_br";

type AdminFormFieldPreset = {
  label: string;
  name: string;
  type: AdminFormField["type"];
  placeholder: string;
  help_text: string;
  required: boolean;
  options: unknown;
};

const allowedFormFieldTypes = [
  "text",
  "email",
  "phone",
  "number",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "hidden",
  "state",
] as const;

const brazilStates = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

const formFieldPresets = {
  state_br: {
    label: "State",
    name: "state_br",
    type: "select",
    placeholder: "Select your state",
    help_text: "Brazilian state.",
    required: true,
    options: brazilStates,
  },
  whatsapp_us: {
    label: "WhatsApp US",
    name: "whatsapp_us",
    type: "phone",
    placeholder: "(555) 555-5555",
    help_text: "US phone format.",
    required: false,
    options: {
      mask: "(999) 999-9999",
    },
  },
  whatsapp_br: {
    label: "WhatsApp BR",
    name: "whatsapp_br",
    type: "phone",
    placeholder: "(11) 99999-9999",
    help_text: "Brazilian WhatsApp format.",
    required: false,
    options: {
      mask: "(99) 99999-9999",
    },
  },
} satisfies Record<AdminFormFieldPresetType, AdminFormFieldPreset>;

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function getNumberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(getStringValue(formData, key));

  if (Number.isNaN(value)) {
    return fallback;
  }

  return value;
}

function parseJsonValue(value: string, fallback: unknown) {
  if (!value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON format.");
  }
}

function isAllowedFormFieldType(value: string): value is AdminFormField["type"] {
  return allowedFormFieldTypes.includes(value as AdminFormField["type"]);
}

function getFormFieldPreset(value: string) {
  if (value in formFieldPresets) {
    return formFieldPresets[value as AdminFormFieldPresetType];
  }

  return null;
}

function isMissingTableError(
  error: { message?: string | null; code?: string | null } | null,
) {
  if (!error) {
    return false;
  }

  return (
    error.code === "42P01" ||
    Boolean(error.message?.includes("Could not find the table"))
  );
}

function revalidateFormPaths(formId: string, slug?: string | null) {
  revalidatePath("/admin/forms");
  revalidatePath(`/admin/forms/${formId}`);

  if (slug) {
    revalidatePath(`/forms/${slug}`);
  }
}

async function generateUniqueFormSlug(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  value: string,
) {
  const baseSlug = slugify(value) || "form-copy";

  for (let index = 1; index <= 100; index += 1) {
    const candidate = index === 1 ? baseSlug : `${baseSlug}-${index}`;

    const { data, error } = await supabase
      .from("forms")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle<{ id: string }>();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return candidate;
    }
  }

  throw new Error("Unable to generate a unique form slug.");
}

async function cleanupDuplicatedForm(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  formId: string | null,
) {
  if (!formId) {
    return;
  }

  const { error } = await supabase.from("forms").delete().eq("id", formId);

  if (error) {
    console.error("Unable to clean up duplicated form:", error.message);
  }
}

/* =========================================================
   FORMS
========================================================= */

export async function getAdminForms() {
  const supabase = getSupabaseAdmin();

  const { data: forms, error } = await supabase
    .from("forms")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<AdminForm[]>();

  if (error) {
    throw new Error(error.message);
  }

  const formList = forms || [];

  if (formList.length === 0) {
    return [];
  }

  const formIds = formList.map((form) => form.id);

  const [fieldsResult, webhooksResult, submissionsResult] = await Promise.all([
    supabase.from("form_fields").select("form_id").in("form_id", formIds),
    supabase.from("form_webhooks").select("form_id").in("form_id", formIds),
    supabase.from("form_submissions").select("form_id").in("form_id", formIds),
  ]);

  const countByFormId = (rows: Array<{ form_id: string | null }> | null) => {
    const counts = new Map<string, number>();

    for (const row of rows || []) {
      if (!row.form_id) {
        continue;
      }

      counts.set(row.form_id, (counts.get(row.form_id) || 0) + 1);
    }

    return counts;
  };

  const fieldsCount = countByFormId(fieldsResult.data || []);
  const webhooksCount = countByFormId(webhooksResult.data || []);
  const submissionsCount = countByFormId(submissionsResult.data || []);

  return formList.map((form) => ({
    ...form,
    fields_count: fieldsCount.get(form.id) || 0,
    webhooks_count: webhooksCount.get(form.id) || 0,
    submissions_count: submissionsCount.get(form.id) || 0,
  })) satisfies AdminFormWithCounts[];
}

export async function getAdminFormById(id: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single<AdminForm>();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getAdminFormDetails(id: string) {
  const supabase = getSupabaseAdmin();

  const form = await getAdminFormById(id);

  if (!form) {
    return null;
  }

  const [fieldsResult, emails, webhooksResult, submissionsResult] =
    await Promise.all([
      supabase
        .from("form_fields")
        .select("*")
        .eq("form_id", id)
        .order("sort_order", { ascending: true })
        .returns<AdminFormField[]>(),

      getAdminFormEmailsByFormId(id),

      supabase
        .from("form_webhooks")
        .select("*")
        .eq("form_id", id)
        .order("sort_order", { ascending: true })
        .returns<AdminFormWebhook[]>(),

      supabase
        .from("form_submissions")
        .select("*")
        .eq("form_id", id)
        .order("created_at", { ascending: false })
        .limit(20)
        .returns<AdminFormSubmission[]>(),
    ]);

  if (fieldsResult.error) {
    throw new Error(fieldsResult.error.message);
  }

  if (webhooksResult.error) {
    throw new Error(webhooksResult.error.message);
  }

  if (submissionsResult.error) {
    throw new Error(submissionsResult.error.message);
  }

  return {
    form,
    fields: fieldsResult.data || [],
    emails,
    webhooks: webhooksResult.data || [],
    submissions: submissionsResult.data || [],
  } satisfies AdminFormDetails;
}

export async function getAdminSubmissionDetails(params: {
  formId: string;
  submissionId: string;
}) {
  const supabase = getSupabaseAdmin();

  const form = await getAdminFormById(params.formId);

  if (!form) {
    return null;
  }

  const { data: submission, error: submissionError } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("id", params.submissionId)
    .eq("form_id", params.formId)
    .single<AdminFormSubmission>();

  if (submissionError || !submission) {
    return null;
  }

  const { data: logs, error: logsError } = await supabase
    .from("form_webhook_logs")
    .select("*")
    .eq("submission_id", params.submissionId)
    .order("created_at", { ascending: true })
    .returns<AdminFormWebhookLog[]>();

  const { data: emailLogs, error: emailLogsError } = await supabase
    .from("form_email_logs")
    .select("*")
    .eq("submission_id", params.submissionId)
    .order("created_at", { ascending: true })
    .returns<AdminFormEmailLog[]>();

  if (logsError) {
    throw new Error(logsError.message);
  }

  if (emailLogsError) {
    if (isMissingTableError(emailLogsError)) {
      return {
        form,
        submission,
        logs: logs || [],
        emailLogs: [],
      } satisfies AdminSubmissionDetails;
    }

    throw new Error(emailLogsError.message);
  }

  return {
    form,
    submission,
    logs: logs || [],
    emailLogs: emailLogs || [],
  } satisfies AdminSubmissionDetails;
}

export async function createAdminFormAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const name = getStringValue(formData, "name");
  const rawSlug = getStringValue(formData, "slug");
  const title = getStringValue(formData, "title");
  const description = getStringValue(formData, "description");
  const status = getStringValue(formData, "status") || "draft";
  const submitButtonLabel =
    getStringValue(formData, "submit_button_label") || "Submit";
  const thankYouPageUrl =
    getStringValue(formData, "thank_you_page_url") || "/thank-you/default";

  const slug = slugify(rawSlug || name || title);

  if (!name) {
    throw new Error("Form name is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  if (!title) {
    throw new Error("Form title is required.");
  }

  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid form status.");
  }

  const { data, error } = await supabase
    .from("forms")
    .insert({
      name,
      slug,
      title,
      description: description || null,
      status,
      submit_button_label: submitButtonLabel,
      thank_you_page_url: thankYouPageUrl || null,
    })
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    throw new Error(error?.message || "Unable to create form.");
  }

  revalidatePath("/admin/forms");
  revalidatePath(`/admin/forms/${data.id}`);
  redirect(`/admin/forms/${data.id}`);
}

export async function updateAdminFormAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const id = getStringValue(formData, "id");
  const name = getStringValue(formData, "name");
  const rawSlug = getStringValue(formData, "slug");
  const title = getStringValue(formData, "title");
  const description = getStringValue(formData, "description");
  const status = getStringValue(formData, "status") || "draft";
  const submitButtonLabel =
    getStringValue(formData, "submit_button_label") || "Submit";
  const thankYouPageUrl =
    getStringValue(formData, "thank_you_page_url") || "/thank-you/default";

  const slug = slugify(rawSlug || name || title);

  if (!id) {
    throw new Error("Missing form id.");
  }

  if (!name) {
    throw new Error("Form name is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  if (!title) {
    throw new Error("Form title is required.");
  }

  if (!["draft", "published", "archived"].includes(status)) {
    throw new Error("Invalid form status.");
  }

  const { error } = await supabase
    .from("forms")
    .update({
      name,
      slug,
      title,
      description: description || null,
      status,
      submit_button_label: submitButtonLabel,
      thank_you_page_url: thankYouPageUrl || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(id, slug);
}

export async function deleteAdminFormAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const id = getStringValue(formData, "id");

  if (!id) {
    throw new Error("Missing form id.");
  }

  const { error } = await supabase.from("forms").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/forms");
  redirect("/admin/forms");
}

export async function duplicateAdminFormAction(formData: FormData) {
  await requireAdminPermission("forms.update");

  const supabase = getSupabaseAdmin();
  const id = getStringValue(formData, "id");
  let duplicatedFormId: string | null = null;

  if (!id) {
    throw new Error("Missing form id.");
  }

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single<AdminForm>();

  if (formError || !form) {
    throw new Error(formError?.message || "Original form was not found.");
  }

  const [fieldsResult, webhooksResult, emailsResult] = await Promise.all([
    supabase
      .from("form_fields")
      .select("*")
      .eq("form_id", id)
      .order("sort_order", { ascending: true })
      .returns<AdminFormField[]>(),

    supabase
      .from("form_webhooks")
      .select("*")
      .eq("form_id", id)
      .order("sort_order", { ascending: true })
      .returns<AdminFormWebhook[]>(),

    supabase
      .from("form_emails")
      .select("*")
      .eq("form_id", id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
      .returns<AdminFormEmail[]>(),
  ]);

  if (fieldsResult.error) {
    throw new Error(fieldsResult.error.message);
  }

  if (webhooksResult.error) {
    throw new Error(webhooksResult.error.message);
  }

  if (emailsResult.error && !isMissingTableError(emailsResult.error)) {
    throw new Error(emailsResult.error.message);
  }

  const slug = await generateUniqueFormSlug(supabase, `${form.slug}-copy`);
  const copiedName = `${form.name} — Cópia`;
  let redirectFormId = "";

  try {
    const { data: duplicatedForm, error: createError } = await supabase
      .from("forms")
      .insert({
        name: copiedName,
        slug,
        title: form.title,
        description: form.description,
        status: "draft",
        submit_button_label: form.submit_button_label,
        thank_you_page_url: form.thank_you_page_url,
      })
      .select("id")
      .single<{ id: string }>();

    if (createError || !duplicatedForm) {
      throw new Error(createError?.message || "Unable to create form copy.");
    }

    duplicatedFormId = duplicatedForm.id;

    const fieldRows = (fieldsResult.data || []).map((field) => ({
      form_id: duplicatedForm.id,
      label: field.label,
      name: field.name,
      type: field.type,
      placeholder: field.placeholder,
      help_text: field.help_text,
      required: field.required,
      options: field.options || [],
      default_value: field.default_value,
      sort_order: field.sort_order,
    }));

    if (fieldRows.length > 0) {
      const { error } = await supabase.from("form_fields").insert(fieldRows);

      if (error) {
        throw new Error(error.message);
      }
    }

    const webhookRows = (webhooksResult.data || []).map((webhook) => ({
      form_id: duplicatedForm.id,
      name: webhook.name,
      url: webhook.url,
      method: webhook.method,
      enabled: webhook.enabled,
      headers: webhook.headers || {},
      payload_template: webhook.payload_template || {},
      sort_order: webhook.sort_order,
    }));

    if (webhookRows.length > 0) {
      const { error } = await supabase.from("form_webhooks").insert(webhookRows);

      if (error) {
        throw new Error(error.message);
      }
    }

    const emailRows = (emailsResult.data || []).map((email) => ({
      form_id: duplicatedForm.id,
      name: email.name,
      type: email.type,
      enabled: email.enabled,
      recipient_field: email.recipient_field,
      recipients: email.recipients || [],
      subject_template: email.subject_template,
      body_html_template: email.body_html_template,
      from_name: email.from_name,
      reply_to_field: email.reply_to_field,
      sort_order: email.sort_order,
    }));

    if (emailRows.length > 0) {
      const { error } = await supabase.from("form_emails").insert(emailRows);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidatePath("/admin/forms");
    revalidatePath(`/admin/forms/${duplicatedForm.id}`);
    redirectFormId = duplicatedForm.id;
  } catch (error) {
    await cleanupDuplicatedForm(supabase, duplicatedFormId);

    throw error;
  }

  redirect(`/admin/forms/${redirectFormId}?duplicated=1`);
}

/* =========================================================
   FIELDS
========================================================= */

export async function createAdminFormFieldAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const label = getStringValue(formData, "label");
  const rawName = getStringValue(formData, "name");
  const rawType = getStringValue(formData, "type") || "text";
  const placeholder = getStringValue(formData, "placeholder");
  const helpText = getStringValue(formData, "help_text");
  const defaultValue = getStringValue(formData, "default_value");
  const required = getBooleanValue(formData, "required");
  const sortOrder = getNumberValue(formData, "sort_order", 0);
  const optionsRaw = getStringValue(formData, "options");

  const preset = getFormFieldPreset(rawType);
  const finalLabel = label || preset?.label || "";
  const finalName = slugify(rawName || preset?.name || finalLabel).replaceAll(
    "-",
    "_",
  );
  const finalType = preset
    ? preset.type
    : isAllowedFormFieldType(rawType)
      ? rawType
      : "text";
  const finalPlaceholder = placeholder || preset?.placeholder || "";
  const finalHelpText = helpText || preset?.help_text || "";
  const options = preset ? preset.options : parseJsonValue(optionsRaw, []);

  if (!formId) {
    throw new Error("Missing form id.");
  }

  if (!finalLabel) {
    throw new Error("Field label is required.");
  }

  if (!finalName) {
    throw new Error("Field name is required.");
  }

  const { error } = await supabase.from("form_fields").insert({
    form_id: formId,
    label: finalLabel,
    name: finalName,
    type: finalType,
    placeholder: finalPlaceholder || null,
    help_text: finalHelpText || null,
    required,
    options,
    default_value: defaultValue || null,
    sort_order: sortOrder,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(formId);
}

export async function deleteAdminFormFieldAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const fieldId = getStringValue(formData, "field_id");

  if (!formId || !fieldId) {
    throw new Error("Missing field information.");
  }

  const { error } = await supabase
    .from("form_fields")
    .delete()
    .eq("id", fieldId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(formId);
}

/* =========================================================
   WEBHOOKS
========================================================= */

export async function createAdminFormWebhookAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const name = getStringValue(formData, "name");
  const url = getStringValue(formData, "url");
  const method = getStringValue(formData, "method") || "POST";
  const enabled = getBooleanValue(formData, "enabled");
  const sortOrder = getNumberValue(formData, "sort_order", 0);
  const headersRaw = getStringValue(formData, "headers");
  const payloadTemplateRaw = getStringValue(formData, "payload_template");

  const headers = parseJsonValue(headersRaw, {});
  const payloadTemplate = parseJsonValue(payloadTemplateRaw, {});

  if (!formId) {
    throw new Error("Missing form id.");
  }

  if (!name) {
    throw new Error("Webhook name is required.");
  }

  if (!url) {
    throw new Error("Webhook URL is required.");
  }

  if (!["POST", "PUT", "PATCH"].includes(method)) {
    throw new Error("Invalid webhook method.");
  }

  const { error } = await supabase.from("form_webhooks").insert({
    form_id: formId,
    name,
    url,
    method,
    enabled,
    headers,
    payload_template: payloadTemplate,
    sort_order: sortOrder,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(formId);
}

export async function toggleAdminFormWebhookAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const webhookId = getStringValue(formData, "webhook_id");
  const enabled = getBooleanValue(formData, "enabled");

  if (!formId || !webhookId) {
    throw new Error("Missing webhook information.");
  }

  const { error } = await supabase
    .from("form_webhooks")
    .update({
      enabled,
    })
    .eq("id", webhookId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(formId);
}

export async function deleteAdminFormWebhookAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const webhookId = getStringValue(formData, "webhook_id");

  if (!formId || !webhookId) {
    throw new Error("Missing webhook information.");
  }

  const { error } = await supabase
    .from("form_webhooks")
    .delete()
    .eq("id", webhookId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormPaths(formId);
}
