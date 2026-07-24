import Image from "next/image";
import {
  HomeContainer,
  HomeSection,
  cx,
  homeBody,
  homeBtnPrimaryDark,
  homeEyebrowLight,
  homeReveal,
  homeSectionTitle,
} from "@/components/home/home-ui";
import type { PropertyCard } from "@/types/property";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";

type HomeProjectsProps = {
  properties: PropertyCard[];
};

function getDisplayPrice(property: PropertyCard) {
  if (property.creditActive && property.creditNewPrice != null) {
    return formatCurrency(property.creditNewPrice);
  }

  if (property.condActive && property.condListedPrice) {
    return property.condListedPrice;
  }

  if (property.price != null) {
    return formatCurrency(property.price);
  }

  return null;
}

export function HomeProjects({ properties }: HomeProjectsProps) {
  return (
    <HomeSection id="projects" tone="cream">
      <HomeContainer>
        <div className="grid grid-cols-1 gap-8 border-b border-black/[0.08] pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 lg:pb-14">
          <div>
            <span data-reveal className={cx(homeReveal(), homeEyebrowLight)}>
              <span className="h-px w-9 bg-[#8f672b]/70" />
              Projects
            </span>

            <h2
              data-reveal
              className={cx(
                homeReveal(1),
                "mt-6 max-w-[720px]",
                homeSectionTitle,
              )}
            >
              Real fix-and-flip and new construction projects developed and
              executed by Checkmate in 2026.
            </h2>
          </div>

          <p
            data-reveal
            className={cx(
              homeReveal(2),
              homeBody,
              "max-w-[520px] lg:justify-self-end",
            )}
          >
            We understand the challenges of the real estate market because we
            face them every day. We use our own technology and data throughout
            every stage of these projects.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
            {properties.map((property, index) => {
              const price = getDisplayPrice(property);
              const beds =
                property.condActive && property.condBedrooms != null
                  ? property.condBedrooms
                  : property.bedrooms;
              const baths =
                property.condActive && property.condBathrooms != null
                  ? property.condBathrooms
                  : property.bathrooms;
              const sqft =
                property.condActive && property.condSqft != null
                  ? property.condSqft
                  : property.sqft;

              return (
                <article
                  key={property.id}
                  data-reveal
                  className={cx(
                    homeReveal((index % 3) + 1),
                    "group overflow-hidden rounded-[22px] border border-black/[0.08] bg-white",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#ece9e2]">
                    {property.imageUrl ? (
                      <Image
                        src={property.imageUrl}
                        alt={`${property.title} in ${property.city}, ${property.state}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a948a]">
                        No image
                      </div>
                    )}

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5">
                      <span className="rounded-full bg-white/92 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#171614] shadow-[0_8px_20px_rgba(17,16,13,0.12)] backdrop-blur-sm">
                        {getPropertyStatusLabel(property.status)}
                      </span>
                      <span className="rounded-full bg-[#171614]/82 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                        {getPropertyTypeLabel(property.propertyType)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#9b7435]">
                        {property.city}, {property.state}
                      </p>
                      <h3 className="mt-2 text-[1.15rem] font-semibold leading-[1.25] tracking-[-0.03em] text-[#171614]">
                        {property.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.82rem] leading-[1.65] text-[#6a655e]">
                        {property.description || property.address}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-black/[0.06] pt-4 text-[0.74rem] text-[#746f67]">
                      {beds != null ? <span>{beds} beds</span> : null}
                      {baths != null ? <span>{baths} baths</span> : null}
                      {sqft != null ? (
                        <span>{formatNumber(sqft)} sqft</span>
                      ) : null}
                    </div>

                    {price ? (
                      <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[#171614]">
                        {price}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            data-reveal
            className={cx(
              homeReveal(),
              "mt-10 rounded-[22px] border border-dashed border-black/[0.12] bg-white/60 px-6 py-14 text-center lg:mt-14",
            )}
          >
            <p className="text-[0.95rem] text-[#6a655e]">
              Project listings will appear here as they become available.
            </p>
          </div>
        )}

        <div
          data-reveal
          className={cx(homeReveal(), "mt-10 flex justify-start lg:mt-14")}
        >
          <a href="/contact" className={homeBtnPrimaryDark}>
            <span className="relative z-[2]">Talk to Our Team</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="relative z-[2] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </HomeContainer>
    </HomeSection>
  );
}
