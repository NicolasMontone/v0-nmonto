import type { Inspiration } from "@/lib/inspirations"

function Tile({ item }: { item: Inspiration }) {
  if (!item.media) return null
  const isSquare = item.kind === "album" || item.kind === "track"
  const { width, height } = item.media
  const ratio = isSquare ? 1 : width && height ? width / height : 4 / 3
  const alt = item.by ? `${item.title} by ${item.by}` : item.title

  const img = (
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

  return (
    // break-inside-avoid keeps a tile from being split across two columns.
    // The title lives in alt/title only; nothing is printed under the image.
    <figure className="mb-4 break-inside-avoid" title={alt}>
      {item.source ? (
        <a href={item.source} target="_blank" rel="noopener noreferrer" className="block">
          {img}
        </a>
      ) : (
        img
      )}
    </figure>
  )
}

export function InspirationFeed({ items }: { items: Inspiration[] }) {
  const withMedia = items.filter((i) => i.media)

  if (withMedia.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing collected yet. The first photos and records land here as soon as they are added.
      </p>
    )
  }

  return (
    // One CSS multi-column masonry for the whole pile: no day sections, no
    // captions, no client JS, and no layout shift because every tile already
    // knows its aspect ratio.
    <div className="columns-2 gap-4 md:columns-3">
      {withMedia.map((item) => (
        <Tile key={item.id} item={item} />
      ))}
    </div>
  )
}
