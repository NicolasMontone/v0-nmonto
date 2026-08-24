import { redirect } from "next/navigation"
import { notFoundMarkdown } from "@/lib/content"

export function GET(req: Request) {
  const url = new URL(req.url)

  if (url.pathname === "/cal") {
    redirect("https://cal.com/montone/30min")
  }

  if (url.pathname === "/x") {
    redirect("https://x.com/montonenico")
  }

  if (url.pathname === "/github") {
    redirect("https://github.com/nicolasmontone")
  }

  // Real 404 with a short Markdown body so agents can recover: it points at the
  // main pages, the sitemap, and the agent guide (llms.txt).
  return new Response(notFoundMarkdown(), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
