import Link from "next/link"
import { Header } from "@/components/header"

export default function CareerPage() {
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

          {/* Career */}
          <section className="flex-1 max-w-xl flex flex-col gap-2">
          <div className="bg-muted/20 rounded-sm px-3 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Currently at</span>
                <Link
                  href="https://v0.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors text-xs"
                >
                  v0.app
                </Link>
              </div>
              <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">2025</span>
            </div>
          </div>
          <div className="bg-muted/20 rounded-sm px-3 py-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Former</span>
                <Link
                  href="https://pluggy.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors text-xs"
                >
                  pluggy.ai
                </Link>
              </div>
              <span className="text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">2021-2025</span>
            </div>
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
