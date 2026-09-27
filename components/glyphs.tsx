import type React from "react"

type GlyphProps = { delay?: number }

const svgProps = {
  viewBox: "0 0 48 32",
  "aria-hidden": true,
  focusable: false,
  className: "h-10 w-15 overflow-visible text-foreground",
} as const

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export function ConnectionGlyph({ delay = 0 }: GlyphProps) {
  return (
    <svg {...svgProps}>
      <line
        x1="8"
        y1="7"
        x2="38"
        y2="25"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="0.75"
        className="glyph-line"
        style={at(delay + 350)}
      />
      <circle cx="8" cy="7" r="4.5" fill="currentColor" className="glyph-dot" style={at(delay)} />
      <circle cx="38" cy="25" r="4.5" fill="currentColor" className="glyph-dot" style={at(delay + 180)} />
    </svg>
  )
}

const burst: Array<[number, number, number]> = [
  [24, 16, 3.6],
  [18.5, 19.5, 2.2],
  [30.5, 15.5, 2],
  [20.5, 9.5, 1.3],
  [27, 7.5, 1.9],
  [16, 13, 1.4],
  [33.5, 7, 1.7],
  [22, 23.5, 1.5],
  [29, 21, 0.9],
  [14, 20.5, 1.2],
  [36, 20, 1],
  [11, 8, 1],
  [12, 25.5, 1.3],
  [31, 28.5, 1],
  [25.5, 11.5, 0.7],
  [19, 15, 0.7],
  [34, 12, 0.6],
  [26.5, 20, 0.6],
  [17.5, 5.5, 0.6],
  [9, 17, 0.8],
]

export function SurpriseGlyph({ delay = 0 }: GlyphProps) {
  return (
    <svg {...svgProps}>
      {burst.map(([cx, cy, r], i) => {
        const distance = Math.hypot(cx - 24, cy - 16)
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="currentColor"
            className="glyph-pop"
            style={at(delay + Math.round(distance * 28))}
          />
        )
      })}
    </svg>
  )
}

export function LoveGlyph({ delay = 0 }: GlyphProps) {
  return (
    <svg {...svgProps}>
      <defs>
        <clipPath id="love-glyph-left">
          <circle cx="18" cy="16" r="10" className="glyph-slide-left" style={at(delay)} />
        </clipPath>
      </defs>
      <circle cx="18" cy="16" r="10" fill="currentColor" className="glyph-slide-left" style={at(delay)} />
      <circle cx="30" cy="16" r="10" fill="currentColor" className="glyph-slide-right" style={at(delay)} />
      <g clipPath="url(#love-glyph-left)">
        <circle
          cx="30"
          cy="16"
          r="10"
          fill="var(--background)"
          className="glyph-slide-right"
          style={at(delay)}
        />
      </g>
    </svg>
  )
}
