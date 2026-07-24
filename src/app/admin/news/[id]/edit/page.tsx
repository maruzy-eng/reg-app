import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Newspaper } from "lucide-react";

import { NewsPostForm } from "@/components/admin/news-post-form";
import {
  getAdminPostById,
  updateAdminPostAction,
} from "@/lib/admin-news";

type AdminNewsEditPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    saved?: string;
  }>;
};

export default async function AdminNewsEditPage({
  params,
  searchParams,
}: AdminNewsEditPageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

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
          Editar artigo
        </h2>
        <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
          {post.title}
        </p>

        {resolvedSearchParams.saved === "1" ? (
          <div className="mt-5 rounded-2xl border border-[#ebca84]/50 bg-[#f7efd9] px-5 py-4 text-sm font-bold text-[#aa7732]">
            Artigo salvo com sucesso.
          </div>
        ) : null}
      </section>

      <section className="admin-section p-6 md:p-8">
        <NewsPostForm
          action={updateAdminPostAction}
          post={post}
          submitLabel="Salvar alterações"
        />
      </section>
    </div>
  );
}
