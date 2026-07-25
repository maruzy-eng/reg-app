import type { Metadata } from "next";
import Link from "next/link";

import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";
import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import { SITE_CONTACT } from "@/lib/home/contact";
import { HOME_HERO_IMAGE } from "@/lib/home/branding";
import { buildPageMetadata } from "@/lib/seo";

const benefits = [
  {
    number: "01",
    title: "Estruturação Legal e Operacional",
    description:
      "Apoio na abertura da sua empresa nos EUA (LLC) e direcionamento jurídico e contábil para operar com segurança.",
  },
  {
    number: "02",
    title: "Mentoria Aplicada e Estratégica",
    description:
      "Acompanhamento prático voltado à análise de negócios, tomada de decisão e execução real no mercado.",
  },
  {
    number: "03",
    title: "Programa Educacional Blueprint",
    description:
      "Conteúdos estruturados para aprofundar processos, estratégias e boas práticas do Real Estate nos EUA.",
  },
  {
    number: "04",
    title: "Plataformas Exclusivas",
    description:
      "Acesso à Checkmate Property para análise de projetos e à Checkmate Builder para gestão de obras, custos e cronogramas.",
  },
  {
    number: "05",
    title: "Website Institucional",
    description:
      "Criação do site da sua empresa nos EUA, com identidade visual, logo, imagens e informações institucionais.",
  },
  {
    number: "06",
    title: "Acesso a Operações Reais",
    description:
      "Participação e acompanhamento de projetos ativos de Flip Houses e New Construction, com visão prática dos bastidores.",
  },
  {
    number: "07",
    title: "Redução de Risco e Suporte",
    description:
      "Método, processos testados e suporte contínuo para minimizar riscos e evitar erros comuns no início da operação.",
  },
  {
    number: "08",
    title: "Networking e Crescimento",
    description:
      "Integração a um ecossistema profissional e preparação para crescimento e escala no mercado imobiliário americano.",
  },
] as const;

