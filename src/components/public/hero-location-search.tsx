"use client";

import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, MapPin, Search, ShieldCheck, X } from "lucide-react";
import { DynamicFormComponent } from "@/components/forms/dynamic-form";

type LocationSuggestion = {
  id: string;
  group: string;
  state: string;
  city: string;
  text: string;
  line: string;
  postalCode: string;
  propertyId: string;
};

type SearchFormData = {
  form: Record<string, unknown> & {
    id?: string;
    slug?: string;
    title?: string;
    description?: string | null;
    thank_you_page_url?: string | null;
  };
  fields: Array<Record<string, unknown>>;
};

type HeroLocationSearchProps = {
  searchForm?: SearchFormData | null;
};

function getNodeText(parent: Element, tagName: string) {
  return parent.getElementsByTagName(tagName)[0]?.textContent?.trim() || "";
}

function parseLocationSuggestions(xmlText: string): LocationSuggestion[] {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  const parserError = xml.getElementsByTagName("parsererror")[0];

  if (parserError) {
    return [];
  }

  const items = Array.from(xml.getElementsByTagName("item"));
  const suggestions: LocationSuggestion[] = [];

  items.forEach((item) => {
    const group = getNodeText(item, "group") || "Location";

    const valuesContainers = Array.from(item.children).filter(
      (child) => child.tagName.toLowerCase() === "values",
    );

    valuesContainers.forEach((container) => {
      const valueNodes = Array.from(container.children).filter(
        (child) => child.tagName.toLowerCase() === "values",
      );

      valueNodes.forEach((valueNode, index) => {
        const state = getNodeText(valueNode, "state");
        const city = getNodeText(valueNode, "city");
        const text = getNodeText(valueNode, "text");
        const line = getNodeText(valueNode, "line");
        const postalCode = getNodeText(valueNode, "postalCode");
        const propertyId = getNodeText(valueNode, "propertyId");

        const label =
          text ||
          [city, state ? `(${state})` : ""].filter(Boolean).join(" ").trim();

        if (!label) {
          return;
        }

        suggestions.push({
          id: `${group}-${state}-${city}-${postalCode}-${propertyId}-${index}`,
          group: group.trim(),
          state,
          city,
          text: label,
          line,
          postalCode,
          propertyId,
        });
      });
    });
  });

  return suggestions;
}

function createHiddenField(params: {
  formId: unknown;
  name: string;
  label: string;
  value: string;
  sortOrder: number;
}) {
  return {
    id: `search-hidden-${params.name}`,
    form_id: typeof params.formId === "string" ? params.formId : "",
    label: params.label,
    name: params.name,
    type: "hidden",
    placeholder: null,
    help_text: null,
    required: false,
    options: [],
    default_value: params.value,
    sort_order: params.sortOrder,
    created_at: new Date(0).toISOString(),
    updated_at: new Date(0).toISOString(),
  };
}

