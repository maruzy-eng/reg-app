import type { Metadata } from "next";
import {
  BarChart3,
  Database,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Data Policy | Checkmate Property",
  description:
    "Data Policy for Checkmate Property, explaining how platform data, property data, user data, analytics, forms, and system records are collected, processed, stored, and protected.",
};

const highlights = [
  {
    title: "Platform Data",
    description:
      "We collect and organize data related to public property pages, projects, forms, user activity, website usage, and platform operations.",
    icon: <Database size={22} />,
  },
  {
    title: "Property Data",
    description:
      "Property information may include addresses, pricing, status, media, documents, descriptions, estimates, reports, and project-related records.",
    icon: <FileText size={22} />,
  },
  {
    title: "Usage & Analytics",
    description:
      "We may collect usage data to understand platform performance, improve user experience, monitor traffic, and support security.",
    icon: <BarChart3 size={22} />,
  },
  {
    title: "Data Protection",
    description:
      "We use reasonable technical, administrative, and operational safeguards to help protect data from unauthorized access or misuse.",
    icon: <ShieldCheck size={22} />,
  },
];

const sections = [
  {
    title: "Article 1 – Purpose of This Data Policy",
    paragraphs: [
      "This Data Policy explains how Checkmate Property collects, organizes, stores, processes, displays, and protects data across its website, public property pages, forms, reports, tools, dashboards, and related digital services.",
      "This policy is intended to help users, visitors, clients, investors, partners, and internal administrators understand how data may be used within the Checkmate Property platform.",
      "This Data Policy should be read together with our Privacy Policy and Terms of Use.",
    ],
  },
  {
    title: "Article 2 – Applicable Website and Platform",
    paragraphs: [
      "This Data Policy applies to www.checkmateproperty.com and any related digital platform, landing page, public project page, admin area, report, form, mobile experience, or connected service operated by Checkmate Property LLC.",
      "References to “Website,” “Platform,” “we,” “us,” or “our” refer to Checkmate Property LLC and its related digital services.",
      "References to “you” or “user” refer to any visitor, account holder, form submitter, client, investor, partner, or administrator who interacts with the Platform.",
    ],
  },
  {
    title: "Article 3 – Types of Data We May Collect",
    paragraphs: [
      "Depending on how the Platform is used, we may collect different categories of data. Some data is provided directly by users, some is created by administrators, and some is collected automatically through technical systems.",
    ],
    listTitle: "Data may include:",
    list: [
      "Property records, including address, city, state, ZIP code, price, status, specifications, descriptions, and project type.",
      "Property media, including images, videos, floor plans, documents, and related project files.",
      "Form submissions, including name, email, phone number, message, source, campaign, or other information provided by the user.",
      "Lead records and communication preferences.",
      "Account and admin user data, including name, email, role, permissions, and access records.",
      "Analytics and usage data, including page visits, referral sources, sessions, clicks, and device/browser information.",
      "Operational data used to manage public pages, project visibility, content status, and platform performance.",
    ],
  },
  {
    title: "Article 4 – Property and Project Data",
    paragraphs: [
      "The Platform may display public property and project information for transparency, marketing, operational, or informational purposes.",
      "Property and project data may include prices, addresses, specifications, square footage, bedrooms, bathrooms, status, projected values, images, videos, documents, plans, descriptions, project timelines, and related details.",
      "Although we make reasonable efforts to keep property data organized and accurate, property data may change over time and may not always be complete, current, or free from error.",
      "Users should independently verify any property, project, pricing, availability, estimate, or investment-related information before making decisions.",
    ],
  },
  {
    title: "Article 5 – Public Page Data",
    paragraphs: [
      "Some data may be used to create public-facing pages, including property pages, transparency pages, project pages, portfolio pages, and related content.",
      "Public pages may include information intentionally published by Checkmate Property or its authorized administrators.",
      "Information published on public pages may be indexed by search engines, shared publicly, or accessed by third parties.",
      "We may update, hide, archive, unpublish, or remove public pages at any time at our discretion.",
    ],
  },
  {
    title: "Article 6 – Form and Lead Data",
    paragraphs: [
      "When users submit forms on the Website, we may collect the information provided in those forms.",
      "Form and lead data may be used to respond to inquiries, qualify users, provide information, support sales processes, schedule calls, send updates, and manage customer or investor relationships.",
      "By submitting a form, users acknowledge that Checkmate Property or its representatives may contact them using the information provided, where permitted by law.",
    ],
    listTitle: "Form data may include:",
    list: [
      "Name and contact information.",
      "Email address and phone number.",
      "Message or request details.",
      "Interest category, selected property, or project reference.",
      "Campaign, landing page, referral source, or tracking information.",
      "Date and time of submission.",
    ],
  },
  {
    title: "Article 7 – User and Admin Data",
    paragraphs: [
      "Certain areas of the Platform may require user accounts, admin access, role-based permissions, or authentication.",
      "Admin data may be used to manage permissions, protect restricted areas, monitor platform usage, and maintain accountability for content and property updates.",
      "Users and administrators are responsible for keeping login credentials secure and for using the Platform only in accordance with authorized access levels.",
    ],
  },
  {
    title: "Article 8 – Analytics and Usage Data",
    paragraphs: [
      "We may collect analytics and usage data to understand how users interact with the Platform, improve performance, measure engagement, and support operational decisions.",
      "Analytics data may be collected through cookies, server logs, analytics tools, tracking scripts, or internal event systems.",
      "Analytics data may be aggregated or anonymized when used for reporting, performance monitoring, or product improvement.",
    ],
    listTitle: "Usage data may include:",
    list: [
      "Pages visited and actions taken.",
      "Date, time, and duration of visits.",
      "Referral source, campaign, or traffic channel.",
      "Browser, operating system, device type, and approximate location.",
      "Search activity, clicks, form interactions, and feature usage.",
      "Technical performance and error data.",
    ],
  },
  {
    title: "Article 9 – Cookies and Tracking Technologies",
    paragraphs: [
      "The Platform may use cookies and similar technologies to support functionality, analytics, personalization, performance monitoring, and security.",
      "Cookies may help remember preferences, measure traffic, improve user experience, and support marketing or analytics where permitted.",
      "Users may manage cookies through their browser settings. Disabling cookies may affect certain features or functionality of the Platform.",
    ],
  },
  {
    title: "Article 10 – How We Use Data",
    paragraphs: [
      "We use data to operate, maintain, improve, secure, and develop the Checkmate Property platform and related services.",
    ],
    listTitle: "Data may be used to:",
    list: [
      "Create and manage public property pages.",
      "Display property information, images, videos, documents, and project details.",
      "Respond to form submissions and user inquiries.",
      "Manage leads, contacts, and user communications.",
      "Provide access to tools, dashboards, reports, and services.",
      "Improve platform design, performance, usability, and user experience.",
      "Monitor traffic, analytics, and system health.",
      "Protect the Platform against misuse, fraud, spam, unauthorized access, or security threats.",
      "Comply with legal, regulatory, contractual, or operational obligations.",
    ],
  },
  {
    title: "Article 11 – Data Sharing",
    paragraphs: [
      "We may share data with trusted service providers, vendors, hosting providers, analytics platforms, CRM systems, email systems, payment processors, communication tools, contractors, or related entities when necessary to operate the Platform or provide services.",
      "We do not sell Personal Data without consent.",
      "We may disclose data when required by law, to protect our rights, to prevent fraud or abuse, to enforce our terms, or to comply with legal obligations.",
    ],
  },
  {
    title: "Article 12 – Third-Party Systems",
    paragraphs: [
      "The Platform may connect to or rely on third-party systems for hosting, data storage, analytics, CRM, email, payments, marketing automation, maps, media hosting, forms, or other operational functions.",
      "Third-party systems may process data according to their own terms, privacy policies, and security standards.",
      "We encourage users to review the policies of any third-party services they interact with through the Platform.",
    ],
  },
  {
    title: "Article 13 – Data Storage and Retention",
    paragraphs: [
      "Data may be stored in secure databases, cloud systems, file storage platforms, CRM tools, analytics tools, or other operational systems.",
      "We retain data for as long as reasonably necessary to provide services, maintain records, support legal or business obligations, resolve disputes, improve the Platform, and protect security.",
      "Certain data may be deleted, archived, anonymized, or retained depending on its type, purpose, legal requirements, and operational need.",
    ],
  },
  {
    title: "Article 14 – Data Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organizational safeguards to help protect data against unauthorized access, disclosure, alteration, loss, misuse, or destruction.",
      "Security measures may include access controls, role-based permissions, secure hosting, encrypted connections, restricted admin access, monitoring, and internal procedures.",
      "No method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of any data transmitted to or stored on the Platform.",
    ],
  },
  {
    title: "Article 15 – Data Accuracy",
    paragraphs: [
      "We aim to maintain accurate and useful data, but some information may become outdated, incomplete, or inaccurate over time.",
      "Property data, project data, pricing, availability, estimates, status, media, and documents may be updated or corrected at any time.",
      "Users should independently verify important information before relying on it for real estate, financial, legal, construction, or investment decisions.",
    ],
  },
  {
    title: "Article 16 – User Rights and Requests",
    paragraphs: [
      "Users may have rights regarding their Personal Data under applicable laws, including rights to access, correct, delete, restrict, or object to certain processing.",
      "To submit a data-related request, users may contact Checkmate Property using the contact information listed in this policy.",
      "We may need to verify your identity before processing certain requests.",
    ],
  },
  {
    title: "Article 17 – Data From Public Sources",
    paragraphs: [
      "Some property, market, project, location, or comparable information may be obtained from public sources, third-party providers, internal records, or user-provided data.",
      "Such data may be used to support property pages, reports, search features, analytics, and platform functionality.",
      "Public-source or third-party data may be subject to availability, licensing restrictions, accuracy limitations, and update delays.",
    ],
  },
  {
    title: "Article 18 – International Data Processing",
    paragraphs: [
      "Data may be processed, stored, or accessed from different jurisdictions depending on hosting providers, service providers, operational teams, or technical infrastructure.",
      "By using the Platform, you acknowledge that data may be processed outside your state, province, or country of residence, subject to applicable legal requirements.",
    ],
  },
  {
    title: "Article 19 – Updates to This Data Policy",
    paragraphs: [
      "We may update this Data Policy from time to time to reflect changes in our Platform, technology, operations, legal requirements, or business practices.",
      "Updates may be posted on this page with a revised effective date or updated content.",
      "Continued use of the Platform after updates means you acknowledge the revised Data Policy.",
    ],
  },
  {
    title: "Article 20 – Contact Information",
    paragraphs: [
      "If you have questions about this Data Policy, data processing, data storage, analytics, or data-related requests, contact Checkmate Property at Info@checkmateproperty.com.",
    ],
  },
];

export default async function DataPolicyPage() {
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
                  Data Governance
                </p>

                <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-[1] tracking-[-0.055em] text-[#101820] md:text-[54px]">
                  Data Policy for Checkmate Property.
                </h1>

                <p className="mt-6 max-w-3xl text-base font-normal leading-8 text-[#475569] md:text-lg">
                  This Data Policy explains how data is collected, organized,
                  displayed, stored, protected, and used across the Checkmate
                  Property website, public pages, forms, analytics, admin tools,
                  and digital services.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#53bc76]/20 bg-[linear-gradient(135deg,rgba(83,188,118,0.10),rgba(57,175,242,0.07))] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0e3541]">
                  Policy Details
                </p>

                <div className="mt-5 space-y-4 text-sm font-normal leading-6 text-[#475569]">
                  <div>
                    <strong className="block text-[#101820]">
                      Applicable Website
                    </strong>
                    <span>www.checkmateproperty.com</span>
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
                        For questions about this Data Policy or data-related
                        requests, contact Checkmate Property directly by email.
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