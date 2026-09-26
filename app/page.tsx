import type { Metadata } from "next"
import Image from "next/image"
import { Entry, Section } from "@/components/home/section"
import { JsonLd } from "@/components/json-ld"
import { Pencil } from "@/components/pencil"
import { bio, elsewhere, projects, work } from "@/lib/home"
import { homepageJsonLd } from "@/lib/schema"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Nicolas Montone — Software Engineer",
  description: site.description,
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans text-muted-foreground">
      <JsonLd data={homepageJsonLd()} />
      <div className="mx-auto flex max-w-2xl flex-col gap-20 px-6 py-16 md:py-24">
        <header className="flex flex-col gap-6">
          <Image
            src="/profile.jpg"
            alt="Nicolas Montone"
            width={64}
            height={64}
            priority
            className="size-16 rounded-full object-cover grayscale"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl text-foreground text-balance">
              <Pencil>
                Nicolas Montone <span className="text-muted-foreground">(monto)</span>
              </Pencil>
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">
              <Pencil delay={350} line={false}>
                {bio}
              </Pencil>
            </p>
          </div>
        </header>

        <Section title="Work" delay={600}>
          {work.map((item, i) => (
            <Entry key={item.href} {...item} delay={700 + i * 120} />
          ))}
        </Section>

        <Section title="Projects" more={{ href: site.links.github, label: "GitHub" }} delay={1000}>
          {projects.map((item, i) => (
            <Entry key={item.href} {...item} delay={1100 + i * 120} />
          ))}
        </Section>

        <footer id="elsewhere" className="flex flex-col gap-6">
          <h2 className="text-sm text-muted-foreground">
            <Pencil delay={1100 + projects.length * 120}>Elsewhere</Pencil>
          </h2>
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
                  <Pencil delay={1200 + projects.length * 120 + i * 80}>{item.title}</Pencil>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  )
}
