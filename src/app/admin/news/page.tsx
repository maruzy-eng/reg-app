import Link from "next/link";
import {
  Newspaper,
  Plus,
  Pencil,
  ExternalLink,
} from "lucide-react";

import {
  deleteAdminPostAction,
  getAdminPosts,
} from "@/lib/admin-news";
import { formatPostDate, normalizePostTags } from "@/types/news";

function getStatusClass(status: string) {
  if (status === "published") {
    return "admin-user-pill-active";
  }

  return "admin-user-pill-viewer";
}

export default async function AdminNewsPage() {
  const posts = await getAdminPosts();

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="admin-icon-box h-12 w-12">
              <Newspaper size={22} />
            </div>

            <h2 className="admin-list-title mt-5 text-3xl font-bold tracking-normal">
              News
            </h2>

            <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
              Publique artigos do blog público em /news com páginas individuais
              por slug.
            </p>
          </div>

          <Link
            href="/admin/news/new"
            className="admin-primary-button min-h-[48px] gap-2 px-5 text-sm no-underline"
          >
            <Plus size={18} />
            Novo artigo
          </Link>
        </div>
      </section>

      <section className="admin-section overflow-hidden">
        <div className="flex items-center justify-between border-b border-[rgba(23,22,20,0.08)] px-6 py-5">
          <div>
            <h3 className="admin-list-title text-lg font-bold tracking-normal">
              Todos os artigos
            </h3>
            <p className="admin-list-meta mt-1 text-sm">
              Gerencie rascunhos, publicações e páginas individuais.
            </p>
          </div>
          <span className="admin-badge px-3 py-1">{posts.length} total</span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="admin-icon-box h-14 w-14">
              <Newspaper size={24} />
            </div>
            <h3 className="admin-list-title mt-5 text-xl font-bold">
              Nenhum artigo ainda
            </h3>
            <p className="admin-list-meta mt-2 max-w-md text-sm leading-6">
              Crie o primeiro artigo para começar a alimentar a página News.
            </p>
            <Link
              href="/admin/news/new"
              className="admin-primary-button mt-6 min-h-[46px] gap-2 px-5 text-sm no-underline"
            >
              <Plus size={17} />
              Criar artigo
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="admin-panel-header">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Artigo
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Publicado
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-[rgba(23,22,20,0.06)]"
                  >
                    <td className="px-6 py-5">
                      <p className="admin-list-title text-sm font-bold">
                        {post.title}
                      </p>
                      <p className="admin-list-meta mt-1 text-xs">
                        /news/{post.slug}
                      </p>
                      {normalizePostTags(post.tags).length > 0 ? (
                        <p className="admin-list-meta mt-1 text-xs">
                          {normalizePostTags(post.tags).join(" · ")}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`admin-user-pill ${getStatusClass(post.status)} px-3 py-1 text-xs uppercase tracking-[0.08em]`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#64748b]">
                      {post.category || "—"}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#64748b]">
                      {post.published_at
                        ? formatPostDate(post.published_at)
                        : "—"}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/news/${post.id}/edit`}
                          className="admin-secondary-button min-h-[38px] gap-2 px-3 text-xs no-underline"
                        >
                          <Pencil size={14} />
                          Editar
                        </Link>
                        {post.status === "published" ? (
                          <Link
                            href={`/news/${post.slug}`}
                            target="_blank"
                            className="admin-secondary-button min-h-[38px] gap-2 px-3 text-xs no-underline"
                          >
                            <ExternalLink size={14} />
                            Ver
                          </Link>
                        ) : null}
                        <form action={deleteAdminPostAction}>
                          <input type="hidden" name="id" value={post.id} />
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
