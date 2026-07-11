import type { Metadata } from "next";
import {
  BarChart3,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { getPublishedFormBySlug } from "@/lib/forms";
import { getSiteSettings } from "@/lib/site-settings";
import "./contact-page.css";

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
    href: "mailto:contact@checkmateproperty.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    description: "Talk directly with our team.",
    value: "+1 (978) 239-5226",
    href: "https://wa.me/19782395226",
    icon: MessageCircle,
  },
  {
    title: "Phone",
    description: "Speak with a Checkmate representative.",
    value: "+1 (978) 239-5226",
    href: "tel:+19782395226",
    icon: Phone,
  },
  {
    title: "Location",
    description: "Real estate projects and operations across the U.S.",
    value: "United States",
    href: null,
    icon: MapPin,
  },
];

const helpCards = [
  {
    title: "Property Analysis",
    description:
      "Learn how Checkmate Property helps analyze deals, comps, ARV, rehab estimates, ROI and investment opportunities.",
    icon: BarChart3,
  },
  {
    title: "Real Estate Opportunities",
    description:
      "Talk to our team about active projects, property opportunities and investment strategies across the U.S.",
    icon: Building2,
  },
  {
    title: "Platform Access",
    description:
      "Get more information about using the Checkmate Property platform to search properties, run reports and evaluate deals.",
    icon: Send,
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
    <main className="contact-page">
      <PublicHeader settings={settings} />

      <section className="contact-hero">
        <div className="contact-wrap">
          <div className="contact-hero-grid">
            <div className="contact-hero-copy">
              <div className="contact-kicker">
                <span className="contact-kicker-dot" />
                Contact Checkmate Property
              </div>

              <h1>
                Let&apos;s talk about your next{" "}
                <span>real estate opportunity.</span>
              </h1>

              <p>
                Fill out the form and our team will contact you with more
                information about Checkmate Property, investment projects,
                analysis tools and real estate opportunities.
              </p>

              <div className="contact-hero-actions">
                <a href="#contact-form" className="contact-btn contact-btn-primary">
                  Send a Message <span>→</span>
                </a>

                <a href="/tutorial" className="contact-btn contact-btn-ghost">
                  View Tutorials <span>↗</span>
                </a>
              </div>
            </div>

            <aside className="contact-hero-panel" aria-label="Contact summary">
              <div className="contact-panel-top">
                <span>Team Response</span>
                <div className="contact-panel-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="contact-panel-highlight">
                <strong>24h</strong>
                <span>Typical response window for new inquiries.</span>
              </div>

              <div className="contact-panel-list">
                <div>
                  <span>01</span>
                  <p>Share your real estate question or platform need.</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Our team reviews the right project, tool, or next step.</p>
                </div>

                <div>
                  <span>03</span>
                  <p>We follow up with clear guidance and practical options.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-wrap">
          <div className="contact-section-head">
            <div>
              <div className="contact-kicker">
                <span className="contact-kicker-dot" />
                Reach Us
              </div>

              <h2>Choose the best way to connect with our team.</h2>
            </div>

            <p>
              Use the form for detailed requests, or contact us directly for
              faster questions about projects, platform access, and analysis.
            </p>
          </div>

          <div className="contact-card-grid">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <div className="contact-card-icon">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <h3>{card.title}</h3>

                  <p>{card.description}</p>

                  <strong>{card.value}</strong>
                </>
              );

              if (card.href) {
                return (
                  <a key={card.title} href={card.href} className="contact-card">
                    {content}
                  </a>
                );
              }

              return (
                <div key={card.title} className="contact-card">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-section contact-section-soft">
        <div className="contact-wrap">
          <div className="contact-help-grid">
            <div className="contact-process-card">
              <div className="contact-kicker">
                <span className="contact-kicker-dot" />
                Why Contact Us
              </div>

              <h2>How our team can help you.</h2>

              <p>
                Whether you are reviewing a deal, exploring platform access, or
                looking for practical real estate guidance, we keep the next step
                clear and actionable.
              </p>
            </div>

            <div className="contact-help-list">
              {helpCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="contact-help-card">
                    <div className="contact-help-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="contact-help-title">
                        <Icon size={18} />
                        <h3>{card.title}</h3>
                      </div>

                      <p>{card.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="contact-form">
        <div className="contact-wrap">
          <div className="contact-form-shell">
            <div className="contact-form-head">
              <div className="contact-kicker">
                <span className="contact-kicker-dot" />
                Send a Message
              </div>

              <h2>Contact our team</h2>

              <p>Complete the form and we will reach out as soon as possible.</p>
            </div>

            <div className="contact-form-body">
              <div className="contact-form-inner">
                {contactForm ? (
                  <DynamicFormComponent
                    form={contactForm}
                    fields={contactFields}
                  />
                ) : (
                  <div className="contact-form-empty">
                    Contact form is not published yet. Please check the form
                    with slug <strong>contact</strong> in the admin panel.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter settings={settings} />
    </main>
  );
}
