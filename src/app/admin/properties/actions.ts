"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { slugifyPropertyTitle } from "@/types/property";
import type { PropertyInsert, PropertyUpdate } from "@/types/property";

const allowedPropertyStatuses = [
  "draft",
  "available",
  "under_contract",
  "sold",
  "rented",
  "in_progress",
  "archived",
] as const;

type PropertyStatusValue = (typeof allowedPropertyStatuses)[number];

const PROPERTY_MEDIA_BUCKET =
  process.env.PROPERTY_MEDIA_BUCKET || "property-media";

const uploadLimits = {
  image: 10 * 1024 * 1024,
  video: 200 * 1024 * 1024,
  document: 50 * 1024 * 1024,
} as const;

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const allowedVideoTypes = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
]);

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

function getNullableCurrencyValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  if (!value) {
    return null;
  }

  // Currency masks use "." as thousand separator (e.g. $80.000).
  const normalizedValue = value.replace(/[^\d-]/g, "");
  const numberValue = Number(normalizedValue);

  if (!normalizedValue || Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function getBooleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getFileValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (value instanceof File && value.size > 0) {
    return value;
  }

  return null;
}

function getPropertyStatusValue(formData: FormData) {
  const status = getStringValue(formData, "status") || "draft";

  if (!allowedPropertyStatuses.includes(status as PropertyStatusValue)) {
    throw new Error("Invalid property status.");
  }

  return status as PropertyStatusValue;
}

function slugifyFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getFileExtension(fileName: string, fallback: string) {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";

  return extension ? extension.toLowerCase() : fallback;
}

function getStorageContentType(file: File, fallback: string) {
  return file.type || fallback;
}

function getPropertyEditPath(propertyId: string, query?: string) {
  const basePath = `/admin/properties/${propertyId}/edit`;

  if (!query) {
    return basePath;
  }

  return `${basePath}?${query}`;
}

function redirectToPropertyEditWithError(
  propertyId: string,
  errorCode:
    | "image_required"
    | "video_required"
    | "document_required"
    | "document_title_required",
) {
  redirect(getPropertyEditPath(propertyId, `media_error=${errorCode}`));
}

function assertAllowedUpload(
  file: File,
  mediaType: "image" | "video" | "document",
) {
  if (mediaType === "image") {
    if (file.size > uploadLimits.image) {
      throw new Error("Image files must be 10MB or smaller.");
    }

    if (!allowedImageTypes.has(file.type)) {
      throw new Error("Image upload must be JPG, PNG, WebP, GIF, or AVIF.");
    }

    return;
  }

  if (mediaType === "video") {
    if (file.size > uploadLimits.video) {
      throw new Error("Video files must be 200MB or smaller.");
    }

    if (!allowedVideoTypes.has(file.type)) {
      throw new Error("Video upload must be MP4, WebM, MOV, or M4V.");
    }

    return;
  }

  if (file.size > uploadLimits.document) {
    throw new Error("PDF files must be 50MB or smaller.");
  }

  const extension = getFileExtension(file.name, "pdf");

  if (file.type !== "application/pdf" && extension !== "pdf") {
    throw new Error("Document upload must be a PDF file.");
  }
}

