import AppChecker from "@/components/AppChecker";
import { LENDERS } from "@/lib/lenders";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: t(lang, "nav.appcheck"), description: t(lang, "ac.sub") };
}

export default async function LoanAppCheck() {
  const lang = await getLang();
  return (
    <div className="wrap narrow" style={{ paddingBlock: "28px 56px" }}>
      <h1 style={{ fontSize: "clamp(1.7rem,4.5vw,2.4rem)" }}>{t(lang, "nav.appcheck")}</h1>
      <p style={{ color: "var(--muted)" }}>{t(lang, "ac.sub")}</p>
      <AppChecker lenders={LENDERS} />
    </div>
  );
}
