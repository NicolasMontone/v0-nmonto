import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "About — Nicolas Montone",
  description:
    "About Nicolas Montone: software engineer at v0.app, magician, and reverse engineer based in San Francisco.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* About */}
        <section className="pl-8 max-w-xl content-area">
          <h1 className="text-sm text-foreground mb-3">About Nicolas Montone</h1>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              I{"'"}m Nicolas Montone — most people call me monto. I{"'"}m a software engineer at{" "}
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                v0.app
              </Link>
              , living in San Francisco, California and originally from Buenos Aires, Argentina.
            </p>
            <p>
              My work centers on developer tools and AI applications: I like building things that make other engineers
              faster and that turn complicated workflows into something simple. I{"'"}ve shipped open-source libraries,
              command-line tools, and web apps used by developers around the world.
            </p>
            <p>
              Two things sit alongside the engineering. I{"'"}m a magician — sleight of hand and close-up magic — and I
              {"'"}m a hacker with a deep interest in reverse engineering and dynamic instrumentation. That curiosity
              about how systems really work underneath the surface is the same instinct that drives my software.
            </p>
            <p>
              If you want to work together or just talk shop, my{" "}
              <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
                contact page
              </Link>{" "}
              lists every way to reach me.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
