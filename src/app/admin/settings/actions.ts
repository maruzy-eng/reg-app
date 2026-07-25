"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  DEFAULT_SITE_SETTINGS,
  upsertSiteSettings,
  type SiteSettingsValue,
} from "@/lib/site-settings";

const SITE_ASSETS_BUCKET = process.env.SITE_ASSETS_BUCKET || "site-assets";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getOptionalStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  return value || "";
}

function slugifyFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getFileExtension(fileName: string, fallback = "png") {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";

  return extension ? extension.toLowerCase() : fallback;
}

function getContentTypeFromExtension(extension: string) {
  const types: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
  };

  return types[extension] || "application/octet-stream";
}

async function ensureSiteAssetsBucket() {
  const supabase = createAdminClient();

  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Could not list storage buckets: ${listError.message}`);
  }

  const bucketExists = buckets.some(
    (bucket) => bucket.name === SITE_ASSETS_BUCKET,
  );

  if (bucketExists) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    SITE_ASSETS_BUCKET,
    {
      public: true,
    },
  );

  if (createError) {
    throw new Error(
      `Could not create storage bucket ${SITE_ASSETS_BUCKET}: ${createError.message}`,
    );
  }
}

async function uploadSiteAsset(file: File | null, assetType: "logo" | "favicon") {
  if (!file || file.size === 0) {
    return "";
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/x-icon",
    "image/vnd.microsoft.icon",
  ];

  if (file.type && !allowedTypes.includes(file.type)) {
    throw new Error(
      `${assetType === "logo" ? "Logo" : "Favicon"} must be an image file.`,
    );
  }

  await ensureSiteAssetsBucket();

  const supabase = createAdminClient();

  const extension = getFileExtension(file.name, assetType === "favicon" ? "ico" : "png");
  const safeOriginalName = slugifyFileName(file.name || `${assetType}.${extension}`);
  const filePath = `branding/${assetType}-${Date.now()}-${safeOriginalName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type || getContentTypeFromExtension(extension),
      upsert: true,
    });

  if (uploadError) {
    throw new Error(
      `Could not upload ${assetType === "logo" ? "logo" : "favicon"}: ${uploadError.message}`,
    );
  }

  const { data } = supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdminPermission("settings.update");

  const currentLogoUrl = getOptionalStringValue(formData, "current_logo_url");
  const currentFaviconUrl = getOptionalStringValue(
    formData,
    "current_favicon_url",
  );

  const logoUrlManual = getOptionalStringValue(formData, "logo_url");
  const faviconUrlManual = getOptionalStringValue(formData, "favicon_url");

  const logoFileValue = formData.get("logo_file");
  const faviconFileValue = formData.get("favicon_file");

  const logoFile = logoFileValue instanceof File ? logoFileValue : null;
  const faviconFile =
    faviconFileValue instanceof File ? faviconFileValue : null;

  let uploadedLogoUrl = "";
  let uploadedFaviconUrl = "";

  try {
    uploadedLogoUrl = await uploadSiteAsset(logoFile, "logo");
    uploadedFaviconUrl = await uploadSiteAsset(faviconFile, "favicon");
  } catch (error) {
    console.error("Settings asset upload failed:", error);
    redirect("/admin/settings?error=asset-upload-failed");
  }

  const settings: SiteSettingsValue = {
    site_name:
      getOptionalStringValue(formData, "site_name") ||
      DEFAULT_SITE_SETTINGS.site_name,

    site_tagline:
      getOptionalStringValue(formData, "site_tagline") ||
      DEFAULT_SITE_SETTINGS.site_tagline,

    site_description:
      getOptionalStringValue(formData, "site_description") ||
      DEFAULT_SITE_SETTINGS.site_description,

    logo_url: uploadedLogoUrl || logoUrlManual || currentLogoUrl || "",

    favicon_url:
      uploadedFaviconUrl || faviconUrlManual || currentFaviconUrl || "",

    primary_phone:
      getOptionalStringValue(formData, "primary_phone") ||
      DEFAULT_SITE_SETTINGS.primary_phone,

    primary_email:
      getOptionalStringValue(formData, "primary_email") ||
      DEFAULT_SITE_SETTINGS.primary_email,

    whatsapp_number:
      getOptionalStringValue(formData, "whatsapp_number") ||
      DEFAULT_SITE_SETTINGS.whatsapp_number,

    address_line: getOptionalStringValue(formData, "address_line"),

    default_cta_title:
      getOptionalStringValue(formData, "default_cta_title") ||
      DEFAULT_SITE_SETTINGS.default_cta_title,

    default_cta_description:
      getOptionalStringValue(formData, "default_cta_description") ||
      DEFAULT_SITE_SETTINGS.default_cta_description,

    default_cta_button:
      getOptionalStringValue(formData, "default_cta_button") ||
      DEFAULT_SITE_SETTINGS.default_cta_button,

    facebook_url: getOptionalStringValue(formData, "facebook_url"),
    instagram_url: getOptionalStringValue(formData, "instagram_url"),
    linkedin_url: getOptionalStringValue(formData, "linkedin_url"),
    youtube_url: getOptionalStringValue(formData, "youtube_url"),
    meta_pixel_id: getOptionalStringValue(formData, "meta_pixel_id"),
    google_tag_id: getOptionalStringValue(formData, "google_tag_id"),
  };

  try {
    await upsertSiteSettings(settings);
  } catch (error) {
    console.error("Settings update failed:", error);
    redirect("/admin/settings?error=update-failed");
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/dashboard");

  redirect("/admin/settings?updated=success");
}