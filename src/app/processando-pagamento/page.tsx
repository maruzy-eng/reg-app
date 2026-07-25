import type { Metadata } from "next";

import { HomeContainer } from "@/components/home/home-ui";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Processando Pagamento",
  description:
    "Parabéns! Sua inscrição foi concluída com sucesso. Estamos processando a validação do seu pagamento.",
  path: "/processando-pagamento",
  noIndex: true,
});

export default function ProcessandoPagamentoPage() {
  return (
    <div className="checkmate-home min-h-screen overflow-x-hidden bg-[#050505] text-white antialiased selection:bg-[#ebca84] selection:text-[#171614]">
      <main className="relative isolate flex min-h-screen items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(201,162,77,0.18),transparent_42%),radial-gradient(circle_at_82%_88%,rgba(201,162,77,0.1),transparent_36%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <HomeContainer className="py-16 sm:py-20">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#c9a24d]/35 bg-[#c9a24d]/15 text-[#ebca84] shadow-[0_0_0_10px_rgba(201,162,77,0.08)]">
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
            </div>

            <span className="mt-8 inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
              <span className="h-px w-9 bg-[#ebca84]/70" />
              Processando Pagamento
              <span className="h-px w-9 bg-[#ebca84]/70" />
            </span>

            <h1 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance">
              Parabéns! sua inscrição foi concluída com sucesso.
            </h1>

            <p className="mx-auto mt-6 max-w-[560px] text-[1.05rem] leading-[1.75] text-white/65">
              Estamos processando a validação do seu pagamento. Assim que for
              aprovado, você receberá um e-mail com todos os detalhes de acesso
              ao Programa.
            </p>

            <div className="mx-auto mt-10 max-w-[520px] rounded-[28px] border border-[#c9a24d]/25 bg-[#c9a24d]/10 px-6 py-7 sm:px-8">
              <p className="text-[1.05rem] font-semibold leading-[1.65] tracking-[-0.02em] text-[#efd992]">
                Bem-vindo(a) à Checkmate — sua nova jornada no Real Estate dos
                EUA começa agora.
              </p>
            </div>
          </div>
        </HomeContainer>
      </main>
    </div>
  );
}
