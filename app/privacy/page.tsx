import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Privacy — nmonto.com",
  description: "Privacy policy for nmonto.com, the personal website of Nicolas Montone.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex py-12 px-8 md:px-16">
        {/* Header on the left */}
        <div className="w-40 flex-shrink-0 pr-8 border-r border-border/50 header-container">
          <Header />
        </div>

        {/* Privacy */}
        <section className="pl-8 max-w-xl content-area">
          <h2 className="text-sm text-foreground mb-3">Privacy</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              nmonto.com is the personal website of Nicolas Montone. It is a static informational site, and this policy
              explains the little data it touches.
            </p>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>
                <span className="text-foreground">No accounts, no individual tracking.</span> The site does not ask you
                to log in and does not build a profile of you.
              </li>
              <li>
                <span className="text-foreground">Analytics.</span> Aggregate, privacy-friendly analytics may be used to
                understand overall traffic. This data is not sold or shared.
              </li>
              <li>
                <span className="text-foreground">No third-party ad networks.</span> The site does not run advertising
                trackers.
              </li>
              <li>
                <span className="text-foreground">External links.</span> Pages link out to services like GitHub, X,
                Instagram, and cal.com, which each have their own privacy policies.
              </li>
            </ul>
            <p>
              Questions about privacy can be sent through any of the channels on the{" "}
              <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
                contact page
              </Link>
              . This policy may be updated; the latest version always lives at this URL.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
