import type { MetadataRoute } from "next"
import { pages, site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${site.url}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(page.lastmod),
    changeFrequency: "monthly",
    priority: page.priority,
  }))
}
