import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-xl mx-auto px-4 py-8">
        <Header />

        {/* Bio */}
        <section>
          <div className="space-y-2 text-xs">
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

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-[10px] text-muted-foreground">—</p>
        </footer>
      </div>
    </main>
  )
}
