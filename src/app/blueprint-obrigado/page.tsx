import type { Metadata } from "next";
import Link from "next/link";

import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
} from "@/components/blueprint/blueprint-ui";
import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import { HOME_HERO_IMAGE } from "@/lib/home/branding";
import { buildPageMetadata } from "@/lib/seo";

const nextSteps = [
  {
    number: "01",
    title: "Análise da aplicação",
    description:
      "Nosso time revisa suas informações para compreender seu momento atual, perfil e objetivos.",
  },
  {
    number: "02",
    title: "Validação do perfil",
    description:
      "A equipe avalia se o Blueprint está alinhado com sua fase e com seus planos no mercado imobiliário.",
  },
  {
    number: "03",
    title: "Orientação para avançar",
    description:
      "Caso exista alinhamento, você receberá uma orientação clara sobre os próximos passos.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Aplicação recebida",
  description:
    "Sua aplicação para o Checkmate Blueprint foi enviada com sucesso.",
  path: "/blueprint-obrigado",
  noIndex: true,
});

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ChannelIcon({ type }: { type: "whatsapp" | "email" }) {
  if (type === "whatsapp") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.8-.8L3 21l1.8-5a8.8 8.8 0 1 1 16.2-4.5Z" />
        <path d="M8.4 8.2c.3 2.4 2.1 4.3 4.6 4.8" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function BlueprintObrigadoPage() {
  return (
    <main className="overflow-x-hidden bg-[#f7f4ed] font-sans text-[#171614] antialiased selection:bg-[#c9a24d] selection:text-white">
      <section className="relative isolate overflow-hidden bg-[#080808] text-white">
        <div
          className="absolute inset-0 -z-40 bg-cover bg-[center_36%] opacity-38"
          style={{
            backgroundImage: `url(${HOME_HERO_IMAGE})`,
          }}
        />

        <div className="absolute inset-0 -z-30 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.91)_52%,rgba(0,0,0,0.82)_100%)]" />

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_100%)]" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(201,162,77,0.17),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(201,162,77,0.07),transparent_24%)]" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,217,146,0.7),transparent)]"
        />

        <div
          className={[
            blueprintContainer,
            "relative px-5 pb-18 pt-9",
            "sm:px-6 sm:pb-22 sm:pt-11",
            "lg:px-8 lg:pb-24",
          ].join(" ")}
        >
          <Link
            href="/blueprint"
            aria-label="Voltar para o Checkmate Blueprint"
            className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={BLUEPRINT_ASSETS.logoLight}
              alt="Checkmate Real Estate Group"
              className="h-auto w-[142px] object-contain sm:w-[158px]"
            />
          </Link>

          <div className="mx-auto mt-14 max-w-[900px] text-center sm:mt-16 lg:mt-20">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#e4c26e]/35 bg-[#c9a24d]/12 text-[#e4c26e] shadow-[0_0_0_12px_rgba(201,162,77,0.06),0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <CheckIcon />
            </div>

            <div className="mt-8 flex justify-center">
              <BlueprintKicker dark>Checkmate Blueprint</BlueprintKicker>
            </div>

            <h1
              className={[
                "mx-auto mt-5 max-w-[860px]",
                blueprintHeadingClass,
                "text-balance text-white",
                "lg:text-[clamp(3.2rem,5vw,5.25rem)]",
              ].join(" ")}
            >
              Aplicação recebida{" "}
              <span className="bg-[linear-gradient(105deg,#fff7dc_0%,#efd992_35%,#d4ad55_70%,#a77d28_100%)] bg-clip-text text-transparent">
                com sucesso
              </span>
            </h1>

            <p
              className={[
                blueprintBodyClass,
                "mx-auto mt-6 max-w-[700px]",
                "text-pretty text-center text-white/62",
              ].join(" ")}
            >
              Obrigado por aplicar para o Checkmate Blueprint. Agora nossa
              equipe vai analisar suas informações e verificar se este é o
              próximo passo certo para a sua jornada no mercado imobiliário
              americano.
            </p>

            <div className="mx-auto mt-9 grid max-w-[720px] gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.045] px-5 py-4 text-left backdrop-blur-xl">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#c9a24d]/12 text-[#e4c26e]">
                  <ChannelIcon type="whatsapp" />
                </span>

                <div>
                  <span className="block text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#e4c26e]">
                    WhatsApp
                  </span>
                  <p className="mt-1 text-[0.78rem] leading-[1.5] text-white/52">
                    Fique atento a uma possível mensagem da equipe.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.045] px-5 py-4 text-left backdrop-blur-xl">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#c9a24d]/12 text-[#e4c26e]">
                  <ChannelIcon type="email" />
                </span>

                <div>
                  <span className="block text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#e4c26e]">
                    E-mail
                  </span>
                  <p className="mt-1 text-[0.78rem] leading-[1.5] text-white/52">
                    Verifique também sua caixa de entrada e o spam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,#f7f4ed)]"
        />
      </section>

      <section className="relative overflow-hidden py-18 sm:py-22 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-42 [background-image:linear-gradient(rgba(201,162,77,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.06)_1px,transparent_1px)] [background-size:52px_52px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-160px] top-[-100px] h-[380px] w-[380px] rounded-full bg-[#c9a24d]/10 blur-[120px]"
        />

        <div className={`relative z-[1] ${blueprintContainer}`}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <article className="relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-white p-7 shadow-[0_24px_72px_rgba(15,15,15,0.07)] sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c9a24d]/10 blur-[75px]"
              />

              <BlueprintKicker>Status da aplicação</BlueprintKicker>

              <h2 className="mt-5 text-[clamp(1.65rem,2.5vw,2.1rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#171614]">
                Sua aplicação já está em análise.
              </h2>

              <p className="mt-4 max-w-[470px] text-[0.95rem] leading-[1.72] text-[#68635b]">
                A equipe irá revisar seus dados e avaliar o melhor
                direcionamento para o seu momento atual.
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-black/[0.07] pt-6">
                <span className="h-2 w-2 rounded-full bg-[#c9a24d] shadow-[0_0_0_6px_rgba(201,162,77,0.12)]" />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#8d7751]">
                  Status: recebida
                </span>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[30px] border border-[#c9a24d]/20 bg-[#171614] p-7 text-white shadow-[0_28px_80px_rgba(15,15,15,0.14)] sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#c9a24d]/14 blur-[90px]"
              />

              <BlueprintKicker dark>Informação importante</BlueprintKicker>

              <h2 className="mt-5 text-[clamp(1.65rem,2.5vw,2.1rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
                Mantenha seus canais de contato disponíveis.
              </h2>

              <p className="mt-4 max-w-[600px] text-[0.95rem] leading-[1.72] text-white/58">
                Caso sua aplicação avance, um especialista da Checkmate poderá
                entrar em contato pelo telefone ou e-mail informados no
                formulário.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white/55">
                  WhatsApp
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.13em] text-white/55">
                  E-mail
                </span>
              </div>
            </article>
          </div>

          <div className="mt-16 border-t border-black/[0.08] pt-12 sm:mt-20 sm:pt-14">
            <BlueprintKicker>Próximos passos</BlueprintKicker>

            <h2
              className={[
                "mt-4 max-w-[680px] text-[#171614]",
                blueprintHeadingClass,
              ].join(" ")}
            >
              O que acontece agora?
            </h2>

            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute left-[16.5%] right-[16.5%] top-6 hidden h-px bg-[linear-gradient(90deg,transparent,#c9a24d,transparent)] md:block"
              />

              <div className="grid gap-5 md:grid-cols-3">
                {nextSteps.map((step) => (
                  <article key={step.number} className="group relative md:pt-14">
                    <div className="absolute left-1/2 top-0 z-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#c9a24d] bg-[#f7f4ed] shadow-[0_0_0_7px_rgba(201,162,77,0.12)] md:block">
                      <span className="absolute inset-[5px] rounded-full bg-[#c9a24d]" />
                    </div>

                    <div className="h-full rounded-[27px] border border-black/[0.07] bg-white p-7 shadow-[0_18px_55px_rgba(15,15,15,0.055)] transition-[transform,border-color,box-shadow] duration-400 group-hover:-translate-y-1.5 group-hover:border-[#c9a24d]/35 group-hover:shadow-[0_28px_72px_rgba(15,15,15,0.1)]">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a24d]/25 bg-[#f7efd9] text-[0.7rem] font-bold text-[#a77d28]">
                          {step.number}
                        </span>

                        <span className="text-[0.56rem] font-bold uppercase tracking-[0.15em] text-[#a77d28]/42">
                          Etapa
                        </span>
                      </div>

                      <h3 className="mt-8 text-[1.22rem] font-semibold leading-[1.18] tracking-[-0.035em] text-[#171614]">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-[0.9rem] leading-[1.7] text-[#68635b]">
                        {step.description}
                      </p>

                      <span className="mt-7 block h-px w-10 bg-[#a77d28]/40 transition-all duration-400 group-hover:w-16 group-hover:bg-[#a77d28]" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-6 rounded-[28px] border border-black/[0.07] bg-white px-7 py-8 shadow-[0_20px_60px_rgba(15,15,15,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <div>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#a77d28]">
                Continue conhecendo o método
              </span>

              <p className="mt-2 max-w-[560px] text-[0.9rem] leading-[1.65] text-[#716b62]">
                Volte à página do Blueprint para explorar novamente a proposta,
                os projetos e o ecossistema Checkmate.
              </p>
            </div>

            <div className="shrink-0">
              <BlueprintGoldButton href="/blueprint">
                Voltar ao Blueprint
              </BlueprintGoldButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}