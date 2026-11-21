import type { ExoticComponent, ReactNode } from "react"

// `experimental.viewTransition` in next.config.mjs makes Next.js bundle React's
// experimental build, which exports this component. @types/react 19.0 does not
// describe it yet.
declare module "react" {
  export const unstable_ViewTransition: ExoticComponent<{ name?: string; children?: ReactNode }>
}
