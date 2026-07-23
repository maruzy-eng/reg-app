"use client";

import {
  CALCULATOR_META_CONTENT_NAME,
  CALCULATOR_META_EVENT_SOURCE_URL,
} from "@/lib/meta-constants";

type FbqFunction = (
  command: string,
  eventOrId?: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

export {
  CALCULATOR_META_CONTENT_NAME,
  CALCULATOR_META_EVENT_SOURCE_URL,
} from "@/lib/meta-constants";

export function getBrowserCookie(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  const encodedName = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const trimmed = cookie.trim();

    if (trimmed.startsWith(encodedName)) {
      return decodeURIComponent(trimmed.slice(encodedName.length));
    }
  }

  return "";
}

export function createMetaEventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `meta_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function trackMetaCompleteRegistration(eventId: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  window.fbq(
    "track",
    "CompleteRegistration",
    {
      content_name: CALCULATOR_META_CONTENT_NAME,
      status: "completed",
    },
    { eventID: eventId },
  );

  return true;
}

/** @deprecated Prefer trackMetaCompleteRegistration */
export function trackMetaLead(eventId: string) {
  return trackMetaCompleteRegistration(eventId);
}

export type MetaCompleteRegistrationPayload = {
  eventId: string;
  eventSourceUrl?: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
};

export async function sendMetaCompleteRegistrationConversion(
  payload: MetaCompleteRegistrationPayload,
) {
  const response = await fetch("/api/meta/conversions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: JSON.stringify({
      event_name: "CompleteRegistration",
      event_id: payload.eventId,
      event_source_url:
        payload.eventSourceUrl || CALCULATOR_META_EVENT_SOURCE_URL,
      email: payload.email,
      phone: payload.phone,
      first_name: payload.firstName || undefined,
      last_name: payload.lastName || undefined,
      content_name: CALCULATOR_META_CONTENT_NAME,
      status: "completed",
      fbp: getBrowserCookie("_fbp") || undefined,
      fbc: getBrowserCookie("_fbc") || undefined,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.error || "Unable to send Meta Conversions API event.",
    );
  }

  if (result?.meta?.success === false && !result?.meta?.skipped) {
    console.error("Meta CAPI reported failure:", result.meta);
  } else {
    console.info("Meta CAPI response:", {
      event_name: "CompleteRegistration",
      event_id: payload.eventId,
      pixel_dataset: result?.meta?.datasetId || result?.meta?.pixelId,
      meta: result?.meta,
    });
  }

  return result;
}

/** @deprecated Prefer sendMetaCompleteRegistrationConversion */
export async function sendMetaLeadConversion(
  payload: MetaCompleteRegistrationPayload & {
    firstName: string;
    lastName: string;
  },
) {
  return sendMetaCompleteRegistrationConversion(payload);
}
