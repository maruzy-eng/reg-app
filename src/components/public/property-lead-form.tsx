"use client";

import { useState } from "react";
import { createPropertyLeadAction } from "@/app/properties/actions";
import { formatUSPhone } from "@/lib/phone";

type PropertyLeadFormProps = {
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
};

type RadioQuestionProps = {
  label: string;
  name: string;
};

const CONSENT_MESSAGE =
  "By submitting this form, you agree to receive phone calls and SMS messages from Checkmate. Your consent is not a condition of purchasing any product or service.";

function RadioQuestion({ label, name }: RadioQuestionProps) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <fieldset className="rounded-2xl border border-black/10 bg-gray-50 p-4">
      <legend className="mb-3 text-sm font-bold text-[#0e3541]">
        {label}
      </legend>

      <div className="grid grid-cols-2 gap-3">
        <label
          className={
            selectedValue === "Yes"
              ? "flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#53bc76] bg-[#53bc76]/10 px-4 text-sm font-bold text-[#0e3541] ring-2 ring-[#53bc76]/30 transition"
              : "flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-[#0e3541] transition hover:border-[#53bc76]/50 hover:bg-[#f0fdf4]"
          }
        >
          <input
            type="radio"
            name={name}
            value="Yes"
            required
            checked={selectedValue === "Yes"}
            onChange={(event) => setSelectedValue(event.target.value)}
            className="h-4 w-4 cursor-pointer accent-[#53bc76]"
          />

          <span>Yes</span>
        </label>

        <label
          className={
            selectedValue === "No"
              ? "flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#39aff2] bg-[#39aff2]/10 px-4 text-sm font-bold text-[#0e3541] ring-2 ring-[#39aff2]/30 transition"
              : "flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-[#0e3541] transition hover:border-[#39aff2]/50 hover:bg-[#f0f9ff]"
          }
        >
          <input
            type="radio"
            name={name}
            value="No"
            required
            checked={selectedValue === "No"}
            onChange={(event) => setSelectedValue(event.target.value)}
            className="h-4 w-4 cursor-pointer accent-[#39aff2]"
          />

          <span>No</span>
        </label>
      </div>
    </fieldset>
  );
}

export function PropertyLeadForm({
  propertyId,
  propertySlug,
  propertyTitle,
}: PropertyLeadFormProps) {
  const [phone, setPhone] = useState("");

  return (
    <form action={createPropertyLeadAction} className="mt-6 space-y-4">
      <input type="hidden" name="property_id" defaultValue={propertyId || ""} />

      <input
        type="hidden"
        name="property_slug"
        defaultValue={propertySlug || ""}
      />

      <input
        type="hidden"
        name="property_title"
        defaultValue={propertyTitle || ""}
      />

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#64748b]">
          Selected Property
        </span>

        <input
          type="text"
          defaultValue={propertyTitle || ""}
          readOnly
          aria-readonly="true"
          className="mt-2 min-h-[40px] w-full cursor-not-allowed rounded-2xl border border-[#53bc76]/25 bg-[#f0fdf4] px-4 text-xs font-bold text-[#0e3541] outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-[#0e3541]">Name *</span>

        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="mt-2 min-h-[46px] w-full rounded-2xl border border-black/10 bg-gray-50 px-4 text-sm font-normal text-[#0e3541] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:bg-white focus:ring-4 focus:ring-[#53bc76]/10"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-[#0e3541]">Email</span>

        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 min-h-[46px] w-full rounded-2xl border border-black/10 bg-gray-50 px-4 text-sm font-normal text-[#0e3541] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:bg-white focus:ring-4 focus:ring-[#53bc76]/10"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-[#0e3541]">Phone</span>

        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(formatUSPhone(event.target.value))}
          placeholder="(555) 000-0000"
          maxLength={14}
          className="mt-2 min-h-[46px] w-full rounded-2xl border border-black/10 bg-gray-50 px-4 text-sm font-normal text-[#0e3541] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:bg-white focus:ring-4 focus:ring-[#53bc76]/10"
        />
      </label>

      <RadioQuestion
        label="Do you already have financing approved?"
        name="financing_approved"
      />

      <RadioQuestion
        label="Do you already have a real estate agent?"
        name="has_real_estate_agent"
      />

      <label className="block">
        <span className="text-sm font-bold text-[#0e3541]">Message</span>

        <textarea
          name="message"
          rows={4}
          placeholder="Tell us how we can help."
          className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 text-sm font-normal text-[#0e3541] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:bg-white focus:ring-4 focus:ring-[#53bc76]/10"
        />
      </label>

      <p className="text-xs leading-5 text-[#64748b]">
        Please provide at least an email or a phone number so our team can reach
        you.
      </p>

      <button
        type="submit"
        className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-5 text-sm font-bold !text-white shadow-[0_16px_34px_rgba(83,188,118,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(83,188,118,0.32)]"
      >
        Request Property Information
      </button>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[rgba(12,41,51,0.10)] bg-white px-4 py-3 text-xs font-semibold leading-5 text-[#0e3541] transition hover:border-[#53bc76]/40">
        <input
          name="phone_sms_consent"
          type="checkbox"
          value="accepted"
          required
          defaultChecked
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#53bc76]"
        />

        <span>{CONSENT_MESSAGE}</span>
      </label>
    </form>
  );
}
