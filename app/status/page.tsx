"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang, useT } from "@/components/LangProvider";
import { LOCALE } from "@/lib/i18n";

export default function Status() {
  const t = useT();
  const lang = useLang();
  const fmt = (d: string) => new Date(d).toLocaleDateString(LOCALE[lang]);
  const [code, setCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setRes(null);
    setBusy(true);
    try {
      const r = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, mobile }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error([400, 404, 429, 503].includes(r.status) ? t(`su.e${r.status}`) : d.error);
      setRes(d.case);
    } catch (e: any) {
      setErr(e.message || t("su.check"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="wrap narrow prose">
      <h1>{t("nav.status")}</h1>
      <p>{t("su.intro")}</p>
      <form className="sheet" onSubmit={check}>
        <div className="field">
          <label htmlFor="code">{t("su.code")}</label>
          <input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="m">{t("w.mobile")}</label>
          <input id="m" type="tel" inputMode="numeric" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <button className="btn btn-primary" disabled={busy}>
          {busy ? t("su.checking") : t("su.check")}
        </button>
        {err && <p className="err" style={{ marginTop: 12 }}>{err}</p>}
      </form>
      {res && (
        <div className="sheet" style={{ marginTop: 16 }}>
          <div className="kv">
            <span>{t("su.no")}</span><span>{res.code}</span>
            <span>{t("su.company")}</span><span>{res.lender}</span>
            <span>{t("su.date")}</span><span>{fmt(res.created_at)}</span>
          </div>
          <h3>{t(`su.st.${res.status}`)}</h3>
          {res.status === "sent" && res.follow_up_on && (
            <p>
              {t("su.follow", { date: fmt(res.follow_up_on) })} <Link href="/shikayat">{t("cta.short")} →</Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
