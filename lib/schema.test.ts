import { describe, expect, it } from "vitest"
import { projects, work } from "./home"
import { homepageJsonLd, personSchema, profilePageSchema, projectsSchema, websiteSchema } from "./schema"
import { CONTENT_UPDATED_AT, site } from "./site"

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
    expect(person.sameAs).toContain(site.links.linkedin)
  })

  it("splits employers into current (worksFor) and past (alumniOf) from the Work section", () => {
    const person = personSchema()
    const names = (orgs: { name: string }[]) => orgs.map((org) => org.name)
    expect(names(person.worksFor)).toEqual(work.filter((e) => e.current).map((e) => e.title))
    expect(names(person.alumniOf)).toEqual(work.filter((e) => !e.current).map((e) => e.title))
    expect(person.worksFor.length).toBeGreaterThan(0)
  })

  it("carries a profile image and a contact channel", () => {
    const person = personSchema()
    expect(person.image.url).toBe(`${site.url}${site.image.path}`)
    expect(person.contactPoint.url).toBe(site.links.x)
  })
})

describe("profilePageSchema", () => {
  it("makes the Person the main entity of the page", () => {
    const profile = profilePageSchema()
    expect(profile["@type"]).toBe("ProfilePage")
    expect(profile.mainEntity["@id"]).toBe(personSchema()["@id"])
    expect(personSchema().mainEntityOfPage["@id"]).toBe(profile["@id"])
    expect(profile.dateModified).toBe(CONTENT_UPDATED_AT)
  })
})

describe("projectsSchema", () => {
  it("lists every project on the page, in order", () => {
    const list = projectsSchema()
    expect(list["@type"]).toBe("ItemList")
    expect(list.itemListElement.map((entry) => entry.item.name)).toEqual(projects.map((p) => p.title))
    expect(list.itemListElement.map((entry) => entry.position)).toEqual(projects.map((_, i) => i + 1))
  })

  it("credits repositories under another account as contributions", () => {
    const items = projectsSchema().itemListElement.map((entry) => entry.item as Record<string, unknown>)
    const grida = items.find((item) => item.name === "Grida")
    const own = items.find((item) => item.name === "AI SDK agents")
    expect(grida?.contributor).toBeTruthy()
    expect(grida?.author).toBeUndefined()
    expect(own?.author).toBeTruthy()
  })
})

describe("websiteSchema", () => {
  it("is a WebSite pointing at the canonical url and publisher", () => {
    const website = websiteSchema()
    expect(website["@type"]).toBe("WebSite")
    expect(website.url).toBe(site.url)
    expect(website.name).toBe(site.person)
    expect(website.alternateName).toContain(site.name)
    expect(website.publisher["@id"]).toBe(`${site.url}/#person`)
  })
})

describe("homepageJsonLd", () => {
  it("emits a schema.org @graph with WebSite, ProfilePage, Person and the project list", () => {
    const graph = homepageJsonLd()
    expect(graph["@context"]).toBe("https://schema.org")
    const types = graph["@graph"].map((node) => node["@type"])
    expect(types).toEqual(["WebSite", "ProfilePage", "Person", "ItemList"])
  })

  it("serializes to valid JSON (safe for a JSON-LD script tag)", () => {
    const json = JSON.stringify(homepageJsonLd())
    expect(() => JSON.parse(json)).not.toThrow()
    // Must not contain a raw </script> sequence that could break out of the tag.
    expect(json).not.toContain("</script>")
  })
})
