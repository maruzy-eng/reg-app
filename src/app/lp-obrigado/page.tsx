import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LpThanksReveal } from "@/components/lp/lp-thanks-reveal";
import { LP_LOGO_URL } from "@/lib/lp-assets";
import "./lp-obrigado.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Acesso liberado | Checkmate Property",
  description:
    "Seu cadastro foi concluído com sucesso. Veja os próximos passos para acessar o ecossistema Checkmate Property.",
};

export default function LpObrigadoPage() {
  return (
    <section
      className={`${inter.variable} cm-thanks`}
      id="checkmate-thank-you-page"
    >
      <LpThanksReveal />

      <section className="cm-thanks-section">
        <div className="cm-bg-grid" />

        <div className="cm-squares">
          <span className="cm-square s1" />
          <span className="cm-square s2" />
          <span className="cm-square s3" />
          <span className="cm-square s4" />
        </div>

        <div className="cm-blur one" />
        <div className="cm-blur two" />

        <div className="cm-thanks-container">
          <div className="cm-hero-card cm-reveal">
            <div className="cm-logo-wrap">
              <img
                className="cm-logo"
                src={LP_LOGO_URL}
                alt="Checkmate Property"
              />
            </div>

            <div className="cm-kicker">Acesso liberado</div>

            <h1 className="cm-title">
              Parabéns. Seu acesso ao ecossistema{" "}
              <span className="cm-gradient-text">
                Checkmate foi liberado.
              </span>
            </h1>

            <p className="cm-subtitle">
              Seu cadastro foi concluído com sucesso. A partir de agora, você
              tem acesso a uma estrutura criada para clareza, controle e
              execução real no mercado imobiliário americano.
            </p>
          </div>

          <div className="cm-main-grid">
            <div className="cm-card cm-reveal cm-delay-1">
              <h2 className="cm-card-title">Próximos passos</h2>

              <p className="cm-card-subtitle">
                Uma jornada simples e rápida para você começar com segurança.
              </p>

              <div className="cm-steps">
                <div className="cm-step">
                  <div className="cm-step-number">1</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Passo 1</span>
                      <span className="cm-pill">Concluído</span>
                    </div>

                    <h3 className="cm-step-title">Cadastro confirmado</h3>

                    <p className="cm-step-text">
                      Seu perfil foi criado e seu acesso já está ativo.
                    </p>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">2</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Passo 2</span>
                      <span className="cm-pill blue">Agora</span>
                    </div>

                    <h3 className="cm-step-title">
                      Baixe o aplicativo Checkmate Property
                    </h3>

                    <p className="cm-step-text">
                      É pelo app que você acessa sua conta, acompanha
                      informações e recebe comunicações exclusivas.
                    </p>

                    <div className="cm-store-buttons">
                      <a
                        className="cm-store-btn"
                        href="https://apps.apple.com/br/app/checkmate-property/id6736963772"
                        target="_blank"
                        rel="noopener"
                      >
                        <span className="cm-store-icon">
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                              d="M17.2 13.1c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4.1 1-.8 0-2.1-1-3.5-.9-1.8 0-3.5 1.1-4.4 2.7-1.9 3.3-.5 8.1 1.3 10.7.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.6 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.4-2.9 1.4-3-.1-.1-2.9-1.2-2.9-4.4Z"
                              fill="currentColor"
                            />
                            <path
                              d="M14.6 5.1c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.1-1.5Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>

                        <span className="cm-store-copy">
                          <span className="cm-store-small">Baixar no</span>
                          <span className="cm-store-main">App Store</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">3</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Passo 3</span>
                      <span className="cm-pill blue">Senha de acesso</span>
                    </div>

                    <h3 className="cm-step-title">
                      Use esta senha no primeiro login
                    </h3>

                    <p className="cm-step-text">
                      Esta é uma senha temporária. Após entrar no aplicativo,
                      recomendamos que você altere para uma senha pessoal.
                    </p>

                    <div className="cm-password-box">
                      <div className="cm-password-row">
                        <div className="cm-password">fliphouse2026</div>
                        <div className="cm-lock">🔒</div>
                      </div>

                      <div className="cm-security">
                        <div className="cm-security-icon">🔒</div>

                        <div>
                          <h4 className="cm-security-title">Segurança</h4>

                          <p className="cm-security-text">
                            Evite compartilhar sua senha. A alteração pode ser
                            feita dentro do app.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cm-step">
                  <div className="cm-step-number">4</div>

                  <div>
                    <div className="cm-step-top">
                      <span className="cm-step-label">Passo 4</span>
                      <span className="cm-pill blue">Em seguida</span>
                    </div>

                    <h3 className="cm-step-title">
                      Fique atento ao seu WhatsApp
                    </h3>

                    <p className="cm-step-text">
                      Nossa equipe entrará em contato para orientar seus
                      primeiros passos e tirar dúvidas sobre o uso do app.
                      Mantenha as notificações ativadas para não perder nossa
                      mensagem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="cm-card cm-summary-card cm-reveal cm-delay-2">
              <div className="cm-summary-content">
                <span className="cm-summary-kicker">Resumo do seu início</span>

                <h2 className="cm-summary-title">Comece com confiança</h2>

                <p className="cm-summary-text">
                  O fluxo ideal é: baixar o app → entrar com a senha temporária
                  → acompanhar as comunicações no WhatsApp.
                </p>

                <div className="cm-status-grid">
                  <div className="cm-status-box">
                    <div className="cm-status-label">Tempo estimado</div>
                    <div className="cm-status-value">2 min</div>
                  </div>

                  <div className="cm-status-box">
                    <div className="cm-status-label">Acesso</div>
                    <div className="cm-status-value">Ativo</div>
                  </div>
                </div>

                <div className="cm-summary-line" />

                <div className="cm-summary-note">
                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>
                      Baixe o aplicativo Checkmate Property no seu celular.
                    </span>
                  </div>

                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>
                      Use a senha temporária para fazer seu primeiro login.
                    </span>
                  </div>

                  <div className="cm-note-item">
                    <span className="cm-note-check">✓</span>
                    <span>
                      Acompanhe as próximas orientações pelo WhatsApp.
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="cm-footer cm-reveal cm-delay-3">
            © 2026 Checkmate Real Estate Group
          </div>
        </div>
      </section>
    </section>
  );
}