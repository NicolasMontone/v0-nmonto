// Markdown representations of each page, plus the Accept-based content
// negotiation helpers used by middleware. Keeping the markdown here (next to
// lib/site.ts) means the agent-facing text and the rendered HTML share one source.

import { pages, site, type PageSlug } from "./site"
import { bio, elsewhere, projects, work, type HomeEntry } from "./home"

function homeList(entries: HomeEntry[]): string {
  return entries
    .map((e) => `- [${e.title}](${e.href})${e.meta ? ` (${e.meta})` : ""} — ${e.description}`)
    .join("\n")
}

export const pageMarkdown: Record<PageSlug, string> = {
  "": `# ${site.person} (monto)

${bio}

## Work

${homeList(work)}

## Projects

${homeList(projects)}

## Elsewhere

There is no public email address; direct messages and the booking link are the
intended channels.

${homeList(elsewhere)}
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
  cal.com, which have their own privacy policies.

Questions about privacy can be sent through any of the channels listed under
Elsewhere on the home page. This policy may be updated; the latest version
always lives at ${site.url}/privacy.
`,
}

export function getMarkdownForPath(pathname: string): string | undefined {
  const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
  const page = pages.find((p) => p.path === normalized)
  if (!page) return undefined
  return pageMarkdown[page.slug]
}

/**
 * Returns true when the client explicitly prefers markdown. We treat an Accept
 * header that includes `text/markdown` as a markdown request, per the
 * acceptmarkdown.com convention. `text/html` and `*​/*` fall through to HTML.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false
  return acceptHeader
    .split(",")
    .map((part) => part.trim().split(";")[0].trim().toLowerCase())
    .includes("text/markdown")
}

/** The 404 body served to agents, with recovery links. */
export function notFoundMarkdown(): string {
  return `# 404 — Page not found

That page doesn't exist on ${site.url}.

Try one of these instead:

- Home: ${site.url}/
- Privacy: ${site.url}/privacy
- Sitemap: ${site.url}/sitemap.xml
- Agent guide: ${site.url}/llms.txt
`
}
