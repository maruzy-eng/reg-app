import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { blueprintFormPoints } from "@/lib/blueprint/content";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import {
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";

type BlueprintFormProps = {
  form: DynamicForm | null;
  fields: DynamicFormField[];
};

export function BlueprintForm({ form, fields }: BlueprintFormProps) {
  return (
    <section id="formb" className="relative overflow-hidden bg-[#f8f6f1] py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-[#c9a24d]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-[#c9a24d]/[0.08] blur-[110px]"
      />

      <div className={`relative ${blueprintContainer}`}>
        <div className="overflow-hidden rounded-[32px] border border-black/[0.07] bg-white shadow-[0_30px_90px_rgba(15,15,15,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <aside className="relative overflow-hidden bg-[#090909] px-7 py-10 text-white sm:px-10 sm:py-12 lg:px-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#c9a24d]/20 blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(201,162,77,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.1)_1px,transparent_1px)] [background-size:42px_42px]"
              />

              <div className="relative max-w-[34rem]">
                <BlueprintKicker dark>Fale com um analista</BlueprintKicker>
                <h2 className={`mt-4 ${blueprintHeadingClass}`}>
                  Pronto para entender se o{" "}
                  <span className="text-[#e4c26e]">Blueprint</span> faz sentido
                  para você?
                </h2>
                <p className={`${blueprintBodyClass} text-white/55`}>
                  Preencha o formulário e um analista da Checkmate vai avaliar
                  seu momento, entender seu objetivo e explicar quais caminhos
                  fazem mais sentido para você entrar no mercado imobiliário
                  americano com estrutura.
                </p>

                <ul className="mt-9 grid gap-3">
                  {blueprintFormPoints.map((text, index) => (
                    <li
                      key={text}
                      className="flex gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c9a24d]/18 text-[0.7rem] font-bold text-[#e4c26e]">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-[0.84rem] leading-[1.6] text-white/70">
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-[22px] border border-[#c9a24d]/25 bg-[#c9a24d]/10 p-6">
                  <strong className="text-[1rem] font-semibold text-[#efd992]">
                    Atendimento com direção, não com promessa.
                  </strong>
                  <p className="mt-3 text-[0.82rem] leading-[1.65] text-white/55">
                    A conversa serve para entender seu cenário e mostrar com
                    clareza o que é possível construir dentro do mercado
                    imobiliário americano.
                  </p>
                </div>
              </div>
            </aside>

            <div className="blueprint-dynamic-form px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
              <div className="mb-8">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#8b6721]">
                  Formulário
                </p>
                <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.035em] text-[#171614]">
                  Conte um pouco sobre você
                </h3>
                <p className="mt-2 max-w-[34rem] text-[0.9rem] leading-[1.65] text-[#68635b]">
                  Nosso time analisa cada aplicação e retorna com a orientação
                  mais adequada para o seu momento.
                </p>
              </div>

              {form ? (
                <DynamicFormComponent form={form} fields={fields} />
              ) : (
                <div className="rounded-[24px] border border-dashed border-black/15 bg-[#f8f6f1] px-6 py-10 text-center">
                  <p className="text-[0.95rem] text-[#68635b]">
                    O formulário ainda não está publicado. Conecte o formulário
                    Blueprint na área administrativa de Forms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
