/**
 * Etiketli nötr görsel yer tutucu.
 *
 * Sitede henüz gerçek fotoğraf yok. Her yer tutucu, oraya hangi fotoğrafın
 * geleceğini yazıyor ki çekim listesi sitenin kendisinden çıkarılabilsin.
 * Renkler tema değişkenlerinden gelir; ayrı bir görsel dosyası yüklenmez.
 */

const RATIOS = {
  "16/9": { w: 1200, h: 675 },
  "4/3": { w: 1200, h: 900 },
  "1/1": { w: 1000, h: 1000 },
  "3/4": { w: 900, h: 1200 },
} as const;

export type PlaceholderRatio = keyof typeof RATIOS;

/** Etiketi en fazla üç satıra böler; sığmayan kuyruk kırpılır. */
function wrapLabel(label: string, maxChars: number): string[] {
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

export function Placeholder({
  label,
  ratio = "16/9",
  /** Küçük kartlarda etiket okunabilir kalsın diye yazı oranı büyütülür. */
  size = "lg",
  className = "",
}: {
  label: string;
  ratio?: PlaceholderRatio;
  size?: "lg" | "sm";
  className?: string;
}) {
  const { w, h } = RATIOS[ratio];
  const patternId = `ph-hatch-${w}x${h}-${size}`;
  const fontSize = Math.round(w / (size === "sm" ? 16 : 32));
  const iconScale = (fontSize * 1.7) / 32;
  // SVG metni kendiliğinden sarmaz; etiket viewBox'a sığacak şekilde elle bölünür.
  const lines = wrapLabel(label, Math.floor((w * 0.86) / (fontSize * 0.55)));

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id={patternId}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="24" stroke="var(--border)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width={w} height={h} fill="var(--muted)" />
      <rect width={w} height={h} fill={`url(#${patternId})`} opacity="0.5" />
      <rect
        x="10"
        y="10"
        width={w - 20}
        height={h - 20}
        fill="none"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="10 8"
      />

      {/* Sade fotoğraf makinesi simgesi */}
      <g
        transform={`translate(${w / 2 - 17 * iconScale} ${h / 2 - fontSize * 2.6}) scale(${iconScale})`}
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth={2.2 / iconScale}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      >
        <path d="M4 12a2 2 0 0 1 2-2h3l2-3h10l2 3h3a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <circle cx="16" cy="20" r="6" />
      </g>

      <text
        x={w / 2}
        y={h / 2 + fontSize}
        textAnchor="middle"
        fontSize={fontSize}
        fill="var(--muted-foreground)"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.5"
      >
        {lines.map((line, i) => (
          <tspan key={line} x={w / 2} dy={i === 0 ? 0 : fontSize * 1.25}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
