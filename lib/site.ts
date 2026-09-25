// Single source of truth for site-wide identity, links, and page content.
// Used by pages, metadata, the sitemap, llms.txt, and markdown content negotiation
// so the HTML and machine-readable representations never drift apart.

export const site = {
  name: "monto",
  person: "Nicolas Montone",
  url: "https://nmonto.com",
  role: "Software Engineer at v0.app",
  location: "San Francisco, California",
  description:
    "Nicolas Montone (monto) is a software engineer at v0.app based in San Francisco. He builds developer tools and AI applications, performs magic, and does reverse engineering.",
  links: {
    github: "https://github.com/nicolasmontone",
    x: "https://x.com/montonenico",
    instagram: "https://instagram.com/nicolasmontone",
    linkedin: "https://www.linkedin.com/in/nicolas-montone",
    cal: "https://cal.com/montone/30min",
  },
} as const

export type PageSlug = "" | "privacy"

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
export const CONTENT_UPDATED_AT = "2026-09-01"

export const pages: PageMeta[] = [
  {
    path: "/",
    slug: "",
    title: "Nicolas Montone — Software Engineer",
    description: site.description,
    lastmod: CONTENT_UPDATED_AT,
    priority: 1,
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

export function getPageByPath(pathname: string): PageMeta | undefined {
  const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
  return pages.find((p) => p.path === normalized)
}
