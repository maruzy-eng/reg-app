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
  testEventCode?: string;
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

type MetaApiSuccessResponse = {
  events_received?: number;
  messages?: string[];
  fbtrace_id?: string;
};

function getMetaConfig() {
  const pixelId =
    process.env.META_PIXEL_ID?.trim() ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
    "";

  const datasetId =
    process.env.META_DATASET_ID?.trim() ||
    pixelId;

  const accessToken =
    process.env.META_CONVERSIONS_API_TOKEN?.trim() || "";

  const configuredApiVersion =
    process.env.META_GRAPH_API_VERSION?.trim() || "v24.0";

  const apiVersion = /^v\d+\.\d+$/.test(configuredApiVersion)
    ? configuredApiVersion
    : "v24.0";

  const graphApiBaseUrl =
    process.env.META_GRAPH_API_ENDPOINT
      ?.trim()
      .replace(/\/+$/g, "") ||
    "https://graph.facebook.com";

  const testEventCode =
    process.env.META_TEST_EVENT_CODE?.trim() ||
    process.env.META_CAPI_TEST_EVENT_CODE?.trim() ||
    "";

  return {
    pixelId,
    datasetId,
    accessToken,
    apiVersion,
    graphApiBaseUrl,
    testEventCode,
  };
}

export function sha256Hash(value: string) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
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

  const emailHash = maybeHashNormalized(
    user.email,
    normalizeMetaEmail,
  );

  const phoneHash = maybeHashNormalized(
    user.phone,
    normalizeMetaPhone,
  );

  const firstNameHash = maybeHashNormalized(
    user.firstName,
    normalizeMetaName,
  );

  const lastNameHash = maybeHashNormalized(
    user.lastName,
    normalizeMetaName,
  );

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
    userData.client_ip_address =
      user.clientIpAddress.trim();
  }

  if (user.clientUserAgent?.trim()) {
    userData.client_user_agent =
      user.clientUserAgent.trim();
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
    payload.content_name =
      customData.content_name.trim();
  }

  if (customData.status?.trim()) {
    payload.status = customData.status.trim();
  }

  return Object.keys(payload).length > 0
    ? payload
    : undefined;
}

function normalizeEventSourceUrl(value: string) {
  try {
    const parsedUrl = new URL(value);

    if (
      parsedUrl.hostname !== "checkmateproperty.com" &&
      parsedUrl.hostname !== "www.checkmateproperty.com"
    ) {
      return "https://checkmateproperty.com/calculator";
    }

    if (
      parsedUrl.pathname === "/" ||
      !parsedUrl.pathname
    ) {
      parsedUrl.pathname = "/calculator";
    }

    return parsedUrl.toString();
  } catch {
    return "https://checkmateproperty.com/calculator";
  }
}

function isValidMetaEventId(eventId: string) {
  const normalized = eventId.trim();

  return (
    normalized.length > 0 &&
    normalized.length <= 128 &&
    /^[a-zA-Z0-9_-]+$/.test(normalized)
  );
}

function buildEventsUrl(
  config: ReturnType<typeof getMetaConfig>,
) {
  return [
    config.graphApiBaseUrl,
    config.apiVersion,
    encodeURIComponent(config.datasetId),
    "events",
  ].join("/");
}

function sanitizeMetaResponse(data: unknown) {
  if (!data || typeof data !== "object") {
    return data;
  }

  return data;
}

