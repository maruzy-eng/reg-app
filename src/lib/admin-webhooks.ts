"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export type AdminWebhookMethod = "POST" | "PUT" | "PATCH";

export type AdminWebhookForm = {
  id: string;
  name: string;
  slug: string;
  title: string;
};

export type AdminWebhookDetails = {
  id: string;
  form_id: string;
  name: string;
  url: string;
  method: AdminWebhookMethod;
  enabled: boolean;
  headers: Record<string, unknown>;
  payload_template: Record<string, unknown>;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AdminWebhookEditDetails = {
  form: AdminWebhookForm;
  webhook: AdminWebhookDetails;
};

const VALID_WEBHOOK_METHODS: AdminWebhookMethod[] = ["POST", "PUT", "PATCH"];

const DEFAULT_WEBHOOK_PAYLOAD_TEMPLATE = {
  name: "{{name}}",
  email: "{{email}}",
  phone: "{{phone_clean}}",
  password: "{{password}}",
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
  const rawValue = getStringValue(formData, key);

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    return fallback;
  }

  return value;
}

function getWebhookMethod(value: string): AdminWebhookMethod {
  const normalizedValue = value.trim().toUpperCase();

  if (VALID_WEBHOOK_METHODS.includes(normalizedValue as AdminWebhookMethod)) {
    return normalizedValue as AdminWebhookMethod;
  }

  throw new Error("Invalid webhook method.");
}

function validateWebhookUrl(value: string) {
  if (!value) {
    throw new Error("Webhook URL is required.");
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("Webhook URL must start with http:// or https://.");
    }

    return url.toString();
  } catch {
    throw new Error("Webhook URL must be a valid URL.");
  }
}

function parseJsonObject(value: string, fallback: Record<string, unknown>, label: string) {
  if (!value.trim()) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`${label} must be a valid JSON object.`);
    }

    return parsed as Record<string, unknown>;
  } catch (error) {
    if (error instanceof Error && error.message.includes("must be")) {
      throw error;
    }

    throw new Error(`${label} has invalid JSON format.`);
  }
}

export async function getAdminWebhookEditDetails(params: {
  formId: string;
  webhookId: string;
}) {
  const supabase = getSupabaseAdmin();

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("id, name, slug, title")
    .eq("id", params.formId)
    .single<AdminWebhookForm>();

  if (formError || !form) {
    return null;
  }

  const { data: webhook, error: webhookError } = await supabase
    .from("form_webhooks")
    .select("*")
    .eq("id", params.webhookId)
    .eq("form_id", params.formId)
    .single<AdminWebhookDetails>();

  if (webhookError || !webhook) {
    return null;
  }

  return {
    form,
    webhook: {
      ...webhook,
      headers:
        webhook.headers && typeof webhook.headers === "object"
          ? webhook.headers
          : {},
      payload_template:
        webhook.payload_template &&
        typeof webhook.payload_template === "object" &&
        Object.keys(webhook.payload_template).length > 0
          ? webhook.payload_template
          : DEFAULT_WEBHOOK_PAYLOAD_TEMPLATE,
    },
  } satisfies AdminWebhookEditDetails;
}

export async function updateAdminFormWebhookAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const webhookId = getStringValue(formData, "webhook_id");
  const name = getStringValue(formData, "name");
  const rawUrl = getStringValue(formData, "url");
  const rawMethod = getStringValue(formData, "method") || "POST";
  const enabled = getBooleanValue(formData, "enabled");
  const sortOrder = getNumberValue(formData, "sort_order", 0);
  const headersRaw = getStringValue(formData, "headers");
  const payloadTemplateRaw = getStringValue(formData, "payload_template");

  if (!formId) {
    throw new Error("Missing form id.");
  }

  if (!webhookId) {
    throw new Error("Missing webhook id.");
  }

  if (!name) {
    throw new Error("Webhook name is required.");
  }

  const url = validateWebhookUrl(rawUrl);
  const method = getWebhookMethod(rawMethod);

  const headers = parseJsonObject(headersRaw, {}, "Headers");

  const payloadTemplate = parseJsonObject(
    payloadTemplateRaw,
    DEFAULT_WEBHOOK_PAYLOAD_TEMPLATE,
    "Payload template",
  );

  const { error } = await supabase
    .from("form_webhooks")
    .update({
      name,
      url,
      method,
      enabled,
      headers,
      payload_template: payloadTemplate,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", webhookId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/forms");
  revalidatePath(`/admin/forms/${formId}`);
  revalidatePath(`/admin/forms/${formId}/webhooks/${webhookId}`);

  redirect(`/admin/forms/${formId}`);
}