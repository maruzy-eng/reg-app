/**
 * Checkmate REG isolated Supabase table names.
 * Do not reuse shared Checkmate Property tables (forms, site_settings, etc.).
 */
export const REG_TABLES = {
  siteSettings: "reg_site_settings",
  forms: "reg_forms",
  formFields: "reg_form_fields",
  formWebhooks: "reg_form_webhooks",
  formWebhookLogs: "reg_form_webhook_logs",
  formEmails: "reg_form_emails",
  formEmailLogs: "reg_form_email_logs",
  formSubmissions: "reg_form_submissions",
  formPageConnections: "reg_form_page_connections",
  adminSubmissionOverview: "reg_admin_submission_overview",
  posts: "reg_posts",
  products: "reg_products",
} as const;

export type RegTableName = (typeof REG_TABLES)[keyof typeof REG_TABLES];
