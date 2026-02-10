import Link from "next/link"
import { Header } from "@/components/header"

const career = [
  {
    company: "v0.app",
    href: "https://v0.app",
    role: "Software Engineer",
    period: "Current",
  },
  {
    company: "pluggy.ai",
    href: "https://pluggy.ai",
    role: "Software Engineer",
    period: "Previously",
  },
]

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans">
      <div className="flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        {/* Header on the left */}
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>

        {/* Career */}
        <section className="pt-10 md:pt-0 md:pl-14 max-w-2xl content-area">
          <div className="space-y-6">
            {career.map((item) => (
              <div key={item.company} className="group">
                <div className="flex items-baseline gap-3">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-foreground/90 hover:text-foreground transition-colors"
                  >
                    {item.company}
                  </Link>
                  <span className="text-xs text-muted-foreground/60">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
