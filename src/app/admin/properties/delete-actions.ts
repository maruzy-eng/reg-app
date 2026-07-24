"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminPermission } from "@/lib/admin-permissions";
import { createAdminClient } from "@/lib/supabase/admin";

const PROPERTY_MEDIA_BUCKET =
  process.env.PROPERTY_MEDIA_BUCKET || "property-media";

async function listStorageFilesRecursively(
  folderPath: string,
): Promise<string[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .list(folderPath, {
      limit: 1000,
      offset: 0,
    });

  if (error || !data) {
    return [];
  }

  const files: string[] = [];

  for (const item of data) {
    const itemPath = `${folderPath}/${item.name}`;

    if (item.id) {
      files.push(itemPath);
    } else {
      const nestedFiles = await listStorageFilesRecursively(itemPath);
      files.push(...nestedFiles);
    }
  }

  return files;
}

async function deletePropertyStorageFolder(slug: string) {
  const supabase = createAdminClient();

  if (!slug) {
    return;
  }

  const baseFolder = `properties/${slug}`;
  const files = await listStorageFilesRecursively(baseFolder);

  if (files.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(PROPERTY_MEDIA_BUCKET)
    .remove(files);

  if (error) {
    console.warn(
      `Could not delete storage files for property ${slug}:`,
      error.message,
    );
  }
}

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function deletePropertyAction(formData: FormData) {
  await requireAdminPermission("properties.delete");

  const propertyId = getStringValue(formData, "property_id");

  if (!propertyId) {
    redirect("/admin/properties?error=missing-property-id");
  }

  const supabase = createAdminClient();

  const { data: property, error: fetchError } = await supabase
    .from("properties")
    .select("id, slug, title")
    .eq("id", propertyId)
    .single();

  if (fetchError || !property) {
    redirect("/admin/properties?error=property-not-found");
  }

  await deletePropertyStorageFolder(property.slug);

  const { error: deleteError } = await supabase
    .from("properties")
    .delete()
    .eq("id", property.id);

  if (deleteError) {
    console.error("Could not delete property:", deleteError.message);
    redirect("/admin/properties?error=delete-failed");
  }

  revalidatePath("/reg");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/properties");

  redirect("/admin/properties?deleted=success");
}