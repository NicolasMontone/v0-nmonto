import { describe, expect, it } from "vitest"
import { getMarkdownForPath, notFoundMarkdown, pageMarkdown, prefersMarkdown } from "./content"
import { getPageByPath, pages } from "./site"

describe("prefersMarkdown", () => {
  it("returns true when Accept includes text/markdown", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true)
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true)
    expect(prefersMarkdown("text/html, text/markdown;q=0.8")).toBe(true)
  })

  it("returns false for html, wildcard, or missing Accept", () => {
    expect(prefersMarkdown("text/html")).toBe(false)
    expect(prefersMarkdown("*/*")).toBe(false)
    expect(prefersMarkdown("application/json")).toBe(false)
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown("")).toBe(false)
  })
})

describe("getMarkdownForPath", () => {
  it("resolves every known page (with and without trailing slash)", () => {
    for (const page of pages) {
      expect(getMarkdownForPath(page.path)).toBeTruthy()
      if (page.path !== "/") {
        expect(getMarkdownForPath(`${page.path}/`)).toBe(getMarkdownForPath(page.path))
      }
    }
  })

  it("returns undefined for unknown paths", () => {
    expect(getMarkdownForPath("/does-not-exist")).toBeUndefined()
  })

  it("serves an H1 as the first line of each markdown document", () => {
    for (const md of Object.values(pageMarkdown)) {
      expect(md.trimStart().startsWith("# ")).toBe(true)
    }
  })
})

describe("trust anchor content length", () => {
  it("about, contact, and privacy each have at least 500 characters", () => {
    for (const slug of ["about", "contact", "privacy"] as const) {
      expect(pageMarkdown[slug].length).toBeGreaterThanOrEqual(500)
    }
  })

  // The Is-Agentic audit flagged the homepage specifically for having too
  // little content, so hold the homepage to the same 500-char floor.
  it("the homepage has an H1 and at least 500 characters of content", () => {
    const home = pageMarkdown[""]
    expect(home.trimStart().startsWith("# ")).toBe(true)
    expect(home.length).toBeGreaterThanOrEqual(500)
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
    expect(getPageByPath("/about")?.slug).toBe("about")
    expect(getPageByPath("/about/")?.slug).toBe("about")
    expect(getPageByPath("/")?.slug).toBe("")
    expect(getPageByPath("/nope")).toBeUndefined()
  })
})
