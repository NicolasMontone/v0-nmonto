import { NextResponse, type NextRequest } from "next/server"
import { getMarkdownForPath, prefersMarkdown } from "@/lib/content"

// Applies to the human-facing content pages only. Static assets, _next,
// sitemap.xml, robots.txt, llms.txt and the catch-all 404 route are excluded.
export const config = {
  matcher: ["/", "/about", "/career", "/projects", "/contact", "/privacy"],
}

// The tokens the markdown/HTML representation genuinely varies on.
const NEGOTIATION_VARY = ["Accept", "Accept-Encoding"]

/**
 * Merge our negotiation tokens into whatever `Vary` value already exists,
 * de-duplicated and case-insensitively. Next.js appends its own RSC tokens
 * (`RSC`, `Next-Router-State-Tree`, ...) to `Vary` on navigable responses; if
 * we blindly overwrite we either lose those tokens or (depending on ordering)
 * get overwritten ourselves and drop `Accept`. Merging keeps both so CDNs cache
 * the HTML and Markdown variants separately per acceptmarkdown.com.
 */
function mergeVary(existing: string | null): string {
  const seen = new Set<string>()
  const out: string[] = []
  for (const token of [...(existing ? existing.split(",") : []), ...NEGOTIATION_VARY]) {
    const trimmed = token.trim()
    if (!trimmed) continue
    const key = trimmed.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(trimmed)
  }
  return out.join(", ")
}

export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept")
  const isRsc = Boolean(req.headers.get("rsc") || req.headers.get("next-router-prefetch"))

  // Content negotiation: serve Markdown when the client explicitly asks for it.
  // RSC/prefetch requests are never markdown requests, so they fall through to
  // Next.js untouched and client navigation keeps working.
  if (!isRsc && prefersMarkdown(accept)) {
    const markdown = getMarkdownForPath(req.nextUrl.pathname)
    if (markdown) {
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: mergeVary(null),
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "X-Content-Type-Options": "nosniff",
        },
      })
    }
  }

  // HTML (or RSC) variant: advertise that the representation varies on Accept in
  // addition to whatever Next.js already put on `Vary`.
  const res = NextResponse.next()
  res.headers.set("Vary", mergeVary(res.headers.get("Vary")))
  return res
}
