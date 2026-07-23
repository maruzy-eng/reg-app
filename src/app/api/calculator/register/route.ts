import { randomUUID } from "crypto";
import { after, NextRequest, NextResponse } from "next/server";
import {
  getClientIpFromHeaders,
  submitDynamicForm,
} from "@/lib/forms";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
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

function getStringValue(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
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

function normalizeEventId(value: string) {
  if (value && /^[a-zA-Z0-9_-]{8,128}$/.test(value)) {
    return value;
  }
  return randomUUID();
}

async function parseJsonSafely(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { success: false, error: text };
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

async function persistCalculatorSubmission(params: {
  name: string;
  email: string;
  phone: string;
  sourceUrl: string;
  userAgent: string | null;
  ipAddress: string | null;
}) {
  try {
    const calculatorForm = await getPublishedFormByPageKey("calculator");

    if (!calculatorForm.form?.slug) {
      return;
    }

    await submitDynamicForm({
      slug: calculatorForm.form.slug,
      data: {
        name: params.name,
        email: params.email,
        phone: params.phone,
        password: "[redacted]",
        signup_source: "calculator_page",
      },
      sourceUrl: params.sourceUrl,
      userAgent: params.userAgent,
      ipAddress: params.ipAddress,
    });
  } catch (error) {
    console.error("[Calculator Register] Local form submission failed.", error);
  }
}

async function sendCalculatorMetaConversion(params: {
  name: string;
  email: string;
  phone: string;
  eventId: string;
  fbp?: string;
  fbc?: string;
  userAgent: string | null;
  ipAddress: string | null;
}) {
  const { firstName, lastName } = splitFullName(params.name);

  try {
    const meta = await sendMetaConversionEvent({
      eventName: "CompleteRegistration",
      eventId: params.eventId,
      eventSourceUrl: CALCULATOR_META_EVENT_SOURCE_URL,
      user: {
        email: params.email,
        phone: params.phone,
        firstName,
        lastName,
        clientIpAddress: params.ipAddress,
        clientUserAgent: params.userAgent,
        fbp: params.fbp || undefined,
        fbc: params.fbc || undefined,
      },
      customData: {
        content_name: CALCULATOR_META_CONTENT_NAME,
        status: "completed",
      },
    });

    console.info("[Calculator Register] Meta CAPI CompleteRegistration.", {
      eventId: params.eventId,
      meta,
    });
  } catch (error) {
    console.error("[Calculator Register] Meta CAPI failed.", {
      eventId: params.eventId,
      error: error instanceof Error ? error.message : error,
    });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const bodyRecord = body as Record<string, unknown>;
  const name = getStringValue(bodyRecord, "name");
  const email = getStringValue(bodyRecord, "email").toLowerCase();
  const phone = getStringValue(bodyRecord, "phone");
  const password = getStringValue(bodyRecord, "password");
  const eventId = normalizeEventId(getStringValue(bodyRecord, "event_id"));
  const sourceUrl =
    getStringValue(bodyRecord, "source_url") ||
    request.headers.get("referer") ||
    CALCULATOR_META_EVENT_SOURCE_URL;
  const fbp =
    getStringValue(bodyRecord, "fbp") || getCookieValue(request, "_fbp");
  const fbc =
    getStringValue(bodyRecord, "fbc") ||
    getCookieValue(request, "_fbc") ||
    buildFbcFromFbclid(sourceUrl);
  const userAgent = request.headers.get("user-agent");
  const ipAddress = getClientIpFromHeaders(request.headers);

  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  }
  if (!email) {
    fieldErrors.email = "Email is required.";
  }
  if (!phone) {
    fieldErrors.phone = "Phone is required.";
  }
  if (!password) {
    fieldErrors.password = "Password is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Complete the required fields to continue.",
        fieldErrors,
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
      body: JSON.stringify({ name, email, phone, password }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("[Calculator Register] External API unreachable.", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to reach the registration service.",
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
          "Unable to create your account.",
        ),
      },
      { status: campaignResponse.status },
    );
  }

  const campaignRecord =
    campaignData &&
    typeof campaignData === "object" &&
    !Array.isArray(campaignData)
      ? (campaignData as Record<string, unknown>)
      : null;

  const campaignTokens =
    campaignRecord?.data &&
    typeof campaignRecord.data === "object" &&
    !Array.isArray(campaignRecord.data)
      ? (campaignRecord.data as Record<string, unknown>)
      : null;

  const accessToken =
    typeof campaignTokens?.accessToken === "string"
      ? campaignTokens.accessToken
      : "";
  const refreshToken =
    typeof campaignTokens?.refreshToken === "string"
      ? campaignTokens.refreshToken
      : "";
  const idToken =
    typeof campaignTokens?.idToken === "string" ? campaignTokens.idToken : "";
  const expiresIn = campaignTokens?.expiresIn;

  if (!accessToken || !refreshToken || !idToken || expiresIn == null) {
    return NextResponse.json(
      {
        success: false,
        error: "Account created, but login tokens were not returned.",
      },
      { status: 502 },
    );
  }

  // Return immediately after account creation. Heavy work continues in background.
  after(async () => {
    await Promise.allSettled([
      persistCalculatorSubmission({
        name,
        email,
        phone,
        sourceUrl,
        userAgent,
        ipAddress,
      }),
      sendCalculatorMetaConversion({
        name,
        email,
        phone,
        eventId,
        fbp: fbp || undefined,
        fbc: fbc || undefined,
        userAgent,
        ipAddress,
      }),
    ]);
  });

  return NextResponse.json({
    success: true,
    event_id: eventId,
    event_name: "CompleteRegistration",
    data: {
      accessToken,
      refreshToken,
      idToken,
      expiresIn,
    },
    metaTracking: {
      attempted: true,
      deferred: true,
    },
    message:
      "Your account was created successfully. You can start using the Free Flip Calculator.",
  });
}
