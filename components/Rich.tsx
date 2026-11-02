import Link from "next/link";
import { Fragment } from "react";

// Chhota renderer: "**bold**" aur "[text](/path)" translation strings mein
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const b = p.match(/^\*\*(.+)\*\*$/);
        if (b) return <b key={i}>{b[1]}</b>;
        const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (l) return <Link key={i} href={l[2]}>{l[1]}</Link>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
