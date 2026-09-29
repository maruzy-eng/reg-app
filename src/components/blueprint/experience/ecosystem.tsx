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
          label: "propriedades no portfólio público",
          source: "Inventário público da Checkmate",
        },
        {
          value: new Set(properties.map((property) => property.state).filter(Boolean)).size,
          suffix: "",
          label: "estados com propriedades publicadas",
          source: "Localização dos imóveis publicados",
        },
      ].filter((metric) => metric.value > 0);
  if (!metrics.length) return null;
  return (
    <Section className="bp-stats" ariaLabel="Portfólio público">
      <p className="bp-authority-label">Checkmate Real Estate Group<span>Uma operação real nos Estados Unidos.</span></p>
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
        Dados do portfólio público exibido no site; o inventário pode variar.
      </small>
    </Section>
  );
}

export function BlueprintNetwork() {
  const nodes = [
    { name: "Banks", x: 300, y: 42 },
    { name: "Lenders", x: 482, y: 92 },
    { name: "Investors", x: 548, y: 238 },
    { name: "Contractors", x: 430, y: 372 },
    { name: "Realtors", x: 274, y: 398 },
    { name: "Attorneys", x: 96, y: 330 },
    { name: "CPA", x: 54, y: 176 },
    { name: "Partners", x: 158, y: 72 },
  ];
  return (
    <Section id="conexoes" className="bp-network-section">
      <div className="bp-split bp-align-center">
        <SectionHeader {...content.sections.network} />
        <div
          className="bp-network"
          data-reveal
          role="img"
          aria-label="Blueprint conectado a bancos, lenders, investidores, contractors, parceiros, contadores, advogados e realtors"
        >
          <svg viewBox="0 0 600 440" aria-hidden="true">
            {nodes.map((node, index) => (
              <g key={node.name}>
                <path
                  d={`M300 220 C ${300 + (node.x - 300) * 0.3} ${220 + (node.y - 220) * 0.05}, ${300 + (node.x - 300) * 0.74} ${220 + (node.y - 220) * 0.9}, ${node.x} ${node.y}`}
                />
                {index % 2 === 0 && (
                  <circle r="3">
                    <animateMotion
                      dur={`${8 + index}s`}
                      repeatCount="indefinite"
                      path={`M300 220 C ${300 + (node.x - 300) * 0.3} ${220 + (node.y - 220) * 0.05}, ${300 + (node.x - 300) * 0.74} ${220 + (node.y - 220) * 0.9}, ${node.x} ${node.y}`}
                    />
                  </circle>
                )}
              </g>
            ))}
          </svg>
          <div className="bp-network-center">
            <span>Checkmate</span>
            <strong>Blueprint</strong>
          </div>
          {nodes.map((node, index) => {
            return (
              <span
                className="bp-network-node"
                key={node.name}
                style={{
                  left: `${(node.x / 600) * 100}%`,
                  top: `${(node.y / 440) * 100}%`,
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {node.name}
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
    <div className="bp-financing">
      <div className="bp-split">
        <div className="bp-section-heading" data-reveal>
          <p className="bp-eyebrow">{content.sections.financing.eyebrow}</p>
          <h3>{content.sections.financing.title}</h3>
          <p className="bp-lead">{content.sections.financing.description}</p>
        </div>
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
    </div>
  );
}

export function BlueprintAudience() {
  return (
    <Section className="bp-audience">
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
    <Section className="bp-deliverables-section">
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
