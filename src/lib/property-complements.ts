import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export type PropertyComplementBlock = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyComplementProperty = {
  id: string;
  title: string;
  slug: string;
  status: string;
};

export type PropertyComplementItem = {
  id: string;
  property_id: string;
  image_url: string;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  media_group: string | null;
  position: number;
  is_cover: boolean;
};

export type AdminPropertyComplementBlock = PropertyComplementBlock & {
  propertyIds: string[];
  items: PropertyComplementItem[];
};

export type AdminPropertyComplementsResult = {
  blocks: AdminPropertyComplementBlock[];
  properties: PropertyComplementProperty[];
};

export type PublicPropertyComplementBlock = PropertyComplementBlock & {
  items: PropertyComplementItem[];
};

export function normalizeComplementSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function getComplementBlocks() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("property_complement_blocks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as PropertyComplementBlock[];
}

export async function getAdminPropertyComplements(): Promise<AdminPropertyComplementsResult> {
  const supabase = createAdminClient();

  const [blocks, propertiesResult, assignmentsResult] = await Promise.all([
    getComplementBlocks(),
    supabase
      .from("properties")
      .select("id, title, slug, status")
      .order("title", { ascending: true }),
    supabase
      .from("property_complement_block_properties")
      .select("block_id, property_id"),
  ]);

  if (propertiesResult.error) {
    throw new Error(propertiesResult.error.message);
  }

  if (assignmentsResult.error) {
    throw new Error(assignmentsResult.error.message);
  }

  const properties = (propertiesResult.data || []) as PropertyComplementProperty[];
  const slugs = blocks.map((block) => block.slug);

  const { data: itemsData, error: itemsError } = slugs.length
    ? await supabase
        .from("property_images")
        .select(
          "id, property_id, image_url, title, alt_text, caption, media_group, position, is_cover",
        )
        .in("media_group", slugs)
        .order("position", { ascending: true })
    : { data: [], error: null };

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const assignmentsByBlock = new Map<string, string[]>();

  for (const assignment of assignmentsResult.data || []) {
    const current = assignmentsByBlock.get(assignment.block_id) || [];
    current.push(assignment.property_id);
    assignmentsByBlock.set(assignment.block_id, current);
  }

  const items = (itemsData || []) as PropertyComplementItem[];

  return {
    properties,
    blocks: blocks.map((block) => ({
      ...block,
      propertyIds: assignmentsByBlock.get(block.id) || [],
      items: items.filter((item) => item.media_group === block.slug),
    })),
  };
}

export async function getPublicPropertyComplementBlocks(
  propertyId: string,
): Promise<PublicPropertyComplementBlock[]> {
  const supabase = createAdminClient();

  const { data: assignments, error: assignmentsError } = await supabase
    .from("property_complement_block_properties")
    .select("block_id")
    .eq("property_id", propertyId);

  if (assignmentsError) {
    throw new Error(assignmentsError.message);
  }

  const blockIds = (assignments || []).map((item) => item.block_id);

  if (blockIds.length === 0) {
    return [];
  }

  const { data: blocks, error: blocksError } = await supabase
    .from("property_complement_blocks")
    .select("*")
    .in("id", blockIds)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (blocksError) {
    throw new Error(blocksError.message);
  }

  const activeBlocks = (blocks || []) as PropertyComplementBlock[];
  const slugs = activeBlocks.map((block) => block.slug);

  if (slugs.length === 0) {
    return [];
  }

  const { data: items, error: itemsError } = await supabase
    .from("property_images")
    .select(
      "id, property_id, image_url, title, alt_text, caption, media_group, position, is_cover",
    )
    .eq("property_id", propertyId)
    .in("media_group", slugs)
    .order("position", { ascending: true });

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const complementItems = (items || []) as PropertyComplementItem[];

  return activeBlocks
    .map((block) => ({
      ...block,
      items: complementItems.filter((item) => item.media_group === block.slug),
    }))
    .filter((block) => block.items.length > 0);
}
