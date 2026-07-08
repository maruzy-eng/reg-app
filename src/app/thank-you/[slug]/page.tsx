import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { getPublishedThankYouPageBySlug } from "@/lib/thank-you-pages";

type ThankYouPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getYouTubeEmbedUrl(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (parsedUrl.hostname.includes("vimeo.com")) {
      const videoId = parsedUrl.pathname.replace("/", "");

      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return url;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ThankYouPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedThankYouPageBySlug(slug);

  if (!page) {
    return {
      title: "Thank You | Checkmate Property",
    };
  }

  return {
    title: `${page.title} | Checkmate Property`,
    description:
      page.description ||
      page.subtitle ||
      "Thank you for contacting Checkmate Property.",
  };
}

export default async function ThankYouDynamicPage({
  params,
}: ThankYouPageProps) {
  const { slug } = await params;
  const page = await getPublishedThankYouPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const embedUrl = getYouTubeEmbedUrl(page.video_url);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0c2933]">
      <section className="relative min-h-screen border-b border-[rgba(12,41,51,0.08)] bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(83,188,118,0.18),transparent_34rem)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(83,188,118,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(83,188,118,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 py-16 text-center lg:px-8">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(94deg,#53bc76_0%,#1f9f5f_100%)] text-white shadow-[0_24px_60px_rgba(83,188,118,0.28)]">
            <CheckCircle2 size={38} />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#53bc76]/20 bg-[#53bc76]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0c2933]">
            <Sparkles size={15} />
            Submission received
          </div>

          <h1 className="mt-6 max-w-4xl text-[42px] font-bold leading-[1] tracking-[-0.06em] text-[#0c2933] md:text-[76px]">
            {page.title}
          </h1>

          {page.subtitle ? (
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-[#0c2933] md:text-2xl">
              {page.subtitle}
            </p>
          ) : null}

          {page.description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
              {page.description}
            </p>
          ) : null}

          {embedUrl ? (
            <div className="mt-10 w-full max-w-3xl overflow-hidden rounded-[32px] border border-[rgba(12,41,51,0.08)] bg-white shadow-[0_24px_70px_rgba(12,41,51,0.10)]">
              <div className="aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title={page.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {page.button_label && page.button_url ? (
              <Link
                href={page.button_url}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(94deg,#53bc76_0%,#1f9f5f_100%)] px-7 text-sm font-extrabold text-white no-underline shadow-[0_18px_44px_rgba(83,188,118,0.24)] transition hover:-translate-y-0.5"
              >
                {page.button_label}
                <ArrowRight size={18} />
              </Link>
            ) : null}

            <Link
              href="/"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[rgba(12,41,51,0.10)] bg-white px-7 text-sm font-extrabold text-[#0c2933] no-underline shadow-sm transition hover:border-[#53bc76]/40"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>

          <div className="mt-10 rounded-[28px] border border-[rgba(12,41,51,0.08)] bg-white/80 p-5 text-left shadow-[0_18px_50px_rgba(12,41,51,0.06)] backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#53bc76]/12 text-[#0c2933]">
                <MessageCircle size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#0c2933]">
                  What happens next?
                </p>

                <p className="mt-1 max-w-xl text-sm leading-6 text-[#64748b]">
                  Your information was saved successfully. If this form has
                  automations configured, our system will process the related
                  webhooks and internal notifications automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}