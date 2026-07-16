"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

export type FieldBuilderField = {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string | null;
  help_text: string | null;
  required: boolean;
  options: unknown;
  default_value: string | null;
  sort_order: number;
};

type FieldBuilderFormProps = {
  formId: string;
  nextSortOrder: number;
  action: (formData: FormData) => void | Promise<void>;
  field?: FieldBuilderField;
  onCancel?: () => void;
};

type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "state"
  | "state_br"
  | "whatsapp_us"
  | "whatsapp_br"
  | "checkbox"
  | "radio"
  | "hidden"
  | "password";

type OptionRow = {
  id: string;
  label: string;
  value: string;
};

function createOptionRow(label = "", value = ""): OptionRow {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now() + Math.random());

  return {
    id,
    label,
    value,
  };
}

function slugifyOption(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function resolveEditorType(field?: FieldBuilderField): FieldType {
  if (!field) {
    return "text";
  }

  if (field.name === "state_br" && field.type === "select") {
    return "state_br";
  }

  if (field.type === "phone" && field.options && typeof field.options === "object") {
    const mask = (field.options as { mask?: string }).mask;

    if (mask === "(99) 99999-9999") {
      return "whatsapp_br";
    }

    if (mask === "(999) 999-9999") {
      return "whatsapp_us";
    }
  }

  const allowed: FieldType[] = [
    "text",
    "email",
    "phone",
    "number",
    "textarea",
    "select",
    "state",
    "checkbox",
    "radio",
    "hidden",
    "password",
  ];

  if (allowed.includes(field.type as FieldType)) {
    return field.type as FieldType;
  }

  return "text";
}

function parseOptionRows(options: unknown): OptionRow[] {
  if (!Array.isArray(options)) {
    return [createOptionRow(), createOptionRow()];
  }

  const rows = options
    .map((option) => {
      if (!option || typeof option !== "object") {
        return null;
      }

      const label =
        typeof (option as { label?: unknown }).label === "string"
          ? (option as { label: string }).label
          : "";
      const value =
        typeof (option as { value?: unknown }).value === "string"
          ? (option as { value: string }).value
          : "";

      if (!label && !value) {
        return null;
      }

      return createOptionRow(label, value || slugifyOption(label));
    })
    .filter((option): option is OptionRow => Boolean(option));

  return rows.length > 0 ? rows : [createOptionRow(), createOptionRow()];
}

const presetDefaults: Partial<
  Record<
    FieldType,
    {
      label: string;
      name: string;
      placeholder: string;
      helpText: string;
      required: boolean;
    }
  >
> = {
  state_br: {
    label: "State",
    name: "state_br",
    placeholder: "Select your state",
    helpText: "Brazilian state.",
    required: true,
  },
  whatsapp_us: {
    label: "WhatsApp US",
    name: "whatsapp_us",
    placeholder: "(555) 555-5555",
    helpText: "US phone format.",
    required: false,
  },
  whatsapp_br: {
    label: "WhatsApp BR",
    name: "whatsapp_br",
    placeholder: "(11) 99999-9999",
    helpText: "Brazilian WhatsApp format.",
    required: false,
  },
};

export function FieldBuilderForm({
  formId,
  nextSortOrder,
  action,
  field,
  onCancel,
}: FieldBuilderFormProps) {
  const isEditing = Boolean(field);
  const [type, setType] = useState<FieldType>(() => resolveEditorType(field));
  const [required, setRequired] = useState(() => field?.required ?? false);
  const [options, setOptions] = useState<OptionRow[]>(() =>
    parseOptionRows(field?.options),
  );

  const shouldShowOptions = type === "radio" || type === "select";
  const selectedPreset = presetDefaults[type];

  const optionsJson = useMemo(() => {
    return JSON.stringify(
      options
        .map((option) => ({
          label: option.label.trim(),
          value: option.value.trim() || slugifyOption(option.label),
        }))
        .filter((option) => option.label && option.value),
    );
  }, [options]);

  function updateOption(id: string, key: "label" | "value", value: string) {
    setOptions((current) =>
      current.map((option) => {
        if (option.id !== id) {
          return option;
        }

        if (key === "label") {
          const shouldAutoValue =
            !option.value || option.value === slugifyOption(option.label);

          return {
            ...option,
            label: value,
            value: shouldAutoValue ? slugifyOption(value) : option.value,
          };
        }

        return {
          ...option,
          value: slugifyOption(value),
        };
      }),
    );
  }

  function addOption() {
    setOptions((current) => [...current, createOptionRow()]);
  }

  function removeOption(id: string) {
    setOptions((current) => {
      if (current.length <= 1) {
        return current;
      }

      return current.filter((option) => option.id !== id);
    });
  }

  function updateType(value: FieldType) {
    setType(value);

    const preset = presetDefaults[value];

    if (preset) {
      setRequired(preset.required);
    }
  }

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="form_id" value={formId} />
      {field ? <input type="hidden" name="field_id" value={field.id} /> : null}
      <input
        type="hidden"
        name="options"
        value={shouldShowOptions ? optionsJson : "[]"}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="label"
          type="text"
          required={!selectedPreset}
          defaultValue={field?.label || ""}
          placeholder={selectedPreset?.label || "Field label"}
          className="admin-input min-h-[46px] px-4"
        />

        <input
          name="name"
          type="text"
          defaultValue={field?.name || ""}
          placeholder={selectedPreset?.name || "field_name"}
          className="admin-input min-h-[46px] px-4"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <select
          name="type"
          value={type}
          onChange={(event) => updateType(event.target.value as FieldType)}
          className="admin-input min-h-[46px] px-4"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="select">Select</option>
          <option value="state">States US</option>
          <option value="state_br">State BR</option>
          <option value="whatsapp_us">WhatsApp US</option>
          <option value="whatsapp_br">WhatsApp BR</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="hidden">Hidden</option>
          <option value="password">Password</option>
        </select>

        <input
          name="sort_order"
          type="number"
          placeholder="Order"
          defaultValue={field?.sort_order ?? nextSortOrder}
          className="admin-input min-h-[46px] px-4"
        />

        <label className="admin-check-row flex min-h-[46px] items-center gap-2 rounded-2xl px-4 text-sm font-bold">
          <input
            name="required"
            type="checkbox"
            checked={required}
            onChange={(event) => setRequired(event.target.checked)}
            className="h-4 w-4 accent-[#53bc76]"
          />
          Required
        </label>
      </div>

      <input
        name="placeholder"
        type="text"
        defaultValue={field?.placeholder || ""}
        placeholder={
          selectedPreset
            ? selectedPreset.placeholder
            : type === "radio"
              ? "Optional helper text"
              : type === "state"
                ? "Select state"
                : "Placeholder"
        }
        className="admin-input min-h-[46px] px-4"
      />

      <input
        name="help_text"
        type="text"
        defaultValue={field?.help_text || ""}
        placeholder={selectedPreset?.helpText || "Help text"}
        className="admin-input min-h-[46px] px-4"
      />

      <input
        name="default_value"
        type="text"
        defaultValue={field?.default_value || ""}
        placeholder="Default value"
        className="admin-input min-h-[46px] px-4"
      />

      {shouldShowOptions ? (
        <div className="admin-form-list-item rounded-2xl p-4">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="admin-form-list-title font-bold">
                {type === "radio" ? "Radio options" : "Select options"}
              </p>

              <p className="admin-form-list-meta mt-1 text-xs">
                Cadastre as respostas que aparecerão no formulário público.
              </p>
            </div>

            <button
              type="button"
              onClick={addOption}
              className="admin-secondary-button min-h-[38px] gap-2 px-4 text-xs"
            >
              <Plus size={15} />
              Add Option
            </button>
          </div>

          <div className="grid gap-3">
            {options.map((option, index) => (
              <div
                key={option.id}
                className="grid gap-3 rounded-2xl border border-[rgba(12,41,51,0.08)] bg-white/60 p-3 md:grid-cols-[1fr_1fr_auto]"
              >
                <input
                  type="text"
                  value={option.label}
                  onChange={(event) =>
                    updateOption(option.id, "label", event.target.value)
                  }
                  placeholder={`Option ${index + 1} label`}
                  className="admin-input min-h-[42px] px-4"
                />

                <input
                  type="text"
                  value={option.value}
                  onChange={(event) =>
                    updateOption(option.id, "value", event.target.value)
                  }
                  placeholder={`option_${index + 1}_value`}
                  className="admin-input min-h-[42px] px-4"
                />

                <button
                  type="button"
                  onClick={() => removeOption(option.id)}
                  className="inline-flex min-h-[42px] items-center justify-center rounded-2xl bg-red-50 px-4 text-red-600 transition hover:bg-red-100"
                  aria-label="Remove option"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <p className="admin-form-list-meta mt-4 text-xs">
            O sistema salva essas opções como JSON automaticamente.
          </p>
        </div>
      ) : null}

      {type === "state" ? (
        <div className="rounded-2xl border border-[#53bc76]/20 bg-[#53bc76]/10 p-4 text-sm font-semibold text-[#0c2933]">
          O tipo States US já carrega automaticamente todos os estados dos
          Estados Unidos. Não precisa cadastrar options.
        </div>
      ) : null}

      {selectedPreset ? (
        <div className="rounded-2xl border border-[#53bc76]/20 bg-[#53bc76]/10 p-4 text-sm font-semibold text-[#0c2933]">
          Este preset preenche label, name, placeholder, help text e options
          automaticamente. Qualquer valor digitado manualmente acima será
          respeitado.
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
        >
          {isEditing ? <Pencil size={17} /> : <Plus size={17} />}
          {isEditing ? "Save Field" : "Add Field"}
        </button>

        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="admin-secondary-button min-h-[46px] gap-2 px-5 text-sm"
          >
            <X size={17} />
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
