import Link from "next/link"
import { Header } from "@/components/header"

export default function ProjectsPage() {
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
                href="https://github.com/NicolasMontone/ai-sdk-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                ai-sdk-agents
              </Link>
            </p>
            <p>
              <Link
                href="https://github.com/pluggyai/grida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                grida
              </Link>
            </p>
            <p>
              <Link
                href="http://github.com/nicolasmontone/chat-with-your-base"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                chat-with-your-base
              </Link>
            </p>
            <p>
              <Link
                href="https://translatemenu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                translatemenu
              </Link>
            </p>
            <p>
              <Link
                href="https://github.com/NicolasMontone/cryptosapp-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                cryptosapp-wallet
              </Link>
            </p>
            <p>
              <Link
                href="https://www.raycast.com/NicolasMontone/kill-node-modules"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                kill-node-modules
              </Link>
            </p>
            <p>
              <Link
                href="https://www.raycast.com/NicolasMontone/cookie-string-parser"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                cookie-string-parser
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
