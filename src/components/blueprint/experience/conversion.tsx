import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { blueprintExperience as content } from "@/lib/blueprint/experience";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import type { SiteSettingsValue } from "@/lib/site-settings";
import { SITE_CONTACT } from "@/lib/home/contact";
import { GoldButton, Section, SectionHeader } from "./ui";

export function BlueprintOffer({
  form,
  fields,
}: {
  form: DynamicForm | null;
  fields: DynamicFormField[];
}) {
  const hasMoment = fields.some((field) =>
    /momento|perfil|moment|profile|occupation/i.test(
      `${field.name} ${field.label}`,
    ),
  );
  const displayFields: DynamicFormField[] = fields.map((field) => ({
    ...field,
    ...(field.type === "state" ||
    /^(states?(_us)?|us_state|estado)$/i.test(field.name)
      ? { label: "Estado" }
      : {}),
    ...(field.type === "phone" && field.help_text === "US phone format."
      ? { help_text: "Telefone dos Estados Unidos." }
      : {}),
  }));
  if (form && !hasMoment)
    displayFields.push({
      id: "blueprint-current-moment",
      form_id: form.id,
      name: "blueprint_moment",
      label: "Qual seu momento hoje?",
      type: "select",
      required: true,
      placeholder: "Selecione seu momento",
      help_text: null,
      default_value: null,
      options: [...content.momentOptions],
      sort_order: fields.length,
      created_at: form.created_at,
      updated_at: form.updated_at,
    });
  return (
    <Section id="formb" className="bp-offer" light>
      <div className="bp-split">
        <div>
          <SectionHeader {...content.sections.offer} />
          <ul className="bp-offer-list">
            {content.offerItems.map((item) => (
              <li key={item}>
                <ArrowUpRight size={18} />
                {item}
              </li>
            ))}
          </ul>
          <p className="bp-form-note">
            Uma conversa sobre seu momento, seus objetivos e os próximos passos.
          </p>
        </div>
        <div className="bp-lead-form blueprint-dynamic-form">
          <p className="bp-eyebrow">Converse com a Checkmate</p>
          <h3>Vamos entender seu próximo passo.</h3>
          {form ? (
            <DynamicFormComponent
              form={{ ...form, submit_button_label: content.conversation }}
              fields={displayFields}
            />
          ) : (
            <div className="bp-form-fallback">
              <p>Nosso time pode ajudar você a conhecer o Blueprint.</p>
              <a className="bp-button" href={SITE_CONTACT.phoneHref}>
                Falar com o time
                <ArrowUpRight size={18} />
              </a>
            </div>
          )}
          <p className="bp-privacy">
            Seus dados serão tratados conforme nossa{" "}
            <a href="/privacy-policy">Política de Privacidade</a>.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function BlueprintFAQ() {
  return (
    <Section id="faq">
      <div className="bp-faq-layout">
        <SectionHeader {...content.sections.faq} />
        <div>
          {content.faq.map(([question, answer]) => (
            <details
              className="bp-faq-item"
              key={question}
              name="blueprint-faq"
            >
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
          <div className="bp-faq-cta">
            <GoldButton />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function BlueprintFinalCTA() {
  return (
    <section className="bp-final">
      <Image
        src={content.hero.image}
        alt={content.hero.imageAlt}
        fill
        loading="eager"
        sizes="100vw"
        className="bp-cover"
      />
      <div className="bp-final-shade" />
      <div className="bp-container">
        <p className="bp-eyebrow">{content.final.eyebrow}</p>
        <h2>{content.final.title}</h2>
        <p className="bp-final-subtitle">{content.final.subtitle}</p>
        <p>{content.final.description}</p>
        <GoldButton />
        <small>{content.final.microcopy}</small>
      </div>
    </section>
  );
}

export function BlueprintFooter({ settings }: { settings: SiteSettingsValue }) {
  const socials = [
    ["Instagram", settings.instagram_url],
    ["YouTube", settings.youtube_url],
    ["LinkedIn", settings.linkedin_url],
    ["Facebook", settings.facebook_url],
  ].filter(([, href]) => href && /^https?:\/\//.test(href));
  return (
    <footer className="bp-footer">
      <div className="bp-container">
        <div className="bp-footer-top">
          <Link
            href="/"
            aria-label="Checkmate Real Estate Group, página inicial"
          >
            <Image
              src={content.logo}
              alt="Checkmate Real Estate Group"
              width={2048}
              height={658}
            />
          </Link>
          <p>
            Experiência real.
            <br />
            Seu próximo passo, acompanhado.
          </p>
          <nav aria-label="Redes sociais">
            {socials.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </nav>
        </div>
        <div className="bp-footer-bottom">
          <small>
            Copyright © {new Date().getFullYear()} Checkmate Real Estate Group.
            All rights reserved.
          </small>
          <nav aria-label="Links legais">
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-use">Terms</a>
            <a href="/blueprint-terms">Blueprint Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
