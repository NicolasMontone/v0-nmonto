import type { Metadata } from "next"
import Image from "next/image"
import { Entry, Section } from "@/components/home/section"
import { JsonLd } from "@/components/json-ld"
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
              Nicolas Montone <span className="text-muted-foreground">(monto)</span>
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground text-pretty">{bio}</p>
          </div>
        </header>

        <Section title="Work">
          {work.map((item) => (
            <Entry key={item.href} {...item} />
          ))}
        </Section>

        <Section title="Projects" more={{ href: site.links.github, label: "GitHub" }}>
          {projects.map((item) => (
            <Entry key={item.href} {...item} />
          ))}
        </Section>

        <footer id="elsewhere" className="flex flex-col gap-6">
          <h2 className="text-sm text-muted-foreground">Elsewhere</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.description}
                  className="text-base text-foreground underline-offset-4 decoration-muted-foreground/50 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  )
}
