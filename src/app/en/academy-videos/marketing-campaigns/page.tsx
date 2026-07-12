import type { Metadata } from "next";
import { TutorialMarketingCampaignsClient } from "./tutorial-marketing-campaigns-client";
import "./tutorial-marketing-campaigns.css";

export const metadata: Metadata = {
  title: "Marketing Campaigns Tutorial | Checkmate Property",
  description:
    "Learn how to create and manage automated marketing campaigns inside Checkmate Property to organize leads, build sequences, and generate more real estate opportunities.",
};

export default function TutorialMarketingCampaignsPage() {
  return <TutorialMarketingCampaignsClient />;
}
