// Renders public/og.png (1200x630, the size Open Graph and X large cards expect)
// in the site's own look. Run after changing the name or bio:
//   node scripts/generate-og.mjs
import { readFile, writeFile } from "node:fs/promises"
import { createElement as h } from "react"
import { ImageResponse } from "next/og.js"
import sharp from "sharp"

const WIDTH = 1200
const HEIGHT = 630
const BACKGROUND = "#0a0a0a"
const FOREGROUND = "#d4d4d4"
const MUTED = "#a1a1a1"

const NAME = "monto"
const LINES = ["Nicolas Montone. Software engineer at Vercel.", "Magician and hacker."]

const font = (file) => readFile(new URL(`../node_modules/geist/dist/fonts/${file}`, import.meta.url))

const portrait = await sharp(new URL("../public/profile.jpg", import.meta.url).pathname)
  .resize(240, 240)
  .grayscale()
  .png()
  .toBuffer()

const image = new ImageResponse(
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 96,
        background: BACKGROUND,
        fontFamily: "Geist",
      },
    },
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h("img", {
        src: `data:image/png;base64,${portrait.toString("base64")}`,
        width: 120,
        height: 120,
        style: { borderRadius: 9999 },
      }),
      h("div", { style: { marginTop: 48, fontSize: 88, color: FOREGROUND, letterSpacing: "-0.03em" } }, NAME),
      h(
        "div",
        { style: { marginTop: 20, display: "flex", flexDirection: "column", fontSize: 38, lineHeight: 1.4, color: MUTED } },
        ...LINES.map((line) => h("div", { key: line }, line)),
      ),
    ),
    h("div", { style: { fontFamily: "Geist Mono", fontSize: 26, color: MUTED } }, "nmonto.com"),
  ),
  {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Geist", data: await font("geist-sans/Geist-Regular.ttf"), weight: 400, style: "normal" },
      { name: "Geist Mono", data: await font("geist-mono/GeistMono-Regular.ttf"), weight: 400, style: "normal" },
    ],
  },
)

await writeFile(new URL("../public/og.png", import.meta.url), Buffer.from(await image.arrayBuffer()))
console.log(`wrote public/og.png (${WIDTH}x${HEIGHT})`)
