import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const formPayload = {
  name: "LP Brasil",
  slug: "lp-brasil",
  title: "LP Brasil",
  description:
    "Cadastro para brasileiros interessados em entender oportunidades de Real Estate nos EUA.",
  status: "published",
  submit_button_label: "Quero acesso gratuito",
  thank_you_page_url: "/lp-obrigado",
};

const fields = [
  {
    label: "Nome completo",
    name: "nome_completo",
    type: "text",
    required: true,
    placeholder: "Seu nome completo",
    options: [],
    sort_order: 10,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    placeholder: "seu@email.com",
    options: [],
    sort_order: 20,
  },
  {
    label: "WhatsApp",
    name: "whatsapp",
    type: "phone",
    required: true,
    placeholder: "Seu WhatsApp",
    options: [],
    sort_order: 30,
  },
  {
    label: "Cidade / Estado",
    name: "cidade_estado",
    type: "text",
    required: true,
    placeholder: "Cidade / Estado",
    options: [],
    sort_order: 40,
  },
  {
    label: "Você já investe fora do Brasil?",
    name: "ja_investe_fora_do_brasil",
    type: "radio",
    required: true,
    placeholder: null,
    options: ["Sim", "Ainda não", "Estou estudando"],
    sort_order: 50,
  },
  {
    label: "Qual seu principal objetivo?",
    name: "principal_objetivo",
    type: "select",
    required: true,
    placeholder: "Selecione uma opção",
    options: [
      "Diversificar patrimônio",
      "Investir em dólar",
      "Entender Real Estate nos EUA",
      "Acompanhar projetos da Checkmate",
      "Falar com um especialista",
    ],
    sort_order: 60,
  },
  {
    label: "Faixa de capital disponível",
    name: "faixa_de_capital_disponivel",
    type: "select",
    required: true,
    placeholder: "Selecione uma faixa",
    options: [
      "Até US$ 25 mil",
      "US$ 25 mil a US$ 50 mil",
      "US$ 50 mil a US$ 100 mil",
      "Acima de US$ 100 mil",
      "Ainda estou avaliando",
    ],
    sort_order: 70,
  },
  {
    label: "Mensagem",
    name: "mensagem",
    type: "textarea",
    required: false,
    placeholder: "Conte brevemente o que você busca entender.",
    options: [],
    sort_order: 80,
  },
];

const { data: form, error: upsertError } = await supabase
  .from("forms")
  .upsert(formPayload, { onConflict: "slug" })
  .select("id")
  .single();

if (upsertError || !form) {
  throw new Error(upsertError?.message || "Unable to upsert lp-brasil form.");
}

const { error: deleteError } = await supabase
  .from("form_fields")
  .delete()
  .eq("form_id", form.id);

if (deleteError) {
  throw new Error(deleteError.message);
}

const { error: fieldsError } = await supabase.from("form_fields").insert(
  fields.map((field) => ({
    ...field,
    form_id: form.id,
    help_text: null,
    default_value: null,
  })),
);

if (fieldsError) {
  throw new Error(fieldsError.message);
}

console.log("Seeded published lp-brasil form.");
