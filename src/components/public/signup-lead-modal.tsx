"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, UserRoundPlus, X } from "lucide-react";
import type {
  DynamicFormSignInCredentials,
  DynamicFormSubmitOverrideContext,
  DynamicFormSubmitOverrideResult,
} from "@/components/forms/dynamic-form";

const DynamicFormComponent = dynamic(
  () =>
    import("@/components/forms/dynamic-form").then(
      (module) => module.DynamicFormComponent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="hero-search-modal-loading">Loading form...</div>
    ),
  },
);

type SearchFormData = {
  form: Record<string, unknown> & {
    id?: string;
    slug?: string;
    title?: string;
    description?: string | null;
    thank_you_page_url?: string | null;
  };
  fields: Array<Record<string, unknown>>;
};

type CampaignAuthResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expiresIn?: number | string;
  };
};

type SignupLeadButtonProps = {
  searchForm?: SearchFormData | null;
  className?: string;
  children: ReactNode;
};

const CAMPAIGN_REGISTER_ENDPOINT = "/api/campaign/register";
const CAMPAIGN_LOGIN_ENDPOINT = "/api/campaign/login";
const CAMPAIGN_ENTRY_URL =
  "https://app.checkmateproperty.com/#/campaign-entry";

const campaignFieldAliases = {
  name: ["name", "full_name", "fullname", "nome", "your_name"],
  email: ["email", "email_address", "e_mail"],
  phone: ["phone", "phone_number", "telefone", "mobile", "cellphone"],
  password: ["password", "senha"],
} as const;

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

function normalizeFieldKey(value: string) {
  return value.trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function getStringValue(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function getCampaignFieldValue(
  target: keyof typeof campaignFieldAliases,
  context: DynamicFormSubmitOverrideContext,
) {
  const aliases = campaignFieldAliases[target];
  const directMatch = aliases.find((alias) => alias in context.data);

  if (directMatch) {
    return getStringValue(context.data, directMatch);
  }

  const field = context.fields.find((item) => {
    const normalizedName = normalizeFieldKey(item.name);
    const normalizedLabel = normalizeFieldKey(item.label);
    const normalizedType = normalizeFieldKey(item.type);

    return (
      aliases.includes(normalizedName as never) ||
      aliases.includes(normalizedLabel as never) ||
      normalizedType === target
    );
  });

  return field ? getStringValue(context.data, field.name) : "";
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as CampaignAuthResponse;
  } catch {
    return {
      success: false,
      error: text,
    } satisfies CampaignAuthResponse;
  }
}

function getCampaignErrorMessage(
  result: CampaignAuthResponse | null,
  fallback = "Unable to create your campaign access. Please try again.",
) {
  return result?.error || result?.message || fallback;
}

function buildCampaignRedirectUrl(
  tokens: NonNullable<CampaignAuthResponse["data"]>,
) {
  const query = new URLSearchParams({
    at: tokens.accessToken || "",
    rt: tokens.refreshToken || "",
    it: tokens.idToken || "",
    exp: String(tokens.expiresIn || ""),
    lang: "en",
  });

  return `${CAMPAIGN_ENTRY_URL}?${query.toString()}`;
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

  async function handleCampaignSubmit(
    context: DynamicFormSubmitOverrideContext,
  ): Promise<DynamicFormSubmitOverrideResult> {
    const name = getCampaignFieldValue("name", context).trim();
    const email = getCampaignFieldValue("email", context).trim();
    const phone = getCampaignFieldValue("phone", context).trim();
    const password = getCampaignFieldValue("password", context);

    const fieldErrors: Record<string, string> = {};

    if (!name) {
      fieldErrors.name = "Name is required.";
    }

    if (!email) {
      fieldErrors.email = "Email is required.";
    }

    if (!phone) {
      fieldErrors.phone = "Phone is required.";
    }

    if (!password) {
      fieldErrors.password = "Password is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        error: "Complete the required fields to continue.",
        fieldErrors,
      };
    }

    const campaignResponse = await fetch(CAMPAIGN_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const campaignResult = await readJsonResponse(campaignResponse);
    const tokens = campaignResult?.data;

    if (
      !campaignResponse.ok ||
      !tokens?.accessToken ||
      !tokens.refreshToken ||
      !tokens.idToken ||
      !tokens.expiresIn
    ) {
      return {
        error: getCampaignErrorMessage(campaignResult),
      };
    }

    const formResponse = await fetch(`/api/forms/${context.form.slug}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...context.data,
          password: "[redacted]",
          signup_source: "home_signup",
        },
        source_url: context.sourceUrl,
      }),
    });

    const formResult = await formResponse.json();

    if (!formResponse.ok || !formResult.success) {
      return {
        error: formResult.error || "Unable to submit this form.",
        fieldErrors: formResult.fieldErrors || {},
      };
    }

    window.location.assign(buildCampaignRedirectUrl(tokens));

    return {
      redirecting: true,
    };
  }

  async function handleCampaignSignIn(
    credentials: DynamicFormSignInCredentials,
  ): Promise<DynamicFormSubmitOverrideResult> {
    const email = credentials.email.trim();
    const password = credentials.password;

    if (!email || !password) {
      return {
        error: "Enter your email and password to sign in.",
      };
    }

    const loginResponse = await fetch(CAMPAIGN_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const loginResult = await readJsonResponse(loginResponse);
    const tokens = loginResult?.data;

    if (
      !loginResponse.ok ||
      !tokens?.accessToken ||
      !tokens.refreshToken ||
      !tokens.idToken ||
      !tokens.expiresIn
    ) {
      return {
        error: getCampaignErrorMessage(
          loginResult,
          "Unable to sign in. Please check your email and password.",
        ),
      };
    }

    window.location.assign(buildCampaignRedirectUrl(tokens));

    return {
      redirecting: true,
    };
  }

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

              {searchForm?.form ? (
                <div className="hero-search-modal-form-shell">
                  <DynamicFormComponent
                    form={searchForm.form as never}
                    fields={(searchForm.fields || []) as never}
                    showSignInForm
                    onSignIn={handleCampaignSignIn}
                    onSubmitOverride={handleCampaignSubmit}
                  />
                </div>
              ) : (
                <div className="hero-search-modal-warning">
                  <strong>Search form is not configured yet.</strong>
                  <br />
                  Create and publish a dynamic form with slug{" "}
                  <code>search</code> in the admin panel.
                </div>
              )}
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
  searchForm?: SearchFormData | null;
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
  searchForm?: SearchFormData | null;
}) {
  return (
    <SignupLeadButton searchForm={searchForm} className="home-signup-button">
      Sign Up Free
    </SignupLeadButton>
  );
}
