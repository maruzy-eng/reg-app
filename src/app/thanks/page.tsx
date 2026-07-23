import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThanksRedirectClient } from "@/components/public/thanks-redirect-client";
import { getSiteSettings } from "@/lib/site-settings";
import "./thanks-page.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-thanks",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Thanks for signing up | Checkmate Property",
  description:
    "Your Checkmate Property account was created successfully. You will be redirected to the Flip Calculator shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThanksPage() {
  const settings = await getSiteSettings();

  return (
    <div className={manrope.variable}>
      <ThanksRedirectClient settings={settings} />
    </div>
  );
}
