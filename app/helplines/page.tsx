import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { HELP } from "@/lib/content/helplines";

export async function generateMetadata() {
  const c = pick(await getLang(), HELP);
  return { title: c.title, description: c.desc };
}

const NUMS: { n: string; urgent?: boolean; web?: string }[] = [
  { n: "112", urgent: true },
  { n: "1930", web: "cybercrime.gov.in" },
  { n: "181" },
  { n: "14416" },
  { n: "14440", web: "cms.rbi.org.in" },
  { n: "15100" },
];
const SITES = ["cybercrime.gov.in", "cms.rbi.org.in", "sachet.rbi.org.in", "ncwapps.nic.in"];

export default async function Helplines() {
  const c = pick(await getLang(), HELP);
  return (
    <div className="wrap" style={{ paddingBlock: "36px 64px" }}>
      <span className="eyebrow">{c.eyebrow}</span>
      <h1>{c.title}</h1>
      <p style={{ color: "var(--muted)", maxWidth: "40em" }}>{c.sub}</p>
      <div className="help-grid" style={{ marginTop: 20 }}>
        {NUMS.map((l, i) => (
          <div key={l.n} className={`hcard${l.urgent ? " urgent" : ""}`}>
            <span>{c.lines[i][0]}</span>
            <b className="num">{l.n}</b>
            <p>{c.lines[i][1]}</p>
            {l.web && <p style={{ marginTop: 6 }}>{c.web}: {l.web}</p>}
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 36 }}>{c.onlineT}</h2>
      <ul>
        {SITES.map((s, i) => (
          <li key={s}><b>{s}</b>: {c.online[i]}</li>
        ))}
      </ul>
      <p className="notice" style={{ marginTop: 20 }}>{c.note}</p>
    </div>
  );
}
