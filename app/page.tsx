import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-normal mb-2 text-foreground">Nicolas Montone</h1>
        </header>

        {/* About */}
        <section className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            I am a designer and developer at{" "}
            <Link
              href="https://v0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-muted-foreground transition-colors"
            >
              Vercel
            </Link>
            . My interests span a broad spectrum of subjects, encompassing web development, creative coding, magic,
            reverse engineering, and human-computer interaction.
          </p>

          <p>
            Since high school, I've spent years on algorithm competitions, web design and development. I earned my
            degree from Universidad de Buenos Aires, and joined as a software engineer at{" "}
            <Link
              href="https://pluggy.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-muted-foreground transition-colors"
            >
              Pluggy
            </Link>
            . In 2025, I joined Vercel to help build the next generation of developer tools including the platform,
            Next.js, AI SDK, v0, and more.
          </p>

          <p>
            You can gain further insights into my background and interests through my{" "}
            <Link href="/thoughts" className="text-foreground underline hover:text-muted-foreground transition-colors">
              thoughts
            </Link>
            ,{" "}
            <Link href="/projects" className="text-foreground underline hover:text-muted-foreground transition-colors">
              projects
            </Link>
            , find me on{" "}
            <Link
              href="https://github.com/nicolasmontone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-muted-foreground transition-colors"
            >
              GitHub
            </Link>
            ,{" "}
            <Link
              href="https://x.com/montonenico"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-muted-foreground transition-colors"
            >
              X/Twitter
            </Link>
            , and{" "}
            <Link
              href="https://www.linkedin.com/in/nicolas-montone/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-muted-foreground transition-colors"
            >
              LinkedIn
            </Link>
            .
          </p>
        </section>

        {/* Current Role */}
        <section className="mb-8 flex flex-col gap-2">
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

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-sm font-normal mb-3 text-foreground">Projects</h2>
          <div className="space-y-3">
            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://github.com/NicolasMontone/ai-sdk-agents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  AI SDK Agents
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">Install ai tools for AI SDK using shadcn CLI</p>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://github.com/pluggyai/grida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Grida
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">
                User graphical reverse engineering tool for android dynamic instrumentation
              </p>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="http://github.com/nicolasmontone/chat-with-your-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Chat with your Database
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">Postgres + LLMs</p>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://translatemenu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Translate Menu
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">Translate your menu to any language</p>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://github.com/NicolasMontone/cryptosapp-wallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Cryptosapp Wallet
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">WhatsApp bot where you can transfer crypto</p>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://www.raycast.com/NicolasMontone/kill-node-modules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Kill Node Modules
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">Raycast extension</p>
            </div>

            <div>
              <h3 className="font-normal mb-0.5 text-xs">
                <Link
                  href="https://www.raycast.com/NicolasMontone/cookie-string-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Cookie String Raycast
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">Parse cookies in Raycast</p>
            </div>
          </div>
        </section>

        {/* Writing - Only render if posts exist */}
        {posts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-normal mb-3 text-foreground">Writing</h2>
            <div className="space-y-3">
              {posts.slice(0, 5).map((post, index) => (
                <div
                  key={post.slug}
                  className={index < posts.slice(0, 5).length - 1 ? "border-b border-border pb-2" : ""}
                >
                  <h3 className="font-normal mb-0.5 text-xs">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-[10px] text-muted-foreground">{post.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[10px] text-muted-foreground">—</p>
        </footer>
      </div>
    </main>
  )
}
