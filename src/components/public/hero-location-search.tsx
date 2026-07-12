"use client";

import dynamic from "next/dynamic";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, MapPin, Search, ShieldCheck, X } from "lucide-react";
import type {
  DynamicFormSubmitOverrideContext,
  DynamicFormSubmitOverrideResult,
} from "@/components/forms/dynamic-form";

const DynamicFormComponent = dynamic(
  () =>
    import("@/components/forms/dynamic-form").then(
      (module) => module.DynamicFormComponent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="hero-search-modal-loading">Loading form...</div>
    ),
  },
);

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

type CampaignRegisterResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expiresIn?: number | string;
  };
};

const CAMPAIGN_REGISTER_ENDPOINT = "/api/campaign/register";
const CAMPAIGN_ENTRY_URL =
  "https://app.checkmateproperty.com/#/campaign-entry";

const campaignFieldAliases = {
  name: ["name", "full_name", "fullname", "nome", "your_name"],
  email: ["email", "email_address", "e_mail"],
  phone: ["phone", "phone_number", "telefone", "mobile", "cellphone"],
  password: ["password", "senha"],
} as const;

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

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

function normalizeFieldKey(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function getStringValue(data: Record<string, unknown>, key: string) {
  const value = data[key];

  return typeof value === "string" ? value : "";
}

function getCampaignFieldValue(
  target: keyof typeof campaignFieldAliases,
  context: DynamicFormSubmitOverrideContext,
) {
  const aliases = campaignFieldAliases[target];
  const directMatch = aliases.find((alias) => alias in context.data);

  if (directMatch) {
    return getStringValue(context.data, directMatch);
  }

  const field = context.fields.find((item) => {
    const normalizedName = normalizeFieldKey(item.name);
    const normalizedLabel = normalizeFieldKey(item.label);
    const normalizedType = normalizeFieldKey(item.type);

    return (
      aliases.includes(normalizedName as never) ||
      aliases.includes(normalizedLabel as never) ||
      normalizedType === target
    );
  });

  return field ? getStringValue(context.data, field.name) : "";
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as CampaignRegisterResponse;
  } catch {
    return {
      success: false,
      error: text,
    } satisfies CampaignRegisterResponse;
  }
}

function getCampaignErrorMessage(result: CampaignRegisterResponse | null) {
  return (
    result?.error ||
    result?.message ||
    "Unable to create your campaign access. Please try again."
  );
}

function buildCampaignRedirectUrl(params: {
  tokens: NonNullable<CampaignRegisterResponse["data"]>;
  selectedSearchItem: LocationSuggestion;
}) {
  const search = encodeURIComponent(JSON.stringify(params.selectedSearchItem));
  const query = new URLSearchParams({
    at: params.tokens.accessToken || "",
    rt: params.tokens.refreshToken || "",
    it: params.tokens.idToken || "",
    exp: String(params.tokens.expiresIn || ""),
    lang: "pt-br",
  });

  return `${CAMPAIGN_ENTRY_URL}?${query.toString()}&search=${search}`;
}

