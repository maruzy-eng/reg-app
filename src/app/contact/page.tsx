import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeBtnPrimaryDark,
  homeBtnPrimaryGold,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
} from "@/components/home/home-ui";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONTACT } from "@/lib/home/contact";
import { mapHomeSettings } from "@/lib/home/settings";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Checkmate REG in Orlando, FL. Talk with our team about real estate strategy, development, construction, and partnerships.",
  path: "/contact",
  keywords: ["contact Checkmate REG", "Orlando real estate office", "Checkmate phone"],
});

export default async function ContactPage() {
  const settings = mapHomeSettings(await getSiteSettings());
  const contactEmail = SITE_CONTACT.email;
  const contactHref = `mailto:${contactEmail}`;

  const socialLinks = [
    { label: "Facebook", href: settings.facebook_url },
    { label: "Instagram", href: settings.instagram_url },
    { label: "LinkedIn", href: settings.linkedin_url },
    { label: "YouTube", href: settings.youtube_url },
  ].filter((item) => Boolean(item.href?.trim()));

  const contactItems = [
    {
      label: "Address",
      value: SITE_CONTACT.address,
      href: SITE_CONTACT.addressHref,
      external: true,
      icon: MapPin,
    },
    {
      label: "Email",
      value: SITE_CONTACT.email,
      href: `mailto:${SITE_CONTACT.email}`,
      external: false,
      icon: AtSign,
    },
    {
      label: "Phone",
      value: SITE_CONTACT.phone,
      href: SITE_CONTACT.phoneHref,
      external: false,
      icon: Phone,
    },
  ] as const;

  return (
    <SiteShell settings={settings}>
      <JsonLd
        id="contact-breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/reg" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Better strategy."
        titleAccent="Stronger execution."
        description="Connect with our team to explore technology, development, construction, and strategic partnership opportunities."
        ctaHref={contactHref}
        ctaLabel="Talk to Our Team"
      />

      <HomeSection tone="cream">
        <HomeContainer>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div
              data-reveal
              className={cx(
                homeReveal(),
                "relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#f4efe4] px-6 py-10 sm:px-10 sm:py-12",
              )}
            >
              <span className={cx(homeEyebrowLight)}>
                <span className="h-px w-9 bg-[#8f672b]/70" />
                Get in Touch
              </span>
              <h2 className={cx("mt-6 max-w-[520px]", homeSectionTitle)}>
                Ready to build with Checkmate?
              </h2>
              <p className={cx("mt-5 max-w-[520px]", homeBody)}>
                Reach out to discuss projects, partnerships, or how our
                ecosystem can support your next real estate opportunity.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contactHref} className={homeBtnPrimaryDark}>
                  <span className="relative z-[2]">{contactEmail}</span>
                </a>
                <Link href="/projects" className={homeBtnPrimaryGold}>
                  <span className="relative z-[2]">View Projects</span>
                </Link>
              </div>
            </div>

            <div
              data-reveal
              className={cx(
                homeReveal(2),
                "rounded-[30px] border border-black/[0.07] bg-white px-6 py-10 sm:px-10 sm:py-12",
              )}
            >
              <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8f672b]">
                Contact Details
              </h3>

              <dl className="mt-8 space-y-7">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#9a948a]">
                        {item.label}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          className="inline-flex items-start gap-3 text-[1.05rem] font-semibold tracking-[-0.02em] text-[#171614] transition-colors hover:text-[#8f672b]"
                        >
                          <Icon
                            size={18}
                            className="mt-1 shrink-0 text-[#8f672b]"
                            aria-hidden="true"
                          />
                          <span className="leading-[1.45]">{item.value}</span>
                        </a>
                      </dd>
                    </div>
                  );
                })}

                <div>
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#9a948a]">
                    Focus
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-[1.7] text-[#6a655e]">
                    U.S. residential real estate — strategy, development,
                    construction, and partnerships.
                  </dd>
                </div>

                {socialLinks.length > 0 ? (
                  <div>
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#9a948a]">
                      Connect
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2.5">
                      {socialLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center rounded-full border border-black/[0.1] px-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#171614] transition-colors hover:border-[#171614] hover:bg-[#171614] hover:text-white"
                        >
                          {item.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>
    </SiteShell>
  );
}
