// JSON-LD structured data for the homepage. A personal site maps to schema.org
// `Person` as the primary identity, paired with a `WebSite` node. Both share the
// single source of truth in lib/site.ts so the structured data never drifts from
// the rendered HTML, the sitemap, or llms.txt.

import { site } from "./site"

const PERSON_ID = `${site.url}/#person`
const WEBSITE_ID = `${site.url}/#website`

/** schema.org Person node describing Nicolas Montone. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.person,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "v0.app",
      url: "https://v0.app",
    },
    // Derived from the single source of truth in site.location so the structured
    // data can never drift from the human-readable "San Francisco, California".
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.split(",")[0].trim(),
      addressRegion: site.location.split(",")[1]?.trim(),
      addressCountry: "US",
    },
    knowsAbout: [
      "Developer tools",
      "AI applications",
      "Reverse engineering",
      "Dynamic instrumentation",
    ],
    // sameAs anchors the brand to its canonical off-site profiles, which helps
    // search + agents connect "monto" to this domain.
    sameAs: [site.links.github, site.links.x, site.links.instagram],
  }
}

/** schema.org WebSite node for nmonto.com. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": PERSON_ID },
  }
}

/**
 * Full JSON-LD graph for the homepage. Uses @graph so multiple linked entities
 * ship in a single script tag.
 */
export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), websiteSchema()],
  }
}
