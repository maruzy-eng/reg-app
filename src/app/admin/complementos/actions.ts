"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { normalizeComplementSlug } from "@/lib/property-complements";

const PROPERTY_MEDIA_BUCKET =
  process.env.PROPERTY_MEDIA_BUCKET || "property-media";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getNullableStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  return value || null;
}

function getNumberValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);
  const numberValue = Number(value.replace(/,/g, ""));

  return Number.isNaN(numberValue) ? 0 : numberValue;
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

function slugifyFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? parts.pop() : "";

  return extension ? extension.toLowerCase() : "jpg";
}

async function ensurePropertyMediaBucket() {
  const supabase = createAdminClient();
  const { data: buckets, error: listError } =
    await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Could not list storage buckets: ${listError.message}`);
  }

  if (buckets.some((bucket) => bucket.name === PROPERTY_MEDIA_BUCKET)) {
    return;
  }

  const { error } = await supabase.storage.createBucket(
    PROPERTY_MEDIA_BUCKET,
    {
      public: true,
    },
  );

  if (error) {
    throw new Error(`Could not create storage bucket: ${error.message}`);
  }
}

async function uploadComplementImage(params: {
  file: File;
  propertyId: string;
}) {
  if (params.file.size > 10 * 1024 * 1024) {
    throw new Error("Image files must be 10MB or smaller.");
  }

  if (!allowedImageTypes.has(params.file.type)) {
    throw new Error("Image upload must be JPG, PNG, WebP, GIF, or AVIF.");
  }

  await ensurePropertyMediaBucket();

  const supabase = createAdminClient();
  const extension = getFileExtension(params.file.name);
  const safeOriginalName = slugifyFileName(params.file.name || `image.${extension}`);
  const filePath = `properties/${params.propertyId}/images/${Date.now()}-${safeOriginalName}`;
  const buffer = Buffer.from(await params.file.arrayBuffer());

  const { error } = await supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .upload(filePath, buffer, {
      contentType: params.file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    throw new Error(`Could not upload file: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

async function revalidateComplementPaths(_propertyIds: string[] = []) {
  revalidatePath("/admin/complementos");
  revalidatePath("/admin/properties");
  revalidatePath("/");
}

export async function createComplementBlockAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();
  const title = getStringValue(formData, "title");
  const slug =
    normalizeComplementSlug(getStringValue(formData, "slug")) ||
    normalizeComplementSlug(title);

  if (!title || !slug) {
    throw new Error("Complement title is required.");
  }

  const { error } = await supabase.from("property_complement_blocks").insert({
    title,
    slug,
    eyebrow: getNullableStringValue(formData, "eyebrow"),
    description: getNullableStringValue(formData, "description"),
    sort_order: getNumberValue(formData, "sort_order"),
    is_active: getBooleanValue(formData, "is_active"),
  });

  if (error) {
    throw new Error(error.message);
  }

  await revalidateComplementPaths();
  redirect("/admin/complementos");
}

export async function updateComplementBlockPropertiesAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();
  const blockId = getStringValue(formData, "block_id");
  const propertyIds = formData
    .getAll("property_ids")
    .filter((value): value is string => typeof value === "string");

  if (!blockId) {
    throw new Error("Complement block is required.");
  }

  const { data: currentAssignments, error: currentAssignmentsError } =
    await supabase
      .from("property_complement_block_properties")
      .select("property_id")
      .eq("block_id", blockId);

  if (currentAssignmentsError) {
    throw new Error(currentAssignmentsError.message);
  }

  const previousPropertyIds = (currentAssignments || []).map(
    (assignment) => assignment.property_id,
  );

  const { error: deleteError } = await supabase
    .from("property_complement_block_properties")
    .delete()
    .eq("block_id", blockId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (propertyIds.length > 0) {
    const { error: insertError } = await supabase
      .from("property_complement_block_properties")
      .insert(
        propertyIds.map((propertyId) => ({
          block_id: blockId,
          property_id: propertyId,
        })),
      );

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  await revalidateComplementPaths([...previousPropertyIds, ...propertyIds]);
  redirect("/admin/complementos");
}

export async function addComplementItemAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();
  const propertyId = getStringValue(formData, "property_id");
  const blockSlug = getStringValue(formData, "block_slug");
  const imageFile = getFileValue(formData, "image_file");
  const manualImageUrl = getStringValue(formData, "image_url");

  if (!propertyId || !blockSlug) {
    throw new Error("Property and complement block are required.");
  }

  if (!imageFile && !manualImageUrl) {
    throw new Error("Upload an image or provide an image URL.");
  }

  const imageUrl = imageFile
    ? await uploadComplementImage({
        file: imageFile,
        propertyId,
      })
    : manualImageUrl;

  const { error } = await supabase.from("property_images").insert({
    property_id: propertyId,
    image_url: imageUrl,
    title: getNullableStringValue(formData, "title"),
    alt_text: getNullableStringValue(formData, "alt_text"),
    caption: getNullableStringValue(formData, "caption"),
    media_group: blockSlug,
    position: getNumberValue(formData, "position"),
    is_cover: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  await revalidateComplementPaths([propertyId]);
  redirect("/admin/complementos");
}

export async function deleteComplementItemAction(formData: FormData) {
  await requireAdminPermission("properties.update");

  const supabase = createAdminClient();
  const imageId = getStringValue(formData, "image_id");

  if (!imageId) {
    throw new Error("Complement item is required.");
  }

  const { data: image, error: imageError } = await supabase
    .from("property_images")
    .select("property_id")
    .eq("id", imageId)
    .maybeSingle();

  if (imageError) {
    throw new Error(imageError.message);
  }

  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }

  await revalidateComplementPaths(image?.property_id ? [image.property_id] : []);
  redirect("/admin/complementos");
}
