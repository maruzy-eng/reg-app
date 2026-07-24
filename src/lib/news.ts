import { unstable_noStore as noStore } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { REG_TABLES } from "@/lib/reg-tables";
import type { RegPost } from "@/types/news";

export async function getPublishedPosts(): Promise<RegPost[]> {
  noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.posts)
    .select("*")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching published posts:", error.message);
    return [];
  }

  return (data || []) as RegPost[];
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<RegPost | null> {
  noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.posts)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error("Error fetching post by slug:", error.message);
    return null;
  }

  return (data as RegPost | null) || null;
}

export async function getRelatedPublishedPosts(params: {
  slug: string;
  category?: string | null;
  limit?: number;
}): Promise<RegPost[]> {
  noStore();
  const supabase = createAdminClient();
  const limit = params.limit ?? 3;

  let query = supabase
    .from(REG_TABLES.posts)
    .select("*")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .neq("slug", params.slug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (params.category) {
    query = query.eq("category", params.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching related posts:", error.message);
    return [];
  }

  return (data || []) as RegPost[];
}
