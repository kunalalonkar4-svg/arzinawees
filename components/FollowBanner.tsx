"use client";

// 7 din baad, isi phone par saved arzi ka jawab na aaya ho to upar ek patti dikhti hai.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "./LangProvider";
import { daysSince, deleteCase, getCases, LocalCase, today, updateLocalCase } from "@/lib/local";

export default function FollowBanner() {
  const t = useT();
  const path = usePathname();
  const [c, setC] = useState<LocalCase | null>(null);

  useEffect(() => {
    const d = today();
    // "Baad mein" dabane par 3 din tak nahi dikhega
    const due = getCases().find((x) => x.followUp && x.followUp <= d && (!x.dismissedOn || daysSince(x.dismissedOn) >= 3));
    setC(due || null);
  }, [path]);

  if (!c || path?.startsWith("/aage") || path?.startsWith("/admin") || path?.startsWith("/shikayat")) return null;

  return (
    <div className="fbanner" role="status">
      <div className="wrap">
        <p>{t("fb.text", { code: c.code, lender: c.lenderName.replace(/\s*\(.*\)\s*$/, ""), days: daysSince(c.sentOn) })}</p>
        <Link className="btn btn-primary btn-small" href={`/aage?code=${encodeURIComponent(c.code)}`}>{t("fb.go")}</Link>
        <button type="button" className="btn btn-ghost btn-small" onClick={() => { deleteCase(c.code); setC(null); }}>{t("fb.done")}</button>
        <button type="button" className="btn btn-ghost btn-small" onClick={() => { updateLocalCase(c.code, { dismissedOn: today() }); setC(null); }}>{t("fb.later")}</button>
      </div>
    </div>
  );
}
