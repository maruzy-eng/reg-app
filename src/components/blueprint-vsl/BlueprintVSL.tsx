"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import VSLPlayer from "./VSLPlayer";

import {
  DynamicFormComponent,
  type DynamicFormSubmitOverrideContext,
  type DynamicFormSubmitOverrideResult,
} from "@/components/forms/dynamic-form";

import type {
  DynamicForm,
  DynamicFormField,
} from "@/lib/forms";

import { SITE_CONTACT } from "@/lib/home/contact";

/* =========================================================
   CONFIG
========================================================= */

const VIMEO_VIDEO_ID = "1124084915";

const FORM_UNLOCK_TIME_SECONDS = 300;

const HERO_BACKGROUND_IMAGE =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/fundo%20dourado.jpg";

const STORAGE_KEY = "blueprint_vsl_form_unlocked";
const ANALYTICS_SESSION_KEY = "blueprint_vsl_analytics_session_id";

const LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/wp-content/uploads/2025/09/logock.webp";

/* =========================================================
   TYPES
========================================================= */

type BlueprintVSLProps = {
  form: DynamicForm | null;
  fields: DynamicFormField[];
};

type BlueprintVslEventType =
  | "page_view"
  | "video_complete"
  | "sound_enabled"
  | "form_click";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `vsl_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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

/* =========================================================
   CONTENT
========================================================= */

const analystPoints = [
  {
    number: "01",
    title: "Entender seu momento atual",
    text:
      "Vamos conhecer sua experiência, seus objetivos e o quanto você já conhece do mercado imobiliário.",
  },
  {
    number: "02",
    title: "Identificar o caminho mais adequado para o seu perfil",
    text:
      "New Construction, desenvolvimento de projetos, aquisição de propriedades ou outras oportunidades dentro do mercado.",
  },
  {
    number: "03",
    title: "Mostrar como funciona o Blueprint",
    text:
      "Você poderá entender melhor o acompanhamento, a estrutura, o ecossistema e tirar suas principais dúvidas antes de tomar qualquer decisão.",
  },
] as const;

const blueprintBenefits = [
  {
    number: "01",
    title: "Conhecimento aplicado",
    text:
      "Entenda os fundamentos necessários para analisar oportunidades e tomar decisões com mais clareza dentro do mercado imobiliário.",
  },
  {
    number: "02",
    title: "Acompanhamento",
    text:
      "Tenha acesso à orientação da equipe Checkmate durante sua evolução no mercado.",
  },
  {
    number: "03",
    title: "Operações reais",
    text:
      "Veja como projetos são analisados, estruturados e executados na prática.",
  },
  {
    number: "04",
    title: "Ecossistema",
    text:
      "Aproxime-se de profissionais, investidores, lenders, contractors e pessoas que já atuam no mercado imobiliário americano.",
  },
] as const;

const objections = [
  {
    number: "01",
    question: "“Eu nunca investi em imóveis. Posso participar?”",
    paragraphs: [
      "Sim.",
      "O Blueprint recebe pessoas em diferentes momentos. Algumas já trabalham com construção. Outras possuem negócios nos Estados Unidos. Algumas já fizeram investimentos. E outras estão começando a entender o mercado agora.",
      "Por isso, antes de qualquer decisão, nossa equipe procura entender seu ponto de partida.",
    ],
  },
  {
    number: "02",
    question: "“Preciso trabalhar com construção?”",
    paragraphs: [
      "Não.",
      "Experiência em construção pode ajudar, mas não é um requisito para conhecer o programa.",
      "O mais importante é entender seu objetivo e qual caminho dentro do mercado imobiliário faz mais sentido para o seu momento.",
    ],
  },
  {
    number: "03",
    question: "“Preciso ter muito dinheiro para começar?”",
    paragraphs: [
      "Não existe uma resposta única.",
      "Cada projeto possui estrutura, capital necessário, risco, financiamento e estratégia diferentes.",
      "Dentro do Blueprint, você aprende a compreender esses elementos antes de tomar decisões.",
    ],
  },
] as const;

const entrySteps = [
  {
    number: "01",
    title: "Converse com um analista",
    text:
      "Preencha sua aplicação e conte um pouco sobre o seu momento atual.",
  },
  {
    number: "02",
    title: "Entenda se o Blueprint faz sentido para você",
    text:
      "Na conversa, nossa equipe apresenta melhor o programa, responde suas dúvidas e entende seus objetivos.",
  },
  {
    number: "03",
    title: "Defina seus próximos passos",
    text:
      "Caso exista alinhamento, você poderá conhecer o processo para entrar no ecossistema Blueprint e começar sua jornada.",
  },
] as const;

const faqItems = [
  {
    question: "Preciso já ter experiência no mercado imobiliário?",
    answer:
      "Não. O Blueprint recebe pessoas com diferentes níveis de experiência.",
  },
  {
    question: "O Blueprint é apenas um curso?",
    answer:
      "Não. Existe uma parte educacional, mas o programa também envolve acompanhamento, visão prática do mercado e aproximação com o ecossistema da Checkmate.",
  },
  {
    question: "O Blueprint trabalha apenas com Flip House?",
    answer:
      "Não. O mercado imobiliário possui diferentes estratégias. O Blueprint aborda diferentes formas de atuação, incluindo New Construction, desenvolvimento de projetos e outras operações imobiliárias.",
  },
  {
    question: "Preciso ter uma empresa aberta?",
    answer:
      "Não necessariamente. Isso depende do seu momento e do tipo de operação que pretende desenvolver. A equipe poderá orientar melhor durante a conversa inicial.",
  },
  {
    question: "Preciso ter capital disponível?",
    answer:
      "Cada operação possui exigências diferentes. O objetivo é que você entenda como funcionam capital, financiamento, estrutura do negócio e parceiros antes de entrar em um projeto.",
  },
  {
    question: "O que acontece depois que eu enviar o formulário?",
    answer:
      "Um analista da Checkmate entra em contato para entender seu momento, explicar melhor o Blueprint e responder suas dúvidas.",
  },
] as const;

/* =========================================================
   MAIN
========================================================= */

export default function BlueprintVSL({
  form,
  fields,
}: BlueprintVSLProps) {
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

  /* =======================================================
     CAMPOS EXISTENTES
     NÃO ALTERAR
  ======================================================= */

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

  /* =======================================================
     CHECK UNLOCK
  ======================================================= */

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem(STORAGE_KEY);

      if (unlocked === "true") {
        window.requestAnimationFrame(() => {
          setFormUnlocked(true);
        });
      }
    } catch {
      // Ignorar
    }
  }, []);

  /* =======================================================
     UNLOCK
  ======================================================= */

  const unlockForm = useCallback(() => {
    setFormUnlocked(true);

    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignorar
    }
  }, []);

  /* =======================================================
     SUBMIT EXISTENTE
     NÃO ALTERAR
  ======================================================= */

  const handleSubmitOverride = useCallback(
    async ({
      form: submittedForm,
      data,
      sourceUrl,
    }: DynamicFormSubmitOverrideContext): Promise<DynamicFormSubmitOverrideResult> => {
      try {
        const response = await fetch(
          `/api/forms/${encodeURIComponent(
            submittedForm.slug,
          )}/submit`,
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

        const result = await response
          .json()
          .catch(() => null);

        if (!response.ok || !result?.success) {
          return {
            success: false,

            error:
              result?.error ||
              "Não foi possível enviar agora. Tente novamente em instantes.",

            fieldErrors: result?.fieldErrors || {},
          };
        }

        setSubmitted(true);

        return {
          success: true,
        };
      } catch (error) {
        console.error(
          "BLUEPRINT_VSL_SUBMIT_ERROR",
          error,
        );

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
      {/* ===================================================
          GLOBAL
      ==================================================== */}

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
            font-size: clamp(30px, 3vw, 38px) !important;
            line-height: 1.18;
          }
        }

        ::selection {
          background: rgba(201, 166, 91, 0.3);
          color: #ffffff;
        }
      `}</style>

      <main className="blueprint-vsl-page min-h-screen overflow-x-hidden bg-[#050505] text-white">
        {/* =================================================
            HERO
        ================================================== */}

        <section className="relative min-h-screen overflow-hidden bg-[#050505]">
          {/* BACKGROUND */}

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

          {/* CONTENT */}

          <div className="relative z-10 mx-auto max-w-[1160px] px-4 pb-16 pt-8 sm:px-6 md:px-8 md:pt-10 lg:px-10">
            {/* LOGO */}

            <div className="flex justify-center">
              <img
                src={LOGO_URL}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[145px] object-contain sm:w-[158px] md:w-[168px]"
              />
            </div>

            {/* HEADLINE */}

            <div className="mx-auto mt-7 max-w-[900px] px-1 text-center md:mt-8">
              <h1
                className="blueprint-vsl-title mx-auto max-w-[380px] font-bold tracking-[-0.04em] text-[#F5F3EE] sm:max-w-[760px] sm:tracking-[-0.03em]"
                aria-label="Se você mora nos Estados Unidos e quer entender como dar o próximo passo no mercado imobiliário, assista a este vídeo até o final."
              >
                Se você mora nos Estados Unidos e quer entender como dar o{" "}
                <span className="text-[#D3B264]">
                  próximo passo
                </span>{" "}
                no mercado imobiliário,{" "}
                <span className="underline decoration-[#D3B264] decoration-2 underline-offset-4">
                  assista a este vídeo até o final.
                </span>
              </h1>
            </div>

            {/* AUTHORITY */}

            <div className="mx-auto mt-7 flex max-w-[660px] justify-center">
              <div className="relative flex items-center gap-4 sm:gap-5">
                <div className="relative flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#D3B264]/30 bg-[#D3B264]/[0.045]">
                  <div className="absolute inset-[-7px] rounded-full bg-[#D3B264]/[0.055] blur-[10px]" />

                  <DollarIcon />
                </div>

                <div className="text-left">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Mais de
                  </div>

                  <div className="mt-0.5 text-[16px] font-extrabold uppercase tracking-[0.06em] text-[#D3B264] sm:text-[19px]">
                    US$ 42 milhões
                  </div>
                </div>

                <div className="hidden h-[38px] w-px bg-gradient-to-b from-transparent via-[#D3B264]/45 to-transparent sm:block" />

                <div className="hidden sm:block">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#D3B264]">
                    Investidos
                  </div>

                  <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.14em] text-white/28">
                    em real estate nos EUA
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 text-center sm:hidden">
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                investidos em real estate nos EUA
              </span>
            </div>

            {/* VIDEO */}

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

            {/* LOCK MESSAGE */}

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

        {/* =================================================
            CONTEÚDO APÓS LIBERAÇÃO
        ================================================== */}

        {formUnlocked && (
          <>
            {/* =================================================
                BLOCO 2 — FORM / ANALISTA
            ================================================== */}

            <section
              id="blueprint-form"
              className="relative overflow-hidden border-t border-white/[0.05] bg-[#080808] py-20 sm:py-24 lg:py-28"
            >
              {/* BACKGROUND */}

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-350px] h-[750px] w-[1050px] -translate-x-1/2 rounded-full bg-[#C49B49]/[0.07] blur-[200px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(0,0,0,0.55)_82%)]" />
              </div>

              <div className="relative mx-auto max-w-[1160px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
                  {/* COPY */}

                  <div className="lg:sticky lg:top-10">
                    <SectionLabel>
                      Fale com um analista
                    </SectionLabel>

                    <h2 className="mt-6 max-w-[540px] text-[36px] font-normal leading-[1.02] tracking-[-0.05em] text-[#F5F3EE] sm:text-[44px] lg:text-[52px]">
                      Agora, vamos entender{" "}
                      <span className="block text-[#D3B264]">
                        o seu momento.
                      </span>
                    </h2>

                    <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-white/75">
                      Preencha o formulário e fale com um analista da Checkmate.
                    </p>

                    <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-white/45">
                      Nossa equipe vai entender onde você está hoje, quais são
                      seus objetivos no mercado imobiliário americano e
                      explicar como o Blueprint pode se encaixar na sua jornada.
                    </p>

                    {/* POINTS */}

                    <div className="mt-10 border-t border-white/[0.08]">
                      {analystPoints.map((point) => (
                        <article
                          key={point.number}
                          className="grid grid-cols-[40px_1fr] gap-3 border-b border-white/[0.07] py-6 sm:grid-cols-[48px_1fr] sm:gap-4"
                        >
                          <span className="pt-1 text-[8px] font-extrabold tracking-[0.16em] text-[#D3B264]">
                            {point.number}
                          </span>

                          <div>
                            <h3 className="text-[16px] font-semibold leading-[1.3] tracking-[-0.025em] text-[#F5F3EE]">
                              {point.title}
                            </h3>

                            <p className="mt-2 max-w-[430px] text-[11px] leading-6 text-white/38 sm:text-[12px]">
                              {point.text}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* =========================================
                      FORMULÁRIO EXISTENTE
                      NÃO ALTERADO
                  ========================================== */}

                  <div className="lg:pt-2">
                    <div className="mb-8">
                      <SectionLabel>
                        Sua aplicação
                      </SectionLabel>

                      <h2 className="mt-4 text-[30px] font-normal leading-[1.08] tracking-[-0.04em] text-[#F5F3EE] sm:text-[36px]">
                        Conte um pouco sobre você
                      </h2>

                      <p className="mt-4 max-w-[560px] text-[12px] leading-6 text-white/40">
                        Nosso time analisa cada aplicação para entender seu
                        momento e direcionar a conversa da forma mais adequada.
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
                              Checkmate Blueprint
                            </span>

                            <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.025em] text-white">
                              Fale com um analista
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

            {/* =================================================
                BLOCO 3 — O QUE É O BLUEPRINT
            ================================================== */}

            <section className="relative overflow-hidden border-t border-white/[0.05] bg-[#050505] py-20 sm:py-24 lg:py-28">
              <div className="pointer-events-none absolute right-[-380px] top-[-300px] h-[800px] w-[800px] rounded-full bg-[#C49B49]/[0.05] blur-[210px]" />

              <div className="relative mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
                  <div>
                    <SectionLabel>
                      Checkmate Blueprint
                    </SectionLabel>

                    <h2 className="mt-6 max-w-[610px] text-[36px] font-normal leading-[1.02] tracking-[-0.05em] text-[#F5F3EE] sm:text-[44px] lg:text-[52px]">
                      O Blueprint não é apenas um curso sobre{" "}
                      <span className="text-[#D3B264]">
                        Real Estate.
                      </span>
                    </h2>
                  </div>

                  <div className="lg:pb-1">
                    <p className="max-w-[570px] text-[13px] leading-7 text-white/46">
                      É um programa de acompanhamento criado para brasileiros
                      que vivem nos Estados Unidos e querem aprender a enxergar
                      o mercado imobiliário como um negócio.
                    </p>

                    <p className="mt-5 max-w-[590px] text-[13px] leading-7 text-white/46">
                      Você aprende a analisar oportunidades, entender números,
                      financiamento, construção, aquisição, margem, estratégia
                      de saída e estruturação de projetos.
                    </p>

                    <p className="mt-5 max-w-[590px] text-[14px] font-medium leading-7 text-white/72">
                      E faz isso próximo de uma empresa que atua diariamente no
                      mercado imobiliário americano.
                    </p>
                  </div>
                </div>

                {/* BENEFITS */}

                <div className="mt-14 grid border-y border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
                  {blueprintBenefits.map((item, index) => (
                    <article
                      key={item.number}
                      className={[
                        "group min-h-[235px] py-8 sm:px-7 lg:px-8 lg:py-9",

                        index !== 3
                          ? "lg:border-r lg:border-white/[0.07]"
                          : "",

                        index < 2
                          ? "border-b border-white/[0.07] lg:border-b-0"
                          : "",
                      ].join(" ")}
                    >
                      <span className="text-[8px] font-extrabold tracking-[0.16em] text-[#D3B264]">
                        {item.number}
                      </span>

                      <h3 className="mt-10 text-[19px] font-semibold tracking-[-0.03em] text-[#F5F3EE]">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-[12px] leading-6 text-white/36">
                        {item.text}
                      </p>

                      <span className="mt-7 block h-px w-8 bg-[#D3B264]/35 transition-all duration-300 group-hover:w-14 group-hover:bg-[#D3B264]" />
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* =================================================
                BLOCO 4 — OBJEÇÕES
            ================================================== */}

            <section className="bg-[#EEE9DF] py-20 text-[#171614] sm:py-24 lg:py-28">
              <div className="mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                  {/* TITLE */}

                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <LightSectionLabel>
                      Dúvidas comuns
                    </LightSectionLabel>

                    <h2 className="mt-6 max-w-[450px] text-[36px] font-medium leading-[1.02] tracking-[-0.05em] sm:text-[43px] lg:text-[49px]">
                      Talvez você esteja pensando:
                      <span className="mt-2 block text-[#9A7938]">
                        isso é para mim?
                      </span>
                    </h2>
                  </div>

                  {/* QUESTIONS */}

                  <div className="border-t border-black/15">
                    {objections.map((item) => (
                      <article
                        key={item.number}
                        className="grid gap-5 border-b border-black/10 py-8 sm:grid-cols-[54px_1fr] sm:gap-6 lg:py-10"
                      >
                        <span className="text-[9px] font-extrabold tracking-[0.14em] text-[#9A7938]">
                          {item.number}
                        </span>

                        <div>
                          <h3 className="max-w-[680px] text-[20px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[23px]">
                            {item.question}
                          </h3>

                          <div className="mt-5 max-w-[680px] space-y-3 text-[13px] leading-7 text-[#615B52]">
                            {item.paragraphs.map((paragraph) => (
                              <p key={paragraph}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                BLOCO 5 — COMO FUNCIONA
            ================================================== */}

            <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-24 lg:py-28">
              <div className="pointer-events-none absolute left-1/2 top-[-330px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-[#C49B49]/[0.055] blur-[190px]" />

              <div className="relative mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                <div className="mx-auto max-w-[760px] text-center">
                  <span className="text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#D3B264]">
                    Próximos passos
                  </span>

                  <h2 className="mt-5 text-[36px] font-normal leading-[1.04] tracking-[-0.05em] text-[#F5F3EE] sm:text-[44px] lg:text-[51px]">
                    Como funciona sua entrada no Blueprint
                  </h2>
                </div>

                <div className="mt-14 grid border-y border-white/[0.08] md:grid-cols-3">
                  {entrySteps.map((step, index) => (
                    <article
                      key={step.number}
                      className={[
                        "py-8 md:min-h-[270px] md:px-8 md:py-10",

                        index !== 2
                          ? "border-b border-white/[0.08] md:border-b-0 md:border-r"
                          : "",
                      ].join(" ")}
                    >
                      <span className="text-[9px] font-extrabold tracking-[0.16em] text-[#D3B264]">
                        {step.number}
                      </span>

                      <h3 className="mt-10 max-w-[280px] text-[20px] font-semibold leading-[1.25] tracking-[-0.03em] text-[#F5F3EE]">
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-[300px] text-[12px] leading-6 text-white/36">
                        {step.text}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <AnalystButton>
                    Quero conversar com um analista
                  </AnalystButton>
                </div>
              </div>
            </section>

            {/* =================================================
                BLOCO 6 — FAQ
            ================================================== */}

            <section className="bg-[#EEE9DF] py-20 text-[#171614] sm:py-24 lg:py-28">
              <div className="mx-auto max-w-[1060px] px-5 sm:px-7 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <LightSectionLabel>
                      Perguntas frequentes
                    </LightSectionLabel>

                    <h2 className="mt-6 max-w-[420px] text-[36px] font-medium leading-[1.02] tracking-[-0.05em] sm:text-[43px] lg:text-[49px]">
                      Ainda ficou
                      <span className="block text-[#9A7938]">
                        alguma dúvida?
                      </span>
                    </h2>

                    <p className="mt-6 max-w-[390px] text-[13px] leading-7 text-[#696257]">
                      Confira algumas das dúvidas mais comuns antes de conversar
                      com nossa equipe.
                    </p>
                  </div>

                  {/* FAQ ITEMS */}

                  <div className="border-t border-black/15">
                    {faqItems.map((item) => (
                      <details
                        key={item.question}
                        className="group border-b border-black/10"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[16px] font-medium leading-[1.4] tracking-[-0.025em] sm:text-[18px] [&::-webkit-details-marker]:hidden">
                          <span>
                            {item.question}
                          </span>

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-black/15 text-[17px] font-light text-[#9A7938] transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <div className="pb-7 pr-10">
                          <p className="max-w-[680px] text-[13px] leading-7 text-[#625C54]">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                BLOCO 7 — FINAL CTA
            ================================================== */}

            <section className="relative isolate overflow-hidden bg-[#060606] py-24 text-white sm:py-28 lg:py-32">
              {/* GLOW */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[600px] w-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C49B49]/[0.06] blur-[190px]" />

              <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#D3B264]/30 to-transparent" />

              <div className="relative mx-auto max-w-[930px] px-5 text-center sm:px-7">
                {/* LOGO */}

                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="mx-auto h-auto w-[145px] object-contain opacity-75"
                />

                {/* LABEL */}

                <span className="mt-10 block text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#D3B264]">
                  Seu próximo passo
                </span>

                {/* TITLE */}

                <h2 className="mx-auto mt-5 max-w-[850px] text-[36px] font-normal leading-[1.04] tracking-[-0.05em] text-[#F5F3EE] sm:text-[45px] lg:text-[55px]">
                  Você já conheceu a oportunidade.

                  <span className="mt-2 block text-[#D3B264]">
                    Agora descubra se ela faz sentido para o seu momento.
                  </span>
                </h2>

                {/* COPY */}

                <p className="mx-auto mt-7 max-w-[640px] text-[13px] leading-7 text-white/44">
                  Converse com um analista da Checkmate e entenda como funciona
                  o Blueprint, quais caminhos existem dentro do mercado
                  imobiliário americano e qual pode ser o seu próximo passo.
                </p>

                {/* CTA */}

                <div className="mt-9 flex justify-center">
                  <AnalystButton>
                    Quero falar com um analista
                  </AnalystButton>
                </div>

                <p className="mt-5 text-[10px] font-medium text-white/38">
                  Conversa inicial sem compromisso.
                </p>
              </div>
            </section>

            {/* =================================================
                FOOTER
            ================================================== */}

            <footer className="border-t border-white/[0.05] bg-[#040404]">
              <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 px-5 py-8 sm:px-7 md:flex-row lg:px-10">
                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="h-auto w-[125px] object-contain opacity-55"
                />

                <p className="text-center text-[8px] font-medium uppercase tracking-[0.17em] text-white/20 md:text-right">
                  Checkmate Blueprint · Real Estate · USA
                </p>
              </div>
            </footer>
          </>
        )}
      </main>
    </>
  );
}

/* =========================================================
   DARK SECTION LABEL
========================================================= */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 shrink-0 bg-[#D3B264]" />

      <span className="text-[8px] font-extrabold uppercase tracking-[0.27em] text-[#D3B264]">
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   LIGHT SECTION LABEL
========================================================= */

function LightSectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-7 shrink-0 bg-[#9A7938]" />

      <span className="text-[8px] font-extrabold uppercase tracking-[0.26em] text-[#8B6A2E]">
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   CTA BUTTON
========================================================= */

function AnalystButton({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <a
      href="#blueprint-form"
      className="
        group
        inline-flex
        min-h-[56px]
        w-full
        items-center
        justify-center
        gap-3
        rounded-[8px]
        border
        border-[#DEC477]/30
        bg-gradient-to-r
        from-[#8B682C]
        via-[#C39A48]
        to-[#DEC477]
        px-7
        text-center
        text-[10px]
        font-extrabold
        uppercase
        tracking-[0.11em]
        text-[#080808]
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_20px_70px_rgba(198,161,91,0.22)]
        sm:w-auto
        sm:px-9
      "
    >
      {children}

      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/* =========================================================
   UNAVAILABLE
========================================================= */

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
        Checkmate por um dos canais abaixo e conte sobre o seu momento.
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

/* =========================================================
   SUCCESS
========================================================= */

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
        entender melhor seu momento e conversar sobre o Blueprint.
      </p>
    </div>
  );
}

/* =========================================================
   DOLLAR ICON
========================================================= */

function DollarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative h-[19px] w-[19px]"
      fill="none"
      stroke="#D3B264"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path d="M14.7 8.8c-.55-.55-1.4-.85-2.45-.85-1.5 0-2.6.7-2.6 1.8 0 1.25 1.15 1.65 2.7 2.05 1.55.4 2.65.85 2.65 2.1 0 1.2-1.15 2.05-2.85 2.05-1.15 0-2.15-.35-2.85-1.05" />

      <path d="M12.2 6.5v11" />
    </svg>
  );
}
