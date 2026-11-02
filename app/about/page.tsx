import Link from "next/link";
import Rich from "@/components/Rich";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { ABOUT } from "@/lib/content/about";

export async function generateMetadata() {
  const c = pick(await getLang(), ABOUT);
  return { title: c.title, description: c.desc };
}

export default async function About() {
  const c = pick(await getLang(), ABOUT);
  return (
    <div className="wrap narrow prose">
      <h1>{c.title}</h1>
      <p style={{ fontSize: "1.15rem" }}><Rich text={c.intro} /></p>

      <h2>{c.startT}</h2>
      <p>{c.p1}</p>
      <p>{c.p2}</p>

      <h2>{c.standT}</h2>
      <ul className="list-check list-ok">
        {c.stand.map((x, i) => <li key={i}>{x}</li>)}
      </ul>

      <h2>{c.contactT}</h2>
      <p>{c.email}: {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "arzinawees@gmail.com"}</p>
      <p>
        <Link href="/shikayat" className="btn btn-primary">{c.cta}</Link>
      </p>
    </div>
  );
}
