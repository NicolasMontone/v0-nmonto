import Link from "next/link"
import { Header } from "@/components/header"
import { getAllPosts } from "@/lib/posts"

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        {/* Header on the left */}
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>

        {/* Writing */}
        <section className="pt-10 md:pt-0 md:pl-14 max-w-2xl content-area">
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-base text-foreground/90 hover:text-foreground transition-colors"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base text-muted-foreground">No posts yet.</p>
          )}
        </section>
      </div>
    </main>
  )
}
