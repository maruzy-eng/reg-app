import type { Metadata } from "next";
import { FileText, Globe2, Mail, Scale, ShieldCheck } from "lucide-react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Terms of Use | Checkmate Property",
  description:
    "Terms of Use for Checkmate Property, including access, services, user responsibilities, limitations, intellectual property, and contact information.",
};

const highlights = [
  {
    title: "Website Access",
    description:
      "These Terms govern your access to and use of the Checkmate Property website, tools, content, forms, and related digital services.",
    icon: <Globe2 size={22} />,
  },
  {
    title: "User Responsibilities",
    description:
      "Users agree to provide accurate information, use the platform lawfully, and avoid activities that may harm the Website or other users.",
    icon: <ShieldCheck size={22} />,
  },
  {
    title: "Intellectual Property",
    description:
      "All content, branding, design, software, data, and materials are owned by or licensed to Checkmate Property unless otherwise stated.",
    icon: <FileText size={22} />,
  },
  {
    title: "Legal Limitations",
    description:
      "The Website is provided for informational and operational purposes and does not replace legal, financial, tax, or investment advice.",
    icon: <Scale size={22} />,
  },
];

const sections = [
  {
    title: "Article 1 – Acceptance of Terms",
    paragraphs: [
      "These Terms of Use govern your access to and use of checkmateproperty.com, including any related pages, forms, tools, digital services, mobile experiences, or applications operated by Checkmate Property LLC.",
      "By accessing or using the Website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use.",
      "If you do not agree with these Terms, you should immediately stop using the Website and any services made available through it.",
    ],
  },
  {
    title: "Article 2 – Applicable Website",
    paragraphs: [
      "These Terms apply to the Website located at checkmateproperty.com and any corresponding digital platform, mobile application, landing page, or service that links to these Terms.",
      "The Website is operated by Checkmate Property LLC, referred to in these Terms as “Checkmate Property,” “we,” “us,” or “our.”",
      "Users of the Website may be referred to as “you,” “your,” or “user.”",
    ],
  },
  {
    title: "Article 3 – Website Purpose",
    paragraphs: [
      "Checkmate Property provides real estate-related information, tools, property pages, project visibility, market resources, forms, and digital services intended to support users in exploring real estate opportunities and project information.",
      "The Website may include property details, project data, media, reports, forms, estimates, calculators, educational information, and links to third-party tools or services.",
      "Information displayed on the Website is provided for general informational and operational purposes only and may change at any time without notice.",
    ],
  },
  {
    title: "Article 4 – No Professional Advice",
    paragraphs: [
      "The content available on the Website does not constitute legal, tax, accounting, financial, investment, construction, engineering, real estate brokerage, or professional advice.",
      "Any property data, projections, valuations, estimates, ROI calculations, ARV estimates, rehab estimates, comparable sales, or related information should be independently verified before making any decision.",
      "You should consult qualified professionals before making legal, financial, real estate, investment, construction, or tax decisions.",
    ],
  },
  {
    title: "Article 5 – User Accounts and Registration",
    paragraphs: [
      "Certain areas, tools, reports, features, or services may require account registration or user authentication.",
      "When creating an account or submitting information through the Website, you agree to provide accurate, complete, and current information.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "We reserve the right to suspend, restrict, or terminate access to accounts that violate these Terms or are suspected of unauthorized, fraudulent, abusive, or harmful activity.",
    ],
  },
  {
    title: "Article 6 – Acceptable Use",
    paragraphs: [
      "You agree to use the Website only for lawful purposes and in accordance with these Terms.",
    ],
    listTitle: "You agree not to:",
    list: [
      "Use the Website for any unlawful, fraudulent, harmful, or misleading purpose.",
      "Attempt to gain unauthorized access to any system, account, database, server, or restricted area.",
      "Interfere with the operation, security, availability, or performance of the Website.",
      "Copy, scrape, harvest, extract, or reproduce data from the Website without written permission.",
      "Upload or transmit viruses, malware, spam, malicious code, or harmful content.",
      "Misrepresent your identity, affiliation, or authority.",
      "Use the Website in a way that infringes the rights of Checkmate Property or any third party.",
    ],
  },
  {
    title: "Article 7 – Property Information and Availability",
    paragraphs: [
      "Property information displayed on the Website may include prices, status, addresses, images, specifications, documents, videos, descriptions, estimates, and other project-related information.",
      "We make reasonable efforts to present accurate information, but we do not guarantee that all information is complete, current, accurate, or free from errors.",
      "Property status, pricing, availability, projected values, construction details, and related data may change without notice.",
      "Any user interested in a property or project should independently verify all information before making any decision or taking any action.",
    ],
  },
  {
    title: "Article 8 – Forms, Leads, and Communications",
    paragraphs: [
      "The Website may allow users to submit forms, contact requests, applications, or other information.",
      "By submitting a form, you authorize Checkmate Property or its representatives to contact you using the information provided, including by email, phone, text message, or other communication channels where permitted by law.",
      "Submitting a form does not create a professional, fiduciary, brokerage, advisory, investment, or client relationship unless expressly agreed in writing.",
    ],
  },
  {
    title: "Article 9 – Payments, Subscriptions, and Paid Services",
    paragraphs: [
      "Some services, tools, reports, subscriptions, memberships, or digital products may require payment.",
      "Pricing, billing periods, payment methods, renewal terms, cancellation policies, and refund policies may be presented at checkout, in a separate agreement, or within the applicable service terms.",
      "By purchasing a paid service, you agree to pay all applicable fees and charges associated with that service.",
      "We reserve the right to modify pricing, features, or availability of paid services at any time, subject to applicable law and any specific agreement in place.",
    ],
  },
  {
    title: "Article 10 – Intellectual Property",
    paragraphs: [
      "All content, trademarks, logos, designs, graphics, software, code, data, text, videos, images, page layouts, reports, tools, and other materials available on the Website are owned by or licensed to Checkmate Property unless otherwise stated.",
      "You may not copy, reproduce, distribute, modify, sell, lease, exploit, reverse engineer, or create derivative works from any part of the Website without prior written permission.",
      "Nothing in these Terms grants you ownership or license rights in Checkmate Property intellectual property except for the limited right to access and use the Website in accordance with these Terms.",
    ],
  },
  {
    title: "Article 11 – User Content",
    paragraphs: [
      "The Website may allow users to submit, upload, post, or transmit content, including comments, messages, forms, images, documents, or other materials.",
      "By submitting content to the Website, you represent that you have the right to submit such content and that it does not violate the rights of any third party.",
      "You grant Checkmate Property a non-exclusive, worldwide, royalty-free right to use, store, reproduce, process, and display submitted content as necessary to operate the Website and provide services.",
      "We reserve the right to remove or restrict user content that we believe violates these Terms, applicable law, or the rights of others.",
    ],
  },
  {
    title: "Article 12 – Third-Party Links and Services",
    paragraphs: [
      "The Website may contain links to third-party websites, tools, platforms, services, payment processors, analytics providers, social networks, or other external resources.",
      "We do not control third-party websites or services and are not responsible for their content, policies, security, accuracy, availability, or practices.",
      "Your use of third-party services is subject to the terms and policies of those third parties.",
    ],
  },
  {
    title: "Article 13 – Privacy",
    paragraphs: [
      "Your use of the Website is also governed by our Privacy Policy.",
      "The Privacy Policy explains how we collect, use, store, disclose, and protect personal information.",
      "By using the Website, you acknowledge and agree that your information may be handled in accordance with our Privacy Policy.",
    ],
  },
  {
    title: "Article 14 – Disclaimers",
    paragraphs: [
      "The Website and all content, services, tools, and information are provided on an “as is” and “as available” basis.",
      "We do not guarantee that the Website will be uninterrupted, error-free, secure, current, accurate, complete, or free from harmful components.",
      "We disclaim all warranties to the fullest extent permitted by law, including implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.",
    ],
  },
  {
    title: "Article 15 – Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Checkmate Property LLC and its owners, officers, employees, contractors, affiliates, partners, and representatives shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages arising from or related to your use of the Website.",
      "This includes, without limitation, damages for lost profits, lost data, business interruption, investment loss, property-related decisions, errors, omissions, or reliance on information available through the Website.",
      "Your sole remedy for dissatisfaction with the Website is to stop using the Website.",
    ],
  },
  {
    title: "Article 16 – Indemnification",
    paragraphs: [
      "You agree to indemnify, defend, and hold harmless Checkmate Property LLC and its owners, officers, employees, contractors, affiliates, partners, and representatives from any claims, damages, liabilities, losses, costs, or expenses arising from your use of the Website, your violation of these Terms, your submitted content, or your violation of any law or third-party right.",
    ],
  },
  {
    title: "Article 17 – Suspension or Termination",
    paragraphs: [
      "We may suspend, restrict, or terminate your access to the Website or any service at any time if we believe you have violated these Terms, engaged in unlawful conduct, created risk for the Website or other users, or used the Website in a harmful or abusive manner.",
      "We may also modify, discontinue, or restrict any feature, service, tool, or content on the Website at any time without liability.",
    ],
  },
  {
    title: "Article 18 – Changes to These Terms",
    paragraphs: [
      "We reserve the right to update, modify, or replace these Terms of Use at any time.",
      "Updates may be posted on this page with an updated effective date.",
      "Your continued use of the Website after changes are posted means you accept the revised Terms.",
    ],
  },
  {
    title: "Article 19 – Governing Law",
    paragraphs: [
      "These Terms shall be governed by and interpreted in accordance with applicable law, without regard to conflict of law principles.",
      "Any disputes arising from or related to these Terms, the Website, or related services shall be handled in the appropriate jurisdiction as determined by applicable law and any written agreement between the parties.",
    ],
  },
  {
    title: "Article 20 – Contact Information",
    paragraphs: [
      "If you have any questions about these Terms of Use, please contact Checkmate Property at Info@checkmateproperty.com.",
    ],
  },
];

