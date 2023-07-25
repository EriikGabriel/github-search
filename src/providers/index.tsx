"use client"

import { ReactNode } from "react"

import { ThemeProvider } from "@providers/ThemeProvider"
import { SessionProvider } from "next-auth/react"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
