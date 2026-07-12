import { NextRequest, NextResponse } from "next/server";
import {
  getClientIpFromHeaders,
  normalizeFormData,
  submitDynamicForm,
} from "@/lib/forms";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteContext = {
  params:
    | Promise<{
        slug?: string;
      }>
    | {
        slug?: string;
      };
};

async function resolveSlug(request: NextRequest, context: RouteContext) {
  const resolvedParams = await context.params;
  const slugFromParams = resolvedParams?.slug;

  if (slugFromParams) {
    return slugFromParams;
  }

  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/\/api\/forms\/([^/]+)\/submit/);

  return match?.[1] || null;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const slug = await resolveSlug(request, context);

  return NextResponse.json({
    success: true,
    message: "Form submit API is online.",
    slug,
  });
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const slug = await resolveSlug(request, context);

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing form slug.",
        },
        { status: 400 },
      );
    }

    const body = await request.json().catch(() => {
      return null;
    });

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

    const rawData =
      bodyRecord.data &&
      typeof bodyRecord.data === "object" &&
      !Array.isArray(bodyRecord.data)
        ? bodyRecord.data
        : bodyRecord;

    const data = normalizeFormData(rawData);

    const sourceUrl =
      typeof bodyRecord.source_url === "string"
        ? bodyRecord.source_url
        : request.headers.get("referer");

    const userAgent = request.headers.get("user-agent");
    const ipAddress = getClientIpFromHeaders(request.headers);

    const result = await submitDynamicForm({
      slug,
      data,
      sourceUrl,
      userAgent,
      ipAddress,
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("FORM_SUBMIT_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error submitting form.",
      },
      { status: 500 },
    );
  }
}
