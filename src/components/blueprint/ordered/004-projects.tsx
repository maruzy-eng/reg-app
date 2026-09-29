import { BlueprintProjects } from "@/components/blueprint/experience/proof";
import type { BlueprintCase } from "@/lib/blueprint/experience";

export function Blueprint004Projects({
  projects,
}: {
  projects: BlueprintCase[];
}) {
  return <BlueprintProjects projects={projects} />;
}
