import GyanSearch from "@/components/GyanSearch";
import { articlesFor } from "@/lib/articles-l";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: t(lang, "g.title"), description: t(lang, "g.desc") };
}

export default async function Gyan() {
  const lang = await getLang();
  return (
    <div className="wrap" style={{ paddingBlock: "36px 64px" }}>
      <h1>{t(lang, "g.title")}</h1>
      <p style={{ color: "var(--muted)", maxWidth: "40em" }}>{t(lang, "g.sub")}</p>
      <GyanSearch items={articlesFor(lang).map(({ slug, title, summary, tag }) => ({ slug, title, summary, tag }))} />
    </div>
  );
}
