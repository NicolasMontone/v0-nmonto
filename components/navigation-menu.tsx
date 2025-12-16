"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationMenu() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "about" },
    { href: "/thoughts", label: "thoughts" },
    { href: "/projects", label: "projects" },
  ]

  return (
    <nav className="fixed left-0 top-0 h-screen w-52 border-r border-border flex items-start pt-20 bg-background z-10">
      <ul className="flex flex-col gap-3 px-12">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-base transition-colors ${
                  isActive ? "text-foreground font-normal" : "text-muted-foreground hover:text-foreground italic"
                }`}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
