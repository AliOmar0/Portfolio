import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { strings, type StringKey, type Locale } from "@/lib/i18n-strings";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  dir: "ltr" | "rtl";
  t: (key: StringKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

function readInitial(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "ar") return stored;
  const lang = window.navigator.language?.toLowerCase() ?? "en";
  return lang.startsWith("ar") ? "ar" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readInitial());

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale, dir]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = strings[locale];
    return {
      locale,
      setLocale: setLocaleState,
      toggle: () => setLocaleState((l) => (l === "en" ? "ar" : "en")),
      dir,
      t: (key) => dict[key] ?? strings.en[key] ?? key,
    };
  }, [locale, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
