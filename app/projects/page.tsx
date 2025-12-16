import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "AI SDK Agents",
      url: "https://github.com/NicolasMontone/ai-sdk-agents",
      description: "Install ai tools for AI SDK using shadcn CLI",
    },
    {
      title: "Grida",
      url: "https://github.com/pluggyai/grida",
      description: "User graphical reverse engineering tool for android dynamic instrumentation",
    },
    {
      title: "Chat with your Database",
      url: "http://github.com/nicolasmontone/chat-with-your-base",
      description: "Postgres + LLMs",
    },
    {
      title: "Translate Menu",
      url: "https://translatemenu.com/",
      description: "Translate your menu to any language",
    },
    {
      title: "Cryptosapp Wallet",
      url: "https://github.com/NicolasMontone/cryptosapp-wallet",
      description: "WhatsApp bot where you can transfer crypto",
    },
    {
      title: "Kill Node Modules",
      url: "https://www.raycast.com/NicolasMontone/kill-node-modules",
      description: "Raycast extension to delete node_modules folders",
    },
    {
      title: "Cookie String Raycast",
      url: "https://www.raycast.com/NicolasMontone/cookie-string-parser",
      description: "Parse cookies in Raycast",
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-normal text-foreground mb-8">Projects</h1>

        <div className="space-y-6">
          {projects.map((project) => (
            <article key={project.url} className="space-y-1">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground underline hover:text-muted-foreground transition-colors"
              >
                {project.title}
              </Link>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
