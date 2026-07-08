import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AprendaInteractions } from "@/components/aprenda/aprenda-interactions";
import { LP_LOGO_URL } from "@/lib/lp-assets";
import { APRENDA_HTML_TEMPLATE } from "./aprenda-content";
import "./aprenda.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aprenda Flip Houses e New Construction | Checkmate Property",
  description:
    "Aprenda a analisar oportunidades imobiliárias nos EUA com plataforma, Academy, dados, relatórios e tecnologia da Checkmate Property.",
};

export default function AprendaPage() {
  const html = APRENDA_HTML_TEMPLATE.replaceAll("__LP_LOGO_URL__", LP_LOGO_URL);

  return (
    <main className={`${inter.variable} aprenda-original-page`}>
      <AprendaInteractions />

      <header className="aprenda-system-header">
        <div className="aprenda-system-header-inner">
          <Link href="/aprenda" aria-label="Checkmate Property">
            <img
              className="aprenda-system-logo"
              src={LP_LOGO_URL}
              alt="Checkmate Property"
            />
          </Link>

          <nav className="aprenda-system-nav" aria-label="Menu principal">
            <a href="#cmpProblemaWhite">Problema</a>
            <a href="#cmpSolucaoWhite">Solução</a>
            <a href="#cmpAcademyCarousel">Academy</a>
            <a href="#cmpAcessoWhite">Planos</a>
            <a href="#cmpFaqWhite">FAQ</a>
          </nav>

          <a
            className="aprenda-system-login"
            href="https://app.checkmateproperty.com/#/login"
            target="_blank"
            rel="noopener"
          >
            Login
          </a>
        </div>
      </header>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
