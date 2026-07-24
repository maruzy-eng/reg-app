export type RegPostStatus = "draft" | "published" | "archived";

export type RegPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  status: RegPostStatus;
  published_at: string | null;
  author_name: string;
  category: string | null;
  tags: string[] | unknown;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type RegPostCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  authorName: string;
  category: string | null;
  tags: string[];
};

export function normalizePostTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => String(tag || "").trim())
    .filter(Boolean);
}

export function mapPostToCard(post: RegPost): RegPostCard {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImageUrl: post.cover_image_url,
    publishedAt: post.published_at,
    authorName: post.author_name,
    category: post.category,
    tags: normalizePostTags(post.tags),
  };
}

export function formatPostDate(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function slugifyPostTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
