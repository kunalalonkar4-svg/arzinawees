import { ARTICLES, type Article } from "./articles";
import type { Lang } from "./i18n";
import { EN } from "./articles/en";
import { MR } from "./articles/mr";
import { BN } from "./articles/bn";
import { TE } from "./articles/te";
import { TA } from "./articles/ta";

const BY: Record<Lang, Article[]> = { hi: ARTICLES, en: EN, mr: MR, bn: BN, te: TE, ta: TA };

// Bhasha ke hisaab se lekh; koi lekh na mile to Hindi wala
export function articlesFor(lang: Lang): Article[] {
  const list = BY[lang] || ARTICLES;
  return ARTICLES.map((h) => list.find((a) => a.slug === h.slug) || h);
}
export const articleFor = (lang: Lang, slug: string) => articlesFor(lang).find((a) => a.slug === slug);