async function ensurePropertyMediaBucket() {
  const supabase = createAdminClient();

  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Could not list storage buckets: ${listError.message}`);
  }

  const bucketExists = buckets.some(
    (bucket) => bucket.name === PROPERTY_MEDIA_BUCKET,
  );

  if (bucketExists) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    PROPERTY_MEDIA_BUCKET,
    {
      public: true,
    },
  );

  if (createError) {
    throw new Error(
      `Could not create storage bucket ${PROPERTY_MEDIA_BUCKET}: ${createError.message}`,
    );
  }
}

async function uploadPropertyMedia(params: {
  file: File;
  propertyId: string;
  mediaType: "image" | "video" | "document";
}) {
  assertAllowedUpload(params.file, params.mediaType);
  await ensurePropertyMediaBucket();

  const supabase = createAdminClient();

  const directory =
    params.mediaType === "image"
      ? "images"
      : params.mediaType === "video"
        ? "videos"
        : "documents";

  const fallbackExtension =
    params.mediaType === "image"
      ? "jpg"
      : params.mediaType === "video"
        ? "mp4"
        : "pdf";

  const fallbackContentType =
    params.mediaType === "image"
      ? "image/jpeg"
      : params.mediaType === "video"
        ? "video/mp4"
        : "application/pdf";

  const extension = getFileExtension(params.file.name, fallbackExtension);

  const safeOriginalName = slugifyFileName(
    params.file.name || `${params.mediaType}.${extension}`,
  );

  const filePath = `properties/${params.propertyId}/${directory}/${Date.now()}-${safeOriginalName}`;

  const buffer = Buffer.from(await params.file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .upload(filePath, buffer, {
      contentType: getStorageContentType(params.file, fallbackContentType),
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Could not upload file: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

function revalidatePropertyPaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/projects");
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
    status: getPropertyStatusValue(formData),
    visibility: getStringValue(formData, "visibility") || "public",
    address_line_1: addressLine1,
    address_line_2: getNullableStringValue(formData, "address_line_2"),
    city,
    state,
    zip_code: getNullableStringValue(formData, "zip_code"),
    country: getStringValue(formData, "country") || "USA",
    price: getNullableCurrencyValue(formData, "price"),
    purchase_price: getNullableCurrencyValue(formData, "purchase_price"),
    rehab_estimate: getNullableCurrencyValue(formData, "rehab_estimate"),
    projected_arv: getNullableCurrencyValue(formData, "projected_arv"),
    projected_rent: getNullableCurrencyValue(formData, "projected_rent"),
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
    cond_active: getBooleanValue(formData, "cond_active"),
    cond_number_of_houses: getNullableNumberValue(
      formData,
      "cond_number_of_houses",
    ),
    cond_listed_price: getNullableStringValue(formData, "cond_listed_price"),
    cond_avg_price: getNullableStringValue(formData, "cond_avg_price"),
    cond_sqft: getNullableNumberValue(formData, "cond_sqft"),
    cond_bedrooms: getNullableNumberValue(formData, "cond_bedrooms"),
    cond_bathrooms: getNullableNumberValue(formData, "cond_bathrooms"),
    credit_active: getBooleanValue(formData, "credit_active"),
    credit_old_price: getNullableCurrencyValue(formData, "credit_old_price"),
    credit_new_price: getNullableCurrencyValue(formData, "credit_new_price"),
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
    status: getPropertyStatusValue(formData),
    visibility: getStringValue(formData, "visibility") || "public",
    address_line_1: addressLine1,
    address_line_2: getNullableStringValue(formData, "address_line_2"),
    city,
    state,
    zip_code: getNullableStringValue(formData, "zip_code"),
    country: getStringValue(formData, "country") || "USA",
    price: getNullableCurrencyValue(formData, "price"),
    purchase_price: getNullableCurrencyValue(formData, "purchase_price"),
    rehab_estimate: getNullableCurrencyValue(formData, "rehab_estimate"),
    projected_arv: getNullableCurrencyValue(formData, "projected_arv"),
    projected_rent: getNullableCurrencyValue(formData, "projected_rent"),
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
    cond_active: getBooleanValue(formData, "cond_active"),
    cond_number_of_houses: getNullableNumberValue(
      formData,
      "cond_number_of_houses",
    ),
    cond_listed_price: getNullableStringValue(formData, "cond_listed_price"),
    cond_avg_price: getNullableStringValue(formData, "cond_avg_price"),
    cond_sqft: getNullableNumberValue(formData, "cond_sqft"),
    cond_bedrooms: getNullableNumberValue(formData, "cond_bedrooms"),
    cond_bathrooms: getNullableNumberValue(formData, "cond_bathrooms"),
    credit_active: getBooleanValue(formData, "credit_active"),
    credit_old_price: getNullableCurrencyValue(formData, "credit_old_price"),
    credit_new_price: getNullableCurrencyValue(formData, "credit_new_price"),
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
}

export async function addPropertyImageAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const imageFile = getFileValue(formData, "image_file");
  const manualImageUrl = getStringValue(formData, "image_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!imageFile && !manualImageUrl) {
    revalidatePropertyPaths(propertySlug);
    revalidatePath(getPropertyEditPath(propertyId));
    redirectToPropertyEditWithError(propertyId, "image_required");
  }

  const imageUrl = imageFile
    ? await uploadPropertyMedia({
        file: imageFile,
        propertyId,
        mediaType: "image",
      })
    : manualImageUrl;

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
    const { error: coverError } = await supabase
      .from("properties")
      .update({
        cover_image_url: imageUrl,
      })
      .eq("id", propertyId);

    if (coverError) {
      console.error("Error updating property cover:", coverError.message);
      throw new Error(coverError.message);
    }
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
}

export async function addPropertyVideoAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const videoFile = getFileValue(formData, "video_file");
  const manualVideoUrl = getStringValue(formData, "video_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!videoFile && !manualVideoUrl) {
    revalidatePropertyPaths(propertySlug);
    revalidatePath(getPropertyEditPath(propertyId));
    redirectToPropertyEditWithError(propertyId, "video_required");
  }

  const videoUrl = videoFile
    ? await uploadPropertyMedia({
        file: videoFile,
        propertyId,
        mediaType: "video",
      })
    : manualVideoUrl;

  const payload = {
    property_id: propertyId,
    title: getNullableStringValue(formData, "title"),
    description: getNullableStringValue(formData, "description"),
    video_url: videoUrl,
    provider: videoFile
      ? "uploaded"
      : getNullableStringValue(formData, "provider") || "direct",
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
}

export async function addPropertyDocumentAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const title = getStringValue(formData, "title");
  const documentFile = getFileValue(formData, "document_file");
  const manualFileUrl = getStringValue(formData, "file_url");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!title) {
    revalidatePropertyPaths(propertySlug);
    revalidatePath(getPropertyEditPath(propertyId));
    redirectToPropertyEditWithError(propertyId, "document_title_required");
  }

  if (!documentFile && !manualFileUrl) {
    revalidatePropertyPaths(propertySlug);
    revalidatePath(getPropertyEditPath(propertyId));
    redirectToPropertyEditWithError(propertyId, "document_required");
  }

  const fileUrl = documentFile
    ? await uploadPropertyMedia({
        file: documentFile,
        propertyId,
        mediaType: "document",
      })
    : manualFileUrl;

  const payload = {
    property_id: propertyId,
    title,
    description: getNullableStringValue(formData, "description"),
    file_url: fileUrl,
    file_type: documentFile
      ? documentFile.type || "application/pdf"
      : getNullableStringValue(formData, "file_type"),
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
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
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
}

export async function updatePropertyImagesOrderAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const rawImagesOrder = getStringValue(formData, "images_order");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!rawImagesOrder) {
    throw new Error("Images order payload is required.");
  }

  let imagesOrder: {
    id: string;
    position: number;
  }[] = [];

  try {
    imagesOrder = JSON.parse(rawImagesOrder);
  } catch {
    throw new Error("Invalid images order payload.");
  }

  if (!Array.isArray(imagesOrder)) {
    throw new Error("Images order must be an array.");
  }

  const validImagesOrder = imagesOrder
    .filter((item) => {
      return (
        item &&
        typeof item.id === "string" &&
        item.id.length > 0 &&
        Number.isFinite(Number(item.position))
      );
    })
    .map((item, index) => ({
      id: item.id,
      position: index + 1,
    }));

  if (validImagesOrder.length === 0) {
    throw new Error("No valid images were provided to reorder.");
  }

  for (const image of validImagesOrder) {
    const { error } = await supabase
      .from("property_images")
      .update({
        position: image.position,
      })
      .eq("id", image.id)
      .eq("property_id", propertyId);

    if (error) {
      console.error("Error updating property image order:", error.message);
      throw new Error(error.message);
    }
  }

  revalidatePropertyPaths(propertySlug);
  revalidatePath(getPropertyEditPath(propertyId));

  redirect(getPropertyEditPath(propertyId));
}