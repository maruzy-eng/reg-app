import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type PublicFooterProps = {
  settings: Required<SiteSettingsValue>;
};

const companyLinks = [
  {
    label: "Search",
    href: "/",
  },
  {
    label: "Tutorial",
    href: "/tutorial",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms of Use",
    href: "/terms-of-use",
  },
  {
    label: "Data Policy",
    href: "/data-policy",
  },
];

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group my-2.5 inline-flex w-fit items-center text-sm font-medium leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 mt-0 text-base font-black leading-tight tracking-[-0.02em] text-white">
        {title}
      </h4>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export function PublicFooter({ settings }: PublicFooterProps) {
  const logoUrl = settings.logo_url;
  const currentYear = new Date().getFullYear();

  return (
    <div
      id="checkmate-property-footer"
      className="relative w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 10% 10%, rgba(83, 188, 118, 0.18), transparent 30%), radial-gradient(circle at 90% 10%, rgba(57, 175, 242, 0.18), transparent 32%), linear-gradient(135deg, #071f28 0%, #0e3541 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.20) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <footer className="cm-footer relative z-10">
        <div className="mx-auto w-full max-w-[1220px] px-4 py-16 pb-7 max-[560px]:py-12 max-[560px]:pb-6">
          <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr] gap-9 border-b border-white/10 pb-10 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-8 max-[560px]:pb-8">
            <div>
              <Link href="/" className="inline-flex no-underline">
                {logoUrl ? (
                  <span className="mb-5 inline-flex min-h-[58px] max-w-[230px] items-center justify-center rounded-2xl border border-white/10 bg-white px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                    <Image
                      src={logoUrl}
                      alt={settings.site_name || "Checkmate Property"}
                      width={190}
                      height={40}
                      sizes="190px"
                      className="block h-auto w-auto object-contain"
                      style={{
                        maxWidth: "190px",
                        maxHeight: "40px",
                      }}
                    />
                  </span>
                ) : (
                  <span className="mb-5 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white p-2 pr-4 text-[#0e3541] shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] text-white">
                      <Building2 size={21} />
                    </span>

                    <span className="text-sm font-black">
                      {settings.site_name || "Checkmate Property"}
                    </span>
                  </span>
                )}
              </Link>

              <p className="m-0 max-w-[430px] text-sm font-normal leading-[1.75] text-white/68">
                {settings.site_description ||
                  "Checkmate Property is a real estate intelligence platform built to help investors search, analyze, validate, and act with better data."}
              </p>
            </div>

            <FooterColumn title="Platform">
              <FooterLink
                href="https://app.checkmateproperty.com/#/login"
                external
              >
                Login
              </FooterLink>
            </FooterColumn>

            <FooterColumn title="Company">
              {companyLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              {legalLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          <div className="flex items-center justify-between gap-5 pt-6 text-sm font-normal leading-[1.7] text-white/60 max-[640px]:flex-col max-[640px]:items-start">
            <div>
              {currentYear} © Checkmate Property Inc. All rights reserved.
            </div>

            <div className="text-white/45">
              Real estate intelligence for smarter decisions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
