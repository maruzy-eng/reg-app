import type { ReactNode } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";

type TutorialLayoutProps = {
  children: ReactNode;
};

export default function TutorialLayout({ children }: TutorialLayoutProps) {
  return (
    <>
      <PublicHeader settings={DEFAULT_SITE_SETTINGS} />

      <main className="min-h-screen bg-white">{children}</main>

      <PublicFooter settings={DEFAULT_SITE_SETTINGS} />
    </>
  );
}
