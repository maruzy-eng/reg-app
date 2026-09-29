import { NextRequest, NextResponse } from "next/server";
import { BLUEPRINT_VSL_EVENT_TYPES } from "@/lib/blueprint-vsl/analytics";
import { getClientIpFromHeaders } from "@/lib/forms";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isValidEventType(value: unknown) {
  return (
    typeof value === "string" &&
    BLUEPRINT_VSL_EVENT_TYPES.includes(
      value as (typeof BLUEPRINT_VSL_EVENT_TYPES)[number],
    )
  );
}

function getStringValue(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const eventType = payload.event_type;
    const sessionId = getStringValue(payload.session_id, 160);

    if (!isValidEventType(eventType) || !sessionId) {
      return NextResponse.json(
        { success: false, error: "Invalid event payload." },
        { status: 400 },
      );
    }

    const metadata =
      payload.metadata &&
      typeof payload.metadata === "object" &&
      !Array.isArray(payload.metadata)
        ? payload.metadata
        : {};

    const supabase = createAdminClient() as unknown as {
      from: (table: string) => {
        insert: (value: Record<string, unknown>) => Promise<{
          error: { message?: string } | null;
        }>;
      };
    };

    const { error } = await supabase.from("reg_blueprint_vsl_events").insert({
      event_type: eventType,
      session_id: sessionId,
      visitor_id: getStringValue(payload.visitor_id, 160),
      page_path: getStringValue(payload.page_path, 240) || "/blueprint-vsl",
      video_id: getStringValue(payload.video_id, 80),
      metadata,
      referrer:
        getStringValue(payload.referrer, 1000) ||
        request.headers.get("referer"),
      user_agent: request.headers.get("user-agent"),
      ip_address: getClientIpFromHeaders(request.headers),
    });

    if (error) {
      console.error("BLUEPRINT_VSL_EVENT_INSERT_ERROR", error.message);

      return NextResponse.json(
        { success: false, error: "Event not recorded." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BLUEPRINT_VSL_EVENT_ERROR", error);

    return NextResponse.json(
      { success: false, error: "Unexpected event error." },
      { status: 500 },
    );
  }
}
