import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BlueprintPage } from "@/components/blueprint/blueprint-page";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import { getPublicProperties } from "@/lib/properties";
import { mapPropertyToCard } from "@/types/property";

export const metadata: Metadata = buildPageMetadata({
  title: "Checkmate Blueprint",
  description:
    "Checkmate Blueprint connects education and real estate operations for Flip House and New Construction projects in the United States.",
  path: "/blueprint",
  keywords: ["Checkmate Blueprint", "flip house education", "new construction USA"],
});

export default async function BlueprintRoutePage() {
  const [properties, blueprintForm] = await Promise.all([
    getPublicProperties(),
    getPublishedFormByPageKey("blueprint"),
  ]);

  return (
    <BlueprintPage
      properties={properties.map(mapPropertyToCard)}
      form={blueprintForm.form}
      fields={blueprintForm.fields}
    />
  );
}