export default async function TermsOfUsePage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader settings={settings} />

      <section
        className="bg-white px-5 py-14 md:py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(83,188,118,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,175,242,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[36px] border border-black/10 bg-white/95 p-6 shadow-[0_24px_80px_rgba(9,24,39,0.08)] md:p-10">
            <div className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                  Website Terms
                </p>

                <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-[1] tracking-[-0.055em] text-[#101820] md:text-[54px]">
                  Terms of Use for Checkmate Property.
                </h1>

                <p className="mt-6 max-w-3xl text-base font-normal leading-8 text-[#475569] md:text-lg">
                  These Terms explain the rules, responsibilities,
                  limitations, and conditions that apply when you access or use
                  the Checkmate Property website, tools, forms, content, and
                  related digital services.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#53bc76]/20 bg-[linear-gradient(135deg,rgba(83,188,118,0.10),rgba(57,175,242,0.07))] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0e3541]">
                  Terms Details
                </p>

                <div className="mt-5 space-y-4 text-sm font-normal leading-6 text-[#475569]">
                  <div>
                    <strong className="block text-[#101820]">
                      Applicable Website
                    </strong>
                    <span>checkmateproperty.com</span>
                  </div>

                  <div>
                    <strong className="block text-[#101820]">Company</strong>
                    <span>Checkmate Property LLC</span>
                  </div>

                  <div>
                    <strong className="block text-[#101820]">Contact</strong>
                    <a
                      href="mailto:Info@checkmateproperty.com"
                      className="text-[#0e3541] underline underline-offset-4"
                    >
                      Info@checkmateproperty.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-black/10 bg-white p-5 shadow-[0_16px_44px_rgba(9,24,39,0.04)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(83,188,118,0.16),rgba(57,175,242,0.10))] text-[#0e3541]">
                    {item.icon}
                  </div>

                  <h2 className="text-lg font-bold tracking-[-0.04em] text-[#101820]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm font-normal leading-6 text-[#64748b]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside className="hidden lg:block">
                <div className="sticky top-28 rounded-[28px] border border-black/10 bg-[#f8fafc] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#53bc76]">
                    Contents
                  </p>

                  <div className="mt-4 max-h-[68vh] space-y-2 overflow-y-auto pr-1">
                    {sections.map((section, index) => (
                      <a
                        key={section.title}
                        href={`#article-${index + 1}`}
                        className="block rounded-2xl px-3 py-2 text-sm font-semibold text-[#64748b] transition hover:bg-white hover:text-[#0e3541]"
                      >
                        {section.title}
                      </a>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-7">
                {sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={`article-${index + 1}`}
                    className="scroll-mt-28 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_16px_44px_rgba(9,24,39,0.04)] md:p-8"
                  >
                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#101820] md:text-3xl">
                      {section.title}
                    </h2>

                    {section.paragraphs ? (
                      <div className="mt-5 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-base font-normal leading-8 text-[#334155]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    {section.list ? (
                      <div className="mt-6 rounded-[22px] border border-[#53bc76]/20 bg-[linear-gradient(135deg,rgba(83,188,118,0.08),rgba(57,175,242,0.05))] p-5">
                        {section.listTitle ? (
                          <h3 className="text-base font-bold text-[#0e3541]">
                            {section.listTitle}
                          </h3>
                        ) : null}

                        <ul className="mt-4 space-y-3">
                          {section.list.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-base font-normal leading-7 text-[#334155]"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#53bc76]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                ))}

                <section className="rounded-[28px] bg-[linear-gradient(135deg,#071f28_0%,#0e3541_100%)] p-6 text-white md:p-8">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                        Questions?
                      </p>

                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
                        Contact our team.
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm font-normal leading-6 text-white/70">
                        For questions about these Terms of Use, contact
                        Checkmate Property directly by email.
                      </p>
                    </div>

                    <a
                      href="mailto:Info@checkmateproperty.com"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-6 text-sm font-bold !text-white"
                    >
                      <Mail size={18} />
                      Email Us
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter settings={settings} />
    </main>
  );
}
