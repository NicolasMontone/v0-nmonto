#!/usr/bin/env node
// Adds one inspiration to data/inspirations.json, uploading any files to
// Vercel Blob (public store) first.
//
// Usage (needs BLOB_READ_WRITE_TOKEN in the environment):
//
//   node --env-file-if-exists=.env.local scripts/add-inspiration.mjs \
//     --kind photo|album|track|site|note \
//     --title "Mezzanine" \
//     [--by "Massive Attack"] [--year 1998] \
//     [--note "why it matters"] [--tags grain,type,color] \
//     [--source https://open.spotify.com/...] \
//     [--file ./cover.jpg | https://...]   # the visual (photo or cover)
//     [--audio ./track.mp3 | https://...]  # optional audio for tracks
//     [--id custom-slug] [--date 2026-09-01]
//
// Re-running with the same --id overwrites the entry and the Blob files, so
// fixing a typo is just running the command again.

import { readFile, writeFile } from "node:fs/promises"
import { extname, resolve } from "node:path"
import { put } from "@vercel/blob"
import sharp from "sharp"

const MANIFEST = resolve(process.cwd(), "data/inspirations.json")
const KINDS = new Set(["photo", "album", "track", "site", "note"])

// ---------------------------------------------------------------------------
// args

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith("--")) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith("--")) args[key] = true
    else {
      args[key] = next
      i++
    }
  }
  return args
}

function fail(msg) {
  console.error(`\n  error: ${msg}\n`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// helpers

function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".flac": "audio/flac",
}

const EXT_BY_MIME = Object.fromEntries(Object.entries(MIME_BY_EXT).map(([e, m]) => [m, e]))

/** Read a local path or fetch a URL. Returns { buffer, contentType, ext }. */
async function loadInput(input) {
  if (/^https?:\/\//.test(input)) {
    const res = await fetch(input)
    if (!res.ok) fail(`could not fetch ${input}: ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const headerType = (res.headers.get("content-type") ?? "").split(";")[0].trim()
    const urlExt = extname(new URL(input).pathname).toLowerCase()
    const contentType = headerType || MIME_BY_EXT[urlExt] || "application/octet-stream"
    const ext = EXT_BY_MIME[contentType] ?? urlExt ?? ""
    return { buffer, contentType, ext }
  }
  const path = resolve(process.cwd(), input)
  const buffer = await readFile(path)
  const ext = extname(path).toLowerCase()
  const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream"
  return { buffer, contentType, ext }
}

const toHex = (r, g, b) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")

const luminance = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const colorDistance = (a, b) => {
  const dr = parseInt(a.slice(1, 3), 16) - parseInt(b.slice(1, 3), 16)
  const dg = parseInt(a.slice(3, 5), 16) - parseInt(b.slice(3, 5), 16)
  const db = parseInt(a.slice(5, 7), 16) - parseInt(b.slice(5, 7), 16)
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

/**
 * Dominant colors via coarse quantization. Downscale, bucket every pixel into a
 * 5-bit-per-channel cell, rank cells by population, then greedily keep the
 * most populous cells that are visually distinct. Good enough for a moodboard;
 * sorted darkest to lightest so palettes read consistently.
 */
async function extractPalette(buffer, count = 5) {
  const { data, info } = await sharp(buffer)
    .resize(64, 64, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const cells = new Map()
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3)
    const cell = cells.get(key) ?? { n: 0, r: 0, g: 0, b: 0 }
    cell.n++
    cell.r += r
    cell.g += g
    cell.b += b
    cells.set(key, cell)
  }

  const ranked = [...cells.values()]
    .sort((a, b) => b.n - a.n)
    .map((c) => toHex(Math.round(c.r / c.n), Math.round(c.g / c.n), Math.round(c.b / c.n)))

  const picked = []
  for (const hex of ranked) {
    if (picked.every((p) => colorDistance(p, hex) > 40)) picked.push(hex)
    if (picked.length === count) break
  }
  return picked.sort((a, b) => luminance(a) - luminance(b))
}

async function describeImage(buffer) {
  const meta = await sharp(buffer).metadata()
  const palette = await extractPalette(buffer)
  return { width: meta.width, height: meta.height, palette }
}

async function upload(pathname, buffer, contentType) {
  const blob = await put(pathname, buffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
  })
  return blob.url
}

// ---------------------------------------------------------------------------
// main

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!process.env.BLOB_READ_WRITE_TOKEN) fail("BLOB_READ_WRITE_TOKEN is not set")
  if (!args.kind || !KINDS.has(args.kind)) fail(`--kind must be one of ${[...KINDS].join(", ")}`)
  if (!args.title || args.title === true) fail("--title is required")

  const kind = args.kind
  const title = String(args.title)
  const id = args.id && args.id !== true ? slugify(String(args.id)) : slugify(title)
  if (!id) fail("could not derive an id from the title; pass --id")

  const entry = {
    id,
    kind,
    title,
    ...(args.by && args.by !== true ? { by: String(args.by) } : {}),
    ...(args.year ? { year: Number(args.year) } : {}),
    ...(args.note && args.note !== true ? { note: String(args.note) } : {}),
    tags:
      args.tags && args.tags !== true
        ? String(args.tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    ...(args.source && args.source !== true ? { source: String(args.source) } : {}),
    palette: [],
    addedAt: args.date && args.date !== true ? String(args.date) : today(),
  }

  if (args.file && args.file !== true) {
    const { buffer, contentType, ext } = await loadInput(String(args.file))
    if (!contentType.startsWith("image/")) fail(`--file must be an image, got ${contentType}`)
    process.stdout.write(`  uploading media (${(buffer.length / 1024).toFixed(0)} kB)… `)
    const url = await upload(`inspirations/${kind}/${id}${ext}`, buffer, contentType)
    console.log("ok")
    const { width, height, palette } = await describeImage(buffer)
    entry.media = { url, contentType, size: buffer.length, width, height }
    entry.palette = palette
  }

  if (args.audio && args.audio !== true) {
    const { buffer, contentType, ext } = await loadInput(String(args.audio))
    if (!contentType.startsWith("audio/")) fail(`--audio must be audio, got ${contentType}`)
    process.stdout.write(`  uploading audio (${(buffer.length / 1024).toFixed(0)} kB)… `)
    const url = await upload(`inspirations/${kind}/${id}-audio${ext}`, buffer, contentType)
    console.log("ok")
    entry.audio = { url, contentType, size: buffer.length }
  }

  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"))
  const existingIndex = manifest.items.findIndex((i) => i.id === id)
  if (existingIndex >= 0) {
    // Preserve fields we didn't recompute (e.g. a note added by hand).
    manifest.items[existingIndex] = { ...manifest.items[existingIndex], ...entry }
    console.log(`  updated ${id}`)
  } else {
    manifest.items.push(entry)
    console.log(`  added ${id}`)
  }
  manifest.items.sort((a, b) => (a.addedAt < b.addedAt ? -1 : a.addedAt > b.addedAt ? 1 : 0))
  manifest.updatedAt = today()

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n")
  console.log(`  ${manifest.items.length} item(s) in ${MANIFEST.replace(process.cwd() + "/", "")}`)
  if (entry.palette.length) console.log(`  palette ${entry.palette.join(" ")}`)
}

main().catch((err) => fail(err?.message ?? String(err)))
