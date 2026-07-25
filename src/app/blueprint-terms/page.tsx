import type { Metadata } from "next";

import { LegalPage } from "@/components/home/legal-page";
import { mapHomeSettings } from "@/lib/home/settings";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Blueprint Terms and Conditions",
  description:
    "Terms and Conditions for the Checkmate Real Estate Group Blueprint Mentorship Program.",
  path: "/blueprint-terms",
  keywords: [
    "Blueprint terms",
    "Checkmate Blueprint agreement",
    "mentorship terms and conditions",
  ],
});

export default async function BlueprintTermsPage() {
  const settings = mapHomeSettings(await getSiteSettings());

  return (
    <LegalPage
      settings={settings}
      eyebrow="Legal"
      title="Terms and Conditions"
      description="CHECKMATE REAL ESTATE GROUP – BLUEPRINT PROGRAM TERMS AND CONDITIONS"
      lastUpdated="July 25, 2026"
      sections={[
        {
          title: "1. Purpose",
          paragraphs: [
            "1.1 This Agreement governs the provision of twelve (12) private one-on-one mentoring sessions conducted by Checkmate Analysts, focusing on real estate investment strategies, business expansion, and capital acceleration.",
            "1.2 The mentoring sessions may be conducted in person or via Zoom, as mutually agreed upon by both parties.",
          ],
        },
        {
          title: "2. Fees and Payment Terms",
          paragraphs: [
            "2.1 The total fee for the Mentorship Program is US$10,000.00 (ten thousand U.S. dollars), payable in advance via credit card, bank transfer, or another approved electronic payment method.",
            "2.2 The payment covers exclusively the 12 (twelve) mentoring sessions conducted by Checkmate Analysts. Any additional consulting, project follow-up, or strategic support beyond the scope of these sessions shall require a separate agreement.",
          ],
        },
        {
          title: "3. Complimentary Bonuses",
          paragraphs: [
            "3.1 As a free, non-transferable, and non-refundable bonus, the MENTEE will receive access to the following benefits:",
          ],
          bullets: [
            "Access to the Capital Acceleration Program (PAC) – Online;",
            "One on-site field class with the Checkmate team at an active construction or real estate project;",
            "Participation in an exclusive networking cocktail event hosted at one of Checkmate’s premium properties;",
            "Access to the Checkmate Online Educational Platform;",
            "Ongoing support and follow-up from the Checkmate team throughout the 12-month mentorship period.",
          ],
          closingParagraphs: [
            "3.2 These bonuses are complimentary and not part of the paid mentoring service. They hold no monetary value for refund, credit, or chargeback purposes.",
          ],
        },
        {
          title: "4. Term",
          paragraphs: [
            "4.1 This Agreement shall remain valid for twelve (12) months from the date of payment confirmation. All mentoring sessions must be completed within this period unless otherwise agreed in writing.",
          ],
        },
        {
          title: "5. Cancellation and Non-Refund Policy",
          paragraphs: [
            "5.1 Once the first mentoring session has been conducted, the MENTEE acknowledges that no refunds or cancellations will be permitted under any circumstance.",
            "5.2 The MENTEE understands that this program requires personalized preparation, scheduling, and allocation of professional resources by the Checkmate Analysts and their support team, making the commitment non-reversible and non-refundable after the start of service delivery.",
          ],
        },
        {
          title: "6. Credit Card Chargebacks – Legal Notice",
          paragraphs: [
            "6.1 The MENTEE acknowledges that the mentoring service was purchased voluntarily, with full awareness and agreement to the terms established herein.",
            "6.2 Any attempt to initiate a credit card chargeback or dispute under false pretenses (such as “fraud,” “unauthorized transaction,” or “product not received”) shall constitute fraudulent behavior and bad faith, potentially resulting in civil and/or criminal liability.",
            "6.3 This Agreement serves as documented proof of consent and service delivery, confirming that:",
          ],
          bullets: [
            "The purchase was intentional and informed;",
            "Service delivery begins with the first session;",
            "No refund applies after that point;",
            "There is no valid claim of fraud or undelivered services.",
          ],
        },
        {
          title: "7. Additional Terms",
          paragraphs: [
            "7.1 All mentoring sessions must be scheduled in advance. Failure to attend a scheduled session without at least 24 hours’ notice may result in the forfeiture of that session without the option to reschedule.",
            "7.2 This Agreement shall be governed by and construed in accordance with the laws of the State of [●], and both parties agree to submit any disputes arising from this Agreement to the exclusive jurisdiction of the courts of the County of [●], expressly waiving any other venue.",
          ],
        },
        {
          title: "8. Acceptance",
          paragraphs: [
            "By completing the payment for the Blueprint Mentorship Program, the MENTEE confirms that they have read, understood, and agreed to all the terms and conditions set forth in this Agreement.",
          ],
        },
      ]}
    />
  );
}
