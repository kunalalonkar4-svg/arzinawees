import type { Lang } from "@/lib/i18n";

export type ML<T> = Record<Lang, T>;
export function pick<T>(lang: Lang, m: ML<T>): T {
  return m[lang] ?? m.hi;
}
