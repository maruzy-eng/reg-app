"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import type { DynamicForm, DynamicFormField } from "@/lib/forms";
import { US_STATES } from "@/lib/us-states";

type DynamicFormProps = {
  form: DynamicForm;
  fields: DynamicFormField[];
  defaultValues?: Record<string, string>;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type SelectOption = {
  label: string;
  value: string;
};

function normalizeText(value: string | null | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

function isUSStateField(field: DynamicFormField) {
  const normalizedType = normalizeText(field.type);
  const normalizedName = normalizeText(field.name);
  const normalizedLabel = normalizeText(field.label);

  return (
    normalizedType === "state" ||
    normalizedName === "state" ||
    normalizedName === "states" ||
    normalizedName === "states_us" ||
    normalizedName === "us_state" ||
    normalizedLabel === "state" ||
    normalizedLabel === "states" ||
    normalizedLabel === "states_us" ||
    normalizedLabel === "us_state"
  );
}

function getInitialValue(
  field: DynamicFormField,
  defaultValues?: Record<string, string>,
) {
  const defaultValue = defaultValues?.[field.name];

  if (typeof defaultValue === "string") {
    return defaultValue;
  }

  if (field.type === "checkbox") {
    return false;
  }

  return field.default_value || "";
}

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

function applyPhoneMask(value: string, mask: string) {
  const digits = value.replace(/\D/g, "");
  let digitIndex = 0;
  let formatted = "";

  for (const char of mask) {
    if (char === "9") {
      const digit = digits[digitIndex];

      if (!digit) {
        break;
      }

      formatted += digit;
      digitIndex += 1;
      continue;
    }

    if (digitIndex < digits.length) {
      formatted += char;
    }
  }

  return formatted;
}

function getFieldIcon(field: DynamicFormField) {
  if (isUSStateField(field)) {
    return MapPin;
  }

  if (field.type === "email") {
    return Mail;
  }

  if (field.type === "password") {
    return Lock;
  }

  if (field.type === "phone") {
    return Phone;
  }

  if (field.type === "textarea") {
    return MessageSquare;
  }

  return User;
}

function getOptionsMask(options: unknown) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    return null;
  }

  if (!("mask" in options) || typeof options.mask !== "string") {
    return null;
  }

  return options.mask;
}

function normalizeOptions(options: unknown) {
  if (!Array.isArray(options)) {
    return [];
  }

  return options
    .map((option) => {
      if (typeof option === "string") {
        return {
          label: option,
          value: option,
        };
      }

      if (
        option &&
        typeof option === "object" &&
        "label" in option &&
        "value" in option
      ) {
        return {
          label: String(option.label),
          value: String(option.value),
        };
      }

      return null;
    })
    .filter(Boolean) as SelectOption[];
}

function getStringFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value;
}

function buildSubmitData(params: {
  fields: DynamicFormField[];
  formElement: HTMLFormElement;
  currentData: Record<string, unknown>;
  defaultValues?: Record<string, string>;
}) {
  const nativeFormData = new FormData(params.formElement);

  const nextData: Record<string, unknown> = {
    ...(params.defaultValues || {}),
    ...params.currentData,
  };

  for (const field of params.fields) {
    if (field.type === "checkbox") {
      nextData[field.name] = nativeFormData.has(field.name);
      continue;
    }

    if (field.type === "radio") {
      nextData[field.name] = getStringFormValue(nativeFormData, field.name);
      continue;
    }

    nextData[field.name] = getStringFormValue(nativeFormData, field.name);
  }

  Object.entries(params.defaultValues || {}).forEach(([key, value]) => {
    if (!(key in nextData) || nextData[key] === "") {
      nextData[key] = value;
    }
  });

  return nextData;
}

function getExtraDefaultFields(params: {
  fields: DynamicFormField[];
  defaultValues?: Record<string, string>;
}) {
  const fieldNames = new Set(params.fields.map((field) => field.name));

  return Object.entries(params.defaultValues || {}).filter(([key, value]) => {
    return !fieldNames.has(key) && value !== "";
  });
}

