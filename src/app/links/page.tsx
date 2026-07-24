import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import { LinksPage } from "@/components/links/links-page";

import "./links-page.css";

export const metadata: Metadata = buildPageMetadata({
  title: "Links",
  description:
    "Official Checkmate REG links for contact, Blueprint, projects, and key resources.",
  path: "/links",
  keywords: ["Checkmate links", "Checkmate resources"],
});

export default function LinksRoutePage() {
  return <LinksPage />;
}
