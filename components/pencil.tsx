import type React from "react"

type PencilProps = {
  children: React.ReactNode
  delay?: number
  line?: boolean
  className?: string
}

export function Pencil({ children, delay = 0, line = true, className }: PencilProps) {
  return (
    <span
      className={["pencil", line ? "pencil-lined" : "", className ?? ""].filter(Boolean).join(" ")}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span className="pencil-ink">{children}</span>
    </span>
  )
}
