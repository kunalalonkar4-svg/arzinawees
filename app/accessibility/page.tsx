import LegalDoc from "@/components/LegalDoc";
import { getLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/content/pick";
import { ACCESS } from "@/lib/content/legal";

export async function generateMetadata() {
  const d = pick(await getLang(), ACCESS);
  return { title: d.title, ...(d.desc ? { description: d.desc } : {}) };
}

export default async function Page() {
  const lang = await getLang();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com";
  return <LegalDoc doc={pick(lang, ACCESS)} vars={{ email }} langNote={undefined} />;
}
