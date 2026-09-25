// Content for the single-page home. Shared by app/page.tsx and the markdown twin.

import { site } from "./site"

export type HomeEntry = { title: string; description: string; href: string; meta?: string }

export const bio = "Software engineer at v0.app. From Buenos Aires, living in San Francisco. Magician and hacker."

export const work: HomeEntry[] = [
  {
    title: "v0.app",
    description: "Building developer tools and AI-powered applications.",
    href: "https://v0.app",
    meta: "Now",
  },
  {
    title: "pluggy.ai",
    description: "Open finance APIs for Latin America.",
    href: "https://pluggy.ai",
    meta: "Before",
  },
]

export const projects: HomeEntry[] = [
  {
    title: "AI SDK agents",
    description: "Install AI tools for the AI SDK with the shadcn CLI.",
    href: "https://github.com/NicolasMontone/ai-sdk-agents",
  },
  {
    title: "Grida",
    description: "Graphical reverse-engineering tool for Android dynamic instrumentation.",
    href: "https://github.com/pluggyai/grida",
  },
  {
    title: "Chat with your base",
    description: "Talk to your Postgres database with LLMs.",
    href: "http://github.com/nicolasmontone/chat-with-your-base",
  },
  {
    title: "TranslateMenu",
    description: "Translate your restaurant menu to any language.",
    href: "https://translatemenu.com/",
  },
  {
    title: "Cryptosapp",
    description: "A WhatsApp bot where you can transfer crypto.",
    href: "https://github.com/NicolasMontone/cryptosapp-wallet",
  },
  {
    title: "Kill node_modules",
    description: "Raycast extension to find and delete node_modules.",
    href: "https://www.raycast.com/NicolasMontone/kill-node-modules",
  },
  {
    title: "Cookie string parser",
    description: "Parse cookie strings right from Raycast.",
    href: "https://www.raycast.com/NicolasMontone/cookie-string-parser",
  },
]

export const elsewhere: HomeEntry[] = [
  { title: "X", description: "@montonenico", href: site.links.x },
  { title: "GitHub", description: "nicolasmontone", href: site.links.github },
  { title: "Instagram", description: "nicolasmontone", href: site.links.instagram },
  { title: "Book a call", description: "30 minutes on cal.com", href: site.links.cal },
]
