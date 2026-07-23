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

const SUPPORTED_EVENTS = new Set(["CompleteRegistration", "Lead"]);

function getStringValue(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function getCookieValue(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value?.trim() || "";
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
  const eventName =
    getStringValue(bodyRecord, "event_name") || "CompleteRegistration";
  const eventId = getStringValue(bodyRecord, "event_id");
  const eventSourceUrl =
    getStringValue(bodyRecord, "event_source_url") ||
    request.headers.get("referer") ||
    CALCULATOR_META_EVENT_SOURCE_URL;

  if (!SUPPORTED_EVENTS.has(eventName)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unsupported Meta event.",
      },
      { status: 400 },
    );
  }

  if (!eventId) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing event_id.",
      },
      { status: 400 },
    );
  }

  const fullName = getStringValue(bodyRecord, "name");
  const splitName = splitFullName(fullName);
  const firstName =
    getStringValue(bodyRecord, "first_name") || splitName.firstName;
  const lastName =
    getStringValue(bodyRecord, "last_name") || splitName.lastName;

  const fbp =
    getStringValue(bodyRecord, "fbp") || getCookieValue(request, "_fbp");
  const fbc =
    getStringValue(bodyRecord, "fbc") || getCookieValue(request, "_fbc");

  const contentName =
    getStringValue(bodyRecord, "content_name") || CALCULATOR_META_CONTENT_NAME;
  const status = getStringValue(bodyRecord, "status") || "completed";
  const testEventCode = getStringValue(bodyRecord, "test_event_code");

  try {
    const result = await sendMetaConversionEvent({
      eventName: eventName as "CompleteRegistration" | "Lead",
      eventId,
      eventSourceUrl,
      user: {
        email: getStringValue(bodyRecord, "email") || undefined,
        phone: getStringValue(bodyRecord, "phone") || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        clientIpAddress: getClientIpFromHeaders(request.headers),
        clientUserAgent: request.headers.get("user-agent"),
        fbp: fbp || undefined,
        fbc: fbc || undefined,
      },
      customData:
        eventName === "CompleteRegistration"
          ? {
              content_name: contentName,
              status,
            }
          : undefined,
      testEventCode: testEventCode || undefined,
    });

    // Never fail the registration flow because of Meta issues.
    return NextResponse.json(
      {
        success: true,
        meta: result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("META_CONVERSIONS_ROUTE_ERROR", error);

    return NextResponse.json(
      {
        success: true,
        meta: {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Unexpected Meta Conversions API error.",
        },
      },
      { status: 200 },
    );
  }
}
