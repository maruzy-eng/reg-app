import type { Metadata } from "next";
import { Mail, ShieldCheck, FileText, LockKeyhole, Globe2 } from "lucide-react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy | Checkmate Property",
  description:
    "Learn how Checkmate Property collects, uses, stores, and protects personal data when you use our website, services, forms, and digital platforms.",
};

const highlights = [
  {
    title: "Data We Collect",
    description:
      "We may collect information you provide directly, such as name, email, phone number, account details, payment information, and form submissions.",
    icon: <FileText size={22} />,
  },
  {
    title: "How We Use Data",
    description:
      "We use information to provide services, improve user experience, communicate with users, process purchases, and support marketing when permitted.",
    icon: <ShieldCheck size={22} />,
  },
  {
    title: "Cookies & Tracking",
    description:
      "We may use cookies, analytics, log data, and similar technologies to improve performance, usability, security, and personalization.",
    icon: <Globe2 size={22} />,
  },
  {
    title: "Your Rights",
    description:
      "You may request access, correction, portability, restriction, or deletion of your Personal Data by contacting us directly.",
    icon: <LockKeyhole size={22} />,
  },
];

const sections = [
  {
    title: "Article 1 – Definitions",
    paragraphs: [
      "For purposes of this Privacy Policy, the applicable website is www.checkmateproperty.com, including any corresponding mobile application currently in use or developed in the future.",
      "The Effective Date is the date this Privacy Policy comes into force and effect.",
      "The parties to this Privacy Policy are Checkmate Property LLC, as the Data Controller, and you, as the user of this Website.",
      "Checkmate Property LLC is the publisher, owner, and operator of the Website and is responsible for the collection and processing of information described in this Privacy Policy.",
      "Personal Data means personal data and information that we obtain from you in connection with your use of the Website and that may identify you in any manner.",
    ],
  },
  {
    title: "Article 2 – General Information",
    paragraphs: [
      "This Privacy Policy explains how Checkmate Property collects, uses, stores, and discloses Personal Data when you visit our Website, purchase goods, use our services, submit forms, or interact with our digital platforms.",
      "This Privacy Policy applies only to information collected through our Website and related digital experiences. It does not apply to third-party websites, mobile applications, or external services that may be linked from our Website.",
      "We are committed to protecting your privacy and handling your information responsibly.",
      "By continuing to use our Website, you acknowledge that you have reviewed this Privacy Policy and agree to the collection, use, storage, and disclosure of information as described here. If you do not agree with this Privacy Policy, you should stop using the Website.",
    ],
  },
  {
    title: "Article 3 – Contact",
    paragraphs: [
      "The party responsible for processing your Personal Data is Checkmate Property LLC.",
      "You may contact the Data Controller at Info@checkmateproperty.com.",
      "The Data Controller and the operator of the Website are one and the same.",
    ],
  },
  {
    title: "Article 4 – Location",
    paragraphs: [
      "The location where data processing activities take place is Brazil.",
    ],
  },
  {
    title: "Article 5 – Modifications and Revisions",
    paragraphs: [
      "We may modify, revise, or update this Privacy Policy at any time. If we make material changes to the way we process your Personal Data, we will notify you and obtain consent where required.",
      "Unless we specifically obtain your consent, changes to this Privacy Policy will only apply to information collected on or after the date of the change.",
      "You are responsible for periodically reviewing this page for updates, revisions, or amendments.",
    ],
  },
  {
    title: "Article 6 – Personal Data We Receive From You",
    paragraphs: [
      "The type of Personal Data we collect depends on how you use the Website, whether you register, submit forms, purchase goods or services, interact with content, or communicate with our representatives.",
    ],
    listTitle: "Personal Data may include:",
    list: [
      "Name, email address, phone number, and contact information.",
      "Account registration information.",
      "Payment and billing information when purchases or subscriptions are involved.",
      "Information provided through forms, comments, forums, chats, uploads, or other interactive features.",
      "Marketing preferences and email communication preferences.",
      "Information shared during interactions with our representatives.",
      "Aggregated or combined information used to improve the Website and user experience.",
    ],
  },
  {
    title: "Article 7 – Personal Data We Receive Automatically",
    paragraphs: [
      "We may automatically collect certain information when you access or use the Website. This may include cookies, IP address information, device information, browser data, session data, location-related information, and log files.",
      "Cookies help us make your browsing experience easier and more intuitive. They may remember preferences, improve performance, support security, and help us understand how users interact with the Website.",
      "You can manage or disable cookies through your browser settings. However, disabling cookies may slow down or prevent access to certain parts of the Website.",
      "We may use technical cookies, third-party cookies, analytics cookies, profiling cookies, and log data, where permitted and where consent is obtained when required.",
    ],
    listTitle: "Log data may include:",
    list: [
      "Internet Protocol address.",
      "Browser type and device parameters.",
      "Internet Service Provider information.",
      "Date and time of visit.",
      "Referral page, exit page, and number of clicks.",
      "Security-related information used to protect the Website and users.",
    ],
  },
  {
    title: "Article 8 – Third Parties",
    paragraphs: [
      "We may use third-party service providers to help operate the Website, store information, host services, process data, provide analytics, support advertising, or improve the user experience.",
      "Some third-party service providers may have access to Personal Data only as necessary to perform services for us and only if they agree to privacy standards consistent with this Privacy Policy.",
      "Some providers may be located outside of the United States, including Brazil.",
      "We do not sell or otherwise transfer your Personal Data to third parties without your approval, except as described in this Privacy Policy or as required by law.",
      "We may disclose information when necessary to protect our rights, property, users, customers, or third parties, or to comply with lawful requests and legal obligations.",
    ],
  },
  {
    title: "Article 9 – Social Network Plugins",
    paragraphs: [
      "The Website may include plugins, buttons, or integrations for social networks to make it easier to share content.",
      "These plugins are designed not to set cookies when the page is accessed unless you voluntarily use the plugin. If you are already logged into a social network, your interaction may be governed by that platform’s privacy and cookie policies.",
      "The collection and use of information through social network plugins are governed by the privacy policies of the respective social networks.",
    ],
  },
  {
    title: "Article 10 – How Personal Data Is Stored",
    paragraphs: [
      "We use secure physical and digital systems to store Personal Data when appropriate. We take reasonable steps to protect Personal Data against unauthorized access, disclosure, destruction, loss, or misuse.",
      "No method of transmission over the internet or electronic storage is completely secure. While we take privacy and security seriously, we cannot guarantee absolute security.",
      "Personal Data may be stored throughout your relationship with us and may be deleted upon account cancellation or upon a valid request for deletion.",
      "If a breach involving your Personal Data occurs, we will notify you within a reasonable time frame and follow applicable legal requirements.",
    ],
  },
  {
    title: "Article 11 – Purposes of Processing Personal Data",
    paragraphs: [
      "We use Personal Data primarily to provide a better experience on our Website, deliver services, fulfill requests, process purchases, provide support, and communicate with users.",
      "Information that does not directly identify you may be used for market research, product improvement, analytics, and marketing analysis.",
    ],
    listTitle: "We may process Personal Data to:",
    list: [
      "Improve your user experience.",
      "Communicate with you about your account or use of the Website.",
      "Provide customer support.",
      "Fulfill purchases or service requests.",
      "Send marketing or advertising communications when permitted.",
      "Notify you about updates to the Website, services, products, or related items.",
    ],
  },
  {
    title: "Article 12 – Disclosure of Personal Data",
    paragraphs: [
      "Although our policy is to maintain the privacy of your Personal Data, we may disclose Personal Data when we believe it is reasonable or necessary to do so.",
    ],
    listTitle: "Disclosure may occur:",
    list: [
      "To comply with local, state, federal, or applicable laws and regulations.",
      "To respond to subpoenas, court orders, lawful requests, or legal processes.",
      "To bring legal action against users who violate the law or our terms.",
      "To operate, maintain, and protect the Website.",
      "To cooperate with lawful investigations.",
      "To respond to suspected fraud, harmful activity, or violations of applicable rules.",
    ],
  },
  {
    title: "Article 13 – Public Information",
    paragraphs: [
      "The Website may allow users to post content or information publicly, including photographs, status updates, comments, articles, or other user-generated content.",
      "Any information you post publicly should be considered public information. We do not represent that such public information will remain private.",
    ],
  },
  {
    title: "Article 14 – Opting Out of Communications",
    paragraphs: [
      "From time to time, we may send informational or marketing communications related to the Website, products, services, updates, or announcements.",
      "You may opt out of marketing communications by contacting Info@checkmateproperty.com or by using the opt-out link included in such communications.",
      "Even if you opt out of marketing messages, you may still receive communications related to your account, transactions, security, or use of the Website.",
    ],
  },
  {
    title: "Article 15 – Modifying, Deleting, and Accessing Your Information",
    paragraphs: [
      "If you wish to modify, delete, or access information we may have about you, you may do so through your account settings page or by contacting us when account settings are not available.",
    ],
  },
  {
    title: "Article 16 – Acceptance of Risk",
    paragraphs: [
      "By continuing to use the Website, you acknowledge and accept this Privacy Policy.",
      "You understand that no transmission of information or data over the internet is completely secure, regardless of the steps taken to protect it.",
      "You acknowledge that you provide information at your own risk and that we cannot guarantee or warrant absolute security.",
    ],
  },
  {
    title: "Article 17 – Your Rights",
    paragraphs: [
      "You have rights regarding your Personal Data, subject to applicable law. These rights may be exercised by contacting us using the contact information listed in this Privacy Policy.",
    ],
    listTitle: "Your rights may include:",
    list: [
      "The right to be informed about the processing of your Personal Data.",
      "The right to access your Personal Data.",
      "The right to update or correct your Personal Data.",
      "The right to data portability.",
      "The right to oppose or limit the processing of your Personal Data.",
      "The right to request that we stop processing and delete your Personal Data.",
      "The right to block processing that violates applicable law.",
      "The right to file a complaint with the Federal Trade Commission or another applicable data protection authority.",
    ],
  },
  {
    title: "Article 18 – Contact Information",
    paragraphs: [
      "If you have questions about this Privacy Policy, the way we collect or process information, or if you would like to submit a privacy-related complaint, please contact us at Info@checkmateproperty.com.",
    ],
  },
];

export default async function PrivacyPolicyPage() {
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
                  Privacy & Data Protection
                </p>

                <h1 className="mt-4 max-w-4xl text-[34px] font-semibold leading-[1] tracking-[-0.055em] text-[#101820] md:text-[54px]">
                  How Checkmate Property protects your privacy.
                </h1>

                <p className="mt-6 max-w-3xl text-base font-normal leading-8 text-[#475569] md:text-lg">
                  This Privacy Policy explains what information we collect, how
                  we use it, how we protect it, when it may be shared, and what
                  rights you have regarding your Personal Data.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#53bc76]/20 bg-[linear-gradient(135deg,rgba(83,188,118,0.10),rgba(57,175,242,0.07))] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0e3541]">
                  Policy Details
                </p>

                <div className="mt-5 space-y-4 text-sm font-normal leading-6 text-[#475569]">
                  <div>
                    <strong className="block text-[#101820]">
                      Effective Date
                    </strong>
                    <span>08/01/2023</span>
                  </div>

                  <div>
                    <strong className="block text-[#101820]">
                      Applicable Website
                    </strong>
                    <span>www.checkmateproperty.com</span>
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
                        For privacy questions, data requests, or complaints,
                        contact Checkmate Property directly by email.
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