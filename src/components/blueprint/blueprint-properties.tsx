import Image from "next/image";
import Link from "next/link";

import {
  BlueprintArrowIcon,
  BlueprintGoldButton,
  BlueprintSectionHeading,
  blueprintContainer,
} from "@/components/blueprint/blueprint-ui";
import type { PropertyCard } from "@/types/property";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";

type BlueprintPropertiesProps = {
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

export function BlueprintProperties({ properties }: BlueprintPropertiesProps) {
  return (
    <section id="propriedades" className="bg-white py-24 sm:py-28">
      <div className={blueprintContainer}>
        <BlueprintSectionHeading
          kicker="Propriedades disponíveis"
          title={
            <>
              Projetos e imóveis reais do{" "}
              <span className="text-[#a77d28]">ecossistema Checkmate</span>
            </>
          }
          description="Listagem atualizada de propriedades públicas — fix-and-flip, new construction e oportunidades estruturadas no mercado americano."
        />

        {properties.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => {
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
                  className="group overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#fbfaf7] shadow-[0_18px_58px_rgba(15,15,15,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#c9a24d]/35 hover:shadow-[0_30px_80px_rgba(15,15,15,0.11)]"
                >
                  <Link
                    href={`/properties/${property.slug}`}
                    className="block text-inherit no-underline"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#ece9e2]">
                      {property.imageUrl ? (
                        <Image
                          src={property.imageUrl}
                          alt={`${property.title} em ${property.city}, ${property.state}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#9a948a]">
                          Sem imagem
                        </div>
                      )}

                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.45))]" />

                      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                        <span className="rounded-full bg-white/92 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#171614] shadow-[0_8px_20px_rgba(17,16,13,0.12)] backdrop-blur-sm">
                          {getPropertyStatusLabel(property.status)}
                        </span>
                        <span className="rounded-full bg-[#171614]/82 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                          {getPropertyTypeLabel(property.propertyType)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 p-6 sm:p-7">
                      <div>
                        <p className="text-[0.72rem] font-semibold text-[#8b6721]">
                          {property.city}, {property.state}
                        </p>
                        <h3 className="mt-2 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.035em] text-[#171614]">
                          {property.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[0.84rem] leading-[1.65] text-[#68635b]">
                          {property.description || property.address}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-black/[0.07] pt-4 text-[0.74rem] text-[#746f67]">
                        {beds != null ? <span>{beds} beds</span> : null}
                        {baths != null ? <span>{baths} baths</span> : null}
                        {sqft != null ? (
                          <span>{formatNumber(sqft)} sqft</span>
                        ) : null}
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        {price ? (
                          <p className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#171614]">
                            {price}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#8b6721] transition group-hover:text-[#171614]">
                          Ver detalhes <BlueprintArrowIcon />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 rounded-[28px] border border-dashed border-black/[0.12] bg-[#f8f6f1] px-6 py-14 text-center">
            <p className="text-[0.95rem] text-[#68635b]">
              As propriedades públicas aparecerão aqui assim que estiverem
              disponíveis.
            </p>
          </div>
        )}

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[520px] text-[0.82rem] leading-[1.65] text-[#7c776f]">
            Quer entender como participar dessas operações com método e
            estrutura? Fale com um analista do Blueprint.
          </p>
          <BlueprintGoldButton href="#formb">
            Falar com um analista
          </BlueprintGoldButton>
        </div>
      </div>
    </section>
  );
}
