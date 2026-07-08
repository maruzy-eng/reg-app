import { getPublicProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/site-settings";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PropertiesFilterClient } from "@/components/public/properties-filter-client";
import { mapPropertyToCard } from "@/types/property";

export const revalidate = 60;

type PropertiesPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    type?: string;
    city?: string;
    min_price?: string;
    max_price?: string;
    bedrooms?: string;
    bathrooms?: string;
  }>;
};

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const [properties, settings] = await Promise.all([
    getPublicProperties(),
    getSiteSettings(),
  ]);

  const propertyCards = properties.map(mapPropertyToCard);

  return (
    <main className="min-h-screen property-grid-bg">
      <PublicHeader settings={settings} />

      <PropertiesFilterClient
        properties={propertyCards}
        initialFilters={{
          q: resolvedSearchParams.q || "",
          status: resolvedSearchParams.status || "all",
          type: resolvedSearchParams.type || "all",
          city: resolvedSearchParams.city || "",
          min_price: resolvedSearchParams.min_price || "",
          max_price: resolvedSearchParams.max_price || "",
          bedrooms: resolvedSearchParams.bedrooms || "",
          bathrooms: resolvedSearchParams.bathrooms || "",
        }}
      />

      <PublicFooter settings={settings} />
    </main>
  );
}
