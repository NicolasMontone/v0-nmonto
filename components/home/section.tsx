import type React from "react"
import Link from "next/link"
import { Dust } from "@/components/dust"

type SectionProps = {
  title: string
  more?: { href: string; label: string }
  delay?: number
  children: React.ReactNode
}

export function Section({ title, more, delay = 0, children }: SectionProps) {
  const id = title.toLowerCase()
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h2 id={id} className="text-sm text-muted-foreground">
          <Dust delay={delay}>{title}</Dust>
        </h2>
        {more ? (
          <Link
            href={more.href}
            {...(more.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Dust delay={delay}>{more.label}</Dust>
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
            <Dust delay={delay}>{title}</Dust>
          </span>
          {meta ? (
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              <Dust delay={delay + 100}>{meta}</Dust>
            </span>
          ) : null}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          <Dust delay={delay + 150} spread={700}>
            {description}
          </Dust>
        </span>
      </Link>
    </li>
  )
}
