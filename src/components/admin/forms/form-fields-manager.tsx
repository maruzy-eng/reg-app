"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  FieldBuilderForm,
  type FieldBuilderField,
} from "@/components/admin/forms/field-builder-form";

type FormFieldsManagerProps = {
  formId: string;
  fields: FieldBuilderField[];
  createAction: (formData: FormData) => void | Promise<void>;
  updateAction: (formData: FormData) => void | Promise<void>;
  deleteAction: (formData: FormData) => void | Promise<void>;
};

function getFieldTypeLabel(type: string) {
  if (type === "state") {
    return "States US";
  }

  if (type === "state_br") {
    return "State BR";
  }

  if (type === "whatsapp_us") {
    return "WhatsApp US";
  }

  if (type === "whatsapp_br") {
    return "WhatsApp BR";
  }

  if (type === "radio") {
    return "Radio";
  }

  if (type === "select") {
    return "Select";
  }

  if (type === "textarea") {
    return "Textarea";
  }

  if (type === "checkbox") {
    return "Checkbox";
  }

  if (type === "hidden") {
    return "Hidden";
  }

  if (type === "password") {
    return "Password";
  }

  if (type === "email") {
    return "Email";
  }

  if (type === "phone") {
    return "Phone";
  }

  if (type === "number") {
    return "Number";
  }

  return "Text";
}

function stringifyJson(value: unknown) {
  return JSON.stringify(value || {}, null, 2);
}

export function FormFieldsManager({
  formId,
  fields,
  createAction,
  updateAction,
  deleteAction,
}: FormFieldsManagerProps) {
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const editingField = fields.find((field) => field.id === editingFieldId);

  return (
    <>
      {!editingField ? (
        <FieldBuilderForm
          formId={formId}
          nextSortOrder={fields.length + 1}
          action={createAction}
        />
      ) : (
        <div className="rounded-2xl border border-[rgba(199,154,75,0.25)] bg-[rgba(199,154,75,0.06)] p-4 md:p-5">
          <div className="mb-4">
            <p className="admin-form-list-title font-bold">Editing field</p>
            <p className="admin-form-list-meta mt-1 text-xs">
              {editingField.label} · {editingField.name}
            </p>
          </div>

          <FieldBuilderForm
            key={editingField.id}
            formId={formId}
            nextSortOrder={editingField.sort_order}
            field={editingField}
            action={async (formData) => {
              await updateAction(formData);
              setEditingFieldId(null);
            }}
            onCancel={() => setEditingFieldId(null)}
          />
        </div>
      )}

      <div className="mt-8 space-y-3">
        {fields.length === 0 ? (
          <p className="admin-empty-state rounded-2xl p-5 text-sm">
            No fields yet.
          </p>
        ) : (
          fields.map((field) => {
            const isEditing = field.id === editingFieldId;

            return (
              <div
                key={field.id}
                className={`admin-form-list-item overflow-hidden rounded-2xl p-4 ${
                  isEditing ? "ring-2 ring-[#c79a4b]/35" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="admin-form-list-title font-bold">
                      {field.label}
                    </p>

                    <p className="admin-form-list-meta mt-1 text-xs">
                      {field.name} · {getFieldTypeLabel(field.type)} · order{" "}
                      {field.sort_order}
                      {field.required ? " · required" : ""}
                      {field.type === "number" &&
                      field.options &&
                      typeof field.options === "object" &&
                      !Array.isArray(field.options) &&
                      typeof (field.options as { mask?: unknown }).mask ===
                        "string"
                        ? ` · mask ${(field.options as { mask: string }).mask}`
                        : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingFieldId(isEditing ? null : field.id)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(12,41,51,0.06)] text-[#171614] transition hover:bg-[rgba(12,41,51,0.12)]"
                      aria-label={isEditing ? "Close editor" : "Edit field"}
                    >
                      <Pencil size={16} />
                    </button>

                    <form action={deleteAction}>
                      <input type="hidden" name="form_id" value={formId} />
                      <input type="hidden" name="field_id" value={field.id} />

                      <button
                        type="submit"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                        aria-label="Delete field"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>

                {field.type === "radio" || field.type === "select" ? (
                  <pre className="admin-code-block mt-3 max-h-[180px] w-full max-w-full overflow-auto whitespace-pre-wrap break-words rounded-xl p-3 text-xs">
                    {stringifyJson(field.options)}
                  </pre>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
