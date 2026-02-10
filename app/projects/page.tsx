import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"

const projects = [
  {
    title: "AI SDK Agents",
    description: "Install AI tools for AI SDK using shadcn CLI",
    href: "https://github.com/NicolasMontone/ai-sdk-agents",
  },
  {
    title: "Grida",
    description:
      "Graphical reverse engineering tool for Android dynamic instrumentation",
    href: "https://github.com/pluggyai/grida",
  },
  {
    title: "Chat with your Base",
    description: "Postgres + LLMs",
    href: "http://github.com/nicolasmontone/chat-with-your-base",
  },
  {
    title: "TranslateMenu",
    description: "Translate your menu to any language",
    href: "https://translatemenu.com/",
  },
  {
    title: "CryptosApp Wallet",
    description: "WhatsApp bot where you can transfer crypto",
    href: "https://github.com/NicolasMontone/cryptosapp-wallet",
  },
  {
    title: "Kill node_modules",
    description: "Raycast extension to kill node_modules",
    href: "https://www.raycast.com/NicolasMontone/kill-node-modules",
  },
  {
    title: "Cookie String Parser",
    description: "Parse cookies in Raycast",
    href: "https://www.raycast.com/NicolasMontone/cookie-string-parser",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        {/* Header on the left */}
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>

        {/* Projects */}
        <section className="pt-10 md:pt-0 md:pl-14 max-w-2xl content-area">
          <div className="space-y-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-base text-foreground/90 group-hover:text-foreground transition-colors">
                    {project.title}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
