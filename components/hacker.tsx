"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/_"
const TICK = 45
const TICKS_PER_LETTER = 3

type HackerProps = {
  text: string
  suffix?: string
}

export function Hacker({ text, suffix = "" }: HackerProps) {
  const [shown, setShown] = useState(text)
  const [run, setRun] = useState(0)
  const [cursor, setCursor] = useState(false)
  const running = useRef(false)

  useEffect(() => {
    if (run === 0) return
    running.current = true
    setCursor(false)
    let tick = 0
    const interval = setInterval(() => {
      tick++
      const settled = Math.floor(tick / TICKS_PER_LETTER)
      if (settled >= text.length) {
        clearInterval(interval)
        running.current = false
        setShown(text)
        setCursor(true)
        return
      }
      setShown(
        Array.from(text, (char, i) =>
          i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join(""),
      )
    }, TICK)
    return () => {
      clearInterval(interval)
      running.current = false
    }
  }, [text, run])

  const play = () => {
    if (running.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setRun((prev) => prev + 1)
  }

  return (
    <span className="whitespace-nowrap" onPointerEnter={play}>
      <span className="sr-only">
        {text}
        {suffix}
      </span>
      <span aria-hidden="true">
        {shown}
        {suffix}
        {cursor && <span key={run} className="hacker-cursor" onAnimationEnd={() => setCursor(false)} />}
      </span>
    </span>
  )
}
