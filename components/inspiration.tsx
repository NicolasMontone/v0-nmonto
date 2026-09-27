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
              <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 md:py-16">
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
                <ul className="columns-2 gap-4 md:columns-3">
                  {images.map((image, i) => (
                    <li
                      key={image.id}
                      className="rain-item mb-4 break-inside-avoid"
                      style={{ "--i": i + 1 } as React.CSSProperties}
                    >
                      <figure className="flex flex-col gap-2">
                        <Image
                          src={image.url}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 768px) 33vw, 50vw"
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
