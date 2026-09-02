import Link from "next/link"
import { groupByDay, kindLabel, type Inspiration } from "@/lib/inspirations"

function formatDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

function Palette({ colors }: { colors: string[] }) {
  if (colors.length === 0) return null
  return (
    <ul className="flex gap-1" aria-label="Dominant colors">
      {colors.map((c) => (
        <li
          key={c}
          className="h-3 w-3 rounded-[2px] ring-1 ring-inset ring-white/10"
          style={{ backgroundColor: c }}
          title={c}
        >
          <span className="sr-only">{c}</span>
        </li>
      ))}
    </ul>
  )
}

function Media({ item }: { item: Inspiration }) {
  if (!item.media) return null
  const isSquare = item.kind === "album" || item.kind === "track"
  const { width, height } = item.media
  const ratio = isSquare ? 1 : width && height ? width / height : 4 / 3
  const alt = item.by ? `${item.title} by ${item.by}` : item.title

  return (
    // self-start keeps the frame from stretching to the text column's height;
    // the frame itself carries the image's own aspect ratio from the manifest.
    <figure
      className="self-start overflow-hidden rounded-sm bg-muted/40"
      style={{ aspectRatio: ratio }}
    >
      {/* Blob URLs are remote; a plain <img> avoids next/image domain config while
          the pile is still growing. Dimensions come from the manifest. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.media.url}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </figure>
  )
}

function Entry({ item }: { item: Inspiration }) {
  const heading = item.by ? `${item.title} — ${item.by}` : item.title
  return (
    <article className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
      <Media item={item} />
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground/70">
          {kindLabel[item.kind]}
          {item.year ? ` · ${item.year}` : ""}
        </p>
        <h3 className="text-sm text-foreground">
          {item.source ? (
            <Link
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors"
            >
              {heading}
            </Link>
          ) : (
            heading
          )}
        </h3>
        {item.note ? <p className="leading-relaxed text-muted-foreground">{item.note}</p> : null}
        {item.audio ? (
          <audio controls preload="none" src={item.audio.url} className="mt-1 h-8 w-full max-w-xs">
            <track kind="captions" />
          </audio>
        ) : null}
        <div className="mt-auto pt-1">
          <Palette colors={item.palette} />
        </div>
      </div>
    </article>
  )
}

export function InspirationFeed({ items }: { items: Inspiration[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing collected yet. The first photos and records land here as soon as they are added.
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {groupByDay(items).map(({ day, items: dayItems }) => (
        <section key={day} aria-labelledby={`day-${day}`} className="space-y-6">
          <h2 id={`day-${day}`} className="font-mono text-xs text-muted-foreground/70">
            <time dateTime={day}>{formatDay(day)}</time>
          </h2>
          <div className="space-y-8">
            {dayItems.map((item) => (
              <Entry key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
