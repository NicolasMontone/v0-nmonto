// Markdown representations of each page, plus the Accept-based content
// negotiation helpers used by middleware. Keeping the markdown here (next to
// lib/site.ts) means the agent-facing text and the rendered HTML share one source.

import { pages, site, type PageSlug } from "./site"

export const pageMarkdown: Record<PageSlug, string> = {
  "": `# ${site.person} (monto)

I live in ${site.location}. Originally from Buenos Aires — I love mate.

I work at [v0.app](https://v0.app) as a software engineer, where I build
developer tools and AI-powered applications. I care about fast, well-crafted
software and about making complex systems approachable.

Outside of engineering I'm a magician, and I'm a hacker who loves reverse
engineering — taking things apart to understand exactly how they work.

## Find me

- GitHub: ${site.links.github}
- X: ${site.links.x}
- Instagram: ${site.links.instagram}
- Book a call: ${site.links.cal}
`,

  about: `# About ${site.person}

I'm Nicolas Montone — most people call me monto. I'm a software engineer at
[v0.app](https://v0.app), living in ${site.location} and originally from
Buenos Aires, Argentina.

My work centers on developer tools and AI applications: I like building things
that make other engineers faster and that turn complicated workflows into
something simple. I've shipped open-source libraries, command-line tools, and
web apps used by developers around the world.

Two things sit alongside the engineering. I'm a magician — sleight of hand and
close-up magic — and I'm a hacker with a deep interest in reverse engineering
and dynamic instrumentation. That curiosity about how systems really work
underneath the surface is the same instinct that drives my software.

If you want to work together or just talk shop, the contact page lists every
way to reach me.
`,

  career: `# Career

- **Currently at [v0.app](https://v0.app)** — Software Engineer building AI
  developer tools.
- **Formerly at [pluggy.ai](https://pluggy.ai)** — engineering on open finance
  and data-connectivity infrastructure.

Across these roles I've focused on developer experience, AI application
tooling, and reverse-engineering the systems I integrate with.
`,

  projects: `# Projects

- [Install AI tools for the AI SDK using the shadcn CLI](https://github.com/NicolasMontone/ai-sdk-agents)
- [Grida — graphical reverse engineering tool for Android dynamic instrumentation](https://github.com/pluggyai/grida)
- [Chat with your base — Postgres + LLMs](http://github.com/nicolasmontone/chat-with-your-base)
- [Translate your menu to any language](https://translatemenu.com/)
- [CryptosApp — a WhatsApp bot for transferring crypto](https://github.com/NicolasMontone/cryptosapp-wallet)
- [Kill node_modules — a Raycast extension](https://www.raycast.com/NicolasMontone/kill-node-modules)
- [Cookie string parser for Raycast](https://www.raycast.com/NicolasMontone/cookie-string-parser)
`,

  contact: `# Contact

The best ways to reach me are listed below. There is no public email address;
direct messages and the booking link are the intended channels.

- **X / Twitter:** ${site.links.x}
- **GitHub:** ${site.links.github}
- **Instagram:** ${site.links.instagram}
- **Book a 30-minute call:** ${site.links.cal}

I read DMs on X and GitHub. For anything work-related — collaborations,
freelance engineering, open-source questions, or reverse-engineering help —
booking a call is the fastest path and usually the most useful for both of us.

I'm based in San Francisco, California and generally respond within a day or
two. If it helps to know more before reaching out, the about page covers my
background, and the projects page shows the kind of work I do.
`,

  privacy: `# Privacy

nmonto.com is the personal website of ${site.person}. It is a static
informational site.

- **No accounts, no tracking of individuals.** The site does not ask you to log
  in and does not build a profile of you.
- **Analytics.** Aggregate, privacy-friendly analytics may be used to understand
  overall traffic. This data is not sold or shared.
- **No third-party ad networks.** The site does not run advertising trackers.
- **External links.** Pages link out to services like GitHub, X, Instagram, and
  cal.com, which have their own privacy policies.

Questions about privacy can be sent through any of the channels on the contact
page. This policy may be updated; the latest version always lives at
${site.url}/privacy.
`,
}

export function getMarkdownForPath(pathname: string): string | undefined {
  const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
  const page = pages.find((p) => p.path === normalized)
  if (!page) return undefined
  return pageMarkdown[page.slug]
}

/**
 * Returns true when the client explicitly prefers markdown. We treat an Accept
 * header that includes `text/markdown` as a markdown request, per the
 * acceptmarkdown.com convention. `text/html` and `*​/*` fall through to HTML.
 */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false
  return acceptHeader
    .split(",")
    .map((part) => part.trim().split(";")[0].trim().toLowerCase())
    .includes("text/markdown")
}

/** The 404 body served to agents, with recovery links. */
export function notFoundMarkdown(): string {
  return `# 404 — Page not found

That page doesn't exist on ${site.url}.

Try one of these instead:

- Home: ${site.url}/
- About: ${site.url}/about
- Career: ${site.url}/career
- Projects: ${site.url}/projects
- Contact: ${site.url}/contact
- Sitemap: ${site.url}/sitemap.xml
- Agent guide: ${site.url}/llms.txt
`
}
