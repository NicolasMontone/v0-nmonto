import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Header */}
            <header>
              <h1 className="text-xl font-normal mb-1 text-foreground">monto</h1>
              <p className="text-xs text-muted-foreground">Software Engineer</p>
            </header>

            {/* About */}
            <section>
              <h2 className="text-sm font-normal mb-3 text-foreground">About</h2>
              <div className="space-y-2 text-xs">
                <p>I live in Buenos Aires, Argentina.</p>
                <p>
                  I work at{" "}
                  <Link
                    href="https://v0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    v0.app
                  </Link>{" "}
                  as a software engineer.
                </p>
                <p>I'm a magician. I do weird things with cards.</p>
                <p>I'm a hacker. I love doing reverse engineering.</p>
                <p>
                  Find me on{" "}
                  <Link
                    href="https://x.com/montonenico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    X
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-sm font-normal mb-3 text-foreground">Links</h2>
              <div className="space-y-1 text-xs">
                <div>
                  <Link
                    href="https://github.com/nicolasmontone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors underline"
                  >
                    Github
                  </Link>
                </div>
                <div>
                  <Link
                    href="https://nicolas-montone.notion.site/Reading-177639a6a7ff803ea6a0d3713cc61d6c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors underline"
                  >
                    My Internet Reading List
                  </Link>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{"Some reads I liked"}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Career */}
            <section className="flex flex-col gap-2">
              <h2 className="text-sm font-normal mb-1 text-foreground">Career</h2>
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

            {/* Projects - Descriptions only */}
            <section>
              <h2 className="text-sm font-normal mb-3 text-foreground">Projects</h2>
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="https://github.com/NicolasMontone/ai-sdk-agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Install ai tools for AI SDK using shadcn CLI
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="https://github.com/pluggyai/grida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    User graphical reverse engineering tool for android dynamic instrumentation
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="http://github.com/nicolasmontone/chat-with-your-base"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Postgres + LLMs
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="https://translatemenu.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Translate your menu to any language
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="https://github.com/NicolasMontone/cryptosapp-wallet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp bot where you can transfer crypto
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
                  <Link
                    href="https://www.raycast.com/NicolasMontone/kill-node-modules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Raycast extension to kill node_modules
                  </Link>
                </p>
                <p className="text-[10px] text-muted-foreground">
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

            {/* Writing - Only render if posts exist */}
            {posts.length > 0 && (
              <section>
                <h2 className="text-sm font-normal mb-3 text-foreground">Writing</h2>
                <div className="space-y-2">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.slug}>
                      <Link
                        href={`/writing/${post.slug}`}
                        className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-[10px] text-muted-foreground">—</p>
        </footer>
      </div>
    </main>
  )
}
