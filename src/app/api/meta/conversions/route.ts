import { NextRequest, NextResponse } from "next/server";
import { getClientIpFromHeaders } from "@/lib/forms";
import { sendMetaLeadEvent } from "@/lib/meta-conversions";
import { splitFullName } from "@/lib/meta-normalize";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  const eventName = getStringValue(bodyRecord, "event_name") || "Lead";
  const eventId = getStringValue(bodyRecord, "event_id");
  const eventSourceUrl =
    getStringValue(bodyRecord, "event_source_url") ||
    request.headers.get("referer") ||
    "";

  if (eventName !== "Lead") {
    return NextResponse.json(
      {
        success: false,
        error: "Only Lead events are supported.",
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

  if (!eventSourceUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing event_source_url.",
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

  try {
    const result = await sendMetaLeadEvent({
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
    });

    // Never fail the lead flow because of Meta issues.
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
