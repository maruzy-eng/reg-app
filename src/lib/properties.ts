import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PropertyRow, PropertyWithMedia } from "@/types/property";

export async function getPublicProperties(): Promise<PropertyRow[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("visibility", "public")
    .in("status", ["available", "under_contract", "sold", "in_progress"])
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public properties:", error.message);
    return [];
  }

  return data || [];
}

export async function getPropertyBySlug(
  slug: string,
): Promise<PropertyWithMedia | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      property_images (*),
      property_videos (*),
      property_documents (*),
      property_features (*)
    `)
    .eq("slug", slug)
    .eq("visibility", "public")
    .in("status", ["available", "under_contract", "sold", "in_progress"])
    .single();

  if (error) {
    console.error("Error fetching property by slug:", error.message);
    return null;
  }

  return data as unknown as PropertyWithMedia;
}

export async function getAdminProperties(): Promise<PropertyRow[]> {
  noStore();

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin properties:", error.message);
    return [];
  }

  return data || [];
}

export async function getAdminPropertyById(
  id: string,
): Promise<PropertyWithMedia | null> {
  noStore();

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      property_images (*),
      property_videos (*),
      property_documents (*),
      property_features (*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching admin property by id:", error.message);
    return null;
  }

  return data as unknown as PropertyWithMedia;
}
