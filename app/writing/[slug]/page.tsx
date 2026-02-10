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
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        {/* Header on the left */}
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>

        {/* Article content */}
        <div className="pt-10 md:pt-0 md:pl-14 max-w-2xl content-area">
          {/* Article Header */}
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-3 text-foreground leading-tight text-pretty">{post.title}</h2>

            {post.excerpt && <p className="text-base text-muted-foreground mb-3 leading-relaxed">{post.excerpt}</p>}

            <p className="text-xs text-muted-foreground/60">{post.date}</p>
          </div>

          {/* Content */}
          <div className="border-t border-border/40 mb-10">
            <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none pt-8">
              <MDXRemote source={post.content} />
            </div>
          </div>

          <footer className="border-t border-border/40 pt-8 space-y-4">
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
    </main>
  )
}
