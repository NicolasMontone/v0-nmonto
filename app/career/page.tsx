import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Career — Nicolas Montone",
  description: "Nicolas Montone's career: currently at v0.app, formerly at pluggy.ai.",
  alternates: { canonical: "/career" },
}

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Career */}
        <section className="pl-8 max-w-xl content-area">
            <h1 className="sr-only">Career of Nicolas Montone (monto) — v0.app, formerly pluggy.ai</h1>
            <div className="space-y-1.5">
              <p className="text-sm text-muted-foreground">
                <Link
                  href="https://v0.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Currently at v0.app
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                <Link
                  href="https://pluggy.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Former pluggy.ai
                </Link>
              </p>
            </div>
          </section>
      </div>
    </main>
  )
}
