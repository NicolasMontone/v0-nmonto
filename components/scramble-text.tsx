"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#"

type ScrambleTextProps = {
  text: string
  className?: string
  /** ms between animation frames */
  speed?: number
  /** how many frames each character stays scrambled before locking in */
  revealDelay?: number
}

/**
 * Renders `text` and, after mount, animates it in as if it were being
 * decrypted from random glyphs. Re-scrambles on hover/focus. The real text is
 * rendered on first paint, so SSR/SEO/accessibility stay intact and there is no
 * hydration mismatch. Honors prefers-reduced-motion.
 */
export function ScrambleText({ text, className, speed = 45, revealDelay = 2 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const [scrambling, setScrambling] = useState(false)
  const frameRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scramble = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    if (timerRef.current) clearInterval(timerRef.current)

    const chars = text.split("")
    let frame = 0
    setScrambling(true)

    timerRef.current = setInterval(() => {
      const revealed = Math.floor(frame / revealDelay)
      const next = chars
        .map((char, i) => {
          if (char === " ") return " "
          if (i < revealed) return char
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")

      setDisplay(next)
      frame += 1

      if (revealed >= chars.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setDisplay(text)
        setScrambling(false)
      }
    }, speed)
  }, [text, speed, revealDelay])

  useEffect(() => {
    // Kick off the reveal shortly after mount.
    frameRef.current = window.setTimeout(scramble, 120)
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [scramble])

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onFocus={scramble}
      tabIndex={0}
      data-scrambling={scrambling}
      style={{ fontVariantLigatures: "none" }}
    >
      <span className={scrambling ? "font-mono" : undefined} aria-hidden={scrambling}>
        {display}
      </span>
      {/* Keep the true text available to assistive tech at all times */}
      {scrambling ? <span className="sr-only">{text}</span> : null}
    </span>
  )
}
