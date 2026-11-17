"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useT } from "./LangProvider";
import type { Lender } from "@/lib/lenders";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function AppChecker({ lenders }: { lenders: Lender[] }) {
  const t = useT();
  const [q, setQ] = useState("");
  const [flags, setFlags] = useState<number[]>([]);

  const match = useMemo(() => {
    const n = norm(q);
    if (n.length < 3) return null;
    return lenders.filter((l) => [l.name, l.legalName, l.id].some((x) => norm(x).includes(n) || (n.length >= 5 && n.includes(norm(l.name))))).slice(0, 3);
  }, [q, lenders]);

  const score = flags.length;
  const level = score === 0 ? 0 : score <= 2 ? 1 : 2;
  const color = ["var(--seal)", "#c58a00", "var(--stamp)"][level];

  return (
    <>
      <div className="sheet">
        <div className="field" style={{ marginBottom: 0 }}>
          <label htmlFor="app">{t("nav.appcheck")}</label>
          <input id="app" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("ac.ph")} autoComplete="off" />
        </div>
        {match && match.length > 0 && (
          <div style={{ marginTop: 16 }}>
            {match.map((l) => (
              <div key={l.id} className="sheet result-ok" style={{ padding: 16, marginBottom: 10 }}>
                <h3 style={{ margin: 0 }}>✓ {t("ac.found")}</h3>
                <p style={{ margin: "6px 0 10px" }}>{t("ac.foundD", { name: l.name, legal: l.legalName })}</p>
                <Link className="btn btn-primary btn-small" href={`/shikayat?lender=${l.id}`}>{t("ac.complain")}</Link>
              </div>
            ))}
          </div>
        )}
        {match && match.length === 0 && (
          <div className="sheet result-warn" style={{ padding: 16, marginTop: 16 }}>
            <h3 style={{ margin: 0 }}>{t("ac.notFound")}</h3>
            <p style={{ margin: "6px 0 0" }}>{t("ac.notFoundD")}</p>
          </div>
        )}
      </div>

      <div className="sheet" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>{t("ac.verifyT")}</h2>
        <ol>
          <li>{t("ac.v1")}</li>
          <li>{t("ac.v2")}</li>
          <li>{t("ac.v3")}</li>
        </ol>
        <div className="btn-row">
          <a className="btn btn-ghost btn-small" href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">rbi.org.in</a>
          <a className="btn btn-ghost btn-small" href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer">sachet.rbi.org.in</a>
        </div>
      </div>

      <div className="sheet" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>{t("ac.flagsT")}</h2>
        <div className="checks">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <label key={n} className="check">
              <input type="checkbox" checked={flags.includes(n)} onChange={(e) => setFlags((p) => (e.target.checked ? [...p, n] : p.filter((x) => x !== n)))} />
              <span>{t(`ac.f${n}`)}</span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 16 }} aria-live="polite">
          <div className="meter" role="img" aria-label={t("ac.score", { n: score })}>
            <span style={{ width: `${Math.max(4, (score / 8) * 100)}%`, background: color }} />
          </div>
          <p style={{ margin: 0 }}>
            <b>{t("ac.score", { n: score })}</b> · {t(`ac.r${level}`)}
          </p>
        </div>
        {level > 0 && (
          <div className={level === 2 ? "emergency" : "notice"} style={{ marginTop: 14 }}>
            <h3 style={{ marginTop: 0 }}>{t("ac.doT")}</h3>
            <ul style={{ marginBottom: 0 }}>
              {[1, 2, 3, 4, 5].map((n) => <li key={n}>{t(`ac.d${n}`)}</li>)}
            </ul>
          </div>
        )}
        <p style={{ marginTop: 14 }}><Link href="/saboot">{t("nav.saboot")} →</Link></p>
      </div>
    </>
  );
}
