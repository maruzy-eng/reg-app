import type { RegProduct } from "@/types/products";
import { toMoneyNumber } from "@/types/products";

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  product?: RegProduct | null;
  submitLabel: string;
};

function moneyInputValue(value: number | string | null | undefined) {
  const amount = toMoneyNumber(value);
  return amount === null ? "" : String(amount);
}

export function ProductForm({
  action,
  product,
  submitLabel,
}: ProductFormProps) {
  return (
    <form action={action} className="space-y-6">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">Nome</span>
          <input
            name="name"
            required
            defaultValue={product?.name || ""}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Slug</span>
          <input
            name="slug"
            defaultValue={product?.slug || ""}
            placeholder="gerado automaticamente se vazio"
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Status</span>
          <select
            name="status"
            defaultValue={product?.status || "draft"}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Valor</span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={moneyInputValue(product?.price)}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">
            Valor com desconto
          </span>
          <input
            name="discount_price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={moneyInputValue(product?.discount_price)}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-[#171614]">Ordem</span>
          <input
            type="number"
            name="sort_order"
            defaultValue={product?.sort_order ?? 0}
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">Imagem (URL)</span>
          <input
            name="image_url"
            defaultValue={product?.image_url || ""}
            placeholder="https://..."
            className="h-12 w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-bold text-[#171614]">Descrição</span>
          <textarea
            name="description"
            rows={6}
            defaultValue={product?.description || ""}
            className="w-full rounded-2xl border border-[rgba(23,22,20,0.1)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15"
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
