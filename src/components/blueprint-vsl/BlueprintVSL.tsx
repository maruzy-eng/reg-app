"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
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

const STORAGE_KEY =
  "blueprint_vsl_form_unlocked";

const LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/wp-content/uploads/2025/09/logock.webp";

/* =========================================================
   TYPES
========================================================= */

type BlueprintVSLProps = {
  form: DynamicForm | null;
  fields: DynamicFormField[];
};

/* =========================================================
   MAIN
========================================================= */

export default function BlueprintVSL({
  form,
  fields,
}: BlueprintVSLProps) {
  const [formUnlocked, setFormUnlocked] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  /* =======================================================
     AJUSTA CAMPOS
  ======================================================= */

  const displayFields =
    useMemo<DynamicFormField[]>(() => {
      return fields.map((field) => ({
        ...field,

        ...(field.type === "state" ||
        /^(states?(_us)?|us_state|estado)$/i.test(
          field.name,
        )
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
      const unlocked =
        localStorage.getItem(STORAGE_KEY);

      if (unlocked === "true") {
        setFormUnlocked(true);
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
      localStorage.setItem(
        STORAGE_KEY,
        "true",
      );
    } catch {
      // Ignorar
    }
  }, []);

  /* =======================================================
     SUBMIT
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
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              data,
              source_url:
                sourceUrl || null,
            }),
          },
        );

        const result = await response
          .json()
          .catch(() => null);

        if (
          !response.ok ||
          !result?.success
        ) {
          return {
            success: false,

            error:
              result?.error ||
              "Não foi possível enviar agora. Tente novamente em instantes.",

            fieldErrors:
              result?.fieldErrors || {},
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

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      {/* ===================================================
          GLOBAL
      =================================================== */}

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

        .blueprint-vsl-page h1,
        .blueprint-vsl-page h2,
        .blueprint-vsl-page h3 {
          font-size: clamp(26px, 3vw, 36px) !important;
          line-height: 1.15;
        }

        ::selection {
          background: rgba(
            201,
            166,
            91,
            0.3
          );

          color: #ffffff;
        }
      `}</style>

      <main className="blueprint-vsl-page min-h-screen overflow-x-hidden bg-[#050505] text-white">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative min-h-screen overflow-hidden bg-[#050505]">
          {/* ===============================================
              BACKGROUND
          =============================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")`,
              }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.86)_0%,rgba(5,5,5,0.62)_34%,rgba(5,5,5,0.72)_66%,rgba(5,5,5,0.97)_100%)]" />

            {/* grain visual muito sutil */}

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          {/* ===============================================
              CONTENT
          =============================================== */}

          <div className="relative z-10 mx-auto max-w-[1160px] px-4 pb-16 pt-8 sm:px-6 md:px-8 md:pt-10 lg:px-10">
            {/* =============================================
                LOGO
            ============================================= */}

            <div className="flex justify-center">
              <img
                src={LOGO_URL}
                alt="Checkmate Real Estate Group"
                className="h-auto w-[145px] object-contain sm:w-[158px] md:w-[168px]"
              />
            </div>

            {/* =============================================
                HEADLINE
            ============================================= */}

            <div className="mx-auto mt-7 max-w-[900px] text-center md:mt-8">
              <h1 className="text-[25px] font-normal leading-[1.22] tracking-[-0.03em] text-[#F5F3EE] sm:text-[30px] md:text-[35px] lg:text-[38px]">
                Se você mora nos Estados
                Unidos e quer entender como
                dar o{" "}
                <span className="text-[#D3B264]">
                  próximo passo
                </span>{" "}
                no mercado imobiliário,
                <span className="underline decoration-[#D3B264] decoration-2 underline-offset-4">
                  assista a este vídeo até o final.
                </span>
              </h1>
            </div>

            {/* =============================================
                AUTORIDADE
            ============================================= */}

            <div className="mx-auto mt-7 flex max-w-[660px] justify-center">
              <div className="relative flex items-center gap-4 sm:gap-5">
                {/* ICON */}

                <div className="relative flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#D3B264]/30 bg-[#D3B264]/[0.045]">
                  <div className="absolute inset-[-7px] rounded-full bg-[#D3B264]/[0.055] blur-[10px]" />

                  <DollarIcon />
                </div>

                {/* TEXT */}

                <div className="text-left">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    Mais de
                  </div>

                  <div className="mt-0.5 text-[16px] font-extrabold uppercase tracking-[0.06em] text-[#D3B264] sm:text-[19px]">
                    US$ 42 milhões
                  </div>
                </div>

                {/* LINE */}

                <div className="hidden h-[38px] w-px bg-gradient-to-b from-transparent via-[#D3B264]/45 to-transparent sm:block" />

                {/* INVESTIDOS */}

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

            {/* MOBILE LABEL */}

            <div className="mt-2 text-center sm:hidden">
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                investidos em real estate nos
                EUA
              </span>
            </div>

            {/* =============================================
                VIDEO
            ============================================= */}

            <div className="relative mx-auto mt-7 max-w-[960px] sm:mt-8">
                {/* halo dourado */}

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#C69D4B]/[0.105] blur-[105px]" />

                {/* halo inferior */}

                <div className="pointer-events-none absolute bottom-[-55px] left-1/2 h-[100px] w-[65%] -translate-x-1/2 rounded-full bg-[#D0AA58]/[0.10] blur-[70px]" />

                {/* sombra */}

                <div className="pointer-events-none absolute inset-x-[10%] bottom-[-25px] h-[90px] rounded-full bg-black blur-[45px]" />

                {/* frame */}

                <div className="relative rounded-[17px] bg-gradient-to-br from-[#E1C679]/60 via-[#8A692C]/30 to-[#D3AF5B]/25 p-px shadow-[0_35px_100px_rgba(0,0,0,0.85),0_0_55px_rgba(202,161,76,0.08)]">
                  <div className="rounded-[16px] bg-[#080808] p-[5px] sm:p-[6px]">
                    <div className="overflow-hidden rounded-[12px] bg-black">
                      <VSLPlayer
                        videoId={VIMEO_VIDEO_ID}
                        unlockAt={FORM_UNLOCK_TIME_SECONDS}
                        onUnlock={unlockForm}
                      />
                    </div>
                  </div>
                </div>
            </div>

            {/* =============================================
                BELOW VIDEO
            ============================================= */}

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
                      Aguarde até o final do
                      vídeo para conhecer os
                      próximos passos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* linha inferior */}

          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D3B264]/15 to-transparent" />
        </section>

        {/* =================================================
            CONTEÚDO LIBERADO APÓS 5 MIN
        ================================================= */}

        {formUnlocked && (
          <>
            {/* =============================================
                FORM
            ============================================= */}

            <section
              id="blueprint-form"
              className="relative overflow-hidden bg-[#080808] py-20 md:py-28"
            >
              {/* BG */}

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-350px] h-[750px] w-[1050px] -translate-x-1/2 rounded-full bg-[#C49B49]/[0.07] blur-[200px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(0,0,0,0.5)_80%)]" />
              </div>

              <div className="relative mx-auto max-w-[1060px] px-5 sm:px-7 lg:px-10">
                {/* HEADER */}

                <div className="mx-auto max-w-[700px] text-center">
                  <span className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#D3B264]">
                    Seu próximo passo
                  </span>

                  <h2 className="mt-5 text-[32px] font-normal leading-[1.1] tracking-[-0.035em] text-[#F5F3EE] sm:text-[41px] md:text-[48px]">
                    Agora queremos entender
                    <span className="block">
                      um pouco sobre você.
                    </span>
                  </h2>

                  <p className="mx-auto mt-5 max-w-[530px] text-[13px] leading-7 text-white/38">
                    Preencha seus dados para
                    conversar com um analista da
                    Checkmate sobre seu momento
                    no mercado imobiliário
                    americano.
                  </p>
                </div>

                {/* FORM */}

                <div className="mx-auto mt-12 max-w-[720px]">
                  {submitted ? (
                    <SuccessState />
                  ) : form ? (
                    <div className="blueprint-vsl-form relative overflow-hidden rounded-[20px] border border-[#D3B264]/15 bg-[#0C0C0C] p-6 shadow-[0_35px_110px_rgba(0,0,0,0.55)] sm:p-8 md:p-10">
                      {/* glow */}

                      <div className="pointer-events-none absolute left-1/2 top-[-230px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#D3B264]/[0.055] blur-[120px]" />

                      <div className="relative">
                        {/* TITLE */}

                        <div className="mb-8 border-b border-white/[0.06] pb-6">
                          <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#D3B264]">
                            Checkmate Blueprint
                          </span>

                          <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.025em] text-white">
                            Fale com um analista
                          </h3>
                        </div>

                        {/* REAL FORM */}

                        <DynamicFormComponent
                          form={form}
                          fields={
                            displayFields
                          }
                          onSubmitOverride={
                            handleSubmitOverride
                          }
                        />

                        <p className="mt-5 text-center text-[9px] leading-5 text-white/20">
                          Seus dados serão
                          utilizados pela equipe
                          Checkmate para entrar em
                          contato com você.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <UnavailableState />
                  )}
                </div>
              </div>
            </section>

            {/* =============================================
                POSITIONING
            ============================================= */}

            <section className="relative overflow-hidden border-t border-white/[0.05] bg-[#050505] py-20 md:py-28">
              {/* glow */}

              <div className="pointer-events-none absolute right-[-400px] top-[-250px] h-[800px] w-[800px] rounded-full bg-[#C49B49]/[0.05] blur-[210px]" />

              <div className="relative mx-auto max-w-[1120px] px-5 sm:px-7 lg:px-10">
                {/* LABEL */}

                <div className="text-center">
                  <span className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-[#D3B264]">
                    Checkmate Blueprint
                  </span>
                </div>

                {/* TITLE */}

                <h2 className="mx-auto mt-5 max-w-[820px] text-center text-[32px] font-normal leading-[1.1] tracking-[-0.035em] text-[#F5F3EE] sm:text-[43px] md:text-[50px]">
                  Real estate é mais do que
                  <span className="block">
                    construir uma propriedade.
                  </span>
                </h2>

                {/* SUB */}

                <p className="mx-auto mt-5 max-w-[600px] text-center text-[13px] leading-7 text-white/36">
                  É entender como aquisição,
                  capital, construção, mercado e
                  estratégia trabalham juntos
                  dentro da mesma operação.
                </p>

                {/* FEATURES */}

                <div className="mt-14 grid overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.015] md:grid-cols-2">
                  <Feature
                    number="01"
                    title="Estratégia"
                    text="Entenda as decisões que acontecem antes da obra e como uma operação é estruturada."
                  />

                  <Feature
                    number="02"
                    title="Projetos reais"
                    text="Aprenda próximo de operações reais e da realidade do mercado imobiliário americano."
                  />

                  <Feature
                    number="03"
                    title="Conexões"
                    text="Aproxime-se de profissionais, parceiros e pessoas que fazem parte do ecossistema."
                  />

                  <Feature
                    number="04"
                    title="Acompanhamento"
                    text="Tenha uma equipe próxima quando surgirem oportunidades e decisões importantes."
                  />
                </div>
              </div>
            </section>

            {/* =============================================
                FINAL
            ============================================= */}

            <section className="relative overflow-hidden border-t border-white/[0.05] bg-[#080808] py-24 md:py-32">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C49B49]/[0.055] blur-[190px]" />

              <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-7">
                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="mx-auto h-auto w-[150px] object-contain opacity-80"
                />

                <h2 className="mt-9 text-[34px] font-normal leading-[1.08] tracking-[-0.04em] text-[#F5F3EE] sm:text-[45px] md:text-[54px]">
                  Você não precisa construir
                  <span className="block">
                    o próximo nível sozinho.
                  </span>
                </h2>

                <p className="mx-auto mt-5 max-w-[520px] text-[13px] leading-7 text-white/36">
                  Estratégia, projetos,
                  conexões e acompanhamento
                  para brasileiros nos Estados
                  Unidos.
                </p>
              </div>
            </section>

            {/* =============================================
                FOOTER
            ============================================= */}

            <footer className="border-t border-white/[0.05] bg-[#040404]">
              <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 px-5 py-8 sm:px-7 md:flex-row lg:px-10">
                <img
                  src={LOGO_URL}
                  alt="Checkmate Real Estate Group"
                  className="h-auto w-[125px] object-contain opacity-55"
                />

                <p className="text-center text-[8px] font-medium uppercase tracking-[0.17em] text-white/18 md:text-right">
                  Checkmate Blueprint · Real
                  Estate · USA
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
   FEATURE
========================================================= */

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group min-h-[210px] border-b border-white/[0.065] p-7 transition duration-300 hover:bg-[#D3B264]/[0.025] md:border-r md:p-9">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-extrabold tracking-[0.15em] text-[#D3B264]">
          {number}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D3B264]/15 text-[12px] text-[#D3B264]/55 transition duration-300 group-hover:border-[#D3B264]/40 group-hover:text-[#E0C77F]">
          ↗
        </span>
      </div>

      <h3 className="mt-9 text-[21px] font-semibold tracking-[-0.025em] text-[#F5F3EE]">
        {title}
      </h3>

      <p className="mt-3 max-w-[400px] text-[12px] leading-6 text-white/33">
        {text}
      </p>
    </article>
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
        Nosso formulário está sendo
        atualizado. Enquanto isso, fale com a
        Checkmate por um dos canais abaixo e
        conte sobre o seu momento.
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
        Recebemos suas informações. Nossa
        equipe poderá entrar em contato para
        entender melhor seu momento e
        conversar sobre o Blueprint.
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
