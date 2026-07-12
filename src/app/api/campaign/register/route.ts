import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CAMPAIGN_REGISTER_ENDPOINT =
  "https://api.checkmateproperty.com/api/auth/register/campaign";

type CampaignRegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
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
      body: JSON.stringify(payload),
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

    return NextResponse.json(data ?? { success: true }, {
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
