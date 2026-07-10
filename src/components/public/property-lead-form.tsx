"use client";

import { useState } from "react";
import { createPropertyLeadAction } from "@/app/properties/actions";

type PropertyLeadFormProps = {
  propertyId: string;
  propertySlug: string;
  propertyTitle: string;
};

function formatUSPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
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
    </form>
  );
}