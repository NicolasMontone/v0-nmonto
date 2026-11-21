// JSON-LD structured data for the homepage. A personal site maps to schema.org
// `ProfilePage` whose `mainEntity` is the `Person`, paired with a `WebSite` node
// and an `ItemList` of projects. Everything is derived from lib/site.ts and
// lib/home.ts so the structured data never drifts from the rendered HTML, the
// sitemap, or llms.txt.

import { projects, work, type HomeEntry, type WorkEntry } from "./home"
import { CONTENT_UPDATED_AT, homePage, site, topics } from "./site"

const PERSON_ID = `${site.url}/#person`
const WEBSITE_ID = `${site.url}/#website`
const PROFILE_ID = `${site.url}/#profile`
const PROJECTS_ID = `${site.url}/#projects`

function organization(entry: WorkEntry) {
  return {
    "@type": "Organization",
    name: entry.title,
    url: entry.href,
    ...(entry.description ? { description: entry.description } : {}),
  }
}

/** schema.org Person node describing Nicolas Montone. */
export function personSchema() {
  const [locality, region] = site.location.split(",").map((part) => part.trim())
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.person,
    givenName: site.givenName,
    familyName: site.familyName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    mainEntityOfPage: { "@id": PROFILE_ID },
    image: {
      "@type": "ImageObject",
      url: `${site.url}${site.image.path}`,
      width: site.image.width,
      height: site.image.height,
    },
    jobTitle: site.jobTitle,
    worksFor: work.filter((entry) => entry.current).map(organization),
    alumniOf: work.filter((entry) => !entry.current).map(organization),
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "US",
    },
    knowsAbout: [...topics],
    // There is no public email; direct messages are the contact channel.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "direct message",
      url: site.links.x,
    },
    // sameAs anchors the name to its canonical off-site profiles, which is how
    // search and answer engines tie "Nicolas Montone" / "monto" to this domain.
    sameAs: [site.links.github, site.links.x, site.links.instagram, site.links.linkedin],
  }
}

/** schema.org WebSite node. `name` is what Google shows as the site name. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.person,
    alternateName: [site.name, site.domain],
    url: site.url,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": PERSON_ID },
  }
}

/** schema.org ProfilePage node: tells crawlers this page is about one person. */
export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: site.url,
    name: homePage.title,
    description: site.description,
    inLanguage: "en-US",
    dateModified: CONTENT_UPDATED_AT,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    hasPart: { "@id": PROJECTS_ID },
  }
}

function isRepository(href: string): boolean {
  return /^https?:\/\/github\.com\//.test(href)
}

// A repository under another account (e.g. an employer's org) is credited as a
// contribution rather than sole authorship.
function isOwnRepository(href: string): boolean {
  return href.toLowerCase().startsWith(`${site.links.github.toLowerCase()}/`)
}

function projectItem(project: HomeEntry) {
  const repository = isRepository(project.href)
  const credit = repository && !isOwnRepository(project.href) ? "contributor" : "author"
  return {
    "@type": repository ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.href,
    ...(repository ? { codeRepository: project.href } : {}),
    [credit]: { "@id": PERSON_ID },
  }
}

/** schema.org ItemList of the projects listed on the home page. */
export function projectsSchema() {
  return {
    "@type": "ItemList",
    "@id": PROJECTS_ID,
    name: `Projects by ${site.person}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: projectItem(project),
    })),
  }
}

/**
 * Full JSON-LD graph for the homepage. Uses @graph so multiple linked entities
 * ship in a single script tag.
 */
export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), profilePageSchema(), personSchema(), projectsSchema()],
  }
}
