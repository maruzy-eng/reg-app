import type { Metadata } from "next";
import { TutorialCalculatorClient } from "./tutorial-calculator-client";
import "./tutorial-calculator.css";

export const metadata: Metadata = {
  title: "Calculator Tutorial | Checkmate Property",
  description:
    "Learn how to use the Checkmate Property calculator to analyze deals, estimate rehab costs, project profit, review ROI, and organize deal data.",
};

export default function TutorialCalculatorPage() {
  return <TutorialCalculatorClient />;
}
