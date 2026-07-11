import type { Metadata } from "next";
import { TutorialProjectsClient } from "./tutorial-projects-client";
import "./tutorial-projects.css";

export const metadata: Metadata = {
  title: "Projects Tutorial | Checkmate Property",
  description:
    "Learn how to organize, track, and manage projects inside Checkmate Property using the Projects section.",
};

export default function TutorialProjectsPage() {
  return <TutorialProjectsClient />;
}
