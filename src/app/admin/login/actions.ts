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

export async function loginAdminAction(formData: FormData) {
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");

  if (!email || !password) {
    redirect("/admin/login?error=invalid");
  }

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

      await setAdminSessionCookie({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      redirect("/admin/dashboard");
    }
  }

  const fallbackEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const fallbackPassword = process.env.ADMIN_PASSWORD;

  if (fallbackEmail && fallbackPassword) {
    if (email === fallbackEmail && password === fallbackPassword) {
      await setAdminSessionCookie({
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