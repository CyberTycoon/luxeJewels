import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LuxeJewels',
  description: 'A Jewwelry Store',
  keywords: ['jewelry', 'store', 'luxury', 'gems'],
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
