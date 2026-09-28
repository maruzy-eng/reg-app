"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { blueprintExperience as content } from "@/lib/blueprint/experience";
import { GoldButton } from "./ui";

export function BlueprintHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const hero = document.getElementById("blueprint");
    const form = document.getElementById("formb");
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.target === hero)
          setPastHero(
            !entry.isIntersecting && entry.boundingClientRect.top < 0,
          );
        if (entry.target === form) setFormVisible(entry.isIntersecting);
      }),
    );
    if (hero) observer.observe(hero);
    if (form) observer.observe(form);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`bp-header ${scrolled || open ? "bp-header-solid" : ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <div className="bp-container bp-header-inner">
          <a
            href="#blueprint"
            className="bp-brand"
            aria-label="Checkmate Blueprint, início"
          >
            <Image
              src={content.logo}
              alt="Checkmate Real Estate Group"
              width={2048}
              height={658}
              priority
            />
          </a>
          <nav aria-label="Navegação principal" className="bp-desktop-nav">
            {content.navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="bp-header-cta">
            <GoldButton />
          </div>
          <button
            ref={toggle}
            className="bp-menu-toggle"
            aria-expanded={open}
            aria-controls="bp-mobile-navigation"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="bp-mobile-navigation"
          aria-label="Navegação mobile"
          className="bp-mobile-nav"
          hidden={!open}
          onClick={() => setOpen(false)}
        >
          {content.navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <GoldButton />
        </nav>
      </header>
      {pastHero && !formVisible && !open && (
        <div className="bp-sticky-cta">
          <GoldButton>Conhecer o Blueprint</GoldButton>
        </div>
      )}
    </>
  );
}
