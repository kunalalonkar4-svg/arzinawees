import NumberCheck from "@/components/NumberCheck";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: t(lang, "nav.numcheck"), description: t(lang, "nc.sub") };
}

export default async function NumberCheckPage() {
  const lang = await getLang();
  return (
    <div className="wrap narrow" style={{ paddingBlock: "28px 56px" }}>
      <h1 style={{ fontSize: "clamp(1.7rem,4.5vw,2.4rem)" }}>{t(lang, "nav.numcheck")}</h1>
      <p style={{ color: "var(--muted)" }}>{t(lang, "nc.sub")}</p>
      <NumberCheck />
    </div>
  );
}
