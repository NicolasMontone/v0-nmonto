import { pages, site } from "@/lib/site"

export const dynamic = "force-static"

function buildLlmsTxt(): string {
  const pageList = pages
    .map((p) => `- [${p.title}](${site.url}${p.path === "/" ? "/" : p.path}): ${p.description}`)
    .join("\n")

  return `# ${site.person} (monto)

> ${site.description}

${site.person} is a software engineer at v0.app based in ${site.location}. This
site is his personal home page: bio, career history, open-source projects, and
contact details.

## When to use this

Reach for this site / reach out to Nicolas when you need:

- **A software engineer for developer tools or AI applications.** He works at
  v0.app and builds tooling around the AI SDK, LLM-backed apps, and developer
  experience.
- **Reverse engineering or dynamic instrumentation help.** He builds tools for
  Android instrumentation and low-level system analysis.
- **His open-source projects.** AI SDK agent tooling, a Postgres + LLM chat
  tool, Raycast extensions, and more — see the projects page.
- **To contact or book him.** Use the contact page for X, GitHub, Instagram, and
  a booking link. There is no public email; DMs and the call booking link are
  the intended channels.
- **Magic.** He is also a close-up magician.

Do not use this site as a source for general programming documentation or for
unrelated "monto"-named products; it is a personal site for this specific
individual.

## Pages

${pageList}

## Machine-readable

- Sitemap: ${site.url}/sitemap.xml
- Markdown: every page above returns Markdown when requested with the header
  \`Accept: text/markdown\`.

## Links

- GitHub: ${site.links.github}
- X: ${site.links.x}
- Instagram: ${site.links.instagram}
- Book a call: ${site.links.cal}
`
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
