import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Home } from "lucide-react";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";
import { getPublishedFormBySlug } from "@/lib/forms";

type FormPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    embed?: string;
    property_title?: string;
    property_slug?: string;
    property_id?: string;
  }>;
};

function getStringParam(value?: string | string[] | null) {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value;
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { form } = await getPublishedFormBySlug(slug);

  if (!form) {
    return {
      title: "Form not found | Checkmate Property",
    };
  }

  return {
    title: `${form.title} | Checkmate Property`,
    description:
      form.description || "Submit your information to Checkmate Property.",
  };
}

export default async function DynamicFormPage({
  params,
  searchParams,
}: FormPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const { form, fields } = await getPublishedFormBySlug(slug);

  if (!form) {
    notFound();
  }

  const isEmbed = resolvedSearchParams.embed === "1";

  const selectedPropertyTitle = getStringParam(
    resolvedSearchParams.property_title,
  );

  const selectedPropertySlug = getStringParam(
    resolvedSearchParams.property_slug,
  );

  const selectedPropertyId = getStringParam(resolvedSearchParams.property_id);

  const defaultValues = {
    property_title: selectedPropertyTitle,
    property_slug: selectedPropertySlug,
    property_id: selectedPropertyId,
  };

  if (isEmbed) {
    return (
      <main className="min-h-screen bg-white text-[#0c2933]">
        <section className="w-full px-0 py-0">
          <div className="w-full">
            {selectedPropertyTitle ? (
              <div className="mb-5 rounded-2xl border border-[#53bc76]/25 bg-[#f0fdf4] px-4 py-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0e3541] shadow-sm">
                    <Home size={17} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#64748b]">
                      Selected Property
                    </p>

                    <p className="mt-1 text-sm font-bold leading-5 text-[#0e3541]">
                      {selectedPropertyTitle}
                    </p>

                    {selectedPropertySlug ? (
                      <p className="mt-1 text-xs leading-5 text-[#64748b]">
                        {selectedPropertySlug}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <DynamicFormComponent
              form={form}
              fields={fields}
              defaultValues={defaultValues}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0c2933]">
      <section className="relative overflow-hidden border-b border-[rgba(12,41,51,0.08)] bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(83,188,118,0.14),transparent_34rem)]" />

        <div className="relative mx-auto flex min-h-[340px] w-full max-w-6xl flex-col justify-center px-5 py-16 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(12,41,51,0.10)] bg-white px-4 py-2 text-sm font-bold text-[#0c2933] no-underline shadow-sm transition hover:border-[#53bc76]/40"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#53bc76]/20 bg-[#53bc76]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0c2933]">
            <FileText size={15} />
            Checkmate Property
          </div>

          <h1 className="mt-6 max-w-4xl text-[38px] font-bold leading-[1.02] tracking-[-0.055em] text-[#0c2933] md:text-[64px]">
            {form.title}
          </h1>

          {form.description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
              {form.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-16">
        <aside className="h-fit rounded-[32px] border border-[rgba(12,41,51,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(12,41,51,0.06)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#53bc76]/12 text-[#0c2933]">
            <FileText size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-[-0.04em]">
            Submit your information
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#64748b]">
            Fill out the form and our team will review your information. The
            next steps will be handled based on this form configuration.
          </p>

          {selectedPropertyTitle ? (
            <div className="mt-6 rounded-2xl border border-[#53bc76]/25 bg-[#f0fdf4] p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0c2933]">
                Selected Property
              </p>

              <p className="mt-2 text-sm font-bold leading-6 text-[#0e3541]">
                {selectedPropertyTitle}
              </p>

              {selectedPropertySlug ? (
                <p className="mt-1 text-xs leading-5 text-[#64748b]">
                  {selectedPropertySlug}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#53bc76]/18 bg-[#53bc76]/8 p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0c2933]">
                Dynamic workflow
              </p>

              <p className="mt-2 text-sm leading-6 text-[#64748b]">
                This form can trigger custom webhooks, save submissions and
                redirect users to a specific thank you page.
              </p>
            </div>
          )}
        </aside>

        <div className="rounded-[32px] border border-[rgba(12,41,51,0.08)] bg-white p-5 shadow-[0_18px_50px_rgba(12,41,51,0.06)] md:p-8">
          <DynamicFormComponent
            form={form}
            fields={fields}
            defaultValues={defaultValues}
          />
        </div>
      </section>
    </main>
  );
}