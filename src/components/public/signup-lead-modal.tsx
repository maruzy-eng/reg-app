"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, UserRoundPlus, X } from "lucide-react";
import {
  CampaignSignupForm,
  type CampaignSearchFormData,
} from "@/components/public/campaign-signup-form";

type SignupLeadButtonProps = {
  searchForm?: CampaignSearchFormData | null;
  className?: string;
  children: ReactNode;
};

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

export function SignupLeadButton({
  searchForm,
  className,
  children,
}: SignupLeadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      const previousOverflow = document.body.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("hero-search-modal-open");
      document.addEventListener("keydown", handleEscape);

      window.setTimeout(() => {
        modalRef.current?.focus();
      }, 0);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.documentElement.classList.remove("hero-search-modal-open");
        document.removeEventListener("keydown", handleEscape);
      };
    }

    return undefined;
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

      {isOpen ? (
        <ModalPortal>
          <div
            className="hero-search-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-signup-modal-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div ref={modalRef} tabIndex={-1} className="hero-search-modal-card">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hero-search-modal-close"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="hero-search-modal-header">
                <div className="hero-search-modal-icon">
                  <ShieldCheck size={24} />
                </div>

                <p>Free Sign Up</p>

                <h2 id="home-signup-modal-title">Create your free account</h2>

                <span>
                  Complete the form below to access Checkmate Property and start
                  searching for free.
                </span>
              </div>

              <CampaignSignupForm
                searchForm={searchForm}
                signupSource="home_signup"
              />
            </div>
          </div>
        </ModalPortal>
      ) : null}
    </>
  );
}

export function HomeSignupCtaButton({
  searchForm,
}: {
  searchForm?: CampaignSearchFormData | null;
}) {
  return (
    <SignupLeadButton searchForm={searchForm} className="home-signup-cta group">
      <span className="home-signup-cta-icon" aria-hidden="true">
        <UserRoundPlus size={24} strokeWidth={2.1} />
      </span>

      <span className="home-signup-cta-label">Sign Up Free</span>

      <span className="home-signup-cta-glow" aria-hidden="true" />
    </SignupLeadButton>
  );
}

export function HomeSignupCardButton({
  searchForm,
}: {
  searchForm?: CampaignSearchFormData | null;
}) {
  return (
    <SignupLeadButton searchForm={searchForm} className="home-signup-button">
      Sign Up Free
    </SignupLeadButton>
  );
}
