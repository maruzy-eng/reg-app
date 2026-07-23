import { createHash } from "crypto";
import {
  normalizeMetaEmail,
  normalizeMetaName,
  normalizeMetaPhone,
} from "@/lib/meta-normalize";

export type MetaConversionUserPayload = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
};

export type MetaCustomData = {
  content_name?: string;
  status?: string;
};

export type SendMetaConversionEventParams = {
  eventName: "CompleteRegistration" | "Lead";
  eventId: string;
  eventSourceUrl: string;
  user: MetaConversionUserPayload;
  customData?: MetaCustomData;
  eventTime?: number;
};

/** @deprecated Prefer MetaConversionUserPayload */
export type MetaLeadUserPayload = MetaConversionUserPayload;

/** @deprecated Prefer SendMetaConversionEventParams */
export type SendMetaLeadEventParams = Omit<
  SendMetaConversionEventParams,
  "eventName"
> & {
  eventName?: "CompleteRegistration" | "Lead";
};

function getMetaConfig() {
  const datasetId =
    process.env.META_DATASET_ID?.trim() ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
    "";
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN?.trim() || "";
  const apiVersion =
    process.env.META_GRAPH_API_VERSION?.trim().replace(/^\/+|\/+$/g, "") ||
    "v21.0";
  const endpointBase =
    process.env.META_GRAPH_API_ENDPOINT?.trim().replace(/\/+$/g, "") ||
    "https://graph.facebook.com";

  return {
    datasetId,
    accessToken,
    apiVersion,
    endpointBase,
  };
}

export function sha256Hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function maybeHashNormalized(
  value: string | undefined,
  normalize: (input: string) => string,
) {
  if (!value?.trim()) {
    return undefined;
  }

  const normalized = normalize(value);

  if (!normalized) {
    return undefined;
  }

  return sha256Hash(normalized);
}

function buildUserData(user: MetaConversionUserPayload) {
  const userData: Record<string, string | string[]> = {};

  const emailHash = maybeHashNormalized(user.email, normalizeMetaEmail);
  const phoneHash = maybeHashNormalized(user.phone, normalizeMetaPhone);
  const firstNameHash = maybeHashNormalized(user.firstName, normalizeMetaName);
  const lastNameHash = maybeHashNormalized(user.lastName, normalizeMetaName);

  if (emailHash) {
    userData.em = [emailHash];
  }

  if (phoneHash) {
    userData.ph = [phoneHash];
  }

  if (firstNameHash) {
    userData.fn = [firstNameHash];
  }

  if (lastNameHash) {
    userData.ln = [lastNameHash];
  }

  if (user.clientIpAddress?.trim()) {
    userData.client_ip_address = user.clientIpAddress.trim();
  }

  if (user.clientUserAgent?.trim()) {
    userData.client_user_agent = user.clientUserAgent.trim();
  }

  if (user.fbp?.trim()) {
    userData.fbp = user.fbp.trim();
  }

  if (user.fbc?.trim()) {
    userData.fbc = user.fbc.trim();
  }

  return userData;
}

function buildCustomData(customData?: MetaCustomData) {
  if (!customData) {
    return undefined;
  }

  const payload: Record<string, string> = {};

  if (customData.content_name?.trim()) {
    payload.content_name = customData.content_name.trim();
  }

  if (customData.status?.trim()) {
    payload.status = customData.status.trim();
  }

  return Object.keys(payload).length > 0 ? payload : undefined;
}

function buildEventsUrl(config: ReturnType<typeof getMetaConfig>) {
  const { endpointBase, apiVersion, datasetId } = config;

  if (
    /\/v\d+\.\d+(\/|$)/.test(endpointBase) &&
    endpointBase.includes(datasetId)
  ) {
    return endpointBase.endsWith("/events")
      ? endpointBase
      : `${endpointBase.replace(/\/+$/g, "")}/events`;
  }

  if (/\/v\d+\.\d+$/.test(endpointBase)) {
    return `${endpointBase}/${datasetId}/events`;
  }

  return `${endpointBase}/${apiVersion}/${datasetId}/events`;
}

export async function sendMetaConversionEvent(
  params: SendMetaConversionEventParams,
) {
  const config = getMetaConfig();

  if (!config.datasetId || !config.accessToken) {
    console.warn(
      "Meta Conversions API skipped: META_DATASET_ID / META_CONVERSIONS_API_TOKEN not configured.",
    );

    return {
      success: false,
      skipped: true,
      error: "Meta Conversions API is not configured.",
    };
  }

  const customData = buildCustomData(params.customData);

  const payload = {
    data: [
      {
        event_name: params.eventName,
        event_time: params.eventTime || Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        event_source_url: params.eventSourceUrl,
        action_source: "website",
        user_data: buildUserData(params.user),
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
  };

  const url = buildEventsUrl(config);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        access_token: config.accessToken,
      }),
      cache: "no-store",
    });

    const text = await response.text();
    let data: unknown = null;

    if (text) {
      try {
        data = JSON.parse(text) as unknown;
      } catch {
        data = { raw: text };
      }
    }

    if (!response.ok) {
      console.error("Meta Conversions API error:", response.status, data);

      return {
        success: false,
        skipped: false,
        status: response.status,
        error: "Meta Conversions API request failed.",
        data,
      };
    }

    return {
      success: true,
      skipped: false,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("Meta Conversions API request exception:", error);

    return {
      success: false,
      skipped: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected Meta Conversions API error.",
    };
  }
}

/** @deprecated Prefer sendMetaConversionEvent */
export async function sendMetaLeadEvent(params: SendMetaLeadEventParams) {
  return sendMetaConversionEvent({
    ...params,
    eventName: params.eventName || "Lead",
  });
}
