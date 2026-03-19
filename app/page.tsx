import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Bio content */}
        <section className="pl-8 max-w-xl content-area flex items-center justify-center">
          <div className="text-center text-sm leading-loose space-y-4">
            <div className="space-y-1">
              <p>I live in San Francisco, California.</p>
              <p>Originally from Buenos Aires</p>
              <p>(I love mate).</p>
            </div>
            <div className="space-y-1">
              <p>
                I work at{" "}
                <Link
                  href="https://v0.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  v0.app
                </Link>
              </p>
              <p>as a software engineer.</p>
            </div>
            <div className="space-y-1">
              <p>I{"'"}m a magician.</p>
              <p>I do weird things with cards.</p>
            </div>
            <div className="space-y-1">
              <p>I{"'"}m a hacker.</p>
              <p>I love doing reverse engineering.</p>
            </div>
            <div className="space-y-1">
              <p>
                <Link
                  href="https://github.com/nicolasmontone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  GitHub
                </Link>
                {" "}and{" "}
                <Link
                  href="https://x.com/montonenico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  X
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
