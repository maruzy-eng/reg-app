import { NextRequest, NextResponse } from "next/server";
import { getClientIpFromHeaders } from "@/lib/forms";
import {
  CALCULATOR_META_CONTENT_NAME,
  CALCULATOR_META_EVENT_SOURCE_URL,
} from "@/lib/meta-constants";
import { sendMetaConversionEvent } from "@/lib/meta-conversions";
import { splitFullName } from "@/lib/meta-normalize";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CAMPAIGN_REGISTER_ENDPOINT =
  "https://api.checkmateproperty.com/api/auth/register/campaign";

type CampaignRegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  eventId: string;
  sourceUrl: string;
};

type MetaConversionResult = Awaited<
  ReturnType<typeof sendMetaConversionEvent>
>;

function getStringValue(body: Record<string, unknown>, key: string) {
  const value = body[key];

  return typeof value === "string" ? value : "";
}

async function parseJsonSafely(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return {
      success: false,
      error: text,
    };
  }
}

function getUsefulMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  if (typeof record.error === "string" && record.error.trim()) {
    return record.error;
  }

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  return fallback;
}

function getCookieValue(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value?.trim() || "";
}

function buildFbcFromFbclid(sourceUrl: string) {
  try {
    const parsedUrl = new URL(sourceUrl);
    const fbclid = parsedUrl.searchParams.get("fbclid")?.trim();

    if (!fbclid) {
      return "";
    }

    return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    return "";
  }
}

function normalizeSourceUrl(sourceUrl: string) {
  try {
    const parsedUrl = new URL(sourceUrl);

    if (parsedUrl.hostname !== "checkmateproperty.com") {
      return CALCULATOR_META_EVENT_SOURCE_URL;
    }

    if (parsedUrl.pathname === "/" || !parsedUrl.pathname) {
      return CALCULATOR_META_EVENT_SOURCE_URL;
    }

    return parsedUrl.toString();
  } catch {
    return CALCULATOR_META_EVENT_SOURCE_URL;
  }
}

function isValidEventId(eventId: string) {
  if (!eventId || eventId.length > 128) {
    return false;
  }

  return /^[a-zA-Z0-9_-]+$/.test(eventId);
}

async function sendCompleteRegistrationConversion(params: {
  request: NextRequest;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  sourceUrl: string;
}) {
  const { firstName, lastName } = splitFullName(params.name);

  const sourceUrl = normalizeSourceUrl(params.sourceUrl);

  const fbc =
    getCookieValue(params.request, "_fbc") ||
    buildFbcFromFbclid(sourceUrl);

  return sendMetaConversionEvent({
    eventName: "CompleteRegistration",
    eventId: params.eventId,
    eventSourceUrl: sourceUrl,
    user: {
      email: params.email,
      phone: params.phone,
      firstName,
      lastName,
      clientIpAddress: getClientIpFromHeaders(params.request.headers),
      clientUserAgent:
        params.request.headers.get("user-agent") || undefined,
      fbp: getCookieValue(params.request, "_fbp") || undefined,
      fbc: fbc || undefined,
    },
    customData: {
      content_name: CALCULATOR_META_CONTENT_NAME,
      status: "completed",
    },
  });
}

async function sendMetaConversionSafely(params: {
  request: NextRequest;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  sourceUrl: string;
}): Promise<MetaConversionResult | null> {
  try {
    const result = await sendCompleteRegistrationConversion(params);

    console.info("[Meta CAPI] CompleteRegistration processed.", {
      eventName: "CompleteRegistration",
      eventId: params.eventId,
      sourceUrl: normalizeSourceUrl(params.sourceUrl),
      result,
    });

    return result;
  } catch (error) {
    console.error("[Meta CAPI] CompleteRegistration failed.", {
      eventName: "CompleteRegistration",
      eventId: params.eventId,
      sourceUrl: normalizeSourceUrl(params.sourceUrl),
      error:
        error instanceof Error
          ? error.message
          : "Unknown Meta Conversions API error.",
    });

    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const bodyRecord = body as Record<string, unknown>;

  const payload: CampaignRegisterPayload = {
    name: getStringValue(bodyRecord, "name").trim(),
    email: getStringValue(bodyRecord, "email")
      .trim()
      .toLowerCase(),
    phone: getStringValue(bodyRecord, "phone").trim(),
    password: getStringValue(bodyRecord, "password"),
    eventId: getStringValue(bodyRecord, "eventId").trim(),
    sourceUrl:
      getStringValue(bodyRecord, "sourceUrl").trim() ||
      request.headers.get("referer") ||
      CALCULATOR_META_EVENT_SOURCE_URL,
  };

  const requiredFields: Array<
    keyof Omit<CampaignRegisterPayload, "sourceUrl">
  > = ["name", "email", "phone", "password", "eventId"];

  const missingFields = requiredFields.filter(
    (field) => !payload[field],
  );

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required field${
          missingFields.length > 1 ? "s" : ""
        }: ${missingFields.join(", ")}.`,
      },
      { status: 400 },
    );
  }

  if (!isValidEventId(payload.eventId)) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid Meta event ID.",
      },
      { status: 400 },
    );
  }

  let campaignResponse: Response;

  try {
    campaignResponse = await fetch(CAMPAIGN_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[Campaign Register] External API request failed.", {
      eventId: payload.eventId,
      error:
        error instanceof Error
          ? error.message
          : "Unknown campaign registration error.",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the campaign registration service.",
      },
      { status: 502 },
    );
  }

  const campaignData = await parseJsonSafely(campaignResponse);

  if (!campaignResponse.ok) {
    return NextResponse.json(
      {
        success: false,
        error: getUsefulMessage(
          campaignData,
          "Unable to create your campaign access.",
        ),
      },
      { status: campaignResponse.status },
    );
  }

  /*
   * Neste ponto, a conta foi criada com sucesso.
   *
   * O envio para a Meta é isolado para que uma indisponibilidade
   * da CAPI não transforme um cadastro válido em erro para o usuário.
   */
  const meta = await sendMetaConversionSafely({
    request,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    eventId: payload.eventId,
    sourceUrl: payload.sourceUrl,
  });

  const responseBody =
    campaignData &&
    typeof campaignData === "object" &&
    !Array.isArray(campaignData)
      ? {
          ...campaignData,
          metaTracking: {
            attempted: true,
            accepted: meta !== null,
          },
        }
      : {
          success: true,
          metaTracking: {
            attempted: true,
            accepted: meta !== null,
          },
        };

  return NextResponse.json(responseBody, {
    status: campaignResponse.status,
  });
}