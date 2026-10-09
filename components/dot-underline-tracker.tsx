"use client"

import { useEffect } from "react"

const FAR_AWAY = "-9999px"

export function DotUnderlineTracker() {
  useEffect(() => {
    let frame = 0
    let x = Number.NaN
    let y = Number.NaN

    const update = () => {
      frame = 0
      const elements = document.querySelectorAll<HTMLElement>(".dot-underline")
      for (const el of elements) {
        if (Number.isNaN(x)) {
          el.style.setProperty("--mx", FAR_AWAY)
          el.style.setProperty("--my", FAR_AWAY)
          continue
        }
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) continue
        el.style.setProperty("--mx", `${x - rect.left}px`)
        el.style.setProperty("--my", `${y - rect.bottom}px`)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      x = event.clientX
      y = event.clientY
      schedule()
    }

    const onLeave = () => {
      x = Number.NaN
      y = Number.NaN
      schedule()
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", schedule, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", schedule)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return null
}
