import Link from "next/link"
import { Header } from "@/components/header"

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-16 px-8 md:px-12 gap-16">
        <div className="w-24 flex-shrink-0 header-container">
          <Header />
        </div>

        <section className="max-w-md content-area">
          <div className="space-y-1 text-sm">
            <p>
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                v0.app
              </Link>
            </p>
            <p>
              <Link
                href="https://pluggy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                pluggy.ai
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
