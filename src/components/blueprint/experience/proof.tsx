"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from "lucide-react";
import {
  blueprintExperience as content,
  type BlueprintCase,
} from "@/lib/blueprint/experience";
import { GoldButton, Section, SectionHeader } from "./ui";

function CaseDialog({ project }: { project: BlueprintCase }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bp-case-trigger">
        Ver case <ArrowUpRight size={18} aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bp-dialog-overlay" />
        <Dialog.Content
          className="bp-dialog-content"
          aria-describedby={`case-description-${project.id}`}
        >
          <Dialog.Close className="bp-dialog-close" aria-label="Fechar case">
            <X />
          </Dialog.Close>
          {project.image && (
            <div className="bp-dialog-image">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="bp-cover"
              />
            </div>
          )}
          <div className="bp-dialog-body">
            <p className="bp-eyebrow">
              {project.category} / {project.location}
            </p>
            <Dialog.Title>{project.title}</Dialog.Title>
            <Dialog.Description id={`case-description-${project.id}`}>
              {project.context}
            </Dialog.Description>
            <dl className="bp-case-facts">
              {[
                ["Aquisição", project.acquisition],
                ["Planejamento", project.planning],
                ["Obra", project.construction],
                ["Resultado", project.result],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    {value ||
                      "Detalhes não publicados. Converse com o time sobre este projeto."}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="bp-case-status">
              Status no portfólio: {project.status}
            </p>
            {project.href && (
              <a className="bp-button" href={project.href}>
                Explorar propriedade
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function BlueprintProjects({ projects }: { projects: BlueprintCase[] }) {
  return (
    <Section id="projetos" light>
      <SectionHeader {...content.sections.projects} />
      <div className="bp-case-list">
        {projects.map((project, index) => (
          <article className="bp-case" key={project.id} data-reveal>
            <div className="bp-case-photo">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="bp-cover"
                />
              ) : (
                <span>Registro fotográfico em preparação</span>
              )}
              <span className="bp-photo-label">{project.category}</span>
            </div>
            <div className="bp-case-copy">
              <span className="bp-index">Projeto / 0{index + 1}</span>
              <p className="bp-eyebrow">{project.location}</p>
              <h3>{project.title}</h3>
              <p className="bp-case-status">
                <span />
                {project.status}
              </p>
              <p>
                {project.category === "New Construction"
                  ? "Do planejamento à construção: uma perspectiva sobre as etapas de um empreendimento residencial."
                  : "Aquisição e transformação de imóveis como parte de uma estratégia imobiliária."}
              </p>
              <CaseDialog project={project} />
            </div>
          </article>
        ))}
      </div>
      {!projects.length && (
        <p>Conheça com nosso time os projetos disponíveis para apresentação.</p>
      )}
      <div className="bp-section-end">
        <a href="/properties" className="bp-text-link">
          Explorar o portfólio completo <ArrowUpRight size={18} />
        </a>
        <GoldButton />
      </div>
    </Section>
  );
}

export function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min(1, (time - start) / 1000);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

export function BlueprintExperiences() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const slide = element.querySelector("figure");
    const width =
      (slide?.getBoundingClientRect().width || element.clientWidth) + 24;
    element.scrollBy({
      left: direction * width,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <Section id="experiencias">
      <div className="bp-heading-row">
        <SectionHeader {...content.sections.experiences} />
        <div className="bp-slider-controls">
          <button
            title="Fotos anteriores"
            aria-label="Fotos anteriores"
            onClick={() => move(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            title="Próximas fotos"
            aria-label="Próximas fotos"
            onClick={() => move(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className="bp-gallery"
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Experiências Checkmate"
      >
        {content.gallery.map((image, index) => (
          <figure key={image.src}>
            <div>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 700px) 85vw, 45vw"
                className="bp-cover"
              />
            </div>
            <figcaption>
              <span>0{index + 1}</span>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function BlueprintTestimonials() {
  const [index, setIndex] = useState(0);
  const item = content.testimonials[index];
  return (
    <Section id="depoimentos" light>
      <SectionHeader {...content.sections.testimonials} />
      <div className="bp-testimonial">
        <Dialog.Root>
          <Dialog.Trigger
            className="bp-video-trigger"
            aria-label={`Assistir depoimento ${item.number}`}
          >
            <Image
              src={item.cover}
              alt={`Depoimento de parceiro Checkmate ${item.number}`}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              className="bp-cover"
            />
            <span className="bp-play">
              <Play fill="currentColor" size={26} />
            </span>
            <span className="bp-video-label">
              Assistir à experiência completa
            </span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bp-dialog-overlay" />
            <Dialog.Content
              className="bp-dialog-content bp-video-dialog"
              aria-describedby={undefined}
            >
              <Dialog.Title className="bp-sr-only">{item.title}</Dialog.Title>
              <Dialog.Close
                className="bp-dialog-close"
                aria-label="Fechar vídeo"
              >
                <X />
              </Dialog.Close>
              <iframe
                src={`${item.src}?autoplay=1&rel=0`}
                title={item.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <div className="bp-testimonial-copy" aria-live="polite">
          <p className="bp-eyebrow">Parceiro Checkmate / {item.number}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="bp-slider-controls">
            <button
              aria-label="Depoimento anterior"
              title="Depoimento anterior"
              onClick={() =>
                setIndex(
                  (index + content.testimonials.length - 1) %
                    content.testimonials.length,
                )
              }
            >
              <ArrowLeft />
            </button>
            <span>
              {index + 1} / {content.testimonials.length}
            </span>
            <button
              aria-label="Próximo depoimento"
              title="Próximo depoimento"
              onClick={() =>
                setIndex((index + 1) % content.testimonials.length)
              }
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="bp-section-end">
        <p>Conheça a proposta e avalie o seu próximo passo.</p>
        <GoldButton />
      </div>
    </Section>
  );
}
