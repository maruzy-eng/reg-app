import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { LpBrasilReveal } from "@/components/lp-brasil/lp-brasil-reveal";
import { getPublishedFormBySlug } from "@/lib/forms";
import "./lp-br.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const LP_LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/lp-assets/logos/checkmate-logo-color.jpg";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Real Estate americano com estrutura profissional | Checkmate Property",
  description:
    "Acesse oportunidades no mercado imobiliário dos EUA com estrutura profissional, lastro real e exposição em dólar.",
  alternates: {
    canonical: "/lp-br",
  },
};

function SectionBackground() {
  return <div className="cmp-bg-grid" aria-hidden="true" />;
}

function PrimaryButton({
  href = "#formulario",
  children = "Quero acesso gratuito",
}: {
  href?: string;
  children?: string;
}) {
  return (
    <a href={href} className="cmp-btn">
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

const SCENARIO_CARDS = [
  {
    title: "Desvalorização cambial",
    description:
      "O Real perdeu grande parte do seu poder de compra frente ao dólar. Na prática, seu patrimônio pode encolher silenciosamente quando está concentrado em moeda fraca.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 17l6-6 4 4 6-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7h6v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Inflação acumulada",
    description:
      "A inflação reduz o poder de compra ano após ano e transforma qualquer planejamento de longo prazo em uma corrida contra o tempo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v18M5 8h14M7 8l-3 7h6L7 8Zm10 0-3 7h6l-3-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Burocracia e carga tributária",
    description:
      "A complexidade brasileira limita crescimento, trava decisões e muitas vezes deixa capital parado onde poderia estar melhor posicionado.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 5h14v14H5zM8 9h8M8 13h8M8 17h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

const ADVANTAGE_CARDS = [
  {
    title: "Exposição em dólar",
    description:
      "Posicione parte do seu patrimônio em uma das moedas mais fortes e relevantes do mundo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2v20M17 5.5H9.5a3 3 0 0 0 0 6H14a3 3 0 0 1 0 6H6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Segurança jurídica consolidada",
    description:
      "Invista em um mercado com regras claras, sistema legal estruturado e histórico de proteção ao investidor.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 12l2 2 4-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Demanda real e alta liquidez",
    description:
      "O mercado imobiliário americano possui volume, compradores, financiamento e demanda consistente ao longo dos anos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ativo tangível",
    description:
      "Imóveis são bens reais, com valor físico, localização, utilidade e potencial de preservação patrimonial.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 21V8l8-5 8 5v13M9 21v-8h6v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Potencial de valorização",
    description:
      "Projetos bem analisados, comprados corretamente e executados com eficiência podem gerar oportunidades relevantes de valorização.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 16l5-5 4 4 7-7M14 8h6v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Economia forte",
    description:
      "Enquanto muitos apenas tentam proteger patrimônio no Brasil, você pode entender como se posicionar em uma das maiores economias do mundo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 10h6M12 7v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

const STRUCTURE_CARDS = [
  {
    title: "Compra, reforma e revenda",
    description:
      "Projetos de Flip House com análise de oportunidade, execução de obra e estratégia de saída.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 21V8l8-5 8 5v13M9 21v-8h6v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Novas construções",
    description:
      "Desenvolvimento de projetos residenciais em regiões estratégicas, com foco em valorização e demanda real.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 21h18M6 21V9l6-4 6 4v12M9 21v-7h6v7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Projetos em Massachusetts",
    description:
      "Atuação em um dos mercados mais sólidos e competitivos dos Estados Unidos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 12l8-4.5M12 12v9M12 12L4 7.5"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Estrutura jurídica e financeira",
    description:
      "Ecossistema pensado para dar clareza, organização e suporte à operação.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 5h14v14H5zM8 9h8M8 13h8M8 17h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tecnologia imobiliária",
    description:
      "Ferramentas próprias para análise de propriedades, comparáveis, ROI, ARV e oportunidades.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Execução operacional",
    description:
      "Projetos acompanhados na prática, com visão de aquisição, obra, valorização e venda.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12h14M5 6h14M5 18h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

const PATH_ITEMS = [
  "Como funciona o mercado imobiliário nos EUA: aquisição, construção, valorização e venda.",
  "Como são estruturados projetos reais de Flip House e New Construction.",
  "Como brasileiros estão buscando diversificação patrimonial em dólar.",
  "Como avaliar oportunidades com mais clareza, segurança e visão estratégica.",
  "Quais possibilidades de participação podem fazer sentido para o seu perfil.",
] as const;

const BEHIND_SCENES_CARDS = [
  {
    title: "Projetos reais em andamento",
    description:
      "Veja operações acontecendo na prática, com imóveis, obras e decisões reais.",
  },
  {
    title: "Explicações práticas",
    description:
      "Entenda cada etapa: análise, aquisição, construção, valorização e saída.",
  },
  {
    title: "Ecossistema Checkmate",
    description:
      "Acesse uma estrutura criada para brasileiros interessados no mercado americano.",
  },
  {
    title: "Atualizações constantes",
    description:
      "Conteúdos e bastidores para acompanhar a evolução das operações.",
  },
  {
    title: "Conteúdo direto ao ponto",
    description:
      "Sem excesso de teoria. Uma visão clara sobre o que acontece na prática.",
  },
  {
    title: "Visão para investidores",
    description:
      "Desenvolva uma leitura mais estratégica sobre oportunidades em dólar.",
  },
] as const;

export default async function LpBrInvestPage() {
  let formData: Awaited<ReturnType<typeof getPublishedFormBySlug>> | null =
    null;

  try {
    formData = await getPublishedFormBySlug("lp-brasil");
  } catch (error) {
    console.error("Erro ao carregar formulário lp-brasil:", error);
  }

  return (
    <main
      className={`${inter.variable} cmp-invest`}
      id="checkmate-invest-eua"
    >
      <LpBrasilReveal />

      {/* HERO */}
      <section className="cmp-section cmp-hero">
        <SectionBackground />

        <div className="cmp-squares" aria-hidden="true">
          <span className="cmp-square s1" />
          <span className="cmp-square s2" />
          <span className="cmp-square s3" />
          <span className="cmp-square s4" />
          <span className="cmp-square s5" />
        </div>

        <div className="cmp-blur one" aria-hidden="true" />
        <div className="cmp-blur two" aria-hidden="true" />

        <div className="cmp-container">
          <div className="cmp-hero-inner">
            <div className="cmp-hero-card cmp-reveal is-visible">
              <div className="cmp-logo-wrap">
                <Image
                  className="cmp-logo"
                  src={LP_LOGO_URL}
                  alt="Checkmate Property"
                  width={324}
                  height={116}
                  priority
                />
              </div>

              <div className="cmp-kicker">
                Real Estate americano com estrutura profissional
              </div>

              <h1 className="cmp-hero-title">
                <span>Acesse oportunidades no</span>
                <span className="cmp-gradient-text">
                  mercado imobiliário dos EUA
                </span>
              </h1>

              <p className="cmp-subtitle">
                Com estrutura profissional, lastro real e exposição em dólar.
                Veja como brasileiros estão posicionando capital através de
                projetos de construção, valorização e venda de imóveis nos
                Estados Unidos.
                <br />
                <br />
                <strong>
                  Acesso voltado para quem busca diversificar patrimônio,
                  investir com visão de longo prazo e entender uma operação
                  imobiliária real no mercado americano.
                </strong>
              </p>

              <div className="cmp-hero-actions">
                <PrimaryButton />
              </div>

              <p className="cmp-microcopy">
                Flip House • New Construction • Real Estate • Investment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="cmp-ticker-wrap" aria-label="Conceitos">
        <div className="cmp-ticker">
          {[1, 2, 3, 4].map((item) => (
            <span key={item}>
              Flip House • New Construction • Investment • Dollar Assets •
              Massachusetts • Real Estate • Capital Preservation •
            </span>
          ))}
        </div>
      </div>

      {/* CENÁRIO ATUAL */}
      <section className="cmp-section cmp-scenario-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">O cenário atual</div>

            <h2 className="cmp-title medium">
              Você está cansado de investir em um país onde seu patrimônio
              parece estar sempre lutando contra o tempo?
            </h2>

            <p className="cmp-subtitle">
              Para muitos brasileiros, proteger patrimônio no longo prazo se
              tornou cada vez mais desafiador.
            </p>
          </div>

          <div className="cmp-grid cols-3">
            {SCENARIO_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`cmp-card cmp-reveal ${
                  index === 1
                    ? "cmp-delay-1"
                    : index === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <div className="cmp-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="cmp-attention-box cmp-reveal">
            <div className="cmp-attention-icon">✓</div>
            <p>
              O mercado imobiliário dos Estados Unidos segue como um dos ativos
              mais sólidos e previsíveis do mundo.
            </p>
          </div>

          <div className="cmp-actions-center cmp-reveal">
            <PrimaryButton />
          </div>
        </div>
      </section>

      {/* VANTAGENS */}
      <section className="cmp-section compact cmp-dark-band">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Vantagens estratégicas</div>

            <h2 className="cmp-title medium">
              Por que investidores brasileiros estão olhando para o{" "}
              <span className="cmp-gradient-text">
                mercado imobiliário americano?
              </span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            {ADVANTAGE_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`cmp-card cmp-reveal ${
                  index % 3 === 1
                    ? "cmp-delay-1"
                    : index % 3 === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <div className="cmp-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPERAÇÃO */}
      <section className="cmp-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-split">
            <div className="cmp-reveal">
              <div className="cmp-kicker">A operação</div>

              <h2 className="cmp-title medium">
                Quem está por trás dessa{" "}
                <span className="cmp-gradient-text">estrutura?</span>
              </h2>

              <p className="cmp-copy" style={{ marginTop: "24px" }}>
                O Grupo Checkmate, liderado por Victor Queirós e Thai Nunes,
                atua diretamente no mercado imobiliário americano com foco em
                aquisição, construção, valorização e venda de ativos.
                <br />
                <br />
                A operação combina experiência prática, inteligência
                imobiliária, estrutura financeira e execução no campo.
              </p>

              <p className="cmp-highlight">
                Não se trata de teoria. É execução diária dentro de um dos
                mercados imobiliários mais sólidos do mundo.
              </p>

              <div className="cmp-inline-cta">
                <PrimaryButton href="#cmp-primeiro-passo" />
              </div>
            </div>

            <div className="cmp-visual-box cmp-reveal cmp-delay-1">
              <div className="cmp-dashboard">
                <div className="cmp-dashboard-top">
                  <span className="cmp-dot" />
                  <span className="cmp-dot" />
                  <span className="cmp-dot" />
                </div>

                <div className="cmp-dash-row">
                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Operação</div>
                    <div className="cmp-dash-value">Flip</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "82%" }} />
                    </div>
                  </div>

                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Projetos</div>
                    <div className="cmp-dash-value">Build</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "74%" }} />
                    </div>
                  </div>
                </div>

                <div className="cmp-dash-row">
                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Mercado</div>
                    <div className="cmp-dash-value">MA</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "68%" }} />
                    </div>
                  </div>

                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Estrutura</div>
                    <div className="cmp-dash-value">Real</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "88%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESTRUTURA CHECKMATE */}
      <section className="cmp-section compact">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Estrutura Checkmate</div>

            <h2 className="cmp-title medium">
              Hoje operamos através de uma estrutura{" "}
              <span className="cmp-gradient-text">completa</span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            {STRUCTURE_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`cmp-card cmp-reveal ${
                  index % 3 === 1
                    ? "cmp-delay-1"
                    : index % 3 === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <div className="cmp-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* O CAMINHO */}
      <section className="cmp-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-split">
            <div className="cmp-reveal">
              <div className="cmp-kicker">O caminho</div>

              <h2 className="cmp-title medium">
                Agora você pode acessar essa estrutura e entender como
                participar dessas{" "}
                <span className="cmp-gradient-text">operações</span>
              </h2>

              <p className="cmp-copy" style={{ marginTop: "24px" }}>
                O primeiro passo é entender como o mercado funciona, como os
                projetos são analisados e quais critérios tornam uma
                oportunidade mais segura e estratégica.
              </p>

              <p className="cmp-highlight">
                Mais clareza antes de tomar qualquer decisão.
              </p>
            </div>

            <div className="cmp-panel cmp-reveal cmp-delay-1">
              <p className="cmp-panel-label">Você vai entender:</p>

              <div className="cmp-lines">
                {PATH_ITEMS.map((item) => (
                  <div className="cmp-line-item" key={item}>
                    <span className="cmp-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="cmp-inline-cta">
                <PrimaryButton href="#cmp-primeiro-passo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BASTIDORES */}
      <section className="cmp-section compact cmp-dark-band">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Bastidores</div>

            <h2 className="cmp-title medium">
              Acompanhe os bastidores das operações em{" "}
              <span className="cmp-gradient-text">tempo real</span>
            </h2>

            <p className="cmp-subtitle">
              Dentro do ecossistema Checkmate, você poderá acompanhar conteúdos
              e atualizações sobre operações reais no mercado americano.
            </p>
          </div>

          <div className="cmp-grid cols-3">
            {BEHIND_SCENES_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`cmp-card cmp-reveal ${
                  index % 3 === 1
                    ? "cmp-delay-1"
                    : index % 3 === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className="cmp-actions-center cmp-reveal">
            <PrimaryButton href="#cmp-primeiro-passo" />
          </div>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="cmp-section" id="cmp-primeiro-passo">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-journey-card cmp-reveal">
            <div className="cmp-kicker">Visão estratégica</div>

            <h2>Seu patrimônio não precisa estar limitado ao Brasil.</h2>

            <p>
              A maioria das pessoas conhece esse tipo de oportunidade tarde
              demais. Outras até conhecem, mas não se posicionam.
              <br />
              <br />
              Quem age com estratégia entende o mercado antes, avalia melhor as
              possibilidades e constrói patrimônio com mais clareza.
              <br />
              <br />
              O primeiro passo não é investir às cegas. O primeiro passo é
              entender como esse mercado funciona na prática e avaliar se essa
              estrutura faz sentido para o seu momento.
            </p>

            <div className="cmp-hero-actions">
              <PrimaryButton />
            </div>

            <p className="cmp-microcopy cmp-microcopy-on-dark">
              Conheça os bastidores, entenda os projetos e avalie se faz sentido
              para você.
            </p>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="cmp-section cmp-form-section" id="formulario">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-form-heading cmp-reveal">
            <div className="cmp-kicker">Próximo passo</div>

            <h2 className="cmp-title medium">
              Avalie se esse tipo de operação faz sentido para o seu perfil
            </h2>

            <p className="cmp-subtitle">
              Preencha o formulário abaixo para você receber o acesso às
              informações valiosas do mercado imobiliário nos EUA.
            </p>

            <p className="cmp-copy cmp-section-copy">
              Este acesso é mais indicado para pessoas que buscam investir em
              dólar através de ativos imobiliários nos Estados Unidos.
            </p>
          </div>

          <div className="cmp-form-shell cmp-reveal cmp-delay-1">
            {formData?.form && formData?.fields ? (
              <DynamicFormComponent
                form={formData.form}
                fields={formData.fields}
              />
            ) : (
              <div className="cmp-form-fallback">
                <h3>Formulário lp-brasil ainda não encontrado.</h3>
                <p>
                  Publique o formulário com o slug{" "}
                  <strong>lp-brasil</strong> no painel administrativo.
                </p>
                <div className="cmp-form-fallback-list">
                  <strong>Campos sugeridos:</strong>
                  <div className="cmp-lines">
                    {[
                      "Digite seu nome e sobrenome *",
                      "Digite seu email *",
                      "Digite seu numero de WhatsApp *",
                      "Selecione seu estado *",
                      "Objetivo principal *",
                    ].map((item) => (
                      <div className="cmp-line-item" key={item}>
                        <span className="cmp-check" aria-hidden="true">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="cmp-footer">
        <div className="cmp-footer-inner cmp-reveal">
          <div className="cmp-footer-logo-wrap">
            <Image
              className="cmp-footer-logo"
              src={LP_LOGO_URL}
              alt="Checkmate Property"
              width={308}
              height={110}
            />
          </div>

          <div className="cmp-footer-kicker">A oportunidade</div>

          <h2>
            A oportunidade de acessar o mercado imobiliário dos EUA de forma
            estruturada{" "}
            <span className="cmp-gradient-text">começa aqui</span>
          </h2>

          <p>
            O próximo passo é entender se esse modelo faz sentido para o seu
            momento.
          </p>

          <div className="cmp-footer-actions" style={{ marginTop: "28px" }}>
            <PrimaryButton>quero acesso gratuito</PrimaryButton>
          </div>

          <nav className="cmp-footer-nav" aria-label="Documentos legais">
            <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
              Termos de Uso
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
          </nav>

          <div className="cmp-footer-bottom">
            © Checkmate Property. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
