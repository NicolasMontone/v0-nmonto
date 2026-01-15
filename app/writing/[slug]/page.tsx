import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getWritingPost, getWritingPosts } from "@/lib/posts"
import { Header } from "@/components/header"
import type { Metadata } from "next"

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

export async function generateMetadata({ params }: WritingPostPageProps): Promise<Metadata> {
  const post = getWritingPost(params.slug)

  if (!post) {
    return {
      title: "monto",
    }
  }

  return {
    title: `monto - ${post.title}`,
  }
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Header on the left */}
          <div className="md:w-48 flex-shrink-0">
            <Header />
          </div>

          {/* Article content */}
          <div className="flex-1">
            {/* Article Header */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-2 text-foreground leading-tight">{post.title}</h2>

              {post.excerpt && <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{post.excerpt}</p>}

              <p className="text-xs text-muted-foreground/70">{post.date}</p>
            </div>

            {/* Content */}
            <div className="border-t border-border/50 mb-8">
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none pt-6">
                <MDXRemote source={post.content} />
              </div>
            </div>

            <footer className="border-t border-border/50 pt-6 space-y-4">
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
        </div>
      </div>
    </main>
  )
}
