"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
  ]

  return (
    <header className="text-left md:text-right">
      <Link href="/" className="group inline-block">
        <h1 className="text-2xl font-medium tracking-tight text-foreground mb-6 group-hover:opacity-80 transition-opacity">
          monto
        </h1>
      </Link>
      <nav className="flex flex-row md:flex-col gap-4 md:gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors ${
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "text-foreground font-medium"
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
