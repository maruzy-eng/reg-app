import Image from "next/image";
import Link from "next/link";

import {
  formatPostDate,
  type RegPostCard,
} from "@/types/news";

type NewsCardProps = {
  post: RegPostCard;
  featured?: boolean;
};

export function NewsCard({ post, featured = false }: NewsCardProps) {
  return (
    <article
      className={[
        "group overflow-hidden rounded-[28px] border border-black/[0.07] bg-white",
        "shadow-[0_18px_55px_rgba(15,15,15,0.06)] transition duration-300",
        "hover:-translate-y-1.5 hover:border-[#c9a24d]/35 hover:shadow-[0_28px_75px_rgba(15,15,15,0.1)]",
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : "flex flex-col",
      ].join(" ")}
    >
      <Link
        href={`/news/${post.slug}`}
        className="block text-inherit no-underline"
      >
        <div
          className={[
            "relative overflow-hidden bg-[#ece9e2]",
            featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-full" : "aspect-[16/10]",
          ].join(" ")}
        >
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 55vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a948a]">
              News
            </div>
          )}
        </div>
      </Link>

      <div className={featured ? "flex flex-col justify-center p-7 sm:p-9" : "flex flex-1 flex-col p-6 sm:p-7"}>
        <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#8b6721]">
          {post.category ? <span>{post.category}</span> : null}
          {post.publishedAt ? (
            <>
              <span className="h-1 w-1 rounded-full bg-[#c9a24d]" />
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
            </>
          ) : null}
        </div>

        <h2
          className={[
            "mt-3 font-semibold tracking-[-0.035em] text-[#171614]",
            featured
              ? "text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.15]"
              : "text-[1.25rem] leading-[1.25]",
          ].join(" ")}
        >
          <Link
            href={`/news/${post.slug}`}
            className="text-inherit no-underline transition hover:text-[#8b6721]"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? (
          <p
            className={[
              "mt-3 text-[#68635b]",
              featured
                ? "text-[1rem] leading-[1.7]"
                : "line-clamp-3 text-[0.9rem] leading-[1.65]",
            ].join(" ")}
          >
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-[0.78rem] text-[#7c776f]">{post.authorName}</span>
          <Link
            href={`/news/${post.slug}`}
            className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721] no-underline transition hover:text-[#171614]"
          >
            Read article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
