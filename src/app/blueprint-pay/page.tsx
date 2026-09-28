import type { Metadata } from "next";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "lucide-react";

import { BLUEPRINT_ASSETS } from "@/lib/blueprint/content";
import {
  BlueprintGoldButton,
  BlueprintKicker,
  blueprintBodyClass,
  blueprintContainer,
  blueprintHeadingClass,
  blueprintHeroHeadingClass,
} from "@/components/blueprint/blueprint-ui";
import { buildPageMetadata } from "@/lib/seo";

const STRIPE_CHECKOUT_URL =
  "https://buy.stripe.com/dRm5kCcM97h64HQehgcIE1B";

export const metadata: Metadata = buildPageMetadata({
  title: "Blueprint — Pagamento",
  description:
    "Garanta sua vaga no Checkmate Blueprint e conclua seu pagamento com segurança via Stripe.",
  path: "/blueprint-pay",
  keywords: [
    "Checkmate Blueprint",
    "Blueprint pagamento",
    "Flip House",
    "New Construction",
    "real estate USA",
  ],
});

const inclusions = [
  {
    icon: GraduationCap,
    title: "Educação avançada",
    text: "Aulas e direcionamento para entender Flip Houses, New Construction, análise de oportunidades e estrutura de operação nos EUA.",
  },
  {
    icon: Building2,
    title: "Estrutura profissional",
    text: "Visão prática sobre empresa, crédito, capital, contratos, obras e os pilares necessários para operar com mais clareza.",
  },
  {
    icon: Handshake,
    title: "Mentoria e comunidade",
    text: "Acesso ao ecossistema Checkmate para tirar dúvidas, evoluir com direção e acompanhar oportunidades reais do mercado.",
  },
] as const;

const checkpoints = [
  "Conteúdo focado no mercado imobiliário americano.",
  "Estratégias para Flip House e New Construction.",
  "Discussões sobre financiamento, análise e operação.",
  "Direcionamento para próximos passos com mais segurança.",
] as const;

