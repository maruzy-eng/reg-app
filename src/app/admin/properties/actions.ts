"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { slugifyPropertyTitle } from "@/types/property";
import type { PropertyInsert, PropertyUpdate } from "@/types/property";

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

function getNullableNumberValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  if (!value) {
    return null;
  }

  const normalizedValue = value.replace(/,/g, "");
  const numberValue = Number(normalizedValue);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function revalidatePropertyPaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/properties");

  if (slug) {
    revalidatePath(`/properties/${slug}`);
  }
}

export async function createPropertyAction(formData: FormData) {
  await requireAdminPermission("properties.create");

  const supabase = createAdminClient();

  const title = getStringValue(formData, "title");
  const customSlug = getStringValue(formData, "slug");
  const addressLine1 = getStringValue(formData, "address_line_1");
  const city = getStringValue(formData, "city");
  const state = getStringValue(formData, "state");

  if (!title) {
    throw new Error("Property title is required.");
  }

  if (!addressLine1) {
    throw new Error("Address is required.");
  }

  if (!city) {
    throw new Error("City is required.");
  }

  if (!state) {
    throw new Error("State is required.");
  }

  const slug =
    customSlug || slugifyPropertyTitle(`${addressLine1}-${city}-${state}`);

  const payload: PropertyInsert = {
    title,
    slug,

    short_description: getNullableStringValue(formData, "short_description"),
    description: getNullableStringValue(formData, "description"),

    property_type: getStringValue(
      formData,
      "property_type",
    ) as PropertyInsert["property_type"],

    status: getStringValue(formData, "status") as PropertyInsert["status"],
    visibility: getStringValue(formData, "visibility") || "public",

    address_line_1: addressLine1,
    address_line_2: getNullableStringValue(formData, "address_line_2"),
    city,
    state,
    zip_code: getNullableStringValue(formData, "zip_code"),
    country: getStringValue(formData, "country") || "USA",

    price: getNullableNumberValue(formData, "price"),
    purchase_price: getNullableNumberValue(formData, "purchase_price"),
    rehab_estimate: getNullableNumberValue(formData, "rehab_estimate"),
    projected_arv: getNullableNumberValue(formData, "projected_arv"),
    projected_rent: getNullableNumberValue(formData, "projected_rent"),
    projected_roi: getNullableNumberValue(formData, "projected_roi"),

    bedrooms: getNullableNumberValue(formData, "bedrooms"),
    bathrooms: getNullableNumberValue(formData, "bathrooms"),
    sqft: getNullableNumberValue(formData, "sqft"),
    lot_size_sqft: getNullableNumberValue(formData, "lot_size_sqft"),
    year_built: getNullableNumberValue(formData, "year_built"),

    garage_spaces: getNullableNumberValue(formData, "garage_spaces"),
    parking_spaces: getNullableNumberValue(formData, "parking_spaces"),
    stories: getNullableNumberValue(formData, "stories"),
    neighborhood: getNullableStringValue(formData, "neighborhood"),
    county: getNullableStringValue(formData, "county"),
    mls_number: getNullableStringValue(formData, "mls_number"),

    cover_image_url: getNullableStringValue(formData, "cover_image_url"),
    video_url: getNullableStringValue(formData, "video_url"),
    virtual_tour_url: getNullableStringValue(formData, "virtual_tour_url"),

    contact_cta_title: getNullableStringValue(formData, "contact_cta_title"),
    contact_cta_description: getNullableStringValue(
      formData,
      "contact_cta_description",
    ),
    contact_button_label: getNullableStringValue(
      formData,
      "contact_button_label",
    ),
    contact_phone: getNullableStringValue(formData, "contact_phone"),
    contact_email: getNullableStringValue(formData, "contact_email"),

    is_featured: getBooleanValue(formData, "is_featured"),

    published_at: getBooleanValue(formData, "publish_now")
      ? new Date().toISOString()
      : null,

    meta_title: getNullableStringValue(formData, "meta_title"),
    meta_description: getNullableStringValue(formData, "meta_description"),
  };

  const { error } = await supabase.from("properties").insert(payload);

  if (error) {
    console.error("Error creating property:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(slug);

  redirect("/admin/properties");
}

export async function updatePropertyAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const title = getStringValue(formData, "title");
  const customSlug = getStringValue(formData, "slug");
  const addressLine1 = getStringValue(formData, "address_line_1");
  const city = getStringValue(formData, "city");
  const state = getStringValue(formData, "state");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!title) {
    throw new Error("Property title is required.");
  }

  if (!customSlug) {
    throw new Error("Slug is required.");
  }

  if (!addressLine1) {
    throw new Error("Address is required.");
  }

  if (!city) {
    throw new Error("City is required.");
  }

  if (!state) {
    throw new Error("State is required.");
  }

  const payload: PropertyUpdate = {
    title,
    slug: customSlug,

    short_description: getNullableStringValue(formData, "short_description"),
    description: getNullableStringValue(formData, "description"),

    property_type: getStringValue(
      formData,
      "property_type",
    ) as PropertyUpdate["property_type"],

    status: getStringValue(formData, "status") as PropertyUpdate["status"],
    visibility: getStringValue(formData, "visibility") || "public",

    address_line_1: addressLine1,
    address_line_2: getNullableStringValue(formData, "address_line_2"),
    city,
    state,
    zip_code: getNullableStringValue(formData, "zip_code"),
    country: getStringValue(formData, "country") || "USA",

    price: getNullableNumberValue(formData, "price"),
    purchase_price: getNullableNumberValue(formData, "purchase_price"),
    rehab_estimate: getNullableNumberValue(formData, "rehab_estimate"),
    projected_arv: getNullableNumberValue(formData, "projected_arv"),
    projected_rent: getNullableNumberValue(formData, "projected_rent"),
    projected_roi: getNullableNumberValue(formData, "projected_roi"),

    bedrooms: getNullableNumberValue(formData, "bedrooms"),
    bathrooms: getNullableNumberValue(formData, "bathrooms"),
    sqft: getNullableNumberValue(formData, "sqft"),
    lot_size_sqft: getNullableNumberValue(formData, "lot_size_sqft"),
    year_built: getNullableNumberValue(formData, "year_built"),

    garage_spaces: getNullableNumberValue(formData, "garage_spaces"),
    parking_spaces: getNullableNumberValue(formData, "parking_spaces"),
    stories: getNullableNumberValue(formData, "stories"),
    neighborhood: getNullableStringValue(formData, "neighborhood"),
    county: getNullableStringValue(formData, "county"),
    mls_number: getNullableStringValue(formData, "mls_number"),

    cover_image_url: getNullableStringValue(formData, "cover_image_url"),
    video_url: getNullableStringValue(formData, "video_url"),
    virtual_tour_url: getNullableStringValue(formData, "virtual_tour_url"),

    contact_cta_title: getNullableStringValue(formData, "contact_cta_title"),
    contact_cta_description: getNullableStringValue(
      formData,
      "contact_cta_description",
    ),
    contact_button_label: getNullableStringValue(
      formData,
      "contact_button_label",
    ),
    contact_phone: getNullableStringValue(formData, "contact_phone"),
    contact_email: getNullableStringValue(formData, "contact_email"),

    is_featured: getBooleanValue(formData, "is_featured"),

    published_at: getBooleanValue(formData, "publish_now")
      ? new Date().toISOString()
      : getNullableStringValue(formData, "current_published_at"),

    meta_title: getNullableStringValue(formData, "meta_title"),
    meta_description: getNullableStringValue(formData, "meta_description"),
  };

  const { error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", propertyId);

  if (error) {
    console.error("Error updating property:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(customSlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function addPropertyImageAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const imageUrl = getStringValue(formData, "image_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!imageUrl) {
    throw new Error("Image URL is required.");
  }

  const payload = {
    property_id: propertyId,
    image_url: imageUrl,
    title: getNullableStringValue(formData, "title"),
    alt_text: getNullableStringValue(formData, "alt_text"),
    caption: getNullableStringValue(formData, "caption"),
    media_group: getStringValue(formData, "media_group") || "gallery",
    position: getNullableNumberValue(formData, "position") || 0,
    is_cover: getBooleanValue(formData, "is_cover"),
  };

  const { error } = await supabase.from("property_images").insert(payload);

  if (error) {
    console.error("Error adding property image:", error.message);
    throw new Error(error.message);
  }

  if (payload.is_cover) {
    await supabase
      .from("properties")
      .update({
        cover_image_url: imageUrl,
      })
      .eq("id", propertyId);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function addPropertyVideoAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const videoUrl = getStringValue(formData, "video_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!videoUrl) {
    throw new Error("Video URL is required.");
  }

  const payload = {
    property_id: propertyId,
    title: getNullableStringValue(formData, "title"),
    description: getNullableStringValue(formData, "description"),
    video_url: videoUrl,
    provider: getNullableStringValue(formData, "provider"),
    thumbnail_url: getNullableStringValue(formData, "thumbnail_url"),
    duration_seconds: getNullableNumberValue(formData, "duration_seconds"),
    video_type: getStringValue(formData, "video_type") || "property_video",
    position: getNullableNumberValue(formData, "position") || 0,
    is_featured: getBooleanValue(formData, "is_featured"),
  };

  const { error } = await supabase.from("property_videos").insert(payload);

  if (error) {
    console.error("Error adding property video:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function addPropertyDocumentAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const title = getStringValue(formData, "title");
  const fileUrl = getStringValue(formData, "file_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!title) {
    throw new Error("Document title is required.");
  }

  if (!fileUrl) {
    throw new Error("File URL is required.");
  }

  const payload = {
    property_id: propertyId,
    title,
    description: getNullableStringValue(formData, "description"),
    file_url: fileUrl,
    file_type: getNullableStringValue(formData, "file_type"),
    document_type: getStringValue(formData, "document_type") || "floor_plan",
    button_label: getStringValue(formData, "button_label") || "View PDF",
    position: getNullableNumberValue(formData, "position") || 0,
    is_public: getBooleanValue(formData, "is_public"),
  };

  const { error } = await supabase.from("property_documents").insert(payload);

  if (error) {
    console.error("Error adding property document:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function addPropertyFeatureAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const label = getStringValue(formData, "label");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!label) {
    throw new Error("Feature label is required.");
  }

  const payload = {
    property_id: propertyId,
    label,
    value: getNullableStringValue(formData, "value"),
    icon: getNullableStringValue(formData, "icon"),
    position: getNullableNumberValue(formData, "position") || 0,
    is_highlight: getBooleanValue(formData, "is_highlight"),
  };

  const { error } = await supabase.from("property_features").insert(payload);

  if (error) {
    console.error("Error adding property feature:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function deletePropertyImageAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const imageId = getStringValue(formData, "image_id");

  if (!imageId) {
    throw new Error("Image ID is required.");
  }

  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    console.error("Error deleting property image:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function deletePropertyVideoAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const videoId = getStringValue(formData, "video_id");

  if (!videoId) {
    throw new Error("Video ID is required.");
  }

  const { error } = await supabase
    .from("property_videos")
    .delete()
    .eq("id", videoId);

  if (error) {
    console.error("Error deleting property video:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function deletePropertyDocumentAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const documentId = getStringValue(formData, "document_id");

  if (!documentId) {
    throw new Error("Document ID is required.");
  }

  const { error } = await supabase
    .from("property_documents")
    .delete()
    .eq("id", documentId);

  if (error) {
    console.error("Error deleting property document:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}

export async function deletePropertyFeatureAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const featureId = getStringValue(formData, "feature_id");

  if (!featureId) {
    throw new Error("Feature ID is required.");
  }

  const { error } = await supabase
    .from("property_features")
    .delete()
    .eq("id", featureId);

  if (error) {
    console.error("Error deleting property feature:", error.message);
    throw new Error(error.message);
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(`/admin/properties/${propertyId}/edit`);

  redirect(`/admin/properties/${propertyId}/edit`);
}