export function DynamicFormComponent({
  form,
  fields,
  defaultValues = {},
}: DynamicFormProps) {
  const router = useRouter();

  const initialData = useMemo(() => {
    return Object.fromEntries(
      fields.map((field) => [field.name, getInitialValue(field, defaultValues)]),
    );
  }, [fields, defaultValues]);

  const extraDefaultFields = useMemo(() => {
    return getExtraDefaultFields({
      fields,
      defaultValues,
    });
  }, [fields, defaultValues]);

  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function updateField(name: string, value: unknown) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];

      return next;
    });
  }

  function updatePhoneField(field: DynamicFormField, value: string) {
    const mask = getOptionsMask(field.options);

    updateField(
      field.name,
      mask ? applyPhoneMask(value, mask) : formatUSPhone(value),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitState("submitting");
    setGeneralError(null);
    setFieldErrors({});

    const submitData = buildSubmitData({
      fields,
      formElement: event.currentTarget,
      currentData: formData,
      defaultValues,
    });

    setFormData(submitData);

    try {
      const response = await fetch(`/api/forms/${form.slug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: submitData,
          source_url:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitState("error");
        setGeneralError(result.error || "Unable to submit this form.");
        setFieldErrors(result.fieldErrors || {});
        return;
      }

      setSubmitState("success");

      const thankYouPageUrl =
        typeof result.thankYouPageUrl === "string"
          ? result.thankYouPageUrl
          : "/thank-you/default";

      router.push(thankYouPageUrl);
    } catch (error) {
      setSubmitState("error");
      setGeneralError(
        error instanceof Error
          ? error.message
          : "Unexpected error submitting this form.",
      );
    }
  }

  function renderTextarea(field: DynamicFormField, value: unknown) {
    return (
      <div className="relative">
        <MessageSquare
          size={18}
          className="pointer-events-none absolute left-4 top-4 text-[#64748b]"
        />

        <textarea
          id={field.name}
          name={field.name}
          rows={5}
          required={field.required}
          placeholder={field.placeholder || undefined}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateField(field.name, event.target.value)}
          className="w-full resize-none rounded-2xl border border-[rgba(12,41,51,0.12)] bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-[#0c2933] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:ring-4 focus:ring-[#53bc76]/15"
        />
      </div>
    );
  }

  function renderSelectField(params: {
    field: DynamicFormField;
    value: unknown;
    options: SelectOption[];
    placeholder: string;
    icon: typeof User;
  }) {
    const { field, value, options, placeholder, icon: Icon } = params;

    return (
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
        />

        <select
          id={field.name}
          name={field.name}
          required={field.required}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateField(field.name, event.target.value)}
          className="w-full appearance-none rounded-2xl border border-[rgba(12,41,51,0.12)] bg-white py-3.5 pl-12 pr-10 text-sm font-medium text-[#0c2933] outline-none transition focus:border-[#53bc76] focus:ring-4 focus:ring-[#53bc76]/15"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748b]">
          ▼
        </span>
      </div>
    );
  }

  function renderRadioField(
    field: DynamicFormField,
    value: unknown,
    options: SelectOption[],
  ) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const isChecked = value === option.value;

          return (
            <label
              key={option.value}
              className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-2xl border bg-white px-5 py-4 text-sm font-extrabold transition ${
                isChecked
                  ? "border-[#53bc76] text-[#0c2933] ring-4 ring-[#53bc76]/15"
                  : "border-[rgba(12,41,51,0.10)] text-[#0c2933] hover:border-[#53bc76]/45"
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={isChecked}
                required={field.required}
                onChange={(event) => updateField(field.name, event.target.value)}
                className="h-4 w-4 accent-[#53bc76]"
              />

              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  function renderCheckboxField(field: DynamicFormField, value: unknown) {
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[rgba(12,41,51,0.10)] bg-white px-4 py-3 text-sm font-semibold text-[#0c2933] transition hover:border-[#53bc76]/40">
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          checked={Boolean(value)}
          required={field.required}
          onChange={(event) => updateField(field.name, event.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#53bc76]"
        />

        <span>{field.placeholder || field.label}</span>
      </label>
    );
  }

  function renderInputField(field: DynamicFormField, value: unknown) {
    const Icon = getFieldIcon(field);

    return (
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
        />

        <input
          id={field.name}
          name={field.name}
          type={
            field.type === "phone"
              ? "tel"
              : field.type === "number"
                ? "number"
                : field.type === "email"
                  ? "email"
                  : field.type === "password"
                    ? "password"
                    : "text"
          }
          inputMode={field.type === "phone" ? "tel" : undefined}
          autoComplete={
            field.type === "password"
              ? "new-password"
              : field.type === "email"
                ? "email"
                : field.type === "phone"
                  ? "tel"
                  : undefined
          }
          required={field.required}
          placeholder={
            field.type === "phone"
              ? field.placeholder || "(555) 000-0000"
              : field.placeholder || undefined
          }
          value={
            typeof value === "string" || typeof value === "number" ? value : ""
          }
          onChange={(event) => {
            if (field.type === "phone") {
              updatePhoneField(field, event.target.value);
              return;
            }

            updateField(field.name, event.target.value);
          }}
          className="w-full rounded-2xl border border-[rgba(12,41,51,0.12)] bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-[#0c2933] outline-none transition placeholder:text-[#94a3b8] focus:border-[#53bc76] focus:ring-4 focus:ring-[#53bc76]/15"
        />
      </div>
    );
  }

  function renderField(field: DynamicFormField) {
    const value = formData[field.name];
    const error = fieldErrors[field.name];

    const isState = isUSStateField(field);
    const options = isState ? US_STATES : normalizeOptions(field.options);

    if (field.type === "hidden") {
      return (
        <input
          key={field.id}
          type="hidden"
          name={field.name}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateField(field.name, event.target.value)}
        />
      );
    }

    return (
      <div key={field.id} className="space-y-3">
        <label
          htmlFor={field.name}
          className="block text-sm font-extrabold text-[#0c2933]"
        >
          {isState ? "States US" : field.label}
          {field.required ? <span className="text-[#1f9f5f]"> *</span> : null}
        </label>

        {field.type === "textarea" ? (
          renderTextarea(field, value)
        ) : isState ? (
          renderSelectField({
            field,
            value,
            options,
            placeholder: field.placeholder || "Select state",
            icon: MapPin,
          })
        ) : field.type === "select" ? (
          renderSelectField({
            field,
            value,
            options,
            placeholder: field.placeholder || "Select an option",
            icon: User,
          })
        ) : field.type === "radio" ? (
          renderRadioField(field, value, options)
        ) : field.type === "checkbox" ? (
          renderCheckboxField(field, value)
        ) : (
          renderInputField(field, value)
        )}

        {field.help_text ? (
          <p className="text-xs font-medium text-[#64748b]">
            {field.help_text}
          </p>
        ) : null}

        {error ? (
          <p className="flex items-center gap-1.5 text-xs font-bold text-red-600">
            <AlertCircle size={14} />
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {extraDefaultFields.map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} readOnly />
      ))}

      {fields.map((field) => renderField(field))}

      {generalError ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{generalError}</p>
        </div>
      ) : null}

      {submitState === "success" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-[#53bc76]/25 bg-[#53bc76]/10 px-4 py-3 text-sm font-semibold text-[#0c2933]">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#53bc76]" />
          <p>Form submitted successfully. Redirecting...</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(94deg,#53bc76_0%,#1f9f5f_100%)] px-6 text-sm font-extrabold text-white shadow-[0_18px_44px_rgba(83,188,118,0.24)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {submitState === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            {form.submit_button_label || "Submit"}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}