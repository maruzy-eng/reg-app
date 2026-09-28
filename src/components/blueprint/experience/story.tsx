import Image from "next/image";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { blueprintExperience as content } from "@/lib/blueprint/experience";
import { GoldButton, Section, SectionHeader } from "./ui";

export function BlueprintHero() {
  return (
    <section id="blueprint" className="bp-hero" tabIndex={-1}>
      <div className="bp-hero-media">
        <Image
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="bp-cover"
        />
      </div>
      <div className="bp-hero-shade" />
      <div className="bp-container bp-hero-content">
        <p className="bp-eyebrow">{content.hero.eyebrow}</p>
        <h1>
          {content.hero.brand}
          <br />
          <span>{content.hero.product}</span>
        </h1>
        <h2>{content.hero.headline}</h2>
        <p className="bp-hero-description">{content.hero.description}</p>
        <div className="bp-actions">
          <GoldButton />
          <a className="bp-secondary" href="#como-funciona">
            <Play size={16} aria-hidden="true" />
            Veja como funciona
          </a>
        </div>
        <ul className="bp-hero-pillars">
          {content.hero.pillars.map((pillar) => (
            <li key={pillar}>{pillar}</li>
          ))}
        </ul>
      </div>
      <div className="bp-container bp-hero-bottom">
        <span>Da experiência na obra à visão do negócio.</span>
        <a href="#perspectiva" aria-label="Conhecer a proposta">
          <ArrowDown size={18} />
        </a>
        <span>Lexington, Massachusetts / Checkmate</span>
      </div>
    </section>
  );
}

export function BlueprintProblem() {
  return (
    <Section id="perspectiva" light>
      <div className="bp-split">
        <SectionHeader {...content.sections.problem} />
        <div className="bp-question-list" data-reveal>
          {content.questions.map((question, index) => (
            <div key={question}>
              <span>0{index + 1}</span>
              <p>{question}</p>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <p className="bp-question-end" data-reveal>
        Quem pode olhar para o projeto <em>com você</em> antes de uma decisão
        importante?
      </p>
    </Section>
  );
}

export function BlueprintDifferential() {
  return (
    <Section id="diferencial">
      <div className="bp-heading-row">
        <SectionHeader {...content.sections.differential} />
        <p className="bp-lead" data-reveal>
          {content.differentialIntro}
        </p>
      </div>
      <div className="bp-pillar-grid">
        {content.pillars.map((pillar, index) => (
          <article key={pillar.title} className="bp-pillar" data-reveal>
            <span className="bp-index">0{index + 1}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
            <small>{pillar.detail}</small>
          </article>
        ))}
      </div>
      <div className="bp-section-end">
        <p>{content.differentialClosing}</p>
        <GoldButton />
      </div>
    </Section>
  );
}

export function BlueprintProfessional() {
  return (
    <Section className="bp-professional">
      <div className="bp-split bp-align-center">
        <div className="bp-professional-image" data-reveal>
          <Image
            src={content.gallery[0].src}
            alt="Visita de campo Checkmate em uma propriedade em reforma"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="bp-cover"
          />
          <span>Dentro do ecossistema Checkmate</span>
        </div>
        <div data-reveal>
          <SectionHeader {...content.sections.professional} />
          <ul className="bp-trades">
            {content.trades.map((trade) => (
              <li key={trade}>{trade}</li>
            ))}
          </ul>
          <p>{content.professionalClosing}</p>
        </div>
      </div>
      <ol className="bp-project-journey" data-progress>
        {content.projectJourney.map((stage, index) => (
          <li key={stage}>
            <span>0{index + 1}</span>
            {stage}
          </li>
        ))}
      </ol>
      <div className="bp-career" data-progress>
        <p className="bp-eyebrow">{content.careerIntro}</p>
        <ol>
          {content.careerJourney.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
        <p className="bp-lead">{content.careerDescription}</p>
      </div>
    </Section>
  );
}

export function BlueprintHowItWorks() {
  return (
    <Section id="como-funciona" light>
      <div className="bp-how-layout">
        <div className="bp-how-intro">
          <SectionHeader {...content.sections.journey} />
          <GoldButton />
        </div>
        <ol className="bp-timeline" data-progress>
          {content.steps.map((step, index) => (
            <li key={step.title} data-reveal>
              <span className="bp-timeline-number">0{index + 1}</span>
              <div>
                <p className="bp-eyebrow">Etapa 0{index + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ul className="bp-tags">
                  {step.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function BlueprintOperations() {
  return (
    <Section className="bp-operations">
      <SectionHeader {...content.sections.operations} />
      <div className="bp-operation-diagram" data-reveal>
        <div className="bp-operation-center">
          <span>Checkmate Blueprint</span>
          <strong>
            Você acompanhando
            <br />o processo.
          </strong>
        </div>
        <ol>
          {content.operations.map((operation, index) => (
            <li key={operation}>
              <span>0{index + 1}</span>
              <strong>{operation}</strong>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
