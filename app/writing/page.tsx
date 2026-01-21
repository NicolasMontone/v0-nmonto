import Link from "next/link"
import { Header } from "@/components/header"
import { getAllPosts } from "@/lib/posts"

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-16 px-8 md:px-12 gap-16">
        <div className="w-24 flex-shrink-0 header-container">
          <Header />
        </div>

        <section className="max-w-md content-area">
          {posts.length > 0 ? (
            <div className="space-y-1 text-sm">
              {posts.map((post) => (
                <p key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {post.title}
                  </Link>
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground/70">No posts yet.</p>
          )}
        </section>
      </div>
    </main>
  )
}
