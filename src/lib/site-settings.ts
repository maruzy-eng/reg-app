import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/types/database";

export type SiteSettingsValue = {
  site_name?: string;
  site_tagline?: string;
  site_description?: string;
  logo_url?: string;
  favicon_url?: string;
  primary_phone?: string;
  primary_email?: string;
  whatsapp_number?: string;
  address_line?: string;
  default_cta_title?: string;
  default_cta_description?: string;
  default_cta_button?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
};

export const DEFAULT_SITE_SETTINGS: Required<SiteSettingsValue> = {
  site_name: "Property Portal",
  site_tagline: "Real Estate Investment Projects",
  site_description:
    "Explore curated real estate projects, property details, media, videos, floor plans and investment information.",
  logo_url: "",
  favicon_url: "",
  primary_phone: "+1 (978) 239-5226",
  primary_email: "contact@property.com",
  whatsapp_number: "+19782395226",
  address_line: "",
  default_cta_title: "Interested in this project?",
  default_cta_description:
    "Connect with our team to learn more about availability, pricing and next steps.",
  default_cta_button: "Contact Us",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
};

export async function getSiteSettings(): Promise<Required<SiteSettingsValue>> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", "global")
    .maybeSingle();

  if (error) {
    console.error("Error fetching site settings:", error.message);
    return DEFAULT_SITE_SETTINGS;
  }

  if (!data?.value || typeof data.value !== "object") {
    return DEFAULT_SITE_SETTINGS;
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...(data.value as SiteSettingsValue),
  };
}

export async function upsertSiteSettings(value: SiteSettingsValue) {
  const supabase = createAdminClient();

  const payload = {
    key: "global",
    value: value as Json,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("site_settings")
    .upsert(payload, {
      onConflict: "key",
    });

  if (error) {
    console.error("Error upserting site settings:", error.message);
    throw new Error(error.message);
  }
}