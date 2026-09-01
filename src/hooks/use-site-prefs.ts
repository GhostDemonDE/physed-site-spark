import { useEffect, useState } from "react";

export type Lang = "ru" | "en";

/**
 * Shared language + theme preference state, used by every page so the
 * toggles in the header behave consistently (and persist) across routes.
 */
export function useSitePrefs() {
  const [lang, setLang] = useState<Lang>("ru");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dcf-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(stored ? stored === "dark" : prefers);
    const storedLang = localStorage.getItem("dcf-lang");
    if (storedLang === "en" || storedLang === "ru") setLang(storedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleTheme = () => {
    setDark((d) => {
      localStorage.setItem("dcf-theme", d ? "light" : "dark");
      return !d;
    });
  };

  const switchLang = (next: Lang) => {
    setLang(next);
    localStorage.setItem("dcf-lang", next);
  };

  return { lang, dark, switchLang, toggleTheme };
}
