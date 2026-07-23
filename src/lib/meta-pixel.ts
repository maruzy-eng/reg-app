"use client";

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

  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function trackMetaLead(eventId: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  window.fbq("track", "Lead", {}, { eventID: eventId });
  return true;
}

export type MetaLeadConversionPayload = {
  eventId: string;
  eventSourceUrl: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

export async function sendMetaLeadConversion(
  payload: MetaLeadConversionPayload,
) {
  const response = await fetch("/api/meta/conversions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_name: "Lead",
      event_id: payload.eventId,
      event_source_url: payload.eventSourceUrl,
      email: payload.email,
      phone: payload.phone,
      first_name: payload.firstName,
      last_name: payload.lastName,
      fbp: getBrowserCookie("_fbp") || undefined,
      fbc: getBrowserCookie("_fbc") || undefined,
    }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(
      result?.error || "Unable to send Meta Conversions API event.",
    );
  }

  return response.json();
}
