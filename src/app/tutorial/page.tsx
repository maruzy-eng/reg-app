import { permanentRedirect } from "next/navigation";

export default function LegacyTutorialPage() {
  permanentRedirect("/en/academy-videos");
}
