import Link from "next/link";
import Rich from "@/components/Rich";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { HAQ } from "@/lib/content/haq";

export async function generateMetadata() {
  return { title: pick(await getLang(), HAQ).title };
}

export default async function Haq() {
  const c = pick(await getLang(), HAQ);
  return (
    <div className="wrap narrow prose">
      <h1>{c.h1}</h1>
      <p>{c.intro}</p>

      <h2>{c.cantT}</h2>
      <ul className="list-check">
        {c.cant.map((x, i) => <li key={i}>{x}</li>)}
      </ul>

      <h2>{c.canT}</h2>
      <ul className="list-check list-ok">
        {c.can.map((x, i) => <li key={i}><Rich text={x} /></li>)}
      </ul>

      <h2>{c.illegalT}</h2>
      <p>{c.illegal}</p>

      <div className="notice" style={{ marginTop: 24 }}>{c.note}</div>

      <p style={{ marginTop: 28 }}>
        <Link href="/shikayat" className="btn btn-primary">{c.cta}</Link>
      </p>
    </div>
  );
}
