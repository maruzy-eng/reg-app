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
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid")?.trim();

    if (!fbclid) {
      return "";
    }

    return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    return "";
  }
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
  const fbc =
    getCookieValue(params.request, "_fbc") ||
    buildFbcFromFbclid(params.sourceUrl);

  return sendMetaConversionEvent({
    eventName: "CompleteRegistration",
    eventId: params.eventId,
    eventSourceUrl: params.sourceUrl || CALCULATOR_META_EVENT_SOURCE_URL,
    user: {
      email: params.email,
      phone: params.phone,
      firstName,
      lastName,
      clientIpAddress: getClientIpFromHeaders(params.request.headers),
      clientUserAgent: params.request.headers.get("user-agent"),
      fbp: getCookieValue(params.request, "_fbp") || undefined,
      fbc: fbc || undefined,
    },
    customData: {
      content_name: CALCULATOR_META_CONTENT_NAME,
      status: "completed",
    },
  });
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
    email: getStringValue(bodyRecord, "email").trim(),
    phone: getStringValue(bodyRecord, "phone").trim(),
    password: getStringValue(bodyRecord, "password"),
    eventId: getStringValue(bodyRecord, "eventId").trim(),
    sourceUrl:
      getStringValue(bodyRecord, "sourceUrl").trim() ||
      request.headers.get("referer") ||
      CALCULATOR_META_EVENT_SOURCE_URL,
  };

  const missingFields = Object.entries(payload)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required field${missingFields.length > 1 ? "s" : ""}: ${missingFields.join(
          ", ",
        )}.`,
      },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(CAMPAIGN_REGISTER_ENDPOINT, {
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

    const data = await parseJsonSafely(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: getUsefulMessage(
            data,
            "Unable to create your campaign access.",
          ),
        },
        { status: response.status },
      );
    }

    const meta = await sendCompleteRegistrationConversion({
      request,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      eventId: payload.eventId,
      sourceUrl: payload.sourceUrl,
    });

    const responseBody =
      data && typeof data === "object" && !Array.isArray(data)
        ? { ...data, meta }
        : { success: true, meta };

    return NextResponse.json(responseBody, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the campaign registration service.",
      },
      { status: 502 },
    );
  }
}
