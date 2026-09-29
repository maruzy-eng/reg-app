import type { Metadata } from "next";
import Link from "next/link";

import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Informações recebidas",
  description:
    "Suas informações foram recebidas pela equipe da Checkmate.",
  path: "/obrigado-vsl-br",
  noIndex: true,
});

const nextSteps = [
  {
    number: "01",
    title: "Analisamos suas informações",
    description:
      "Nossa equipe revisa os dados enviados para entender seu perfil, seus objetivos e seu momento patrimonial.",
  },
  {
    number: "02",
    title: "Preparamos a conversa",
    description:
      "Um especialista poderá apresentar as estruturas disponíveis, os projetos imobiliários e os principais riscos envolvidos.",
  },
  {
    number: "03",
    title: "Entramos em contato",
    description:
      "Se houver alinhamento, o time da Checkmate falará com você pelo WhatsApp ou e-mail informado no formulário.",
  },
] as const;

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1" opacity="0.22" />
      <circle cx="40" cy="40" r="27" stroke="currentColor" strokeWidth="1" opacity="0.48" />
      <path d="M40 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 70V76" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path
        d="M27.5 40.5L35.5 48.5L52.5 31"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
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

function MailIcon() {
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function ObrigadoVslBrPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F3EFE6] font-sans text-[#171614] antialiased selection:bg-[#C5A258] selection:text-[#090909]">
      <section className="relative isolate overflow-hidden bg-[#070707] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_10%,rgba(197,162,88,0.10),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-[#C5A258]/60 to-transparent"
        />

        <div className="mx-auto w-full max-w-[1240px] px-5 pb-14 pt-7 sm:px-8 sm:pb-20 sm:pt-9 lg:px-12 lg:pb-24 lg:pt-10">
          <div className="flex items-center justify-center">
            <Link
              href="/blueprint-vsl-brasil"
              aria-label="Voltar para a VSL Brasil"
              className="inline-flex transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A258] focus-visible:ring-offset-4 focus-visible:ring-offset-[#070707]"
            >
              <img
                src={BLUEPRINT_ASSETS.logoLight}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[142px] object-contain sm:w-[158px] lg:w-[166px]"
              />
            </Link>
          </div>

          <div className="mx-auto max-w-[800px] pb-2 pt-12 text-center sm:pt-16 lg:pb-7 lg:pt-20">
            <div className="relative mx-auto h-[82px] w-[82px] text-[#D3B264] sm:h-[90px] sm:w-[90px]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A258]/10 blur-2xl"
              />
              <div className="relative h-full w-full">
                <SuccessIcon />
              </div>
            </div>

            <p className="mt-6 text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#D3B264] sm:mt-7">
              Informações enviadas
            </p>

            <h1 className="mx-auto mt-5 max-w-[780px] text-balance text-[clamp(2.55rem,10vw,5.3rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[#F5F3EE]">
              Recebemos seus dados.
              <span className="mt-2 block text-[#D3B264]">
                Agora é com a gente.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[630px] text-pretty text-[0.92rem] leading-[1.75] text-white/65 sm:mt-7 sm:text-[1.04rem]">
              Nossa equipe vai analisar suas informações e poderá conversar com
              você sobre estruturas de investimento ligadas aos projetos
              imobiliários da Checkmate nos Estados Unidos.
            </p>

            <div className="mx-auto mt-8 max-w-[570px] border-y border-white/10 py-5 sm:mt-10">
              <p className="text-[0.76rem] leading-[1.7] text-white/55 sm:text-[0.8rem]">
                Fique atento ao <strong className="font-medium text-white/85">WhatsApp</strong>{" "}
                e ao <strong className="font-medium text-white/85">e-mail</strong>{" "}
                informados no cadastro.
              </p>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/5" />
      </section>

      <section className="bg-[#F3EFE6] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-7 border-b border-black/10 pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20 lg:pb-12">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-7 bg-[#9A7938]" />
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#8B6A2E]">
                  Próximos passos
                </p>
              </div>

              <h2 className="mt-5 text-[clamp(2.25rem,7vw,4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[#171614]">
                O que acontece
                <span className="block text-[#9A7938]">agora?</span>
              </h2>
            </div>

            <p className="max-w-[520px] text-[0.92rem] leading-[1.8] text-[#5F5951] lg:justify-self-end lg:text-[0.96rem]">
              Você não precisa preencher nada novamente. A partir daqui, nossa
              equipe segue com a análise e prepara o contato.
            </p>
          </div>

          <ol className="border-b border-black/10">
            {nextSteps.map((step) => (
              <li
                key={step.number}
                className="grid gap-3 border-b border-black/10 py-7 last:border-b-0 sm:grid-cols-[64px_0.75fr_1.25fr] sm:items-baseline sm:gap-7 lg:py-9"
              >
                <span className="text-[0.56rem] font-bold tracking-[0.08em] text-[#9A7938]">
                  {step.number}
                </span>
                <h3 className="text-[1.1rem] font-medium tracking-[-0.025em] text-[#211F1B] sm:text-[1.2rem]">
                  {step.title}
                </h3>
                <p className="max-w-[500px] text-[0.86rem] leading-[1.75] text-[#625C54] sm:text-[0.9rem]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#EAE4D8]">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#8B6A2E]">
                Enquanto isso
              </p>
              <h2 className="mt-4 max-w-[430px] text-[clamp(2rem,7vw,3.25rem)] font-medium leading-[1] tracking-[-0.05em] text-[#171614]">
                Mantenha seus canais de contato disponíveis.
              </h2>
            </div>

            <div className="grid border-t border-black/10 sm:grid-cols-2 lg:border-t-0">
              <div className="border-b border-black/10 py-6 sm:border-b-0 sm:border-r sm:pr-8 lg:py-2">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#9A7938]/25 text-[#9A7938]">
                    <WhatsAppIcon />
                  </span>
                  <div>
                    <strong className="block text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#292620]">
                      WhatsApp
                    </strong>
                    <p className="mt-2 max-w-[260px] text-[0.81rem] leading-[1.65] text-[#686158]">
                      Um especialista poderá entrar em contato pelo número
                      informado no formulário.
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-6 sm:pl-8 lg:py-2">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#9A7938]/25 text-[#9A7938]">
                    <MailIcon />
                  </span>
                  <div>
                    <strong className="block text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#292620]">
                      E-mail
                    </strong>
                    <p className="mt-2 max-w-[260px] text-[0.81rem] leading-[1.65] text-[#686158]">
                      Confira também sua caixa de entrada, promoções e spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#070707] text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-7 bg-[#C5A258]" />
                <p className="text-[0.56rem] font-bold uppercase tracking-[0.2em] text-[#C5A258]">
                  Checkmate Group
                </p>
              </div>

              <h2 className="mt-5 max-w-[630px] text-[clamp(1.85rem,6vw,3rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[#F5F3EE]">
                Suas informações foram recebidas.
                <span className="mt-1 block text-white/55">
                  Nossa equipe assume daqui.
                </span>
              </h2>

              <p className="mt-5 max-w-[560px] text-[0.84rem] leading-[1.75] text-white/50">
                Investimentos envolvem riscos. Antes de qualquer decisão, você
                poderá conhecer a estrutura, os projetos e a documentação
                aplicável.
              </p>
            </div>

            <Link
              href="/blueprint-vsl-brasil"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 border border-white/15 px-6 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/75 transition-colors duration-300 hover:border-[#C5A258] hover:text-[#D3B264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A258] sm:w-auto"
            >
              Voltar para a VSL
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-[0.6rem] leading-6 text-white/35">
              © {new Date().getFullYear()} Checkmate Real Estate Group
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
