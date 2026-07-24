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
  meta_pixel_id?: string;
  google_tag_id?: string;
};

export const DEFAULT_SITE_SETTINGS: Required<SiteSettingsValue> = {
  site_name: "Checkmate REG",
  site_tagline: "Building lasting value through real estate.",
  site_description:
    "Checkmate REG connects real estate strategy, development, construction, and professional execution to create sustainable long-term value.",
  logo_url: "",
  favicon_url: "",
  primary_phone: "+1 (978) 239-5226",
  primary_email: "contact@property.com",
  whatsapp_number: "+19782395226",
  address_line: "",
  default_cta_title: "Interested in this property?",
  default_cta_description:
    "Connect with the Checkmate REG team to learn more about availability, pricing, project details, and next steps.",
  default_cta_button: "Contact Us",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
  meta_pixel_id: "",
  google_tag_id: "",
};

function isSiteSettingsObject(value: unknown): value is SiteSettingsValue {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export async function getSiteSettings(): Promise<Required<SiteSettingsValue>> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("reg_site_settings")
    .select("value")
    .eq("key", "global")
    .maybeSingle();

  if (error) {
    console.error("Error fetching site settings:", error.message);
    return DEFAULT_SITE_SETTINGS;
  }

  if (!isSiteSettingsObject(data?.value)) {
    return DEFAULT_SITE_SETTINGS;
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...data.value,
  };
}

export async function upsertSiteSettings(value: SiteSettingsValue) {
  const supabase = createAdminClient();

  const payload = {
    key: "global",
    value: {
      ...DEFAULT_SITE_SETTINGS,
      ...value,
    } as Json,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("reg_site_settings").upsert(payload, {
    onConflict: "key",
  });

  if (error) {
    console.error("Error upserting site settings:", error.message);
    throw new Error(error.message);
  }
}