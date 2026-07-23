import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type CalculatorFooterProps = {
  settings: Required<SiteSettingsValue>;
};

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Data Policy", href: "/data-policy" },
];

export function CalculatorFooter({ settings }: CalculatorFooterProps) {
  const logoUrl = settings.logo_url;
  const siteName = settings.site_name || "Checkmate Property";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="calc-footer">
      <div className="calc-footer-inner">
        <div className="calc-footer-brand">
          <Link href="/" className="calc-footer-logo" aria-label={siteName}>
            {logoUrl ? (
              <span className="calc-footer-logo-frame">
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={170}
                  height={36}
                  sizes="170px"
                  className="calc-footer-logo-image"
                />
              </span>
            ) : (
              <span className="calc-footer-logo-fallback">
                <span className="calc-footer-logo-mark">
                  <Building2 size={18} />
                </span>
                <span>{siteName}</span>
              </span>
            )}
          </Link>

          <p>
            {settings.site_tagline ||
              "Real estate intelligence to help investors analyze deals faster."}
          </p>
        </div>

        <nav className="calc-footer-links" aria-label="Legal">
          {legalLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="calc-footer-copy">
          <span>
            {currentYear} © Checkmate Property Inc. All rights reserved.
          </span>
          <span>Free Flip Calculator</span>
        </div>
      </div>
    </footer>
  );
}
