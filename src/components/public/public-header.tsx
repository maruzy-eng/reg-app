"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type PublicHeaderProps = {
  settings: Required<SiteSettingsValue>;
};

const navLinks = [
  {
    label: "Search",
    href: "/",
  },
  {
    label: "Tutorial",
    href: "/en/academy-videos",
  },
  {
    label: "Contact",
    href: "/en/contact-us",
  },
];

const loginUrl = "https://app.checkmateproperty.com/#/login";

export function PublicHeader({ settings }: PublicHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = settings.logo_url;
  const siteName = settings.site_name || "Checkmate Property";

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement | null;

      if (!target) {
        return;
      }

      const header = document.getElementById("checkmate-property-header");

      if (header && !header.contains(target)) {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="checkmate-property-header"
      className="sticky top-0 z-[99999] w-full border-b border-[#0e3541]/10 bg-white shadow-[0_10px_35px_rgba(14,53,65,0.04)]"
    >
      <header className="cm-property-header">
        <nav
          className="relative mx-auto flex min-h-[78px] w-full max-w-[1220px] items-center justify-between gap-6 px-4 py-3 max-[760px]:min-h-[70px]"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="relative z-[3] inline-flex max-w-[250px] items-center gap-3 no-underline max-[760px]:max-w-[180px]"
            aria-label={siteName}
            onClick={closeMenu}
          >
            {logoUrl ? (
              <span className="inline-flex min-h-[52px] max-w-[235px] items-center justify-center rounded-2xl bg-white px-2 py-1">
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={220}
                  height={46}
                  sizes="(max-width: 760px) 180px, 220px"
                  className="block h-auto w-auto object-contain"
                  style={{
                    maxWidth: "220px",
                    maxHeight: "46px",
                  }}
                />
              </span>
            ) : (
              <span className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] text-white shadow-[0_14px_28px_rgba(83,188,118,0.22)] max-[760px]:h-10 max-[760px]:w-10">
                  <Building2 size={22} />
                </span>

                <span className="hidden text-sm font-black leading-tight tracking-[-0.02em] text-[#0e3541] sm:block">
                  {siteName}
                </span>
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="public-navigation-menu"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen((current) => !current);
            }}
            className="relative z-[3] hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#0e3541]/10 bg-white p-0 text-[#0e3541] shadow-[0_12px_30px_rgba(14,53,65,0.08)] transition hover:bg-[#f8fafc] max-[760px]:inline-flex"
          >
            <span
              className={`relative block h-0.5 w-[18px] rounded-full bg-current transition-all duration-200 before:absolute before:left-0 before:h-0.5 before:w-[18px] before:rounded-full before:bg-current before:transition-all before:duration-200 after:absolute after:left-0 after:h-0.5 after:w-[18px] after:rounded-full after:bg-current after:transition-all after:duration-200 ${
                isOpen
                  ? "bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45"
                  : "before:-top-1.5 after:top-1.5"
              }`}
            />
          </button>

          <div
            id="public-navigation-menu"
            className={`flex items-center gap-7 text-sm font-semibold text-[#0e3541] max-[760px]:absolute max-[760px]:left-4 max-[760px]:right-4 max-[760px]:top-[calc(100%+10px)] max-[760px]:grid max-[760px]:gap-2 max-[760px]:rounded-[24px] max-[760px]:border max-[760px]:border-[#0e3541]/10 max-[760px]:bg-white/96 max-[760px]:p-3.5 max-[760px]:shadow-[0_24px_70px_rgba(14,53,65,0.16)] max-[760px]:backdrop-blur-2xl max-[760px]:transition-all max-[760px]:duration-200 ${
              isOpen
                ? "max-[760px]:pointer-events-auto max-[760px]:visible max-[760px]:translate-y-0 max-[760px]:opacity-100"
                : "max-[760px]:pointer-events-none max-[760px]:invisible max-[760px]:-translate-y-2 max-[760px]:opacity-0"
            }`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="relative font-semibold text-[#0e3541]/75 no-underline transition duration-200 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] after:transition-all after:duration-200 hover:-translate-y-0.5 hover:text-[#0e3541] hover:after:w-full max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[16px] max-[760px]:bg-[#f8fafc] max-[760px]:px-4 max-[760px]:py-2.5 max-[760px]:text-[#0e3541] max-[760px]:after:hidden"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={loginUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-5 py-3 text-sm font-bold !text-white opacity-100 shadow-[0_14px_30px_rgba(57,175,242,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(57,175,242,0.30)] max-[760px]:mt-1 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:rounded-[16px] max-[760px]:px-4 max-[760px]:py-2.5"
            >
              Login
              <ExternalLink size={15} />
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
