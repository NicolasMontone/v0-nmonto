import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getWritingPost, getWritingPosts } from "@/lib/posts"

interface WritingPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getWritingPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function WritingPostPage({ params }: WritingPostPageProps) {
  const post = getWritingPost(params.slug)
  const allPosts = getWritingPosts()
  const otherPosts = allPosts.filter((p) => p.slug !== params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-xl font-medium mb-4 text-foreground leading-tight">{post.title}</h1>

          {post.excerpt && <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>}

          <p className="text-xs text-muted-foreground/70">{post.date}</p>
        </header>

        {/* Removed pt-6 spacing to eliminate gap between metadata and content */}
        <div className="border-t border-border/50 mb-8">
          <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </div>

        <footer className="border-t border-border/50 pt-6 space-y-6">
          {/* Go back link */}
          <div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Go back
            </Link>
          </div>

          {otherPosts.length > 0 && (
            <div>
              <Link
                href={`/writing/${otherPosts[0].slug}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Read more: {otherPosts[0].title} →
              </Link>
            </div>
          )}
        </footer>
      </div>
    </main>
  )
}
