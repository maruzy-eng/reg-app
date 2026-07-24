import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  CheckCircle2,
  Image as ImageIcon,
  Layers3,
  Plus,
  Settings2,
  Trash2,
} from "lucide-react";
import {
  addComplementItemAction,
  createComplementBlockAction,
  deleteComplementItemAction,
  updateComplementBlockPropertiesAction,
} from "@/app/admin/complementos/actions";
import { getAdminPropertyComplements } from "@/lib/property-complements";
import { requireAdminPermission } from "@/lib/admin-permissions";

function statusLabel(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AdminComplementosPage() {
  await requireAdminPermission("properties.update");

  const { blocks, properties } = await getAdminPropertyComplements();
  const defaultBlock = blocks.find((block) => block.slug === "appliances");
  const activeBlocks = blocks.filter((block) => block.is_active);
  const totalItems = blocks.reduce((total, block) => total + block.items.length, 0);

  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="admin-icon-box h-12 w-12 shrink-0">
              <Boxes size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Properties</p>

              <h2 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[#171614]">
                Complementos
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage reusable property content blocks such as appliances,
                finishes, furniture packages, warranties and other add-ons.
              </p>
            </div>
          </div>

          <Link
            href="/admin/properties"
            className="admin-secondary-button min-h-[44px] gap-2 px-4 text-sm no-underline"
          >
            Open Properties
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Complement blocks" value={blocks.length} />
        <StatCard label="Active blocks" value={activeBlocks.length} />
        <StatCard label="Items registered" value={totalItems} />
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="admin-section p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11">
              <Plus size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.04em] text-[#171614]">
                Create block
              </h3>

              <p className="text-sm text-slate-500">
                Each block becomes a section on selected property pages.
              </p>
            </div>
          </div>

          <form action={createComplementBlockAction} className="grid gap-4">
            <AdminInput label="Block title *" name="title" required />
            <AdminInput
              label="Slug"
              name="slug"
              placeholder="solar-panels"
              helpText="Optional. Used internally as the media group."
            />
            <AdminInput
              label="Eyebrow"
              name="eyebrow"
              placeholder="Add-ons"
            />

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#171614]">
                Description
              </span>
              <textarea
                name="description"
                rows={4}
                className="admin-input resize-none px-4 py-3"
                placeholder="Short text shown above the block on public property pages."
              />
            </label>

            <AdminInput
              label="Sort order"
              name="sort_order"
              type="number"
              defaultValue={blocks.length + 1}
            />

            <label className="flex items-start gap-3 rounded-2xl border border-[rgba(12,41,51,0.10)] bg-white px-4 py-3">
              <input
                name="is_active"
                type="checkbox"
                defaultChecked
                className="mt-1 h-4 w-4 accent-[#c79a4b]"
              />
              <span>
                <span className="block text-sm font-bold text-[#171614]">
                  Active
                </span>
                <span className="text-xs leading-5 text-slate-500">
                  Active blocks can appear on public property pages.
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="admin-primary-button min-h-[48px] gap-2 px-5 text-sm"
            >
              <Plus size={16} />
              Create Complement
            </button>
          </form>
        </div>

        <div className="admin-section p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11">
              <ImageIcon size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-[-0.04em] text-[#171614]">
                Add item
              </h3>

              <p className="text-sm text-slate-500">
                Add an image, title and description to a reusable block. The
                selected property is used as the media source.
              </p>
            </div>
          </div>

          <form action={addComplementItemAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#171614]">
                  Block
                </span>
                <select name="block_slug" required className="admin-input min-h-[46px] px-4">
                  {blocks.map((block) => (
                    <option key={block.id} value={block.slug}>
                      {block.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#171614]">
                  Source property
                </span>
                <select name="property_id" required className="admin-input min-h-[46px] px-4">
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#171614]">
                Upload image
              </span>
              <input
                name="image_file"
                type="file"
                accept="image/*"
                className="admin-input min-h-[46px] px-4 py-2"
              />
            </label>

            <AdminInput
              label="Image URL"
              name="image_url"
              helpText="Optional fallback for an existing hosted image URL."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Title *" name="title" required />
              <AdminInput label="Alt text" name="alt_text" />
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#171614]">
                Description
              </span>
              <textarea
                name="caption"
                rows={3}
                className="admin-input resize-none px-4 py-3"
              />
            </label>

            <AdminInput label="Position" name="position" type="number" />

            <button
              type="submit"
              className="admin-primary-button min-h-[48px] gap-2 px-5 text-sm"
            >
              <ImageIcon size={16} />
              Add Item
            </button>
          </form>
        </div>
      </section>

      {defaultBlock ? (
        <section className="rounded-[28px] border border-[#c79a4b]/25 bg-[#fbfaf7] p-6 shadow-[0_18px_48px_rgba(199,154,75,0.08)] md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#c79a4b] shadow-sm">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#c79a4b]">
                Default block
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[#171614]">
                Appliances is now managed here
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Existing appliance images continue to use the same media group:
                <strong> appliances</strong>. Select the properties below where
                this block should appear.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        {blocks.map((block) => (
          <article key={block.id} className="admin-section overflow-hidden">
            <div className="border-b border-[rgba(12,41,51,0.08)] px-6 py-5 md:px-8">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="admin-badge px-3 py-1">
                      {block.slug}
                    </span>
                    <span className="admin-badge px-3 py-1">
                      {block.is_active ? "Active" : "Inactive"}
                    </span>
                    <span className="admin-badge px-3 py-1">
                      {block.items.length} items
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#171614]">
                    {block.title}
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                    {block.description || "No description configured."}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-[#171614]">
                  <Layers3 size={18} className="text-[#c79a4b]" />
                  Order {block.sort_order}
                </div>
              </div>
            </div>

            <div className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
              <form
                action={updateComplementBlockPropertiesAction}
                className="border-b border-[rgba(12,41,51,0.08)] p-6 md:p-8 xl:border-b-0 xl:border-r"
              >
                <input type="hidden" name="block_id" value={block.id} />

                <div className="mb-4 flex items-center gap-3">
                  <Settings2 size={18} className="text-[#c79a4b]" />
                  <h4 className="text-base font-bold text-[#171614]">
                    Show this block on
                  </h4>
                </div>

                <div className="max-h-[380px] space-y-2 overflow-auto pr-2">
                  {properties.map((property) => (
                    <label
                      key={property.id}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[rgba(12,41,51,0.08)] bg-white px-4 py-3 transition hover:border-[#c79a4b]/40"
                    >
                      <input
                        type="checkbox"
                        name="property_ids"
                        value={property.id}
                        defaultChecked={block.propertyIds.includes(property.id)}
                        className="mt-1 h-4 w-4 accent-[#c79a4b]"
                      />
                      <span>
                        <span className="block text-sm font-bold text-[#171614]">
                          {property.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          /properties/{property.slug} · {statusLabel(property.status)}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="admin-primary-button mt-5 min-h-[44px] gap-2 px-5 text-sm"
                >
                  Save Visibility
                </button>
              </form>

              <div className="p-6 md:p-8">
                <h4 className="mb-4 text-base font-bold text-[#171614]">
                  Current items
                </h4>

                {block.items.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {block.items.map((item) => {
                      const property = properties.find(
                        (entry) => entry.id === item.property_id,
                      );

                      return (
                        <div
                          key={item.id}
                          className="overflow-hidden rounded-2xl border border-[rgba(12,41,51,0.10)] bg-white"
                        >
                          <div className="h-36 bg-slate-50">
                            <Image
                              src={item.image_url}
                              alt={item.alt_text || item.title || block.title}
                              width={520}
                              height={320}
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="space-y-3 p-4">
                            <div>
                              <p className="line-clamp-1 text-sm font-bold text-[#171614]">
                                {item.title || "Untitled item"}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {property?.title || "Unknown property"}
                              </p>
                            </div>

                            <form action={deleteComplementItemAction}>
                              <input
                                type="hidden"
                                name="image_id"
                                value={item.id}
                              />

                              <button
                                type="submit"
                                className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full bg-red-50 px-3 text-xs font-bold text-red-600 transition hover:bg-red-100"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </form>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[rgba(12,41,51,0.14)] bg-slate-50 p-8 text-center">
                    <ImageIcon className="mx-auto text-[#c79a4b]" size={28} />
                    <p className="mt-3 text-sm font-bold text-slate-500">
                      No items registered for this block yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="admin-kpi-card p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-[#171614]">{value}</p>
    </div>
  );
}

function AdminInput({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  placeholder,
  helpText,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  helpText?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-[#171614]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="admin-input min-h-[46px] px-4"
      />
      {helpText ? (
        <span className="text-xs leading-5 text-slate-500">{helpText}</span>
      ) : null}
    </label>
  );
}
