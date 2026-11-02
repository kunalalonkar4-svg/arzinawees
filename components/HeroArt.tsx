// Hero illustration: phone par Arzinawees form bhara ja raha hai -> arzi stamp ke saath chali gayi
const T = { fontFamily: "var(--body)" };

// Lambi bhasha ka text box se bahar na jaye: zarurat ho to daba do
function fit(text: string, maxPx: number, size: number) {
  const est = text.length * size * 0.55;
  return est > maxPx ? { textLength: maxPx, lengthAdjust: "spacingAndGlyphs" as const } : {};
}

function Check({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width="14" height="14" rx="3" fill="#2fb386" />
      <path d={`M${x + 3.5} ${y + 7.5} l3 3 l5 -6`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x + 22} y={y + 11.5} fontSize="12" fill="#dfe6ff" style={T} {...fit(label, 128, 12)}>
        {label}
      </text>
    </g>
  );
}

export default function HeroArt({ l }: { l: (k: string) => string }) {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 440 460">
        <defs>
          <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1d2a5c" />
            <stop offset="1" stopColor="#141d42" />
          </linearGradient>
        </defs>

        {/* phone with the complaint form */}
        <g className="float-b">
          <rect x="14" y="34" width="210" height="390" rx="30" fill="url(#ph)" stroke="#3a4a86" strokeWidth="2" />
          <rect x="28" y="56" width="182" height="346" rx="16" fill="#0f1733" />
          <rect x="94" y="44" width="50" height="6" rx="3" fill="#3a4a86" />

          {/* app bar */}
          <circle cx="46" cy="76" r="8" fill="none" stroke="#e3b341" strokeWidth="2" />
          <path d="M46 70 L49 76 L46 82 L43 76 Z" fill="#e3b341" />
          <text x="60" y="80" fontSize="12" fontWeight="700" fill="#f2f5ff" style={T}>Arzinawees</text>
          <rect x="40" y="92" width="158" height="4" rx="2" fill="#26315f" />
          <rect x="40" y="92" width="126" height="4" rx="2" fill="#2fb386" />

          <text x="40" y="118" fontSize="15" fontWeight="700" fill="#f2f5ff" style={T}>{l("ha.form")}</text>

          {/* lender field */}
          <text x="40" y="138" fontSize="10" fill="#9aa8d6" style={T}>{l("ha.app")}</text>
          <rect x="40" y="144" width="158" height="26" rx="7" fill="#1a2550" stroke="#33407a" />
          <text x="50" y="161" fontSize="12" fill="#f2f5ff" style={T}>KreditBee</text>
          <path d="M184 154 l4 4 l4 -4" stroke="#9aa8d6" strokeWidth="1.6" fill="none" />

          {/* what happened */}
          <text x="40" y="188" fontSize="10" fill="#9aa8d6" style={T}>{l("ha.what")}</text>
          <Check x={40} y={196} label={l("ha.c1")} />
          <Check x={40} y={218} label={l("ha.c2")} />
          <Check x={40} y={240} label={l("ha.c3")} />

          {/* evidence */}
          <text x="40" y="276" fontSize="10" fill="#9aa8d6" style={T}>{l("ha.ev")}</text>
          <g>
            <rect x="40" y="282" width="34" height="44" rx="5" fill="#2a1a24" stroke="#5a2b36" />
            <rect x="45" y="290" width="22" height="4" rx="2" fill="#ff7b6e" />
            <rect x="45" y="298" width="16" height="4" rx="2" fill="#ff7b6e" opacity=".6" />
            <rect x="80" y="282" width="34" height="44" rx="5" fill="#2a1a24" stroke="#5a2b36" />
            <rect x="85" y="290" width="22" height="4" rx="2" fill="#ff7b6e" />
            <rect x="85" y="298" width="18" height="4" rx="2" fill="#ff7b6e" opacity=".6" />
            <rect x="120" y="282" width="34" height="44" rx="5" fill="#1a2550" stroke="#33407a" />
            <rect x="125" y="290" width="22" height="4" rx="2" fill="#8b9bd6" />
            <rect x="125" y="298" width="14" height="4" rx="2" fill="#8b9bd6" opacity=".6" />
            <text x="164" y="309" fontSize="12" fill="#9aa8d6" style={T}>+3</text>
          </g>

          {/* send button + tap */}
          <rect x="40" y="342" width="158" height="38" rx="19" fill="#e3b341" />
          <text x="110" y="366" fontSize="13" fontWeight="700" fill="#1c1600" textAnchor="middle" style={T} {...fit(l("ha.send"), 104, 13)}>{l("ha.send")}</text>
          <circle className="tap-ring" cx="172" cy="361" r="12" fill="none" stroke="#fff" strokeWidth="2.5" />
          <circle cx="172" cy="361" r="5" fill="#fff" opacity=".9" />
        </g>

        {/* incoming threat notification (before) */}
        <g className="float-a">
          <rect x="150" y="6" width="176" height="44" rx="12" fill="#3b1a22" stroke="#7a2e3a" />
          <circle cx="172" cy="28" r="11" fill="#e5484d" />
          <path d="M172 21v9M172 34h.01" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <text x="190" y="25" fontSize="11" fontWeight="700" fill="#ffb4ac" style={T}>Unknown: +91 88XXX</text>
          <text x="190" y="41" fontSize="11" fill="#ffd9d4" style={T} {...fit(l("ha.quote"), 128, 11)}>{l("ha.quote")}</text>
        </g>

        {/* flying arrow to the sent arzi */}
        <path d="M222 330 C 262 312, 268 300, 282 286" stroke="#e3b341" strokeWidth="3" fill="none" strokeDasharray="6 6" />
        <path d="M274 282 l10 2 -3 10" stroke="#e3b341" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* the sent arzi (after) */}
        <g className="float-a">
          <g transform="rotate(5 340 250)">
            <rect x="250" y="120" width="176" height="232" rx="10" fill="#fbfcff" />
            <text x="266" y="146" fontSize="10" fill="#5b6478" style={T}>To: grievance officer</text>
            <text x="266" y="160" fontSize="10" fill="#5b6478" style={T}>CC: crpc@rbi.org.in</text>
            <rect x="266" y="168" width="144" height="1.5" fill="#dde1ea" />
            <text x="266" y="186" fontSize="11" fontWeight="700" fill="#16224a" style={T}>Complaint against</text>
            <text x="266" y="200" fontSize="11" fontWeight="700" fill="#16224a" style={T}>recovery agents</text>
            <rect x="266" y="212" width="140" height="4" rx="2" fill="#dde1ea" />
            <rect x="266" y="222" width="128" height="4" rx="2" fill="#dde1ea" />
            <rect x="266" y="232" width="140" height="4" rx="2" fill="#dde1ea" />
            <rect x="266" y="242" width="110" height="4" rx="2" fill="#dde1ea" />
            <rect x="266" y="256" width="136" height="4" rx="2" fill="#dde1ea" />
            <rect x="266" y="266" width="96" height="4" rx="2" fill="#dde1ea" />
            <text x="266" y="288" fontSize="10" fill="#5b6478" style={T}>📎 4 screenshots</text>
            {/* stamp */}
            <g transform="rotate(-14 350 318)">
              <rect x="296" y="300" width="108" height="38" rx="6" fill="none" stroke="#0b6e4f" strokeWidth="3" />
              <rect x="301" y="305" width="98" height="28" rx="4" fill="none" stroke="#0b6e4f" strokeWidth="1.2" />
              <text x="350" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0b6e4f" style={T} {...fit(l("ha.stamp"), 90, 14)}>
                {l("ha.stamp")}
              </text>
            </g>
          </g>
          {/* gmail sent badge */}
          <rect x="300" y="366" width="128" height="30" rx="15" fill="#0b6e4f" />
          <path d="M316 381 l4 4 l8 -9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="336" y="386" fontSize="12" fontWeight="700" fill="#fff" style={T} {...fit(l("ha.gmail"), 84, 12)}>{l("ha.gmail")}</text>
        </g>
      </svg>
    </div>
  );
}
