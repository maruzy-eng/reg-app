import { createClient } from "@supabase/supabase-js";
import {
  getPublishedFormBySlug,
  type DynamicForm,
  type DynamicFormField,
} from "@/lib/forms";

export type FormPageConnectionKey =
  | "calculator"
  | "blueprint"
  | "blueprint-vsl"
  | "blueprint-vsl-brasil"
  | "blueprint-parcelada"
  | "cash-offer";

export type FormPageConnectionDefinition = {
  key: FormPageConnectionKey;
  label: string;
  path: string;
  description: string;
  fallbackSlug: string;
  /**
   * Conexão usada quando esta página ainda não tem um formulário próprio
   * conectado no admin. Permite que /blueprint-vsl herde o formulário do
   * /blueprint sem duplicar cadastro.
   */
  fallbackPageKey?: FormPageConnectionKey;
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
      key: "blueprint-vsl",
      label: "Blueprint VSL page",
      path: "/blueprint-vsl",
      description:
        "Formulário exibido na VSL pública /blueprint-vsl, liberado após o vídeo. Sem conexão própria, herda o formulário do /blueprint.",
      fallbackSlug: "blueprint",
      fallbackPageKey: "blueprint",
    },
    {
      key: "blueprint-vsl-brasil",
      label: "Blueprint VSL Brasil page",
      path: "/blueprint-vsl-brasil",
      description:
        "Formulário exibido na VSL Brasil /blueprint-vsl-brasil, liberado após o vídeo.",
      fallbackSlug: "vsl-br",
    },
    {
      key: "blueprint-parcelada",
      label: "Blueprint — Compra parcelada",
      path: "/compra-parcelada",
      description:
        "Formulário de compra parcelada do Blueprint exibido em /compra-parcelada.",
      fallbackSlug: "parcelada",
    },
    {
      key: "cash-offer",
      label: "Cash Offer page",
      path: "/cash-offer",
      description:
        "Cash offer lead form shown on the public /cash-offer landing page.",
      fallbackSlug: "cash-offer",
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

export type PageFormResolution = {
  form: DynamicForm | null;
  fields: DynamicFormField[];
  error: string | null;
  pageKey: FormPageConnectionKey;
  connectionFormId: string | null;
  inheritedFromPageKey: FormPageConnectionKey | null;
};

async function loadPublishedFormById(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  formId: string,
) {
  const { data: form, error: formError } = await supabase
    .from("reg_forms")
    .select("*")
    .eq("id", formId)
    .eq("status", "published")
    .single<DynamicForm>();

  if (formError || !form) {
    return {
      form: null as DynamicForm | null,
      fields: [] as DynamicFormField[],
      error: (formError?.message ||
        "Form not found or not published.") as string | null,
    };
  }

  const { data: fields, error: fieldsError } = await supabase
    .from("reg_form_fields")
    .select("*")
    .eq("form_id", form.id)
    .order("sort_order", { ascending: true })
    .returns<DynamicFormField[]>();

  if (fieldsError) {
    return {
      form: null as DynamicForm | null,
      fields: [] as DynamicFormField[],
      error: fieldsError.message as string | null,
    };
  }

  return {
    form,
    fields: fields || [],
    error: null as string | null,
  };
}

export async function getPublishedFormByPageKey(
  pageKey: FormPageConnectionKey,
  options: { visited?: Set<FormPageConnectionKey> } = {},
): Promise<PageFormResolution> {
  const definition = getFormPageConnectionDefinition(pageKey);
  const supabase = getSupabaseAdmin();
  const visited = options.visited || new Set<FormPageConnectionKey>();
  visited.add(pageKey);

  const { data: connection, error } = await supabase
    .from("reg_form_page_connections")
    .select("form_id")
    .eq("page_key", pageKey)
    .maybeSingle<{ form_id: string }>();

  if (error && !isMissingTableError(error)) {
    return {
      form: null,
      fields: [],
      error: error.message,
      pageKey,
      connectionFormId: null,
      inheritedFromPageKey: null,
    };
  }

  if (connection?.form_id) {
    const connected = await loadPublishedFormById(
      supabase,
      connection.form_id,
    );

    if (connected.form) {
      return {
        ...connected,
        error: null,
        pageKey,
        connectionFormId: connected.form.id,
        inheritedFromPageKey: null,
      };
    }
  }

  const inheritedPageKey = definition?.fallbackPageKey;

  if (inheritedPageKey && !visited.has(inheritedPageKey)) {
    const inherited = await getPublishedFormByPageKey(inheritedPageKey, {
      visited,
    });

    if (inherited.form) {
      return {
        form: inherited.form,
        fields: inherited.fields,
        error: null,
        pageKey,
        connectionFormId: inherited.connectionFormId,
        inheritedFromPageKey: inheritedPageKey,
      };
    }
  }

  const fallback = await getPublishedFormBySlug(
    definition?.fallbackSlug || pageKey,
  );

  return {
    ...fallback,
    pageKey,
    connectionFormId: fallback.form?.id || null,
    inheritedFromPageKey: null,
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
