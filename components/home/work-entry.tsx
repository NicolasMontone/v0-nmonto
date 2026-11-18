import type React from "react"
import { Fade, Words } from "@/components/words"
import type { WorkEntry as WorkEntryData, WorkItem } from "@/lib/home"

const linkClass =
  "text-foreground underline-offset-4 decoration-muted-foreground/50 decoration-dotted hover:underline"

function reveal(delay: number) {
  return { "--d": `${delay}ms` } as React.CSSProperties
}

function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function Item({ title, href, points, links }: WorkItem) {
  return (
    <li className="flex flex-col gap-1.5">
      <h4 className="text-sm text-foreground">
        {href ? (
          <ExternalLink href={href} className={linkClass}>
            {title}
          </ExternalLink>
        ) : (
          title
        )}
      </h4>
      <ul className="flex flex-col gap-1 text-sm leading-relaxed text-muted-foreground">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span aria-hidden="true" className="text-muted-foreground/50">
              –
            </span>
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>
      {links ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <ExternalLink href={link.href} className={linkClass}>
                {link.title}
              </ExternalLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function WorkEntry({ title, href, meta, description, items, delay = 0 }: WorkEntryData & { delay?: number }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base">
            <ExternalLink href={href} className={linkClass}>
              <Words text={title} start={delay} step={0} />
            </ExternalLink>
          </h3>
          {meta ? (
            <Fade delay={delay} className="shrink-0 font-mono text-xs text-muted-foreground">
              {meta}
            </Fade>
          ) : null}
        </div>
        {description ? (
          <Fade delay={delay} className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </Fade>
        ) : null}
      </div>
      <ul className="word flex flex-col gap-4 border-l border-border pl-4" style={reveal(delay)}>
        {items.map((item) => (
          <Item key={item.title} {...item} />
        ))}
      </ul>
    </li>
  )
}
