import type { ReactNode } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { getSiteSettings } from "@/lib/site-settings";

type TutorialLayoutProps = {
  children: ReactNode;
};

export default async function TutorialLayout({ children }: TutorialLayoutProps) {
  const settings = await getSiteSettings();

  return (
    <>
      <PublicHeader settings={settings} />

      {children}

      <PublicFooter settings={settings} />
    </>
  );
}
