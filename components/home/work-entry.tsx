import type React from "react"
import { Fade, Words } from "@/components/words"
import type { WorkEntry as WorkEntryData, WorkItem } from "@/lib/home"

const hoverLink =
  "text-foreground underline-offset-4 decoration-muted-foreground/50 decoration-dotted hover:underline"

const inlineLink =
  "text-foreground underline decoration-dotted decoration-muted-foreground/60 underline-offset-4 transition-colors hover:decoration-foreground"

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
    <li className="grid gap-x-6 gap-y-1 text-sm leading-snug sm:grid-cols-[9.5rem_1fr]">
      <h4 className="text-foreground text-balance">
        {href ? (
          <ExternalLink href={href} className={hoverLink}>
            {title}
          </ExternalLink>
        ) : (
          title
        )}
      </h4>
      <div className="flex flex-col gap-1.5 text-muted-foreground">
        {points.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {points.map((point) => (
              <li key={point} className="text-pretty">
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        {links ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href} className={inlineLink}>
                  {link.title}
                </ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}

export function WorkEntry({ title, href, meta, description, items, delay = 0 }: WorkEntryData & { delay?: number }) {
  return (
    <li className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base">
            <ExternalLink href={href} className={hoverLink}>
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
      <ul className="word flex flex-col gap-4" style={reveal(delay)}>
        {items.map((item) => (
          <Item key={item.title} {...item} />
        ))}
      </ul>
    </li>
  )
}
