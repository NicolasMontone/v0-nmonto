import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { site } from "@/lib/site"
import { homepageJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Nicolas Montone — Software Engineer",
  description: site.description,
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      {/* JSON-LD identity (Person + WebSite) so agents can parse who this is. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homepageJsonLd() }}
      />
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Bio content */}
        <section className="pl-8 max-w-xl content-area">
          {/* Descriptive, server-rendered H1. Visually hidden to preserve the
              minimalist design, but present in the raw HTML for crawlers/agents. */}
          <h1 className="sr-only">
            Nicolas Montone (monto) — Software Engineer at v0.app in San Francisco
          </h1>
          <div className="space-y-1.5 text-sm leading-relaxed">
            <p>I live in San Francisco, California.</p>
            <p>Originally from Buenos Aires (I love mate).</p>
            <p>
              I work at{" "}
              <Link
                href="https://v0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                v0.app
              </Link>{" "}
              as a software engineer, where I build developer tools and AI-powered applications. I care about fast,
              well-crafted software and about making complex systems feel approachable.
            </p>
            <p>I{"'"}m a magician.</p>
            <p>
              I{"'"}m a hacker. I love doing reverse engineering — taking systems apart to understand exactly how they
              work. That same curiosity is what drives the software I build.
            </p>
            <p>
              You can read more{" "}
              <Link href="/about" className="text-primary hover:text-primary/80 transition-colors">
                about me
              </Link>
              , see my{" "}
              <Link href="/career" className="text-primary hover:text-primary/80 transition-colors">
                career
              </Link>{" "}
              and{" "}
              <Link href="/projects" className="text-primary hover:text-primary/80 transition-colors">
                projects
              </Link>
              , or{" "}
              <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
                get in touch
              </Link>
              .
            </p>
            <p>
              Here is my{" "}
              <Link
                href="https://github.com/nicolasmontone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                GitHub
              </Link>
              {" "}and{" "}
              <Link
                href="https://x.com/montonenico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                X
              </Link>
              {" "}and{" "}
              <Link
                href="https://instagram.com/nicolasmontone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Instagram
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
