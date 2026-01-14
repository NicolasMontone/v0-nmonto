import Link from "next/link"
import { Header } from "@/components/header"
import { getAllPosts } from "@/lib/posts"

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-xl mx-auto px-4 py-8">
        <Header />

        {/* Writing */}
        <section>
          {posts.length > 0 ? (
            <div className="space-y-3">
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

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-[10px] text-muted-foreground">—</p>
        </footer>
      </div>
    </main>
  )
}
