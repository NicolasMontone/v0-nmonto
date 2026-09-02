# nmonto.com

Personal website and portfolio of **Nicolas Montone** — software engineer at [v0.app](https://v0.app), based in San Francisco. Buenos Aires native, card magician, and reverse-engineering enthusiast.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nicolasmontones-projects/v0-nmonto)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/RXwDMa7W5nQ)

## Overview

A deliberately minimal, monochrome portfolio built for both humans and machines. The design stays quiet so a single signature moment stands out: the name headline **decrypts itself from random glyphs** on load and re-scrambles on hover — a nod to the magician-meets-hacker identity.

## Highlights

- **Agent-ready by design.** Every page ships real server-rendered content with a visible `<h1>` — no JavaScript required to read it.
- **Content negotiation.** Send `Accept: text/markdown` to any content route to get a clean markdown version, with a correct `Vary` header.
- **Machine-friendly 404s.** Unknown paths return a real `404` with a markdown body that links back to the sitemap and `llms.txt`.
- **Structured data.** Homepage emits a `schema.org` `@graph` (`Person` + `WebSite`) for rich results.
- **Discovery files.** `/llms.txt`, `/sitemap.xml`, and `/robots.txt` are all served correctly.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- Vitest for unit tests
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
npm install
npm run dev      # start the dev server
npm test         # run the test suite
npm run build    # production build
```

## Build your app

Continue building on [v0.app](https://v0.app/chat/projects/RXwDMa7W5nQ). Changes deployed from v0 are automatically pushed to this repository, and Vercel deploys the latest version.
