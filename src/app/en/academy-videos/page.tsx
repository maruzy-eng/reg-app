import type { Metadata } from "next";
import { TutorialPageClient } from "./tutorial-page-client";
import "./tutorial-page.css";

export const metadata: Metadata = {
  title: "Tutorials | Checkmate Property",
  description:
    "Step-by-step tutorials to help you use Checkmate Property with more clarity in the U.S. real estate market.",
};

export default function TutorialPage() {
  return <TutorialPageClient />;
}
