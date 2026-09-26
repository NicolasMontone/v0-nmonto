import type React from "react"
import Link from "next/link"
import { Fade, Words } from "@/components/words"

type SectionProps = {
  title: string
  glyph?: React.ReactNode
  more?: { href: string; label: string }
  delay?: number
  children: React.ReactNode
}

export function Section({ title, glyph, more, delay = 0, children }: SectionProps) {
  const id = title.toLowerCase()
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3">
          {glyph}
          <h2 id={id} className="text-sm text-muted-foreground">
            <Words text={title} start={delay + 250} />
          </h2>
        </div>
        {more ? (
          <Link
            href={more.href}
            {...(more.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Fade delay={delay + 400}>{more.label}</Fade>
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
  delay?: number
}

export function Entry({ href, title, description, meta, delay = 0 }: EntryProps) {
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
            <Words text={title} start={delay} step={110} />
          </span>
          {meta ? (
            <Fade delay={delay + 200} className="shrink-0 font-mono text-xs text-muted-foreground">
              {meta}
            </Fade>
          ) : null}
        </span>
        <Fade delay={delay + 300} className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </Fade>
      </Link>
    </li>
  )
}
