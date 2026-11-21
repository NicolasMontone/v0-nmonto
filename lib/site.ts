// Single source of truth for site-wide identity, links, and page content.
// Used by pages, metadata, the sitemap, llms.txt, and markdown content negotiation
// so the HTML and machine-readable representations never drift apart.

export const site = {
  name: "monto",
  person: "Nicolas Montone",
  givenName: "Nicolas",
  familyName: "Montone",
  domain: "nmonto.com",
  url: "https://nmonto.com",
  role: "Software Engineer at v0.app",
  jobTitle: "Software Engineer",
  location: "San Francisco, California",
  description:
    "Nicolas Montone (monto) is a software engineer at Vercel working on v0, based in San Francisco. He builds AI agents and developer tools. Magician and hacker.",
  image: { path: "/profile.jpg", width: 400, height: 400 },
  ogImage: { path: "/og.png", width: 1200, height: 630 },
  xHandle: "@montonenico",
  links: {
    github: "https://github.com/nicolasmontone",
    x: "https://x.com/montonenico",
    instagram: "https://instagram.com/nicolasmontone",
    linkedin: "https://www.linkedin.com/in/nicolas-montone",
  },
} as const

// Every topic names something that is on the page. They feed JSON-LD `knowsAbout`
// and the keywords meta tag, which is what search and answer engines pair with the
// name when they look this site up.
export const topics = [
  "v0",
  "AI agents",
  "AI SDK",
  "Developer tools",
  "Reverse engineering",
  "Android dynamic instrumentation",
  "Open finance",
  "Close-up magic",
] as const

export type PageSlug = "" | "inspiration" | "privacy"

export interface PageMeta {
  /** Route path, e.g. "/" or "/about". */
  path: string
  /** Slug used for lookups (empty string for the homepage). */
  slug: PageSlug
  /** <title> and sitemap-facing title. */
  title: string
  /** Meta description. */
  description: string
  /** ISO date used for sitemap lastmod. */
  lastmod: string
  /** Relative sitemap priority. */
  priority: number
}

// Bump when page copy changes so agents/crawlers see an accurate lastmod.
export const CONTENT_UPDATED_AT = "2026-11-20"

export const pages: PageMeta[] = [
  {
    path: "/",
    slug: "",
    title: "Nicolas Montone (monto) — Software Engineer at Vercel",
    description: site.description,
    lastmod: CONTENT_UPDATED_AT,
    priority: 1,
  },
  {
    path: "/inspiration",
    slug: "inspiration",
    title: "Inspiration — nmonto.com",
    description: "Images Nicolas Montone keeps coming back to.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.5,
  },
  {
    path: "/privacy",
    slug: "privacy",
    title: "Privacy — nmonto.com",
    description: "Privacy policy for nmonto.com, the personal website of Nicolas Montone.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.3,
  },
]

export const homePage = pages[0]

function normalize(pathname: string): string {
  return pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

export function getPageByPath(pathname: string): PageMeta | undefined {
  const normalized = normalize(pathname)
  return pages.find((p) => p.path === normalized)
}

/** Absolute canonical URL of a page. */
export function pageUrl(page: PageMeta): string {
  return `${site.url}${page.path}`
}

/** Path of the always-Markdown twin: "/" -> "/index.md", "/privacy" -> "/privacy.md". */
export function markdownPath(page: PageMeta): string {
  return page.path === "/" ? "/index.md" : `${page.path}.md`
}

export function getPageByMarkdownPath(pathname: string): PageMeta | undefined {
  return pages.find((p) => markdownPath(p) === pathname)
}
