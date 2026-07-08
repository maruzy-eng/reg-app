"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

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
  method: "POST" | "PUT" | "PATCH";
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
    webhook,
  } satisfies AdminWebhookEditDetails;
}

export async function updateAdminFormWebhookAction(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const formId = getStringValue(formData, "form_id");
  const webhookId = getStringValue(formData, "webhook_id");
  const name = getStringValue(formData, "name");
  const url = getStringValue(formData, "url");
  const method = getStringValue(formData, "method") || "POST";
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

  if (!url) {
    throw new Error("Webhook URL is required.");
  }

  if (!["POST", "PUT", "PATCH"].includes(method)) {
    throw new Error("Invalid webhook method.");
  }

  const headers = parseJsonValue(headersRaw, {});
  const payloadTemplate = parseJsonValue(payloadTemplateRaw, {});

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