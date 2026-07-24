"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
} from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyPassword } from "@/lib/password";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function hasAdminSessionSecret() {
  return Boolean(process.env.ADMIN_SESSION_SECRET?.trim());
}

async function establishAdminSession(payload: {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}) {
  if (!hasAdminSessionSecret()) {
    redirect("/admin/login?error=config");
  }

  try {
    await setAdminSessionCookie(payload);
  } catch (error) {
    console.error("Failed to create admin session cookie:", error);
    redirect("/admin/login?error=config");
  }
}

export async function loginAdminAction(formData: FormData) {
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=invalid");
  }

  if (!hasAdminSessionSecret()) {
    redirect("/admin/login?error=config");
  }

  try {
    const supabase = createAdminClient();

    const { data: user, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .eq("status", "active")
      .single();

    if (!error && user) {
      const userWithPassword = user as typeof user & {
        password_hash?: string | null;
      };

      const passwordIsValid = verifyPassword(
        password,
        userWithPassword.password_hash || null,
      );

      if (passwordIsValid) {
        await supabase
          .from("admin_users")
          .update({
            last_login_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        await establishAdminSession({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        });

        redirect("/admin/dashboard");
      }
    }
  } catch (error) {
    const digest =
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof error.digest === "string"
        ? error.digest
        : "";

    if (digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Admin login failed:", error);
    redirect("/admin/login?error=invalid");
  }

  const fallbackEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const fallbackPassword = process.env.ADMIN_PASSWORD;

  if (fallbackEmail && fallbackPassword) {
    if (email === fallbackEmail && password === fallbackPassword) {
      await establishAdminSession({
        id: "env-admin",
        email,
        name: "Environment Admin",
        role: "admin",
      });

      redirect("/admin/dashboard");
    }
  }

  redirect("/admin/login?error=invalid");
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();

  redirect("/admin/login");
}
