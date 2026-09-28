import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { blueprintExperience as content } from "@/lib/blueprint/experience";

export function GoldButton({
  children = content.cta,
  href = "#formb",
}: {
  children?: ReactNode;
  href?: string;
}) {
  return (
    <a className="bp-button" href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export function Section({
  children,
  id,
  light = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`bp-section ${light ? "bp-light" : ""} ${className}`}
    >
      <div className="bp-container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  accent?: string;
}) {
  return (
    <div className="bp-section-heading" data-reveal>
      <p className="bp-eyebrow">{eyebrow}</p>
      <h2>
        {title}
        {accent && (
          <>
            <br />
            <span className="bp-heading-accent">{accent}</span>
          </>
        )}
      </h2>
      {description && <p className="bp-lead">{description}</p>}
    </div>
  );
}
