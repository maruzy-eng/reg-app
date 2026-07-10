import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { LpReveal } from "@/components/lp/lp-reveal";
import { getPublishedFormBySlug } from "@/lib/forms";
import {
  getFlipHouseImageUrl,
  LP_EXTERNAL_VIDEO_LINKS,
  LP_VIDEO_THUMBS,
  type LpFlipHouseImageNumber,
} from "@/lib/lp-assets";
import "./lp.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Aprenda Flip Houses gratuitamente | Checkmate Property",
  description:
    "Acesse gratuitamente conteúdos de Flip Houses, New Construction e tecnologia para encontrar e analisar oportunidades imobiliárias nos EUA.",
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title: "Aprenda Flip Houses gratuitamente | Checkmate Property",
    description:
      "Acesse gratuitamente conteúdos de Flip Houses, New Construction e tecnologia para encontrar e analisar oportunidades imobiliárias nos EUA.",
    url: "/lp",
    siteName: "Checkmate Property",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const LP_COLOR_LOGO_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/site-assets/branding/logo-1783036134455-checkmate-logo-color.jpg";

const topCarouselImages = [
  "17",
  "18",
  "19",
  "20",
  "17",
  "18",
  "19",
  "20",
  "17",
  "18",
  "19",
  "20",
] as LpFlipHouseImageNumber[];

const bottomCarouselImages = [
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
] as LpFlipHouseImageNumber[];

