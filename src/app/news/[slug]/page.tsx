import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/home/site-shell";
import { NewsCard } from "@/components/news/news-card";
import {
  HomeContainer,
  homeBtnPrimaryGold,
} from "@/components/home/home-ui";
import { JsonLd } from "@/components/seo/json-ld";
import { mapHomeSettings } from "@/lib/home/settings";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  getRelatedPublishedPosts,
} from "@/lib/news";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";
import { getSiteSettings } from "@/lib/site-settings";
import {
  formatPostDate,
  mapPostToCard,
  normalizePostTags,
} from "@/types/news";

type NewsArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.excerpt ||
    "Checkmate REG insights on the U.S. real estate market.";

  return buildPageMetadata({
    title,
    description,
    path: `/news/${post.slug}`,
    image: post.cover_image_url,
    imageAlt: post.title,
    type: "article",
    publishedTime: post.published_at,
    keywords: [
      post.category || "real estate",
      "Checkmate News",
      "U.S. real estate market",
      ...normalizePostTags(post.tags),
    ],
  });
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const [rawSettings, post] = await Promise.all([
    getSiteSettings(),
    getPublishedPostBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }

  const settings = mapHomeSettings(rawSettings);
  const related = await getRelatedPublishedPosts({
    slug: post.slug,
    category: post.category,
    limit: 3,
  });
  const tags = normalizePostTags(post.tags);

  const description =
    post.meta_description ||
    post.excerpt ||
    "Checkmate REG insights on the U.S. real estate market.";

  return (
    <SiteShell settings={settings}>
      <JsonLd
        id="article-schema"
        data={buildArticleJsonLd({
          title: post.title,
          description,
          path: `/news/${post.slug}`,
          image: post.cover_image_url,
          publishedAt: post.published_at,
          updatedAt: post.updated_at,
          authorName: post.author_name,
          category: post.category,
        })}
      />
      <JsonLd
        id="breadcrumb-schema"
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ])}
      />
      <article>
        <section className="relative isolate overflow-hidden bg-[#090909] text-white">
          {post.cover_image_url ? (
            <div className="absolute inset-0 -z-40 opacity-35">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : null}
          <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.88)_100%)]" />

          <HomeContainer className="pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#e4c26e] no-underline transition hover:text-white"
            >
              ← Back to News
            </Link>

            <div className="mt-8 max-w-[820px]">
              <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#e4c26e]">
                {post.category ? <span>{post.category}</span> : null}
                {post.published_at ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[#c9a24d]" />
                    <time dateTime={post.published_at}>
                      {formatPostDate(post.published_at)}
                    </time>
                  </>
                ) : null}
              </div>

              <h1 className="mt-5 text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-balance">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-5 max-w-[640px] text-[1.05rem] leading-[1.7] text-white/65">
                  {post.excerpt}
                </p>
              ) : null}

              <p className="mt-6 text-[0.85rem] text-white/45">
                By {post.author_name}
              </p>
            </div>
          </HomeContainer>
        </section>

        <section className="bg-white py-14 sm:py-18 lg:py-20">
          <HomeContainer>
            <div className="mx-auto max-w-[720px]">
              <div
                className={[
                  "news-article-content",
                  "text-[1.05rem] leading-[1.8] text-[#3f3b35]",
                  "[&_h2]:mt-10 [&_h2]:text-[1.55rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-[#171614]",
                  "[&_h3]:mt-8 [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:text-[#171614]",
                  "[&_p]:mt-5",
                  "[&_a]:font-semibold [&_a]:text-[#8b6721] [&_a]:underline [&_a]:underline-offset-4",
                  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6",
                  "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6",
                  "[&_li]:mt-2",
                  "[&_strong]:text-[#171614]",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />

              {tags.length > 0 ? (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-black/[0.08] pt-8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#c9a24d]/25 bg-[#f7efd9] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#76591f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-12 rounded-[28px] border border-black/[0.07] bg-[#f8f6f1] p-7 sm:p-8">
                <h2 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#171614]">
                  Ready to operate with a clear method in the U.S. market?
                </h2>
                <p className="mt-3 max-w-[520px] text-[0.95rem] leading-[1.7] text-[#68635b]">
                  Explore Checkmate Blueprint and see if it is the right next
                  step for your journey.
                </p>
                <div className="mt-6">
                  <Link href="/blueprint" className={homeBtnPrimaryGold}>
                    Explore Blueprint
                  </Link>
                </div>
              </div>
            </div>
          </HomeContainer>
        </section>

        {related.length > 0 ? (
          <section className="bg-[#f8f6f1] py-16 sm:py-20">
            <HomeContainer>
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#8b6721]">
                    Keep reading
                  </p>
                  <h2 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.035em] text-[#171614]">
                    Related articles
                  </h2>
                </div>
                <Link
                  href="/news"
                  className="hidden text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721] no-underline sm:inline-flex"
                >
                  View all
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <NewsCard key={item.id} post={mapPostToCard(item)} />
                ))}
              </div>
            </HomeContainer>
          </section>
        ) : null}
      </article>
    </SiteShell>
  );
}
