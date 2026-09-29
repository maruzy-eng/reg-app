"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  DynamicFormComponent,
  type DynamicFormSubmitOverrideContext,
  type DynamicFormSubmitOverrideResult,
} from "@/components/forms/dynamic-form";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import { SITE_CONTACT } from "@/lib/home/contact";

import VSLPlayer from "./VSLPlayer";

const VIMEO_VIDEO_ID = "1231476819";
const FORM_UNLOCK_TIME_SECONDS = 300;
const STORAGE_KEY = "blueprint_vsl_brasil_form_unlocked";
const ANALYTICS_SESSION_KEY = "blueprint_vsl_brasil_analytics_session_id";

const HERO_BACKGROUND_IMAGE =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/fundo%20dourado.jpg";

const LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/wp-content/uploads/2025/09/logock.webp";

type BlueprintVSLBrasilProps = {
  form: DynamicForm | null;
  fields: DynamicFormField[];
};

type BlueprintVslEventType =
  | "page_view"
  | "video_complete"
  | "sound_enabled"
  | "form_click";

const understandingPoints = [
  {
    number: "01",
    title: "A estrutura",
    text:
      "Como funcionam as modalidades disponíveis e de que forma o capital participa das operações.",
  },
  {
    number: "02",
    title: "Os projetos",
    text:
      "Onde o capital é utilizado e quais ativos imobiliários fazem parte da estratégia.",
  },
  {
    number: "03",
    title: "Os riscos e oportunidades",
    text:
      "Prazos, projeções, estrutura jurídica e características de cada modalidade serão apresentados antes da tomada de decisão.",
  },
] as const;

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `vsl_brasil_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getAnalyticsSessionId() {
  try {
    const current = localStorage.getItem(ANALYTICS_SESSION_KEY);

    if (current) {
      return current;
    }

    const next = createSessionId();
    localStorage.setItem(ANALYTICS_SESSION_KEY, next);

    return next;
  } catch {
    return createSessionId();
  }
}

export default function BlueprintVSLBrasil({
  form,
  fields,
}: BlueprintVSLBrasilProps) {
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formClickTrackedRef = useRef(false);

  const trackEvent = useCallback(
    (
      eventType: BlueprintVslEventType,
      metadata: Record<string, unknown> = {},
    ) => {
      try {
        const payload = {
          event_type: eventType,
          session_id: getAnalyticsSessionId(),
          visitor_id: getAnalyticsSessionId(),
          page_path: window.location.pathname,
          video_id: VIMEO_VIDEO_ID,
          referrer: document.referrer || null,
          metadata,
        };

        const body = JSON.stringify(payload);

        if (navigator.sendBeacon) {
          const blob = new Blob([body], {
            type: "application/json",
          });

          navigator.sendBeacon("/api/blueprint-vsl/events", blob);
          return;
        }

        fetch("/api/blueprint-vsl/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
          keepalive: true,
        }).catch(() => undefined);
      } catch {
        // Analytics não deve interferir na experiência da página.
      }
    },
    [],
  );

  useEffect(() => {
    trackEvent("page_view", {
      href: window.location.href,
    });
  }, [trackEvent]);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        window.requestAnimationFrame(() => {
          setFormUnlocked(true);
        });
      }
    } catch {
      // Ignorar.
    }
  }, []);

  const displayFields = useMemo<DynamicFormField[]>(() => {
    return fields.map((field) => ({
      ...field,
      ...(field.type === "state" ||
      /^(states?(_us)?|us_state|estado)$/i.test(field.name)
        ? {
            label: "Estado",
          }
        : {}),
    }));
  }, [fields]);

  const unlockForm = useCallback(() => {
    setFormUnlocked(true);

    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignorar.
    }
  }, []);

  const handleSubmitOverride = useCallback(
    async ({
      form: submittedForm,
      data,
      sourceUrl,
    }: DynamicFormSubmitOverrideContext): Promise<DynamicFormSubmitOverrideResult> => {
      try {
        const response = await fetch(
          `/api/forms/${encodeURIComponent(submittedForm.slug)}/submit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data,
              source_url: sourceUrl || null,
            }),
          },
        );

        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.success) {
          return {
            success: false,
            error:
              result?.error ||
              "Não foi possível enviar agora. Tente novamente em instantes.",
            fieldErrors: result?.fieldErrors || {},
          };
        }

        const thankYouPageUrl =
          typeof result?.thankYouPageUrl === "string" &&
          result.thankYouPageUrl
            ? result.thankYouPageUrl
            : "/obrigado-vsl-br";

        setSubmitted(true);
        window.location.assign(thankYouPageUrl);

        return {
          success: true,
          redirecting: true,
        };
      } catch {
        return {
          success: false,
          error:
            "Não foi possível enviar agora. Verifique sua conexão e tente novamente.",
        };
      }
    },
    [],
  );

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background: #050505;
        }

        body {
          margin: 0;
          background: #050505;
        }

        .blueprint-vsl-page,
        .blueprint-vsl-page * {
          font-family: var(--font-inter), Inter, Arial, sans-serif;
        }

        .blueprint-vsl-page .blueprint-vsl-title {
          font-size: 30px !important;
          line-height: 1.04;
        }

        @media (min-width: 640px) {
          .blueprint-vsl-page .blueprint-vsl-title {
            font-size: clamp(30px, 3vw, 42px) !important;
            line-height: 1.14;
          }
        }

        ::selection {
          background: rgba(201, 166, 91, 0.3);
          color: #ffffff;
        }
      `}</style>

      <main className="blueprint-vsl-page min-h-screen overflow-x-hidden bg-[#050505] text-white">
        <section className="relative min-h-screen overflow-hidden bg-[#050505]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-[position:center_top] sm:bg-center"
              style={{
                backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")`,
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1160px] px-4 pb-16 pt-8 sm:px-6 md:px-8 md:pt-10 lg:px-10">
            <div className="flex justify-center">
              <img
                src={LOGO_URL}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[145px] object-contain sm:w-[158px] md:w-[168px]"
              />
            </div>

            <div className="mx-auto mt-7 max-w-[920px] px-1 text-center md:mt-8">
              <h1 className="blueprint-vsl-title mx-auto max-w-[830px] font-bold tracking-[-0.04em] text-[#F5F3EE] sm:tracking-[-0.03em]">
                Dolarize parte do seu patrimônio através de projetos
                imobiliários nos{" "}
                <span className="text-[#D3B264]">Estados Unidos</span>
              </h1>

              <p className="mx-auto mt-6 max-w-[760px] text-[13px] font-medium leading-7 text-white/64 sm:text-[15px]">
                Entenda como investidores brasileiros podem participar de
                operações imobiliárias em Massachusetts e conhecer diferentes
                estruturas de investimento ligadas aos projetos da Checkmate.
              </p>

              <p className="mx-auto mt-4 max-w-[620px] text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#D3B264] sm:text-[11px]">
                Assista ao vídeo até o final para entender como funciona a
                operação.
              </p>
            </div>

            <div className="relative mx-auto mt-7 max-w-[960px] sm:mt-8">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#C69D4B]/[0.105] blur-[105px]" />
              <div className="pointer-events-none absolute bottom-[-55px] left-1/2 h-[100px] w-[65%] -translate-x-1/2 rounded-full bg-[#D0AA58]/[0.10] blur-[70px]" />
              <div className="pointer-events-none absolute inset-x-[10%] bottom-[-25px] h-[90px] rounded-full bg-black blur-[45px]" />

              <div className="relative rounded-[17px] bg-gradient-to-br from-[#E1C679]/60 via-[#8A692C]/30 to-[#D3AF5B]/25 p-px shadow-[0_35px_100px_rgba(0,0,0,0.85),0_0_55px_rgba(202,161,76,0.08)]">
                <div className="rounded-[16px] bg-[#080808] p-[5px] sm:p-[6px]">
                  <div className="overflow-hidden rounded-[12px] bg-black">
                    <VSLPlayer
                      videoId={VIMEO_VIDEO_ID}
                      unlockAt={FORM_UNLOCK_TIME_SECONDS}
                      onUnlock={unlockForm}
                      onSoundEnabled={() => {
                        trackEvent("sound_enabled");
                      }}
                      onVideoComplete={(event) => {
                        trackEvent("video_complete", event);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!formUnlocked && (
              <div className="mx-auto mt-7 max-w-[600px]">
                <div className="flex items-center justify-center gap-3">
                  <div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-[#D3B264]/20">
                    <span className="absolute h-[5px] w-[5px] animate-ping rounded-full bg-[#D3B264]/60" />
                    <span className="relative h-[5px] w-[5px] rounded-full bg-[#D3B264]" />
                  </div>

                  <div>
                    <div className="text-[8px] font-extrabold uppercase tracking-[0.21em] text-[#D3B264]">
                      Continue assistindo
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-white/32 sm:text-[12px]">
                      Aguarde até o final do vídeo para conhecer os próximos
                      passos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D3B264]/15 to-transparent" />
        </section>

        {formUnlocked && (
          <>
            <section
              id="blueprint-form"
              className="relative overflow-hidden border-t border-white/[0.05] bg-[#080808] py-20 sm:py-24 lg:py-28"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-350px] h-[750px] w-[1050px] -translate-x-1/2 rounded-full bg-[#C49B49]/[0.07] blur-[200px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(0,0,0,0.55)_82%)]" />
              </div>

              <div className="relative mx-auto max-w-[1160px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
                  <div className="lg:sticky lg:top-10">
                    <SectionLabel>Fale com um especialista</SectionLabel>

                    <h2 className="mt-6 max-w-[540px] text-[36px] font-normal leading-[1.02] tracking-[-0.05em] text-[#F5F3EE] sm:text-[44px] lg:text-[52px]">
                      Seu próximo passo é{" "}
                      <span className="block text-[#D3B264]">
                        uma conversa.
                      </span>
                    </h2>

                    <p className="mt-7 max-w-[520px] text-[15px] font-medium leading-7 text-white/75">
                      Não existe uma única estrutura adequada para todos os
                      investidores.
                    </p>

                    <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-white/45">
                      Por isso, antes de qualquer decisão, nosso time conversa
                      com você para conhecer seu patrimônio, seus objetivos e
                      seu perfil.
                    </p>

                    <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-white/45">
                      Preencha o formulário para falar com um especialista da
                      Checkmate.
                    </p>
                  </div>

                  <div className="lg:pt-2">
                    <div className="mb-8">
                      <SectionLabel>Sua aplicação</SectionLabel>

                      <h2 className="mt-4 text-[30px] font-normal leading-[1.08] tracking-[-0.04em] text-[#F5F3EE] sm:text-[36px]">
                        Conte um pouco sobre você
                      </h2>

                      <p className="mt-4 max-w-[560px] text-[12px] leading-6 text-white/40">
                        Nosso time analisa cada aplicação para direcionar a
                        conversa da forma mais adequada.
                      </p>
                    </div>

                    {submitted ? (
                      <SuccessState />
                    ) : form ? (
                      <div
                        className="blueprint-vsl-form relative overflow-hidden rounded-[20px] border border-[#D3B264]/15 bg-[#0C0C0C] p-6 shadow-[0_35px_110px_rgba(0,0,0,0.55)] sm:p-8 md:p-10"
                        onClickCapture={() => {
                          if (formClickTrackedRef.current) {
                            return;
                          }

                          formClickTrackedRef.current = true;
                          trackEvent("form_click");
                        }}
                      >
                        <div className="pointer-events-none absolute left-1/2 top-[-230px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#D3B264]/[0.055] blur-[120px]" />

                        <div className="relative">
                          <div className="mb-8 border-b border-white/[0.06] pb-6">
                            <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#D3B264]">
                              Checkmate Investments
                            </span>

                            <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.025em] text-white">
                              Fale com um especialista
                            </h3>
                          </div>

                          <DynamicFormComponent
                            form={form}
                            fields={displayFields}
                            onSubmitOverride={handleSubmitOverride}
                          />

                          <p className="mt-5 text-center text-[9px] leading-5 text-white/20">
                            Seus dados serão utilizados pela equipe Checkmate
                            para entrar em contato com você.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <UnavailableState />
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden border-t border-white/[0.05] bg-[#050505] py-20 sm:py-24 lg:py-28">
              <div className="pointer-events-none absolute right-[-380px] top-[-300px] h-[800px] w-[800px] rounded-full bg-[#C49B49]/[0.05] blur-[210px]" />

              <div className="relative mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
                  <div>
                    <SectionLabel>Reforço de confiança</SectionLabel>

                    <h2 className="mt-6 max-w-[610px] text-[36px] font-normal leading-[1.02] tracking-[-0.05em] text-[#F5F3EE] sm:text-[44px] lg:text-[52px]">
                      Investimento ligado à{" "}
                      <span className="text-[#D3B264]">economia real.</span>
                    </h2>
                  </div>

                  <div className="lg:pb-1">
                    <p className="max-w-[590px] text-[13px] leading-7 text-white/46">
                      A Checkmate desenvolve e administra projetos imobiliários
                      nos Estados Unidos, com atuação especialmente no mercado
                      de Massachusetts.
                    </p>

                    <p className="mt-5 max-w-[590px] text-[13px] leading-7 text-white/46">
                      Nossa operação envolve aquisição de propriedades,
                      desenvolvimento, construção e venda de ativos
                      imobiliários.
                    </p>

                    <p className="mt-5 max-w-[590px] text-[14px] font-medium leading-7 text-white/72">
                      Você poderá conversar com nosso time para entender as
                      estruturas disponíveis, os projetos e os riscos envolvidos
                      antes de qualquer decisão.
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex justify-center lg:justify-start">
                  <AnalystButton>Quero conversar com um especialista</AnalystButton>
                </div>
              </div>
            </section>

            <section className="bg-[#EEE9DF] py-20 text-[#171614] sm:py-24 lg:py-28">
              <div className="mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                <div className="mx-auto max-w-[760px] text-center">
                  <LightSectionLabel>Antes de investir</LightSectionLabel>

                  <h2 className="mt-5 text-[36px] font-medium leading-[1.04] tracking-[-0.05em] sm:text-[44px] lg:text-[51px]">
                    Antes de investir, você vai entender:
                  </h2>
                </div>

                <div className="mt-14 grid border-y border-black/10 md:grid-cols-3">
                  {understandingPoints.map((point, index) => (
                    <article
                      key={point.number}
                      className={[
                        "py-8 md:min-h-[270px] md:px-8 md:py-10",
                        index !== 2
                          ? "border-b border-black/10 md:border-b-0 md:border-r"
                          : "",
                      ].join(" ")}
                    >
                      <span className="text-[9px] font-extrabold tracking-[0.16em] text-[#9A7938]">
                        {point.number}
                      </span>

                      <h3 className="mt-10 max-w-[280px] text-[20px] font-semibold leading-[1.25] tracking-[-0.03em]">
                        {point.title}
                      </h3>

                      <p className="mt-4 max-w-[310px] text-[12px] leading-6 text-[#625C54]">
                        {point.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative isolate overflow-hidden bg-[#060606] py-24 text-white sm:py-28 lg:py-32">
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[600px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C49B49]/[0.06] blur-[190px]" />
              <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#D3B264]/30 to-transparent" />

              <div className="relative mx-auto max-w-[930px] px-5 text-center sm:px-7">
                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="mx-auto h-auto w-[145px] object-contain opacity-75"
                />

                <span className="mt-10 block text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#D3B264]">
                  Seu próximo passo
                </span>

                <h2 className="mx-auto mt-5 max-w-[850px] text-[36px] font-normal leading-[1.04] tracking-[-0.05em] text-[#F5F3EE] sm:text-[45px] lg:text-[55px]">
                  Seu próximo passo é uma conversa.
                </h2>

                <p className="mx-auto mt-7 max-w-[660px] text-[13px] leading-7 text-white/44">
                  Não existe uma única estrutura adequada para todos os
                  investidores. Por isso, antes de qualquer decisão, nosso time
                  conversa com você para conhecer seu patrimônio, seus objetivos
                  e seu perfil.
                </p>

                <p className="mx-auto mt-5 max-w-[620px] text-[13px] leading-7 text-white/44">
                  Preencha o formulário para falar com um especialista da
                  Checkmate.
                </p>

                <div className="mt-9 flex justify-center">
                  <AnalystButton>Quero falar com um especialista</AnalystButton>
                </div>
              </div>
            </section>

            <section className="border-t border-white/[0.05] bg-[#040404] py-10">
              <div className="mx-auto max-w-[980px] px-5 text-center sm:px-7">
                <h2 className="text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#D3B264]">
                  Aviso
                </h2>

                <p className="mx-auto mt-4 max-w-[900px] text-[10px] leading-6 text-white/28">
                  Investimentos envolvem riscos e resultados passados não
                  representam garantia de resultados futuros. Rentabilidades,
                  prazos e demais projeções eventualmente apresentadas são
                  estimativas e podem variar de acordo com a modalidade,
                  execução dos projetos e condições de mercado. A elegibilidade
                  e as condições de participação dependem da estrutura
                  específica da operação e da documentação aplicável.
                </p>
              </div>
            </section>

            <footer className="border-t border-white/[0.05] bg-[#040404]">
              <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 px-5 py-8 sm:px-7 md:flex-row lg:px-10">
                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="h-auto w-[125px] object-contain opacity-55"
                />

                <p className="text-center text-[8px] font-medium uppercase tracking-[0.17em] text-white/20 md:text-right">
                  Checkmate Group · Real Estate · USA
                </p>
              </div>
            </footer>
          </>
        )}
      </main>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 shrink-0 bg-[#D3B264]" />
      <span className="text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#D3B264]">
        {children}
      </span>
    </div>
  );
}

function LightSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-7 shrink-0 bg-[#9A7938]" />
      <span className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#8B6A2E]">
        {children}
      </span>
      <span className="h-px w-7 shrink-0 bg-[#9A7938]" />
    </div>
  );
}

function AnalystButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#blueprint-form"
      className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[8px] border border-[#DEC477]/30 bg-gradient-to-r from-[#8B682C] via-[#C39A48] to-[#DEC477] px-7 text-center text-[10px] font-extrabold uppercase tracking-[0.11em] text-[#080808] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_70px_rgba(198,161,91,0.22)] sm:w-auto sm:px-9"
    >
      {children}
      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

function UnavailableState() {
  return (
    <div className="rounded-[20px] border border-white/[0.07] bg-white/[0.02] px-7 py-14 text-center">
      <span className="block text-[8px] font-bold uppercase tracking-[0.18em] text-[#D3B264]">
        Formulário em atualização
      </span>

      <h3 className="mt-3 text-[26px] font-normal tracking-[-0.035em] text-white">
        Fale direto com a equipe.
      </h3>

      <p className="mx-auto mt-4 max-w-[400px] text-[12px] leading-6 text-white/36">
        Nosso formulário está sendo atualizado. Enquanto isso, fale com a
        Checkmate por um dos canais abaixo.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={SITE_CONTACT.phoneHref}
          className="group inline-flex min-h-[50px] items-center gap-3 rounded-[10px] border border-[#E0C77F]/25 bg-gradient-to-r from-[#8B682C] via-[#C39A48] to-[#DEC477] px-6 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#080808] transition hover:shadow-[0_16px_60px_rgba(198,161,91,0.25)]"
        >
          {SITE_CONTACT.phone}
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <a
          href={`mailto:${SITE_CONTACT.email}`}
          className="inline-flex min-h-[50px] items-center rounded-[10px] border border-white/[0.1] px-6 text-[10px] font-bold uppercase tracking-[0.1em] text-white/55 transition hover:border-[#D3B264]/40 hover:text-white"
        >
          Enviar e-mail
        </a>
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="rounded-[20px] border border-[#D3B264]/15 bg-[#D3B264]/[0.03] px-7 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D3B264]/25 bg-[#D3B264]/10 text-[#E0C77F]">
        ✓
      </div>

      <span className="mt-7 block text-[8px] font-bold uppercase tracking-[0.18em] text-[#D3B264]">
        Informações recebidas
      </span>

      <h3 className="mt-3 text-[30px] font-normal tracking-[-0.035em] text-white">
        Agora é com nossa equipe.
      </h3>

      <p className="mx-auto mt-4 max-w-[380px] text-[12px] leading-6 text-white/36">
        Recebemos suas informações. Nossa equipe poderá entrar em contato para
        conversar sobre as estruturas disponíveis.
      </p>
    </div>
  );
}
