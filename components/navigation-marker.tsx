"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect, useRef } from "react"

// Marks the document once the visitor has moved between pages on the client.
// globals.css uses the mark to skip the intro reveal, so coming back to the
// home page shows it at once instead of fading it in again.
export function NavigationMarker() {
  const pathname = usePathname()
  const initialPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (pathname !== initialPathname.current) document.documentElement.dataset.navigated = ""
  }, [pathname])

  return null
}
