import { ArrowUpRight } from "lucide-react";

import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { blueprintExperience as content } from "@/lib/blueprint/experience";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import { SITE_CONTACT } from "@/lib/home/contact";
import { BlueprintEyebrow, blueprintContainer } from "./shared";

export function Blueprint012Offer({
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

  if (form && !hasMoment) {
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
  }

  const benefits = [
    "Acompanhamento",
    "Projetos reais",
    "Estratégia",
    "Networking",
    "Ecossistema Checkmate",
  ];

  return (
    <section
      id="formb"
      className="bg-[#EDE7DC] py-20 text-[#171614] sm:py-24 lg:py-28 xl:py-32"
    >
      <div className={blueprintContainer}>
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div className="lg:pt-4">
            <BlueprintEyebrow>Seu próximo passo</BlueprintEyebrow>

            <h2 className="mt-7 max-w-[560px] text-[clamp(2.6rem,4.6vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#171614]">
              Vamos entender
              <span className="mt-2 block text-[#9A7938]">
                o seu momento.
              </span>
            </h2>

            <p className="mt-8 max-w-[510px] text-[1rem] leading-[1.85] text-[#514C44]">
              Converse com um analista da Checkmate e entenda se o Blueprint
              faz sentido para o momento em que você está agora.
            </p>

            <ul className="mt-10 max-w-[520px] border-t border-black/15">
              {benefits.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[44px_1fr] items-center border-b border-black/10 py-4"
                >
                  <span className="text-[0.56rem] font-bold text-[#9A7938]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.84rem] font-medium text-[#3F3A34]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[500px] text-[0.75rem] leading-[1.75] text-[#6A645B]">
              Apresente seu cenário e esclareça o escopo, o formato e as
              condições de participação antes de decidir.
            </p>
          </div>

          <div className="border-t-2 border-[#C5A258] bg-[#F8F5EF] p-6 shadow-[0_30px_70px_rgba(38,31,19,0.08)] sm:p-8 lg:p-10 xl:p-12">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#8B6A2E]">
              Checkmate Blueprint · Qualificação
            </p>

            <h3 className="mt-5 max-w-[500px] text-[clamp(1.9rem,3vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[#1B1916]">
              Conte um pouco sobre o seu momento.
            </h3>

            <p className="mt-4 max-w-[520px] text-[0.86rem] leading-[1.75] text-[#5F5951]">
              Não é uma inscrição automática. A conversa serve para entender
              seu perfil, seus objetivos e o tipo de próximo passo que faz
              sentido.
            </p>

            <div className="blueprint-dynamic-form mt-9">
              {form ? (
                <DynamicFormComponent
                  form={{
                    ...form,
                    submit_button_label: content.conversation,
                  }}
                  fields={displayFields}
                />
              ) : (
                <div className="border border-black/10 bg-white p-6">
                  <p className="text-sm leading-7 text-[#514C44]">
                    Nosso time pode ajudar você a conhecer o Blueprint.
                  </p>
                  <a
                    href={SITE_CONTACT.phoneHref}
                    className="mt-5 inline-flex min-h-12 items-center gap-3 bg-[#C5A258] px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#0B0B0B]"
                  >
                    Falar com o time
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
            </div>

            <p className="mt-6 text-[0.68rem] leading-[1.7] text-[#6A645B]">
              Seus dados serão tratados conforme nossa{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-[#514C44] underline underline-offset-4"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
