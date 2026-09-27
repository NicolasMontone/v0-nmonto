"use client"

import type React from "react"
import { useRef, useState } from "react"

const DOTS = [
  { x: -2.2, y: -0.35, size: 0.22, d: 0 },
  { x: -1.7, y: 0.45, size: 0.14, d: 60 },
  { x: -1.35, y: -0.7, size: 0.3, d: 30 },
  { x: -0.9, y: 0.2, size: 0.18, d: 110 },
  { x: -0.45, y: -0.5, size: 0.12, d: 80 },
  { x: -0.2, y: 0.6, size: 0.26, d: 20 },
  { x: 0.3, y: -0.25, size: 0.34, d: 50 },
  { x: 0.7, y: 0.5, size: 0.14, d: 130 },
  { x: 1.05, y: -0.65, size: 0.2, d: 90 },
  { x: 1.45, y: 0.15, size: 0.28, d: 40 },
  { x: 1.85, y: -0.3, size: 0.12, d: 150 },
  { x: 2.25, y: 0.4, size: 0.2, d: 70 },
]

const CARDS = [
  { rank: "J", suit: "\u2666\uFE0E", r: -30, x: "-1.5em", y: "0.25em", d: 0 },
  { rank: "Q", suit: "\u2663\uFE0E", r: -15, x: "-0.75em", y: "-0.1em", d: 50 },
  { rank: "A", suit: "\u2660\uFE0E", r: 0, x: "0em", y: "-0.25em", d: 100 },
  { rank: "K", suit: "\u2665\uFE0E", r: 15, x: "0.75em", y: "-0.1em", d: 150 },
  { rank: "7", suit: "\u2660\uFE0E", r: 30, x: "1.5em", y: "0.25em", d: 200 },
]

const TRICK_MS = 4600

type MagicianProps = {
  text: string
  suffix?: string
}

export function Magician({ text, suffix = "" }: MagicianProps) {
  const [run, setRun] = useState(0)
  const busyUntil = useRef(0)

  const play = () => {
    const now = performance.now()
    if (now < busyUntil.current) return
    busyUntil.current = now + TRICK_MS
    setRun((prev) => prev + 1)
  }

  return (
    <span key={run} className={run > 0 ? "magic magic-play" : "magic"} onPointerEnter={play}>
      <span className="magic-text">{text}</span>
      {suffix}
      <span aria-hidden="true" className="magic-origin">
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className="magic-dot"
            style={
              {
                "--x": `${dot.x}em`,
                "--y": `${dot.y}em`,
                "--size": `${dot.size}em`,
                "--s": `${dot.d}ms`,
              } as React.CSSProperties
            }
          />
        ))}
        <span className="magic-core" />
      </span>
      <span aria-hidden="true" className="magic-origin">
        {CARDS.map((card) => (
          <span
            key={card.rank + card.suit}
            className="magic-card"
            style={
              {
                "--r": `${card.r}deg`,
                "--x": card.x,
                "--y": card.y,
                "--s": `${card.d}ms`,
              } as React.CSSProperties
            }
          >
            <span className="magic-card-rank">{card.rank}</span>
            <span className="magic-card-suit">{card.suit}</span>
          </span>
        ))}
      </span>
    </span>
  )
}
