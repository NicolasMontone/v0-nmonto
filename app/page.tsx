import type { Metadata } from "next"
import Image from "next/image"
import { ConnectionGlyph, LoveGlyph, SurpriseGlyph } from "@/components/glyphs"
import { Hacker } from "@/components/hacker"
import { Inspiration, type InspirationImage } from "@/components/inspiration"
import { Magician } from "@/components/magician"
import inspirations from "@/data/inspirations.json"
import { Entry, Section } from "@/components/home/section"
import { JsonLd } from "@/components/json-ld"
import { RevealFastForward } from "@/components/reveal-fast-forward"
import { Fade, Words } from "@/components/words"
import { bio, elsewhere, projects, welcome, work } from "@/lib/home"
import { homepageJsonLd } from "@/lib/schema"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Nicolas Montone — Software Engineer",
  description: site.description,
  alternates: { canonical: "/" },
}

const BLOCK_STEP = 350
const HEADER_START = 0
const WORK_START = HEADER_START + BLOCK_STEP
const PROJECTS_START = WORK_START + BLOCK_STEP
const ELSEWHERE_START = PROJECTS_START + BLOCK_STEP


function bioAccent(word: string) {
  const [, core, suffix] = word.match(/^(.*?)([.,!?]*)$/) ?? [word, word, ""]
  const key = core.toLowerCase()
  if (key === "magician") return <Magician text={core} suffix={suffix} />
  if (key === "hacker") return <Hacker text={core} suffix={suffix} />
  if (key === "buenos" || key === "aires")
    return (
      <>
        <span className={`ba ba-${key}`}>{core}</span>
        {suffix}
      </>
    )
  return null
}

const inspirationImages: InspirationImage[] = inspirations.items
  .filter((item) => item.media?.contentType?.startsWith("image/"))
  .map((item) => ({
    id: item.id,
    title: item.title,
    by: item.by,
    url: item.media.url,
    width: item.media.width ?? 1200,
    height: item.media.height ?? 800,
  }))

function welcomeAccent(word: string) {
  const [, core, suffix] = word.match(/^(.*?)([.,!?]*)$/) ?? [word, word, ""]
  if (core.toLowerCase() !== "inspiration") return null
  return <Inspiration text={core} suffix={suffix} images={inspirationImages} />
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-muted-foreground">
      <RevealFastForward />
      <JsonLd data={homepageJsonLd()} />
      <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-16 md:py-24">
        <header className="flex flex-col gap-6">
          <Fade delay={HEADER_START}>
            <Image
              src="/profile.jpg"
              alt="Nicolas Montone"
              width={64}
              height={64}
              priority
              className="size-16 rounded-full object-cover grayscale"
            />
          </Fade>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl text-foreground text-balance">
              <span className="sr-only">Nicolas Montone (monto)</span>
              <span aria-hidden="true">
                <Words text="monto" start={HEADER_START} step={0} />
              </span>
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              <Words text={bio} start={HEADER_START} step={0} accent={bioAccent} />
            </p>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              <Words text={welcome} start={HEADER_START} step={0} accent={welcomeAccent} />
            </p>
          </div>
        </header>

        <Section title="Work" glyph={<ConnectionGlyph delay={WORK_START} />} delay={WORK_START}>
          {work.map((item) => (
            <Entry key={item.href} {...item} delay={WORK_START} />
          ))}
        </Section>

        <Section
          title="Projects"
          glyph={<SurpriseGlyph delay={PROJECTS_START} />}
          more={{ href: site.links.github, label: "GitHub" }}
          delay={PROJECTS_START}
        >
          {projects.map((item) => (
            <Entry key={item.href} {...item} delay={PROJECTS_START} />
          ))}
        </Section>

        <footer id="elsewhere" aria-labelledby="elsewhere-title" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <LoveGlyph delay={ELSEWHERE_START} />
            <h2 id="elsewhere-title" className="text-sm text-muted-foreground">
              <Words text="Elsewhere" start={ELSEWHERE_START} />
            </h2>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.description}
                  className="dot-underline on-hover text-base text-foreground"
                >
                  <Fade delay={ELSEWHERE_START}>{item.title}</Fade>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  )
}
