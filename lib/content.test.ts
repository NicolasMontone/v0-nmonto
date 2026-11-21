import { describe, expect, it } from "vitest"
import { negotiate, notFoundMarkdown, pageMarkdown } from "./content"
import { getPageByMarkdownPath, getPageByPath, markdownPath, pages, pageUrl } from "./site"

describe("negotiate", () => {
  it("serves markdown when the client prefers it", () => {
    expect(negotiate("text/markdown")).toBe("markdown")
    expect(negotiate("text/markdown, text/html;q=0.9")).toBe("markdown")
    expect(negotiate("text/markdown, text/html, */*")).toBe("markdown")
    expect(negotiate("TEXT/Markdown; q=1")).toBe("markdown")
  })

  it("serves html to browsers, generic clients, and a missing Accept", () => {
    expect(negotiate("text/html")).toBe("html")
    expect(negotiate("*/*")).toBe("html")
    expect(negotiate("text/*")).toBe("html")
    expect(negotiate("application/json, text/plain, */*")).toBe("html")
    expect(negotiate("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe("html")
    expect(negotiate(null)).toBe("html")
    expect(negotiate("")).toBe("html")
  })

  it("ranks by q-value instead of by mere presence", () => {
    expect(negotiate("text/html, text/markdown;q=0.8")).toBe("html")
    expect(negotiate("text/html;q=0.5, text/markdown;q=0.9")).toBe("markdown")
  })

  it("treats q=0 as a rejection, even against a wildcard", () => {
    expect(negotiate("text/html;q=0, */*")).toBe("markdown")
    expect(negotiate("text/markdown;q=0, */*")).toBe("html")
  })

  it("returns null when nothing on offer is acceptable (406)", () => {
    expect(negotiate("application/pdf")).toBeNull()
    expect(negotiate("application/json")).toBeNull()
    expect(negotiate("text/markdown;q=0")).toBeNull()
  })
})

describe("pageMarkdown", () => {
  it("has a markdown twin for every known page", () => {
    for (const page of pages) {
      expect(pageMarkdown[page.slug]).toBeTruthy()
      expect(getPageByMarkdownPath(markdownPath(page))).toBe(page)
    }
    expect(markdownPath(pages[0])).toBe("/index.md")
    expect(getPageByMarkdownPath("/does-not-exist.md")).toBeUndefined()
  })

  it("opens with frontmatter naming the title, canonical URL and last update", () => {
    for (const page of pages) {
      const [, frontmatter] = pageMarkdown[page.slug].split("---\n")
      expect(pageMarkdown[page.slug].startsWith("---\n")).toBe(true)
      expect(frontmatter).toContain(`title: ${JSON.stringify(page.title)}`)
      expect(frontmatter).toContain(`canonical: ${pageUrl(page)}`)
      expect(frontmatter).toContain(`last_updated: ${page.lastmod}`)
    }
  })

  it("starts the body with an H1", () => {
    for (const md of Object.values(pageMarkdown)) {
      const body = md.split("---\n").slice(2).join("---\n")
      expect(body.trimStart().startsWith("# ")).toBe(true)
    }
  })
})

describe("trust anchor content length", () => {
  it("home and privacy each have at least 500 characters", () => {
    for (const slug of ["", "privacy"] as const) {
      expect(pageMarkdown[slug].length).toBeGreaterThanOrEqual(500)
    }
  })
})

describe("notFoundMarkdown", () => {
  it("is a markdown 404 with sitemap and llms.txt recovery links", () => {
    const body = notFoundMarkdown()
    expect(body.startsWith("# 404")).toBe(true)
    expect(body).toContain("/sitemap.xml")
    expect(body).toContain("/llms.txt")
  })
})

describe("getPageByPath", () => {
  it("matches known paths and ignores trailing slashes", () => {
    expect(getPageByPath("/privacy")?.slug).toBe("privacy")
    expect(getPageByPath("/privacy/")?.slug).toBe("privacy")
    expect(getPageByPath("/")?.slug).toBe("")
    expect(getPageByPath("/nope")).toBeUndefined()
  })
})
