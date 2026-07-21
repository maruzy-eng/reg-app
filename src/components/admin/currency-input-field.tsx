"use client";

import { useId, useState } from "react";

type CurrencyInputFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
  helpText?: string;
  wrapperClassName?: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCurrencyMask(value: string | number | null | undefined) {
  const digits = onlyDigits(String(value ?? ""));

  if (!digits) {
    return "";
  }

  const amount = Number(digits);

  if (Number.isNaN(amount)) {
    return "";
  }

  return `$${amount.toLocaleString("pt-BR", {
    maximumFractionDigits: 0,
  })}`;
}

export function CurrencyInputField({
  label,
  name,
  defaultValue = "",
  required = false,
  helpText,
  wrapperClassName = "",
}: CurrencyInputFieldProps) {
  const inputId = useId();
  const [displayValue, setDisplayValue] = useState(() =>
    formatCurrencyMask(defaultValue),
  );

  return (
    <label className={`block ${wrapperClassName}`} htmlFor={inputId}>
      <span className="text-sm font-bold text-[#0e3541]">{label}</span>

      <input
        id={inputId}
        name={name}
        type="text"
        inputMode="numeric"
        required={required}
        value={displayValue}
        onChange={(event) => {
          setDisplayValue(formatCurrencyMask(event.target.value));
        }}
        onBlur={() => {
          setDisplayValue(formatCurrencyMask(displayValue));
        }}
        placeholder="$0"
        className="admin-input mt-2 w-full px-4 py-3 text-sm"
        autoComplete="off"
      />

      {helpText ? (
        <span className="mt-2 block text-xs leading-5 text-[#64748b]">
          {helpText}
        </span>
      ) : null}
    </label>
  );
}