export function HeroLocationSearch({ searchForm }: HeroLocationSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<LocationSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
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
      const previousOverflow = document.body.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("hero-search-modal-open");
      document.addEventListener("keydown", handleEscape);

      window.setTimeout(() => {
        modalRef.current?.focus();
      }, 0);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.documentElement.classList.remove("hero-search-modal-open");
        document.removeEventListener("keydown", handleEscape);
      };
    }

    return undefined;
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

    if (!selectedSuggestion) {
      setSubmitMessage("Select a valid location from the list to continue.");
      return;
    }

    setSubmitMessage("");
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setIsLeadModalOpen(true);
  }

  async function handleCampaignSubmit(
    context: DynamicFormSubmitOverrideContext,
  ): Promise<DynamicFormSubmitOverrideResult> {
    if (!selectedSuggestion) {
      return {
        error: "Select a valid location from the list to continue.",
      };
    }

    const name = getCampaignFieldValue("name", context).trim();
    const email = getCampaignFieldValue("email", context).trim();
    const phone = getCampaignFieldValue("phone", context).trim();
    const password = getCampaignFieldValue("password", context);

    const fieldErrors: Record<string, string> = {};

    if (!name) {
      fieldErrors.name = "Name is required.";
    }

    if (!email) {
      fieldErrors.email = "Email is required.";
    }

    if (!phone) {
      fieldErrors.phone = "Phone is required.";
    }

    if (!password) {
      fieldErrors.password = "Password is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        error: "Complete the required fields to continue.",
        fieldErrors,
      };
    }

    const campaignResponse = await fetch(CAMPAIGN_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const campaignResult = await readJsonResponse(campaignResponse);
    const tokens = campaignResult?.data;

    if (
      !campaignResponse.ok ||
      !tokens?.accessToken ||
      !tokens.refreshToken ||
      !tokens.idToken ||
      !tokens.expiresIn
    ) {
      return {
        error: getCampaignErrorMessage(campaignResult),
      };
    }

    const formResponse = await fetch(`/api/forms/${context.form.slug}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...context.data,
          password: "[redacted]",
          selected_search_item: selectedSuggestion,
        },
        source_url: context.sourceUrl,
      }),
    });

    const formResult = await formResponse.json();

    if (!formResponse.ok || !formResult.success) {
      return {
        error: formResult.error || "Unable to submit this form.",
        fieldErrors: formResult.fieldErrors || {},
      };
    }

    const redirectUrl = buildCampaignRedirectUrl({
      tokens,
      selectedSearchItem: selectedSuggestion,
    });

    window.location.assign(redirectUrl);

    return {
      redirecting: true,
    };
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
    <ModalPortal>
      <div
        className="hero-search-modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-lead-modal-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setIsLeadModalOpen(false);
          }
        }}
      >
        <div ref={modalRef} tabIndex={-1} className="hero-search-modal-card">
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(false)}
            className="hero-search-modal-close"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="hero-search-modal-header">
            <div className="hero-search-modal-icon">
              <ShieldCheck size={24} />
            </div>

            <p>Search Access</p>

            <h2 id="search-lead-modal-title">Unlock your property search</h2>

            <span>
              Complete the form below to continue and access Checkmate Property
              search results.
            </span>

            <div className="hero-search-modal-query">
              <p>Search query</p>
              <strong>{query.trim()}</strong>
            </div>
          </div>

          {searchForm?.form ? (
            <div className="hero-search-modal-form-shell">
              <DynamicFormComponent
                form={searchForm.form as never}
                fields={modalFields as never}
                onSubmitOverride={handleCampaignSubmit}
              />
            </div>
          ) : (
            <div className="hero-search-modal-warning">
              <strong>Search form is not configured yet.</strong>
              <br />
              Create and publish a dynamic form with slug <code>search</code> in
              the admin panel.
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  ) : null;

  return (
    <>
      <form
        ref={wrapperRef}
        onSubmit={handleSubmit}
        className="hero-location-search-form"
      >
        <div className="hero-location-search-field">
          <div className="hero-location-search-icon">
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
            className="hero-location-search-input"
          />

          {isLoading ? (
            <Loader2 size={18} className="hero-location-search-loader" />
          ) : null}

          {!isLoading && query ? (
            <button
              type="button"
              onClick={clearSearch}
              className="hero-location-search-clear"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        <button type="submit" className="hero-location-search-submit">
          Search
        </button>

        {isDropdownOpen && suggestions.length > 0 ? (
          <div className="hero-location-search-dropdown">
            <div className="hero-location-search-list">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={
                    activeIndex === index
                      ? "hero-location-search-suggestion hero-location-search-suggestion-active"
                      : "hero-location-search-suggestion"
                  }
                >
                  <span className="hero-location-search-suggestion-icon">
                    <MapPin size={17} />
                  </span>

                  <span className="hero-location-search-suggestion-content">
                    <strong>{suggestion.text}</strong>
                    <span>{suggestion.group.trim() || "Location"}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!isLoading && errorMessage && query.trim().length >= 2 ? (
          <div className="hero-location-search-error">{errorMessage}</div>
        ) : null}

        {submitMessage ? (
          <div className="hero-location-search-error hero-location-search-warning">
            {submitMessage}
          </div>
        ) : null}
      </form>

      {modal}
    </>
  );
}
