"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { homeContainer } from "@/components/home/home-ui";
import { HOME_LOGO_DARK } from "@/lib/home/branding";
import { SITE_NAV_LINKS } from "@/lib/home/nav";

type HomeHeaderProps = {
  siteName: string;
};

export function HomeHeader({ siteName }: HomeHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] border-b border-black/[0.07] bg-white/95 shadow-[0_10px_38px_rgba(18,17,14,0.055)] backdrop-blur-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,154,75,0.28),transparent)]"
        />

        <div
          className={[
            homeContainer,
            "relative flex min-h-[82px] items-center justify-between gap-5",
          ].join(" ")}
        >
          <Link
            href="/"
            onClick={closeMenu}
            aria-label={siteName + " home"}
            className={[
              "relative z-[3]",
              "inline-flex shrink-0 items-center",
              "no-underline",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[#c79a4b]/40",
              "focus-visible:ring-offset-4",
            ].join(" ")}
          >
            <Image
              src={HOME_LOGO_DARK}
              alt={siteName}
              width={188}
              height={44}
              className="h-auto max-h-11 w-auto object-contain"
            />
          </Link>

          <div className="flex shrink-0 items-center gap-3 lg:gap-4">
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {SITE_NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "relative inline-flex min-h-10 items-center justify-center",
                      "px-3.5",
                      "text-[0.76rem] font-semibold tracking-[-0.005em]",
                      "transition-colors duration-300",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-[#c79a4b]/35",
                      isActive
                        ? "text-[#171614]"
                        : "text-[#666159] hover:text-[#171614]",
                    ].join(" ")}
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={[
                        "absolute bottom-1.5 left-1/2 h-0.5",
                        "-translate-x-1/2 rounded-full bg-[#c79a4b]",
                        "transition-all duration-300",
                        isActive ? "w-4 opacity-100" : "w-0 opacity-0",
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className={[
                "group relative hidden min-h-11 items-center justify-center gap-2.5",
                "overflow-hidden rounded-full bg-[#171614] px-6",
                "text-[0.68rem] font-bold uppercase tracking-[0.115em] !text-white",
                "shadow-[0_10px_28px_rgba(17,16,13,0.14)]",
                "transition-all duration-300",
                "hover:-translate-y-0.5",
                "hover:shadow-[0_15px_34px_rgba(17,16,13,0.2)]",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[#c79a4b]/45",
                "focus-visible:ring-offset-2",
                "lg:inline-flex",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={[
                  "absolute inset-0 translate-y-full",
                  "bg-[linear-gradient(135deg,#ebca84_0%,#c79a4b_52%,#aa7732_100%)]",
                  "transition-transform duration-500",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover:translate-y-0",
                ].join(" ")}
              />

              <span className="relative z-[1] text-white transition-colors duration-300 group-hover:text-[#17110a]">
                Talk to Our Team
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={[
                  "relative z-[1] h-3.5 w-3.5 text-white",
                  "transition-all duration-300",
                  "group-hover:translate-x-1",
                  "group-hover:text-[#17110a]",
                ].join(" ")}
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="home-mobile-navigation"
              onClick={() => {
                setIsOpen((current) => !current);
              }}
              className={[
                "relative inline-flex h-11 w-11 items-center justify-center",
                "rounded-full border border-black/[0.09]",
                "bg-[#faf9f6] text-[#171614]",
                "shadow-[0_7px_18px_rgba(17,16,13,0.04)]",
                "transition-all duration-300",
                "hover:border-[#c79a4b]/40",
                "hover:bg-[#f4efe4]",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[#c79a4b]/40",
                "lg:hidden",
              ].join(" ")}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>

              <span
                aria-hidden="true"
                className={[
                  "absolute h-0.5 w-[18px] rounded-full bg-current",
                  "transition-all duration-300",
                  isOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-[15px]",
                ].join(" ")}
              />

              <span
                aria-hidden="true"
                className={[
                  "absolute top-1/2 h-0.5 w-[18px]",
                  "-translate-y-1/2 rounded-full bg-current",
                  "transition-opacity duration-200",
                  isOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />

              <span
                aria-hidden="true"
                className={[
                  "absolute h-0.5 w-[18px] rounded-full bg-current",
                  "transition-all duration-300",
                  isOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "bottom-[15px]",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div
          id="home-mobile-navigation"
          className={[
            "absolute inset-x-0 top-full overflow-hidden",
            "border-t border-black/[0.06] bg-white",
            "shadow-[0_22px_50px_rgba(17,16,13,0.12)]",
            "transition-all duration-500",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "lg:hidden",
            isOpen
              ? "pointer-events-auto max-h-[650px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0",
          ].join(" ")}
        >
          <nav
            aria-label="Mobile navigation"
            className={[homeContainer, "py-5"].join(" ")}
          >
            <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-[#faf9f6] p-2">
              {SITE_NAV_LINKS.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group flex min-h-[54px] items-center justify-between",
                      "rounded-[17px] px-4",
                      "transition-all duration-300",
                      index > 0 ? "mt-1" : "",
                      isActive
                        ? "bg-white text-[#171614] shadow-[0_7px_20px_rgba(17,16,13,0.07)]"
                        : "text-[#59554f] hover:bg-white hover:text-[#171614]",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={[
                          "text-[0.58rem] font-bold tracking-[0.15em]",
                          isActive
                            ? "text-[#9b7435]"
                            : "text-[#9b7435]/55",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-[0.9rem] font-semibold">
                        {item.label}
                      </span>
                    </span>

                    <span
                      className={[
                        "grid h-8 w-8 place-items-center rounded-full",
                        "transition-all duration-300",
                        isActive
                          ? "bg-[#171614] text-white"
                          : "bg-white text-[#9b7435] group-hover:translate-x-0.5",
                      ].join(" ")}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/contact"
              onClick={closeMenu}
              className={[
                "group mt-3 inline-flex min-h-[54px] w-full",
                "items-center justify-center gap-3 rounded-full",
                "bg-[linear-gradient(135deg,#171614_0%,#050505_100%)]",
                "px-5 text-[0.7rem] font-bold uppercase",
                "tracking-[0.11em] !text-white",
                "shadow-[0_12px_28px_rgba(17,16,13,0.16)]",
              ].join(" ")}
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
                className="h-4 w-4 text-[#ebca84] transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>

            <p className="mt-4 text-center text-[0.65rem] leading-[1.6] text-[#777168]">
              Strategy, development, construction, and partnerships.
            </p>
          </nav>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={closeMenu}
        className={[
          "fixed inset-0 z-[990] bg-black/35",
          "backdrop-blur-[2px]",
          "transition-opacity duration-300",
          "lg:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />
    </>
  );
}
