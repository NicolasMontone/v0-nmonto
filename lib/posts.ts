export interface WritingPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

const posts: WritingPost[] = [
  {
    slug: "ship",
    title: "Ship",
    date: "2025-09-03",
    excerpt: "Launching my personal website built with v0.",
    content: `I shipped this website with v0, this is my first blog to test :)`,
  },
]

export function getWritingPosts(): WritingPost[] {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getWritingPost(slug: string): WritingPost | null {
  return posts.find((post) => post.slug === slug) || null
}

export function getAllPosts(): WritingPost[] {
  return getWritingPosts()
}
