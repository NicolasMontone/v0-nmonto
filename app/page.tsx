import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        {/* Header on the left */}
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>

        {/* Bio content */}
        <section className="pt-10 md:pt-0 md:pl-14 max-w-2xl content-area">
          <div className="space-y-6">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 text-pretty">
              I am a software engineer at{" "}
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground transition-colors"
              >
                v0.app
              </Link>
              . I live in San Francisco, originally from Buenos Aires.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              I{"'"}m a magician who does weird things with cards, and a hacker
              who loves reverse engineering. I build things, break things, and
              occasionally make things disappear.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="https://github.com/nicolasmontone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <span className="text-border" aria-hidden="true">
                /
              </span>
              <Link
                href="https://x.com/montonenico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                X
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
