import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

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
    <PageLayout>
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
            <p className="text-sm text-muted-foreground mt-1">{item.role}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
