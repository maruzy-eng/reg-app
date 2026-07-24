import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminPermission } from "@/lib/admin-permissions";
import { createAdminClient } from "@/lib/supabase/admin";
import { REG_TABLES } from "@/lib/reg-tables";
import {
  slugifyPostTitle,
  type RegPost,
  type RegPostStatus,
} from "@/types/news";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseStatus(value: string): RegPostStatus {
  if (value === "published" || value === "archived" || value === "draft") {
    return value;
  }

  return "draft";
}

export async function getAdminPosts(): Promise<RegPost[]> {
  await requireAdminPermission("news.read");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.posts)
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as RegPost[];
}

export async function getAdminPostById(id: string): Promise<RegPost | null> {
  await requireAdminPermission("news.read");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.posts)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as RegPost | null) || null;
}

function buildPostPayload(formData: FormData) {
  const title = getStringValue(formData, "title");
  const slugInput = getStringValue(formData, "slug");
  const status = parseStatus(getStringValue(formData, "status"));
  const publishedAtInput = getStringValue(formData, "published_at");

  if (!title) {
    throw new Error("Title is required.");
  }

  const slug = slugInput || slugifyPostTitle(title);

  if (!slug) {
    throw new Error("Slug is required.");
  }

  const publishedAt =
    status === "published"
      ? publishedAtInput
        ? new Date(publishedAtInput).toISOString()
        : new Date().toISOString()
      : publishedAtInput
        ? new Date(publishedAtInput).toISOString()
        : null;

  return {
    title,
    slug,
    excerpt: getStringValue(formData, "excerpt") || null,
    content_html: getStringValue(formData, "content_html") || "",
    cover_image_url: getStringValue(formData, "cover_image_url") || null,
    status,
    published_at: publishedAt,
    author_name: getStringValue(formData, "author_name") || "Checkmate REG",
    category: getStringValue(formData, "category") || null,
    tags: parseTags(getStringValue(formData, "tags")),
    meta_title: getStringValue(formData, "meta_title") || null,
    meta_description: getStringValue(formData, "meta_description") || null,
    sort_order: Number(getStringValue(formData, "sort_order") || "0") || 0,
  };
}

export async function createAdminPostAction(formData: FormData) {
  "use server";

  await requireAdminPermission("news.create");
  const supabase = createAdminClient();
  const payload = buildPostPayload(formData);

  const { data, error } = await supabase
    .from(REG_TABLES.posts)
    .insert(payload)
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Unable to create post.");
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
  redirect(`/admin/news/${data.id}/edit`);
}

export async function updateAdminPostAction(formData: FormData) {
  "use server";

  await requireAdminPermission("news.update");
  const supabase = createAdminClient();
  const id = getStringValue(formData, "id");

  if (!id) {
    throw new Error("Missing post id.");
  }

  const payload = buildPostPayload(formData);

  const { error } = await supabase
    .from(REG_TABLES.posts)
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/news");
  revalidatePath(`/news/${payload.slug}`);
  revalidatePath("/admin/news");
  revalidatePath(`/admin/news/${id}/edit`);
  redirect(`/admin/news/${id}/edit?saved=1`);
}

export async function deleteAdminPostAction(formData: FormData) {
  "use server";

  await requireAdminPermission("news.delete");
  const supabase = createAdminClient();
  const id = getStringValue(formData, "id");

  if (!id) {
    throw new Error("Missing post id.");
  }

  const { error } = await supabase.from(REG_TABLES.posts).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/news");
  revalidatePath("/admin/news");
  redirect("/admin/news");
}
