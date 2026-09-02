// Typed access to data/inspirations.json — the manifest behind the redesign log.
//
// Files (photos, album covers, audio) live in Vercel Blob; this JSON only holds
// their public URLs plus the metadata we want to render and reason about
// (who made it, why it matters, dominant colors). Keeping the manifest in the
// repo means the redesign log is versioned alongside the design it produced.
//
// Add entries with: node scripts/add-inspiration.mjs (see header of that file).

import { z } from "zod"
// Relative (not "@/") so vitest, which has no alias config here, resolves it too.
import raw from "../data/inspirations.json"

export const inspirationKinds = ["photo", "album", "track", "site", "note"] as const
export type InspirationKind = (typeof inspirationKinds)[number]

const mediaSchema = z.object({
  /** Public Vercel Blob URL. */
  url: z.string().url(),
  contentType: z.string(),
  /** Bytes. */
  size: z.number().int().nonnegative().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})

export const inspirationSchema = z.object({
  /** Stable slug, also used as the Blob path segment. */
  id: z.string().min(1),
  kind: z.enum(inspirationKinds),
  title: z.string().min(1),
  /** Artist, photographer, author, studio. */
  by: z.string().optional(),
  year: z.number().int().optional(),
  /** Why this is in the pile — what to steal from it. */
  note: z.string().optional(),
  /** Free-form: "grain", "type", "color", "motion", "layout"... */
  tags: z.array(z.string()).default([]),
  /** The visual: the photo itself, or the album/track cover. */
  media: mediaSchema.optional(),
  /** Optional audio file for tracks. */
  audio: mediaSchema.optional(),
  /** Where it came from: Spotify, Bandcamp, Instagram, a URL. */
  source: z.string().url().optional(),
  /** Dominant colors (hex), darkest to lightest. Filled by the add script when possible. */
  palette: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).default([]),
  /** ISO date (YYYY-MM-DD). */
  addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export const inspirationsFileSchema = z.object({
  $schema: z.string().optional(),
  version: z.literal(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  items: z.array(inspirationSchema),
})

export type Inspiration = z.infer<typeof inspirationSchema>
export type InspirationsFile = z.infer<typeof inspirationsFileSchema>

const parsed = inspirationsFileSchema.parse(raw)

/** All inspirations, newest first. */
export const inspirations: Inspiration[] = [...parsed.items].sort((a, b) =>
  a.addedAt < b.addedAt ? 1 : a.addedAt > b.addedAt ? -1 : 0,
)

export const inspirationsUpdatedAt = parsed.updatedAt

export const kindLabel: Record<InspirationKind, string> = {
  photo: "Photo",
  album: "Album",
  track: "Track",
  site: "Site",
  note: "Note",
}

/** Group newest-first items by their addedAt day, preserving order. */
export function groupByDay(items: Inspiration[]): Array<{ day: string; items: Inspiration[] }> {
  const groups: Array<{ day: string; items: Inspiration[] }> = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (last && last.day === item.addedAt) last.items.push(item)
    else groups.push({ day: item.addedAt, items: [item] })
  }
  return groups
}

/** Every distinct color across the pile, deduped, in insertion order. */
export function collectPalette(items: Inspiration[]): string[] {
  const seen = new Set<string>()
  for (const item of items) for (const c of item.palette) seen.add(c.toLowerCase())
  return [...seen]
}
