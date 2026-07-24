import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

import { LegalPage } from "@/components/home/legal-page";
import { mapHomeSettings } from "@/lib/home/settings";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Checkmate REG collects, uses, and protects personal information on our website and related services.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection"],
});

export default async function PrivacyPolicyPage() {
  const settings = mapHomeSettings(await getSiteSettings());
  const contactEmail = settings.support_email?.trim() || "contact@checkmateproperty.com";

  return (
    <LegalPage
      settings={settings}
      eyebrow="Legal"
      title="Privacy Policy"
      description="This Privacy Policy explains how Checkmate REG collects, uses, and protects information when you interact with our website and related services."
      lastUpdated="July 24, 2026"
      sections={[
        {
          title: "1. Who we are",
          paragraphs: [
            "Checkmate REG (“Checkmate,” “we,” “us,” or “our”) operates this website and related digital experiences as part of Checkmate Real Estate Group. This policy applies to information collected through our public website, forms, chat tools, and other online channels we control.",
          ],
        },
        {
          title: "2. Information we collect",
          paragraphs: [
            "We may collect information that you provide directly and information that is collected automatically when you use our website.",
          ],
          bullets: [
            "Contact details such as name, email address, and phone number.",
            "Messages, form responses, and preferences you submit through our site.",
            "Technical data such as IP address, browser type, device information, pages visited, and approximate location derived from IP.",
            "Usage data related to how you interact with our pages, links, and chat assistant.",
          ],
        },
        {
          title: "3. How we use information",
          paragraphs: [
            "We use personal information to operate and improve our services, respond to inquiries, and communicate about Checkmate offerings.",
          ],
          bullets: [
            "Respond to contact requests and qualify partnership or investment interest.",
            "Operate site features, including forms, chat, and lead routing.",
            "Improve website performance, content, and user experience.",
            "Maintain security, prevent abuse, and comply with legal obligations.",
            "Send relevant follow-up communications when you have requested contact.",
          ],
        },
        {
          title: "4. Sharing of information",
          paragraphs: [
            "We do not sell personal information. We may share information with trusted service providers that help us operate our website, communications, analytics, and CRM systems, and only as needed to perform those services.",
            "We may also disclose information when required by law, to protect our rights, or in connection with a corporate transaction involving Checkmate Real Estate Group.",
          ],
        },
        {
          title: "5. Cookies and similar technologies",
          paragraphs: [
            "Our website may use cookies and similar technologies to remember preferences, understand traffic patterns, and improve functionality. You can control cookies through your browser settings. Disabling cookies may affect some site features.",
          ],
        },
        {
          title: "6. Data retention",
          paragraphs: [
            "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including legal, accounting, or reporting requirements. Retention periods may vary depending on the nature of the inquiry and applicable obligations.",
          ],
        },
        {
          title: "7. Security",
          paragraphs: [
            "We use reasonable administrative, technical, and organizational measures designed to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          title: "8. Your choices",
          paragraphs: [
            "Depending on your location, you may have rights to request access, correction, deletion, or restriction of certain personal information. To exercise these rights, contact us using the details below. We may need to verify your identity before responding.",
          ],
        },
        {
          title: "9. Third-party links",
          paragraphs: [
            "Our website may include links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their policies before providing personal information.",
          ],
        },
        {
          title: "10. Updates to this policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page reflects the most recent revision. Continued use of the website after changes become effective constitutes acceptance of the updated policy.",
          ],
        },
        {
          title: "11. Contact",
          paragraphs: [
            `If you have questions about this Privacy Policy or our data practices, contact us at ${contactEmail} or through our Contact page.`,
          ],
        },
      ]}
      footerNote={
        <>
          For related conditions of website use, please review our{" "}
          <Link
            href="/terms-of-use"
            className="font-semibold text-[#8b6721] underline-offset-4 hover:underline"
          >
            Terms of Use
          </Link>
          .
        </>
      }
    />
  );
}
