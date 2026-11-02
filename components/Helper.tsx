"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useT } from "./LangProvider";

// "क्या करूँ?" गाइड: तय जवाब, कोई AI नहीं, ताकि ग़लत सलाह का ख़तरा न रहे.
type Item = { q: string; a: string[]; links: [string, string][] };

const ITEMS: Item[] = [
  { q: "h1.q", a: ["h1.a1", "h1.a2", "h1.a3"], links: [["/shikayat", "hl.send"], ["/gyan/agent-gaali-de-to-kya-karein", "hl.read"]] },
  { q: "h2.q", a: ["h2.a1", "h2.a2", "h2.a3", "h2.a4"], links: [["/shikayat", "hl.co"], ["/gyan/police-aur-cyber-complaint", "hl.police"]] },
  { q: "h3.q", a: ["h3.a1", "h3.a2", "h3.a3"], links: [["/gyan/photo-morph-ki-dhamki", "hl.read"], ["/shikayat", "hl.co"]] },
  { q: "h4.q", a: ["h4.a1", "h4.a2", "h4.a3"], links: [["/gyan/illegal-loan-app-kaise-pehchanein", "hl.identify"]] },
  { q: "h5.q", a: ["h5.a1", "d.n3"], links: [["/status", "hl.status"], ["/gyan/rbi-mein-shikayat-kaise-karein", "hl.rbi"]] },
  { q: "h6.q", a: ["h6.a1", "h6.a2", "h6.a3"], links: [] },
];

export default function Helper() {
  const path = usePathname();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  // Form aur admin par button nahi, taaki "आगे" button na dhake
  if (path?.startsWith("/admin") || path?.startsWith("/shikayat")) return null;

  return (
    <>
      {open && (
        <div className="helper-panel" role="dialog" aria-label={t("hp.title")}>
          {sel === null ? (
            <>
              <h3>{t("hp.title")}</h3>
              <p style={{ color: "var(--muted)", margin: 0, fontSize: ".95rem" }}>{t("hp.pick")}</p>
              <div className="helper-opts">
                {ITEMS.map((it, i) => (
                  <button key={i} type="button" onClick={() => setSel(i)}>
                    {t(it.q)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="helper-ans">
              <button type="button" className="btn btn-ghost btn-small" onClick={() => setSel(null)}>
                {t("hp.back")}
              </button>
              <h3 style={{ marginTop: 12 }}>{t(ITEMS[sel].q)}</h3>
              <ul>
                {ITEMS[sel].a.map((x) => (
                  <li key={x}>{t(x)}</li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ITEMS[sel].links.map(([href, label], i) => (
                  <Link key={href} href={href} className={`btn btn-small ${i === 0 ? "btn-primary" : "btn-ghost"}`} onClick={() => setOpen(false)}>
                    {t(label)}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <p style={{ fontSize: ".8rem", color: "var(--muted)", margin: "14px 0 0" }}>{t("hp.note")}</p>
        </div>
      )}
      <button
        type="button"
        className="helper-fab"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setSel(null);
        }}
      >
        {open ? `✕ ${t("hp.close")}` : t("hp.title")}
      </button>
    </>
  );
}
