import { NextResponse, type NextRequest } from "next/server"
import { negotiate, notAcceptableText } from "@/lib/content"
import { getPageByPath, markdownPath } from "@/lib/site"

// Applies to the human-facing content pages only. Static assets, _next,
// sitemap.xml, robots.txt, llms.txt and the catch-all 404 route are excluded.
export const config = {
  matcher: ["/", "/inspiration", "/privacy"],
}

export function middleware(req: NextRequest) {
  // Never intercept React Server Component payloads or router prefetches; those
  // must reach Next.js untouched so client navigation keeps working.
  if (req.headers.get("rsc") || req.headers.get("next-router-prefetch")) {
    return NextResponse.next()
  }

  const representation = negotiate(req.headers.get("accept"))

  if (representation === null) {
    return new NextResponse(notAcceptableText(), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
        "X-Content-Type-Options": "nosniff",
      },
    })
  }

  // Content negotiation: the Markdown twin lives at <page>.md, served by the
  // catch-all route handler. Rewriting there (instead of answering from here)
  // keeps one code path for both URLs and gives HEAD requests the right headers.
  if (representation === "markdown") {
    const page = getPageByPath(req.nextUrl.pathname)
    if (page) {
      const url = req.nextUrl.clone()
      url.pathname = markdownPath(page)
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}
