"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type PropertyBackButtonProps = {
  fallbackHref?: string;
};

export function PropertyBackButton({
  fallbackHref = "/properties",
}: PropertyBackButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  function getFallbackUrl() {
    if (from === "projects") {
      return "/projects#projects";
    }

    if (from === "home") {
      return "/";
    }

    if (from === "search") {
      return "/properties";
    }

    return fallbackHref;
  }

  function getLabel() {
    if (from === "projects") {
      return "Back to projects";
    }

    if (from === "home") {
      return "Back to home";
    }

    return "Back to properties";
  }

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(getFallbackUrl());
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0e3541] shadow-sm transition hover:border-[#53bc76]/40 hover:text-[#39aff2]"
    >
      <ArrowLeft size={16} />
      {getLabel()}
    </button>
  );
}