import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ImageIcon, Trash2 } from "lucide-react";

type PropertyImageCardProps = {
  id: string;
  imageUrl: string;
  title?: string | null;
  altText?: string | null;
  caption?: string | null;
  position?: number | null;
  isCover?: boolean | null;
  deleteAction: React.ReactNode;
};

export function PropertyImageCard({
  imageUrl,
  title,
  altText,
  caption,
  position,
  isCover,
  deleteAction,
}: PropertyImageCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-[rgba(12,41,51,0.08)] bg-white shadow-[0_18px_44px_rgba(12,41,51,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(12,41,51,0.11)]">
      <div className="relative h-[210px] w-full overflow-hidden bg-[#f3f8f5]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText || title || "Property image"}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#53bc76]">
            <ImageIcon size={42} />
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isCover ? (
            <span className="rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-lg">
              Cover
            </span>
          ) : null}

          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0c2933] shadow-sm backdrop-blur">
            Position {position ?? 0}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="line-clamp-2 text-lg font-black leading-tight tracking-[-0.04em] text-[#0c2933]">
              {title || "Untitled image"}
            </h4>

            {caption ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6b7f88]">
                {caption}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-[#6b7f88]">
                Gallery image for this property.
              </p>
            )}
          </div>

          <div className="shrink-0">{deleteAction}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={imageUrl}
            target="_blank"
            className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[rgba(12,41,51,0.10)] bg-[#f8fbfc] px-4 text-xs font-bold text-[#0c2933] no-underline transition hover:bg-white hover:shadow-sm"
          >
            <ExternalLink size={14} />
            Open image
          </Link>

          <details className="group/details">
            <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center justify-center rounded-full border border-[rgba(12,41,51,0.10)] bg-[#f8fbfc] px-4 text-xs font-bold text-[#0c2933] transition hover:bg-white hover:shadow-sm">
              View URL
            </summary>

            <div className="mt-3 max-w-full rounded-2xl border border-[rgba(12,41,51,0.08)] bg-[#f8fbfc] p-3">
              <p className="break-all text-xs leading-5 text-[#6b7f88]">
                {imageUrl}
              </p>
            </div>
          </details>
        </div>
      </div>
    </article>
  );
}