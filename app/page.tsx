import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

export default function Home() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 text-pretty animate-enter">
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

        <p className="text-base leading-relaxed text-muted-foreground animate-enter-delay-1">
          I{"'"}m a magician who does weird things with cards, and a hacker who
          loves reverse engineering. I build things, break things, and
          occasionally make things disappear.
        </p>

        <div className="pt-4 flex items-center gap-6 animate-enter-delay-2">
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
    </PageLayout>
  )
}
