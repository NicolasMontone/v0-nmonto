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
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-xl font-normal mb-3 text-foreground">monto</h1>
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
