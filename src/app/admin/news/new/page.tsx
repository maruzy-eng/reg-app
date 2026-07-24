import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";

import { NewsPostForm } from "@/components/admin/news-post-form";
import { createAdminPostAction } from "@/lib/admin-news";

export default function AdminNewsNewPage() {
  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] no-underline hover:text-[#171614]"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <div className="admin-icon-box mt-5 h-12 w-12">
          <Newspaper size={22} />
        </div>

        <h2 className="admin-list-title mt-5 text-3xl font-bold tracking-normal">
          Novo artigo
        </h2>
        <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
          Crie um artigo para a página pública /news.
        </p>
      </section>

      <section className="admin-section p-6 md:p-8">
        <NewsPostForm
          action={createAdminPostAction}
          submitLabel="Criar artigo"
        />
      </section>
    </div>
  );
}
