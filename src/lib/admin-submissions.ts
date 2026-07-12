import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Database, Json } from "@/types/database";

type SubmissionOverviewStatus =
  | "pending"
  | "success"
  | "partial_error"
  | "error"
  | "not_configured";

type SubmissionOverviewRow = {
  id: string;
  form_id: string | null;
  form_slug: string | null;
  form_name: string | null;
  form_title: string | null;
  data: Json;
  source_url: string | null;
  webhook_status: SubmissionOverviewStatus;
  webhook_success_count: number;
  webhook_error_count: number;
  email_success_count: number;
  email_error_count: number;
  email_total_count: number;
  created_at: string;
};

type SubmissionRecord = {
  id: string;
  form_id: string | null;
  form_slug: string | null;
  data: Json;
  source_url: string | null;
  user_agent: string | null;
  ip_address: string | null;
  webhook_status: SubmissionOverviewStatus;
  webhook_success_count: number;
  webhook_error_count: number;
  created_at: string;
};

export type AdminSubmissionListItem = {
  id: string;
  submission_status: "success";
  form_id: string | null;
  form_slug: string | null;
  form_name: string | null;
  form_title: string | null;
  data: Record<string, unknown>;
  source_url: string | null;
  webhook_status: SubmissionOverviewStatus;
  webhook_success_count: number;
  webhook_error_count: number;
  email_success_count: number;
  email_error_count: number;
  email_total_count: number;
  created_at: string;
};

export type AdminSubmissionsStats = {
  total_submissions: number;
  successful_submissions: number;
  error_submissions: number;
  webhook_errors: number;
  emails_sent: number;
  email_errors: number;
};

export type AdminSubmissionsResult = {
  items: AdminSubmissionListItem[];
  stats: AdminSubmissionsStats;
  forms: {
    id: string;
    name: string;
    slug: string;
    title: string;
  }[];
  page: number;
  pageSize: number;
  hasNextPage: boolean;
};

export type AdminWebhookLog = {
  id: string;
  submission_id: string | null;
  webhook_id: string | null;
  webhook_name: string | null;
  status: "success" | "error";
  request_url: string | null;
  request_method: string | null;
  request_headers: Record<string, unknown> | null;
  request_payload: Record<string, unknown> | unknown[] | string | number | boolean | null;
  response_status: number | null;
  response_body: string | null;
  error_message: string | null;
  created_at: string;
};

export type AdminEmailLog = {
  id: string;
  submission_id: string;
  form_email_id: string | null;
  form_email_name: string | null;
  status: "success" | "error";
  email_type: "user" | "admin" | null;
  recipients: string[];
  subject: string | null;
  body_html: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  created_at: string;
};

export type AdminSubmissionDetails = {
  form: {
    id: string;
    name: string;
    slug: string;
    title: string;
  } | null;
  submission: SubmissionRecord;
  webhookLogs: AdminWebhookLog[];
  emailLogs: AdminEmailLog[];
};

export type AdminSubmissionSearchParams = {
  status?: string;
  form_id?: string;
  email_status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: string;
};

function isMissingRelationError(
  error: { message?: string | null; code?: string | null } | null,
) {
  if (!error) {
    return false;
  }

  return (
    error.code === "42P01" ||
    Boolean(
      error.message?.includes("Could not find the table") ||
        error.message?.includes("does not exist"),
    )
  );
}

function toRecord(value: Json): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function getLeadDisplay(data: Record<string, unknown>, submissionId: string) {
  const name = normalizeText(data.name) ? String(data.name) : "";
  const email = normalizeText(data.email) ? String(data.email) : "";
  const phone = String(data.phone || data.phone_clean || "");

  if (name) {
    return {
      name,
      email,
      phone,
      fallback: `#${submissionId.slice(0, 8)}`,
    };
  }

  return {
    name: `Submission #${submissionId.slice(0, 8)}`,
    email,
    phone,
    fallback: `#${submissionId.slice(0, 8)}`,
  };
}

export function getSubmissionEmailStatusKey(item: AdminSubmissionListItem) {
  if (item.email_total_count === 0) {
    return "no_email";
  }

  if (item.email_success_count > 0 && item.email_error_count === 0) {
    return "success";
  }

  if (item.email_success_count > 0 && item.email_error_count > 0) {
    return "partial_error";
  }

  if (item.email_success_count === 0 && item.email_error_count > 0) {
    return "error";
  }

  return "pending";
}

