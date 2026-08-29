"use client"

import Image from "next/image"
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
      <Link href="/" className="inline-block md:ml-auto" aria-label="monto — home">
        <Image
          src="/profile.jpg"
          alt="Nicolas Montone"
          width={64}
          height={64}
          priority
          className="mb-3 h-16 w-16 cursor-default rounded-full object-cover grayscale"
        />
        {/* Brand wordmark. Not an <h1>: each page owns its own descriptive H1,
            so this stays a styled span to avoid a generic heading on every page. */}
        <span className="block text-xl font-normal mb-3 text-foreground transition-opacity hover:opacity-80">
          monto
        </span>
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
