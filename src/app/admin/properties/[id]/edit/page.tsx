import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeDollarSign,
  Bath,
  BedDouble,
  Building2,
  Camera,
  Eye,
  FileText,
  Image,
  LinkIcon,
  MapPin,
  Pencil,
  Play,
  Plus,
  Ruler,
  Save,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { getAdminPropertyById } from "@/lib/properties";
import {
  addPropertyDocumentAction,
  addPropertyFeatureAction,
  addPropertyImageAction,
  addPropertyVideoAction,
  deletePropertyDocumentAction,
  deletePropertyFeatureAction,
  deletePropertyImageAction,
  deletePropertyVideoAction,
  updatePropertyAction,
} from "@/app/admin/properties/actions";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";
import { requireAdminPermission } from "@/lib/admin-permissions";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  await requireAdminPermission("properties.update");

  const { id } = await params;
  const property = await getAdminPropertyById(id);

  if (!property) {
    notFound();
  }

  const images = (property.property_images || []).sort(
    (a, b) => a.position - b.position,
  );

  const videos = (property.property_videos || []).sort(
    (a, b) => a.position - b.position,
  );

  const documents = (property.property_documents || []).sort(
    (a, b) => a.position - b.position,
  );

  const features = (property.property_features || []).sort(
    (a, b) => a.position - b.position,
  );

  const isPublicVisible =
    property.visibility === "public" &&
    property.status !== "draft" &&
    property.status !== "archived";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#587469] transition hover:text-[#0e3541]"
        >
          <ArrowLeft size={18} />
          Back to properties
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row">
          {isPublicVisible ? (
            <Link
              href={`/properties/${property.slug}`}
              className="admin-secondary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:bg-[#f8fafc]"
            >
              <Eye size={18} />
              View Public Page
            </Link>
          ) : null}

          <Link
            href="/admin/properties/new"
            className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
          >
            <Plus size={18} />
            New Property
          </Link>
        </div>
      </div>

      <div className="admin-dark-panel rounded-[2rem] p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8df0a9]">
              Edit Property
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              {property.title}
            </h2>

            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/72">
              <MapPin size={17} />
              {property.address_line_1}, {property.city}, {property.state}
              {property.zip_code ? ` ${property.zip_code}` : ""}
            </p>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-3 lg:text-right">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-white/72">Status</p>
              <p className="mt-1 font-bold">
                {getPropertyStatusLabel(property.status)}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-white/72">Type</p>
              <p className="mt-1 font-bold">
                {getPropertyTypeLabel(property.property_type)}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-white/72">Price</p>
              <p className="mt-1 font-bold">
                {formatCurrency(property.price)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form action={updatePropertyAction} className="mt-6">
        <input type="hidden" name="property_id" value={property.id} />
        <input
          type="hidden"
          name="current_published_at"
          value={property.published_at || ""}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="admin-section p-6">
              <SectionHeader
                icon={<Building2 size={22} />}
                title="Basic Information"
                description="Main title, slug, status, type and descriptions."
              />

              <div className="mt-6 grid gap-5">
                <InputField
                  label="Property Title *"
                  name="title"
                  defaultValue={property.title}
                  required
                />

                <InputField
                  label="Slug *"
                  name="slug"
                  defaultValue={property.slug}
                  required
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <SelectField
                    label="Property Type"
                    name="property_type"
                    defaultValue={property.property_type}
                    options={propertyTypes}
                  />

                  <SelectField
                    label="Status"
                    name="status"
                    defaultValue={property.status}
                    options={propertyStatuses}
                  />

                  <SelectField
                    label="Visibility"
                    name="visibility"
                    defaultValue={property.visibility}
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
                  defaultValue={property.short_description || ""}
                  rows={3}
                />

                <TextareaField
                  label="Full Description"
                  name="description"
                  defaultValue={property.description || ""}
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
                  defaultValue={property.address_line_1}
                  required
                />

                <InputField
                  label="Address Line 2"
                  name="address_line_2"
                  defaultValue={property.address_line_2 || ""}
                />

                <div className="grid gap-5 md:grid-cols-4">
                  <InputField
                    label="City *"
                    name="city"
                    defaultValue={property.city}
                    required
                    wrapperClassName="md:col-span-2"
                  />

                  <InputField
                    label="State *"
                    name="state"
                    defaultValue={property.state}
                    required
                  />

                  <InputField
                    label="ZIP Code"
                    name="zip_code"
                    defaultValue={property.zip_code || ""}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <InputField
                    label="Country"
                    name="country"
                    defaultValue={property.country}
                  />

                  <InputField
                    label="Neighborhood"
                    name="neighborhood"
                    defaultValue={property.neighborhood || ""}
                  />

                  <InputField
                    label="County"
                    name="county"
                    defaultValue={property.county || ""}
                  />
                </div>

                <InputField
                  label="MLS Number"
                  name="mls_number"
                  defaultValue={property.mls_number || ""}
                />
              </div>
            </section>

            <section className="admin-section p-6">
              <SectionHeader
                icon={<BadgeDollarSign size={22} />}
                title="Financial Data"
                description="Price, purchase, rehab, ARV, rent and ROI."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <InputField
                  label="Listed Price"
                  name="price"
                  type="number"
                  defaultValue={property.price || ""}
                />

                <InputField
                  label="Purchase Price"
                  name="purchase_price"
                  type="number"
                  defaultValue={property.purchase_price || ""}
                />

                <InputField
                  label="Rehab Estimate"
                  name="rehab_estimate"
                  type="number"
                  defaultValue={property.rehab_estimate || ""}
                />

                <InputField
                  label="Projected ARV"
                  name="projected_arv"
                  type="number"
                  defaultValue={property.projected_arv || ""}
                />

                <InputField
                  label="Projected Rent"
                  name="projected_rent"
                  type="number"
                  defaultValue={property.projected_rent || ""}
                />

                <InputField
                  label="Projected ROI %"
                  name="projected_roi"
                  type="number"
                  step="0.01"
                  defaultValue={property.projected_roi || ""}
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
                  defaultValue={property.bedrooms || ""}
                />

                <InputField
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  step="0.5"
                  defaultValue={property.bathrooms || ""}
                />

                <InputField
                  label="Sqft"
                  name="sqft"
                  type="number"
                  defaultValue={property.sqft || ""}
                />

                <InputField
                  label="Lot Sqft"
                  name="lot_size_sqft"
                  type="number"
                  defaultValue={property.lot_size_sqft || ""}
                />

                <InputField
                  label="Year Built"
                  name="year_built"
                  type="number"
                  defaultValue={property.year_built || ""}
                />

                <InputField
                  label="Garage Spaces"
                  name="garage_spaces"
                  type="number"
                  step="0.5"
                  defaultValue={property.garage_spaces || ""}
                />

                <InputField
                  label="Parking Spaces"
                  name="parking_spaces"
                  type="number"
                  step="0.5"
                  defaultValue={property.parking_spaces || ""}
                />

                <InputField
                  label="Stories"
                  name="stories"
                  type="number"
                  step="0.5"
                  defaultValue={property.stories || ""}
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
                <InputField
                  label="Cover Image URL"
                  name="cover_image_url"
                  defaultValue={property.cover_image_url || ""}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Video URL"
                    name="video_url"
                    defaultValue={property.video_url || ""}
                  />

                  <InputField
                    label="Virtual Tour URL"
                    name="virtual_tour_url"
                    defaultValue={property.virtual_tour_url || ""}
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
                <InputField
                  label="CTA Title"
                  name="contact_cta_title"
                  defaultValue={property.contact_cta_title || ""}
                />

                <TextareaField
                  label="CTA Description"
                  name="contact_cta_description"
                  defaultValue={property.contact_cta_description || ""}
                  rows={3}
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <InputField
                    label="Button Label"
                    name="contact_button_label"
                    defaultValue={property.contact_button_label || ""}
                  />

                  <InputField
                    label="Contact Phone"
                    name="contact_phone"
                    defaultValue={property.contact_phone || ""}
                  />

                  <InputField
                    label="Contact Email"
                    name="contact_email"
                    defaultValue={property.contact_email || ""}
                  />
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
                <InputField
                  label="Meta Title"
                  name="meta_title"
                  defaultValue={property.meta_title || ""}
                />

                <TextareaField
                  label="Meta Description"
                  name="meta_description"
                  defaultValue={property.meta_description || ""}
                  rows={3}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="admin-card sticky top-24 p-6">
              <h3 className="text-xl font-bold text-[#0e3541]">
                Publishing Options
              </h3>

              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                  <input
                    name="is_featured"
                    type="checkbox"
                    defaultChecked={property.is_featured}
                    className="mt-1 h-4 w-4 accent-[#53bc76]"
                  />

                  <span>
                    <span className="block text-sm font-bold text-[#0e3541]">
                      Featured Property
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#587469]">
                      Show this property first in public listings.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                  <input
                    name="publish_now"
                    type="checkbox"
                    defaultChecked={Boolean(property.published_at)}
                    className="mt-1 h-4 w-4 accent-[#53bc76]"
                  />

                  <span>
                    <span className="block text-sm font-bold text-[#0e3541]">
                      Published
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#587469]">
                      Keep this checked to set the property as published.
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl bg-[#f8fafc] p-4 text-sm text-[#0e3541]">
                <div className="flex items-center gap-2">
                  <BedDouble size={16} />
                  {formatNumber(property.bedrooms)} beds
                </div>

                <div className="flex items-center gap-2">
                  <Bath size={16} />
                  {formatNumber(property.bathrooms)} baths
                </div>

                <div className="flex items-center gap-2">
                  <Ruler size={16} />
                  {formatNumber(property.sqft)} sqft
                </div>

                <div className="font-bold">
                  {formatCurrency(property.price)}
                </div>
              </div>

              <button
                type="submit"
                className="admin-primary-button mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-4 text-sm transition hover:brightness-105"
              >
                <Save size={18} />
                Save Changes
              </button>
            </section>
          </aside>
        </div>
      </form>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <MediaSection
          title="Property Images"
          description="Gallery images displayed on the individual property page."
          icon={<Camera size={22} />}
        >
          <form action={addPropertyImageAction} className="grid gap-4">
            <HiddenPropertyFields propertyId={property.id} slug={property.slug} />

            <InputField label="Image URL *" name="image_url" required />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Title" name="title" />
              <InputField label="Alt Text" name="alt_text" />
            </div>

            <InputField label="Caption" name="caption" />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Position"
                name="position"
                type="number"
                defaultValue={images.length}
              />

              <InputField
                label="Media Group"
                name="media_group"
                defaultValue="gallery"
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4">
              <input
                name="is_cover"
                type="checkbox"
                className="h-4 w-4 accent-[#53bc76]"
              />
              <span className="text-sm font-bold text-[#0e3541]">
                Set as cover image
              </span>
            </label>

            <SubmitButton label="Add Image" />
          </form>

          <div className="mt-6 grid gap-4">
            {images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="grid gap-4 rounded-2xl border border-[rgba(14,53,65,0.1)] bg-white p-3 shadow-sm md:grid-cols-[120px_1fr_auto]"
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || property.title}
                    className="h-24 w-full rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-bold text-[#0e3541]">
                      {image.title || image.alt_text || "Property Image"}
                    </p>

                    <p className="mt-1 break-all text-xs text-[#587469]">
                      {image.image_url}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                      Position {image.position}{" "}
                      {image.is_cover ? "• Cover image" : ""}
                    </p>
                  </div>

                  <form action={deletePropertyImageAction}>
                    <HiddenPropertyFields
                      propertyId={property.id}
                      slug={property.slug}
                    />
                    <input type="hidden" name="image_id" value={image.id} />

                    <DeleteButton />
                  </form>
                </div>
              ))
            ) : (
              <EmptyMediaState label="No gallery images registered yet." />
            )}
          </div>
        </MediaSection>

        <MediaSection
          title="Property Videos"
          description="Videos displayed in the video section of the property page."
          icon={<Play size={22} />}
        >
          <form action={addPropertyVideoAction} className="grid gap-4">
            <HiddenPropertyFields propertyId={property.id} slug={property.slug} />

            <InputField label="Video URL *" name="video_url" required />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Title" name="title" />
              <InputField label="Provider" name="provider" />
            </div>

            <TextareaField label="Description" name="description" rows={3} />

            <InputField label="Thumbnail URL" name="thumbnail_url" />

            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                label="Duration Seconds"
                name="duration_seconds"
                type="number"
              />

              <InputField
                label="Video Type"
                name="video_type"
                defaultValue="property_video"
              />

              <InputField
                label="Position"
                name="position"
                type="number"
                defaultValue={videos.length}
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4">
              <input
                name="is_featured"
                type="checkbox"
                className="h-4 w-4 accent-[#53bc76]"
              />
              <span className="text-sm font-bold text-[#0e3541]">
                Featured video
              </span>
            </label>

            <SubmitButton label="Add Video" />
          </form>

          <div className="mt-6 grid gap-4">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-2xl border border-[rgba(14,53,65,0.1)] bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold text-[#0e3541]">
                        {video.title || "Property Video"}
                      </p>

                      <p className="mt-1 break-all text-xs text-[#587469]">
                        {video.video_url}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                        Position {video.position}{" "}
                        {video.is_featured ? "• Featured" : ""}
                      </p>
                    </div>

                    <form action={deletePropertyVideoAction}>
                      <HiddenPropertyFields
                        propertyId={property.id}
                        slug={property.slug}
                      />
                      <input type="hidden" name="video_id" value={video.id} />

                      <DeleteButton />
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <EmptyMediaState label="No property videos registered yet." />
            )}
          </div>
        </MediaSection>

        <MediaSection
          title="Plans and PDFs"
          description="Floor plans, architectural documents and PDFs."
          icon={<FileText size={22} />}
        >
          <form action={addPropertyDocumentAction} className="grid gap-4">
            <HiddenPropertyFields propertyId={property.id} slug={property.slug} />

            <InputField label="Document Title *" name="title" required />
            <InputField label="File URL *" name="file_url" required />

            <TextareaField label="Description" name="description" rows={3} />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="File Type" name="file_type" defaultValue="pdf" />
              <InputField
                label="Document Type"
                name="document_type"
                defaultValue="floor_plan"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Button Label"
                name="button_label"
                defaultValue="View PDF"
              />

              <InputField
                label="Position"
                name="position"
                type="number"
                defaultValue={documents.length}
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4">
              <input
                name="is_public"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#53bc76]"
              />

              <span className="text-sm font-bold text-[#0e3541]">
                Public document
              </span>
            </label>

            <SubmitButton label="Add Document" />
          </form>

          <div className="mt-6 grid gap-4">
            {documents.length > 0 ? (
              documents.map((document) => (
                <div
                  key={document.id}
                  className="rounded-2xl border border-[rgba(14,53,65,0.1)] bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold text-[#0e3541]">
                        {document.title}
                      </p>

                      <p className="mt-1 break-all text-xs text-[#64748b]">
                        {document.file_url}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                        Position {document.position}{" "}
                        {document.is_public ? "• Public" : "• Private"}
                      </p>
                    </div>

                    <form action={deletePropertyDocumentAction}>
                      <HiddenPropertyFields
                        propertyId={property.id}
                        slug={property.slug}
                      />
                      <input
                        type="hidden"
                        name="document_id"
                        value={document.id}
                      />

                      <DeleteButton />
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <EmptyMediaState label="No PDFs or floor plans registered yet." />
            )}
          </div>
        </MediaSection>

        <MediaSection
          title="Highlights and Features"
          description="Extra details displayed below the property description."
          icon={<Sparkles size={22} />}
        >
          <form action={addPropertyFeatureAction} className="grid gap-4">
            <HiddenPropertyFields propertyId={property.id} slug={property.slug} />

            <InputField label="Feature Label *" name="label" required />
            <InputField label="Feature Value" name="value" />

            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Icon Name" name="icon" />

              <InputField
                label="Position"
                name="position"
                type="number"
                defaultValue={features.length}
              />
            </div>

            <label className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4">
              <input
                name="is_highlight"
                type="checkbox"
                className="h-4 w-4 accent-[#53bc76]"
              />

              <span className="text-sm font-bold text-[#0e3541]">
                Highlight item
              </span>
            </label>

            <SubmitButton label="Add Feature" />
          </form>

          <div className="mt-6 grid gap-4">
            {features.length > 0 ? (
              features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-2xl border border-[rgba(14,53,65,0.1)] bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-bold text-[#0e3541]">
                        {feature.label}
                      </p>

                      {feature.value ? (
                        <p className="mt-1 text-sm text-[#587469]">
                          {feature.value}
                        </p>
                      ) : null}

                      <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                        Position {feature.position}{" "}
                        {feature.is_highlight ? "• Highlight" : ""}
                      </p>
                    </div>

                    <form action={deletePropertyFeatureAction}>
                      <HiddenPropertyFields
                        propertyId={property.id}
                        slug={property.slug}
                      />
                      <input
                        type="hidden"
                        name="feature_id"
                        value={feature.id}
                      />

                      <DeleteButton />
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <EmptyMediaState label="No highlights registered yet." />
            )}
          </div>
        </MediaSection>
      </div>
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
        <h3 className="text-xl font-bold text-[#0e3541]">{title}</h3>
        <p className="text-sm text-[#587469]">{description}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  defaultValue = "",
  required = false,
  step,
  wrapperClassName = "",
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  step?: string;
  wrapperClassName?: string;
}) {
  return (
    <label className={`block ${wrapperClassName}`}>
      <span className="text-sm font-bold text-[#0e3541]">{label}</span>

      <input
        name={name}
        type={type}
        required={required}
        step={step}
        defaultValue={defaultValue}
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
      <span className="text-sm font-bold text-[#0e3541]">{label}</span>

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
      <span className="text-sm font-bold text-[#0e3541]">{label}</span>

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

function MediaSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-section p-6">
      <SectionHeader icon={icon} title={title} description={description} />

      <div className="mt-6">{children}</div>
    </section>
  );
}

function HiddenPropertyFields({
  propertyId,
  slug,
}: {
  propertyId: string;
  slug: string;
}) {
  return (
    <>
      <input type="hidden" name="property_id" value={propertyId} />
      <input type="hidden" name="property_slug" value={slug} />
    </>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="admin-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition hover:brightness-105"
    >
      <Plus size={17} />
      {label}
    </button>
  );
}

function DeleteButton() {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
    >
      <Trash2 size={16} />
      Delete
    </button>
  );
}

function EmptyMediaState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[rgba(14,53,65,0.12)] bg-[#f8fafc] p-6 text-center">
      <Pencil className="mx-auto text-[#53bc76]" size={28} />
      <p className="mt-3 text-sm font-bold text-[#64748b]">{label}</p>
    </div>
  );
}
