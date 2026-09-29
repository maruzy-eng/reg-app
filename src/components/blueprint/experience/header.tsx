"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";

/* =========================================================
   CONFIG
========================================================= */

const container =
  "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16";

/* =========================================================
   HEADER CTA
========================================================= */

function HeaderButton({
  children = "Quero conhecer o Blueprint",
  full = false,
  compact = false,
}: {
  children?: React.ReactNode;
  full?: boolean;
  compact?: boolean;
}) {
  return (
    <a
      href="#formb"
      className={[
        "group inline-flex items-center justify-center gap-2.5",
        "border border-[#C5A258] bg-[#C5A258]",
        "font-bold uppercase tracking-[0.12em]",
        "text-[#090909]",
        "transition duration-300",
        "hover:border-[#D3B264] hover:bg-[#D3B264]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[#D3B264]",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-black",
        compact
          ? "min-h-[42px] px-5 text-[0.58rem]"
          : "min-h-[50px] px-6 text-[0.64rem]",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <span>{children}</span>

      <ArrowUpRight
        size={14}
        aria-hidden="true"
        className="
          shrink-0
          transition-transform
          duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      />
    </a>
  );
}

/* =========================================================
   HEADER
========================================================= */

export function BlueprintHeader() {
  const [scrolled, setScrolled] =
    useState(false);

  const [pastHero, setPastHero] =
    useState(false);

  const [formVisible, setFormVisible] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const toggle =
    useRef<HTMLButtonElement>(null);

  /* -------------------------------------------------------
     SCROLL / OBSERVERS
  ------------------------------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true },
    );

    const hero =
      document.getElementById(
        "blueprint",
      );

    const form =
      document.getElementById(
        "formb",
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target === hero) {
              setPastHero(
                !entry.isIntersecting &&
                  entry.boundingClientRect
                    .top < 0,
              );
            }

            if (entry.target === form) {
              setFormVisible(
                entry.isIntersecting,
              );
            }
          });
        },
        {
          threshold: 0,
        },
      );

    if (hero) {
      observer.observe(hero);
    }

    if (form) {
      observer.observe(form);
    }

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  /* -------------------------------------------------------
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ------------------------------------------------------- */

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [open]);

  /* -------------------------------------------------------
     ESC
  ------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key !== "Escape") {
        return;
      }

      setOpen(false);

      requestAnimationFrame(() => {
        toggle.current?.focus();
      });
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [open]);

  /* -------------------------------------------------------
     HEADER STATE
  ------------------------------------------------------- */

  const solid = scrolled || open;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-[80]",
          "transition-[background-color,border-color,backdrop-filter] duration-500",

          solid
            ? [
                "border-b border-white/10",
                "bg-[#070707]/95",
                "shadow-[0_10px_40px_rgba(0,0,0,0.16)]",
                "backdrop-blur-xl",
              ].join(" ")
            : [
                "border-b border-transparent",
                "bg-transparent",
              ].join(" "),
        ].join(" ")}
      >
        <div
          className={[
            container,
            "flex items-center justify-between",
            "transition-[height] duration-300",
            solid
              ? "h-[72px]"
              : "h-[84px]",
          ].join(" ")}
        >
          {/* LOGO */}
          <a
            href="#blueprint"
            aria-label="Checkmate Blueprint, início"
            className="
              relative z-10
              flex shrink-0
              items-center
            "
            onClick={() =>
              setOpen(false)
            }
          >
            <Image
              src={content.logo}
              alt="Checkmate Real Estate Group"
              width={2048}
              height={658}
              priority
              className="
                h-auto w-[145px]
                object-contain
                sm:w-[160px]
                lg:w-[172px]
              "
            />
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Navegação principal"
            className="
              hidden items-center
              gap-6 xl:flex
              2xl:gap-8
            "
          >
            {content.navigation.map(
              ([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="
                    relative
                    py-2
                    text-[0.58rem]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-white/60
                    transition-colors
                    duration-300
                    after:absolute
                    after:inset-x-0
                    after:bottom-0
                    after:h-px
                    after:origin-left
                    after:scale-x-0
                    after:bg-[#C5A258]
                    after:transition-transform
                    after:duration-300
                    hover:text-white
                    hover:after:scale-x-100
                  "
                >
                  {label}
                </a>
              ),
            )}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden xl:block">
            <HeaderButton compact />
          </div>

          {/* MOBILE BUTTON */}
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="bp-mobile-navigation"
            aria-label={
              open
                ? "Fechar menu"
                : "Abrir menu"
            }
            onClick={() =>
              setOpen(
                (current) => !current,
              )
            }
            className="
              relative z-[90]
              grid h-11 w-11
              place-items-center
              border border-white/20
              text-white
              transition
              hover:border-[#C5A258]
              hover:text-[#D3B264]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C5A258]
              xl:hidden
            "
          >
            {open ? (
              <X
                size={20}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={21}
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        {/* GOLD DETAIL */}
        <div
          aria-hidden="true"
          className={[
            "absolute bottom-[-1px] left-0",
            "h-px bg-[#C5A258]",
            "transition-[width,opacity] duration-500",
            solid
              ? "w-[88px] opacity-100"
              : "w-0 opacity-0",
          ].join(" ")}
        />
      </header>

      {/* ===================================================
          MOBILE MENU
      =================================================== */}

      <div
        id="bp-mobile-navigation"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[70]",
          "bg-[#070707]",
          "transition duration-500",
          "xl:hidden",

          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* subtle background detail */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            overflow-hidden
            pointer-events-none
          "
        >
          <div
            className="
              absolute -right-[30%]
              top-[20%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-[#C5A258]/[0.035]
              blur-[120px]
            "
          />

          <div
            className="
              absolute bottom-0 left-0
              h-px w-full
              bg-gradient-to-r
              from-transparent
              via-[#C5A258]/25
              to-transparent
            "
          />
        </div>

        <div
          className={[
            container,
            "relative flex min-h-[100dvh]",
            "flex-col",
            "pb-8 pt-[110px]",
          ].join(" ")}
        >
          <p
            className="
              text-[0.55rem]
              font-bold uppercase
              tracking-[0.2em]
              text-[#D3B264]
            "
          >
            Checkmate Blueprint
          </p>

          {/* NAV LINKS */}
          <nav
            aria-label="Navegação mobile"
            className="
              mt-8
              border-t border-white/15
            "
          >
            {content.navigation.map(
              ([label, id], index) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    group grid
                    grid-cols-[40px_1fr_auto]
                    items-center gap-3
                    border-b border-white/10
                    py-5
                    text-white
                  "
                >
                  <span
                    className="
                      text-[0.55rem]
                      font-semibold
                      text-[#C5A258]
                    "
                  >
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      text-[1.2rem]
                      font-medium
                      tracking-[-0.025em]
                      text-white/85
                      transition-colors
                      group-hover:text-white
                    "
                  >
                    {label}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="
                      text-white/30
                      transition
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-[#D3B264]
                    "
                  />
                </a>
              ),
            )}
          </nav>

          {/* CTA */}
          <div className="mt-auto pt-8">
            <HeaderButton full>
              Quero conhecer o Blueprint
            </HeaderButton>

            <p
              className="
                mt-5 max-w-[320px]
                text-[0.68rem]
                leading-[1.65]
                text-white/40
              "
            >
              Conheça a proposta e
              converse com o time da
              Checkmate sobre o seu
              momento.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================
          FLOATING CTA
          MOBILE / TABLET
      =================================================== */}

      <div
        className={[
          "fixed inset-x-0 bottom-0",
          "z-[60]",
          "border-t border-white/10",
          "bg-[#070707]/95",
          "px-4 py-3",
          "backdrop-blur-xl",
          "transition-[transform,opacity]",
          "duration-300",
          "xl:hidden",

          pastHero &&
          !formVisible &&
          !open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[560px]">
          <HeaderButton full>
            Conhecer o Blueprint
          </HeaderButton>
        </div>
      </div>

      {/* ===================================================
          FLOATING CTA
          DESKTOP
      =================================================== */}

      <div
        className={[
          "fixed bottom-7 right-7",
          "z-[60]",
          "hidden xl:block",
          "transition-[transform,opacity]",
          "duration-300",

          pastHero &&
          !formVisible &&
          !open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        ].join(" ")}
      >
        <a
          href="#formb"
          className="
            group flex items-center
            gap-4
            border border-white/10
            bg-[#0A0A09]/95
            px-5 py-4
            shadow-[0_18px_50px_rgba(0,0,0,0.28)]
            backdrop-blur-xl
            transition
            hover:border-[#C5A258]/60
          "
        >
          <div>
            <span
              className="
                block text-[0.5rem]
                font-bold uppercase
                tracking-[0.18em]
                text-[#C5A258]
              "
            >
              Checkmate Blueprint
            </span>

            <strong
              className="
                mt-1 block
                text-[0.7rem]
                font-semibold
                text-white/85
              "
            >
              Conhecer o programa
            </strong>
          </div>

          <span
            className="
              grid h-9 w-9
              place-items-center
              bg-[#C5A258]
              text-[#080808]
              transition-colors
              group-hover:bg-[#D3B264]
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </span>
        </a>
      </div>
    </>
  );
}