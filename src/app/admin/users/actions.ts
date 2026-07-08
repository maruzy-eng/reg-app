"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashPassword } from "@/lib/password";
import { requireAdminPermission } from "@/lib/admin-permissions";
import type { Database } from "@/types/database";

type AdminRole = Database["public"]["Enums"]["admin_role"];

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getNullableStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  if (!value) {
    return null;
  }

  return value;
}

export async function createAdminUserAction(formData: FormData) {
  await requireAdminPermission("users.create");

  const supabase = createAdminClient();

  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");
  const role = getStringValue(formData, "role") as AdminRole;
  const status = getStringValue(formData, "status") || "active";
  const avatarUrl = getNullableStringValue(formData, "avatar_url");

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  if (!role) {
    throw new Error("Role is required.");
  }

  const insertPayload = {
    name,
    email,
    password_hash: hashPassword(password),
    role,
    status,
    avatar_url: avatarUrl,
  };

  const { error } = await supabase
    .from("admin_users")
    .insert(insertPayload as never);

  if (error) {
    console.error("Error creating admin user:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");

  redirect("/admin/users");
}

export async function updateAdminUserAction(formData: FormData) {
  await requireAdminPermission("users.update");

  const supabase = createAdminClient();

  const userId = getStringValue(formData, "user_id");
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");
  const role = getStringValue(formData, "role") as AdminRole;
  const status = getStringValue(formData, "status") || "active";
  const avatarUrl = getNullableStringValue(formData, "avatar_url");

  if (!userId) {
    throw new Error("User ID is required.");
  }

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email) {
    throw new Error("Email is required.");
  }

  if (!role) {
    throw new Error("Role is required.");
  }

  const updatePayload: Record<string, unknown> = {
    name,
    email,
    role,
    status,
    avatar_url: avatarUrl,
  };

  if (password) {
    updatePayload.password_hash = hashPassword(password);
  }

  const { error } = await supabase
    .from("admin_users")
    .update(updatePayload as never)
    .eq("id", userId);

  if (error) {
    console.error("Error updating admin user:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}/edit`);

  redirect("/admin/users");
}

export async function deleteAdminUserAction(formData: FormData) {
  await requireAdminPermission("users.delete");

  const supabase = createAdminClient();

  const userId = getStringValue(formData, "user_id");

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const { error } = await supabase
    .from("admin_users")
    .delete()
    .eq("id", userId);

  if (error) {
    console.error("Error deleting admin user:", error.message);
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");
}