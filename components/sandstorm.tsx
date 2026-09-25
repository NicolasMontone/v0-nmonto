"use client"

import { useEffect, useRef } from "react"

type Grain = {
  x: number
  y: number
  speed: number
  size: number
  alpha: number
  phase: number
}

const RAMP_MS = 250

export function Sandstorm({ duration = 3600 }: { duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const count = Math.min(3000, Math.round((width * height) / 320))
    const grains: Grain[] = Array.from({ length: count }, () => ({
      x: Math.random() * width * 1.6 - width * 0.6,
      y: Math.random() * height,
      speed: 700 + Math.random() * 1300,
      size: 0.8 + Math.random() * 1.8,
      alpha: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }))

    ctx.fillStyle = getComputedStyle(canvas).color

    let frame = 0
    let start = 0
    let last = 0

    const tick = (now: number) => {
      if (!start) start = last = now
      const elapsed = now - start
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const fadeStart = duration * 0.6
      const intensity =
        elapsed < RAMP_MS
          ? elapsed / RAMP_MS
          : elapsed < fadeStart
            ? 1
            : Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart))

      ctx.clearRect(0, 0, width, height)

      if (elapsed >= duration) {
        window.removeEventListener("resize", resize)
        return
      }

      for (const g of grains) {
        g.x += g.speed * dt
        g.y += Math.sin(elapsed / 260 + g.phase) * 40 * dt + 12 * dt
        if (g.x > width + 40) {
          g.x = -40 - Math.random() * width * 0.3
          g.y = Math.random() * height
        }
        if (g.y > height) g.y -= height
        ctx.globalAlpha = g.alpha * intensity
        ctx.fillRect(g.x, g.y, g.size + g.speed * 0.012, g.size)
      }
      ctx.globalAlpha = 1

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [duration])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 size-full text-foreground"
    />
  )
}
