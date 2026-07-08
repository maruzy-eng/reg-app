import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_SESSION_COOKIE = "property_admin_session";

export type AdminSessionPayload = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
  createdAt: number;
};

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing environment variable: ADMIN_SESSION_SECRET");
  }

  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return crypto
    .createHmac("sha256", getAdminSessionSecret())
    .update(value)
    .digest("base64url");
}

export function createAdminSessionToken(payload: Omit<AdminSessionPayload, "createdAt">) {
  const sessionPayload: AdminSessionPayload = {
    ...payload,
    createdAt: Date.now(),
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(sessionPayload));
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
): AdminSessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);

  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;

    if (!payload.id || !payload.email || !payload.name || !payload.role) {
      return null;
    }

    const sessionAge = Date.now() - payload.createdAt;
    const sessionMaxAgeMs = SESSION_MAX_AGE_SECONDS * 1000;

    if (sessionAge > sessionMaxAgeMs) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function setAdminSessionCookie(
  payload: Omit<AdminSessionPayload, "createdAt">,
) {
  const cookieStore = await cookies();
  const token = createAdminSessionToken(payload);

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}