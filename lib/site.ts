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
    cal: "https://cal.com/montone/30min",
  },
} as const

export type PageSlug = "" | "career" | "projects" | "about" | "contact" | "privacy"

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
export const CONTENT_UPDATED_AT = "2026-08-24"

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
    path: "/about",
    slug: "about",
    title: "About — Nicolas Montone",
    description:
      "About Nicolas Montone: software engineer at v0.app, magician, and reverse engineer based in San Francisco.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.8,
  },
  {
    path: "/career",
    slug: "career",
    title: "Career — Nicolas Montone",
    description: "Nicolas Montone's career: currently at v0.app, formerly at pluggy.ai.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.7,
  },
  {
    path: "/projects",
    slug: "projects",
    title: "Projects — Nicolas Montone",
    description:
      "Open-source projects and tools built by Nicolas Montone, including AI SDK tooling, reverse-engineering utilities, and Raycast extensions.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.7,
  },
  {
    path: "/contact",
    slug: "contact",
    title: "Contact — Nicolas Montone",
    description: "How to reach Nicolas Montone: X, GitHub, Instagram, or book a call.",
    lastmod: CONTENT_UPDATED_AT,
    priority: 0.6,
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
