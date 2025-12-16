"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ViewTransitionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Enable view transitions by adding meta tag
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const meta = document.createElement("meta")
      meta.name = "view-transition"
      meta.content = "same-origin"
      document.head.appendChild(meta)
    }
  }, [])

  return <>{children}</>
}
