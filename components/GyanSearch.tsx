"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useT } from "./LangProvider";

type Item = { slug: string; title: string; summary: string; tag: string };

// लेखों में खोज (हिंदी या Hinglish शब्द, जैसे "photo", "RBI", "धमकी")
const HINGLISH: Record<string, string> = {
  photo: "फ़ोटो", dhamki: "धमकी", gaali: "गाली", police: "पुलिस", saboot: "सबूत", emi: "EMI",
  app: "ऐप", illegal: "ग़ैर-क़ानूनी", shikayat: "शिकायत", rbi: "RBI", cyber: "साइबर",
};

export default function GyanSearch({ items }: { items: Item[] }) {
  const t = useT();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const raw = q.trim().toLowerCase();
    if (!raw) return items;
    const terms = raw.split(/\s+/);
    return items.filter((it) => {
      const hay = `${it.title} ${it.summary} ${it.tag} ${it.slug.replace(/-/g, " ")}`.toLowerCase();
      return terms.every((w) => hay.includes(w) || (HINGLISH[w] ? hay.includes(HINGLISH[w].toLowerCase()) : false));
    });
  }, [q, items]);

  return (
    <>
      <div className="search">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input id="gyan-q" type="search" placeholder={t("g.ph")} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("g.search")} />
      </div>
      {list.length ? (
        <div className="grid-cards">
          {list.map((a) => (
            <Link key={a.slug} href={`/gyan/${a.slug}`} className="card-link reveal">
              <span className="tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>{t("g.none")}</p>
      )}
    </>
  );
}
