import { BlueprintHeader } from "./experience/header";
import { BlueprintMotion } from "./experience/motion";
import {
  BlueprintHero,
  BlueprintProblem,
  BlueprintDifferential,
  BlueprintOperations,
} from "./experience/story";
import {
  BlueprintProjects,
  BlueprintExperiences,
  BlueprintTestimonials,
} from "./experience/proof";
import { BlueprintStats } from "./experience/ecosystem";
import {
  BlueprintOffer,
  BlueprintFAQ,
  BlueprintFinalCTA,
  BlueprintFooter,
} from "./experience/conversion";
import { selectBlueprintCases } from "@/lib/blueprint/experience";
import type { SiteSettingsValue } from "@/lib/site-settings";
import "./experience/blueprint.css";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import type { PropertyCard } from "@/types/property";

type BlueprintPageProps = {
  properties: PropertyCard[];
  form: DynamicForm | null;
  fields: DynamicFormField[];
  settings?: SiteSettingsValue;
};

export function BlueprintPage({
  properties,
  form,
  fields,
  settings = {},
}: BlueprintPageProps) {
  return (
    <div className="bp-experience" lang="pt-BR">
      <a href="#blueprint" className="bp-skip">
        Ir para o conteúdo
      </a>
      <BlueprintHeader />
      <main>
        <BlueprintHero />
        <BlueprintStats properties={properties} />
        <BlueprintProjects projects={selectBlueprintCases(properties)} />
        <BlueprintProblem />
        <BlueprintDifferential />
        <BlueprintOperations />
        <BlueprintExperiences />
        <BlueprintTestimonials />
        <BlueprintOffer form={form} fields={fields} />
        <BlueprintFAQ />
        <BlueprintFinalCTA />
      </main>
      <BlueprintFooter settings={settings} />
      <BlueprintMotion />
    </div>
  );
}
