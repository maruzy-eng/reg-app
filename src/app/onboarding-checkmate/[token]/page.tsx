import type { Metadata } from "next";
import { OnboardingCheckmateChat } from "@/components/onboarding-checkmate/onboarding-checkmate-chat";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export const metadata: Metadata = {
  title: "Onboarding | Checkmate Property",
  description:
    "Demonstração de onboarding conversacional da Checkmate Property.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OnboardingCheckmatePage({ params }: PageProps) {
  const { token } = await params;

  return <OnboardingCheckmateChat token={token} />;
}
