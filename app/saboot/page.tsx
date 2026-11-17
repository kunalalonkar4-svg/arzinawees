import EvidenceDiary from "@/components/EvidenceDiary";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: t(lang, "nav.saboot"), description: t(lang, "sb.sub") };
}

export default async function Saboot() {
  const lang = await getLang();
  return (
    <div className="wrap narrow print-solo" style={{ paddingBlock: "28px 56px" }}>
      <h1 style={{ fontSize: "clamp(1.7rem,4.5vw,2.4rem)" }}>{t(lang, "nav.saboot")}</h1>
      <p style={{ color: "var(--muted)" }}>{t(lang, "sb.sub")}</p>
      <EvidenceDiary />
    </div>
  );
}