function matchesStatusFilter(
  item: AdminSubmissionListItem,
  statusFilter: string,
) {
  if (!statusFilter || statusFilter === "all") {
    return true;
  }

  if (statusFilter === "success") {
    return item.submission_status === "success";
  }

  if (statusFilter === "error") {
    return (
      item.webhook_status === "error" ||
      item.webhook_status === "partial_error" ||
      item.email_error_count > 0
    );
  }

  if (statusFilter === "partial_error") {
    return item.webhook_status === "partial_error";
  }

  if (statusFilter === "not_configured") {
    return item.webhook_status === "not_configured";
  }

  return true;
}

function matchesEmailStatusFilter(
  item: AdminSubmissionListItem,
  emailStatusFilter: string,
) {
  if (!emailStatusFilter || emailStatusFilter === "all") {
    return true;
  }

  const status = getSubmissionEmailStatusKey(item);

  if (emailStatusFilter === "success") {
    return status === "success";
  }

  if (emailStatusFilter === "error") {
    return status === "error" || status === "partial_error";
  }

  return true;
}

function matchesDateFilter(
  item: AdminSubmissionListItem,
  dateFrom?: string,
  dateTo?: string,
) {
  const createdAt = new Date(item.created_at);

  if (dateFrom) {
    const fromDate = new Date(dateFrom);

    if (!Number.isNaN(fromDate.getTime()) && createdAt < fromDate) {
      return false;
    }
  }

  if (dateTo) {
    const toDate = new Date(dateTo);

    if (!Number.isNaN(toDate.getTime())) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (createdAt > endOfDay) {
        return false;
      }
    }
  }

  return true;
}

function matchesSearchFilter(
  item: AdminSubmissionListItem,
  search: string,
) {
  if (!search) {
    return true;
  }

  const haystack = [
    item.id,
    item.form_name,
    item.form_slug,
    item.form_title,
    JSON.stringify(item.data),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

function calculateStats(items: AdminSubmissionListItem[]): AdminSubmissionsStats {
  return items.reduce<AdminSubmissionsStats>(
    (acc, item) => {
      acc.total_submissions += 1;
      acc.webhook_errors += item.webhook_error_count;
      acc.emails_sent += item.email_success_count;
      acc.email_errors += item.email_error_count;
      acc.successful_submissions += 1;

      if (
        item.webhook_status === "error" ||
        item.webhook_status === "partial_error" ||
        item.email_error_count > 0
      ) {
        acc.error_submissions += 1;
      }

      return acc;
    },
    {
      total_submissions: 0,
      successful_submissions: 0,
      error_submissions: 0,
      webhook_errors: 0,
      emails_sent: 0,
      email_errors: 0,
    },
  );
}

async function getFormsList() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("forms")
    .select("id, name, slug, title")
    .order("name", { ascending: true });

  if (error) {
    return [];
  }

  return (
    (data || []) as {
      id: string;
      name: string;
      slug: string;
      title: string;
    }[]
  );
}

async function getOverviewRows() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("admin_submission_overview")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) {
    return (data || []) as SubmissionOverviewRow[];
  }

  if (!isMissingRelationError(error)) {
    throw new Error(error.message);
  }

  const { data: fallbackRows, error: fallbackError } = await supabase
    .from("form_submissions")
    .select(
      "id, form_id, form_slug, data, source_url, webhook_status, webhook_success_count, webhook_error_count, created_at",
    )
    .order("created_at", { ascending: false });

  if (fallbackError) {
    throw new Error(fallbackError.message);
  }

  const forms = await getFormsList();
  const formMap = new Map(forms.map((form) => [form.id, form]));

  return ((fallbackRows || []) as SubmissionRecord[]).map((row) => {
    const form = row.form_id ? formMap.get(row.form_id) : null;

    return {
      id: row.id,
      form_id: row.form_id,
      form_slug: row.form_slug,
      form_name: form?.name || row.form_slug || null,
      form_title: form?.title || null,
      data: row.data,
      source_url: row.source_url,
      webhook_status: row.webhook_status,
      webhook_success_count: row.webhook_success_count,
      webhook_error_count: row.webhook_error_count,
      email_success_count: 0,
      email_error_count: 0,
      email_total_count: 0,
      created_at: row.created_at,
    } satisfies SubmissionOverviewRow;
  });
}

