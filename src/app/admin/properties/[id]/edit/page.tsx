import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeDollarSign,
  Bath,
  BedDouble,
  Building2,
  Camera,
  ChevronDown,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
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
  Upload,
} from "lucide-react";
import { AdminRichTextEditor } from "@/components/admin/admin-rich-text-editor";
import { PropertyImageSortableGallery } from "@/components/admin/property-image-sortable-gallery";
import { getAdminPropertyById } from "@/lib/properties";
import {
  addPropertyDocumentAction,
  addPropertyFeatureAction,
  addPropertyImageAction,
  addPropertyVideoAction,
  deletePropertyDocumentAction,
  deletePropertyFeatureAction,
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

type PropertyImageWithMediaGroup = {
  id: string;
  image_url: string;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  position: number;
  is_cover: boolean;
  media_group?: string | null;
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
  { value: "rented", label: "Rented" },
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

  const allImages = [...(property.property_images || [])]
    .sort((a, b) => a.position - b.position)
    .map((image) => image as PropertyImageWithMediaGroup);

  const images = allImages.filter(
    (image) => image.media_group !== "appliances",
  );

  const appliances = allImages.filter(
    (image) => image.media_group === "appliances",
  );

  const videos = [...(property.property_videos || [])].sort(
    (a, b) => a.position - b.position,
  );

  const documents = [...(property.property_documents || [])].sort(
    (a, b) => a.position - b.position,
  );

  const features = [...(property.property_features || [])].sort(
    (a, b) => a.position - b.position,
  );

  const isPublicVisible =
    property.visibility === "public" &&
    property.status !== "draft" &&
    property.status !== "archived";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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

      <section className="overflow-hidden rounded-[2rem] border border-[#0e3541]/10 bg-white shadow-[0_24px_80px_rgba(14,53,65,0.08)]">
        <div className="bg-[linear-gradient(135deg,#071f28_0%,#0e3541_100%)] p-6 text-white md:p-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#8df0a9]">
                Edit Property
              </p>

              <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.06em] md:text-5xl">
                {property.title}
              </h1>

              <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/72">
                <MapPin size={17} />
                {property.address_line_1}, {property.city}, {property.state}
                {property.zip_code ? ` ${property.zip_code}` : ""}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[440px]">
              <SummaryPill
                label="Status"
                value={getPropertyStatusLabel(property.status)}
              />

              <SummaryPill
                label="Type"
                value={getPropertyTypeLabel(property.property_type)}
              />

              <SummaryPill
                label="Price"
                value={formatCurrency(property.price)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 bg-[#f8fafc] p-4 md:grid-cols-4 md:p-5">
          <MiniStat
            icon={<BedDouble size={17} />}
            label="Beds"
            value={formatNumber(property.bedrooms)}
          />

          <MiniStat
            icon={<Bath size={17} />}
            label="Baths"
            value={formatNumber(property.bathrooms)}
          />

          <MiniStat
            icon={<Ruler size={17} />}
            label="Sqft"
            value={formatNumber(property.sqft)}
          />

          <MiniStat
            icon={<BadgeDollarSign size={17} />}
            label="ARV"
            value={formatCurrency(property.projected_arv)}
          />
        </div>
      </section>

      <form action={updatePropertyAction}>
        <input type="hidden" name="property_id" value={property.id} />

        <input
          type="hidden"
          name="current_published_at"
          value={property.published_at || ""}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <AccordionSection
              defaultOpen
              icon={<FileText size={21} />}
              title="Public Page Content"
              description="Edit the public title and rich description displayed on the property page."
            >
              <div className="grid gap-5">
                <InputField
                  label="Public Property Title *"
                  name="title"
                  defaultValue={property.title}
                  required
                  helpText="This title appears on the public property page and in SEO metadata."
                />

                <AdminRichTextEditor
                  label="Public Description"
                  name="description"
                  defaultValue={property.description || ""}
                  helpText="Use the toolbar to add bold text, italic text, lists and links."
                />
              </div>
            </AccordionSection>

            <AccordionSection
              icon={<Building2 size={21} />}
              title="Basic Information"
              description="Slug, status, type, visibility and short description."
            >
              <div className="grid gap-5">
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
              </div>
            </AccordionSection>

            <AccordionSection
              icon={<MapPin size={21} />}
              title="Location"
              description="Address, city, state, ZIP and market information."
            >
              <div className="grid gap-5">
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
            </AccordionSection>

            <AccordionSection
              icon={<BadgeDollarSign size={21} />}
              title="Financial Data"
              description="Price, purchase, rehab, ARV, rent and ROI."
            >
              <div className="grid gap-5 md:grid-cols-3">
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
            </AccordionSection>

            <AccordionSection
              icon={<Settings2 size={21} />}
              title="Property Details"
              description="Bedrooms, bathrooms, square footage, lot and year built."
            >
              <div className="grid gap-5 md:grid-cols-4">
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
            </AccordionSection>

            <AccordionSection
              icon={<ImageIcon size={21} />}
              title="Main Media"
              description="Cover image, main video URL and virtual tour."
            >
              <div className="grid gap-5">
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
            </AccordionSection>

            <AccordionSection
              icon={<LinkIcon size={21} />}
              title="Contact Card"
              description="Text and phone used in the property contact box."
            >
              <div className="grid gap-5">
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
            </AccordionSection>

            <AccordionSection
              icon={<FileText size={21} />}
              title="SEO"
              description="Metadata used for search engines and previews."
            >
              <div className="grid gap-5">
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
            </AccordionSection>
          </div>

          <aside className="space-y-5">
            <section className="admin-card sticky top-24 p-6">
              <h3 className="text-xl font-black tracking-[-0.04em] text-[#0e3541]">
                Publish & Save
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#587469]">
                Manage publish state and save all property information.
              </p>

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
                <SidebarRow
                  label="Status"
                  value={getPropertyStatusLabel(property.status)}
                />

                <SidebarRow label="Visibility" value={property.visibility} />
                <SidebarRow label="Images" value={String(images.length)} />
                <SidebarRow
                  label="Appliances"
                  value={String(appliances.length)}
                />
                <SidebarRow label="Videos" value={String(videos.length)} />
                <SidebarRow label="PDFs" value={String(documents.length)} />
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

      <section className="space-y-6">
        <div className="rounded-[2rem] border border-[#0e3541]/10 bg-white p-6 shadow-[0_18px_50px_rgba(14,53,65,0.06)] md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#53bc76]">
                Media Library
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#0e3541]">
                Images, appliances, videos and PDFs
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#587469]">
                Upload, organize and manage all media used on the public
                property page.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-[#0e3541]">
              <MediaCounter label="Images" value={images.length} />
              <MediaCounter label="Appliances" value={appliances.length} />
              <MediaCounter label="Videos" value={videos.length} />
              <MediaCounter label="PDFs" value={documents.length} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.25fr]">
          <MediaSection
            title="Upload Image"
            description="Add a new gallery image."
            icon={<Upload size={22} />}
          >
            <form action={addPropertyImageAction} className="grid gap-4">
              <HiddenPropertyFields
                propertyId={property.id}
                slug={property.slug}
              />

              <FileField
                label="Upload Image"
                name="image_file"
                accept="image/*"
                helpText="Upload an image file. The system will save it and generate the URL automatically."
              />

              <InputField
                label="Image URL"
                name="image_url"
                helpText="Optional fallback for an existing hosted image URL."
              />

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
                  defaultValue={images.length + 1}
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
          </MediaSection>

          <MediaSection
            title="Current Images"
            description="Drag and drop gallery images to control the public display order."
            icon={<Camera size={22} />}
          >
            <PropertyImageSortableGallery
              propertyId={property.id}
              propertySlug={property.slug}
              propertyTitle={property.title}
              images={images.map((image) => ({
                id: image.id,
                image_url: image.image_url,
                title: image.title,
                alt_text: image.alt_text,
                caption: image.caption,
                position: image.position,
                is_cover: image.is_cover,
              }))}
            />
          </MediaSection>
        </div>

        <MediaSection
          title="Complementos"
          description="Appliances and custom add-on blocks are now managed in one dedicated page."
          icon={<Sparkles size={22} />}
        >
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#53bc76]/20 bg-[#f8fffb] p-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black text-[#0e3541]">
                {appliances.length} appliance item
                {appliances.length === 1 ? "" : "s"} currently registered.
              </p>
              <p className="mt-1 text-xs leading-5 text-[#64748b]">
                Use Complementos to choose which property pages show appliances
                and to create new reusable blocks.
              </p>
            </div>

            <Link
              href="/admin/complementos"
              className="admin-primary-button min-h-[44px] gap-2 px-5 text-sm no-underline"
            >
              Open Complementos
            </Link>
          </div>
        </MediaSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <MediaSection
            title="Videos"
            description="Upload or register videos for this property."
            icon={<Play size={22} />}
          >
            <form action={addPropertyVideoAction} className="grid gap-4">
              <HiddenPropertyFields
                propertyId={property.id}
                slug={property.slug}
              />

              <FileField
                label="Upload Video"
                name="video_file"
                accept="video/*"
                helpText="Upload a video file. The system will save it and generate the URL automatically."
              />

              <InputField
                label="Video URL"
                name="video_url"
                helpText="Optional fallback for YouTube, Vimeo, or an existing hosted video URL."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <InputField label="Title" name="title" />
                <InputField label="Provider" name="provider" />
              </div>

              <TextareaField label="Description" name="description" rows={3} />

              <InputField
                label="Thumbnail URL"
                name="thumbnail_url"
                helpText="Optional thumbnail URL for externally hosted videos."
              />

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
                  defaultValue={videos.length + 1}
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
                  <CompactMediaItem
                    key={video.id}
                    title={video.title || "Property Video"}
                    subtitle={`Position ${video.position}${
                      video.is_featured ? " · Featured" : ""
                    }`}
                    url={video.video_url}
                    openLabel="Open video"
                    deleteForm={
                      <form action={deletePropertyVideoAction}>
                        <HiddenPropertyFields
                          propertyId={property.id}
                          slug={property.slug}
                        />

                        <input type="hidden" name="video_id" value={video.id} />

                        <DeleteIconButton label="Delete video" />
                      </form>
                    }
                  />
                ))
              ) : (
                <EmptyMediaState label="No property videos registered yet." />
              )}
            </div>
          </MediaSection>

          <MediaSection
            title="PDFs and Floor Plans"
            description="Upload floor plans and architectural PDFs."
            icon={<FileText size={22} />}
          >
            <form action={addPropertyDocumentAction} className="grid gap-4">
              <HiddenPropertyFields
                propertyId={property.id}
                slug={property.slug}
              />

              <InputField label="Document Title *" name="title" required />

              <FileField
                label="Upload PDF"
                name="document_file"
                accept="application/pdf,.pdf"
                helpText="Upload a PDF file. The system will save it and generate the URL automatically."
              />

              <InputField
                label="File URL"
                name="file_url"
                helpText="Optional fallback for an existing hosted PDF URL."
              />

              <TextareaField label="Description" name="description" rows={3} />

              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="File Type"
                  name="file_type"
                  defaultValue="pdf"
                />

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
                  defaultValue={documents.length + 1}
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
                  <CompactMediaItem
                    key={document.id}
                    title={document.title}
                    subtitle={`Position ${document.position} · ${
                      document.is_public ? "Public" : "Private"
                    }`}
                    url={document.file_url}
                    openLabel="Open PDF"
                    deleteForm={
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

                        <DeleteIconButton label="Delete document" />
                      </form>
                    }
                  />
                ))
              ) : (
                <EmptyMediaState label="No PDFs or floor plans registered yet." />
              )}
            </div>
          </MediaSection>
        </div>

        <MediaSection
          title="Highlights and Features"
          description="Extra details displayed below the property description."
          icon={<Sparkles size={22} />}
        >
          <form
            action={addPropertyFeatureAction}
            className="grid gap-4 md:grid-cols-2"
          >
            <HiddenPropertyFields propertyId={property.id} slug={property.slug} />

            <InputField label="Feature Label *" name="label" required />
            <InputField label="Feature Value" name="value" />
            <InputField label="Icon Name" name="icon" />

            <InputField
              label="Position"
              name="position"
              type="number"
              defaultValue={features.length + 1}
            />

            <label className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4 md:col-span-2">
              <input
                name="is_highlight"
                type="checkbox"
                className="h-4 w-4 accent-[#53bc76]"
              />

              <span className="text-sm font-bold text-[#0e3541]">
                Highlight item
              </span>
            </label>

            <div className="md:col-span-2">
              <SubmitButton label="Add Feature" />
            </div>
          </form>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.length > 0 ? (
              features.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-[1.4rem] border border-[#0e3541]/10 bg-white p-5 shadow-sm"
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
                        Position {feature.position}
                        {feature.is_highlight ? " · Highlight" : ""}
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

                      <DeleteIconButton label="Delete feature" />
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <EmptyMediaState label="No highlights registered yet." />
            )}
          </div>
        </MediaSection>
      </section>
    </div>
  );
}

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#53bc76]/10 text-[#0e3541]">
        {icon}
      </span>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
          {label}
        </p>

        <p className="text-sm font-black text-[#0e3541]">{value}</p>
      </div>
    </div>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#64748b]">
        {label}
      </span>

      <strong className="text-right text-sm text-[#0e3541]">{value}</strong>
    </div>
  );
}

