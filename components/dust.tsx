import type React from "react"

type DustProps = {
  children: string
  delay?: number
  spread?: number
}

function seeded(text: string, index: number) {
  let h = 2166136261 ^ index
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  }
  h = Math.imul(h ^ (h >>> 15), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

export function Dust({ children, delay = 0, spread = 500 }: DustProps) {
  const words = children.split(" ")
  const total = Math.max(1, children.replace(/ /g, "").length - 1)
  let charIndex = 0

  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char) => {
                const i = charIndex++
                const r1 = seeded(children, i * 3)
                const r2 = seeded(children, i * 3 + 1)
                const r3 = seeded(children, i * 3 + 2)
                const style = {
                  "--dx": `${(-40 - r1 * 90).toFixed(1)}px`,
                  "--dy": `${((r2 - 0.5) * 14).toFixed(1)}px`,
                  "--rot": `${((r3 - 0.5) * 50).toFixed(1)}deg`,
                  "--d": `${Math.round(delay + (i / total) * spread + r3 * 220)}ms`,
                } as React.CSSProperties
                return (
                  <span key={i} className="dust-char" style={style}>
                    {char}
                  </span>
                )
              })}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  )
}
