import type { Metadata } from "next";
import { TutorialPropertiesClient } from "./tutorial-properties-client";
import "./tutorial-properties.css";

export const metadata: Metadata = {
  title: "Properties Tutorial | Checkmate Property",
  description:
    "Learn how to search, filter, explore, and analyze properties inside Checkmate Property using maps, property details, foreclosures, and off-market opportunities.",
};

export default function TutorialPropertiesPage() {
  return <TutorialPropertiesClient />;
}