export function HeroLocationSearch({ searchForm }: HeroLocationSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<LocationSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const wrapperRef = useRef<HTMLFormElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const modalFields = useMemo(() => {
    if (!searchForm?.form || !Array.isArray(searchForm.fields)) {
      return [];
    }

    const baseFields = searchForm.fields;
    const nextSortOrder = baseFields.length + 1;

    const hiddenFields = [
      createHiddenField({
        formId: searchForm.form.id,
        name: "search_query",
        label: "Search Query",
        value: query.trim(),
        sortOrder: nextSortOrder,
      }),
      createHiddenField({
        formId: searchForm.form.id,
        name: "selected_address",
        label: "Selected Address",
        value: selectedSuggestion?.text || query.trim(),
        sortOrder: nextSortOrder + 1,
      }),
      createHiddenField({
        formId: searchForm.form.id,
        name: "selected_city",
        label: "Selected City",
        value: selectedSuggestion?.city || "",
        sortOrder: nextSortOrder + 2,
      }),
      createHiddenField({
        formId: searchForm.form.id,
        name: "selected_state",
        label: "Selected State",
        value: selectedSuggestion?.state || "",
        sortOrder: nextSortOrder + 3,
      }),
      createHiddenField({
        formId: searchForm.form.id,
        name: "selected_postal_code",
        label: "Selected Postal Code",
        value: selectedSuggestion?.postalCode || "",
        sortOrder: nextSortOrder + 4,
      }),
      createHiddenField({
        formId: searchForm.form.id,
        name: "selected_property_id",
        label: "Selected Property ID",
        value: selectedSuggestion?.propertyId || "",
        sortOrder: nextSortOrder + 5,
      }),
    ];

    return [...baseFields, ...hiddenFields];
  }, [query, searchForm, selectedSuggestion]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLeadModalOpen(false);
      }
    }

    if (isLeadModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);

      window.setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLeadModalOpen]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (trimmedQuery.length < 2) {
      const resetTimeout = window.setTimeout(() => {
        setSuggestions([]);
        setIsDropdownOpen(false);
        setIsLoading(false);
        setErrorMessage("");
      }, 0);

      return () => {
        window.clearTimeout(resetTimeout);
      };
    }

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const endpoint = `https://api.checkmateproperty.com/api/v1/search-auto-complete?query=${encodeURIComponent(
          trimmedQuery,
        )}`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/xml,text/xml,*/*",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load locations.");
        }

        const xmlText = await response.text();
        const parsedSuggestions = parseLocationSuggestions(xmlText);

        setSuggestions(parsedSuggestions);
        setIsDropdownOpen(parsedSuggestions.length > 0);
        setActiveIndex(-1);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Location autocomplete error:", error);
        setSuggestions([]);
        setIsDropdownOpen(false);
        setErrorMessage("No locations found. Try another search.");
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query]);

  function selectSuggestion(suggestion: LocationSuggestion) {
    setQuery(suggestion.text);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setErrorMessage("");
    setSubmitMessage("");
  }

  function clearSearch() {
    setQuery("");
    setSelectedSuggestion(null);
    setSuggestions([]);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setErrorMessage("");
    setSubmitMessage("");
  }

  function openLeadModal() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSubmitMessage("Enter an address, city, ZIP code, or neighborhood.");
      return;
    }

    setSubmitMessage("");
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setPortalTarget(document.body);
    setIsLeadModalOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openLeadModal();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isDropdownOpen || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1,
      );
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    }

    if (event.key === "Escape") {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  }

  const modal = isLeadModalOpen ? (
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[#071f28]/82 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-lead-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsLeadModalOpen(false);
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-white p-5 text-left shadow-[0_34px_100px_rgba(0,0,0,0.35)] outline-none sm:p-7 md:p-8"
      >
        <button
          type="button"
          onClick={() => setIsLeadModalOpen(false)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f8fafc] text-[#0e3541] transition hover:bg-red-50 hover:text-red-600"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="mb-6 pr-12">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(83,188,118,0.16),rgba(57,175,242,0.12))] text-[#0e3541] ring-1 ring-[#53bc76]/20">
            <ShieldCheck size={24} />
          </div>

          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#53bc76]">
            Search Access
          </p>

          <h2
            id="search-lead-modal-title"
            className="mt-2 text-3xl font-black leading-tight tracking-[-0.055em] text-[#0e3541] md:text-4xl"
          >
            Unlock your property search
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#587469]">
            Complete the form below to continue and access Checkmate Property
            search results.
          </p>

          <div className="mt-4 rounded-2xl border border-[#0e3541]/10 bg-[#f8fafc] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#64748b]">
              Search query
            </p>

            <p className="mt-1 break-words text-sm font-bold text-[#0e3541]">
              {query.trim()}
            </p>
          </div>
        </div>

        {searchForm?.form ? (
          <div className="rounded-[24px] border border-[#0e3541]/10 bg-[#f8fafc] p-4 sm:p-5">
            <DynamicFormComponent
              form={searchForm.form as never}
              fields={modalFields as never}
            />
          </div>
        ) : (
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
            <strong>Search form is not configured yet.</strong>
            <br />
            Create and publish a dynamic form with slug{" "}
            <code className="rounded bg-white/70 px-1.5 py-0.5">search</code>{" "}
            in the admin panel.
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <form
        ref={wrapperRef}
        onSubmit={handleSubmit}
        className="relative z-[200] mx-auto mt-8 grid w-full max-w-3xl gap-3 rounded-[24px] bg-white p-3 shadow-[0_26px_80px_rgba(0,0,0,0.20)] md:flex md:items-center md:gap-3 md:rounded-[26px] md:p-2.5"
      >
        <div className="relative flex min-h-[58px] w-full items-center gap-3 rounded-[18px] bg-gray-50 px-4 md:flex-1 md:bg-transparent md:px-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0e3541] shadow-sm md:h-12 md:w-12 md:bg-gray-50 md:shadow-none">
            <Search size={21} />
          </div>

          <input
            name="q"
            value={query}
            autoComplete="off"
            placeholder="Enter an address, city, ZIP code, or neighborhood"
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedSuggestion(null);
              setSubmitMessage("");
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            className="h-12 min-w-0 flex-1 border-0 bg-transparent text-sm font-medium text-[#0e3541] outline-none placeholder:text-gray-500"
          />

          {isLoading ? (
            <Loader2
              size={18}
              className="shrink-0 animate-spin text-[#39aff2]"
            />
          ) : null}

          {!isLoading && query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#64748b] shadow-sm transition hover:text-[#0e3541]"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center rounded-[18px] bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-8 text-sm font-bold !text-white shadow-[0_14px_34px_rgba(57,175,242,0.28)] transition hover:-translate-y-0.5 md:w-auto md:min-w-[132px]"
        >
          Search
        </button>

        {isDropdownOpen && suggestions.length > 0 ? (
          <div className="absolute left-3 right-3 top-[calc(100%+10px)] z-[999999] overflow-hidden rounded-[22px] border border-black/10 bg-white text-left shadow-[0_24px_70px_rgba(9,24,39,0.24)] md:left-2.5 md:right-[150px]">
            <div className="max-h-[360px] overflow-y-auto py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                    activeIndex === index
                      ? "bg-[#53bc76]/10"
                      : "bg-white hover:bg-[#53bc76]/10"
                  }`}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#53bc76]/10 text-[#0e3541]">
                    <MapPin size={17} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-5 text-[#0e3541]">
                      {suggestion.text}
                    </span>

                    <span className="mt-0.5 block text-xs font-normal uppercase tracking-[0.12em] text-[#64748b]">
                      {suggestion.group.trim() || "Location"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!isLoading && errorMessage && query.trim().length >= 2 ? (
          <div className="absolute left-3 right-3 top-[calc(100%+10px)] z-[999999] rounded-[18px] border border-black/10 bg-white px-4 py-3 text-left text-sm font-normal text-[#64748b] shadow-[0_18px_48px_rgba(9,24,39,0.18)] md:left-2.5 md:right-[150px]">
            {errorMessage}
          </div>
        ) : null}

        {submitMessage ? (
          <div className="absolute left-3 right-3 top-[calc(100%+10px)] z-[999999] rounded-[18px] border border-amber-200 bg-white px-4 py-3 text-left text-sm font-semibold text-amber-700 shadow-[0_18px_48px_rgba(9,24,39,0.18)] md:left-2.5 md:right-[150px]">
            {submitMessage}
          </div>
        ) : null}
      </form>

      {portalTarget && modal ? createPortal(modal, portalTarget) : null}
    </>
  );
}