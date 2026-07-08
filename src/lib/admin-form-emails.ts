"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  normalizeEmailList,
  normalizeRecipientsArray,
  type FormEmailRecord,
  type FormEmailLogRecord,
} from "@/lib/form-emails";

export type AdminFormEmail = FormEmailRecord;
export type AdminFormEmailLog = FormEmailLogRecord;

export type AdminFormEmailEditDetails = {
  form: {
    id: string;
    name: string;
    slug: string;
    title: string;
  };
  email: AdminFormEmail;
};

export type AdminFormEmailActionResult = {
  error?: string;
};

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

function getEmailType(formData: FormData) {
  const type = getStringValue(formData, "type");

  if (type !== "user" && type !== "admin") {
    throw new Error("Email type must be user or admin.");
  }

  return type;
}

function parseRecipients(formData: FormData) {
  const recipientsJson = getStringValue(formData, "recipients");

  if (recipientsJson) {
    try {
      const parsed = JSON.parse(recipientsJson);
      return normalizeRecipientsArray(parsed);
    } catch {
      throw new Error("Invalid recipients format.");
    }
  }

  const recipientsText = getStringValue(formData, "recipients_text");
  return normalizeEmailList(recipientsText);
}

function validateEmailPayload(params: {
  name: string;
  type: string;
  subjectTemplate: string;
  bodyHtmlTemplate: string;
  recipientField: string;
  recipients: string[];
}) {
  if (!params.name) {
    throw new Error("Email name is required.");
  }

  if (params.type !== "user" && params.type !== "admin") {
    throw new Error("Email type must be user or admin.");
  }

  if (!params.subjectTemplate) {
    throw new Error("Subject template is required.");
  }

  if (!params.bodyHtmlTemplate) {
    throw new Error("Body HTML template is required.");
  }

  if (params.type === "user" && !params.recipientField) {
    throw new Error("Recipient field is required for user emails.");
  }

  if (params.type === "admin" && params.recipients.length === 0) {
    throw new Error("At least one valid recipient is required for admin emails.");
  }
}

function revalidateFormEmailPaths(formId: string, emailId?: string | null) {
  revalidatePath("/admin/forms");
  revalidatePath(`/admin/forms/${formId}`);

  if (emailId) {
    revalidatePath(`/admin/forms/${formId}/emails/${emailId}`);
  }
}

function isMissingTableError(error: { message?: string | null; code?: string | null } | null) {
  if (!error) {
    return false;
  }

  return (
    error.code === "42P01" ||
    Boolean(error.message?.includes("Could not find the table"))
  );
}

export async function getAdminFormEmailsByFormId(formId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("form_emails")
    .select("*")
    .eq("form_id", formId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<AdminFormEmail[]>();

  if (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return data || [];
}

export async function getAdminFormEmailEditDetails(params: {
  formId: string;
  emailId: string;
}) {
  const supabase = createAdminClient();

  const [formResult, emailResult] = await Promise.all([
    supabase
      .from("forms")
      .select("id, name, slug, title")
      .eq("id", params.formId)
      .single<AdminFormEmailEditDetails["form"]>(),
    supabase
      .from("form_emails")
      .select("*")
      .eq("id", params.emailId)
      .eq("form_id", params.formId)
      .single<AdminFormEmail>(),
  ]);

  if (
    formResult.error ||
    emailResult.error ||
    !formResult.data ||
    !emailResult.data
  ) {
    if (isMissingTableError(emailResult.error)) {
      return null;
    }

    return null;
  }

  return {
    form: formResult.data,
    email: emailResult.data,
  } satisfies AdminFormEmailEditDetails;
}

export async function createAdminFormEmailAction(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const formId = getStringValue(formData, "form_id");
    const name = getStringValue(formData, "name");
    const type = getEmailType(formData);
    const enabled = getBooleanValue(formData, "enabled");
    const recipientField = getStringValue(formData, "recipient_field");
    const recipients = parseRecipients(formData);
    const subjectTemplate = getStringValue(formData, "subject_template");
    const bodyHtmlTemplate = getStringValue(formData, "body_html_template");
    const fromName = getStringValue(formData, "from_name") || null;
    const replyToField = getStringValue(formData, "reply_to_field") || null;
    const sortOrder = getNumberValue(formData, "sort_order", 0);

    if (!formId) {
      return { error: "Missing form id." } satisfies AdminFormEmailActionResult;
    }

    validateEmailPayload({
      name,
      type,
      subjectTemplate,
      bodyHtmlTemplate,
      recipientField,
      recipients,
    });

    const { error } = await supabase.from("form_emails").insert({
      form_id: formId,
      name,
      type,
      enabled,
      recipient_field: type === "user" ? recipientField : null,
      recipients,
      subject_template: subjectTemplate,
      body_html_template: bodyHtmlTemplate,
      from_name: fromName,
      reply_to_field: replyToField,
      sort_order: sortOrder,
    });

    if (error) {
      return { error: error.message } satisfies AdminFormEmailActionResult;
    }

    revalidateFormEmailPaths(formId);
    redirect(`/admin/forms/${formId}`);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to save email.",
    } satisfies AdminFormEmailActionResult;
  }
}

