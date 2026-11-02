"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGS, Lang } from "@/lib/i18n";
import { useLang, useT } from "./LangProvider";

export default function LangSwitcher({ id = "lang-select", wide = false }: { id?: string; wide?: boolean }) {
  const lang = useLang();
  const t = useT();
  const router = useRouter();
  const [pending, start] = useTransition();

  function change(next: Lang) {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem("lang", next);
    } catch {}
    document.documentElement.lang = next;
    start(() => router.refresh());
  }

  return (
    <label className={`lang-sel${wide ? " wide" : ""}`} htmlFor={id} title={t("lang.label")}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </svg>
      <select id={id} value={lang} onChange={(e) => change(e.target.value as Lang)} aria-label={t("lang.label")} disabled={pending}>
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
