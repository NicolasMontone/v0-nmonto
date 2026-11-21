import { redirect } from "next/navigation"
import { notFoundMarkdown, pageMarkdown } from "@/lib/content"
import { getPageByMarkdownPath, pageUrl, site } from "@/lib/site"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  // The matched params, not req.url: after the middleware rewrite for
  // `Accept: text/markdown` the request URL is still the page's own path.
  const { slug } = await params
  const pathname = `/${slug.join("/")}`

  if (pathname === "/x") {
    redirect(site.links.x)
  }

  if (pathname === "/github") {
    redirect(site.links.github)
  }

  // Markdown twin of a page (/index.md, /privacy.md): reached directly by
  // crawlers that never send an Accept header, and through content negotiation
  // on the page URL itself.
  const page = getPageByMarkdownPath(pathname)
  if (page) {
    return new Response(pageMarkdown[page.slug], {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        // Accept must be in Vary so caches keep the HTML and Markdown variants
        // of the page URL apart instead of serving whichever landed first.
        Vary: "Accept",
        // The HTML page stays the one URL search engines index.
        Link: `<${pageUrl(page)}>; rel="canonical"`,
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
      },
    })
  }

  // Real 404 with a short Markdown body so agents can recover: it points at the
  // main pages, the sitemap, and the agent guide (llms.txt).
  return new Response(notFoundMarkdown(), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
