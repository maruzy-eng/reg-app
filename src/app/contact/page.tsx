import { permanentRedirect } from "next/navigation";

export default function LegacyContactPage() {
  permanentRedirect("/en/contact-us");
}
