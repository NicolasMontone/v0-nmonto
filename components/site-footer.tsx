"use client"

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 pb-8">
      <div className="flex items-center justify-between md:pl-54 border-t border-border/30 pt-6">
        <p className="text-xs text-muted-foreground/40">
          {new Date().getFullYear()} monto
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        >
          Back to top
        </button>
      </div>
    </footer>
  )
}
