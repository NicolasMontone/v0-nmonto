import { Fragment } from "react"
import type React from "react"

type WordsProps = {
  text: string
  start?: number
  step?: number
  className?: string
  accent?: (word: string, delay: number) => React.ReactNode
}

export function Words({ text, start = 0, step = 90, className, accent }: WordsProps) {
  // Without a stagger or accents every word would fade in identically, so one
  // span carries the whole text and the HTML stays mostly content.
  if (step === 0 && !accent) {
    return (
      <span className={className ? `word ${className}` : "word"} style={{ "--d": `${start}ms` } as React.CSSProperties}>
        {text}
      </span>
    )
  }

  const words = text.split(" ")
  const content = words.map((word, i) => (
    <Fragment key={i}>
      <span className="word" style={{ "--d": `${start + i * step}ms` } as React.CSSProperties}>
        {accent?.(word, start + i * step) ?? word}
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ))
  return className ? <span className={className}>{content}</span> : <>{content}</>
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
    <span className={className ? `word ${className}` : "word"} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </span>
  )
}
