import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

import {
  HomeContainer,
  cx,
  homeBody,
  homeBtnPrimaryGold,
} from "@/components/home/home-ui";
import { getPublishedProductBySlug } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";
import {
  formatProductPrice,
  mapProductToCard,
  toMoneyNumber,
} from "@/types/products";

type CheckoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    return {
      title: "Checkout",
      robots: { index: false, follow: false },
    };
  }

  return {
    ...buildPageMetadata({
      title: `Checkout — ${product.name}`,
      description:
        product.description ||
        `Finalize a compra de ${product.name} no Checkmate REG.`,
      path: `/checkout/${product.slug}`,
      image: product.image_url,
      imageAlt: product.name,
      noIndex: true,
    }),
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const card = mapProductToCard(product);
  const hasDiscount =
    card.discountPrice !== null && card.discountPrice < card.price;
  const total = hasDiscount
    ? (toMoneyNumber(card.discountPrice) ?? card.price)
    : card.price;
  const savings =
    hasDiscount && card.discountPrice !== null
      ? card.price - card.discountPrice
      : 0;

  return (
    <div className="checkmate-home min-h-screen overflow-x-hidden bg-[#f8f6f1] text-[#171614] antialiased selection:bg-[#ebca84] selection:text-[#171614]">
      <main>
        <section className="bg-[#050505] text-white">
          <HomeContainer className="pb-12 pt-12 sm:pb-14 sm:pt-16">
            <span className="inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#ebca84]">
              <span className="h-px w-9 bg-[#ebca84]/70" />
              Checkout
            </span>
            <h1 className="mt-5 max-w-[720px] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
              Finalize sua compra
            </h1>
            <p className="mt-4 max-w-[520px] text-[1rem] leading-[1.7] text-white/60">
              Confirme os detalhes do pedido e conclua o pagamento com
              segurança.
            </p>
          </HomeContainer>
        </section>

        <section className="py-12 sm:py-16 lg:py-18">
          <HomeContainer>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
              <div className="overflow-hidden rounded-[30px] border border-black/[0.07] bg-white shadow-[0_24px_70px_rgba(15,15,15,0.06)]">
                <div className="relative aspect-[16/9] bg-[#ece9e2] sm:aspect-[21/9]">
                  {card.imageUrl ? (
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[220px] items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a948a]">
                      Produto
                    </div>
                  )}
                </div>

                <div className="px-6 py-8 sm:px-9 sm:py-10">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#8b6721]">
                    Produto selecionado
                  </p>
                  <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#171614]">
                    {card.name}
                  </h2>
                  {card.description ? (
                    <p className={cx("mt-4 max-w-[560px]", homeBody)}>
                      {card.description}
                    </p>
                  ) : null}

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        icon: Lock,
                        title: "Pagamento seguro",
                        text: "Transação protegida com criptografia de ponta a ponta.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Compra protegida",
                        text: "Seus dados pessoais e financeiros permanecem privados.",
                      },
                      {
                        icon: CreditCard,
                        title: "Pagamento flexível",
                        text: "Conclua a compra com os métodos disponíveis no checkout.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-[22px] border border-black/[0.06] bg-[#f8f6f1] px-4 py-4"
                        >
                          <Icon size={18} className="text-[#8b6721]" />
                          <p className="mt-3 text-[0.9rem] font-semibold text-[#171614]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[0.8rem] leading-[1.55] text-[#68635b]">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside className="h-fit rounded-[30px] border border-black/[0.07] bg-white p-6 shadow-[0_24px_70px_rgba(15,15,15,0.06)] sm:p-8 lg:sticky lg:top-8">
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#171614]">
                  Resumo do pedido
                </h3>

                <dl className="mt-6 space-y-4 border-b border-black/[0.08] pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[0.9rem] text-[#68635b]">{card.name}</dt>
                    <dd className="text-right text-[0.95rem] font-semibold text-[#171614]">
                      {formatProductPrice(card.price)}
                    </dd>
                  </div>

                  {hasDiscount ? (
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-[0.9rem] text-[#68635b]">Desconto</dt>
                      <dd className="text-right text-[0.95rem] font-semibold text-[#176b45]">
                        −{formatProductPrice(savings)}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721]">
                    Total
                  </p>
                  <p className="text-[1.7rem] font-bold tracking-[-0.04em] text-[#171614]">
                    {formatProductPrice(total)}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    className={cx(homeBtnPrimaryGold, "w-full")}
                  >
                    <span className="relative z-[2]">Pagar agora</span>
                  </button>

                  <p className="text-center text-[0.78rem] leading-[1.55] text-[#7c776f]">
                    Ao continuar, você será direcionado para um ambiente de
                    pagamento seguro.
                  </p>
                </div>
              </aside>
            </div>
          </HomeContainer>
        </section>
      </main>
    </div>
  );
}
