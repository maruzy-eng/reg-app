import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIpFromHeaders } from "@/lib/forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AssistantLeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as AssistantLeadBody | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const source = String(body.source || "site-assistant").trim();
    const message = String(body.message || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name.", field: "name" },
        { status: 400 },
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email.",
          field: "email",
        },
        { status: 400 },
      );
    }

    if (!phone || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid phone number.",
          field: "phone",
        },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      status: "new",
      source,
      message:
        message ||
        "Lead captured through the site assistant (name, email, phone).",
      ip_address: getClientIpFromHeaders(request.headers),
      user_agent: request.headers.get("user-agent"),
    });

    if (error) {
      console.error("ASSISTANT_LEAD_ERROR", error);
      return NextResponse.json(
        { success: false, error: "Unable to save your contact right now." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ASSISTANT_LEAD_UNEXPECTED", error);

    return NextResponse.json(
      { success: false, error: "Unexpected error." },
      { status: 500 },
    );
  }
}
