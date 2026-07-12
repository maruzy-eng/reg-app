import type { Metadata } from "next";
import { TutorialHardMoneyClient } from "./tutorial-hard-money-client";
import "./tutorial-hard-money.css";

export const metadata: Metadata = {
  title: "Hard Money Tutorial | Checkmate Property",
  description:
    "Learn how hard money can support U.S. real estate projects, capital structure, deal analysis, fix-and-flip execution, and new construction opportunities.",
};

export default function TutorialHardMoneyPage() {
  return <TutorialHardMoneyClient />;
}
