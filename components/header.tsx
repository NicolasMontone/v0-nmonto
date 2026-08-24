"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="text-left md:text-right">
      <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="monto — home">
        {/* Wordmark, not a page heading: each page owns its own descriptive H1,
            so the brand renders as a styled span to keep one H1 per document. */}
        <span className="block text-xl font-normal mb-3 text-foreground">monto</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs transition-colors ${
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