function MediaCounter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#0e3541]/10 bg-[#f8fafc] px-4 py-3">
      <p className="text-lg font-black leading-none text-[#0e3541]">{value}</p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#64748b]">
        {label}
      </p>
    </div>
  );
}

function AccordionSection({
  icon,
  title,
  description,
  children,
  defaultOpen = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[1.8rem] border border-[#0e3541]/10 bg-white shadow-[0_16px_44px_rgba(14,53,65,0.05)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <span className="admin-icon-box flex h-11 w-11 items-center justify-center rounded-2xl">
            {icon}
          </span>

          <div>
            <h3 className="text-xl font-black tracking-[-0.04em] text-[#0e3541]">
              {title}
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#587469]">
              {description}
            </p>
          </div>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8fafc] text-[#0e3541] transition group-open:rotate-180">
          <ChevronDown size={18} />
        </span>
      </summary>

      <div className="border-t border-[#0e3541]/10 p-5 md:p-6">{children}</div>
    </details>
  );
}

function CompactMediaItem({
  title,
  subtitle,
  url,
  openLabel,
  deleteForm,
}: {
  title: string;
  subtitle: string;
  url: string;
  openLabel: string;
  deleteForm: ReactNode;
}) {
  return (
    <div className="rounded-[1.4rem] border border-[#0e3541]/10 bg-white p-5 shadow-sm">
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <p className="font-bold text-[#0e3541]">{title}</p>

          <p className="mt-1 text-xs font-semibold text-[#94a3b8]">
            {subtitle}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={url}
              target="_blank"
              className="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-full border border-[#0e3541]/10 bg-[#f8fbfc] px-3 text-xs font-bold text-[#0e3541] no-underline transition hover:bg-white"
            >
              <ExternalLink size={13} />
              {openLabel}
            </Link>

            <details>
              <summary className="inline-flex min-h-[36px] cursor-pointer list-none items-center justify-center rounded-full border border-[#0e3541]/10 bg-[#f8fbfc] px-3 text-xs font-bold text-[#0e3541] transition hover:bg-white">
                URL
              </summary>

              <div className="mt-3 rounded-2xl border border-[#0e3541]/10 bg-[#f8fbfc] p-3">
                <p className="break-all text-xs leading-5 text-[#587469]">
                  {url}
                </p>
              </div>
            </details>
          </div>
        </div>

        {deleteForm}
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="admin-icon-box flex h-11 w-11 items-center justify-center rounded-2xl">
        {icon}
      </span>

      <div>
        <h3 className="text-xl font-black tracking-[-0.04em] text-[#0e3541]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[#587469]">{description}</p>
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
  helpText,
  wrapperClassName = "",
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  step?: string;
  helpText?: string;
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

      {helpText ? (
        <span className="mt-2 block text-xs leading-5 text-[#64748b]">
          {helpText}
        </span>
      ) : null}
    </label>
  );
}

function FileField({
  label,
  name,
  accept,
  helpText,
}: {
  label: string;
  name: string;
  accept: string;
  helpText: string;
}) {
  return (
    <label className="block rounded-2xl border border-dashed border-[#53bc76]/35 bg-[#f8fafc] p-4">
      <span className="text-sm font-bold text-[#0e3541]">{label}</span>

      <input
        name={name}
        type="file"
        accept={accept}
        className="mt-3 block w-full text-sm text-[#587469] file:mr-4 file:rounded-full file:border-0 file:bg-[#53bc76] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#45a866]"
      />

      <span className="mt-2 block text-xs leading-5 text-[#64748b]">
        {helpText}
      </span>
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
  icon: ReactNode;
  children: ReactNode;
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

function DeleteIconButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
      aria-label={label}
      title={label}
    >
      <Trash2 size={17} />
    </button>
  );
}

function EmptyMediaState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#0e3541]/10 bg-[#f8fafc] p-8 text-center">
      <Pencil className="mx-auto text-[#53bc76]" size={28} />

      <p className="mt-3 text-sm font-bold text-[#64748b]">{label}</p>
    </div>
  );
}
