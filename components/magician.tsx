"use client"

import type React from "react"
import { useRef, useState } from "react"

const SPARKS = [
  { cx: 4, cy: 10, r: 1.6, d: 0 },
  { cx: 14, cy: 3, r: 1, d: 60 },
  { cx: 26, cy: 7, r: 2.2, d: 20 },
  { cx: 38, cy: 2, r: 1.2, d: 110 },
  { cx: 48, cy: 11, r: 1.8, d: 40 },
  { cx: 58, cy: 5, r: 1, d: 140 },
  { cx: 10, cy: 22, r: 1.2, d: 90 },
  { cx: 22, cy: 18, r: 1, d: 160 },
  { cx: 34, cy: 23, r: 1.6, d: 70 },
  { cx: 46, cy: 20, r: 1, d: 120 },
  { cx: 56, cy: 24, r: 1.4, d: 30 },
]

const TRICK_MS = 1100

type MagicianProps = {
  text: string
  suffix?: string
  delay: number
}

export function Magician({ text, suffix = "", delay }: MagicianProps) {
  const [run, setRun] = useState({ id: 0, delay })
  const busyUntil = useRef(0)

  const replay = () => {
    const now = performance.now()
    if (now < busyUntil.current || now < delay + TRICK_MS) return
    busyUntil.current = now + TRICK_MS
    setRun((prev) => ({ id: prev.id + 1, delay: 0 }))
  }

  return (
    <span
      key={run.id}
      className="magic"
      style={{ "--m": `${run.delay}ms` } as React.CSSProperties}
      onPointerEnter={replay}
    >
      <span className="magic-text">{text}</span>
      {suffix}
      <svg aria-hidden="true" viewBox="0 0 62 26" preserveAspectRatio="none" className="magic-sparks">
        {SPARKS.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="currentColor"
            className="magic-spark"
            style={{ "--s": `${run.delay + 180 + s.d}ms` } as React.CSSProperties}
          />
        ))}
      </svg>
    </span>
  )
}
