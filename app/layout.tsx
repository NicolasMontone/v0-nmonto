import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { homePage, site, topics } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homePage.title,
    template: "%s",
  },
  description: site.description,
  applicationName: site.person,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  generator: "v0.app",
  keywords: [site.person, site.name, "software engineer", "Vercel", ...topics, "San Francisco"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "profile",
    firstName: site.givenName,
    lastName: site.familyName,
    username: site.name,
    url: site.url,
    siteName: site.person,
    title: homePage.title,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: site.ogImage.path,
        width: site.ogImage.width,
        height: site.ogImage.height,
        alt: `${site.person} (${site.name}), software engineer at Vercel`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homePage.title,
    description: site.description,
    creator: site.xHandle,
    images: [site.ogImage.path],
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
