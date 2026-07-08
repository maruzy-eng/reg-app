"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { MoonStar, SunMedium } from "lucide-react";

const THEME_KEY = "checkmate-admin-theme";
const THEME_CHANGE_EVENT = "checkmate-admin-theme-change";

type AdminTheme = "light" | "dark";

type AdminThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getServerTheme(): AdminTheme {
  return "light";
}

function getStoredTheme(): AdminTheme {
  if (typeof window === "undefined") {
    return getServerTheme();
  }

  return window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

export function useAdminThemeController() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme,
  );
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("admin-dark-root", isDark);

    return () => {
      document.documentElement.classList.remove("admin-dark-root");
    };
  }, [isDark]);

  function setTheme(nextTheme: AdminTheme) {
    window.localStorage.setItem(THEME_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return { isDark, toggleTheme };
}

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const theme = useAdminThemeController();

  return (
    <AdminThemeContext.Provider value={theme}>
      <main className={cn("admin-page", theme.isDark && "admin-dark")}>
        {children}
      </main>
    </AdminThemeContext.Provider>
  );
}

export function AdminThemeToggle() {
  const context = useContext(AdminThemeContext);

  if (!context) {
    return null;
  }

  const { isDark, toggleTheme } = context;
  const Icon = isDark ? SunMedium : MoonStar;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="admin-secondary-button inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
      aria-label="Toggle admin theme"
    >
      <Icon size={15} />
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
