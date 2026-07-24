import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

import { ProductForm } from "@/components/admin/product-form";
import { createAdminProductAction } from "@/lib/admin-products";

export default function AdminProductsNewPage() {
  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <Link
          href="/admin/produtos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] no-underline hover:text-[#171614]"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="admin-icon-box mt-5 h-12 w-12">
          <Package size={22} />
        </div>

        <h2 className="admin-list-title mt-5 text-3xl font-bold tracking-normal">
          Novo produto
        </h2>
        <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
          Crie um produto para a página pública /produtos.
        </p>
      </section>

      <section className="admin-section p-6 md:p-8">
        <ProductForm
          action={createAdminProductAction}
          submitLabel="Criar produto"
        />
      </section>
    </div>
  );
}
