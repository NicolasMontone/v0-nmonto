import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "monto — Software Engineer",
    template: "%s — monto",
  },
  description:
    "Software Engineer at v0.app. Magic, hacking, and building things.",
  generator: "v0.app",
  applicationName: "monto",
  authors: [{ name: "Nicolas Montone", url: "https://github.com/nicolasmontone" }],
  creator: "Nicolas Montone",
  publisher: "Nicolas Montone",
  keywords: [
    "monto",
    "Nicolas Montone",
    "software engineer",
    "Buenos Aires",
    "v0.app",
    "reverse engineering",
    "magician",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "monto — Software Engineer",
    description:
      "Software Engineer at v0.app. Magic, hacking, and building things.",
    url: "/",
    siteName: "monto",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "monto — Software Engineer",
    description:
      "Software Engineer at v0.app. Magic, hacking, and building things.",
    creator: "@montonenico",
  },
  icons: {
    icon: "/placeholder-logo.svg",
    shortcut: "/placeholder-logo.svg",
    apple: "/placeholder-logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
