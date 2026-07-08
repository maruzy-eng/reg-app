import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  Building2,
  FileText,
  Image,
  LinkIcon,
  MapPin,
  Save,
  Settings2,
} from "lucide-react";
import { createPropertyAction } from "@/app/admin/properties/actions";
import { requireAdminPermission } from "@/lib/admin-permissions";

const propertyTypes = [
  { value: "single_family", label: "Single Family" },
  { value: "multi_family", label: "Multi Family" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "new_construction", label: "New Construction" },
  { value: "flip", label: "Flip" },
];

const propertyStatuses = [
  { value: "draft", label: "Draft" },
  { value: "available", label: "Available" },
  { value: "under_contract", label: "Under Contract" },
  { value: "sold", label: "Sold" },
  { value: "in_progress", label: "In Progress" },
  { value: "archived", label: "Archived" },
];

export default async function NewPropertyPage() {
  await requireAdminPermission("properties.create");

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#587469] transition hover:text-[#0e3541]"
        >
          <ArrowLeft size={18} />
          Back to properties
        </Link>
      </div>

      <div className="admin-dark-panel rounded-[2rem] p-6 text-white md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8df0a9]">
          New Property
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Create Property
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72">
          Add a new property listing with public page data, financial details,
          media links and contact information.
        </p>
      </div>

      <form action={createPropertyAction} className="mt-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="admin-section p-6">
              <SectionHeader
                icon={<Building2 size={22} />}
                title="Basic Information"
                description="Main title, slug, status, type and descriptions."
              />

              <div className="mt-6 grid gap-5">
                <InputField label="Property Title *" name="title" required />

                <InputField
                  label="Slug"
                  name="slug"
                  placeholder="optional-custom-slug"
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <SelectField
                    label="Property Type"
                    name="property_type"
                    defaultValue="single_family"
                    options={propertyTypes}
                  />

                  <SelectField
                    label="Status"
                    name="status"
                    defaultValue="draft"
                    options={propertyStatuses}
                  />

                  <SelectField
                    label="Visibility"
                    name="visibility"
                    defaultValue="public"
                    options={[
                      { value: "public", label: "Public" },
                      { value: "private", label: "Private" },
                      { value: "hidden", label: "Hidden" },
                    ]}
                  />
                </div>

                <TextareaField
                  label="Short Description"
                  name="short_description"
                  rows={3}
                />

                <TextareaField
                  label="Full Description"
                  name="description"
                  rows={8}
                />
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<MapPin size={22} />}
                title="Location"
                description="Address, city, state, ZIP and market information."
              />

              <div className="mt-6 grid gap-5">
                <InputField
                  label="Address Line 1 *"
                  name="address_line_1"
                  required
                />

                <InputField label="Address Line 2" name="address_line_2" />

                <div className="grid gap-5 md:grid-cols-4">
                  <InputField
                    label="City *"
                    name="city"
                    required
                    wrapperClassName="md:col-span-2"
                  />

                  <InputField label="State *" name="state" required />

                  <InputField label="ZIP Code" name="zip_code" />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <InputField label="Country" name="country" defaultValue="USA" />

                  <InputField label="Neighborhood" name="neighborhood" />

                  <InputField label="County" name="county" />
                </div>

                <InputField label="MLS Number" name="mls_number" />
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<BadgeDollarSign size={22} />}
                title="Financial Data"
                description="Price, purchase, rehab, ARV, rent and ROI."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <InputField label="Listed Price" name="price" type="number" />

                <InputField
                  label="Purchase Price"
                  name="purchase_price"
                  type="number"
                />

                <InputField
                  label="Rehab Estimate"
                  name="rehab_estimate"
                  type="number"
                />

                <InputField
                  label="Projected ARV"
                  name="projected_arv"
                  type="number"
                />

                <InputField
                  label="Projected Rent"
                  name="projected_rent"
                  type="number"
                />

                <InputField
                  label="Projected ROI %"
                  name="projected_roi"
                  type="number"
                  step="0.01"
                />
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<Settings2 size={22} />}
                title="Property Details"
                description="Bedrooms, bathrooms, square footage, lot and year built."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-4">
                <InputField
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  step="0.5"
                />

                <InputField
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  step="0.5"
                />

                <InputField label="Sqft" name="sqft" type="number" />

                <InputField
                  label="Lot Sqft"
                  name="lot_size_sqft"
                  type="number"
                />

                <InputField
                  label="Year Built"
                  name="year_built"
                  type="number"
                />

                <InputField
                  label="Garage Spaces"
                  name="garage_spaces"
                  type="number"
                  step="0.5"
                />

                <InputField
                  label="Parking Spaces"
                  name="parking_spaces"
                  type="number"
                  step="0.5"
                />

                <InputField
                  label="Stories"
                  name="stories"
                  type="number"
                  step="0.5"
                />
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<Image size={22} />}
                title="Main Media"
                description="Cover image, main video URL and virtual tour."
              />

              <div className="mt-6 grid gap-5">
                <InputField label="Cover Image URL" name="cover_image_url" />

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField label="Video URL" name="video_url" />

                  <InputField
                    label="Virtual Tour URL"
                    name="virtual_tour_url"
                  />
                </div>
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<LinkIcon size={22} />}
                title="Contact Card"
                description="Text and phone used in the property contact box."
              />

              <div className="mt-6 grid gap-5">
                <InputField label="CTA Title" name="contact_cta_title" />

                <TextareaField
                  label="CTA Description"
                  name="contact_cta_description"
                  rows={3}
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <InputField
                    label="Button Label"
                    name="contact_button_label"
                  />

                  <InputField label="Contact Phone" name="contact_phone" />

                  <InputField label="Contact Email" name="contact_email" />
                </div>
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<FileText size={22} />}
                title="SEO"
                description="Metadata used for search engines and previews."
              />

              <div className="mt-6 grid gap-5">
                <InputField label="Meta Title" name="meta_title" />

                <TextareaField
                  label="Meta Description"
                  name="meta_description"
                  rows={3}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="admin-card sticky top-24 p-6">
              <h3 className="text-xl font-bold text-[#0c2933]">
                Publishing Options
              </h3>

              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                  <input
                    name="is_featured"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#53bc76]"
                  />

                  <span>
                    <span className="block text-sm font-bold text-[#0c2933]">
                      Featured Property
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#64748b]">
                      Show this property first in public listings.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                  <input
                    name="publish_now"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#53bc76]"
                  />

                  <span>
                    <span className="block text-sm font-bold text-[#0c2933]">
                      Published
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#64748b]">
                      Set published_at now.
                    </span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="admin-primary-button mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-4 text-sm transition hover:brightness-105"
              >
                <Save size={18} />
                Create Property
              </button>

              <Link
                href="/admin/properties"
                className="admin-secondary-button mt-3 inline-flex w-full items-center justify-center px-5 py-3 text-sm transition hover:bg-[#f8fafc]"
              >
                Cancel
              </Link>
            </section>
          </aside>
        </div>
      </form>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="admin-icon-box flex h-11 w-11 items-center justify-center rounded-2xl">
        {icon}
      </span>

      <div>
        <h3 className="text-xl font-bold text-[#0c2933]">{title}</h3>
        <p className="text-sm text-[#64748b]">{description}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  defaultValue = "",
  placeholder,
  required = false,
  step,
  wrapperClassName = "",
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  step?: string;
  wrapperClassName?: string;
}) {
  return (
    <label className={`block ${wrapperClassName}`}>
      <span className="text-sm font-bold text-[#0c2933]">{label}</span>

      <input
        name={name}
        type={type}
        required={required}
        step={step}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="admin-input mt-2 w-full px-4 py-3 text-sm"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  defaultValue = "",
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0c2933]">{label}</span>

      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="admin-input mt-2 w-full resize-none px-4 py-3 text-sm"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0c2933]">{label}</span>

      <select
        name={name}
        defaultValue={defaultValue}
        className="admin-input mt-2 w-full px-4 py-3 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
