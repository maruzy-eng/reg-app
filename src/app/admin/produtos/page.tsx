import Link from "next/link";
import { Package, Plus, Pencil, ExternalLink } from "lucide-react";

import {
  deleteAdminProductAction,
  getAdminProducts,
} from "@/lib/admin-products";
import { formatProductPrice } from "@/types/products";

function getStatusClass(status: string) {
  if (status === "published") {
    return "admin-user-pill-active";
  }

  return "admin-user-pill-viewer";
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="admin-icon-box h-12 w-12">
              <Package size={22} />
            </div>

            <h2 className="admin-list-title mt-5 text-3xl font-bold tracking-normal">
              Produtos
            </h2>

            <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
              Gerencie os produtos exibidos na página pública /produtos.
            </p>
          </div>

          <Link
            href="/admin/produtos/new"
            className="admin-primary-button min-h-[48px] gap-2 px-5 text-sm no-underline"
          >
            <Plus size={18} />
            Novo produto
          </Link>
        </div>
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(23,22,20,0.08)] px-6 py-5">
          <div>
            <h3 className="admin-list-title text-lg font-bold tracking-normal">
              Todos os produtos
            </h3>
            <p className="admin-list-meta mt-1 text-sm">
              Nome, valor, desconto e status de publicação.
            </p>
          </div>
          <span className="admin-badge px-3 py-1">{products.length} total</span>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="admin-icon-box h-14 w-14">
              <Package size={24} />
            </div>
            <h3 className="admin-list-title mt-5 text-xl font-bold">
              Nenhum produto ainda
            </h3>
            <p className="admin-list-meta mt-2 max-w-md text-sm leading-6">
              Crie o primeiro produto para começar a alimentar a página
              Produtos.
            </p>
            <Link
              href="/admin/produtos/new"
              className="admin-primary-button mt-6 min-h-[46px] gap-2 px-5 text-sm no-underline"
            >
              <Plus size={17} />
              Criar produto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="admin-panel-header">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Produto
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Desconto
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-[rgba(23,22,20,0.06)]"
                  >
                    <td className="px-6 py-5">
                      <p className="admin-list-title text-sm font-bold">
                        {product.name}
                      </p>
                      <p className="admin-list-meta mt-1 text-xs">
                        /produtos#{product.slug}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`admin-user-pill ${getStatusClass(product.status)} px-3 py-1 text-xs uppercase tracking-[0.08em]`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#64748b]">
                      {formatProductPrice(product.price)}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#64748b]">
                      {product.discount_price != null
                        ? formatProductPrice(product.discount_price)
                        : "—"}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/produtos/${product.id}/edit`}
                          className="admin-secondary-button min-h-[38px] gap-2 px-3 text-xs no-underline"
                        >
                          <Pencil size={14} />
                          Editar
                        </Link>
                        {product.status === "published" ? (
                          <Link
                            href="/produtos"
                            target="_blank"
                            className="admin-secondary-button min-h-[38px] gap-2 px-3 text-xs no-underline"
                          >
                            <ExternalLink size={14} />
                            Ver
                          </Link>
                        ) : null}
                        <form action={deleteAdminProductAction}>
                          <input type="hidden" name="id" value={product.id} />
                          <button
                            type="submit"
                            className="admin-secondary-button min-h-[38px] px-3 text-xs text-red-600"
                          >
                            Excluir
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
