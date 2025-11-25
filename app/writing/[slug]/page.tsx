import { notFound } from "next/navigation"

interface WritingPost {
  slug: string
  title: string
  content: string
  date: string
}

// Mock data - replace with your actual data source
const writingPosts: WritingPost[] = [
  {
    slug: "first-post",
    title: "First Post",
    content: "This is the content of the first post.",
    date: "2024-01-01",
  },
  {
    slug: "second-post",
    title: "Second Post",
    content: "This is the content of the second post.",
    date: "2024-01-02",
  },
]

function getWritingPost(slug: string): WritingPost | undefined {
  return writingPosts.find((p) => p.slug === slug)
}

function getWritingPosts(): WritingPost[] {
  return writingPosts
}

interface WritingPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function WritingPostPage({ params }: WritingPostPageProps) {
  const { slug } = await params

  const post = getWritingPost(slug)
  const allPosts = getWritingPosts()
  const otherPosts = allPosts.filter((p) => p.slug !== slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500">{post.date}</time>
        <div className="mt-8 mb-12">{post.content}</div>
      </article>

      {otherPosts.length > 0 && (
        <aside className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Other Posts</h2>
          <ul className="space-y-4">
            {otherPosts.map((p) => (
              <li key={p.slug}>
                <a href={`/writing/${p.slug}`} className="text-blue-600 hover:underline">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  )
}
