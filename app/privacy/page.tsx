import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy — nmonto.com",
  description: "Privacy policy for nmonto.com, the personal website of Nicolas Montone.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-muted-foreground">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16 md:py-24">
        <Link href="/" className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground">
          {"← Nicolas Montone"}
        </Link>

        <article className="flex flex-col gap-4 text-base leading-relaxed">
          <h1 className="text-xl text-foreground">Privacy</h1>
          <p>
            nmonto.com is the personal website of Nicolas Montone. It is a static informational site, and this policy
            explains the little data it touches.
          </p>
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>
              <span className="text-foreground">No accounts, no individual tracking.</span> The site does not ask you to
              log in and does not build a profile of you.
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
            Questions about privacy can be sent through any of the channels under{" "}
            <Link href="/#elsewhere" className="text-foreground underline underline-offset-4 decoration-muted-foreground/50">
              Elsewhere
            </Link>{" "}
            on the home page. This policy may be updated; the latest version always lives at this URL.
          </p>
        </article>
      </div>
    </main>
  )
}
