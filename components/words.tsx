import type React from "react"

type WordsProps = {
  text: string
  start?: number
  step?: number
  className?: string
  accent?: (word: string, delay: number) => React.ReactNode
}

export function Words({ text, start = 0, step = 90, className, accent }: WordsProps) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word" style={{ "--d": `${start + i * step}ms` } as React.CSSProperties}>
            {accent?.(word, start + i * step) ?? word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  )
}

export function wordsEnd(text: string, start = 0, step = 90) {
  return start + text.split(" ").length * step
}

type FadeProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Fade({ children, delay = 0, className }: FadeProps) {
  return (
    <span className={["word", className ?? ""].join(" ")} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </span>
  )
}
