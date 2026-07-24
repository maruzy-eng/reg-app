import type { RegPost } from "@/types/news";
import { normalizePostTags } from "@/types/news";

type NewsPostFormProps = {
  action: (formData: FormData) => Promise<void>;
  post?: RegPost | null;
  submitLabel: string;
};

function toDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export function NewsPostForm({
  action,
  post,
  submitLabel,
}: NewsPostFormProps) {
  return (
    <form action={action} className="space-y-6">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">Título</span>
          <input
            name="title"
            required
            defaultValue={post?.title || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Slug</span>
          <input
            name="slug"
            defaultValue={post?.slug || ""}
            placeholder="gerado automaticamente se vazio"
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Status</span>
          <select
            name="status"
            defaultValue={post?.status || "draft"}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Categoria</span>
          <input
            name="category"
            defaultValue={post?.category || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Autor</span>
          <input
            name="author_name"
            defaultValue={post?.author_name || "Checkmate REG"}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">
            Data de publicação
          </span>
          <input
            type="datetime-local"
            name="published_at"
            defaultValue={toDateTimeLocal(post?.published_at)}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Ordem</span>
          <input
            type="number"
            name="sort_order"
            defaultValue={post?.sort_order ?? 0}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">
            Cover image URL
          </span>
          <input
            name="cover_image_url"
            defaultValue={post?.cover_image_url || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">
            Tags (separadas por vírgula)
          </span>
          <input
            name="tags"
            defaultValue={normalizePostTags(post?.tags).join(", ")}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">Resumo</span>
          <textarea
            name="excerpt"
            rows={3}
            defaultValue={post?.excerpt || ""}
            className="w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">
            Conteúdo HTML
          </span>
          <textarea
            name="content_html"
            rows={14}
            defaultValue={post?.content_html || ""}
            className="w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 py-3 font-mono text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Meta title</span>
          <input
            name="meta_title"
            defaultValue={post?.meta_title || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">
            Meta description
          </span>
          <input
            name="meta_description"
            defaultValue={post?.meta_description || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>
      </div>

      <button
        type="submit"
        className="admin-primary-button min-h-[48px] px-6 text-sm"
      >
        {submitLabel}
      </button>
    </form>
  );
}
