import { describe, expect, it } from "vitest"
import { homepageJsonLd, personSchema, websiteSchema } from "./schema"
import { site } from "./site"

describe("personSchema", () => {
  it("is a Person with the required identity fields", () => {
    const person = personSchema()
    expect(person["@type"]).toBe("Person")
    expect(person.name).toBe(site.person)
    expect(person.alternateName).toBe(site.name)
    expect(person.description).toBe(site.description)
    expect(person.url).toBe(site.url)
    expect(person.jobTitle).toBeTruthy()
  })

  it("links every social profile via sameAs", () => {
    const person = personSchema()
    expect(person.sameAs).toContain(site.links.github)
    expect(person.sameAs).toContain(site.links.x)
    expect(person.sameAs).toContain(site.links.instagram)
  })
})

describe("websiteSchema", () => {
  it("is a WebSite pointing at the canonical url and publisher", () => {
    const website = websiteSchema()
    expect(website["@type"]).toBe("WebSite")
    expect(website.url).toBe(site.url)
    expect(website.name).toBe(site.name)
    expect(website.publisher["@id"]).toBe(`${site.url}/#person`)
  })
})

describe("homepageJsonLd", () => {
  it("emits a schema.org @graph with Person and WebSite", () => {
    const graph = homepageJsonLd()
    expect(graph["@context"]).toBe("https://schema.org")
    const types = graph["@graph"].map((node) => node["@type"])
    expect(types).toContain("Person")
    expect(types).toContain("WebSite")
  })

  it("serializes to valid JSON (safe for a JSON-LD script tag)", () => {
    const json = JSON.stringify(homepageJsonLd())
    expect(() => JSON.parse(json)).not.toThrow()
    // Must not contain a raw </script> sequence that could break out of the tag.
    expect(json).not.toContain("</script>")
  })
})