export async function getAdminSubmissions(
  params: AdminSubmissionSearchParams,
): Promise<AdminSubmissionsResult> {
  const pageSize = 20;
  const requestedPage = Math.max(Number(params.page || "1") || 1, 1);
  const search = normalizeText(params.search);
  const formIdFilter =
    params.form_id && params.form_id !== "all" ? params.form_id : "";

  const forms = await getFormsList();
  const rows = await getOverviewRows();

  const filtered = rows
    .map((row) => ({
      ...row,
      submission_status: "success" as const,
      data: toRecord(row.data),
    }))
    .filter((item) =>
      matchesStatusFilter(item, params.status || "all"),
    )
    .filter((item) => (formIdFilter ? item.form_id === formIdFilter : true))
    .filter((item) =>
      matchesEmailStatusFilter(item, params.email_status || "all"),
    )
    .filter((item) => matchesDateFilter(item, params.date_from, params.date_to))
    .filter((item) => matchesSearchFilter(item, search));

  const stats = calculateStats(filtered);
  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(requestedPage, maxPage);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = filtered.slice(start, end).map((item) => ({
    ...item,
    data: item.data,
  }));

  return {
    items,
    stats,
    forms,
    page,
    pageSize,
    hasNextPage: end < filtered.length,
  };
}

async function getSubmissionEmailLogs(submissionId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("form_email_logs")
    .select("*")
    .eq("submission_id", submissionId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingRelationError(error)) {
      return [] as AdminEmailLog[];
    }

    throw new Error(error.message);
  }

  return ((data || []) as Array<Database["public"]["Tables"]["form_email_logs"]["Row"]>)
    .map((row) => ({
      id: row.id,
      submission_id: row.submission_id,
      form_email_id: row.form_email_id,
      form_email_name: row.form_email_name,
      status: row.status,
      email_type: row.email_type,
      recipients: Array.isArray(row.recipients)
        ? row.recipients.filter((item): item is string => typeof item === "string")
        : [],
      subject: row.subject,
      body_html: row.body_html,
      provider_message_id: row.provider_message_id,
      error_message: row.error_message,
      created_at: row.created_at,
    }));
}

async function getSubmissionWebhookLogs(submissionId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("form_webhook_logs")
    .select("*")
    .eq("submission_id", submissionId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingRelationError(error)) {
      return [] as AdminWebhookLog[];
    }

    throw new Error(error.message);
  }

  return (data || []) as AdminWebhookLog[];
}

export async function getAdminSubmissionDetails(params: {
  formId: string;
  submissionId: string;
}): Promise<AdminSubmissionDetails | null> {
  const supabase = createAdminClient();

  const [formResult, submissionResult, webhookLogs, emailLogs] =
    await Promise.all([
      supabase
        .from("forms")
        .select("id, name, slug, title")
        .eq("id", params.formId)
        .maybeSingle<{
          id: string;
          name: string;
          slug: string;
          title: string;
        }>(),
      supabase
        .from("form_submissions")
        .select(
          "id, form_id, form_slug, data, source_url, user_agent, ip_address, webhook_status, webhook_success_count, webhook_error_count, created_at",
        )
        .eq("id", params.submissionId)
        .eq("form_id", params.formId)
        .maybeSingle<SubmissionRecord>(),
      getSubmissionWebhookLogs(params.submissionId),
      getSubmissionEmailLogs(params.submissionId),
    ]);

  if (formResult.error || submissionResult.error || !submissionResult.data) {
    return null;
  }

  return {
    form: formResult.data || null,
    submission: submissionResult.data,
    webhookLogs,
    emailLogs,
  };
}

export function getLeadDisplayName(data: Record<string, unknown>, submissionId: string) {
  return getLeadDisplay(data, submissionId);
}

export function getSubmissionEmailStatusLabel(
  item: AdminSubmissionListItem,
) {
  const status = getSubmissionEmailStatusKey(item);

  if (status === "success") {
    return "Sent";
  }

  if (status === "partial_error") {
    return "Partial error";
  }

  if (status === "error") {
    return "Error";
  }

  if (status === "pending") {
    return "Pending";
  }

  return "No email";
}

export const getSubmissionEmailStatus = getSubmissionEmailStatusKey;
