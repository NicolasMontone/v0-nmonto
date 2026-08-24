import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact — Nicolas Montone",
  description: "How to reach Nicolas Montone: X, GitHub, Instagram, or book a call.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  const methods = [
    { label: "X / Twitter", href: site.links.x, display: "@montonenico" },
    { label: "GitHub", href: site.links.github, display: "nicolasmontone" },
    { label: "Instagram", href: site.links.instagram, display: "nicolasmontone" },
    { label: "Book a 30-min call", href: site.links.cal, display: "cal.com/montone" },
  ]

  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Contact */}
        <section className="pl-8 max-w-xl content-area">
          <h1 className="sr-only">Contact Nicolas Montone (monto)</h1>
          <h2 className="text-sm text-foreground mb-3">Contact</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              The best ways to reach me are below. I read direct messages on X and GitHub, and for anything work-related
              — collaborations, freelance, or open-source questions — booking a call is the fastest path.
            </p>
            <ul className="space-y-1.5">
              {methods.map((m) => (
                <li key={m.href}>
                  <span className="text-muted-foreground">{m.label}: </span>
                  <Link
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {m.display}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              I{"'"}m based in San Francisco, California and generally respond within a day or two. If you prefer, you
              can also read more{" "}
              <Link href="/about" className="text-primary hover:text-primary/80 transition-colors">
                about me
              </Link>{" "}
              before getting in touch.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
