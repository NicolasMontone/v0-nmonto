// Markdown representations of each page, plus the Accept-based content
// negotiation helpers used by middleware. Keeping the markdown here (next to
// lib/site.ts) means the agent-facing text and the rendered HTML share one source.

import { pages, pageUrl, site, type PageMeta, type PageSlug } from "./site"
import { bio, elsewhere, projects, welcome, work, type HomeEntry, type WorkEntry } from "./home"
import { inspirationImages } from "./inspirations"

function homeList(entries: HomeEntry[]): string {
  return entries
    .map((e) => `- [${e.title}](${e.href})${e.meta ? ` (${e.meta})` : ""} — ${e.description}`)
    .join("\n")
}

function workList(entries: WorkEntry[]): string {
  return entries
    .flatMap((e) => [
      `- [${e.title}](${e.href})${e.meta ? ` (${e.meta})` : ""}${
        e.description || e.role ? ` — ${[e.description, e.role].filter(Boolean).join(" | ")}` : ""
      }`,
      ...e.items.flatMap((item) => [
        `  - ${item.href ? `[${item.title}](${item.href})` : item.title}`,
        ...item.points.map((point) => `    - ${point}`),
        ...(item.links ?? []).map((link) => `    - [${link.title}](${link.href})`),
      ]),
    ])
    .join("\n")
}

const pageBody: Record<PageSlug, string> = {
  "": `# ${site.person} (monto)

> ${site.description}

${bio}

${welcome.replace("inspiration", `[inspiration](${site.url}/inspiration)`)}

## Work

${workList(work)}

## Projects

${homeList(projects)}

## Elsewhere

There is no public email address; direct messages are the intended channel.

${homeList(elsewhere)}
`,

  inspiration: `# Inspiration

${inspirationImages.length} things ${site.person} keeps coming back to.

${inspirationImages
  .map((image) => `- [${image.title}](${site.url}${image.url})${image.by ? ` — ${image.by}` : ""}`)
  .join("\n")}
`,

  privacy: `# Privacy

nmonto.com is the personal website of ${site.person}. It is a static
informational site.

- **No accounts, no tracking of individuals.** The site does not ask you to log
  in and does not build a profile of you.
- **Analytics.** Aggregate, privacy-friendly analytics may be used to understand
  overall traffic. This data is not sold or shared.
- **No third-party ad networks.** The site does not run advertising trackers.
- **External links.** Pages link out to services like GitHub, X, Instagram, and
  LinkedIn, which have their own privacy policies.

Questions about privacy can be sent through any of the channels listed under
Elsewhere on the home page. This policy may be updated; the latest version
always lives at ${site.url}/privacy.
`,
}

// YAML frontmatter gives agents the page metadata without scraping the HTML head.
function frontmatter(page: PageMeta): string {
  return [
    "---",
    `title: ${JSON.stringify(page.title)}`,
    `description: ${JSON.stringify(page.description)}`,
    `canonical: ${pageUrl(page)}`,
    `last_updated: ${page.lastmod}`,
    "---",
    "",
    "",
  ].join("\n")
}

export const pageMarkdown = Object.fromEntries(
  pages.map((page) => [page.slug, frontmatter(page) + pageBody[page.slug]]),
) as Record<PageSlug, string>

export type Representation = "html" | "markdown"

// Order matters: on a tie (e.g. `Accept: */*`) the first entry wins, so browsers
// and generic HTTP clients keep getting HTML.
const OFFERED: { type: string; representation: Representation }[] = [
  { type: "text/html", representation: "html" },
  { type: "text/markdown", representation: "markdown" },
]

export const OFFERED_TYPES = OFFERED.map((offer) => offer.type)

type AcceptRange = { type: string; q: number; specificity: number }

function parseAccept(header: string): AcceptRange[] {
  return header
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const [type, ...params] = raw.split(";").map((part) => part.trim().toLowerCase())
      let q = 1
      for (const param of params) {
        const [name, value] = param.split("=").map((part) => part.trim())
        const parsed = Number(value)
        if (name === "q" && !Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
      }
      return { type, q, specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2 }
    })
}

function matches(range: AcceptRange, type: string): boolean {
  if (range.type === "*/*") return true
  if (range.type.endsWith("/*")) return type.startsWith(range.type.slice(0, -1))
  return range.type === type
}

/**
 * Picks the representation for an Accept header (RFC 9110 §12.5.1): the most
 * specific matching range decides each type's q-value, `q=0` rejects a type, the
 * highest q wins and ties go to whichever the client listed first. Returns
 * `null` when the client accepts nothing this site can produce (-> 406).
 */
export function negotiate(acceptHeader: string | null): Representation | null {
  const ranges = parseAccept(acceptHeader ?? "")
  if (ranges.length === 0) return "html"

  let best: Representation | null = null
  let bestQ = 0
  let bestPosition = Number.POSITIVE_INFINITY

  for (const offer of OFFERED) {
    let position = -1
    ranges.forEach((range, index) => {
      if (!matches(range, offer.type)) return
      if (position === -1 || range.specificity > ranges[position].specificity) position = index
    })
    if (position === -1) continue

    const { q } = ranges[position]
    if (q > bestQ || (q === bestQ && q > 0 && position < bestPosition)) {
      best = offer.representation
      bestQ = q
      bestPosition = position
    }
  }

  return best
}

/** Body of the 406 response, naming what the client can ask for instead. */
export function notAcceptableText(): string {
  return `Not Acceptable\n\nAvailable representations: ${OFFERED_TYPES.join(", ")}\n`
}

/** The 404 body served to agents, with recovery links. */
export function notFoundMarkdown(): string {
  const pageLinks = pages
    .map((page) => `- ${page.path === "/" ? "Home" : page.title.split(" — ")[0]}: ${pageUrl(page)}`)
    .join("\n")

  return `# 404 — Page not found

That page doesn't exist on ${site.url}.

Try one of these instead:

${pageLinks}
- Sitemap: ${site.url}/sitemap.xml
- Agent guide: ${site.url}/llms.txt
`
}
