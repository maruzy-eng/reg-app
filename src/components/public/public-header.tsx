"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type PublicHeaderProps = {
  settings: Required<SiteSettingsValue>;
};

export function PublicHeader({ settings }: PublicHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = settings.logo_url;

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
      className={`sticky top-0 z-[99999] w-full border-b border-[rgba(14,53,65,0.10)] bg-white/95 backdrop-blur-2xl ${
        isOpen ? "is-open" : ""
      }`}
    >
      <header className="cm-property-header">
        <nav
          className="relative mx-auto flex min-h-[76px] w-full max-w-[1220px] items-center justify-between gap-6 px-4 py-3 max-[760px]:min-h-[68px]"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="z-[3] inline-flex max-w-[240px] items-center gap-3 max-[760px]:max-w-[170px]"
            aria-label={settings.site_name || "Checkmate Property"}
            onClick={closeMenu}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={settings.site_name || "Checkmate Property"}
                className="block h-auto w-auto object-contain"
                style={{
                  maxWidth: "220px",
                  maxHeight: "46px",
                }}
              />
            ) : (
              <span className="inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] text-white max-[760px]:h-10 max-[760px]:w-10">
                  <Building2 size={22} />
                </span>

                <span className="hidden text-sm font-bold leading-tight text-[#0e3541] sm:block">
                  {settings.site_name || "Checkmate Property"}
                </span>
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen((current) => !current);
            }}
            className="relative z-[3] hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[rgba(14,53,65,0.12)] bg-white p-0 text-[#0e3541] shadow-[0_12px_30px_rgba(14,53,65,0.08)] max-[760px]:inline-flex"
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
            className={`flex items-center gap-6 text-sm font-normal text-[#0e3541] max-[760px]:absolute max-[760px]:left-0 max-[760px]:right-0 max-[760px]:top-[calc(100%+10px)] max-[760px]:grid max-[760px]:gap-2 max-[760px]:rounded-[22px] max-[760px]:border max-[760px]:border-[rgba(14,53,65,0.10)] max-[760px]:bg-white/95 max-[760px]:p-3.5 max-[760px]:shadow-[0_24px_70px_rgba(14,53,65,0.16)] max-[760px]:transition-all max-[760px]:duration-200 ${
              isOpen
                ? "max-[760px]:visible max-[760px]:translate-y-0 max-[760px]:opacity-100 max-[760px]:pointer-events-auto"
                : "max-[760px]:invisible max-[760px]:-translate-y-2 max-[760px]:opacity-0 max-[760px]:pointer-events-none"
            }`}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="font-normal text-[#0e3541] opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[14px] max-[760px]:bg-[rgba(83,188,118,0.06)] max-[760px]:px-3 max-[760px]:py-2.5 max-[760px]:opacity-100"
            >
              Search
            </Link>

            <Link
              href="/properties?type=new_construction"
              onClick={closeMenu}
              className="font-normal text-[#0e3541] opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[14px] max-[760px]:bg-[rgba(83,188,118,0.06)] max-[760px]:px-3 max-[760px]:py-2.5 max-[760px]:opacity-100"
            >
              Buy
            </Link>

            <Link
              href="/properties?status=sold"
              onClick={closeMenu}
              className="font-normal text-[#0e3541] opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[14px] max-[760px]:bg-[rgba(83,188,118,0.06)] max-[760px]:px-3 max-[760px]:py-2.5 max-[760px]:opacity-100"
            >
              Sell
            </Link>

            <Link
              href="/properties?status=available"
              onClick={closeMenu}
              className="font-normal text-[#0e3541] opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[14px] max-[760px]:bg-[rgba(83,188,118,0.06)] max-[760px]:px-3 max-[760px]:py-2.5 max-[760px]:opacity-100"
            >
              Rent
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className="font-normal text-[#0e3541] opacity-80 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:items-center max-[760px]:rounded-[14px] max-[760px]:bg-[rgba(83,188,118,0.06)] max-[760px]:px-3 max-[760px]:py-2.5 max-[760px]:opacity-100"
            >
              Projects
            </Link>

            <a
              href="https://app.checkmateproperty.com/#/login"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="inline-flex min-h-[42px] items-center justify-center whitespace-nowrap rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-[18px] py-[11px] font-normal !text-white opacity-100 shadow-[0_14px_30px_rgba(57,175,242,0.20)] transition duration-200 hover:-translate-y-0.5 max-[760px]:mt-1 max-[760px]:flex max-[760px]:min-h-11 max-[760px]:w-full max-[760px]:rounded-[14px] max-[760px]:px-3 max-[760px]:py-2.5"
            >
              Login
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}