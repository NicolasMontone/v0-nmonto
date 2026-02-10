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
      <Link href="/" className="group inline-flex items-center md:justify-end gap-3 mb-8">
        <div className="size-8 rounded-full border border-border/60 flex items-center justify-center text-xs font-mono text-muted-foreground group-hover:text-foreground group-hover:border-foreground/40 transition-colors">
          m
        </div>
        <h1 className="text-xl font-medium tracking-tight text-foreground group-hover:opacity-80 transition-opacity">
          monto
        </h1>
      </Link>
      <nav className="flex flex-row md:flex-col gap-4 md:gap-3">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors relative ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2 md:justify-end">
                {isActive && (
                  <span className="hidden md:block w-4 h-px bg-foreground" />
                )}
                {link.label}
                {isActive && (
                  <span className="md:hidden w-4 h-px bg-foreground" />
                )}
              </span>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
