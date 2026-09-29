import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { blueprintExperience as content } from "@/lib/blueprint/experience";
import type { SiteSettingsValue } from "@/lib/site-settings";
import { blueprintContainer } from "./shared";

export function Blueprint015Footer({
  settings,
}: {
  settings: SiteSettingsValue;
}) {
  const socials = [
    ["Instagram", settings.instagram_url],
    ["YouTube", settings.youtube_url],
    ["LinkedIn", settings.linkedin_url],
    ["Facebook", settings.facebook_url],
  ].filter(
    ([, href]) =>
      typeof href === "string" && /^https?:\/\//.test(href),
  );

  return (
    <footer className="border-t border-white/10 bg-[#060606] text-white">
      <div className={`${blueprintContainer} py-12 lg:py-16`}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <Link
              href="/"
              aria-label="Checkmate Real Estate Group, página inicial"
              className="inline-block"
            >
              <Image
                src={content.logo}
                alt="Checkmate Real Estate Group"
                width={2048}
                height={658}
                className="h-auto w-[180px]"
              />
            </Link>
          </div>

          <p className="max-w-[300px] text-[0.85rem] leading-[1.7] text-white/60">
            Experiência real.
            <br />
            Seu próximo passo, acompanhado.
          </p>

          {socials.length > 0 && (
            <nav
              aria-label="Redes sociais"
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {socials.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.72rem] text-white/60 transition-colors hover:text-white"
                >
                  {label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 text-[0.68rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/50">
            Copyright © {new Date().getFullYear()} Checkmate Real Estate Group.
            All rights reserved.
          </p>

          <nav
            aria-label="Links legais"
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            <a
              href="/privacy-policy"
              className="text-white/55 transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="/terms-of-use"
              className="text-white/55 transition-colors hover:text-white"
            >
              Terms
            </a>
            <a
              href="/blueprint-terms"
              className="text-white/55 transition-colors hover:text-white"
            >
              Blueprint Terms
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
