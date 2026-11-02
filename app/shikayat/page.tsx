import Script from "next/script";
import Wizard from "@/components/Wizard";
import { LENDERS } from "@/lib/lenders";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  return { title: t(await getLang(), "cta.short") };
}

export default async function Shikayat() {
  const lang = await getLang();
  return (
    <div className="wrap narrow" style={{ paddingBlock: "28px 56px" }}>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <h1 style={{ fontSize: "clamp(1.7rem,4.5vw,2.4rem)" }}>{t(lang, "w.title")}</h1>
      <p style={{ color: "var(--muted)" }}>{t(lang, "w.sub")}</p>
      <Wizard lenders={LENDERS} googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""} />
    </div>
  );
}
