import NextSteps from "@/components/NextSteps";
import { LENDERS } from "@/lib/lenders";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: t(lang, "nav.aage"), description: t(lang, "ag.sub") };
}

export default async function Aage() {
  const lang = await getLang();
  return (
    <div className="wrap narrow print-solo" style={{ paddingBlock: "28px 56px" }}>
      <h1 style={{ fontSize: "clamp(1.7rem,4.5vw,2.4rem)" }} className="no-print">{t(lang, "nav.aage")}</h1>
      <p style={{ color: "var(--muted)" }} className="no-print">{t(lang, "ag.sub")}</p>
      <NextSteps lenders={LENDERS} />
    </div>
  );
}
