import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminPermission } from "@/lib/admin-permissions";
import { createAdminClient } from "@/lib/supabase/admin";
import { REG_TABLES } from "@/lib/reg-tables";
import {
  slugifyProductName,
  toMoneyNumber,
  type RegProduct,
  type RegProductStatus,
} from "@/types/products";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseStatus(value: string): RegProductStatus {
  if (value === "published" || value === "archived" || value === "draft") {
    return value;
  }

  return "draft";
}

function parseMoney(value: string) {
  if (!value) {
    return null;
  }

  const normalized = value.replace(",", ".");
  return toMoneyNumber(normalized);
}

export async function getAdminProducts(): Promise<RegProduct[]> {
  await requireAdminPermission("products.read");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.products)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as RegProduct[];
}

export async function getAdminProductById(
  id: string,
): Promise<RegProduct | null> {
  await requireAdminPermission("products.read");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(REG_TABLES.products)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as RegProduct | null) || null;
}

function buildProductPayload(formData: FormData) {
  const name = getStringValue(formData, "name");
  const slugInput = getStringValue(formData, "slug");
  const status = parseStatus(getStringValue(formData, "status"));
  const price = parseMoney(getStringValue(formData, "price"));
  const discountPrice = parseMoney(getStringValue(formData, "discount_price"));

  if (!name) {
    throw new Error("Nome é obrigatório.");
  }

  const slug = slugInput || slugifyProductName(name);

  if (!slug) {
    throw new Error("Slug é obrigatório.");
  }

  if (price === null) {
    throw new Error("Valor é obrigatório.");
  }

  if (price < 0) {
    throw new Error("Valor não pode ser negativo.");
  }

  if (discountPrice !== null && discountPrice < 0) {
    throw new Error("Valor com desconto não pode ser negativo.");
  }

  if (discountPrice !== null && discountPrice > price) {
    throw new Error("Valor com desconto não pode ser maior que o valor.");
  }

  return {
    name,
    slug,
    description: getStringValue(formData, "description") || null,
    image_url: getStringValue(formData, "image_url") || null,
    price,
    discount_price: discountPrice,
    status,
    sort_order: Number(getStringValue(formData, "sort_order") || "0") || 0,
  };
}

export async function createAdminProductAction(formData: FormData) {
  "use server";

  await requireAdminPermission("products.create");
  const supabase = createAdminClient();
  const payload = buildProductPayload(formData);

  const { data, error } = await supabase
    .from(REG_TABLES.products)
    .insert(payload)
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Não foi possível criar o produto.");
  }

  revalidatePath("/produtos");
  revalidatePath("/admin/produtos");
  redirect(`/admin/produtos/${data.id}/edit`);
}

export async function updateAdminProductAction(formData: FormData) {
  "use server";

  await requireAdminPermission("products.update");
  const supabase = createAdminClient();
  const id = getStringValue(formData, "id");

  if (!id) {
    throw new Error("ID do produto ausente.");
  }

  const payload = buildProductPayload(formData);

  const { error } = await supabase
    .from(REG_TABLES.products)
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/produtos");
  revalidatePath(`/produtos/${payload.slug}`);
  revalidatePath("/admin/produtos");
  revalidatePath(`/admin/produtos/${id}/edit`);
  redirect(`/admin/produtos/${id}/edit?saved=1`);
}

export async function deleteAdminProductAction(formData: FormData) {
  "use server";

  await requireAdminPermission("products.delete");
  const supabase = createAdminClient();
  const id = getStringValue(formData, "id");

  if (!id) {
    throw new Error("ID do produto ausente.");
  }

  const { error } = await supabase
    .from(REG_TABLES.products)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/produtos");
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}
