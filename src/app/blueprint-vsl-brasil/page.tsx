import BlueprintVSLBrasil from "@/components/blueprint-vsl/BlueprintVSLBrasil";
import { getPublishedFormByPageKey } from "@/lib/form-page-connections";

export default async function BlueprintVSLBrasilPage() {
  const { form, fields } = await getPublishedFormByPageKey(
    "blueprint-vsl-brasil",
  );

  return <BlueprintVSLBrasil form={form} fields={fields} />;
}
