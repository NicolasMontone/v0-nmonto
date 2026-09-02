import Link from "next/link"
import { groupByDay, type Inspiration } from "@/lib/inspirations"

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
          className="h-2.5 w-2.5 rounded-[2px] ring-1 ring-inset ring-white/10"
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
    // The frame carries the image's own aspect ratio from the manifest, so the
    // masonry columns can be laid out before any image has loaded.
    <div className="overflow-hidden rounded-sm bg-muted/40" style={{ aspectRatio: ratio }}>
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
    </div>
  )
}

function Tile({ item }: { item: Inspiration }) {
  const heading = item.by ? `${item.title} — ${item.by}` : item.title
  return (
    // break-inside-avoid keeps a tile from being split across two columns.
    <figure className="mb-4 break-inside-avoid">
      <Media item={item} />
      <figcaption className="mt-2 flex flex-col gap-1.5">
        <p className="text-xs leading-snug text-muted-foreground">
          {item.source ? (
            <Link
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {heading}
            </Link>
          ) : (
            heading
          )}
        </p>
        {item.audio ? (
          <audio controls preload="none" src={item.audio.url} className="h-8 w-full">
            <track kind="captions" />
          </audio>
        ) : null}
        <Palette colors={item.palette} />
      </figcaption>
    </figure>
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
        <section key={day} aria-labelledby={`day-${day}`} className="space-y-4">
          <h2 id={`day-${day}`} className="font-mono text-xs text-muted-foreground/70">
            <time dateTime={day}>{formatDay(day)}</time>
          </h2>
          {/* CSS multi-column masonry: no client JS, and no layout shift because
              every tile already knows its aspect ratio. Items flow down each
              column in turn, which is fine for a same-day pile. */}
          <div className="columns-2 gap-4 md:columns-3">
            {dayItems.map((item) => (
              <Tile key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
