import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { NavigationMenu } from "@/components/navigation-menu"
import { ViewTransitionsProvider } from "@/components/view-transitions"

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
        <ViewTransitionsProvider>
          <div className="flex min-h-screen">
            <NavigationMenu />
            <main className="ml-52 flex-1 max-w-3xl px-16 py-20">{children}</main>
          </div>
        </ViewTransitionsProvider>
      </body>
    </html>
  )
}
