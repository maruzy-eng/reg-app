"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Check,
  Copy,
  DollarSign,
  Filter,
  MapPin,
  Ruler,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  getPropertyStatusLabel,
  getPropertyTypeLabel,
} from "@/types/property";
import type {
  PropertyCard,
  PropertyStatus,
  PropertyType,
} from "@/types/property";

type PropertiesFilterClientProps = {
  properties: PropertyCard[];
  initialFilters?: {
    q?: string;
    status?: string;
    type?: string;
    city?: string;
    min_price?: string;
    max_price?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
};

const statusOptions: {
  value: PropertyStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "under_contract", label: "Under Contract" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "in_progress", label: "In Progress" },
];

const typeOptions: {
  value: PropertyType | "all";
  label: string;
}[] = [
  { value: "all", label: "All Types" },
  { value: "single_family", label: "Single Family" },
  { value: "multi_family", label: "Multi Family" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "new_construction", label: "New Construction" },
  { value: "flip", label: "Flip" },
];

function parseNumber(value: string) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.replace(/,/g, "");
  const numberValue = Number(normalizedValue);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function normalizeStatus(value: string | undefined) {
  const validStatuses = statusOptions.map((status) => status.value);

  if (value && validStatuses.includes(value as PropertyStatus | "all")) {
    return value;
  }

  return "all";
}

function normalizeType(value: string | undefined) {
  const validTypes = typeOptions.map((type) => type.value);

  if (value && validTypes.includes(value as PropertyType | "all")) {
    return value;
  }

  return "all";
}

function buildFilteredPath(filters: {
  q: string;
  status: string;
  type: string;
  city: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
  bathrooms: string;
}) {
  const params = new URLSearchParams();

  if (filters.q.trim()) {
    params.set("q", filters.q.trim());
  }

  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }

  if (filters.type && filters.type !== "all") {
    params.set("type", filters.type);
  }

  if (filters.city.trim()) {
    params.set("city", filters.city.trim());
  }

  if (filters.min_price.trim()) {
    params.set("min_price", filters.min_price.trim());
  }

  if (filters.max_price.trim()) {
    params.set("max_price", filters.max_price.trim());
  }

  if (filters.bedrooms.trim()) {
    params.set("bedrooms", filters.bedrooms.trim());
  }

  if (filters.bathrooms.trim()) {
    params.set("bathrooms", filters.bathrooms.trim());
  }

  const queryString = params.toString();

  return queryString ? `/properties?${queryString}` : "/properties";
}

function updateBrowserUrl(filters: {
  q: string;
  status: string;
  type: string;
  city: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
  bathrooms: string;
}) {
  if (typeof window === "undefined") {
    return;
  }

  const nextUrl = buildFilteredPath(filters);

  window.history.replaceState(null, "", nextUrl);
}

