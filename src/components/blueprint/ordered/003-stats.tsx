import { verifiedBlueprintMetrics } from "@/lib/blueprint/experience";
import type { PropertyCard } from "@/types/property";
import { blueprintContainer } from "./shared";

export function Blueprint003Stats({
  properties,
}: {
  properties: PropertyCard[];
}) {
  const metrics = verifiedBlueprintMetrics.length
    ? verifiedBlueprintMetrics
    : [
        {
          value: properties.length,
          suffix: "",
          label: "propriedades no portfólio público",
          source: "Inventário público da Checkmate",
        },
        {
          value: new Set(
            properties.map((property) => property.state).filter(Boolean),
          ).size,
          suffix: "",
          label: "estados com propriedades publicadas",
          source: "Localização dos imóveis publicados",
        },
      ].filter((metric) => metric.value > 0);

  if (!metrics.length) return null;

  return (
    <section className="border-y border-black/10 bg-[#EDE7DC] text-[#171614]">
      <div className={`${blueprintContainer} py-10 lg:py-14`}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#8B6A2E]">
              Checkmate Real Estate Group
            </p>
            <p className="mt-4 max-w-[390px] text-[1.25rem] font-medium leading-[1.4] tracking-[-0.025em] text-[#2B2824]">
              Experiência construída dentro de uma operação real nos Estados
              Unidos.
            </p>
          </div>

          <div
            className={[
              "grid gap-8",
              metrics.length > 1 ? "sm:grid-cols-2" : "",
            ].join(" ")}
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="border-l border-black/15 pl-6">
                <strong className="block text-[clamp(2.7rem,4.5vw,4.5rem)] font-medium leading-none tracking-[-0.06em] text-[#171614]">
                  {metric.value}
                  {metric.suffix}
                </strong>
                <p className="mt-4 max-w-[260px] text-[0.7rem] font-semibold uppercase leading-[1.55] tracking-[0.1em] text-[#514C44]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[0.66rem] leading-6 text-[#6A645B]">
          Dados do portfólio público exibido no site; o inventário pode variar.
        </p>
      </div>
    </section>
  );
}
