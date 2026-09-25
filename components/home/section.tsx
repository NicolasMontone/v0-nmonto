import type React from "react"
import Link from "next/link"

type SectionProps = {
  title: string
  more?: { href: string; label: string }
  children: React.ReactNode
}

export function Section({ title, more, children }: SectionProps) {
  const id = title.toLowerCase()
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h2 id={id} className="text-sm text-muted-foreground">
          {title}
        </h2>
        {more ? (
          <Link
            href={more.href}
            {...(more.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {more.label}
          </Link>
        ) : null}
      </div>
      <ul className="flex flex-col gap-6">{children}</ul>
    </section>
  )
}

type EntryProps = {
  href: string
  title: string
  description: string
  meta?: string
}

export function Entry({ href, title, description, meta }: EntryProps) {
  const external = href.startsWith("http")
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex flex-col gap-1"
      >
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-base text-foreground underline-offset-4 decoration-muted-foreground/50 group-hover:underline">
            {title}
          </span>
          {meta ? <span className="shrink-0 font-mono text-xs text-muted-foreground">{meta}</span> : null}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">{description}</span>
      </Link>
    </li>
  )
}
