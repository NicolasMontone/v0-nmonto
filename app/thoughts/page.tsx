import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default async function ThoughtsPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-normal text-foreground mb-8">Thoughts</h1>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="space-y-1">
                <Link
                  href={`/writing/${post.slug}`}
                  className="text-base text-foreground underline hover:text-muted-foreground transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-base text-muted-foreground">No thoughts yet.</p>
        )}
      </div>
    </div>
  )
}
