import type React from "react"
import type { Metadata } from "next"
import { ViewTransition } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "monto",
  description: "Software Engineer at v0.app. Magic, hacking, and building things.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  )
}
