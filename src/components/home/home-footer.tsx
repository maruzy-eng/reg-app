import Image from "next/image";
import Link from "next/link";
import { AtSign, MapPin, Phone } from "lucide-react";
import {
  homeBtnPrimaryGold,
  homeContainer,
  homeTitleGradient,
} from "@/components/home/home-ui";
import { HOME_LOGO_FOOTER } from "@/lib/home/branding";
import { SITE_CONTACT } from "@/lib/home/contact";
import { SITE_FOOTER_NAV_LINKS, SITE_LEGAL_LINKS } from "@/lib/home/nav";

type HomeFooterProps = {
  siteName: string;
  siteDescription?: string;
  supportEmail?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  copyrightText?: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M14 8h4V4h-4a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h4l1-4h-5V9a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M22 12s0-4-1-6c-.5-1-1.5-1.5-2.5-1.7C16.5 4 12 4 12 4s-4.5 0-6.5.3C4.5 4.5 3.5 5 3 6c-1 2-1 6-1 6s0 4 1 6c.5 1 1.5 1.5 2.5 1.7C7.5 20 12 20 12 20s4.5 0 6.5-.3c1-.2 2-.7 2.5-1.7 1-2 1-6 1-6Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}

function getSocialLinks(props: HomeFooterProps): SocialLink[] {
  const links: Array<SocialLink | null> = [
    props.linkedinUrl?.trim()
      ? {
          label: "LinkedIn",
          href: props.linkedinUrl,
          icon: <LinkedInIcon />,
        }
      : null,
    props.instagramUrl?.trim()
      ? {
          label: "Instagram",
          href: props.instagramUrl,
          icon: <InstagramIcon />,
        }
      : null,
    props.facebookUrl?.trim()
      ? {
          label: "Facebook",
          href: props.facebookUrl,
          icon: <FacebookIcon />,
        }
      : null,
    props.youtubeUrl?.trim()
      ? {
          label: "YouTube",
          href: props.youtubeUrl,
          icon: <YouTubeIcon />,
        }
      : null,
  ];

  return links.filter((item): item is SocialLink => item !== null);
}

export function HomeFooter({
  siteName,
  siteDescription,
  supportEmail,
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  youtubeUrl,
  copyrightText,
}: HomeFooterProps) {
  const year = new Date().getFullYear();

  const socialLinks = getSocialLinks({
    siteName,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    youtubeUrl,
  });

  return (
    <footer className="relative overflow-hidden bg-[#070707] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-[-180px] h-[440px] w-[440px] rounded-full bg-[#c79a4b]/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-[-180px] h-[420px] w-[420px] rounded-full bg-[#ebca84]/5 blur-[150px]"
      />

      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,#c79a4b_45%,#ebca84_55%,transparent)] opacity-70" />

      <div className={[homeContainer, "relative z-[1]"].join(" ")}>
        <div className="grid grid-cols-1 gap-8 border-b border-white/[0.1] py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:py-16">
          <div className="max-w-[760px]">
            <span className="inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
              <span className="h-px w-9 bg-[#ebca84]/60" />
              Build with Checkmate
            </span>

            <h2 className="mt-5 max-w-[720px] text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-white">
              Better strategy.{" "}
              <span className={homeTitleGradient}>Stronger execution.</span>
            </h2>

            <p className="mt-5 max-w-[610px] text-[0.9rem] leading-[1.75] text-white/50">
              Connect with our team to explore real estate, development,
              construction, and strategic partnership opportunities.
            </p>
          </div>

          <a
            href={supportEmail ? `mailto:${supportEmail}` : "/contact"}
            className={homeBtnPrimaryGold}
          >
            Talk to Our Team

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_0.55fr_0.55fr_1fr] lg:gap-12 lg:py-16">
          <div>
            <Link
              href="/reg"
              className="inline-flex no-underline"
              aria-label={siteName}
            >
              <Image
                src={HOME_LOGO_FOOTER}
                alt={siteName}
                width={176}
                height={40}
                className="h-auto max-h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 max-w-[31rem] text-[0.84rem] leading-[1.8] text-white/48">
              {siteDescription ||
                "Checkmate REG connects technology, development, construction, and strategic partnerships across U.S. residential real estate."}
            </p>

            {socialLinks.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-[#ebca84]/50 hover:bg-[#ebca84] hover:text-[#17110a]"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
              Navigate
            </h3>

            <div className="mt-6 flex flex-col gap-3.5">
              {SITE_FOOTER_NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-2 text-[0.82rem] text-white/48 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-[#ebca84] transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
              Legal
            </h3>

            <div className="mt-6 flex flex-col gap-3.5">
              {SITE_LEGAL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-2 text-[0.82rem] text-white/48 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-[#ebca84] transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
              Get in Touch
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              <a
                href={SITE_CONTACT.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-[0.82rem] leading-[1.55] text-white/48 transition-colors hover:text-white"
              >
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-[#ebca84]"
                  aria-hidden="true"
                />
                <span>{SITE_CONTACT.address}</span>
              </a>

              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="group flex items-start gap-3 text-[0.82rem] leading-[1.55] text-white/48 transition-colors hover:text-white"
              >
                <AtSign
                  size={15}
                  className="mt-0.5 shrink-0 text-[#ebca84]"
                  aria-hidden="true"
                />
                <span className="break-all">{SITE_CONTACT.email}</span>
              </a>

              <a
                href={SITE_CONTACT.phoneHref}
                className="group flex items-start gap-3 text-[0.82rem] leading-[1.55] text-white/48 transition-colors hover:text-white"
              >
                <Phone
                  size={15}
                  className="mt-0.5 shrink-0 text-[#ebca84]"
                  aria-hidden="true"
                />
                <span>{SITE_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.1] py-7 text-[0.72rem] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {copyrightText ||
              `© ${year} ${siteName}. All rights reserved.`}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {SITE_LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/45 transition-colors hover:text-[#ebca84]"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="#home"
              className="group inline-flex items-center gap-2 text-white/45 transition-colors hover:text-[#ebca84]"
            >
              Back to top

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}