export default function BlueprintPayPage() {
  return (
    <main className="overflow-x-hidden bg-white font-sans text-[#222] antialiased selection:bg-[#c9a24d] selection:text-white">
      <section className="relative isolate min-h-screen overflow-hidden bg-[#030303] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-50 bg-cover bg-center opacity-[0.2]"
          style={{
            backgroundImage: `url(${BLUEPRINT_ASSETS.heroImage})`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-40 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.94)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.38)_50%,rgba(0,0,0,0.94)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[38%] -z-20 h-[440px] w-[720px] -translate-x-1/2 rounded-full bg-[#c9a24d]/10 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,217,146,0.45),transparent)]"
        />

        <div
          className={[
            blueprintContainer,
            "relative flex min-h-screen flex-col px-5 pb-14 pt-7",
            "sm:px-6 sm:pt-8 lg:px-8",
          ].join(" ")}
        >
          <header className="flex justify-center">
            <a
              href="/blueprint-pay"
              aria-label="Checkmate Real Estate Group"
              className="inline-flex transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src={BLUEPRINT_ASSETS.logoLight}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[150px] object-contain sm:w-[165px] lg:w-[180px]"
              />
            </a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14 lg:py-16">
            <div className="mx-auto max-w-[820px] text-center lg:mx-0 lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <BlueprintKicker dark>Pagamento seguro via Stripe</BlueprintKicker>
              </div>

              <h1
                className={[
                  blueprintHeroHeadingClass,
                  "mt-6 max-w-[780px] text-white",
                ].join(" ")}
              >
                Garanta sua vaga no{" "}
                <span className="bg-[linear-gradient(105deg,#fff8df_0%,#efd992_32%,#d5ae55_68%,#aa7d29_100%)] bg-clip-text text-transparent">
                  Checkmate Blueprint
                </span>
              </h1>

              <p
                className={[
                  blueprintBodyClass,
                  "mx-auto mt-6 max-w-[680px] text-white/58 lg:mx-0",
                ].join(" ")}
              >
                Conclua sua inscrição e dê o próximo passo para aprender a
                estruturar projetos de Flip House e New Construction nos Estados
                Unidos com método, visão financeira e suporte profissional.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <BlueprintGoldButton
                  href={STRIPE_CHECKOUT_URL}
                  className="w-full sm:w-auto"
                >
                  Fazer pagamento agora
                </BlueprintGoldButton>

                <p className="max-w-[260px] text-center text-[0.68rem] font-medium uppercase leading-[1.7] tracking-[0.14em] text-white/35 sm:text-left">
                  Checkout criptografado e processado pela Stripe
                </p>
              </div>
            </div>

            <aside className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/[0.1] bg-white/[0.055] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#c9a24d]/18 blur-[95px]"
              />

              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c9a24d]/15 text-[#e4c26e]">
                  <CreditCard size={24} strokeWidth={1.8} />
                </div>

                <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#e4c26e]">
                  Blueprint Access
                </p>

                <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-white">
                  Pagamento único para liberar seu acesso.
                </h2>

                <div className="mt-6 grid gap-3">
                  {checkpoints.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#e4c26e]"
                      />
                      <p className="text-sm leading-6 text-white/62">{item}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={STRIPE_CHECKOUT_URL}
                  className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8b55e_0%,#c9a24d_50%,#9f7625_100%)] px-6 text-sm font-semibold !text-white shadow-[0_16px_40px_rgba(201,162,77,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(201,162,77,0.38)]"
                >
                  Ir para o checkout
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6f1] py-20 sm:py-24">
        <div className={blueprintContainer}>
          <div className="mx-auto max-w-[760px] text-center">
            <BlueprintKicker>O que você está garantindo</BlueprintKicker>
            <h2 className={`${blueprintHeadingClass} mt-5 text-[#171614]`}>
              Uma estrutura para sair da curiosidade e avançar com direção.
            </h2>
            <p className={`${blueprintBodyClass} mx-auto text-[#68635b]`}>
              O Blueprint reúne educação, visão operacional e ecossistema para
              quem quer entender o mercado imobiliário americano com mais
              profundidade antes de tomar decisões importantes.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {inclusions.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[24px] border border-black/[0.07] bg-white p-7 shadow-[0_18px_60px_rgba(0,0,0,0.05)]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#171614] text-[#e4c26e]">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.03em] text-[#171614]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-7 text-[#68635b]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#030303] py-20 text-center text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_10%,rgba(201,162,77,0.14),transparent_34%)]"
        />
        <div className={blueprintContainer}>
          <div className="mx-auto max-w-[820px] rounded-[28px] border border-white/[0.08] bg-white/[0.035] px-6 py-12 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-10 sm:py-14">
            <div className="flex justify-center">
              <BlueprintKicker dark>Último passo</BlueprintKicker>
            </div>

            <h2 className={`${blueprintHeadingClass} mx-auto mt-5 max-w-[720px] text-white`}>
              Finalize seu pagamento com segurança e comece sua jornada no
              Blueprint.
            </h2>

            <p className={`${blueprintBodyClass} mx-auto text-white/55`}>
              Ao clicar no botão abaixo, você será direcionado para o checkout
              seguro da Stripe para concluir sua inscrição.
            </p>

            <div className="mt-8 flex justify-center">
              <BlueprintGoldButton
                href={STRIPE_CHECKOUT_URL}
                className="w-full sm:w-auto"
              >
                Pagar via Stripe
              </BlueprintGoldButton>
            </div>

            <div className="mx-auto mt-6 flex max-w-[520px] items-start justify-center gap-3 text-left">
              <ShieldCheck
                size={18}
                className="mt-1 shrink-0 text-[#e4c26e]"
              />
              <p className="text-[0.78rem] leading-[1.7] text-white/42">
                Seus dados de pagamento são processados pela Stripe. A
                Checkmate não armazena os dados completos do seu cartão.
              </p>
            </div>
          </div>

          <footer className="relative z-10 mt-10 border-t border-white/[0.06] pt-6">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/30">
              © 2026 Checkmate Real Estate Group. Todos os direitos reservados.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
