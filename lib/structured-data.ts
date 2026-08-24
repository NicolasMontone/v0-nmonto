// JSON-LD structured data for the homepage. Kept as pure builders (next to
// lib/site.ts) so the schema is unit-testable and stays in sync with the same
// single source of truth that feeds the HTML, sitemap, and llms.txt.

import { site } from "./site"

/**
 * Person identity schema. This is a personal site, so the primary identity type
 * is schema.org/Person. `alternateName` carries the "monto" brand, and
 * `sameAs` lists the canonical profile URLs so agents can reconcile identity.
 */
export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.person,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "v0.app",
      url: "https://v0.app",
    },
    homeLocation: {
      "@type": "Place",
      name: site.location,
    },
    knowsAbout: [
      "Developer tools",
      "AI applications",
      "AI SDK",
      "Reverse engineering",
      "Dynamic instrumentation",
    ],
    sameAs: [site.links.github, site.links.x, site.links.instagram],
  } as const
}

/**
 * WebSite schema so agents can associate the domain with its owner and name.
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    alternateName: site.person,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": `${site.url}/#person` },
  } as const
}

/** Serialized `<script type="application/ld+json">` payload for the homepage. */
export function homepageJsonLd(): string {
  return JSON.stringify([buildPersonJsonLd(), buildWebSiteJsonLd()])
}
