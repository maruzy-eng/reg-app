import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { getPublishedFormBySlug } from "@/lib/forms";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Contact | Checkmate Property",
  description:
    "Contact Checkmate Property to learn more about real estate opportunities, investment projects, property analysis and platform access.",
};

const contactCards = [
  {
    title: "Email",
    description: "Send us a message and our team will get back to you.",
    value: "contact@checkmateproperty.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    description: "Talk directly with our team.",
    value: "+1 (978) 239-5226",
    icon: MessageCircle,
  },
  {
    title: "Phone",
    description: "Speak with a Checkmate representative.",
    value: "+1 (978) 239-5226",
    icon: Phone,
  },
  {
    title: "Location",
    description: "Real estate projects and operations across the U.S.",
    value: "United States",
    icon: MapPin,
  },
];

export default async function ContactPage() {
  const [settings, contactFormResult] = await Promise.all([
    getSiteSettings(),
    getPublishedFormBySlug("contact"),
  ]);

  const contactForm = contactFormResult?.form || null;
  const contactFields = contactFormResult?.fields || [];

  return (
    <main className="min-h-screen bg-white">
      <PublicHeader settings={settings} />

      <section
        className="relative overflow-hidden bg-white px-5 py-14 md:py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(83,188,118,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,175,242,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      >
        <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(83,188,118,0.20),transparent_68%)]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(57,175,242,0.18),transparent_68%)]" />

        <div className="relative z-10 mx-auto max-w-[1220px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#53bc76]">
              Contact
            </p>

            <h1 className="mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0e3541] md:text-[68px]">
              Let&apos;s talk about your next real estate opportunity.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-8 text-[#64748b] md:text-lg">
              Fill out the form below and our team will contact you with more
              information about Checkmate Property, investment projects,
              analysis tools and real estate opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-[26px] border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(83,188,118,0.16),rgba(57,175,242,0.10))] text-[#53bc76] ring-1 ring-[#53bc76]/20">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold tracking-[-0.04em] text-[#0e3541]">
                    {card.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#64748b]">
                    {card.description}
                  </p>

                  <p className="mt-4 text-sm font-bold leading-6 text-[#0e3541]">
                    {card.value}
                  </p>
                </div>
              );
            })}
          </div>

          <section className="mt-12 rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(17,17,17,0.08)] md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
              Why contact us
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#0e3541] md:text-4xl">
              How our team can help you
            </h2>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[24px] border border-[#53bc76]/20 bg-[#f0fdf4] p-5">
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-[#0e3541]">
                  Property Analysis
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Learn how Checkmate Property helps analyze deals, comps, ARV,
                  rehab estimates, ROI and investment opportunities.
                </p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-gray-50 p-5">
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-[#0e3541]">
                  Real Estate Opportunities
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Talk to our team about active projects, property opportunities
                  and investment strategies across the U.S.
                </p>
              </div>

              <div className="rounded-[24px] border border-black/10 bg-gray-50 p-5">
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-[#0e3541]">
                  Platform Access
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Get more information about using the Checkmate Property
                  platform to search properties, run reports and evaluate deals.
                </p>
              </div>
            </div>
          </section>

          <section
            id="contact-form"
            className="mt-12 rounded-[32px] border border-[#53bc76]/20 bg-white shadow-[0_22px_70px_rgba(17,17,17,0.08)]"
          >
            <div className="border-b border-black/10 p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                Send a message
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#0e3541] md:text-4xl">
                Contact our team
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b]">
                Complete the form and we will reach out as soon as possible.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="mx-auto max-w-3xl">
                {contactForm ? (
                  <DynamicFormComponent
                    form={contactForm}
                    fields={contactFields}
                  />
                ) : (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-800">
                    Contact form is not published yet. Please check the form
                    with slug <strong>contact</strong> in the admin panel.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PublicFooter settings={settings} />
    </main>
  );
}