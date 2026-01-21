import Link from "next/link"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-16 px-8 md:px-12 gap-16">
        <div className="w-24 flex-shrink-0 header-container">
          <Header />
        </div>

        <section className="max-w-md content-area">
          <div className="space-y-1 text-sm leading-relaxed">
            <p>I live in San Francisco, California.</p>
            <p>Originally from Buenos Aires (I love mate).</p>
            <p>
              I work at{" "}
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                v0.app
              </Link>{" "}
              as a software engineer.
            </p>
            <p>I love building products.</p>
            <p>I{"'"}m a magician. I do weird things with cards.</p>
            <p>I{"'"}m a hacker. I love doing reverse engineering.</p>
            <p>
              <Link
                href="https://github.com/nicolasmontone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              {" / "}
              <Link
                href="https://x.com/montonenico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                X
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
