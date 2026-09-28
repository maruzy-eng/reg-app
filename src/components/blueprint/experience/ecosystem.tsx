import {
  blueprintExperience as content,
  verifiedBlueprintMetrics,
} from "@/lib/blueprint/experience";
import type { PropertyCard } from "@/types/property";
import { AnimatedNumber } from "./proof";
import { Section, SectionHeader } from "./ui";

export function BlueprintStats({ properties }: { properties: PropertyCard[] }) {
  const metrics = verifiedBlueprintMetrics.length
    ? verifiedBlueprintMetrics
    : [
        {
          value: properties.length,
          suffix: "",
          label: "Projetos no portfólio público",
        },
        {
          value: properties.filter(
            (property) => property.propertyType === "new_construction",
          ).length,
          suffix: "",
          label: "Projetos de New Construction",
        },
        {
          value: new Set(properties.map((property) => property.state)).size,
          suffix: "",
          label: "Estados representados no portfólio",
        },
      ];
  if (!properties.length && !verifiedBlueprintMetrics.length) return null;
  return (
    <Section className="bp-stats">
      <p className="bp-eyebrow">Uma operação que você pode conhecer</p>
      <div>
        {metrics.map((metric) => (
          <article key={metric.label}>
            <strong>
              <AnimatedNumber value={metric.value} suffix={metric.suffix} />
            </strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
      <small>
        Dados do portfólio público exibido no site. Não representam promessa de
        resultado.
      </small>
    </Section>
  );
}

export function BlueprintNetwork() {
  return (
    <Section id="networking">
      <div className="bp-split bp-align-center">
        <SectionHeader {...content.sections.network} />
        <div
          className="bp-network"
          data-reveal
          role="img"
          aria-label="Blueprint conectado a bancos, lenders, investidores, contractors, parceiros, contadores, advogados e realtors"
        >
          <svg viewBox="0 0 600 440" aria-hidden="true">
            {content.network.map((_, index) => {
              const angle = ((index * 45 - 90) * Math.PI) / 180;
              return (
                <line
                  key={index}
                  x1="300"
                  y1="220"
                  x2={300 + Math.cos(angle) * 230}
                  y2={220 + Math.sin(angle) * 160}
                />
              );
            })}
          </svg>
          <div className="bp-network-center">
            <span>Checkmate</span>
            <strong>Blueprint</strong>
          </div>
          {content.network.map((name, index) => {
            const angle = ((index * 45 - 90) * Math.PI) / 180;
            return (
              <span
                className="bp-network-node"
                key={name}
                style={{
                  left: `${50 + Math.cos(angle) * 38}%`,
                  top: `${50 + Math.sin(angle) * 36}%`,
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function BlueprintFinancing() {
  return (
    <Section className="bp-financing">
      <div className="bp-split">
        <SectionHeader {...content.sections.financing} />
        <div className="bp-capital-list">
          {content.financingSteps.map(([number, title, text]) => (
            <div key={number} data-reveal>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="bp-disclaimer">{content.financingDisclaimer}</p>
    </Section>
  );
}

export function BlueprintAudience() {
  return (
    <Section light>
      <SectionHeader {...content.sections.audience} />
      <div className="bp-audience-grid">
        {content.audiences.map((audience, index) => (
          <article key={audience.title} data-reveal>
            <span className="bp-index">0{index + 1}</span>
            <h3>{audience.title}</h3>
            <p>{audience.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function BlueprintDeliverables() {
  return (
    <Section>
      <div className="bp-split">
        <SectionHeader {...content.sections.deliverables} />
        <ol className="bp-deliverables">
          {content.deliverables.map((item, index) => (
            <li key={item} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
