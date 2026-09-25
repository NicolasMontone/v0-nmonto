"use client"

import { useEffect, useRef, useState } from "react"

const MAX_GRAINS = 45000
const LOOSE_GRAINS = 4000
const SETTLE_FADE_MS = 320

type Letter = {
  el: HTMLElement
  end: number
  shown: boolean
}

const rgbCache = new Map<string, [number, number, number]>()

function parseRgb(color: string): [number, number, number] {
  const cached = rgbCache.get(color)
  if (cached) return cached
  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })
  if (!probe) return [230, 230, 230]
  probe.canvas.width = probe.canvas.height = 1
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data
  const rgb: [number, number, number] = [r, g, b]
  rgbCache.set(color, rgb)
  return rgb
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export function Sandstorm() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const reveal = (el: HTMLElement) => el.setAttribute("data-shown", "")
    const chars = Array.from(document.querySelectorAll<HTMLElement>(".sand-char"))

    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach(reveal)
      setDone(true)
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      chars.forEach(reveal)
      setDone(true)
      return
    }

    let frame = 0
    let cancelled = false

    const run = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const W = Math.round(vw * dpr)
      const H = Math.round(vh * dpr)
      canvas.width = W
      canvas.height = H
      const image = ctx.createImageData(W, H)
      const buf = new Uint32Array(image.data.buffer)

      const scratch = document.createElement("canvas")
      const sctx = scratch.getContext("2d", { willReadFrequently: true })
      if (!sctx) {
        chars.forEach(reveal)
        setDone(true)
        return
      }

      const visible: { el: HTMLElement; rect: DOMRect }[] = []
      let inkEstimate = 0
      for (const el of chars) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh || rect.width === 0) {
          reveal(el)
          continue
        }
        visible.push({ el, rect })
        inkEstimate += rect.width * rect.height * dpr * dpr * 0.3
      }
      const keep = Math.min(1, MAX_GRAINS / Math.max(1, inkEstimate))

      const tx: number[] = []
      const ty: number[] = []
      const sx: number[] = []
      const sy: number[] = []
      const t0: number[] = []
      const dur: number[] = []
      const wob: number[] = []
      const col: number[] = []
      const owner: number[] = []
      const letters: Letter[] = []

      for (const { el, rect } of visible) {
        const style = getComputedStyle(el)
        const [r, g, b] = parseRgb(style.color)
        const w = Math.ceil(rect.width * dpr) + 2
        const h = Math.ceil(rect.height * dpr) + 2
        scratch.width = w
        scratch.height = h
        sctx.font = `${style.fontStyle} ${style.fontWeight} ${parseFloat(style.fontSize) * dpr}px ${style.fontFamily}`
        sctx.textBaseline = "alphabetic"
        sctx.fillStyle = "#fff"
        const m = sctx.measureText(el.textContent ?? "")
        const asc = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent
        const desc = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent
        const baseline = asc + (h - 2 - (asc + desc)) / 2
        sctx.fillText(el.textContent ?? "", 1, baseline)
        const data = sctx.getImageData(0, 0, w, h).data

        const baseDelay =
          (rect.left / vw) * 700 + (rect.top / vh) * 900 + Number(el.dataset.d ?? 0) * 0.35
        const index = letters.length
        let end = 0

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const a = data[(y * w + x) * 4 + 3]
            if (a < 90 || Math.random() > keep) continue
            const px = rect.left * dpr + x - 1
            const py = rect.top * dpr + y - 1
            const start = baseDelay + Math.random() * 450
            const d = 900 + Math.random() * 700
            tx.push(px)
            ty.push(py)
            sx.push(px - (vw * 0.5 + Math.random() * vw * 0.7) * dpr)
            sy.push(py + (Math.random() - 0.5) * 160 * dpr)
            t0.push(start)
            dur.push(d)
            wob.push(Math.random() * Math.PI * 2)
            const alpha = Math.round((a / 255) * 255)
            col.push(((alpha << 24) | (b << 16) | (g << 8) | r) >>> 0)
            owner.push(index)
            end = Math.max(end, start + d)
          }
        }
        letters.push({ el, end: end || baseDelay, shown: false })
      }

      const [fr, fg, fb] = parseRgb(getComputedStyle(canvas).color)
      const lx = new Float32Array(LOOSE_GRAINS)
      const ly = new Float32Array(LOOSE_GRAINS)
      const lv = new Float32Array(LOOSE_GRAINS)
      const la = new Uint8Array(LOOSE_GRAINS)
      for (let i = 0; i < LOOSE_GRAINS; i++) {
        lx[i] = Math.random() * W * 1.5 - W * 0.5
        ly[i] = Math.random() * H
        lv[i] = (500 + Math.random() * 900) * dpr
        la[i] = 90 + Math.floor(Math.random() * 165)
      }

      const total = tx.length
      const lastEnd = letters.reduce((max, l) => Math.max(max, l.end), 0) + SETTLE_FADE_MS
      const scroll0 = window.scrollY
      let start = 0
      let last = 0

      const plot = (x: number, y: number, c: number) => {
        const ix = x | 0
        const iy = y | 0
        if (ix < 0 || iy < 0 || ix >= W || iy >= H) return
        buf[iy * W + ix] = c
      }

      const tick = (now: number) => {
        if (cancelled) return
        if (!start) start = last = now
        const t = now - start
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const shift = (window.scrollY - scroll0) * dpr

        buf.fill(0)

        const storm = t < 1600 ? 1 : Math.max(0, 1 - (t - 1600) / 900)
        if (storm > 0) {
          for (let i = 0; i < LOOSE_GRAINS; i++) {
            lx[i] += lv[i] * dt
            ly[i] += Math.sin(t / 300 + i) * 30 * dt * dpr
            if (lx[i] > W) {
              lx[i] = -Math.random() * W * 0.2
              ly[i] = Math.random() * H
            }
            const a = (la[i] * storm) | 0
            if (a < 4) continue
            const c = ((a << 24) | (fb << 16) | (fg << 8) | fr) >>> 0
            plot(lx[i], ly[i], c)
            plot(lx[i] - 1, ly[i], c)
            plot(lx[i] - 2, ly[i], c)
            plot(lx[i], ly[i] + 1, c)
            plot(lx[i] - 1, ly[i] + 1, c)
          }
        }

        for (let i = 0; i < letters.length; i++) {
          const l = letters[i]
          if (!l.shown && t >= l.end - 120) {
            l.shown = true
            reveal(l.el)
          }
        }

        for (let i = 0; i < total; i++) {
          const local = t - t0[i]
          if (local < 0) continue
          const p = Math.min(1, local / dur[i])
          let c = col[i]
          if (p >= 1) {
            const letter = letters[owner[i]]
            const fade = 1 - (t - letter.end + 120) / SETTLE_FADE_MS
            if (letter.shown && fade <= 0) continue
            if (letter.shown) {
              const a = ((c >>> 24) * Math.max(0, Math.min(1, fade))) | 0
              c = ((a << 24) | (c & 0xffffff)) >>> 0
            }
          }
          const e = easeOut(p)
          const drift = (1 - e) * 26 * dpr
          const x = sx[i] + (tx[i] - sx[i]) * e
          const y = sy[i] + (ty[i] - sy[i]) * e + Math.sin(wob[i] + p * 9) * drift - shift
          if (p < 0.8) {
            const flying = (0xff000000 | (c & 0xffffff)) >>> 0
            plot(x, y, flying)
            plot(x + 1, y, flying)
            plot(x, y + 1, flying)
            plot(x + 1, y + 1, flying)
          } else {
            plot(x, y, c)
          }
        }

        ctx.putImageData(image, 0, 0)

        if (t > lastEnd && storm === 0) {
          letters.forEach((l) => reveal(l.el))
          setDone(true)
          return
        }
        frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
    }

    document.fonts.ready.then(() => {
      if (!cancelled) run()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      chars.forEach(reveal)
    }
  }, [])

  if (done) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 size-full text-foreground"
    />
  )
}
