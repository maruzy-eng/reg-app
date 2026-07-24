import type { ReactNode } from "react";
import { HomeAssistant } from "@/components/home/home-assistant";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHeader } from "@/components/home/home-header";
import { HomeInteractions } from "@/components/home/home-interactions";
import type { HomePageSettings } from "@/lib/home/types";

type SiteShellProps = {
  settings: HomePageSettings;
  children: ReactNode;
};

export function SiteShell({ settings, children }: SiteShellProps) {
  const siteName = settings.site_name || "Checkmate REG";

  return (
    <div
      id="home"
      className="checkmate-home min-h-screen overflow-x-hidden bg-white text-[#171614] antialiased selection:bg-[#ebca84] selection:text-[#171614]"
    >
      <HomeHeader siteName={siteName} />
      <main>{children}</main>
      <HomeFooter
        siteName={siteName}
        siteDescription={settings.site_description}
        supportEmail={settings.support_email}
        facebookUrl={settings.facebook_url}
        instagramUrl={settings.instagram_url}
        linkedinUrl={settings.linkedin_url}
        youtubeUrl={settings.youtube_url}
        copyrightText={settings.copyright_text}
      />
      <HomeAssistant />
      <HomeInteractions />
    </div>
  );
}
