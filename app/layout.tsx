import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Khatanbaatar — Luxury Minimal Portfolio',
  description:
    'Portfolio of Khatanbaatar, a full stack developer focused on refined product work, premium UI, and screenshot-led project showcases.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Portfolio', 'MongoDB', 'TypeScript'],
  authors: [{ name: 'Khatanbaatar' }],
  openGraph: {
    title: 'Khatanbaatar — Full Stack Developer',
    description: 'Explore my projects and experience in modern web development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
