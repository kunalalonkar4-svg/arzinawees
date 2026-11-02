import Rich from "./Rich";

export type Block = { h?: string; p?: string; ul?: string[]; ol?: string[]; note?: string };
export type Doc = { title: string; desc?: string; blocks: Block[] };

// Kanooni / jaankari wale pages ek hi dhaanche se banate hain
export default function LegalDoc({ doc, vars, langNote }: { doc: Doc; vars?: Record<string, string>; langNote?: string }) {
  const fill = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => vars?.[k] ?? `{${k}}`);
  return (
    <div className="wrap narrow prose">
      <h1>{doc.title}</h1>
      {langNote && <p className="notice">{langNote}</p>}
      {doc.blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h2>{b.h}</h2>}
          {b.note && <p className="notice"><Rich text={fill(b.note)} /></p>}
          {b.p && <p><Rich text={fill(b.p)} /></p>}
          {b.ul && <ul>{b.ul.map((x, j) => <li key={j}><Rich text={fill(x)} /></li>)}</ul>}
          {b.ol && <ol>{b.ol.map((x, j) => <li key={j}><Rich text={fill(x)} /></li>)}</ol>}
        </div>
      ))}
    </div>
  );
}