export async function updateAdminFormEmailAction(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const formId = getStringValue(formData, "form_id");
    const emailId = getStringValue(formData, "email_id");
    const name = getStringValue(formData, "name");
    const type = getEmailType(formData);
    const enabled = getBooleanValue(formData, "enabled");
    const recipientField = getStringValue(formData, "recipient_field");
    const recipients = parseRecipients(formData);
    const subjectTemplate = getStringValue(formData, "subject_template");
    const bodyHtmlTemplate = getStringValue(formData, "body_html_template");
    const fromName = getStringValue(formData, "from_name") || null;
    const replyToField = getStringValue(formData, "reply_to_field") || null;
    const sortOrder = getNumberValue(formData, "sort_order", 0);

    if (!formId || !emailId) {
      return { error: "Missing email information." } satisfies AdminFormEmailActionResult;
    }

    validateEmailPayload({
      name,
      type,
      subjectTemplate,
      bodyHtmlTemplate,
      recipientField,
      recipients,
    });

    const { error } = await supabase
      .from("form_emails")
      .update({
        name,
        type,
        enabled,
        recipient_field: type === "user" ? recipientField : null,
        recipients,
        subject_template: subjectTemplate,
        body_html_template: bodyHtmlTemplate,
        from_name: fromName,
        reply_to_field: replyToField,
        sort_order: sortOrder,
      })
      .eq("id", emailId)
      .eq("form_id", formId);

    if (error) {
      return { error: error.message } satisfies AdminFormEmailActionResult;
    }

    revalidateFormEmailPaths(formId, emailId);
    redirect(`/admin/forms/${formId}`);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to save email.",
    } satisfies AdminFormEmailActionResult;
  }
}

export async function toggleAdminFormEmailAction(formData: FormData) {
  const supabase = createAdminClient();

  const formId = getStringValue(formData, "form_id");
  const emailId = getStringValue(formData, "email_id");
  const enabled = getBooleanValue(formData, "enabled");

  if (!formId || !emailId) {
    throw new Error("Missing email information.");
  }

  const { error } = await supabase
    .from("form_emails")
    .update({
      enabled,
    })
    .eq("id", emailId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormEmailPaths(formId, emailId);
  redirect(`/admin/forms/${formId}`);
}

export async function deleteAdminFormEmailAction(formData: FormData) {
  const supabase = createAdminClient();

  const formId = getStringValue(formData, "form_id");
  const emailId = getStringValue(formData, "email_id");

  if (!formId || !emailId) {
    throw new Error("Missing email information.");
  }

  const { error } = await supabase
    .from("form_emails")
    .delete()
    .eq("id", emailId)
    .eq("form_id", formId);

  if (error) {
    throw new Error(error.message);
  }

  revalidateFormEmailPaths(formId, emailId);
  redirect(`/admin/forms/${formId}`);
}
