import type { ReactNode } from "react";

import { PageHero } from "@/components/home/page-hero";
import { SiteShell } from "@/components/home/site-shell";
import { HomeContainer } from "@/components/home/home-ui";
import type { HomePageSettings } from "@/lib/home/types";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageProps = {
  settings: HomePageSettings;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  footerNote?: ReactNode;
};

export function LegalPage({
  settings,
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  footerNote,
}: LegalPageProps) {
  return (
    <SiteShell settings={settings}>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        ctaHref="/contact"
        ctaLabel="Contact Us"
      />

      <section className="bg-[#f8f6f1] py-16 sm:py-20 lg:py-24">
        <HomeContainer>
          <article className="mx-auto max-w-[760px]">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#8b6721]">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#171614]">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4 text-[0.98rem] leading-[1.75] text-[#5f5a52]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.bullets?.length ? (
                      <ul className="list-disc space-y-2 pl-5">
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            {footerNote ? (
              <div className="mt-12 border-t border-black/10 pt-8 text-[0.95rem] leading-[1.7] text-[#5f5a52]">
                {footerNote}
              </div>
            ) : null}
          </article>
        </HomeContainer>
      </section>
    </SiteShell>
  );
}
