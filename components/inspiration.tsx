import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { unstable_ViewTransition as ViewTransition } from "react"
import type { InspirationImage } from "@/lib/inspirations"

// Shared by the link on the home page and the title of /inspiration, so the
// word travels from one to the other during the page transition.
const TITLE_TRANSITION = "inspiration-title"

// Hand-tuned placements on a 12-column grid (desktop) and width/alignment (mobile),
// cycled so every item lands at a different size and position.
const SCATTER = [
  { start: 1, span: 5, w: "82%", align: "flex-start" },
  { start: 7, span: 6, w: "92%", align: "flex-end" },
  { start: 3, span: 4, w: "64%", align: "center" },
  { start: 9, span: 4, w: "70%", align: "flex-end" },
  { start: 1, span: 7, w: "100%", align: "flex-start" },
  { start: 6, span: 3, w: "58%", align: "flex-end" },
  { start: 2, span: 5, w: "76%", align: "flex-start" },
  { start: 8, span: 5, w: "86%", align: "flex-end" },
  { start: 4, span: 6, w: "94%", align: "center" },
]

function scatter(i: number) {
  const s = SCATTER[i % SCATTER.length]
  return {
    "--start": s.start,
    "--span": s.span,
    "--w": s.w,
    "--align": s.align,
    "--push": s.align === "flex-end" ? "auto" : "0",
  }
}

export function InspirationLink({ text, suffix }: { text: string; suffix?: string }) {
  return (
    <>
      <ViewTransition name={TITLE_TRANSITION}>
        <Link href="/inspiration" className="inspiration-link">
          {text}
        </Link>
      </ViewTransition>
      {suffix}
    </>
  )
}

export function InspirationTitle() {
  return (
    <ViewTransition name={TITLE_TRANSITION}>
      <span className="inline-block">Inspiration</span>
    </ViewTransition>
  )
}

export function InspirationGallery({ images }: { images: InspirationImage[] }) {
  return (
    <ul className="inspiration-gallery">
      {images.map((image, i) => (
        <li
          key={image.id}
          className="inspiration-item"
          style={{ "--i": i, ...scatter(i), "--ar": image.width / image.height } as React.CSSProperties}
        >
          <figure className="flex flex-col gap-3">
            <Image
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 55vw, 90vw"
              className="h-auto w-full rounded-md bg-muted text-transparent"
            />
            <figcaption className="text-xs leading-relaxed">
              <span className="text-foreground">{image.title}</span>
              {image.by ? <span className="block">{image.by}</span> : null}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
