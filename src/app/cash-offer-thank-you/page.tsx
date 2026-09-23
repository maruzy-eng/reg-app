import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HomeContainer, cx, homeBtnPrimaryGold } from "@/components/home/home-ui";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Thank You — Cash Offer",
  description:
    "Your cash offer request has been sent successfully. Our analysts will be in touch within 24 hours.",
  path: "/cash-offer-thank-you",
  keywords: ["cash offer thank you", "Checkmate Real Estate Group"],
});

export default function CashOfferThankYouPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <JsonLd
        id="cash-offer-thank-you-breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cash Offer", path: "/cash-offer" },
          { name: "Thank You", path: "/cash-offer-thank-you" },
        ])}
      />

      <section className="relative isolate grid min-h-screen place-items-center overflow-hidden px-0 py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_0%,rgba(235,202,132,0.16),transparent_34rem),linear-gradient(180deg,#050505_0%,#11100e_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <HomeContainer>
          <div className="mx-auto max-w-[760px] rounded-[8px] border border-white/10 bg-white/[0.055] px-6 py-12 text-center shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-10 sm:py-14">
            <Image
              src="/images/cash-offer/logo-reg.webp"
              alt="Checkmate Real Estate Group"
              width={200}
              height={92}
              priority
              className="mx-auto h-auto w-[200px] max-w-full"
            />

            <p className="mt-10 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
              Welcome to Checkmate Real Estate Group
            </p>

            <h1 className="mt-5 text-[clamp(2.35rem,8vw,4.6rem)] font-semibold leading-none tracking-[-0.055em] text-white">
              Your data has been sent successfully.
            </h1>

            <p className="mx-auto mt-6 max-w-[520px] text-[1rem] leading-7 text-white/62 sm:text-[1.08rem]">
              Our analysts will be in touch within 24 hours…
            </p>

            <div className="mt-9 flex justify-center">
              <Link
                href="/cash-offer"
                className={cx(homeBtnPrimaryGold, "!text-white [&_*]:!text-white")}
              >
                <span className="relative z-[2]">Back to Cash Offer</span>
              </Link>
            </div>
          </div>
        </HomeContainer>
      </section>
    </main>
  );
}
