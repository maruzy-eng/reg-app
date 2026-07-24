import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

import { LegalPage } from "@/components/home/legal-page";
import { mapHomeSettings } from "@/lib/home/settings";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Review the Terms of Use that govern access to the Checkmate REG website and related digital services.",
  path: "/terms-of-use",
  keywords: ["terms of use", "website terms"],
});

export default async function TermsOfUsePage() {
  const settings = mapHomeSettings(await getSiteSettings());
  const contactEmail = settings.support_email?.trim() || "contact@checkmateproperty.com";

  return (
    <LegalPage
      settings={settings}
      eyebrow="Legal"
      title="Terms of Use"
      description="These Terms of Use govern your access to and use of the Checkmate REG website and related online materials."
      lastUpdated="July 24, 2026"
      sections={[
        {
          title: "1. Acceptance of terms",
          paragraphs: [
            "By accessing or using this website, you agree to these Terms of Use and our Privacy Policy. If you do not agree, please do not use the website.",
          ],
        },
        {
          title: "2. About Checkmate REG",
          paragraphs: [
            "This website is operated by Checkmate REG as part of Checkmate Real Estate Group. Content on this site is provided for general informational purposes related to real estate education, development, construction, partnerships, and related services.",
          ],
        },
        {
          title: "3. No investment or legal advice",
          paragraphs: [
            "Nothing on this website constitutes investment advice, legal advice, tax advice, an offer to sell, or a solicitation to buy any security, property interest, or financial product. Real estate investing involves risk, including the possible loss of capital. Always consult qualified professionals before making decisions.",
          ],
        },
        {
          title: "4. Use of the website",
          paragraphs: [
            "You agree to use this website only for lawful purposes and in a manner that does not disrupt, damage, or impair the site or interfere with others’ use.",
          ],
          bullets: [
            "Do not attempt unauthorized access to systems, accounts, or data.",
            "Do not submit false, misleading, or abusive information through forms or chat.",
            "Do not scrape, copy, or redistribute site content for commercial use without permission.",
            "Do not reverse engineer or interfere with site security or functionality.",
          ],
        },
        {
          title: "5. Intellectual property",
          paragraphs: [
            "All trademarks, logos, text, graphics, images, layouts, and other materials on this website are owned by Checkmate Real Estate Group or its licensors and are protected by applicable intellectual property laws. You may view and temporarily download materials for personal, non-commercial use only.",
          ],
        },
        {
          title: "6. User submissions",
          paragraphs: [
            "If you submit information through forms, chat, or other contact channels, you represent that the information is accurate and that you have the right to provide it. You grant Checkmate permission to use that information to respond to your inquiry and operate related business processes.",
          ],
        },
        {
          title: "7. Third-party services and links",
          paragraphs: [
            "The website may reference or link to third-party platforms, tools, or websites. Those services are governed by their own terms and privacy practices. Checkmate is not responsible for third-party content or availability.",
          ],
        },
        {
          title: "8. Disclaimer of warranties",
          paragraphs: [
            "The website and all content are provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.",
          ],
        },
        {
          title: "9. Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, Checkmate REG and Checkmate Real Estate Group will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or business opportunities arising from your use of or inability to use the website.",
          ],
        },
        {
          title: "10. Indemnification",
          paragraphs: [
            "You agree to indemnify and hold harmless Checkmate REG, Checkmate Real Estate Group, and their affiliates, officers, and partners from claims, damages, losses, and expenses arising out of your misuse of the website or violation of these Terms.",
          ],
        },
        {
          title: "11. Changes to these terms",
          paragraphs: [
            "We may update these Terms of Use at any time. The “Last updated” date indicates the latest revision. Your continued use of the website after changes are posted means you accept the updated Terms.",
          ],
        },
        {
          title: "12. Governing law",
          paragraphs: [
            "These Terms are governed by the laws of the United States and the State of Florida, without regard to conflict-of-law principles, except where mandatory local law provides otherwise.",
          ],
        },
        {
          title: "13. Contact",
          paragraphs: [
            `Questions about these Terms of Use may be sent to ${contactEmail} or submitted through our Contact page.`,
          ],
        },
      ]}
      footerNote={
        <>
          For details on how we handle personal information, please review our{" "}
          <Link
            href="/privacy-policy"
            className="font-semibold text-[#8b6721] underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </>
      }
    />
  );
}
