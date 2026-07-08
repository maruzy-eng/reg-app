import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export function getResendFromAddress() {
  const configuredFrom = process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL;

  if (!configuredFrom) {
    return "onboarding@resend.dev";
  }

  const match = configuredFrom.match(/<([^>]+)>/);

  if (match?.[1]) {
    return match[1].trim();
  }

  return configuredFrom.trim();
}

export function getResendFromEmail() {
  const configuredFrom = process.env.EMAIL_FROM || process.env.RESEND_FROM_EMAIL;

  if (!configuredFrom) {
    return "Property Portal <onboarding@resend.dev>";
  }

  if (configuredFrom.includes("<") && configuredFrom.includes(">")) {
    return configuredFrom;
  }

  return `Property Portal <${configuredFrom.trim()}>`;
}

export function getAdminNotificationEmail() {
  return process.env.ADMIN_NOTIFICATION_EMAIL || "";
}
