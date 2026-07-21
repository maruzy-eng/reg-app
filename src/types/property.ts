import type { Database } from "@/types/database";

export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
export type PropertyInsert =
  Database["public"]["Tables"]["properties"]["Insert"];
export type PropertyUpdate =
  Database["public"]["Tables"]["properties"]["Update"];

export type PropertyImageRow =
  Database["public"]["Tables"]["property_images"]["Row"];

export type PropertyVideoRow =
  Database["public"]["Tables"]["property_videos"]["Row"];

export type PropertyDocumentRow =
  Database["public"]["Tables"]["property_documents"]["Row"];

export type PropertyFeatureRow =
  Database["public"]["Tables"]["property_features"]["Row"];

export type PropertyStatus = PropertyRow["status"];
export type PropertyType = PropertyRow["property_type"];

export type PropertyWithMedia = PropertyRow & {
  property_images?: PropertyImageRow[];
  property_videos?: PropertyVideoRow[];
  property_documents?: PropertyDocumentRow[];
  property_features?: PropertyFeatureRow[];
};

export type PropertyCard = {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  lotSizeSqft: number | null;
  yearBuilt: number | null;
  propertyType: PropertyType;
  status: PropertyStatus;
  imageUrl: string | null;
  description: string | null;
  projectedArv?: number | null;
  rehabEstimate?: number | null;
  condActive: boolean;
  condNumberOfHouses: number | null;
  condListedPrice: string | null;
  condAvgPrice: string | null;
  condSqft: number | null;
};

export function mapPropertyToCard(property: PropertyRow): PropertyCard {
  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    address: property.address_line_1,
    city: property.city,
    state: property.state,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    sqft: property.sqft,
    lotSizeSqft: property.lot_size_sqft,
    yearBuilt: property.year_built,
    propertyType: property.property_type,
    status: property.status,
    imageUrl: property.cover_image_url,
    description: property.short_description || property.description,
    projectedArv: property.projected_arv,
    rehabEstimate: property.rehab_estimate,
    condActive: property.cond_active,
    condNumberOfHouses: property.cond_number_of_houses,
    condListedPrice: property.cond_listed_price,
    condAvgPrice: property.cond_avg_price,
    condSqft: property.cond_sqft,
  };
}

export function formatCurrency(value: number | string | null | undefined) {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export function formatNumber(value: number | string | null | undefined) {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat("en-US").format(numericValue);
}

export function getPropertyStatusLabel(status: PropertyStatus) {
  const labels: Record<PropertyStatus, string> = {
    draft: "Draft",
    available: "Available",
    under_contract: "Under Contract",
    sold: "Sold",
    rented: "Rented",
    in_progress: "In Progress",
    archived: "Archived",
  };

  return labels[status] || status;
}

export function getPropertyTypeLabel(type: PropertyType) {
  const labels: Record<PropertyType, string> = {
    single_family: "Single Family",
    multi_family: "Multi Family",
    condo: "Condo",
    townhouse: "Townhouse",
    land: "Land",
    commercial: "Commercial",
    new_construction: "New Construction",
    flip: "Flip",
  };

  return labels[type] || type;
}

export function getPropertyStatusClassName(status: PropertyStatus) {
  const classes: Record<PropertyStatus, string> = {
    draft: "bg-gray-100 text-gray-700",
    available: "bg-emerald-50 text-emerald-700",
    under_contract: "bg-amber-50 text-amber-700",
    sold: "bg-red-50 text-red-700",
    rented: "bg-violet-50 text-violet-700",
    in_progress: "bg-blue-50 text-[#2680d8]",
    archived: "bg-gray-100 text-gray-500",
  };

  return classes[status] || "bg-gray-100 text-gray-700";
}

export function getPropertyVisibilityLabel(visibility: string | null) {
  if (!visibility) {
    return "Private";
  }

  const labels: Record<string, string> = {
    public: "Public",
    private: "Private",
    hidden: "Hidden",
  };

  return labels[visibility] || visibility;
}

export function slugifyPropertyTitle(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getMainPropertyImage(property: PropertyWithMedia) {
  const images = property.property_images || [];

  const coverImage =
    images.find((image) => image.is_cover) ||
    images.sort((a, b) => a.position - b.position)[0];

  return coverImage?.image_url || property.cover_image_url || null;
}

export function getPropertyGalleryImages(property: PropertyWithMedia) {
  const images = property.property_images || [];

  if (images.length > 0) {
    return images.sort((a, b) => a.position - b.position);
  }

  if (property.cover_image_url) {
    return [
      {
        id: "cover",
        property_id: property.id,
        image_url: property.cover_image_url,
        title: property.title,
        alt_text: property.title,
        caption: null,
        media_group: "gallery",
        width: null,
        height: null,
        position: 0,
        is_cover: true,
        created_at: property.created_at,
        updated_at: property.updated_at,
      },
    ] as PropertyImageRow[];
  }

  return [];
}
