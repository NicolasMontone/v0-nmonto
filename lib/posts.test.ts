import { describe, it, expect } from "vitest"
import { getWritingPosts, getWritingPost, getAllPosts } from "./posts"

describe("getWritingPosts", () => {
  it("returns an array of posts", () => {
    const posts = getWritingPosts()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it("returns posts sorted by date descending", () => {
    const posts = getWritingPosts()
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true)
    }
  })

  it("each post has the required fields", () => {
    const posts = getWritingPosts()
    for (const post of posts) {
      expect(post).toHaveProperty("slug")
      expect(post).toHaveProperty("title")
      expect(post).toHaveProperty("date")
      expect(post).toHaveProperty("excerpt")
      expect(post).toHaveProperty("content")
    }
  })
})

describe("getWritingPost", () => {
  it("returns a post when given a valid slug", () => {
    const post = getWritingPost("ship")
    expect(post).not.toBeNull()
    expect(post?.slug).toBe("ship")
    expect(post?.title).toBe("Ship")
  })

  it("returns null for a non-existent slug", () => {
    const post = getWritingPost("non-existent-slug")
    expect(post).toBeNull()
  })
})

describe("getAllPosts", () => {
  it("returns the same result as getWritingPosts", () => {
    const allPosts = getAllPosts()
    const writingPosts = getWritingPosts()
    expect(allPosts).toEqual(writingPosts)
  })
})
