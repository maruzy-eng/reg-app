import type { Metadata } from "next";
import { TutorialSkipTraceClient } from "./tutorial-skip-trace-client";
import "./tutorial-skip-trace.css";

export const metadata: Metadata = {
  title: "Skip Trace Tutorial | Checkmate Property",
  description:
    "Learn how to use Skip Trace inside Checkmate Property to find owner contact information, access the tool from property details or dashboard, and manage wallet usage.",
};

export default function TutorialSkipTracePage() {
  return <TutorialSkipTraceClient />;
}