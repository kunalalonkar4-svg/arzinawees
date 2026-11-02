"use client";

import { createContext, useCallback, useContext } from "react";
import { Lang, t as tr } from "@/lib/i18n";

const Ctx = createContext<Lang>("hi");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

export function useT() {
  const lang = useContext(Ctx);
  return useCallback((key: string, vars?: Record<string, string | number>) => tr(lang, key, vars), [lang]);
}
