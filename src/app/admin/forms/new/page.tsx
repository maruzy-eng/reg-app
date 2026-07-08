import Link from "next/link";
import { ArrowLeft, ClipboardList, Save } from "lucide-react";
import { createAdminFormAction } from "@/lib/admin-forms";

export default function NewAdminFormPage() {
  return (
    <div className="w-full space-y-8">
      <section className="admin-card p-6 md:p-8">
        <Link
          href="/admin/forms"
          className="admin-secondary-button mb-6 min-h-[42px] w-fit gap-2 px-4 text-sm no-underline"
        >
          <ArrowLeft size={16} />
          Back to Forms
        </Link>

        <div className="flex items-start gap-4">
          <div className="admin-icon-box h-12 w-12 shrink-0">
            <ClipboardList size={22} />
          </div>

          <div>
            <h2 className="admin-list-title text-3xl font-bold tracking-normal">
              Create a dynamic form
            </h2>

            <p className="admin-list-meta mt-2 max-w-2xl text-sm leading-6">
              Start with the form settings. After creating it, add only the
              fields this form needs.
            </p>
          </div>
        </div>
      </section>

      <form action={createAdminFormAction} className="admin-section p-6 md:p-8">
        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="admin-list-title mb-2 block text-sm font-bold"
              >
                Internal name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Investor Application"
                className="admin-input min-h-[48px] px-4"
              />

              <p className="admin-list-meta mt-2 text-xs leading-5">
                Used only inside the admin dashboard.
              </p>
            </div>

            <div>
              <label
                htmlFor="slug"
                className="admin-list-title mb-2 block text-sm font-bold"
              >
                Slug
              </label>

              <input
                id="slug"
                name="slug"
                type="text"
                placeholder="investor-application"
                className="admin-input min-h-[48px] px-4"
              />

              <p className="admin-list-meta mt-2 text-xs leading-5">
                Public URL: /forms/your-slug. If empty, it will be generated.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="admin-list-title mb-2 block text-sm font-bold"
            >
              Public title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Apply to Invest with Checkmate Property"
              className="admin-input min-h-[48px] px-4"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="admin-list-title mb-2 block text-sm font-bold"
            >
              Public description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Tell users what this form is for."
              className="admin-input resize-none px-4 py-3"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label
                htmlFor="status"
                className="admin-list-title mb-2 block text-sm font-bold"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue="draft"
                className="admin-input min-h-[48px] px-4"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="submit_button_label"
                className="admin-list-title mb-2 block text-sm font-bold"
              >
                Submit button
              </label>

              <input
                id="submit_button_label"
                name="submit_button_label"
                type="text"
                defaultValue="Submit"
                className="admin-input min-h-[48px] px-4"
              />
            </div>

            <div>
              <label
                htmlFor="thank_you_page_url"
                className="admin-list-title mb-2 block text-sm font-bold"
              >
                Thank you URL
              </label>

              <input
                id="thank_you_page_url"
                name="thank_you_page_url"
                type="text"
                defaultValue="/thank-you/default"
                className="admin-input min-h-[48px] px-4"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-[rgba(12,41,51,0.08)] pt-6 sm:flex-row">
          <Link
            href="/admin/forms"
            className="admin-secondary-button min-h-[46px] px-5 text-sm no-underline"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button min-h-[46px] gap-2 px-5 text-sm"
          >
            <Save size={17} />
            Create Form
          </button>
        </div>
      </form>
    </div>
  );
}