export function PropertiesFilterClient({
  properties,
  initialFilters,
}: PropertiesFilterClientProps) {
  const [, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(initialFilters?.q || "");
  const [selectedStatus, setSelectedStatus] = useState(
    normalizeStatus(initialFilters?.status),
  );
  const [selectedType, setSelectedType] = useState(
    normalizeType(initialFilters?.type),
  );
  const [selectedCity, setSelectedCity] = useState(initialFilters?.city || "");
  const [minPriceValue, setMinPriceValue] = useState(
    initialFilters?.min_price || "",
  );
  const [maxPriceValue, setMaxPriceValue] = useState(
    initialFilters?.max_price || "",
  );
  const [bedroomsValue, setBedroomsValue] = useState(
    initialFilters?.bedrooms || "",
  );
  const [bathroomsValue, setBathroomsValue] = useState(
    initialFilters?.bathrooms || "",
  );
  const [linkCopied, setLinkCopied] = useState(false);

  const cityOptions = useMemo(() => {
    return Array.from(
      new Set(
        properties
          .map((property) => property.city)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b)),
      ),
    );
  }, [properties]);

  const currentFilters = useMemo(
    () => ({
      q: searchQuery,
      status: selectedStatus,
      type: selectedType,
      city: selectedCity,
      min_price: minPriceValue,
      max_price: maxPriceValue,
      bedrooms: bedroomsValue,
      bathrooms: bathroomsValue,
    }),
    [
      searchQuery,
      selectedStatus,
      selectedType,
      selectedCity,
      minPriceValue,
      maxPriceValue,
      bedroomsValue,
      bathroomsValue,
    ],
  );

  const filteredProperties = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const normalizedCity = selectedCity.trim().toLowerCase();

    const minPrice = parseNumber(minPriceValue);
    const maxPrice = parseNumber(maxPriceValue);
    const minBedrooms = parseNumber(bedroomsValue);
    const minBathrooms = parseNumber(bathroomsValue);

    return properties.filter((property) => {
      const propertyPrice = Number(property.price || 0);
      const propertyBedrooms = Number(property.bedrooms || 0);
      const propertyBathrooms = Number(property.bathrooms || 0);

      const matchesSearch =
        !normalizedSearch ||
        property.title.toLowerCase().includes(normalizedSearch) ||
        property.address.toLowerCase().includes(normalizedSearch) ||
        property.city.toLowerCase().includes(normalizedSearch) ||
        property.state.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        selectedStatus === "all" || property.status === selectedStatus;

      const matchesType =
        selectedType === "all" || property.propertyType === selectedType;

      const matchesCity =
        !normalizedCity || property.city.toLowerCase() === normalizedCity;

      const matchesMinPrice = minPrice === null || propertyPrice >= minPrice;

      const matchesMaxPrice = maxPrice === null || propertyPrice <= maxPrice;

      const matchesBedrooms =
        minBedrooms === null || propertyBedrooms >= minBedrooms;

      const matchesBathrooms =
        minBathrooms === null || propertyBathrooms >= minBathrooms;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesCity &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBedrooms &&
        matchesBathrooms
      );
    });
  }, [
    properties,
    searchQuery,
    selectedStatus,
    selectedType,
    selectedCity,
    minPriceValue,
    maxPriceValue,
    bedroomsValue,
    bathroomsValue,
  ]);

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedStatus !== "all" ||
    selectedType !== "all" ||
    Boolean(selectedCity.trim()) ||
    Boolean(minPriceValue.trim()) ||
    Boolean(maxPriceValue.trim()) ||
    Boolean(bedroomsValue.trim()) ||
    Boolean(bathroomsValue.trim());

  useEffect(() => {
    startTransition(() => {
      updateBrowserUrl(currentFilters);
    });
  }, [currentFilters, startTransition]);

  useEffect(() => {
    if (!linkCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLinkCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [linkCopied]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedStatus("all");
    setSelectedType("all");
    setSelectedCity("");
    setMinPriceValue("");
    setMaxPriceValue("");
    setBedroomsValue("");
    setBathroomsValue("");
    setLinkCopied(false);

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/properties");
    }
  }

  async function copyFilteredLink() {
    if (typeof window === "undefined") {
      return;
    }

    const path = buildFilteredPath(currentFilters);
    const fullUrl = `${window.location.origin}${path}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setLinkCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = fullUrl;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setLinkCopied(true);
    }
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#2680d8]">
                <Building2 size={17} />
                Property Portfolio
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[0.95] tracking-tight text-[#123843] md:text-6xl">
                Explore Available Real Estate Projects
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-500">
                Search active, completed and in-progress properties with
                project details, photos, videos, floor plans and investment
                information.
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 lg:min-w-[220px]">
              <p className="text-sm font-semibold text-gray-500">
                Total Results
              </p>

              <p className="mt-2 text-4xl font-bold text-[#123843]">
                {filteredProperties.length}
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-400">
                from {properties.length} public projects
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
              <label className="relative block">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by city, address, state or project name..."
                  className="h-14 w-full rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="relative block">
                <Filter
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  className="h-14 w-full appearance-none rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="relative block">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  className="h-14 w-full appearance-none rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                >
                  {typeOptions.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={clearFilters}
                className="h-14 rounded-2xl bg-[#2680d8] px-6 text-sm font-bold text-white transition hover:bg-[#0f5fa8]"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-black/10 bg-gray-50 p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-700">
                <SlidersHorizontal size={18} className="text-[#2680d8]" />
                Advanced Filters
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    City
                  </span>

                  <select
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">All Cities</option>

                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Min Price
                  </span>

                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="number"
                      value={minPriceValue}
                      onChange={(event) =>
                        setMinPriceValue(event.target.value)
                      }
                      placeholder="0"
                      className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-10 pr-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Max Price
                  </span>

                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="number"
                      value={maxPriceValue}
                      onChange={(event) =>
                        setMaxPriceValue(event.target.value)
                      }
                      placeholder="1000000"
                      className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-10 pr-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Bedrooms
                  </span>

                  <select
                    value={bedroomsValue}
                    onChange={(event) => setBedroomsValue(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Bathrooms
                  </span>

                  <select
                    value={bathroomsValue}
                    onChange={(event) => setBathroomsValue(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-gray-700 outline-none transition focus:border-[#2680d8] focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold text-gray-500">
                Active filters:
              </p>

              {searchQuery.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Search: {searchQuery}
                </span>
              ) : null}

              {selectedStatus !== "all" ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Status:{" "}
                  {getPropertyStatusLabel(selectedStatus as PropertyStatus)}
                </span>
              ) : null}

              {selectedType !== "all" ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Type: {getPropertyTypeLabel(selectedType as PropertyType)}
                </span>
              ) : null}

              {selectedCity.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  City: {selectedCity}
                </span>
              ) : null}

              {minPriceValue.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Min: {formatCurrency(parseNumber(minPriceValue))}
                </span>
              ) : null}

              {maxPriceValue.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Max: {formatCurrency(parseNumber(maxPriceValue))}
                </span>
              ) : null}

              {bedroomsValue.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Beds: {bedroomsValue}+
                </span>
              ) : null}

              {bathroomsValue.trim() ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2680d8]">
                  Baths: {bathroomsValue}+
                </span>
              ) : null}

              <button
                type="button"
                onClick={copyFilteredLink}
                className="inline-flex items-center gap-2 rounded-full border border-[#2680d8]/20 bg-white px-3 py-1 text-xs font-bold text-[#2680d8] transition hover:bg-blue-50"
              >
                {linkCopied ? <Check size={14} /> : <Copy size={14} />}
                {linkCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button
                type="button"
                onClick={copyFilteredLink}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-bold text-gray-600 transition hover:border-[#2680d8]/40 hover:text-[#2680d8]"
              >
                {linkCopied ? <Check size={14} /> : <Copy size={14} />}
                {linkCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        {filteredProperties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-blue-50">
                  {property.imageUrl ? (
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#2680d8]">
                      <Building2 size={54} />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2680d8] shadow-sm">
                    {getPropertyStatusLabel(property.status)}
                  </div>

                  <div className="absolute right-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white">
                    {getPropertyTypeLabel(property.propertyType)}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold leading-tight text-gray-950">
                    {property.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {property.address}, {property.city}, {property.state}
                  </p>

                  <p className="mt-4 text-2xl font-bold text-[#123843]">
                    {formatCurrency(property.price)}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-bold text-gray-600">
                    <span className="flex items-center gap-1 rounded-xl bg-gray-50 px-3 py-2">
                      <BedDouble size={15} />
                      {formatNumber(property.bedrooms)}
                    </span>

                    <span className="flex items-center gap-1 rounded-xl bg-gray-50 px-3 py-2">
                      <Bath size={15} />
                      {formatNumber(property.bathrooms)}
                    </span>

                    <span className="flex items-center gap-1 rounded-xl bg-gray-50 px-3 py-2">
                      <Ruler size={15} />
                      {formatNumber(property.sqft)}
                    </span>
                  </div>

                  {property.description ? (
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                      {property.description}
                    </p>
                  ) : null}

                  <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                    <span className="text-sm font-bold text-[#2680d8]">
                      View details
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#2680d8] transition group-hover:bg-[#2680d8] group-hover:text-white">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-black/15 bg-white p-10 text-center shadow-sm">
            <Building2 className="mx-auto text-[#2680d8]" size={48} />

            <h3 className="mt-4 text-2xl font-bold text-gray-950">
              No properties found
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-gray-500">
              Try changing your search term or clearing the active filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex rounded-2xl bg-[#2680d8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f5fa8]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
