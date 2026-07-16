import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { LpReveal } from "@/components/lp/lp-reveal";
import { YouTubeVideoCover } from "@/components/lp/youtube-video-cover";
import { getPublishedFormBySlug } from "@/lib/forms";
import {
  getFlipHouseImageUrl,
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
  title:
    "Conteúdo Gratuito de Flip House e Real Estate | Checkmate Property",
  description:
    "Aprenda os fundamentos de Flip House, conheça processos de análise imobiliária e descubra as ferramentas da Checkmate Property para pesquisar propriedades nos Estados Unidos.",
  alternates: {
    canonical: "/lp",
  },
  openGraph: {
    title:
      "Conteúdo Gratuito de Flip House e Real Estate | Checkmate Property",
    description:
      "Aprenda os fundamentos de Flip House, conheça processos de análise imobiliária e descubra as ferramentas da Checkmate Property para pesquisar propriedades nos Estados Unidos.",
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

const INSTITUTIONAL_IMAGE_URL =
  "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/property-media/properties/3-weston-st-lexington-ma-02421/images/000-3-weston2.jpeg";

const TOP_CAROUSEL_IMAGES = [
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

const BOTTOM_CAROUSEL_IMAGES = [
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

const TESTIMONIALS = [
  {
    id: "testimonial-01",
    type: "Relato",
    title: "Conhecendo o ecossistema Checkmate",
    youtubeId: "RvdnzJzm7QA",
  },
  {
    id: "testimonial-02",
    type: "Experiência",
    title: "Aprendizado sobre o mercado imobiliário americano",
    youtubeId: "1B3Rs5mR7-E",
  },
  {
    id: "testimonial-03",
    type: "História",
    title: "Conteúdo e experiência prática com a Checkmate",
    youtubeId: "Onyo9rSEoV8",
  },
] as const;

const PRESENTATION_VIDEO = {
  title: "Apresentação da Checkmate Property",
  youtubeId: "Yl65_FE6v5I",
} as const;

const AUDIENCE_PROFILES = [
  {
    number: "01",
    title: "Está conhecendo o mercado americano",
    description:
      "Para quem deseja entender os conceitos e as principais etapas antes de analisar um projeto.",
  },
  {
    number: "02",
    title: "Realtor ou profissional de Real Estate",
    description:
      "Para profissionais que desejam ampliar seus conhecimentos sobre análise, reforma e desenvolvimento de propriedades.",
  },
  {
    number: "03",
    title: "Construtor ou prestador de serviços",
    description:
      "Para quem trabalha com construção, reforma ou serviços relacionados ao setor imobiliário.",
  },
  {
    number: "04",
    title: "Empreendedor do setor imobiliário",
    description:
      "Para quem busca compreender melhor os processos envolvidos em projetos residenciais nos Estados Unidos.",
  },
  {
    number: "05",
    title: "Está estudando seu primeiro projeto",
    description:
      "Para quem deseja conhecer os fundamentos antes de tomar decisões sobre uma propriedade.",
  },
  {
    number: "06",
    title: "Já analisa propriedades",
    description:
      "Para quem deseja organizar melhor seus critérios de pesquisa, comparação e avaliação.",
  },
  {
    number: "07",
    title: "Já executou projetos imobiliários",
    description:
      "Para profissionais que desejam conhecer novas ferramentas e processos de análise.",
  },
  {
    number: "08",
    title: "Prefere aprender em português",
    description:
      "Para quem busca conteúdo claro e organizado sobre o mercado imobiliário americano em português.",
  },
] as const;

const INTRODUCTORY_CONTENT_ITEMS = [
  "Conteúdo direto e organizado sobre o mercado imobiliário americano.",
  "Introdução aos fundamentos de Flip House e New Construction.",
  "Conceitos iniciais de pesquisa e análise de propriedades.",
  "Apresentação das ferramentas da Checkmate Property.",
  "Explicações sobre custos, etapas e critérios de avaliação de projetos.",
  "Experiência prática aplicada ao conteúdo e à tecnologia.",
] as const;

const INSTITUTIONAL_ITEMS = [
  "Ferramentas para pesquisa e análise de propriedades.",
  "Processos organizados para planejamento e acompanhamento de projetos.",
  "Experiência prática aplicada ao desenvolvimento da plataforma.",
  "Recursos criados para apoiar decisões com mais informação e organização.",
] as const;

const CONTENT_RESOURCES = [
  {
    icon: "⌂",
    title: "Fundamentos de Flip House",
    description:
      "Conheça os conceitos iniciais, as principais etapas e os termos utilizados nesse tipo de projeto.",
  },
  {
    icon: "⌕",
    title: "Análise de propriedades",
    description:
      "Entenda os critérios básicos utilizados na pesquisa e avaliação de um projeto imobiliário.",
  },
  {
    icon: "◎",
    title: "Mercado imobiliário americano",
    description:
      "Conheça fatores do mercado que devem ser considerados antes da análise de uma propriedade.",
  },
  {
    icon: "≋",
    title: "COMPS e ARV",
    description:
      "Veja como propriedades comparáveis e estimativas de valor são utilizadas durante uma análise.",
  },
  {
    icon: "▦",
    title: "Plataforma Checkmate Property",
    description:
      "Conheça a estrutura da tecnologia e os principais recursos desenvolvidos pela Checkmate.",
  },
  {
    icon: "✓",
    title: "Planejamento de projetos",
    description:
      "Entenda como dados, custos e etapas podem ser organizados para apoiar o planejamento.",
  },
] as const;

function SectionBackground() {
  return <div className="cmp-bg-grid" aria-hidden="true" />;
}

function PrimaryButton({
  href = "#formulario",
  children = "Acessar conteúdo gratuito",
}: {
  href?: string;
  children?: string;
}) {
  return (
    <a href={href} className="cmp-btn">
      <span>{children}</span>
      <span className="cmp-btn-icon" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export default async function FlipHouseLandingPage() {
  const { form, fields } = await getPublishedFormBySlug("flip-house");

  if (!form) {
    notFound();
  }

  return (
    <main className={`${inter.variable} cmp-free`} id="checkmate-property-free">
      <LpReveal />

      {/* BLOCO 01 — HERO */}
      <section className="cmp-section cmp-hero">
        <SectionBackground />

        <div className="cmp-squares" aria-hidden="true">
          <span className="cmp-square s1" />
          <span className="cmp-square s2" />
          <span className="cmp-square s3" />
          <span className="cmp-square s4" />
          <span className="cmp-square s5" />
        </div>

        <div className="cmp-container">
          <div className="cmp-hero-inner cmp-reveal is-visible">
            <div className="cmp-logo-wrap">
              <Image
                className="cmp-logo"
                src={LP_COLOR_LOGO_URL}
                alt="Checkmate Property"
                width={324}
                height={116}
                priority
              />
            </div>

            <div className="cmp-kicker">
              Tecnologia, conteúdo e experiência prática
            </div>

            <h1 className="cmp-hero-title">
              <span className="cmp-hero-line">
                Aprenda os fundamentos de Flip House 
              </span><b> </b>
              <span className="cmp-gradient-text">
                 e conheça ferramentas para analisar propriedades nos Estados
                Unidos
              </span>
            </h1>

            <p className="cmp-subtitle">
              Acesse gratuitamente um conteúdo introdutório sobre Flip House e
              conheça a tecnologia da Checkmate Property para pesquisar
              propriedades, analisar projetos e compreender melhor o mercado
              imobiliário americano.
            </p>

            <p className="cmp-copy cmp-hero-copy">
              Conteúdo em português, desenvolvido a partir da experiência
              prática da Checkmate em projetos de reforma, construção e análise
              imobiliária nos Estados Unidos.
            </p>

            <div className="cmp-hero-actions">
              <PrimaryButton />
            </div>

            <p className="cmp-microcopy">
              Cadastro gratuito • Sem cartão de crédito
            </p>
          </div>
        </div>
      </section>

      {/* BLOCO 02 — TICKER */}
      <div
        className="cmp-ticker-wrap"
        aria-label="Conceitos abordados no conteúdo"
      >
        <div className="cmp-ticker">
          {[1, 2, 3, 4].map((item) => (
            <span key={item}>
              FLIP HOUSE • NEW CONSTRUCTION • PROPERTY RESEARCH • DEAL ANALYSIS
              • MARKET DATA • COMPS • ARV • PROJECT PLANNING •
            </span>
          ))}
        </div>
      </div>

      {/* BLOCO 03 — PORTFÓLIO */}
      <section className="cmp-image-carousel-section cmp-portfolio-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Portfólio Checkmate</div>

            <h2 className="cmp-title medium">
              Projetos desenvolvidos e executados pela{" "}
              <span className="cmp-gradient-text">Checkmate</span>
            </h2>

            <p className="cmp-subtitle">
              Conheça alguns projetos residenciais realizados pela Checkmate nos
              Estados Unidos, incluindo reformas, novas construções e diferentes
              etapas de desenvolvimento e execução.
            </p>

            <p className="cmp-copy cmp-section-copy">
              Esses projetos demonstram a experiência prática da empresa no
              mercado imobiliário americano. Cada propriedade possui
              características, condições e resultados específicos.
            </p>
          </div>
        </div>

        <div className="cmp-img-carousel-wrap cmp-reveal">
          <div
            className="cmp-img-carousel-row"
            aria-label="Carrossel superior de imagens"
          >
            <div className="cmp-img-carousel-track cmp-img-carousel-track-top">
              {TOP_CAROUSEL_IMAGES.map((item, index) => (
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
              {BOTTOM_CAROUSEL_IMAGES.map((item, index) => (
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

        <div className="cmp-container">
          <aside className="cmp-note cmp-reveal">
            <span className="cmp-note-mark" aria-hidden="true">
              !
            </span>
            <p>
              Os projetos apresentados são exemplos específicos do portfólio da
              Checkmate Property e não constituem promessa ou garantia de
              resultados.
            </p>
          </aside>
        </div>
      </section>

      {/* BLOCO 04 — EXPERIÊNCIA PRÁTICA */}
      <section className="cmp-section compact cmp-dark-band">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-split">
            <div className="cmp-reveal">
              <div className="cmp-kicker">Experiência prática Checkmate</div>

              <h2 className="cmp-title medium">
                Entenda como funciona o{" "}
                <span className="cmp-gradient-text">
                  mercado imobiliário americano
                </span>
              </h2>

              <p className="cmp-copy cmp-copy-lead">
                A partir da experiência prática da Checkmate em reformas, novas
                construções e análise de propriedades nos Estados Unidos,
                organizamos conteúdos e ferramentas para apresentar os
                principais fundamentos desse mercado de forma clara e
                estruturada.
              </p>

              <p className="cmp-highlight">
                Comece pelos fundamentos e conheça os processos utilizados na
                análise de projetos imobiliários.
              </p>

              <div className="cmp-inline-cta">
                <PrimaryButton />
              </div>
            </div>

            <div className="cmp-panel cmp-reveal cmp-delay-1">
              <p className="cmp-panel-label">
                Neste acesso introdutório, você encontrará:
              </p>

              <div className="cmp-lines">
                {INTRODUCTORY_CONTENT_ITEMS.map((item) => (
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
        </div>
      </section>

      {/* BLOCO 05 — PÚBLICO */}
      <section className="cmp-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Perfis de público</div>

            <h2 className="cmp-title medium">
              Para quem é este{" "}
              <span className="cmp-gradient-text">conteúdo introdutório?</span>
            </h2>

            <p className="cmp-subtitle">
              Este conteúdo foi desenvolvido para pessoas interessadas em
              compreender melhor os processos, ferramentas e critérios
              utilizados no mercado imobiliário dos Estados Unidos.
            </p>
          </div>

          <div className="cmp-grid cols-3">
            {AUDIENCE_PROFILES.map((profile, index) => (
              <article
                key={profile.number}
                className={`cmp-card cmp-reveal ${
                  index % 3 === 1
                    ? "cmp-delay-1"
                    : index % 3 === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <div className="cmp-icon" aria-hidden="true">
                  {profile.number}
                </div>
                <h3>{profile.title}</h3>
                <p>{profile.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 06 — DEPOIMENTOS */}
      <section className="cmp-section compact cmp-dark-band">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Experiências</div>

            <h2 className="cmp-title medium">
              Conheça experiências com o{" "}
              <span className="cmp-gradient-text">ecossistema Checkmate</span>
            </h2>

            <p className="cmp-subtitle">
              Veja relatos de pessoas que tiveram contato com os conteúdos,
              atividades e ferramentas da Checkmate Property para compreender
              melhor o mercado imobiliário americano.
            </p>
          </div>

          <div className="cmp-grid cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className={`cmp-card cmp-media-card cmp-reveal ${
                  index === 1
                    ? "cmp-delay-1"
                    : index === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <YouTubeVideoCover
                  youtubeId={testimonial.youtubeId}
                  title={testimonial.title}
                  phrase={testimonial.title}
                  compact
                />

                <div className="cmp-media-body">
                  <div className="cmp-kicker">{testimonial.type}</div>
                  <h3>{testimonial.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <aside className="cmp-note cmp-note-on-dark cmp-reveal">
            <span className="cmp-note-mark" aria-hidden="true">
              !
            </span>
            <p>
              Os relatos apresentados representam experiências individuais. O
              uso dos conteúdos ou das ferramentas da Checkmate Property não
              garante resultados financeiros, comerciais ou imobiliários.
            </p>
          </aside>
        </div>
      </section>

      {/* BLOCO 07 — INSTITUCIONAL */}
      <section className="cmp-section">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-institutional-split">
            <div className="cmp-institutional cmp-reveal">
              <div className="cmp-kicker">Sobre a Checkmate Property</div>

              <h2 className="cmp-title medium">
                Tecnologia desenvolvida a partir da{" "}
                <span className="cmp-gradient-text">
                  experiência prática no mercado imobiliário
                </span>
              </h2>

              <p className="cmp-copy cmp-copy-lead">
                A Checkmate Property foi criada por profissionais que atuam
                diretamente em projetos de Flip House, novas construções e
                desenvolvimento residencial nos Estados Unidos.
              </p>

              <p className="cmp-copy">
                Nossa tecnologia e nossos processos foram desenvolvidos a partir
                das necessidades encontradas durante a pesquisa, análise,
                planejamento, execução e acompanhamento de projetos
                imobiliários.
              </p>

              <div className="cmp-lines">
                {INSTITUTIONAL_ITEMS.map((item) => (
                  <div className="cmp-line-item" key={item}>
                    <span className="cmp-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cmp-institutional-visual cmp-reveal cmp-delay-1">
              <Image
                className="cmp-institutional-visual-image"
                src={INSTITUTIONAL_IMAGE_URL}
                alt="Projeto residencial Checkmate em Lexington, Massachusetts"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div
                className="cmp-institutional-visual-overlay"
                aria-hidden="true"
              />
              <div className="cmp-institutional-visual-label">
                <strong>Projetos residenciais</strong>
                <span>Experiência prática aplicada à tecnologia.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 08 — CONTEÚDOS E RECURSOS */}
      <section className="cmp-section compact">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Conteúdo e tecnologia</div>

            <h2 className="cmp-title medium">
              O que você encontrará neste{" "}
              <span className="cmp-gradient-text">acesso introdutório</span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            {CONTENT_RESOURCES.map((resource, index) => (
              <article
                key={resource.title}
                className={`cmp-card cmp-reveal ${
                  index % 3 === 1
                    ? "cmp-delay-1"
                    : index % 3 === 2
                      ? "cmp-delay-2"
                      : ""
                }`}
              >
                <div className="cmp-icon" aria-hidden="true">
                  {resource.icon}
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </article>
            ))}
          </div>

          <aside className="cmp-note cmp-reveal">
            <span className="cmp-note-mark" aria-hidden="true">
              i
            </span>
            <p>
              O cadastro oferece acesso ao conteúdo introdutório e à
              apresentação das ferramentas. A disponibilidade de recursos
              adicionais pode variar conforme o plano contratado.
            </p>
          </aside>
        </div>
      </section>

      {/* BLOCO 09 — VÍDEO PRINCIPAL */}
      <section className="cmp-section cmp-dark-band">
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-split">
            <div className="cmp-reveal">
              <div className="cmp-kicker">Vídeo de apresentação</div>

              <h2 className="cmp-title medium">
                Veja como pesquisar, comparar e analisar propriedades com{" "}
                <span className="cmp-gradient-text">mais clareza</span>
              </h2>

              <p className="cmp-copy cmp-copy-lead">
                Assista ao vídeo e conheça os fundamentos, processos e
                ferramentas apresentados pela Checkmate Property para
                compreender melhor a análise de projetos imobiliários nos
                Estados Unidos.
              </p>

              <div className="cmp-inline-cta">
                <PrimaryButton />
              </div>
            </div>

            <div className="cmp-visual-box cmp-reveal cmp-delay-1">
              <YouTubeVideoCover
                youtubeId={PRESENTATION_VIDEO.youtubeId}
                title={PRESENTATION_VIDEO.title}
                phrase="Veja a plataforma em ação"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 10 — CHAMADA PARA O FORMULÁRIO */}
      <section
        className="cmp-section"
        id="cmp-property-journey"
      >
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-journey-card cmp-reveal">
            <div className="cmp-kicker">Acesso gratuito</div>

            <h2>
              Cadastre-se para acessar o conteúdo introdutório da Checkmate
              Property
            </h2>

            <p>
              Preencha seus dados para conhecer os fundamentos de Flip House, os
              processos de análise de propriedades e as ferramentas apresentadas
              pela Checkmate Property.
            </p>

            <div className="cmp-hero-actions">
              <PrimaryButton />
            </div>

            <p className="cmp-microcopy cmp-microcopy-on-dark">
              Cadastro gratuito e sem necessidade de cartão de crédito. A
              disponibilidade de recursos adicionais da plataforma pode variar
              conforme o plano.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCOS 11 E 12 — FORMULÁRIO E ACEITE */}
      <section
        className="cmp-section cmp-form-section"
        id="formulario"
      >
        <SectionBackground />

        <div className="cmp-container">
          <div className="cmp-form-heading cmp-reveal">
            <div className="cmp-kicker">Acesso gratuito</div>

            <h2 className="cmp-title medium">
              Preencha seus dados para acessar o{" "}
              <span className="cmp-gradient-text">conteúdo introdutório</span>
            </h2>

            <p className="cmp-subtitle">
              Conheça os fundamentos de Flip House, os processos de análise de
              propriedades e as ferramentas apresentadas pela Checkmate
              Property.
            </p>
          </div>

          <div className="cmp-form-shell cmp-reveal cmp-delay-1">
            <DynamicFormComponent form={form} fields={fields} />
          </div>

          <p className="cmp-legal-sms cmp-reveal">
            Para cancelar mensagens SMS, responda STOP. Tarifas de mensagens e
            dados da operadora podem ser aplicadas.
          </p>
        </div>
      </section>

      <footer className="cmp-footer">
        <div className="cmp-footer-inner cmp-reveal">
          <div className="cmp-footer-logo-wrap">
            <Image
              className="cmp-footer-logo"
              src={LP_COLOR_LOGO_URL}
              alt="Checkmate Property"
              width={308}
              height={110}
            />
          </div>

          <div className="cmp-footer-kicker">Checkmate Property</div>

          <h2>
            Tecnologia e experiência prática para entender o{" "}
            <span className="cmp-gradient-text">
              mercado imobiliário americano.
            </span>
          </h2>

          <p>
            Conteúdo introdutório, ferramentas de pesquisa e processos
            estruturados para brasileiros interessados em compreender melhor
            projetos imobiliários nos Estados Unidos.
          </p>

          <nav className="cmp-footer-nav" aria-label="Documentos legais">
            <a href="/terms" target="_blank" rel="noopener noreferrer">
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
