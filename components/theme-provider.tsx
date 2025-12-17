'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  console.log(process.env.TEST_SECRET)
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
