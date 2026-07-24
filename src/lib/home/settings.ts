import type { HomePageSettings } from "@/lib/home/types";
import { getSiteSettings } from "@/lib/site-settings";

export function mapHomeSettings(
  settings: Awaited<ReturnType<typeof getSiteSettings>>,
): HomePageSettings {
  const year = new Date().getFullYear();
  const siteName = settings.site_name?.trim() || "Checkmate REG";

  return {
    site_name: siteName,
    site_description:
      settings.site_description?.trim() ||
      "Checkmate REG connects technology, development, construction, and strategic partnerships across U.S. residential real estate.",
    support_email: settings.primary_email?.trim() || "",
    facebook_url: settings.facebook_url?.trim() || "",
    instagram_url: settings.instagram_url?.trim() || "",
    linkedin_url: settings.linkedin_url?.trim() || "",
    youtube_url: settings.youtube_url?.trim() || "",
    copyright_text: `${year} © ${siteName}. All rights reserved.`,
  };
}
