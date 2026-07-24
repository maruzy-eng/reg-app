import { BlueprintApproval } from "@/components/blueprint/blueprint-approval";
import { BlueprintBenefits } from "@/components/blueprint/blueprint-benefits";
import { BlueprintEcosystem } from "@/components/blueprint/blueprint-ecosystem";
import { BlueprintFinalCta } from "@/components/blueprint/blueprint-final-cta";
import { BlueprintForm } from "@/components/blueprint/blueprint-form";
import { BlueprintGallery } from "@/components/blueprint/blueprint-gallery";
import { BlueprintHero } from "@/components/blueprint/blueprint-hero";
import { BlueprintMedia } from "@/components/blueprint/blueprint-media";
import { BlueprintMidCta } from "@/components/blueprint/blueprint-mid-cta";
import { BlueprintProjects } from "@/components/blueprint/blueprint-projects";
import { BlueprintProperties } from "@/components/blueprint/blueprint-properties";
import { BlueprintStats } from "@/components/blueprint/blueprint-stats";
import { BlueprintTestimonials } from "@/components/blueprint/blueprint-testimonials";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import type { PropertyCard } from "@/types/property";

type BlueprintPageProps = {
  properties: PropertyCard[];
  form: DynamicForm | null;
  fields: DynamicFormField[];
};

export function BlueprintPage({
  properties,
  form,
  fields,
}: BlueprintPageProps) {
  return (
    <main className="overflow-x-hidden bg-white font-sans text-[#222] antialiased selection:bg-[#c9a24d] selection:text-white">
      <BlueprintHero />
      <BlueprintStats />
      <BlueprintEcosystem />
      <BlueprintBenefits />
      <BlueprintMidCta />
      <BlueprintProjects />
      <BlueprintProperties properties={properties} />
      <BlueprintApproval />
      <BlueprintTestimonials />
      <BlueprintGallery />
      <BlueprintMedia />
      <BlueprintForm form={form} fields={fields} />
      <BlueprintFinalCta />
    </main>
  );
}
