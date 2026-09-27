"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

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
  const [run, setRun] = useState({ id: 0, delay })
  const running = useRef(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      running.current = true
      let tick = 0
      interval = setInterval(() => {
        tick++
        const settled = Math.floor(tick / TICKS_PER_LETTER)
        if (settled >= text.length) {
          clearInterval(interval)
          running.current = false
          setShown(text)
          return
        }
        setShown(
          Array.from(text, (char, i) =>
            i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ).join(""),
        )
      }, TICK)
    }, run.delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
      running.current = false
    }
  }, [text, run])

  const replay = () => {
    if (running.current) return
    setRun((prev) => ({ id: prev.id + 1, delay: 0 }))
  }

  const cursorDelay = run.delay + text.length * TICKS_PER_LETTER * TICK

  return (
    <span className="whitespace-nowrap" onPointerEnter={replay}>
      <span className="sr-only">
        {text}
        {suffix}
      </span>
      <span aria-hidden="true">
        {shown}
        {suffix}
        <span
          key={run.id}
          className="hacker-cursor"
          style={{ "--c": `${cursorDelay}ms` } as React.CSSProperties}
        />
      </span>
    </span>
  )
}
