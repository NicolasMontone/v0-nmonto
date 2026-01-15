import Link from "next/link"
import { Header } from "@/components/header"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-28 flex-shrink-0 pr-6 border-r border-border/50">
          <Header />
        </div>

        {/* Projects */}
        <section className="pl-8 max-w-lg">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://github.com/NicolasMontone/ai-sdk-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Install ai tools for AI SDK using shadcn CLI
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://github.com/pluggyai/grida"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                User graphical reverse engineering tool for android dynamic instrumentation
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="http://github.com/nicolasmontone/chat-with-your-base"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Postgres + LLMs
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://translatemenu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Translate your menu to any language
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://github.com/NicolasMontone/cryptosapp-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                WhatsApp bot where you can transfer crypto
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://www.raycast.com/NicolasMontone/kill-node-modules"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Raycast extension to kill node_modules
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link
                href="https://www.raycast.com/NicolasMontone/cookie-string-parser"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Parse cookies in Raycast
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
