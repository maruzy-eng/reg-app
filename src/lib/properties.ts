import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  PropertyRow,
  PropertyStatus,
  PropertyWithMedia,
} from "@/types/property";

const publicPropertyStatuses: PropertyStatus[] = [
  "available",
  "under_contract",
  "sold",
  "rented",
  "in_progress",
];

const legacyPublicPropertyStatuses: PropertyStatus[] =
  publicPropertyStatuses.filter((status) => status !== "rented");

function isMissingRentedStatusError(error: { message?: string | null } | null) {
  return Boolean(
    error?.message?.includes(
      'invalid input value for enum property_status: "rented"',
    ),
  );
}

export async function getPublicProperties(): Promise<PropertyRow[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("visibility", "public")
    .in("status", publicPropertyStatuses)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingRentedStatusError(error)) {
      const { data: legacyData, error: legacyError } = await supabase
        .from("properties")
        .select("*")
        .eq("visibility", "public")
        .in("status", legacyPublicPropertyStatuses)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!legacyError) {
        return legacyData || [];
      }
    }

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
    .in("status", publicPropertyStatuses)
    .single();

  if (error) {
    if (isMissingRentedStatusError(error)) {
      const { data: legacyData, error: legacyError } = await supabase
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
        .in("status", legacyPublicPropertyStatuses)
        .single();

      if (!legacyError) {
        return legacyData as unknown as PropertyWithMedia;
      }
    }

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

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    console.error(
      "Error fetching admin property by id:",
      error?.message || "Property not found.",
    );
    return null;
  }

  const [imagesResult, videosResult, documentsResult, featuresResult] =
    await Promise.all([
      supabase
        .from("property_images")
        .select("*")
        .eq("property_id", id)
        .order("position", { ascending: true }),
      supabase
        .from("property_videos")
        .select("*")
        .eq("property_id", id)
        .order("position", { ascending: true }),
      supabase
        .from("property_documents")
        .select("*")
        .eq("property_id", id)
        .order("position", { ascending: true }),
      supabase
        .from("property_features")
        .select("*")
        .eq("property_id", id)
        .order("position", { ascending: true }),
    ]);

  if (imagesResult.error) {
    console.error("Error fetching property images:", imagesResult.error.message);
  }

  if (videosResult.error) {
    console.error("Error fetching property videos:", videosResult.error.message);
  }

  if (documentsResult.error) {
    console.error(
      "Error fetching property documents:",
      documentsResult.error.message,
    );
  }

  if (featuresResult.error) {
    console.error(
      "Error fetching property features:",
      featuresResult.error.message,
    );
  }

  return {
    ...property,
    property_images: imagesResult.data || [],
    property_videos: videosResult.data || [],
    property_documents: documentsResult.data || [],
    property_features: featuresResult.data || [],
  } as unknown as PropertyWithMedia;
}
