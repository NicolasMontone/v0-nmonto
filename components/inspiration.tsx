"use client"

import Image from "next/image"
import { X } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type InspirationImage = {
  id: string
  title: string
  by?: string
  url: string
  width: number
  height: number
}

type Phase = "idle" | "drop" | "flood" | "open" | "closing"

const DROP_MS = 520
const FLOOD_MS = 1700

// Hand-tuned placements on a 12-column grid (desktop) and width/alignment (mobile),
// cycled so every item lands at a different size and position.
const SCATTER = [
  { start: 1, span: 5, w: "82%", align: "flex-start" },
  { start: 7, span: 6, w: "92%", align: "flex-end" },
  { start: 3, span: 4, w: "64%", align: "center" },
  { start: 9, span: 4, w: "70%", align: "flex-end" },
  { start: 1, span: 7, w: "100%", align: "flex-start" },
  { start: 6, span: 3, w: "58%", align: "flex-end" },
  { start: 2, span: 5, w: "76%", align: "flex-start" },
  { start: 8, span: 5, w: "86%", align: "flex-end" },
  { start: 4, span: 6, w: "94%", align: "center" },
]

function scatter(i: number) {
  const s = SCATTER[i % SCATTER.length]
  return {
    "--start": s.start,
    "--span": s.span,
    "--w": s.w,
    "--align": s.align,
    "--push": s.align === "flex-end" ? "auto" : "0",
  }
}
const CLOSE_MS = 900

type InspirationProps = {
  text: string
  suffix?: string
  images: InspirationImage[]
}

export function Inspiration({ text, suffix, images }: InspirationProps) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const timers = useRef<number[]>([])

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    if (phase === "idle") return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "open") return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // close only reads refs and setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function open(e: React.MouseEvent<HTMLButtonElement>) {
    if (phase !== "idle") return
    const rect = e.currentTarget.getBoundingClientRect()
    const fromPointer = e.detail > 0
    setOrigin({
      x: fromPointer ? e.clientX : rect.left + rect.width / 2,
      y: fromPointer ? e.clientY : rect.top + rect.height / 2,
    })
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("open")
      return
    }
    setPhase("drop")
    schedule(() => setPhase("flood"), DROP_MS)
    schedule(() => setPhase("open"), DROP_MS + FLOOD_MS)
  }

  function close() {
    setPhase("closing")
    schedule(() => {
      setPhase("idle")
      triggerRef.current?.focus()
    }, CLOSE_MS)
  }

  const style = {
    "--x": `${origin.x}px`,
    "--y": `${origin.y}px`,
    "--drop": `${DROP_MS}ms`,
    "--flood": `${FLOOD_MS}ms`,
    "--close": `${CLOSE_MS}ms`,
  } as React.CSSProperties

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={phase === "open"}
        className="inspiration-trigger"
      >
        {text}
      </button>
      {suffix}
      {phase !== "idle" &&
        createPortal(
          <div className="rain" data-phase={phase} style={style}>
            {phase === "drop" && <span className="rain-drop" aria-hidden="true" />}
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="inspiration-title"
              className="rain-flood fixed inset-0 z-50 overflow-y-auto bg-background text-muted-foreground"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 py-12 md:gap-40 md:px-10 md:py-16">
                <header className="rain-item flex items-center justify-between gap-4" style={{ "--i": 0 } as React.CSSProperties}>
                  <div className="flex flex-col gap-1">
                    <h2 id="inspiration-title" className="text-xl text-foreground">
                      Inspiration
                    </h2>
                    <p className="text-sm">{`${images.length} things I keep coming back to.`}</p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Close inspiration</span>
                  </button>
                </header>
                <ul className="rain-gallery">
                  {images.map((image, i) => (
                    <li
                      key={image.id}
                      className="rain-item"
                      style={{ "--i": i + 1, ...scatter(i), "--ar": image.width / image.height } as React.CSSProperties}
                    >
                      <figure className="flex flex-col gap-3">
                        <Image
                          src={image.url}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 768px) 55vw, 90vw"
                          className="h-auto w-full rounded-md bg-muted text-transparent"
                        />
                        <figcaption className="text-xs leading-relaxed">
                          <span className="text-foreground">{image.title}</span>
                          {image.by ? <span className="block">{image.by}</span> : null}
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {(phase === "flood" || phase === "open") && (
              <span className="rain-rings" aria-hidden="true">
                  <span className="rain-bloom" />
                  <span className="rain-ring" />
              </span>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
