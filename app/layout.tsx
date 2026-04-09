import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Khatanbaatar — Full Stack Developer Portfolio',
  description:
    'Portfolio of Khatanbaatar, a passionate Full Stack Developer specializing in modern web applications with Next.js, React, Node.js, and MongoDB.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Portfolio', 'MongoDB', 'TypeScript'],
  authors: [{ name: 'Khatanbaatar' }],
  openGraph: {
    title: 'Khatanbaatar — Full Stack Developer',
    description: 'Explore my projects and experience in modern web development.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
