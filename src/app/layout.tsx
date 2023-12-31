import "@styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { AppProviders } from "@providers/index"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Github Search",
  description: "A simple app for Github searches",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
