import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Header on the left */}
          <div className="md:w-48 flex-shrink-0">
            <Header />
          </div>

          {/* Bio in the center/right */}
          <section className="flex-1">
            <div className="space-y-3 text-sm leading-relaxed">
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

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-[10px] text-muted-foreground">—</p>
        </footer>
      </div>
    </main>
  )
}
