"use client"

import type React from "react"
import { useRef, useState } from "react"

const CARDS = [
  { rank: "J", suit: "\u2666\uFE0E", r: -30, x: "-1.5em", y: "0.25em", d: 0 },
  { rank: "Q", suit: "\u2663\uFE0E", r: -15, x: "-0.75em", y: "-0.1em", d: 50 },
  { rank: "A", suit: "\u2660\uFE0E", r: 0, x: "0em", y: "-0.25em", d: 100 },
  { rank: "K", suit: "\u2665\uFE0E", r: 15, x: "0.75em", y: "-0.1em", d: 150 },
  { rank: "7", suit: "\u2660\uFE0E", r: 30, x: "1.5em", y: "0.25em", d: 200 },
]

const TRICK_MS = 1800

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
      <span aria-hidden="true" className="magic-deck">
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
