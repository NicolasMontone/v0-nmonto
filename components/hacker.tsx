"use client"

import type React from "react"
import { useEffect, useState } from "react"

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/_"
const TICK = 45
const TICKS_PER_LETTER = 3

type HackerProps = {
  text: string
  suffix?: string
  delay: number
}

export function Hacker({ text, suffix = "", delay }: HackerProps) {
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      let tick = 0
      interval = setInterval(() => {
        tick++
        const settled = Math.floor(tick / TICKS_PER_LETTER)
        if (settled >= text.length) {
          clearInterval(interval)
          setShown(text)
          return
        }
        setShown(
          Array.from(text, (char, i) =>
            i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ).join(""),
        )
      }, TICK)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, delay])

  const cursorDelay = delay + text.length * TICKS_PER_LETTER * TICK

  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">
        {text}
        {suffix}
      </span>
      <span aria-hidden="true">
        {shown}
        {suffix}
        <span className="hacker-cursor" style={{ "--c": `${cursorDelay}ms` } as React.CSSProperties} />
      </span>
    </span>
  )
}
