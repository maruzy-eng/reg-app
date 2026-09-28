import { getPublishedFormByPageKey } from "@/lib/form-page-connections";
import BlueprintVSL from "@/components/blueprint-vsl/BlueprintVSL";

export default async function BlueprintVSLPage() {
  // "blueprint-vsl" herda a conexão do /blueprint enquanto o admin não
  // conectar um formulário específico para a VSL.
  const { form, fields } = await getPublishedFormByPageKey("blueprint-vsl");

  return <BlueprintVSL form={form} fields={fields} />;
}
