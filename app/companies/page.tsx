import Link from "next/link";
import { LENDERS, RBI_CRPC_EMAIL } from "@/lib/lenders";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/content/pick";
import { COMP } from "@/lib/content/companies";

export async function generateMetadata() {
  const c = pick(await getLang(), COMP);
  return { title: c.title, description: c.desc };
}

export default async function Companies() {
  const c = pick(await getLang(), COMP);
  const note = c.note.replace("{date}", LENDERS[1]?.verifiedOn || "").replace("{rbi}", RBI_CRPC_EMAIL);
  return (
    <div className="wrap" style={{ paddingBlock: "36px 64px" }}>
      <span className="eyebrow">{c.eyebrow}</span>
      <h1>{c.title}</h1>
      <p style={{ color: "var(--muted)", maxWidth: "44em" }}>{c.sub}</p>
      <div className="notice" style={{ margin: "16px 0 22px" }}>{note}</div>
      <div className="table-wrap">
        <table className="dir-table">
          <thead>
            <tr>
              <th>{c.thApp}</th>
              <th>{c.thTo}</th>
              <th>{c.thCc}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {LENDERS.map((l) => (
              <tr key={l.id}>
                <td>
                  <b>{l.name}</b>
                  <br />
                  <span className="src">{l.legalName}</span>
                </td>
                <td>{l.to.join(", ")}</td>
                <td>{l.cc.join(", ") || "—"}</td>
                <td>
                  <Link href={`/shikayat?lender=${l.id}`} className="btn btn-primary btn-small">
                    {c.send}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ marginTop: 32 }}>{c.missT}</h2>
      <ol>
        <li>{c.miss[0]}</li>
        <li>{c.miss[1]}</li>
        <li>
          <Link href="/shikayat">{c.formLink}</Link> {c.miss[2]}
        </li>
      </ol>
    </div>
  );
}
