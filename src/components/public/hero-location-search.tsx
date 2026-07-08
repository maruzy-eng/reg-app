"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";

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

export function HeroLocationSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const wrapperRef = useRef<HTMLFormElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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
    setSuggestions([]);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setErrorMessage("");
  }

  function clearSearch() {
    setQuery("");
    setSuggestions([]);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    setErrorMessage("");
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

  return (
    <form
      ref={wrapperRef}
      action="/properties"
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
    </form>
  );
}
