import Link from "next/link";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export default async function NotFound() {
  const lang = await getLang();
  return (
    <div className="wrap narrow" style={{ paddingBlock: "72px", textAlign: "center" }}>
      <div className="stamp" style={{ position: "static", display: "inline-block", marginBottom: 18 }}>{t(lang, "nf.stamp")}</div>
      <h1>{t(lang, "nf.title")}</h1>
      <p style={{ color: "var(--muted)" }}>{t(lang, "nf.sub")}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
        <Link href="/" className="btn btn-ghost">{t(lang, "nf.home")}</Link>
        <Link href="/shikayat" className="btn btn-primary">{t(lang, "cta.start")}</Link>
      </div>
    </div>
  );
}
