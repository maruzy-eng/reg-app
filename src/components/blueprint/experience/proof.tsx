"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "radix-ui";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
} from "lucide-react";

import {
  blueprintExperience as content,
  type BlueprintCase,
} from "@/lib/blueprint/experience";

/* =========================================================
   SHARED
========================================================= */

const container =
  "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16";

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-px w-8 ${
          dark ? "bg-[#C5A258]" : "bg-[#8B6A2E]"
        }`}
      />

      <p
        className={`text-[0.58rem] font-bold uppercase tracking-[0.2em] ${
          dark ? "text-[#D3B264]" : "text-[#8B6A2E]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function GoldButton({
  children = "Quero conhecer o Blueprint",
  href = "#formb",
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="
        group inline-flex min-h-[52px] items-center justify-center gap-3
        border border-[#C5A258] bg-[#C5A258]
        px-6 py-3.5
        text-[0.67rem] font-bold uppercase tracking-[0.14em]
        text-[#0A0A0A]
        transition duration-300
        hover:border-[#D3B264] hover:bg-[#D3B264]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#D3B264]
      "
    >
      <span>{children}</span>

      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="
          transition-transform duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      />
    </a>
  );
}

function SliderButton({
  label,
  onClick,
  children,
  dark = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`
        grid h-11 w-11 shrink-0 place-items-center
        rounded-full border transition duration-300
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#C5A258]
        ${
          dark
            ? "border-white/20 text-white hover:border-[#C5A258] hover:bg-[#C5A258] hover:text-[#0A0A0A]"
            : "border-black/15 text-[#171614] hover:border-[#C5A258] hover:bg-[#C5A258] hover:text-[#0A0A0A]"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =========================================================
   CASE DIALOG
========================================================= */

function CaseDialog({ project }: { project: BlueprintCase }) {
  const facts = [
    ["Aquisição", project.acquisition],
    ["Planejamento", project.planning],
    ["Obra", project.construction],
    ["Resultado", project.result],
  ].filter(([, value]) => Boolean(value));

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="
            group mt-4 inline-flex items-center gap-3
            border-b border-[#8B6A2E]
            pb-2
            text-[0.67rem] font-bold uppercase tracking-[0.12em]
            text-[#29251F]
            transition-colors
            hover:text-[#8B6A2E]
          "
        >
          Ver case

          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0 z-[100]
            bg-black/80 backdrop-blur-[3px]
            data-[state=closed]:animate-out
            data-[state=open]:animate-in
            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0
          "
        />

        <Dialog.Content
          aria-describedby={`case-description-${project.id}`}
          className="
            fixed left-1/2 top-1/2 z-[101]
            max-h-[90dvh] w-[calc(100%-32px)] max-w-[920px]
            -translate-x-1/2 -translate-y-1/2
            overflow-y-auto
            bg-[#0A0B0A]
            text-[#F5F3EE]
            shadow-2xl
            outline-none
            data-[state=closed]:animate-out
            data-[state=open]:animate-in
            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95
            data-[state=open]:zoom-in-95
          "
        >
          <Dialog.Close
            aria-label="Fechar case"
            className="
              absolute right-4 top-4 z-20
              grid h-11 w-11 place-items-center
              rounded-full border border-white/25
              bg-black/60 text-white
              backdrop-blur-md
              transition
              hover:border-[#D3B264]
              hover:bg-[#D3B264]
              hover:text-black
            "
          >
            <X size={18} />
          </Dialog.Close>

          {project.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171A18]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/50" />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-10">
            <Eyebrow dark>
              {project.category} · {project.location}
            </Eyebrow>

            <Dialog.Title
              className="
                mt-5 max-w-[700px]
                text-[clamp(2rem,4vw,3.4rem)]
                font-medium leading-[1.02]
                tracking-[-0.05em]
                text-[#F5F3EE]
              "
            >
              {project.title}
            </Dialog.Title>

            <Dialog.Description
              id={`case-description-${project.id}`}
              className="
                mt-6 max-w-[720px]
                text-[0.94rem] leading-[1.85]
                text-white/60
              "
            >
              {project.context}
            </Dialog.Description>

            {facts.length > 0 && (
              <dl
                className="
                  mt-9 grid
                  border-t border-white/15
                  sm:grid-cols-2
                "
              >
                {facts.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`
                      border-b border-white/10 py-6
                      sm:px-6
                      ${index % 2 === 0 ? "sm:pl-0" : "sm:border-l"}
                    `}
                  >
                    <dt
                      className="
                        text-[0.57rem] font-bold uppercase
                        tracking-[0.18em]
                        text-[#D3B264]
                      "
                    >
                      {label}
                    </dt>

                    <dd
                      className="
                        mt-3 text-[0.86rem]
                        leading-[1.7]
                        text-white/65
                      "
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div
              className="
                mt-8 flex flex-col gap-5
                border-t border-white/10 pt-6
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >
              <p
                className="
                  text-[0.68rem] uppercase
                  tracking-[0.1em]
                  text-white/45
                "
              >
                Status no portfólio:{" "}
                <span className="text-white/75">{project.status}</span>
              </p>

              {project.href && (
                <a
                  href={project.href}
                  className="
                    group inline-flex items-center gap-3
                    text-[0.67rem] font-bold uppercase
                    tracking-[0.12em]
                    text-[#D3B264]
                    transition-colors
                    hover:text-white
                  "
                >
                  Explorar propriedade

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

export function BlueprintProjects({
  projects,
}: {
  projects: BlueprintCase[];
}) {
  const featured = projects.slice(0, 3);

  const portfolio = useRef<HTMLDivElement>(null);

  const moveProject = (direction: number) => {
    const track = portfolio.current;
    const slide = track?.querySelector<HTMLElement>(
      "[data-project-slide]",
    );

    if (!track || !slide) return;

    const gap = 32;

    track.scrollBy({
      left:
        direction *
        (slide.getBoundingClientRect().width + gap),
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section
      id="projetos"
      className="
        scroll-mt-24
        bg-[#F3EFE6]
        py-20 text-[#171614]
        sm:py-24
        lg:py-28
        xl:py-32
      "
    >
      <div className={container}>
        <div
          className="
            flex flex-col gap-10
            lg:flex-row lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-[880px]">
            <Eyebrow>
              {content.sections.projects.eyebrow}
            </Eyebrow>

            <h2
              className="
                mt-7 max-w-[850px]
                text-[clamp(2.7rem,5vw,5rem)]
                font-medium leading-[0.97]
                tracking-[-0.055em]
                text-[#171614]
              "
            >
              {content.sections.projects.title}
            </h2>

            {content.sections.projects.description && (
              <p
                className="
                  mt-7 max-w-[620px]
                  text-[0.98rem] leading-[1.85]
                  text-[#5F5951]
                "
              >
                {content.sections.projects.description}
              </p>
            )}
          </div>

          {featured.length > 1 && (
            <div className="flex gap-3">
              <SliderButton
                label="Projeto anterior"
                onClick={() => moveProject(-1)}
              >
                <ArrowLeft size={17} />
              </SliderButton>

              <SliderButton
                label="Próximo projeto"
                onClick={() => moveProject(1)}
              >
                <ArrowRight size={17} />
              </SliderButton>
            </div>
          )}
        </div>

        {featured.length > 0 ? (
          <div
            ref={portfolio}
            tabIndex={0}
            role="region"
            aria-label="Projetos do portfólio Checkmate"
            className="
              -mx-5 mt-14 flex snap-x snap-mandatory
              gap-8 overflow-x-auto px-5 pb-6
              [scrollbar-width:thin]
              sm:-mx-8 sm:px-8
              lg:mx-0 lg:mt-16 lg:px-0
            "
          >
            {featured.map((project, index) => (
              <article
                key={project.id}
                data-project-slide
                className="
                  group min-w-0
                  flex-[0_0_92%]
                  snap-start
                  sm:flex-[0_0_84%]
                  lg:flex-[0_0_78%]
                  xl:flex-[0_0_72%]
                "
              >
                <div
                  className="
                    relative aspect-[1.35]
                    overflow-hidden
                    bg-[#D8D3C9]
                    sm:aspect-[1.7]
                    lg:aspect-[1.9]
                  "
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 760px) 92vw, 80vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.015]
                      "
                    />
                  ) : (
                    <div
                      className="
                        absolute inset-0 grid place-items-center
                        p-8 text-center text-sm
                        text-[#69645D]
                      "
                    >
                      Registro fotográfico em preparação
                    </div>
                  )}

                  <div
                    className="
                      absolute inset-x-0 bottom-0
                      h-[35%]
                      bg-gradient-to-b
                      from-transparent to-black/55
                    "
                  />

                  <span
                    className="
                      absolute bottom-5 left-5
                      text-[0.56rem] font-bold
                      uppercase tracking-[0.16em]
                      text-white/80
                    "
                  >
                    Projeto {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  className="
                    grid gap-6
                    border-b border-black/15
                    py-7
                    sm:grid-cols-[1fr_auto]
                    sm:items-start
                  "
                >
                  <div>
                    <p
                      className="
                        text-[0.57rem] font-bold
                        uppercase tracking-[0.18em]
                        text-[#8B6A2E]
                      "
                    >
                      {project.category}
                    </p>

                    <h3
                      className="
                        mt-3 text-[clamp(1.55rem,2.7vw,2.4rem)]
                        font-medium leading-[1.08]
                        tracking-[-0.04em]
                        text-[#171614]
                      "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                        mt-3 text-[0.76rem]
                        text-[#6A645B]
                      "
                    >
                      {project.location}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p
                      className="
                        text-[0.63rem]
                        uppercase tracking-[0.1em]
                        text-[#6A645B]
                      "
                    >
                      {project.status}
                    </p>

                    <CaseDialog project={project} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            className="
              mt-14 border-y border-black/15
              py-10
            "
          >
            <p className="text-sm text-[#5F5951]">
              Conheça com nosso time os projetos disponíveis para
              apresentação.
            </p>
          </div>
        )}

        <div
          className="
            mt-10 flex flex-col gap-7
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <a
            href="/properties"
            className="
              group inline-flex w-fit items-center
              gap-3 border-b border-black/20
              pb-2
              text-[0.68rem] font-semibold
              uppercase tracking-[0.12em]
              text-[#3E3932]
              transition
              hover:border-[#8B6A2E]
              hover:text-[#8B6A2E]
            "
          >
            Explorar o portfólio completo

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>

          <GoldButton />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ANIMATED NUMBER
========================================================= */

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
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();

      const start = performance.now();

      const tick = (time: number) => {
        const progress = Math.min(
          1,
          (time - start) / 1000,
        );

        setDisplay(
          Math.round(
            value *
              (1 - Math.pow(1 - progress, 3)),
          ),
        );

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
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
    <span
      ref={ref}
      aria-label={`${value}${suffix}`}
    >
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

/* =========================================================
   EXPERIENCES / ECOSYSTEM
========================================================= */

export function BlueprintExperiences() {
  const track = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    const element = track.current;

    if (!element) return;

    const slide =
      element.querySelector<HTMLElement>(
        "[data-experience-slide]",
      );

    const width =
      (slide?.getBoundingClientRect().width ||
        element.clientWidth) + 24;

    element.scrollBy({
      left: direction * width,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <section
      id="networking"
      className="
        scroll-mt-24
        bg-[#070707]
        py-20 text-[#F5F3EE]
        sm:py-24
        lg:py-28
        xl:py-32
      "
    >
      <div className={container}>
        <div
          className="
            grid gap-10
            lg:grid-cols-[1fr_auto]
            lg:items-end
          "
        >
          <div className="max-w-[900px]">
            <Eyebrow dark>
              {content.sections.network.eyebrow}
            </Eyebrow>

            <h2
              className="
                mt-7 max-w-[820px]
                text-[clamp(2.6rem,4.8vw,4.8rem)]
                font-medium leading-[0.98]
                tracking-[-0.055em]
                text-[#F5F3EE]
              "
            >
              {content.sections.network.title}
            </h2>

            {content.sections.network.description && (
              <p
                className="
                  mt-7 max-w-[620px]
                  text-[0.98rem] leading-[1.85]
                  text-white/60
                "
              >
                {content.sections.network.description}
              </p>
            )}
          </div>

          {content.gallery.length > 1 && (
            <div className="flex gap-3">
              <SliderButton
                dark
                label="Fotos anteriores"
                onClick={() => move(-1)}
              >
                <ArrowLeft size={17} />
              </SliderButton>

              <SliderButton
                dark
                label="Próximas fotos"
                onClick={() => move(1)}
              >
                <ArrowRight size={17} />
              </SliderButton>
            </div>
          )}
        </div>

        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label="Experiências Checkmate"
          className="
            -mx-5 mt-14 flex snap-x
            snap-mandatory gap-6
            overflow-x-auto px-5 pb-7
            [scrollbar-width:thin]
            sm:-mx-8 sm:px-8
            lg:mx-0 lg:mt-16 lg:px-0
          "
        >
          {content.gallery.map((image, index) => (
            <figure
              key={image.src}
              data-experience-slide
              className="
                group flex-[0_0_88%]
                snap-start
                sm:flex-[0_0_72%]
                lg:flex-[0_0_58%]
              "
            >
              <div
                className="
                  relative aspect-[1.25]
                  overflow-hidden
                  bg-[#171A18]
                  sm:aspect-[1.65]
                  lg:aspect-[1.8]
                "
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 700px) 88vw, 60vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.015]
                  "
                />

                <div
                  className="
                    absolute inset-x-0 bottom-0
                    h-[35%]
                    bg-gradient-to-b
                    from-transparent to-black/55
                  "
                />
              </div>

              <figcaption
                className="
                  grid grid-cols-[42px_1fr]
                  gap-4 border-b border-white/10
                  py-5
                "
              >
                <span
                  className="
                    text-[0.58rem] font-bold
                    text-[#D3B264]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  className="
                    max-w-[560px]
                    text-[0.8rem] leading-[1.7]
                    text-white/60
                  "
                >
                  {image.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="
            mt-12 border-t
            border-white/15 pt-7
          "
        >
          <p
            className="
              text-[0.56rem] font-bold
              uppercase tracking-[0.18em]
              text-[#D3B264]
            "
          >
            Ecossistema
          </p>

          <ul
            aria-label="Rede profissional Checkmate"
            className="
              mt-6 flex flex-wrap
              gap-x-8 gap-y-4
            "
          >
            {content.network.map((partner) => (
              <li
                key={partner}
                className="
                  flex items-center gap-3
                  text-[0.72rem]
                  uppercase tracking-[0.08em]
                  text-white/55
                "
              >
                <span className="h-1 w-1 rounded-full bg-[#C5A258]" />
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

export function BlueprintTestimonials() {
  const [index, setIndex] = useState(0);

  if (!content.testimonials.length) {
    return null;
  }

  const item = content.testimonials[index];

  const previous = () => {
    setIndex(
      (current) =>
        (current +
          content.testimonials.length -
          1) %
        content.testimonials.length,
    );
  };

  const next = () => {
    setIndex(
      (current) =>
        (current + 1) %
        content.testimonials.length,
    );
  };

  return (
    <section
      id="depoimentos"
      className="
        scroll-mt-24
        bg-[#0C0D0C]
        py-20 text-[#F5F3EE]
        sm:py-24
        lg:py-28
        xl:py-32
      "
    >
      <div className={container}>
        <div className="max-w-[900px]">
          <Eyebrow dark>
            {content.sections.testimonials.eyebrow}
          </Eyebrow>

          <h2
            className="
              mt-7 max-w-[850px]
              text-[clamp(2.6rem,4.8vw,4.8rem)]
              font-medium leading-[0.98]
              tracking-[-0.055em]
              text-[#F5F3EE]
            "
          >
            {content.sections.testimonials.title}
          </h2>

          {content.sections.testimonials.description && (
            <p
              className="
                mt-7 max-w-[620px]
                text-[0.98rem] leading-[1.85]
                text-white/60
              "
            >
              {content.sections.testimonials.description}
            </p>
          )}
        </div>

        <div
          className="
            mt-14 grid gap-10
            lg:mt-16
            lg:grid-cols-[1.55fr_0.75fr]
            lg:items-center
            lg:gap-16
            xl:gap-24
          "
        >
          {/* VIDEO */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label={`Assistir depoimento ${item.number}`}
                className="
                  group relative block
                  aspect-video w-full
                  overflow-hidden
                  bg-black text-left
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#C5A258]
                "
              >
                <Image
                  key={item.cover}
                  src={item.cover}
                  alt={`Depoimento de parceiro Checkmate ${item.number}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 65vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.015]
                  "
                />

                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />

                <div
                  className="
                    absolute inset-x-0 bottom-0
                    h-[45%]
                    bg-gradient-to-b
                    from-transparent to-black/80
                  "
                />

                <span
                  className="
                    absolute left-1/2 top-1/2
                    grid h-16 w-16
                    -translate-x-1/2
                    -translate-y-1/2
                    place-items-center
                    rounded-full
                    bg-[#F5F3EE]
                    text-[#171614]
                    transition duration-300
                    group-hover:scale-105
                    group-hover:bg-[#D3B264]
                    sm:h-20 sm:w-20
                  "
                >
                  <Play
                    fill="currentColor"
                    size={24}
                    className="translate-x-[2px]"
                  />
                </span>

                <span
                  className="
                    absolute bottom-5 left-5
                    text-[0.58rem] font-bold
                    uppercase tracking-[0.16em]
                    text-white/80
                    sm:bottom-7 sm:left-7
                  "
                >
                  Assistir à experiência completa
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay
                className="
                  fixed inset-0 z-[100]
                  bg-black/90
                  backdrop-blur-sm
                "
              />

              <Dialog.Content
                aria-describedby={undefined}
                className="
                  fixed left-1/2 top-1/2
                  z-[101]
                  w-[calc(100%-24px)]
                  max-w-[1100px]
                  -translate-x-1/2
                  -translate-y-1/2
                  overflow-hidden
                  bg-black
                  shadow-2xl
                  outline-none
                "
              >
                <Dialog.Title className="sr-only">
                  {item.title}
                </Dialog.Title>

                <Dialog.Close
                  aria-label="Fechar vídeo"
                  className="
                    absolute right-3 top-3
                    z-20 grid h-11 w-11
                    place-items-center
                    rounded-full
                    border border-white/25
                    bg-black/65 text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <X size={18} />
                </Dialog.Close>

                <iframe
                  src={`${item.src}?autoplay=1&rel=0`}
                  title={item.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="block aspect-video w-full border-0"
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          {/* COPY */}
          <div
            aria-live="polite"
            className="
              border-t border-white/15
              pt-8 lg:border-t-0 lg:pt-0
            "
          >
            <p
              className="
                text-[0.57rem] font-bold
                uppercase tracking-[0.18em]
                text-[#D3B264]
              "
            >
              Relato em vídeo · {item.number}
            </p>

            <blockquote
              className="
                mt-7 text-[clamp(1.4rem,2.4vw,2rem)]
                font-medium leading-[1.45]
                tracking-[-0.035em]
                text-[#F5F3EE]
              "
            >
              {item.description}
            </blockquote>

            <p
              className="
                mt-6 text-[0.72rem]
                uppercase tracking-[0.08em]
                text-white/45
              "
            >
              {item.title}
            </p>

            <div
              className="
                mt-9 flex items-center gap-3
                border-t border-white/10 pt-7
              "
            >
              <SliderButton
                dark
                label="Depoimento anterior"
                onClick={previous}
              >
                <ArrowLeft size={17} />
              </SliderButton>

              <span
                className="
                  min-w-[50px] text-center
                  text-[0.65rem]
                  tabular-nums
                  text-white/45
                "
              >
                {String(index + 1).padStart(2, "0")}
                {" / "}
                {String(
                  content.testimonials.length,
                ).padStart(2, "0")}
              </span>

              <SliderButton
                dark
                label="Próximo depoimento"
                onClick={next}
              >
                <ArrowRight size={17} />
              </SliderButton>
            </div>
          </div>
        </div>

        <div
          className="
            mt-14 flex flex-col gap-7
            border-t border-white/10
            pt-8
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[480px]
              text-[0.82rem] leading-[1.7]
              text-white/50
            "
          >
            Conheça a proposta e avalie o seu próximo passo.
          </p>

          <GoldButton />
        </div>
      </div>
    </section>
  );
}