// Images shown on /inspiration, read from the manifest that
// scripts/add-inspiration.mjs maintains. Shared by the page and its Markdown twin.

import manifest from "../data/inspirations.json"

export type InspirationImage = {
  id: string
  title: string
  by?: string
  url: string
  width: number
  height: number
}

export const inspirationImages: InspirationImage[] = manifest.items
  .filter((item) => item.media?.contentType?.startsWith("image/"))
  .map((item) => ({
    id: item.id,
    title: item.title,
    by: item.by,
    url: item.media.url,
    width: item.media.width ?? 1200,
    height: item.media.height ?? 800,
  }))
