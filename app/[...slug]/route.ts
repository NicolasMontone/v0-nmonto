import { redirect } from "next/navigation"

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

  return new Response("Not found", {
    status: 404,
  })
}
