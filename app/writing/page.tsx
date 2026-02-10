import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { getAllPosts } from "@/lib/posts"

export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <PageLayout>
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
    </PageLayout>
  )
}
