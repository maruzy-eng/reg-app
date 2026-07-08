import { createClient } from "@supabase/supabase-js";

export type ThankYouPage = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  button_label: string | null;
  button_url: string | null;
  video_url: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
};

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

export async function getPublishedThankYouPageBySlug(slug: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("thank_you_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<ThankYouPage>();

  if (error || !data) {
    return null;
  }

  return data;
}