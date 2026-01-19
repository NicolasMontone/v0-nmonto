import Link from "next/link"
import { Header } from "@/components/header"
import { getAllPosts } from "@/lib/posts"

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Writing */}
        <section className="pl-8 max-w-xl content-area">
          {posts.length > 0 ? (
            <div className="space-y-1.5">
              {posts.map((post) => (
                <div key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          )}
          </section>
      </div>
    </main>
  )
}
