import type React from "react"
import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-muted-foreground font-sans flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row py-16 px-6 md:px-16 lg:px-24">
        <div className="md:w-44 flex-shrink-0 md:pr-10 pb-10 md:pb-0 md:border-r border-b md:border-b-0 border-border/40 header-container">
          <Header />
        </div>
        <section className="pt-10 md:pt-0 md:pl-14 max-w-2xl w-full content-area animate-enter">
          {children}
        </section>
      </div>
      <SiteFooter />
    </main>
  )
}
