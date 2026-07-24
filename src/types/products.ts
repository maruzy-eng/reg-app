export type RegProductStatus = "draft" | "published" | "archived";

export type RegProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  price: number | string;
  discount_price: number | string | null;
  status: RegProductStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type RegProductCard = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  discountPrice: number | null;
};

export function toMoneyNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatProductPrice(value: number | string | null | undefined) {
  const amount = toMoneyNumber(value);

  if (amount === null) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function slugifyProductName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function mapProductToCard(product: RegProduct): RegProductCard {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    imageUrl: product.image_url,
    price: toMoneyNumber(product.price) ?? 0,
    discountPrice: toMoneyNumber(product.discount_price),
  };
}