const nextSteps = [
  {
    number: "01",
    title: "Contato do nosso time",
    description:
      "Nossa equipe entrará em contato pelos canais informados durante sua inscrição.",
  },
  {
    number: "02",
    title: "Liberação dos acessos",
    description:
      "Você receberá as orientações para acessar as plataformas e os ambientes do programa.",
  },
  {
    number: "03",
    title: "Início da integração",
    description:
      "O time conduzirá os primeiros alinhamentos para organizar o início da sua jornada.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: "Entrada confirmada — Checkmate Blueprint",
  description:
    "Bem-vindo ao Programa Checkmate Blueprint. Sua entrada está confirmada.",
  path: "/blueprint-thanks",
  noIndex: true,
});

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function BlueprintThanksPage() {
  return (
    <main className="overflow-x-hidden bg-[#f5f2eb] font-sans text-[#171614] antialiased selection:bg-[#c9a24d] selection:text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#030303] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-50 bg-cover bg-center opacity-[0.22]"
          style={{
            backgroundImage: `url(${HOME_HERO_IMAGE})`,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-40 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.95)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.5)_56%,#030303_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_34%,rgba(201,162,77,0.13),transparent_32%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a24d]/10"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a24d]/[0.06]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(228,194,110,0.6),transparent)]"
        />

        <div
          className={[
            blueprintContainer,
            "relative mx-auto px-5 pb-24 pt-8",
            "sm:px-6 sm:pb-28 sm:pt-10",
            "lg:px-8 lg:pb-32",
          ].join(" ")}
        >
          <header className="flex justify-center">
            <Link
              href="/blueprint"
              aria-label="Checkmate Real Estate Group"
              className="inline-flex transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src={BLUEPRINT_ASSETS.logoLight}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[158px] object-contain sm:w-[178px]"
              />
            </Link>
          </header>

          <div className="mx-auto mt-14 max-w-[860px] text-center sm:mt-16 lg:mt-20">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#e4c26e]/35 bg-[#c9a24d]/10 text-[#e4c26e] shadow-[0_0_0_10px_rgba(201,162,77,0.045),0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-md sm:h-18 sm:w-18">
              <CheckIcon className="h-7 w-7" />
            </div>

            <div className="mt-7 flex justify-center">
              <BlueprintKicker dark>Entrada confirmada</BlueprintKicker>
            </div>

            <h1 className="mx-auto mt-6 max-w-[820px] text-balance text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.03] tracking-[-0.052em] text-white">
              Bem-vindo ao{" "}
              <span className="bg-[linear-gradient(105deg,#fff8df_0%,#efd992_34%,#d5ae55_70%,#aa7d29_100%)] bg-clip-text text-transparent">
                Checkmate Blueprint
              </span>
            </h1>

            <p
              className={[
                blueprintBodyClass,
                "mx-auto mt-6 max-w-[640px]",
                "text-pretty text-center text-white/58",
                "sm:text-[1.05rem]",
              ].join(" ")}
            >
              Sua entrada está confirmada. A partir de agora, começa uma nova
              etapa para estruturar sua operação no mercado imobiliário
              americano.
            </p>

            <div className="mx-auto mt-9 flex max-w-[280px] items-center gap-4">
              <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,162,77,0.72))]" />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#d9b65d] bg-[#080706]" />
              <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,162,77,0.72),transparent)]" />
            </div>

            <p className="mx-auto mt-8 max-w-[560px] text-[0.7rem] font-semibold uppercase leading-[1.7] tracking-[0.17em] text-white/35">
              Estrutura • Estratégia • Tecnologia • Execução
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,#f5f2eb)]"
        />
      </section>

      {/* INTRODUÇÃO */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(201,162,77,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(201,162,77,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
        />

        <div className={`relative z-[1] ${blueprintContainer}`}>
          <article className="mx-auto max-w-[900px] rounded-[28px] border border-black/[0.07] bg-white/75 px-6 py-10 shadow-[0_24px_80px_rgba(20,18,14,0.06)] backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-12">
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#8b6721]">
                  Bem-vindo
                </p>

                <div className="mt-5 h-px w-14 bg-[#c9a24d]" />
              </div>

              <div>
                <p className="text-[1.08rem] leading-[1.85] text-[#46413a] sm:text-[1.13rem]">
                  É um prazer iniciar essa parceria com você, construída sobre
                  estrutura, clareza e execução real no mercado imobiliário
                  americano.
                </p>

                <p className="mt-5 text-[1rem] leading-[1.85] text-[#686159]">
                  A partir de agora, você passa a fazer parte de um ecossistema
                  profissional desenvolvido para quem deseja operar com método,
                  reduzir riscos e crescer de forma estruturada no Real Estate
                  dos Estados Unidos.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="relative pb-20 sm:pb-24 lg:pb-28">
        <div className={blueprintContainer}>
          <div className="mx-auto max-w-[760px] text-center">
            <div className="flex justify-center">
              <BlueprintKicker>Estrutura do programa</BlueprintKicker>
            </div>

            <h2 className="mx-auto mt-5 text-balance text-[clamp(2rem,4.2vw,3.55rem)] font-semibold leading-[1.08] tracking-[-0.047em] text-[#171614]">
              Principais pilares e benefícios incluídos
            </h2>

            <p className="mx-auto mt-5 max-w-[640px] text-[0.98rem] leading-[1.75] text-[#6b655c]">
              Uma estrutura integrada para apoiar a construção, organização e
              evolução da sua operação imobiliária nos Estados Unidos.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14">
            {benefits.map((item) => (
              <article
                key={item.title}
                className={[
                  "group relative overflow-hidden",
                  "rounded-[24px] border border-black/[0.07]",
                  "bg-white px-6 py-7",
                  "shadow-[0_16px_55px_rgba(15,15,15,0.045)]",
                  "transition-all duration-300",
                  "hover:-translate-y-1",
                  "hover:border-[#c9a24d]/30",
                  "hover:shadow-[0_24px_70px_rgba(15,15,15,0.08)]",
                  "sm:px-7 sm:py-8",
                ].join(" ")}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-[#c9a24d] transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-7"
                />

                <div className="flex items-start gap-5">
                  <span className="mt-0.5 text-[0.68rem] font-bold tracking-[0.14em] text-[#a9802e]">
                    {item.number}
                  </span>

                  <div className="h-12 w-px shrink-0 bg-black/[0.08]" />

                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.025em] text-[#171614]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[0.9rem] leading-[1.72] text-[#6d675f]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="relative overflow-hidden bg-[#090806] py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-[#c9a24d]/10 blur-[150px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(228,194,110,0.55),transparent)]"
        />

        <div className={`relative ${blueprintContainer}`}>
          <article className="mx-auto max-w-[1040px] overflow-hidden rounded-[30px] border border-[#c9a24d]/20 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[#e4c26e]/25 bg-[#c9a24d]/10 text-[#e4c26e]">
                  <CheckIcon />
                </div>

                <p className="mt-6 text-[0.65rem] font-bold uppercase leading-[1.6] tracking-[0.17em] text-[#e4c26e]">
                  Benefício condicional
                </p>

                <p className="mt-3 text-[0.8rem] leading-[1.6] text-white/35">
                  Aplicável mediante o cumprimento dos requisitos descritos.
                </p>
              </div>

              <div>
                <h2 className="max-w-[700px] text-balance text-[clamp(1.7rem,3.2vw,2.65rem)] font-semibold leading-[1.13] tracking-[-0.04em] text-white">
                  Bônus condicional de reembolso do Programa Blueprint
                </h2>

                <p className="mt-6 max-w-[780px] text-[0.96rem] leading-[1.82] text-white/68">
                  O valor de US$ 10.000 pago pelo Programa Blueprint poderá ser
                  integralmente reembolsado, a título de bônus, caso o Cliente
                  realize seu primeiro investimento em um veículo estruturado
                  ou gerido pela Empresa, na condição de Investidor Acreditado
                  (Reg D), com aporte mínimo de US$ 50.000.
                </p>

                <div className="mt-6 border-l border-[#c9a24d]/40 pl-5">
                  <p className="max-w-[780px] text-[0.88rem] leading-[1.78] text-white/48">
                    O reembolso será concedido após a conclusão do ciclo do
                    investimento, conforme previsto nos documentos do respectivo
                    veículo. O benefício não caracteriza rendimento, promessa
                    de lucro ou incentivo à decisão de investimento e permanece
                    condicionado aos requisitos regulatórios aplicáveis.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* PRÓXIMOS PASSOS */}
      <section className="relative bg-[#f5f2eb] py-20 sm:py-24 lg:py-28">
        <div className={blueprintContainer}>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <BlueprintKicker>O que acontece agora</BlueprintKicker>

              <h2 className="mt-5 max-w-[480px] text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.047em] text-[#171614]">
                Seus próximos passos no Blueprint
              </h2>

              <p className="mt-5 max-w-[470px] text-[0.97rem] leading-[1.78] text-[#69635b]">
                Nosso time conduzirá sua integração de forma organizada para
                que você saiba exatamente como iniciar.
              </p>
            </div>

            <div className="space-y-4">
              {nextSteps.map((item) => (
                <article
                  key={item.number}
                  className="group flex gap-5 rounded-[22px] border border-black/[0.07] bg-white px-6 py-6 shadow-[0_14px_45px_rgba(20,18,14,0.04)] transition-all duration-300 hover:border-[#c9a24d]/25 hover:shadow-[0_20px_60px_rgba(20,18,14,0.07)] sm:items-center sm:px-7"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#c9a24d]/20 bg-[#c9a24d]/10 text-[0.68rem] font-bold text-[#8b6721]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.025em] text-[#171614]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[0.9rem] leading-[1.7] text-[#6d675f]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUPORTE */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[620px] -translate-x-1/2 rounded-full bg-[#c9a24d]/[0.07] blur-[130px]"
        />

        <div className={`relative ${blueprintContainer}`}>
          <article className="mx-auto max-w-[960px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#171614] p-7 text-white shadow-[0_30px_90px_rgba(20,18,14,0.14)] sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#e4c26e]/20 bg-[#c9a24d]/10 text-[#e4c26e]">
                  <MailIcon />
                </span>

                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-[#e4c26e]">
                    Suporte Checkmate
                  </p>

                  <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.038em]">
                    Precisa de ajuda?
                  </h2>

                  <p className="mt-4 max-w-[580px] text-[0.94rem] leading-[1.75] text-white/58">
                    Caso tenha qualquer dúvida sobre seus acessos ou sobre o
                    início do programa, nosso time está à disposição para
                    auxiliar.
                  </p>

                  <p className="mt-4 text-[0.75rem] leading-[1.6] text-white/32">
                    Não encontrou nossas mensagens? Verifique também as pastas
                    de spam e promoções.
                  </p>
                </div>
              </div>

              <div className="lg:text-right">
                <BlueprintGoldButton href={`mailto:${SITE_CONTACT.email}`}>
                  Falar com o suporte
                </BlueprintGoldButton>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ENCERRAMENTO */}
      <footer className="relative overflow-hidden bg-[#030303] py-14 text-center text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(228,194,110,0.45),transparent)]"
        />

        <div className={blueprintContainer}>
          <img
            src={BLUEPRINT_ASSETS.logoLight}
            alt="Checkmate Real Estate Group"
            className="mx-auto h-auto w-[140px] object-contain opacity-90"
          />

          <p className="mx-auto mt-7 max-w-[560px] text-[1rem] leading-[1.75] text-white/55">
            Estamos muito felizes em caminhar com você nessa nova etapa.
          </p>

          <p className="mt-5 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-[#e4c26e]">
            Equipe Checkmate · Programa Blueprint
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/blueprint"
              className="group inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/42 no-underline transition-colors duration-300 hover:text-[#e4c26e]"
            >
              Conhecer o Blueprint
              <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mx-auto mt-10 h-px max-w-[680px] bg-white/[0.07]" />

          <p className="mt-7 text-[0.64rem] uppercase tracking-[0.14em] text-white/24">
            © 2026 Checkmate Real Estate Group. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}