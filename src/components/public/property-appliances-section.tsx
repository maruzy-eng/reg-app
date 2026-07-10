import React from "react";

type PropertyApplianceItem = {
  id?: string;
  title?: string | null;
  description?: string | null;
  image_url?: string | null;
  alt_text?: string | null;
};

type PropertyAppliancesSectionProps = {
  appliances?: PropertyApplianceItem[] | null;
};

export function PropertyAppliancesSection({
  appliances,
}: PropertyAppliancesSectionProps) {
  if (!appliances || appliances.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[32px] border border-[#0e3541]/10 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)] md:p-8">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-[#53bc76]/20 bg-[#53bc76]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0e3541]">
          Included Appliances
        </span>

        <h2 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.03em] text-[#0e3541] md:text-[34px]">
          Appliances & Equipment
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#64748b] md:text-base">
          Review the appliances and equipment included in this property.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {appliances.map((item, index) => {
          const title = item.title?.trim() || `Appliance ${index + 1}`;
          const description =
            item.description?.trim() || "No description provided.";
          const imageUrl = item.image_url?.trim() || "";
          const altText = item.alt_text?.trim() || title;

          return (
            <article
              key={item.id || `${title}-${index}`}
              className="overflow-hidden rounded-[28px] border border-[#0e3541]/10 bg-[#fcfdfd] shadow-[0_16px_36px_rgba(15,23,42,0.05)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
                <div className="relative h-[240px] w-full overflow-hidden bg-[#f4f7f9] md:h-full md:min-h-[260px]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={altText}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-[#94a3b8]">
                      No image available
                    </div>
                  )}

                  <div className="pointer-events-none absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0e3541] shadow-sm backdrop-blur">
                      Appliance
                    </span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col justify-center p-6 md:p-7 lg:p-8">
                  <h3 className="text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-[#0e3541] md:text-[26px]">
                    {title}
                  </h3>

                  <div className="mt-4 h-px w-full bg-[#0e3541]/8" />

                  <p className="mt-4 text-sm leading-7 text-[#64748b] md:text-[15px]">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}