import Image from "next/image";
import Link from "next/link";

import {
  formatProductPrice,
  type RegProductCard,
} from "@/types/products";

type ProductCardProps = {
  product: RegProductCard;
};

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.price;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_55px_rgba(15,15,15,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#c9a24d]/35 hover:shadow-[0_28px_75px_rgba(15,15,15,0.1)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#ece9e2]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a948a]">
            Produto
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h2 className="text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.035em] text-[#171614]">
          {product.name}
        </h2>

        {product.description ? (
          <p className="mt-3 line-clamp-3 text-[0.9rem] leading-[1.65] text-[#68635b]">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto pt-6">
          <div className="flex items-end gap-3">
            {hasDiscount ? (
              <>
                <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-[#171614]">
                  {formatProductPrice(product.discountPrice)}
                </span>
                <span className="pb-0.5 text-[0.92rem] text-[#9a948a] line-through">
                  {formatProductPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-[#171614]">
                {formatProductPrice(product.price)}
              </span>
            )}
          </div>

          <Link
            href={`/checkout/${product.slug}`}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#ebca84_0%,#c9a24d_100%)] px-5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#17110a] no-underline shadow-[0_14px_34px_rgba(199,154,75,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(199,154,75,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24d]/45 focus-visible:ring-offset-2"
          >
            Comprar agora
          </Link>
        </div>
      </div>
    </article>
  );
}
