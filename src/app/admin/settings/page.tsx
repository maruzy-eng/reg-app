import {
  Building2,
  CheckCircle2,
  ImageIcon,
  LinkIcon,
  Radio,
  Save,
  Settings,
} from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import {
  currentAdminHasPermission,
  requireAdminPermission,
} from "@/lib/admin-permissions";
import { updateSiteSettingsAction } from "@/app/admin/settings/actions";
import { AssetUploadField } from "@/components/admin/asset-upload-field";

type AdminSettingsPageProps = {
  searchParams?: Promise<{
    updated?: string;
    error?: string;
  }>;
};

function getErrorMessage(error: string | undefined) {
  if (!error) {
    return null;
  }

  const messages: Record<string, string> = {
    "asset-upload-failed":
      "Could not upload the logo or favicon. Check the file type and try again.",
    "update-failed": "Could not update settings. Please try again.",
  };

  return messages[error] || "Something went wrong. Please try again.";
}

function FieldLabel({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-[#0e3541]">{title}</span>

      {description ? (
        <span className="mt-1 block text-xs leading-5 text-[#587469]">
          {description}
        </span>
      ) : null}
    </label>
  );
}

function Input({
  name,
  defaultValue,
  placeholder,
  disabled,
  type = "text",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}) {
  return (
      <input
      type={type}
      name={name}
      defaultValue={defaultValue || ""}
      placeholder={placeholder}
      disabled={disabled}
      className="admin-input h-12 w-full px-4 text-sm font-semibold"
    />
  );
}

function Textarea({
  name,
  defaultValue,
  placeholder,
  disabled,
  rows = 4,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}) {
  return (
      <textarea
      name={name}
      defaultValue={defaultValue || ""}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className="admin-input w-full px-4 py-3 text-sm font-semibold leading-6"
    />
  );
}

export default async function AdminSettingsPage({
  searchParams,
}: AdminSettingsPageProps) {
  await requireAdminPermission("settings.read");

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const settings = await getSiteSettings();
  const canUpdate = await currentAdminHasPermission("settings.update");
  const errorMessage = getErrorMessage(resolvedSearchParams.error);

  return (
    <div className="space-y-8">
      <div className="admin-card p-6">
        <div className="admin-badge inline-flex items-center gap-2 px-4 py-2 text-sm">
          <Settings size={17} />
          Site Settings
        </div>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0e3541]">
          Settings
        </h1>

        <p className="mt-3 max-w-3xl text-[#587469]">
          Manage the public website identity, logo, favicon, contact
          information, tracking pixels, default CTAs and social links.
        </p>
      </div>

      {resolvedSearchParams.updated === "success" ? (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
          <CheckCircle2 size={18} />
          Settings updated successfully.
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {!canUpdate ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-800">
          You have read-only access to settings.
        </div>
      ) : null}

      <form action={updateSiteSettingsAction} className="space-y-8">
        <input type="hidden" name="current_logo_url" value={settings.logo_url} />
        <input
          type="hidden"
          name="current_favicon_url"
          value={settings.favicon_url}
        />

        <section className="admin-section p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11 rounded-2xl">
              <Building2 size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e3541]">
                Brand Identity
              </h2>

              <p className="text-sm text-[#587469]">
                Main website name, tagline and description.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel title="Site Name" />
              <Input
                name="site_name"
                defaultValue={settings.site_name}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Site Tagline" />
              <Input
                name="site_tagline"
                defaultValue={settings.site_tagline}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <FieldLabel title="Site Description" />
              <Textarea
                name="site_description"
                defaultValue={settings.site_description}
                disabled={!canUpdate}
                rows={4}
              />
            </div>
          </div>
        </section>

        <section className="admin-section p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11 rounded-2xl">
              <ImageIcon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e3541]">
                Logo & Favicon
              </h2>

              <p className="text-sm text-[#64748b]">
                Upload files directly to the system or paste external URLs.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <AssetUploadField
              name="logo_file"
              title="Logo"
              description="Recommended: PNG, JPG, WEBP or SVG with transparent background."
              currentUrl={settings.logo_url}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              disabled={!canUpdate}
              previewSize="logo"
            />

            <AssetUploadField
              name="favicon_file"
              title="Favicon"
              description="Recommended: ICO or PNG. Ideal size: 32x32 or 512x512."
              currentUrl={settings.favicon_url}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/x-icon,.ico"
              disabled={!canUpdate}
              previewSize="favicon"
            />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel
                title="Logo URL"
                description="Optional. Used if no file is uploaded."
              />

              <Input
                name="logo_url"
                defaultValue={settings.logo_url}
                placeholder="https://..."
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel
                title="Favicon URL"
                description="Optional. Used if no file is uploaded."
              />

              <Input
                name="favicon_url"
                defaultValue={settings.favicon_url}
                placeholder="https://..."
                disabled={!canUpdate}
              />
            </div>
          </div>
        </section>

        <section className="admin-section p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11 rounded-2xl">
              <LinkIcon size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e3541]">
                Contact & Links
              </h2>

              <p className="text-sm text-[#64748b]">
                Contact details, CTA text and social links.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel title="Primary Phone" />
              <Input
                name="primary_phone"
                defaultValue={settings.primary_phone}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Primary Email" />
              <Input
                name="primary_email"
                defaultValue={settings.primary_email}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="WhatsApp Number" />
              <Input
                name="whatsapp_number"
                defaultValue={settings.whatsapp_number}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Address Line" />
              <Input
                name="address_line"
                defaultValue={settings.address_line}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Default CTA Title" />
              <Input
                name="default_cta_title"
                defaultValue={settings.default_cta_title}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Default CTA Button" />
              <Input
                name="default_cta_button"
                defaultValue={settings.default_cta_button}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <FieldLabel title="Default CTA Description" />
              <Textarea
                name="default_cta_description"
                defaultValue={settings.default_cta_description}
                disabled={!canUpdate}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Facebook URL" />
              <Input
                name="facebook_url"
                defaultValue={settings.facebook_url}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="Instagram URL" />
              <Input
                name="instagram_url"
                defaultValue={settings.instagram_url}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="LinkedIn URL" />
              <Input
                name="linkedin_url"
                defaultValue={settings.linkedin_url}
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel title="YouTube URL" />
              <Input
                name="youtube_url"
                defaultValue={settings.youtube_url}
                disabled={!canUpdate}
              />
            </div>
          </div>
        </section>

        <section className="admin-section p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="admin-icon-box h-11 w-11 rounded-2xl">
              <Radio size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0e3541]">
                Tracking Pixels
              </h2>

              <p className="text-sm text-[#64748b]">
                Meta Pixel and Google Tag IDs are injected on all public pages.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel
                title="Meta Pixel ID"
                description="Example: 123456789012345"
              />
              <Input
                name="meta_pixel_id"
                defaultValue={settings.meta_pixel_id}
                placeholder="123456789012345"
                disabled={!canUpdate}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel
                title="Google Tag ID"
                description="Supports GA4 (G-XXXX) or Google Tag Manager (GTM-XXXX)."
              />
              <Input
                name="google_tag_id"
                defaultValue={settings.google_tag_id}
                placeholder="G-XXXXXXXXXX or GTM-XXXXXXX"
                disabled={!canUpdate}
              />
            </div>
          </div>
        </section>

        {canUpdate ? (
          <div className="sticky bottom-5 z-20 flex justify-end">
            <button
              type="submit"
              className="admin-primary-button inline-flex items-center justify-center gap-2 px-6 py-4 text-sm transition hover:brightness-105"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
