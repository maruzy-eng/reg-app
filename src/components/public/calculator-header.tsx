import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type CalculatorHeaderProps = {
  settings: Required<SiteSettingsValue>;
};

export function CalculatorHeader({ settings }: CalculatorHeaderProps) {
  const logoUrl = settings.logo_url;
  const siteName = settings.site_name || "Checkmate Property";

  return (
    <header className="calc-header">
      <div className="calc-header-inner">
        <Link href="/" className="calc-header-logo" aria-label={siteName}>
          {logoUrl ? (
            <span className="calc-header-logo-frame">
              <Image
                src={logoUrl}
                alt={siteName}
                width={200}
                height={42}
                sizes="(max-width: 640px) 160px, 200px"
                className="calc-header-logo-image"
                priority
              />
            </span>
          ) : (
            <span className="calc-header-logo-fallback">
              <span className="calc-header-logo-mark">
                <Building2 size={20} />
              </span>
              <span className="calc-header-logo-text">{siteName}</span>
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
