import { getResendClient, getResendFromAddress } from "@/lib/resend";

export async function sendTransactionalEmail(params: {
  to: string[];
  subject: string;
  html: string;
  fromName?: string | null;
  replyTo?: string | null;
}) {
  const resend = getResendClient();

  if (!resend) {
    return {
      success: false,
      providerMessageId: null,
      errorMessage: "RESEND_API_KEY is not configured.",
    };
  }

  const fromAddress = getResendFromAddress();

  if (!fromAddress) {
    return {
      success: false,
      providerMessageId: null,
      errorMessage: "EMAIL_FROM is not configured.",
    };
  }

  const from = params.fromName
    ? `${params.fromName} <${fromAddress}>`
    : fromAddress;

  try {
    const response = await resend.emails.send({
      from,
      to: params.to,
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo || undefined,
    });

    if (response.error) {
      return {
        success: false,
        providerMessageId: null,
        errorMessage: response.error.message || "Unknown email error.",
      };
    }

    return {
      success: Boolean(response.data?.id),
      providerMessageId: response.data?.id || null,
      errorMessage: response.data?.id ? null : "Email provider did not return a message id.",
    };
  } catch (error) {
    return {
      success: false,
      providerMessageId: null,
      errorMessage:
        error instanceof Error ? error.message : "Unknown email error.",
    };
  }
}
