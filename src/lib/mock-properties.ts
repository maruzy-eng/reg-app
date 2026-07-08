// src/lib/mock-properties.ts

type MockProperty = {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: "available" | "sold" | "rented" | "in_progress";
  imageUrl: string;
  description: string;
  projectedArv: number;
  rehabEstimate: number;
};

export const properties: MockProperty[] = [
  {
    id: "1",
    title: "Modern Colonial Renovation",
    slug: "20-pine-hill-rd-lynnfield",
    address: "20 Pine Hill Rd",
    city: "Lynnfield",
    state: "MA",
    price: 1590000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3650,
    status: "sold",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    description:
      "A fully rebuilt modern colonial designed with open living spaces, premium finishes and strong resale appeal.",
    projectedArv: 1590000,
    rehabEstimate: 450000,
  },
  {
    id: "2",
    title: "New Construction Opportunity",
    slug: "94-middle-st-lexington",
    address: "94 Middle St",
    city: "Lexington",
    state: "MA",
    price: 2750000,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 5200,
    status: "in_progress",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    description:
      "A high-end new construction project located in a premium Massachusetts market.",
    projectedArv: 2900000,
    rehabEstimate: 1100000,
  },
  {
    id: "3",
    title: "Flip House Investment",
    slug: "59-summer-st-medway",
    address: "59 Summer St",
    city: "Medway",
    state: "MA",
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    status: "available",
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    description:
      "A strategic flip house project with strong neighborhood fundamentals and clear upside after renovation.",
    projectedArv: 850000,
    rehabEstimate: 200000,
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
