"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { startTransition } from "react"

export function NavigationMenu() {
  const pathname = usePathname()
  const router = useRouter()

  const links = [
    { href: "/", label: "about" },
    { href: "/thoughts", label: "thoughts" },
    { href: "/projects", label: "projects" },
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Check if View Transitions API is supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      ;(document as any).startViewTransition(() => {
        startTransition(() => {
          router.push(href)
        })
      })
    } else {
      router.push(href)
    }
  }

  return (
    <nav className="fixed left-0 top-0 h-screen w-52 border-r border-border flex items-start pt-20 bg-background z-10">
      <ul className="flex flex-col gap-3 px-12">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
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
