import type { Metadata } from "next"
import Image from "next/image"
import { ConnectionGlyph, LoveGlyph, SurpriseGlyph } from "@/components/glyphs"
import { Entry, Section } from "@/components/home/section"
import { JsonLd } from "@/components/json-ld"
import { Fade, Words, wordsEnd } from "@/components/words"
import { bio, elsewhere, projects, work } from "@/lib/home"
import { homepageJsonLd } from "@/lib/schema"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Nicolas Montone — Software Engineer",
  description: site.description,
  alternates: { canonical: "/" },
}

const NAME_STEP = 160
const BIO_START = wordsEnd("Nicolas Montone (monto)", 200, NAME_STEP) + 150
const BIO_STEP = 90
const WORK_START = wordsEnd(bio, BIO_START, BIO_STEP) + 200
const ENTRY_STEP = 160
const PROJECTS_START = WORK_START + 500 + work.length * ENTRY_STEP + 200
const ELSEWHERE_START = PROJECTS_START + 500 + projects.length * ENTRY_STEP + 200

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-muted-foreground">
      <JsonLd data={homepageJsonLd()} />
      <div className="mx-auto flex max-w-2xl flex-col gap-20 px-6 py-16 md:py-24">
        <header className="flex flex-col gap-6">
          <Fade delay={0}>
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
              <Words text="Nicolas Montone" start={200} step={NAME_STEP} />{" "}
              <Words text="(monto)" start={200 + 2 * NAME_STEP} className="text-muted-foreground" />
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              <Words text={bio} start={BIO_START} step={BIO_STEP} />
            </p>
          </div>
        </header>

        <Section title="Work" glyph={<ConnectionGlyph delay={WORK_START} />} delay={WORK_START}>
          {work.map((item, i) => (
            <Entry key={item.href} {...item} delay={WORK_START + 500 + i * ENTRY_STEP} />
          ))}
        </Section>

        <Section
          title="Projects"
          glyph={<SurpriseGlyph delay={PROJECTS_START} />}
          more={{ href: site.links.github, label: "GitHub" }}
          delay={PROJECTS_START}
        >
          {projects.map((item, i) => (
            <Entry key={item.href} {...item} delay={PROJECTS_START + 500 + i * ENTRY_STEP} />
          ))}
        </Section>

        <footer id="elsewhere" aria-labelledby="elsewhere-title" className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <LoveGlyph delay={ELSEWHERE_START} />
            <h2 id="elsewhere-title" className="text-sm text-muted-foreground">
              <Words text="Elsewhere" start={ELSEWHERE_START + 250} />
            </h2>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {elsewhere.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.description}
                  className="text-base text-foreground underline-offset-4 decoration-muted-foreground/50 hover:underline"
                >
                  <Fade delay={ELSEWHERE_START + 450 + i * 90}>{item.title}</Fade>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  )
}