export async function sendMetaConversionEvent(
  params: SendMetaConversionEventParams,
) {
  const config = getMetaConfig();

  if (!config.datasetId || !config.accessToken) {
    console.warn(
      "[Meta CAPI] Event skipped because server configuration is incomplete.",
      {
        eventName: params.eventName,
        eventId: params.eventId,
        hasDatasetId: Boolean(config.datasetId),
        hasAccessToken: Boolean(config.accessToken),
      },
    );

    return {
      success: false as const,
      skipped: true as const,
      error: "Meta Conversions API is not configured.",
      eventName: params.eventName,
      eventId: params.eventId,
    };
  }

  if (!isValidMetaEventId(params.eventId)) {
    console.error("[Meta CAPI] Invalid event ID.", {
      eventName: params.eventName,
      eventId: params.eventId,
    });

    return {
      success: false as const,
      skipped: true as const,
      error: "Invalid Meta event ID.",
      eventName: params.eventName,
      eventId: params.eventId,
    };
  }

  if (
    config.pixelId &&
    config.pixelId !== config.datasetId
  ) {
    console.error(
      "[Meta CAPI] Pixel and Dataset IDs do not match.",
      {
        pixelId: config.pixelId,
        datasetId: config.datasetId,
        eventName: params.eventName,
        eventId: params.eventId,
      },
    );

    return {
      success: false as const,
      skipped: true as const,
      error: "Meta Pixel and Dataset IDs do not match.",
      pixelId: config.pixelId,
      datasetId: config.datasetId,
      eventName: params.eventName,
      eventId: params.eventId,
    };
  }

  const eventSourceUrl = normalizeEventSourceUrl(
    params.eventSourceUrl,
  );

  const userData = buildUserData(params.user);
  const customData = buildCustomData(params.customData);

  const testEventCode =
    params.testEventCode?.trim() ||
    config.testEventCode;

  const eventPayload = {
    event_name: params.eventName,
    event_time:
      params.eventTime ??
      Math.floor(Date.now() / 1000),
    event_id: params.eventId.trim(),
    event_source_url: eventSourceUrl,
    action_source: "website" as const,
    user_data: userData,
    ...(customData
      ? {
          custom_data: customData,
        }
      : {}),
  };

  const body: Record<string, unknown> = {
    data: [eventPayload],
    access_token: config.accessToken,
  };

  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  const eventsUrl = buildEventsUrl(config);

  try {
    const response = await fetch(eventsUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const responseText = await response.text();

    let responseData: unknown = null;

    if (responseText) {
      try {
        responseData = JSON.parse(
          responseText,
        ) as unknown;
      } catch {
        responseData = {
          raw: responseText,
        };
      }
    }

    if (!response.ok) {
      console.error("[Meta CAPI] Request rejected.", {
        status: response.status,
        datasetId: config.datasetId,
        pixelId: config.pixelId,
        apiVersion: config.apiVersion,
        eventName: params.eventName,
        eventId: params.eventId,
        eventSourceUrl,
        testEventCodeConfigured:
          Boolean(testEventCode),
        response: sanitizeMetaResponse(
          responseData,
        ),
      });

      return {
        success: false as const,
        skipped: false as const,
        status: response.status,
        error:
          "Meta Conversions API request failed.",
        datasetId: config.datasetId,
        pixelId: config.pixelId,
        eventName: params.eventName,
        eventId: params.eventId,
        data: responseData,
      };
    }

    const successResponse =
      responseData &&
      typeof responseData === "object"
        ? (responseData as MetaApiSuccessResponse)
        : null;

    const eventsReceived =
      successResponse?.events_received;

    if (
      typeof eventsReceived === "number" &&
      eventsReceived < 1
    ) {
      console.error(
        "[Meta CAPI] Request completed but no events were accepted.",
        {
          status: response.status,
          datasetId: config.datasetId,
          pixelId: config.pixelId,
          eventName: params.eventName,
          eventId: params.eventId,
          eventSourceUrl,
          testEventCodeConfigured:
            Boolean(testEventCode),
          response: responseData,
        },
      );

      return {
        success: false as const,
        skipped: false as const,
        status: response.status,
        error:
          "Meta returned zero accepted events.",
        datasetId: config.datasetId,
        pixelId: config.pixelId,
        eventName: params.eventName,
        eventId: params.eventId,
        data: responseData,
      };
    }

    console.info("[Meta CAPI] Event accepted.", {
      status: response.status,
      datasetId: config.datasetId,
      pixelId: config.pixelId,
      apiVersion: config.apiVersion,
      eventName: params.eventName,
      eventId: params.eventId,
      eventSourceUrl,
      testEventCodeConfigured:
        Boolean(testEventCode),
      eventsReceived:
        successResponse?.events_received ?? null,
      fbtraceId:
        successResponse?.fbtrace_id ?? null,
    });

    return {
      success: true as const,
      skipped: false as const,
      status: response.status,
      datasetId: config.datasetId,
      pixelId: config.pixelId,
      eventName: params.eventName,
      eventId: params.eventId,
      eventSourceUrl,
      eventsReceived:
        successResponse?.events_received ?? null,
      data: responseData,
    };
  } catch (error) {
    console.error(
      "[Meta CAPI] Network request failed.",
      {
        datasetId: config.datasetId,
        pixelId: config.pixelId,
        apiVersion: config.apiVersion,
        eventName: params.eventName,
        eventId: params.eventId,
        testEventCodeConfigured:
          Boolean(testEventCode),
        error:
          error instanceof Error
            ? error.message
            : "Unexpected Meta Conversions API error.",
      },
    );

    return {
      success: false as const,
      skipped: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected Meta Conversions API error.",
      datasetId: config.datasetId,
      pixelId: config.pixelId,
      eventName: params.eventName,
      eventId: params.eventId,
    };
  }
}

/** @deprecated Prefer sendMetaConversionEvent */
export async function sendMetaLeadEvent(
  params: SendMetaLeadEventParams,
) {
  return sendMetaConversionEvent({
    ...params,
    eventName:
      params.eventName || "Lead",
  });
}