import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Nicolas Montone — Software Engineer",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  generator: "v0.app",
  keywords: [
    "Nicolas Montone",
    "monto",
    "software engineer",
    "v0.app",
    "AI SDK",
    "reverse engineering",
    "San Francisco",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Nicolas Montone — Software Engineer",
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nicolas Montone — Software Engineer at v0.app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas Montone — Software Engineer",
    description: site.description,
    creator: "@montonenico",
    images: ["/og.png"],
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
