import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { LpBrasilReveal } from "@/components/lp-brasil/lp-brasil-reveal";
import { getPublishedFormBySlug } from "@/lib/forms";
import "./lp-brasil.css";

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
  title: "Invista em Real Estate nos EUA | Checkmate Group",
  description:
    "Acesse gratuitamente conteúdos e informações sobre oportunidades no mercado imobiliário americano com estrutura profissional, lastro real e exposição em dólar.",
};

export default async function LpBrasilPage() {
  let formData: Awaited<ReturnType<typeof getPublishedFormBySlug>> | null = null;

  try {
    formData = await getPublishedFormBySlug("lp-brasil");
  } catch (error) {
    console.error("Erro ao carregar formulário lp-brasil:", error);
  }

  return (
    <section
      className={`${inter.variable} cmp-invest`}
      id="checkmate-invest-eua"
    >
      <LpBrasilReveal />

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
                <a href="#formulario" className="cmp-btn">
                  <span>Quero acesso gratuito</span>
                  <span>→</span>
                </a>
              </div>

              <div className="cmp-microcopy">
                Flip House • New Construction • Real Estate • Investment
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cmp-ticker-wrap">
        <div className="cmp-ticker">
          <span>
            Flip House • New Construction • Investment • Dollar Assets •
            Massachusetts • Real Estate • Capital Preservation •
          </span>
          <span>
            Flip House • New Construction • Investment • Dollar Assets •
            Massachusetts • Real Estate • Capital Preservation •
          </span>
          <span>
            Flip House • New Construction • Investment • Dollar Assets •
            Massachusetts • Real Estate • Capital Preservation •
          </span>
          <span>
            Flip House • New Construction • Investment • Dollar Assets •
            Massachusetts • Real Estate • Capital Preservation •
          </span>
        </div>
      </div>

      <section className="cmp-section cmp-scenario-section">
        <div className="cmp-bg-grid" />

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
            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">↘</div>
              <h3>Desvalorização cambial</h3>
              <p>
                O Real perdeu grande parte do seu poder de compra frente ao
                dólar. Na prática, seu patrimônio pode encolher silenciosamente
                quando está concentrado em moeda fraca.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">⚖</div>
              <h3>Inflação acumulada</h3>
              <p>
                A inflação reduz o poder de compra ano após ano e transforma
                qualquer planejamento de longo prazo em uma corrida contra o
                tempo.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">▣</div>
              <h3>Burocracia e carga tributária</h3>
              <p>
                A complexidade brasileira limita crescimento, trava decisões e
                muitas vezes deixa capital parado onde poderia estar melhor
                posicionado.
              </p>
            </div>
          </div>

          <div className="cmp-attention-box cmp-reveal">
            <div className="cmp-attention-icon">✓</div>
            <p>
              O mercado imobiliário dos Estados Unidos segue como um dos ativos
              mais sólidos e previsíveis do mundo.
            </p>
          </div>

          <div className="cmp-actions-center cmp-reveal">
            <a href="#formulario" className="cmp-btn">
              <span>Quero acesso gratuito</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="cmp-section compact cmp-dark-band">
        <div className="cmp-bg-grid" />

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
            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">$</div>
              <h3>Exposição em dólar</h3>
              <p>
                Posicione parte do seu patrimônio em uma das moedas mais fortes
                e relevantes do mundo.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">✓</div>
              <h3>Segurança jurídica consolidada</h3>
              <p>
                Invista em um mercado com regras claras, sistema legal
                estruturado e histórico de proteção ao investidor.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">↗</div>
              <h3>Demanda real e alta liquidez</h3>
              <p>
                O mercado imobiliário americano possui volume, compradores,
                financiamento e demanda consistente ao longo dos anos.
              </p>
            </div>

            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">⌂</div>
              <h3>Ativo tangível</h3>
              <p>
                Imóveis são bens reais, com valor físico, localização, utilidade
                e potencial de preservação patrimonial.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">▲</div>
              <h3>Potencial de valorização</h3>
              <p>
                Projetos bem analisados, comprados corretamente e executados com
                eficiência podem gerar oportunidades relevantes de valorização.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">●</div>
              <h3>Economia forte</h3>
              <p>
                Enquanto muitos apenas tentam proteger patrimônio no Brasil,
                você pode entender como se posicionar em uma das maiores
                economias do mundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-bg-grid" />

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
                <br />A operação combina experiência prática, inteligência
                imobiliária, estrutura financeira e execução no campo.
              </p>

              <div className="cmp-highlight">
                Não se trata de teoria. É execução diária dentro de um dos
                mercados imobiliários mais sólidos do mundo.
              </div>

              <div style={{ marginTop: "30px" }}>
                <a href="#cmp-primeiro-passo" className="cmp-btn">
                  <span>Quero acesso gratuito</span>
                  <span>→</span>
                </a>
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

      <section className="cmp-section compact">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-section-head cmp-reveal">
            <div className="cmp-kicker">Estrutura Checkmate</div>

            <h2 className="cmp-title medium">
              Hoje operamos através de uma estrutura{" "}
              <span className="cmp-gradient-text">completa</span>
            </h2>
          </div>

          <div className="cmp-grid cols-3">
            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">⌂</div>
              <h3>Compra, reforma e revenda</h3>
              <p>
                Projetos de Flip House com análise de oportunidade, execução de
                obra e estratégia de saída.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">▥</div>
              <h3>Novas construções</h3>
              <p>
                Desenvolvimento de projetos residenciais em regiões estratégicas,
                com foco em valorização e demanda real.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">◆</div>
              <h3>Projetos em Massachusetts</h3>
              <p>
                Atuação em um dos mercados mais sólidos e competitivos dos
                Estados Unidos.
              </p>
            </div>

            <div className="cmp-card cmp-reveal">
              <div className="cmp-icon">▤</div>
              <h3>Estrutura jurídica e financeira</h3>
              <p>
                Ecossistema pensado para dar clareza, organização e suporte à
                operação.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <div className="cmp-icon">↗</div>
              <h3>Tecnologia imobiliária</h3>
              <p>
                Ferramentas próprias para análise de propriedades, comparáveis,
                ROI, ARV e oportunidades.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <div className="cmp-icon">✓</div>
              <h3>Execução operacional</h3>
              <p>
                Projetos acompanhados na prática, com visão de aquisição, obra,
                valorização e venda.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section">
        <div className="cmp-bg-grid" />

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

              <div className="cmp-highlight">
                Mais clareza antes de tomar qualquer decisão.
              </div>
            </div>

            <div className="cmp-panel cmp-reveal cmp-delay-1">
              <p className="cmp-copy" style={{ margin: 0 }}>
                <strong>Você vai entender:</strong>
              </p>

              <div className="cmp-lines">
                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Como funciona o mercado imobiliário nos EUA: aquisição,
                    construção, valorização e venda.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Como são estruturados projetos reais de Flip House e New
                    Construction.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Como brasileiros estão buscando diversificação patrimonial em
                    dólar.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Como avaliar oportunidades com mais clareza, segurança e
                    visão estratégica.
                  </span>
                </div>

                <div className="cmp-line-item">
                  <span className="cmp-check">✓</span>
                  <span>
                    Quais possibilidades de participação podem fazer sentido
                    para o seu perfil.
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "30px" }}>
                <a href="#cmp-primeiro-passo" className="cmp-btn">
                  <span>Quero acesso gratuito</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section compact cmp-dark-band">
        <div className="cmp-bg-grid" />

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
            <div className="cmp-card cmp-reveal">
              <h3>Projetos reais em andamento</h3>
              <p>
                Veja operações acontecendo na prática, com imóveis, obras e
                decisões reais.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <h3>Explicações práticas</h3>
              <p>
                Entenda cada etapa: análise, aquisição, construção, valorização e
                saída.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <h3>Ecossistema Checkmate</h3>
              <p>
                Acesse uma estrutura criada para brasileiros interessados no
                mercado americano.
              </p>
            </div>

            <div className="cmp-card cmp-reveal">
              <h3>Atualizações constantes</h3>
              <p>
                Conteúdos e bastidores para acompanhar a evolução das operações.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-1">
              <h3>Conteúdo direto ao ponto</h3>
              <p>
                Sem excesso de teoria. Uma visão clara sobre o que acontece na
                prática.
              </p>
            </div>

            <div className="cmp-card cmp-reveal cmp-delay-2">
              <h3>Visão para investidores</h3>
              <p>
                Desenvolva uma leitura mais estratégica sobre oportunidades em
                dólar.
              </p>
            </div>
          </div>

          <div className="cmp-actions-center cmp-reveal">
            <a href="#cmp-primeiro-passo" className="cmp-btn">
              <span>Quero acesso gratuito</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="cmp-section" id="cmp-primeiro-passo">
        <div className="cmp-bg-grid" />

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
              <br />O primeiro passo não é investir às cegas. O primeiro passo é
              entender como esse mercado funciona na prática e avaliar se essa
              estrutura faz sentido para o seu momento.
            </p>

            <div className="cmp-hero-actions">
              <a href="#formulario" className="cmp-btn">
                <span>Quero acesso gratuito</span>
                <span>→</span>
              </a>
            </div>

            <div
              className="cmp-microcopy"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Conheça os bastidores, entenda os projetos e avalie se faz sentido
              para você.
            </div>
          </div>
        </div>
      </section>

      <section className="cmp-section cmp-form-section" id="formulario">
        <div className="cmp-bg-grid" />

        <div className="cmp-container">
          <div className="cmp-form-heading cmp-reveal">
            <div className="cmp-kicker">Acesso gratuito</div>

            <h2 className="cmp-title medium">
              Preencha seus dados para receber acesso à{" "}
              <span className="cmp-gradient-text">LP Brasil</span>
            </h2>

            <p className="cmp-subtitle">
              Nossa equipe vai entender seu perfil e enviar os próximos passos
              para você acompanhar conteúdos e oportunidades do ecossistema
              Checkmate.
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
                  Crie e publique esse formulário no admin.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

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

          <div className="cmp-footer-kicker">Checkmate Group</div>

          <h2>
            Real Estate americano com{" "}
            <span className="cmp-gradient-text">estrutura profissional.</span>
          </h2>

          <p>
            Plataforma, tecnologia, bastidores e uma operação real para
            brasileiros que querem entender oportunidades no mercado imobiliário
            dos Estados Unidos.
          </p>

          <div className="cmp-footer-bottom">
            © Checkmate Group. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </section>
  );
}
