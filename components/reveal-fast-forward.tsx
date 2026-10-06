"use client"

import { useEffect } from "react"

const REVEAL_ANIMATIONS = new Set([
  "word-in",
  "glyph-dot",
  "glyph-line",
  "glyph-slide-left",
  "glyph-slide-right",
])
const COMPRESSION = 0.12
const MAX_REMAINING_MS = 500
const TRIGGERS = ["wheel", "touchmove", "scroll", "keydown"] as const

// The intro reveals the page block by block over ~2s. If the visitor scrolls before it finishes,
// compress the pending reveals so content below the fold never sits blank.
function fastForward() {
  const now = document.timeline.currentTime
  if (typeof now !== "number") return

  for (const animation of document.getAnimations()) {
    if (!(animation instanceof CSSAnimation) || !REVEAL_ANIMATIONS.has(animation.animationName)) continue
    const delay = Number(animation.effect?.getTiming().delay ?? 0)
    const elapsed = Number(animation.currentTime ?? 0)
    const remaining = delay - elapsed
    if (remaining <= 0) continue
    const compressed = Math.min(remaining * COMPRESSION, MAX_REMAINING_MS)
    animation.startTime = now + compressed - delay
  }
}

export function RevealFastForward() {
  useEffect(() => {
    let done = false
    const handle = () => {
      if (done) return
      done = true
      fastForward()
      for (const type of TRIGGERS) window.removeEventListener(type, handle)
    }
    for (const type of TRIGGERS) window.addEventListener(type, handle, { passive: true })
    return () => {
      for (const type of TRIGGERS) window.removeEventListener(type, handle)
    }
  }, [])

  return null
}
