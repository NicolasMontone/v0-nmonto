import { describe, expect, it } from "vitest"
import { buildPersonJsonLd, buildWebSiteJsonLd, homepageJsonLd } from "./structured-data"
import { site } from "./site"

describe("buildPersonJsonLd", () => {
  const person = buildPersonJsonLd()

  it("is a schema.org Person with the required identity fields", () => {
    expect(person["@context"]).toBe("https://schema.org")
    expect(person["@type"]).toBe("Person")
    expect(person.name).toBe(site.person)
    expect(person.alternateName).toBe(site.name) // "monto" brand
    expect(person.url).toBe(site.url)
    expect(person.description).toBe(site.description)
  })

  it("lists every canonical profile in sameAs", () => {
    expect(person.sameAs).toEqual([site.links.github, site.links.x, site.links.instagram])
  })

  it("attributes the current employer", () => {
    expect(person.worksFor.name).toBe("v0.app")
  })
})

describe("buildWebSiteJsonLd", () => {
  const website = buildWebSiteJsonLd()

  it("is a schema.org WebSite carrying the brand name and canonical url", () => {
    expect(website["@type"]).toBe("WebSite")
    expect(website.url).toBe(site.url)
    expect(website.name).toBe(site.name)
    expect(website.alternateName).toBe(site.person)
  })

  it("links its publisher to the Person node", () => {
    expect(website.publisher["@id"]).toBe(`${site.url}/#person`)
  })
})

describe("homepageJsonLd", () => {
  it("serializes valid JSON containing both Person and WebSite graphs", () => {
    const parsed = JSON.parse(homepageJsonLd())
    expect(Array.isArray(parsed)).toBe(true)
    const types = parsed.map((node: { "@type": string }) => node["@type"])
    expect(types).toContain("Person")
    expect(types).toContain("WebSite")
  })

  it("never emits a closing script tag that would break the inline script", () => {
    // Guard against XSS/markup-breakage from injecting the payload inline.
    expect(homepageJsonLd().toLowerCase()).not.toContain("</script")
  })
})