export default async function FlipHouseLandingPage() {
  const { form, fields } = await getPublishedFormBySlug("flip-house");

  if (!form) {
    notFound();
  }

  return (
    <section
      className={`${inter.variable} cmp-free`}
      id="checkmate-property-free"
    >
      <LpReveal />

      <section className="cmp-section cmp-hero">
        <div className="cmp-bg-grid" />

        <div className="cmp-squares">
          <span className="cmp-square s1" />
          <span className="cmp-square s2" />
          <span className="cmp-square s3" />
          <span className="cmp-square s4" />
          <span className="cmp-square s5" />
        </div>

        <div className="cmp-blur one" />
        <div className="cmp-blur two" />

        <div className="cmp-container">
          <div className="cmp-hero-inner">
            <div className="cmp-hero-card cmp-reveal">
              <div className="cmp-logo-wrap">
                <Image
                  className="cmp-logo"
                  src={LP_COLOR_LOGO_URL}
                  alt="Checkmate Property"
                  width={162}
                  height={70}
                  sizes="162px"
                  style={{
                    filter: "none",
                    mixBlendMode: "normal",
                    opacity: 1,
                  }}
                />
              </div>

              <div className="cmp-kicker">
                Plataforma + Academy + Operação Real
              </div>

              <h1 className="cmp-hero-title">
                <span className="cmp-hero-line">
                  Aprenda Flip Houses de maneira gratuita
                </span>
                <span className="cmp-hero-line">
                  e tenha acesso à tecnologia para encontrar
                </span>
                <span className="cmp-gradient-text">casas velhas.</span>
              </h1>

              <p className="cmp-subtitle">
                <strong>
                  Existem bancos que podem financiar até 85% da aquisição do imóvel e até 100% do valor da reforma, permitindo que o investidor preserve capital e execute o projeto com maior alavancagem.
                </strong>
            
              
                <br />
                <br />
                Analise deals, encontre oportunidades off-market, valide números
                reais e tenha acesso ao Academy completo de Flip House e New
                Construction — tudo em um ecossistema criado para brasileiros
                que querem construir operações imobiliárias nos EUA com
                estrutura profissional.
              </p>

              <div className="cmp-hero-actions">
                <a href="#cmp-property-journey" className="cmp-btn">
                  <span>Acessar Flip Houses gratuito</span>
                  <span className="cmp-btn-icon">→</span>
                </a>
              </div>

              <div className="cmp-microcopy">
                Plataforma + Academy + Operação Real
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cmp-ticker-wrap">
        <div className="cmp-ticker">
          <span>
            Flip House • New Construction • Real Estate • Deal Analysis •
            Off-Market • ARV • COMPS • Funding •
          </span>
          <span>
            Flip House • New Construction • Real Estate • Deal Analysis •
            Off-Market • ARV • COMPS • Funding •
          </span>
          <span>
            Flip House • New Construction • Real Estate • Deal Analysis •
            Off-Market • ARV • COMPS • Funding •
          </span>
          <span>
            Flip House • New Construction • Real Estate • Deal Analysis •
            Off-Market • ARV • COMPS • Funding •
          </span>
        </div>
      </div>

      <section className="cmp-image-carousel-section">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-carousel-head cmp-reveal">
            <div className="cmp-kicker">Projetos Checkmate</div>

            <h2 className="cmp-carousel-title">
              Casas, construções e{" "}
              <span className="cmp-gradient-text">Resultados reais</span>
            </h2>

            <p className="cmp-carousel-text">
              Conheça parte do nosso portfólio de projetos imobiliários nos
              Estados Unidos — casas construídas, propriedades reformadas e
              operações que mostram na prática como o mercado americano pode ser
              analisado, executado e transformado em oportunidade.
            </p>
          </div>
        </div>

        <div className="cmp-img-carousel-wrap">
          <div
            className="cmp-img-carousel-row"
            aria-label="Carrossel superior de imagens"
          >
            <div className="cmp-img-carousel-track cmp-img-carousel-track-top">
              {topCarouselImages.map((item, index) => (
                <div
                  key={`top-${item}-${index}`}
                  className="cmp-img-carousel-item"
                  aria-hidden={index >= 4 ? true : undefined}
                >
                  <Image
                    src={getFlipHouseImageUrl(item)}
                    alt={index >= 4 ? "" : `Checkmate Property tela ${item}`}
                    width={420}
                    height={525}
                    sizes="(max-width: 768px) 300px, 420px"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="cmp-img-carousel-row"
            aria-label="Carrossel inferior de imagens"
          >
            <div className="cmp-img-carousel-track cmp-img-carousel-track-bottom">
              {bottomCarouselImages.map((item, index) => (
                <div
                  key={`bottom-${item}-${index}`}
                  className="cmp-img-carousel-item"
                  aria-hidden={index >= 12 ? true : undefined}
                >
                  <Image
                    src={getFlipHouseImageUrl(item)}
                    alt={index >= 12 ? "" : `Checkmate Property tela ${item}`}
                    width={420}
                    height={525}
                    sizes="(max-width: 768px) 300px, 420px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-split">
            <div className="cmp-reveal">
              <div className="cmp-kicker">O Ecossistema Checkmate</div>

              <h2 className="cmp-title medium">
                SUA ENTRADA NO
                <br />
                <span className="cmp-gradient-text">
                  REAL ESTATE AMERICANO
                </span>
              </h2>

              <p className="cmp-copy" style={{ marginTop: "24px" }}>
                Após anos de prática e milhões de dólares movimentados em
                aquisições, reformas e vendas de imóveis nos EUA, estruturamos
                um ambiente completo para ajudar brasileiros a entenderem como o
                mercado imobiliário americano realmente funciona.
              </p>

              <div className="cmp-highlight">
                Comece agora sua jornada no mercado imobiliário americano.
              </div>

              <div style={{ marginTop: "30px" }}>
                <a href="#cmp-property-journey" className="cmp-btn">
                  <span>Acessar Flip Houses gratuito</span>
                  <span className="cmp-btn-icon">→</span>
                </a>
              </div>
            </div>

            <div className="cmp-panel cmp-reveal cmp-delay-1">
              <p className="cmp-copy cmp-center" style={{ margin: 0 }}>
                <strong>Dentro da plataforma você vai encontrar:</strong>
              </p>

              <div className="cmp-lines">
                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>Conteúdo direto, simples e aplicável. Sem enrolação.</span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Introdução ao Flip House, fundamentos de deals e visão
                    prática do mercado americano.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Acesso à plataforma Checkmate Property e suas ferramentas.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Aprendizado estruturado para quem deseja começar com mais
                    clareza.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Desenvolvimento de visão de investidor no mercado americano.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>Tudo isso dentro de um ecossistema profissional.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section compact">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Perfil</div>

            <h2 className="cmp-title medium">
              PARA QUEM É ESSE{" "}
              <span className="cmp-gradient-text">ACESSO GRATUITO?</span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 9a7 7 0 0 0-14 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>
                Empreendedor brasileiro morando nos EUA e querendo entender o
                mercado imobiliário americano.
              </h3>
              <p>
                Você já mora nos EUA. Agora é hora de aprender como investidores
                realmente operam.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 21V8l8-5 8 5v13M9 21v-8h6v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>
                Trabalha com construção, reforma ou possui experiência no setor.
              </h3>
              <p>
                Você já conhece obras. Agora pode começar a enxergar o mercado
                com visão de investidor.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 5h14v14H5zM8 9h8M8 13h8M8 17h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>
                Quer aprender Flip House de forma mais clara e estruturada.
              </h3>
              <p>Entenda os fundamentos antes de dar os próximos passos.</p>
            </div>

            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 16l5-5 4 4 7-7M14 8h6v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Busca novas oportunidades no mercado americano.</h3>
              <p>
                O mercado imobiliário pode abrir portas para crescimento e
                patrimônio.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3v18M5 8h14M7 8l-3 7h6L7 8Zm10 0-3 7h6l-3-7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Quer sair apenas do operacional e evoluir profissionalmente.</h3>
              <p>
                Desenvolva visão estratégica sobre o mercado imobiliário
                americano.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">
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
              </div>
              <h3>Quer construir patrimônio no longo prazo.</h3>
              <p>
                Aprenda os conceitos iniciais que ajudam investidores a
                identificar oportunidades.
              </p>
            </div>
          </div>

          <div className="cmp-actions-center cmp-reveal">
            <a href="#cmp-property-journey" className="cmp-btn">
              <span>Acessar Flip Houses gratuito</span>
              <span className="cmp-btn-icon">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Experiências</div>

            <h2 className="cmp-title medium">
              BRASILEIROS QUE ESTÃO
              <br />
              <span className="cmp-gradient-text">
                ENTENDENDO O MERCADO IMOBILIÁRIO AMERICANO
              </span>
            </h2>

            <p className="cmp-subtitle">
              Veja depoimentos, experiências e histórias de pessoas que
              começaram a desenvolver visão de investidor através do ecossistema
              Checkmate.
            </p>
          </div>

          <div className="cmp-video-grid">
            <a
              className="cmp-video-card cmp-reveal"
              href={LP_EXTERNAL_VIDEO_LINKS.rvdnzjzm7qa}
              target="_blank"
              rel="noopener"
            >
              <Image
                className="cmp-video-thumb"
                src={LP_VIDEO_THUMBS.rvdnzjzm7qa}
                alt="Depoimento Checkmate Property"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="cmp-video-play">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                </svg>
              </span>
              <div className="cmp-video-content">
                <span className="cmp-video-tag">Depoimento</span>
                <h3 className="cmp-video-title">
                  Experiência real dentro do ecossistema Checkmate
                </h3>
              </div>
            </a>

            <a
              className="cmp-video-card cmp-reveal cmp-delay-1"
              href={LP_EXTERNAL_VIDEO_LINKS.oneB3rs5mr7e}
              target="_blank"
              rel="noopener"
            >
              <Image
                className="cmp-video-thumb"
                src={LP_VIDEO_THUMBS.oneB3rs5mr7e}
                alt="Depoimento Checkmate Property"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="cmp-video-play">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                </svg>
              </span>
              <div className="cmp-video-content">
                <span className="cmp-video-tag">Experiência</span>
                <h3 className="cmp-video-title">
                  Brasileiros desenvolvendo visão de investidor nos EUA
                </h3>
              </div>
            </a>

            <a
              className="cmp-video-card cmp-reveal cmp-delay-2"
              href={LP_EXTERNAL_VIDEO_LINKS.onyo9rseov8}
              target="_blank"
              rel="noopener"
            >
              <Image
                className="cmp-video-thumb"
                src={LP_VIDEO_THUMBS.onyo9rseov8}
                alt="Depoimento Checkmate Property"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="cmp-video-play">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                </svg>
              </span>
              <div className="cmp-video-content">
                <span className="cmp-video-tag">História real</span>
                <h3 className="cmp-video-title">
                  Pessoas entendendo o mercado imobiliário americano
                </h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-product">
            <div className="cmp-product-visual cmp-reveal">
              <div className="cmp-dashboard">
                <div className="cmp-dashboard-top">
                  <span className="cmp-dot" />
                  <span className="cmp-dot" />
                  <span className="cmp-dot" />
                </div>

                <div className="cmp-dash-row">
                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Deal Analysis</div>
                    <div className="cmp-dash-value">ROI</div>
                    <div className="cmp-dash-bar">
                      <span />
                    </div>
                  </div>

                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">COMPS & ARV</div>
                    <div className="cmp-dash-value">ARV</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "84%" }} />
                    </div>
                  </div>
                </div>

                <div className="cmp-dash-row">
                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Academy</div>
                    <div className="cmp-dash-value">Learn</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "62%" }} />
                    </div>
                  </div>

                  <div className="cmp-dash-box">
                    <div className="cmp-dash-label">Off-Market</div>
                    <div className="cmp-dash-value">Deals</div>
                    <div className="cmp-dash-bar">
                      <span style={{ width: "76%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cmp-reveal cmp-delay-1">
              <div className="cmp-kicker">Apresentamos a</div>

              <h2 className="cmp-title medium">
                <span className="cmp-gradient-text">CHECKMATE PROPERTY</span>
              </h2>

              <p className="cmp-copy" style={{ marginTop: "24px" }}>
                Plataforma criada para ajudar brasileiros a entenderem,
                analisarem e operarem no mercado imobiliário americano com mais
                clareza, estrutura e inteligência.
              </p>

              <div className="cmp-product-cards">
                <div className="cmp-card">
                  <div className="cmp-icon">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3>Deal Analysis</h3>
                  <p>Entenda os fundamentos da análise de deals.</p>
                </div>

                <div className="cmp-card">
                  <div className="cmp-icon">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v15H6.5A2.5 2.5 0 0 1 4 16.5v-10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 8h8M8 12h6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3>Academy</h3>
                  <p>Aprenda os conceitos iniciais do Flip House.</p>
                </div>

                <div className="cmp-card">
                  <div className="cmp-icon">
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
                  </div>
                  <h3>COMPS & ARV</h3>
                  <p>Descubra como investidores avaliam propriedades.</p>
                </div>

                <div className="cmp-card">
                  <div className="cmp-icon">
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
                  </div>
                  <h3>Off-Market</h3>
                  <p>Conheça oportunidades fora do mercado tradicional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section compact">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">O Ecossistema Checkmate</div>

            <h2 className="cmp-title medium">
              O QUE VOCÊ VAI ENCONTRAR{" "}
              <span className="cmp-gradient-text">DENTRO DA PLATAFORMA</span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M5 6h14M5 18h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Conteúdo direto ao ponto</h3>
              <p>Sem complicação. Apenas fundamentos claros.</p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 18h.01M8 10a4 4 0 1 1 6.83 2.83c-1.1 1.1-2.83 1.67-2.83 3.17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Explicações práticas</h3>
              <p>Introdução ao universo do Flip House.</p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Visão do mercado americano</h3>
              <p>Entenda como investidores pensam.</p>
            </div>

            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 20h16M6 16V8M12 16V4M18 16v-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>Primeiros conceitos de deals</h3>
              <p>ARV, oportunidades e fundamentos.</p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">
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
              </div>
              <h3>Ecossistema Checkmate</h3>
              <p>Conheça a estrutura da plataforma.</p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">
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
              </div>
              <h3>Tecnologia para buscar oportunidades</h3>
              <p>Use dados para começar a analisar o mercado com mais clareza.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section compact">
        <div className="cmp-container">
          <div className="cmp-big-video cmp-reveal">
            <div className="cmp-big-video-content">
              <span className="cmp-play">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
                </svg>
              </span>

              <h2>
                Vai entender, enxergar e identificar{" "}
                <span className="cmp-gradient-text">
                  oportunidades reais.
                </span>
              </h2>

              <a href="#cmp-property-journey" className="cmp-btn">
                <span>Quero acessar agora</span>
                <span className="cmp-btn-icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="cmp-section cmp-property-journey-section"
        id="cmp-property-journey"
      >
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-journey-card cmp-reveal">
            <div className="cmp-kicker">Jornada</div>

            <h2>SUA JORNADA NO MERCADO IMOBILIÁRIO COMEÇA AGORA.</h2>

            <h3>CHECKMATE PROPERTY</h3>

            <p>
              Preencha seus dados para receber acesso gratuito à sessão inicial
              da plataforma.
            </p>
          </div>

          <div className="cmp-form-shell cmp-reveal">
            <DynamicFormComponent form={form} fields={fields} />
          </div>
        </div>
      </section>

      <footer className="cmp-footer">
        <div className="cmp-footer-inner cmp-reveal">
          <Image
            className="cmp-footer-logo"
            src={LP_COLOR_LOGO_URL}
            alt="Checkmate Property"
            width={150}
            height={65}
            sizes="150px"
            style={{
              filter: "none",
              mixBlendMode: "normal",
              opacity: 1,
            }}
          />

          <h2>
            Entre no mercado imobiliário americano com a{" "}
            <span>Checkmate Property.</span>
          </h2>

          <p>
            Plataforma, Academy e tecnologia para brasileiros que querem
            entender, analisar e encontrar oportunidades no mercado imobiliário
            dos Estados Unidos.
          </p>

          <div className="cmp-footer-actions">
            <a href="#cmp-property-journey" className="cmp-btn">
              <span>Quero meu acesso gratuito</span>
              <span className="cmp-btn-icon">→</span>
            </a>
          </div>

          <div className="cmp-footer-bottom">
            © Checkmate Property. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </section>
  );
}
