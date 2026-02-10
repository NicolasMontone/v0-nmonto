import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

const projects = [
  {
    title: "AI SDK Agents",
    description: "Install AI tools for AI SDK using shadcn CLI",
    href: "https://github.com/NicolasMontone/ai-sdk-agents",
    tag: "AI",
  },
  {
    title: "Grida",
    description:
      "Graphical reverse engineering tool for Android dynamic instrumentation",
    href: "https://github.com/pluggyai/grida",
    tag: "Security",
  },
  {
    title: "Chat with your Base",
    description: "Postgres + LLMs",
    href: "http://github.com/nicolasmontone/chat-with-your-base",
    tag: "AI",
  },
  {
    title: "TranslateMenu",
    description: "Translate your menu to any language",
    href: "https://translatemenu.com/",
    tag: "Product",
  },
  {
    title: "CryptosApp Wallet",
    description: "WhatsApp bot where you can transfer crypto",
    href: "https://github.com/NicolasMontone/cryptosapp-wallet",
    tag: "Crypto",
  },
  {
    title: "Kill node_modules",
    description: "Raycast extension to kill node_modules",
    href: "https://www.raycast.com/NicolasMontone/kill-node-modules",
    tag: "Tooling",
  },
  {
    title: "Cookie String Parser",
    description: "Parse cookies in Raycast",
    href: "https://www.raycast.com/NicolasMontone/cookie-string-parser",
    tag: "Tooling",
  },
]

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="space-y-2">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group -mx-3 block rounded-lg px-3 py-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-base text-foreground/90 group-hover:text-foreground transition-colors">
                    {project.title}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground/40 group-hover:text-foreground/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {project.description}
                </p>
              </div>
              <span className="hidden sm:inline-flex shrink-0 text-[11px] font-mono text-muted-foreground/50 uppercase tracking-wider">
                {project.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
