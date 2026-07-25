import { createClient } from "@supabase/supabase-js";
import {
  getPublishedFormBySlug,
  type DynamicForm,
  type DynamicFormField,
} from "@/lib/forms";

export type FormPageConnectionKey =
  | "calculator"
  | "blueprint"
  | "blueprint-parcelada";

export type FormPageConnectionDefinition = {
  key: FormPageConnectionKey;
  label: string;
  path: string;
  description: string;
  fallbackSlug: string;
};

export type FormPageConnection = {
  id: string;
  page_key: string;
  form_id: string;
  created_at: string;
  updated_at: string;
};

export const FORM_PAGE_CONNECTION_DEFINITIONS: FormPageConnectionDefinition[] =
  [
    {
      key: "calculator",
      label: "Flip Calculator page",
      path: "/calculator",
      description:
        "Signup form shown on the public /calculator landing page.",
      fallbackSlug: "calculator",
    },
    {
      key: "blueprint",
      label: "Blueprint page",
      path: "/blueprint",
      description:
        "Formulário “Fale com um analista” exibido na página pública /blueprint.",
      fallbackSlug: "blueprint",
    },
    {
      key: "blueprint-parcelada",
      label: "Blueprint — Compra parcelada",
      path: "/compra-parcelada",
      description:
        "Formulário de compra parcelada do Blueprint exibido em /compra-parcelada.",
      fallbackSlug: "parcelada",
    },
  ];

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function isMissingTableError(
  error: { message?: string | null; code?: string | null } | null,
) {
  if (!error) {
    return false;
  }

  return (
    error.code === "42P01" ||
    Boolean(error.message?.includes("Could not find the table"))
  );
}

export function getFormPageConnectionDefinition(pageKey: string) {
  return (
    FORM_PAGE_CONNECTION_DEFINITIONS.find((item) => item.key === pageKey) ||
    null
  );
}

export async function getFormPageConnectionsByFormId(formId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("reg_form_page_connections")
    .select("*")
    .eq("form_id", formId)
    .order("page_key", { ascending: true })
    .returns<FormPageConnection[]>();

  if (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return data || [];
}

export async function getAllFormPageConnections() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("reg_form_page_connections")
    .select("*")
    .order("page_key", { ascending: true })
    .returns<FormPageConnection[]>();

  if (error) {
    if (isMissingTableError(error)) {
      return [];
    }

    throw new Error(error.message);
  }

  return data || [];
}

export async function getPublishedFormByPageKey(pageKey: FormPageConnectionKey) {
  const definition = getFormPageConnectionDefinition(pageKey);
  const supabase = getSupabaseAdmin();

  const { data: connection, error } = await supabase
    .from("reg_form_page_connections")
    .select("form_id")
    .eq("page_key", pageKey)
    .maybeSingle<{ form_id: string }>();

  if (error && !isMissingTableError(error)) {
    return {
      form: null as DynamicForm | null,
      fields: [] as DynamicFormField[],
      error: error.message,
      pageKey,
      connectionFormId: null as string | null,
    };
  }

  if (connection?.form_id) {
    const { data: form, error: formError } = await supabase
      .from("reg_forms")
      .select("*")
      .eq("id", connection.form_id)
      .eq("status", "published")
      .single<DynamicForm>();

    if (!formError && form) {
      const { data: fields, error: fieldsError } = await supabase
        .from("reg_form_fields")
        .select("*")
        .eq("form_id", form.id)
        .order("sort_order", { ascending: true })
        .returns<DynamicFormField[]>();

      if (!fieldsError) {
        return {
          form,
          fields: fields || [],
          error: null,
          pageKey,
          connectionFormId: form.id,
        };
      }
    }
  }

  const fallback = await getPublishedFormBySlug(
    definition?.fallbackSlug || pageKey,
  );

  return {
    ...fallback,
    pageKey,
    connectionFormId: fallback.form?.id || null,
  };
}

export async function setFormPageConnection(params: {
  pageKey: FormPageConnectionKey;
  formId: string | null;
}) {
  const definition = getFormPageConnectionDefinition(params.pageKey);

  if (!definition) {
    throw new Error("Unknown page connection.");
  }

  const supabase = getSupabaseAdmin();

  if (!params.formId) {
    const { error } = await supabase
      .from("reg_form_page_connections")
      .delete()
      .eq("page_key", params.pageKey);

    if (error && !isMissingTableError(error)) {
      throw new Error(error.message);
    }

    return;
  }

  const { error } = await supabase.from("reg_form_page_connections").upsert(
    {
      page_key: params.pageKey,
      form_id: params.formId,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "page_key",
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}
