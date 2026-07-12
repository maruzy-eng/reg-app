import { permanentRedirect } from "next/navigation";

export default function LegacyTutorialCalculatorPage() {
  permanentRedirect("/en/academy-videos/calculator");
}
