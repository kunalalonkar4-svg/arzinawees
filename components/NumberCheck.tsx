"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang, useT } from "./LangProvider";
import { ShareSite } from "./Tools";
import { LOCALE } from "@/lib/i18n";

type Res = { reports: number; lenders?: string[]; last?: string };
type Top = { number: string; reports: number; lenders: string[] };

export default function NumberCheck() {
  const t = useT();
  const lang = useLang();
  const [n, setN] = useState("");
  const [res, setRes] = useState<Res | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [top, setTop] = useState<Top[] | null>(null);

  useEffect(() => {
    fetch("/api/numbers?top=1")
      .then((r) => (r.ok ? r.json() : { top: [] }))
      .then((d) => setTop(d.top || []))
      .catch(() => setTop([]));
  }, []);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    const d = n.replace(/\D/g, "").slice(-10);
    setRes(null);
    if (d.length !== 10) return setErr(t("nc.bad"));
    setErr("");
    setBusy(true);
    try {
      const r = await fetch(`/api/numbers?n=${d}`);
      if (r.status === 503) throw new Error(t("nc.na"));
      if (r.status === 429) throw new Error(t("su.e429"));
      if (!r.ok) throw new Error(t("nc.bad"));
      setRes(await r.json());
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const month = (m: string) => {
    const [y, mo] = m.split("-").map(Number);
    return y ? new Date(y, mo - 1, 1).toLocaleDateString(LOCALE[lang], { month: "long", year: "numeric" }) : m;
  };

  return (
    <>
      <form className="sheet" onSubmit={check}>
        <div className="field">
          <label htmlFor="num">{t("sb.number")}</label>
          <input id="num" type="tel" inputMode="numeric" value={n} onChange={(e) => setN(e.target.value)} placeholder={t("nc.ph")} />
        </div>
        <button className="btn btn-primary" disabled={busy}>{busy ? t("su.checking") : t("nc.check")}</button>
        {err && <p className="err" style={{ marginTop: 12 }}>{err}</p>}
        {res && (
          <div className={`sheet ${res.reports ? "result-warn" : "result-ok"}`} style={{ padding: 16, marginTop: 16 }} aria-live="polite">
            {res.reports ? (
              <>
                <h3 style={{ margin: 0 }}>⚠ {t("nc.hit", { n: res.reports })}</h3>
                {res.lenders?.length ? <p style={{ margin: "6px 0 0" }}>{t("nc.cos", { list: res.lenders.join(", ") })}</p> : null}
                {res.last && <p style={{ margin: "4px 0 0" }}>{t("nc.last", { date: month(res.last) })}</p>}
              </>
            ) : (
              <>
                <h3 style={{ margin: 0 }}>{t("nc.miss")}</h3>
                <p style={{ margin: "6px 0 0" }}>{t("nc.missD")}</p>
              </>
            )}
            <div className="btn-row">
              <Link className="btn btn-primary btn-small" href="/shikayat">{t("cta.start")}</Link>
              <Link className="btn btn-ghost btn-small" href="/saboot">{t("nav.saboot")}</Link>
            </div>
          </div>
        )}
      </form>

      <div className="sheet" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: "1.3rem" }}>{t("nc.top")}</h2>
        <p style={{ color: "var(--muted)", marginTop: 0, fontSize: ".92rem" }}>{t("nc.topD")}</p>
        {top === null ? (
          <p>…</p>
        ) : top.length === 0 ? (
          <p>{t("nc.none")}</p>
        ) : (
          <div className="table-wrap">
            <table>
              <tbody>
                {top.map((r) => (
                  <tr key={r.number}>
                    <td><b style={{ fontFamily: "ui-monospace, monospace" }}>{r.number}</b></td>
                    <td>{t("nc.reports", { n: r.reports })}</td>
                    <td>{r.lenders.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="notice" style={{ marginTop: 16 }}>{t("nc.note")}</p>
      <p>{t("nc.chakshu")}</p>
      <p><a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer">sancharsaathi.gov.in</a></p>
      <ShareSite primary={false} />
    </>
  );
}
