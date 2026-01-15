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
        <section className="pl-8 max-w-xl content-area">
          <div className="space-y-1.5 text-sm leading-relaxed">
            <p>I live in San Francisco, California.</p>
            <p>Originally from Buenos Aires (I love mate).</p>
            <p>
              I work at{" "}
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                v0.app
              </Link>{" "}
              as a software engineer.
            </p>
            <p>I{"'"}m a magician. I do weird things with cards.</p>
            <p>I{"'"}m a hacker. I love doing reverse engineering.</p>
            <p>
              Here is my{" "}
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
        </section>
      </div>
    </main>
  )
}
