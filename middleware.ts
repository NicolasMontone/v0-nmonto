import { NextResponse, type NextRequest } from "next/server"
import { getMarkdownForPath, prefersMarkdown } from "@/lib/content"

// Applies to the human-facing content pages only. Static assets, _next,
// sitemap.xml, robots.txt, llms.txt and the catch-all 404 route are excluded.
export const config = {
  matcher: ["/", "/about", "/career", "/projects", "/contact", "/privacy", "/redesign"],
}

const VARY = "Accept, Accept-Encoding"

export function middleware(req: NextRequest) {
  // Never intercept React Server Component payloads or router prefetches; those
  // must reach Next.js untouched so client navigation keeps working.
  if (req.headers.get("rsc") || req.headers.get("next-router-prefetch")) {
    return NextResponse.next()
  }

  const accept = req.headers.get("accept")

  // Content negotiation: serve Markdown when the client explicitly asks for it.
  if (prefersMarkdown(accept)) {
    const markdown = getMarkdownForPath(req.nextUrl.pathname)
    if (markdown) {
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          // Accept must be in Vary so CDNs cache the HTML and Markdown variants
          // separately instead of serving whichever landed in cache first.
          Vary: VARY,
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "X-Content-Type-Options": "nosniff",
        },
      })
    }
  }

  // HTML variant: advertise that the representation varies on Accept.
  const res = NextResponse.next()
  res.headers.set("Vary", VARY)
  return res
}
