import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Music } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Musivo - Collaborative Music Rooms",
  description: "Create collaborative music rooms where everyone can add songs and vote for their favorites",
  keywords: ["music", "collaborative", "playlist", "voting", "spotify", "queue"],
  authors: [{ name: "Musivo" }],
  openGraph: {
    title: "Musivo - Collaborative Music Rooms",
    description: "Create collaborative music rooms where everyone can add songs and vote for their favorites",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <header className="flex items-center justify-between p-4 bg-background">
            <div className="flex items-center space-x-2">
              <Music className="h-6 w-6" />
              <div className="flex flex-col">
                <Link href="/" className="text-lg font-semibold">Musivo</Link>
                <span className="text-xs text-gray-500 dark:text-gray-400">Share Music Together</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </header>
          <main>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
