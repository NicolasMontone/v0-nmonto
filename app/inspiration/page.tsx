import type { Metadata } from "next"
import Link from "next/link"
import { InspirationGallery, InspirationTitle } from "@/components/inspiration"
import { inspirationImages } from "@/lib/inspirations"
import { getPageByPath, markdownPath } from "@/lib/site"

const page = getPageByPath("/inspiration")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: page.path,
    types: { "text/markdown": markdownPath(page) },
  },
}

export default function InspirationPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-muted-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 py-12 md:gap-40 md:px-10 md:py-16">
        <div className="flex flex-col gap-10">
          <Link href="/" className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground">
            {"← Nicolas Montone"}
          </Link>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-foreground">
              <InspirationTitle />
            </h1>
            <p className="text-sm">{`${inspirationImages.length} things I keep coming back to.`}</p>
          </div>
        </div>
        <InspirationGallery images={inspirationImages} />
      </div>
    </main>
  )
}
