"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { storeCampaignEntryTokens } from "@/lib/campaign-auth";
import { CALCULATOR_META_EVENT_SOURCE_URL } from "@/lib/meta-constants";
import {
  createMetaEventId,
  getBrowserCookie,
  trackMetaCompleteRegistration,
} from "@/lib/meta-pixel";
import {
  formatUSPhone,
  normalizeUSPhoneDigits,
} from "@/lib/phone";

type SubmitState = "idle" | "submitting" | "error";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "password", string>
>;

type CalculatorRegisterResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  event_id?: string;
  fieldErrors?: FieldErrors;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expiresIn?: number | string;
  };
};

export function CalculatorSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    setSubmitState("submitting");
    setGeneralError(null);
    setFieldErrors({});

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const nextFieldErrors: FieldErrors = {};

    if (!trimmedName) {
      nextFieldErrors.name = "Name is required.";
    }
    if (!trimmedEmail) {
      nextFieldErrors.email = "Email is required.";
    }
    if (!trimmedPhone) {
      nextFieldErrors.phone = "Phone is required.";
    }
    if (!password) {
      nextFieldErrors.password = "Password is required.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setSubmitState("error");
      setGeneralError("Complete the required fields to continue.");
      return;
    }

    const eventId = createMetaEventId();
    const sourceUrl =
      typeof window !== "undefined"
        ? window.location.href
        : CALCULATOR_META_EVENT_SOURCE_URL;

    try {
      const response = await fetch("/api/calculator/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          password,
          event_id: eventId,
          source_url: sourceUrl,
          fbp: getBrowserCookie("_fbp") || undefined,
          fbc: getBrowserCookie("_fbc") || undefined,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | CalculatorRegisterResponse
        | null;

      if (!response.ok || !result?.success) {
        setSubmitState("error");
        setFieldErrors(result?.fieldErrors || {});
        setGeneralError(
          result?.error || "Unable to create your account. Please try again.",
        );
        return;
      }

      const tokens = result.data;

      if (
        !tokens?.accessToken ||
        !tokens.refreshToken ||
        !tokens.idToken ||
        tokens.expiresIn == null
      ) {
        setSubmitState("error");
        setGeneralError(
          "Account created, but we could not start your logged-in session.",
        );
        return;
      }

      const sharedEventId = result.event_id || eventId;

      // Fire Pixel immediately, then redirect without waiting on secondary work.
      trackMetaCompleteRegistration(sharedEventId);

      storeCampaignEntryTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        idToken: tokens.idToken,
        expiresIn: tokens.expiresIn,
      });

      window.location.assign("/thanks");
      return;
    } catch {
      setSubmitState("error");
      setGeneralError("Unexpected error creating your account. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="calc-signup-form" noValidate>
      <div className="calc-signup-field">
        <label htmlFor="calculator-name">Your name</label>
        <div className="calc-signup-input-wrap">
          <User size={18} aria-hidden="true" />
          <input
            id="calculator-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Insert your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={submitState === "submitting"}
          />
        </div>
        {fieldErrors.name ? (
          <p className="calc-signup-field-error">{fieldErrors.name}</p>
        ) : null}
      </div>

      <div className="calc-signup-field">
        <label htmlFor="calculator-email">Your email</label>
        <div className="calc-signup-input-wrap">
          <Mail size={18} aria-hidden="true" />
          <input
            id="calculator-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Insert your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitState === "submitting"}
          />
        </div>
        {fieldErrors.email ? (
          <p className="calc-signup-field-error">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="calc-signup-field">
        <label htmlFor="calculator-phone">Your phone</label>
        <div className="calc-signup-input-wrap">
          <Phone size={18} aria-hidden="true" />
          <input
            id="calculator-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={phone}
            onChange={(event) =>
              setPhone(formatUSPhone(normalizeUSPhoneDigits(event.target.value)))
            }
            disabled={submitState === "submitting"}
          />
        </div>
        {fieldErrors.phone ? (
          <p className="calc-signup-field-error">{fieldErrors.phone}</p>
        ) : null}
      </div>

      <div className="calc-signup-field">
        <label htmlFor="calculator-password">Password</label>
        <div className="calc-signup-input-wrap">
          <Lock size={18} aria-hidden="true" />
          <input
            id="calculator-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Insert your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitState === "submitting"}
          />
        </div>
        {fieldErrors.password ? (
          <p className="calc-signup-field-error">{fieldErrors.password}</p>
        ) : null}
      </div>

      {generalError ? (
        <div className="calc-signup-error">
          <AlertCircle size={18} aria-hidden="true" />
          <p>{generalError}</p>
        </div>
      ) : null}

      <p className="calc-signup-consent">
        By submitting this form, you agree to receive phone calls and SMS
        messages from Checkmate. Your consent is not a condition of purchasing
        any product or service.
      </p>

      <button
        type="submit"
        className="calc-signup-submit"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          "I want to try the FREE Calculator!"
        )}
      </button>
    </form>
  );
}
