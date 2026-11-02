"use client";

import { useEffect, useState } from "react";
import { useT } from "./LangProvider";

// Light / Dark button. Pehli baar phone ki setting maani jaati hai.
export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  const t = useT();

  useEffect(() => {
    const v = document.documentElement.dataset.theme;
    setDark(v ? v === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  function flip() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  const label = dark ? t("theme.light") : t("theme.dark");
  return (
    <button type="button" className="theme-btn" onClick={flip} aria-label={label} title={label}>
      {dark === null ? null : dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" /></svg>
      )}
    </button>
  );
}
