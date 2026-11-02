import LegalDoc from "@/components/LegalDoc";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/content/pick";
import { PRIVACY } from "@/lib/content/privacy";

export async function generateMetadata() {
  const d = pick(await getLang(), PRIVACY);
  return { title: d.title, ...(d.desc ? { description: d.desc } : {}) };
}

export default async function Page() {
  const lang = await getLang();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com";
  return <LegalDoc doc={pick(lang, PRIVACY)} vars={{ email }} langNote={lang === "hi" ? undefined : t(lang, "legal.tr")} />;
}
