import type { Metadata } from "next"
import { Header } from "@/components/header"
import { InspirationFeed } from "@/components/redesign/inspiration-feed"
import { inspirations, inspirationsUpdatedAt } from "@/lib/inspirations"
import { getPageByPath } from "@/lib/site"

const page = getPageByPath("/redesign")!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/redesign" },
}

export default function RedesignPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Wider than the other pages so the masonry gets three real columns;
            the prose stays at the site's usual measure. */}
        <section className="pl-8 max-w-4xl flex-1 content-area">
          <h1 className="text-sm text-foreground">Redesign log</h1>
          <div className="mt-1.5 max-w-2xl space-y-1.5 text-sm leading-relaxed">
            <p>
              I{"'"}m redesigning this site. Instead of starting from a blank page, I{"'"}m collecting what I keep
              coming back to — photographs, records, other people{"'"}s sites — and letting the new design grow out
              of the pile.
            </p>
            <p>
              Everything here is stored as-is. The generative piece that ends up on the homepage will be built
              from these colors and textures, and I{"'"}ll document that here too.
            </p>
          </div>

          <div className="mt-10">
            <InspirationFeed items={inspirations} />
          </div>

          <p className="mt-12 font-mono text-[11px] text-muted-foreground/50">
            Last updated <time dateTime={inspirationsUpdatedAt}>{inspirationsUpdatedAt}</time>
          </p>
        </section>
      </div>
    </main>
  )
}
