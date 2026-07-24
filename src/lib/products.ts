import { unstable_noStore as noStore } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { REG_TABLES } from "@/lib/reg-tables";
import type { RegProduct } from "@/types/products";

export async function getPublishedProducts(): Promise<RegProduct[]> {
  noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.products)
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published products:", error.message);
    return [];
  }

  return (data || []) as RegProduct[];
}

export async function getPublishedProductBySlug(
  slug: string,
): Promise<RegProduct | null> {
  noStore();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.products)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Error fetching product by slug:", error.message);
    return null;
  }

  return (data as RegProduct | null) || null;
}
