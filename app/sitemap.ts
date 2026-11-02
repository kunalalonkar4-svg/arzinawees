import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://arzinawees.in";
  return ["", "/shikayat", "/haq", "/gyan", "/about", "/companies", "/helplines", "/kaise-kaam-karta-hai", "/format", "/contact", "/disclaimer", "/grievance", "/accessibility", "/faq", "/status", "/privacy", "/terms", ...ARTICLES.map((a) => `/gyan/${a.slug}`)].map((p) => ({
    url: `${site}${p}`,
    changeFrequency: "weekly",
  }));
}
