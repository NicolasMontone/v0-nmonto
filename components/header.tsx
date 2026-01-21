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
    <header>
      <Link href="/" className="hover:opacity-70 transition-opacity">
        <h1 className="text-base font-normal mb-6 text-foreground">monto</h1>
      </Link>
      <nav className="flex flex-col gap-0.5">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs transition-colors ${
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "text-foreground"
                : "text-muted-foreground/70 hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
