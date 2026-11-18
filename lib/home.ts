// Content for the single-page home. Shared by app/page.tsx and the markdown twin.

import { site } from "./site"

export type HomeEntry = { title: string; description: string; href: string; meta?: string }

export const bio = "Software engineer at v0.app. From Buenos Aires, living in San Francisco. Magician and hacker."

export const welcome =
  "Thank you for stopping by my small corner of the internet. I hope you leave with a little inspiration."

export type WorkLink = { title: string; href: string }

export type WorkItem = { title: string; href?: string; points: string[]; links?: WorkLink[] }

export type WorkEntry = { title: string; href: string; meta?: string; description?: string; items: WorkItem[] }

export const work: WorkEntry[] = [
  {
    title: "Vercel",
    href: "https://vercel.com",
    meta: "Now",
    items: [
      {
        title: "v0",
        href: "https://v0.app",
        points: ["Led the v0 agent."],
        links: [
          {
            title: "Shopify storefronts",
            href: "https://vercel.com/changelog/build-and-deploy-shopify-storefronts-on-vercel",
          },
          {
            title: "Snowflake data apps",
            href: "https://vercel.com/blog/build-and-deploy-data-applications-on-snowflake-with-v0",
          },
          { title: "Platform API", href: "https://vercel.com/changelog/v0-platform-api-now-in-beta" },
        ],
      },
      {
        title: "Chat SDK",
        href: "https://vercel.com/changelog/chat-sdk",
        points: ["One codebase, every chat platform."],
      },
    ],
  },
  {
    title: "pluggy.ai",
    description: "Open finance APIs for Latin America.",
    href: "https://pluggy.ai",
    meta: "Before",
    items: [
      {
        title: "Head of Payments, Product Engineer",
        points: [
          "Created a payments solution on top of PIX.",
          "Led product and engineering.",
          "Handled sales and support.",
          "Helped create and maintain Pluggy Connect (similar to Stripe Link).",
        ],
      },
    ],
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
  { title: "LinkedIn", description: "nicolas-montone", href: site.links.linkedin },
]
