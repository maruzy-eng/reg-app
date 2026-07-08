import Link from "next/link";
import { Building2 } from "lucide-react";
import type { SiteSettingsValue } from "@/lib/site-settings";

type PublicFooterProps = {
  settings: Required<SiteSettingsValue>;
};

export function PublicFooter({ settings }: PublicFooterProps) {
  const logoUrl = settings.logo_url;
  const currentYear = new Date().getFullYear();

  return (
    <div
      id="checkmate-property-footer"
      className="w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 10% 10%, rgba(83, 188, 118, 0.18), transparent 30%), radial-gradient(circle at 90% 10%, rgba(57, 175, 242, 0.18), transparent 32%), linear-gradient(135deg, #071f28 0%, #0e3541 100%)",
      }}
    >
      <footer className="cm-footer">
        <div className="mx-auto w-full max-w-[1220px] px-4 py-[70px] pb-7 max-[560px]:py-[54px] max-[560px]:pb-6">
          <div className="grid grid-cols-[1.35fr_0.75fr_0.75fr_0.75fr] gap-[34px] border-b border-white/10 pb-11 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-[26px] max-[560px]:pb-8">
            <div>
              <Link href="/" className="inline-flex">
                {logoUrl ? (
                  <span className="mb-[18px] inline-flex h-[58px] max-w-[220px] items-center justify-center rounded-[10px] bg-white px-3 py-2">
                    <img
                      src={logoUrl}
                      alt={settings.site_name || "Checkmate Property"}
                      className="block h-auto w-auto object-contain"
                      style={{
                        maxWidth: "190px",
                        maxHeight: "38px",
                      }}
                    />
                  </span>
                ) : (
                  <span className="mb-[18px] inline-flex items-center gap-3 rounded-[10px] bg-white p-2 pr-4 text-[#0e3541]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] !text-white">
                      <Building2 size={21} />
                    </span>

                    <span className="text-sm font-bold">
                      {settings.site_name || "Checkmate Property"}
                    </span>
                  </span>
                )}
              </Link>

              <p className="m-0 max-w-[430px] text-sm font-normal leading-[1.7] text-white/65">
                Checkmate Property is a real estate intelligence platform built
                to help investors search, analyze, validate, and act with better
                data.
              </p>
            </div>

            <div>
              <h4 className="mb-4 mt-0 text-lg font-bold leading-tight text-white">
                Platform
              </h4>

              <Link
                href="/projects"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Projects
              </Link>

              <Link
                href="/projects#how-it-works"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                How It Works
              </Link>

              <a
                href="https://app.checkmateproperty.com/#/login"
                target="_blank"
                rel="noreferrer"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Login
              </a>
            </div>

            <div>
              <h4 className="mb-4 mt-0 text-lg font-bold leading-tight text-white">
                Company
              </h4>

              <Link
                href="/"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Search
              </Link>

              <Link
                href="/properties?type=new_construction"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Buy
              </Link>

              <Link
                href="/properties?status=sold"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Sell
              </Link>

              <Link
                href="/properties?status=available"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Rent
              </Link>
            </div>

            <div>
              <h4 className="mb-4 mt-0 text-lg font-bold leading-tight text-white">
                Legal
              </h4>

              <Link
                href="/privacy-policy"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-use"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Terms of Use
              </Link>

              <Link
                href="/data-policy"
                className="my-2.5 block text-sm font-normal leading-[1.6] text-white/65 transition hover:translate-x-0.5 hover:text-white"
              >
                Data Policy
              </Link>
            </div>
          </div>

          <div className="flex justify-between gap-[18px] pt-6 text-sm font-normal leading-[1.7] text-white/65 max-[560px]:block">
            <div>
              {currentYear} © Checkmate Property Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}