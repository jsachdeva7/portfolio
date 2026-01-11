import Navbar from '@/components/shared/Navbar'
import type { Metadata } from 'next'
import { Cousine, Crimson_Pro } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { cn } from '@/lib/utils'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap'
})

const cousine = Cousine({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cousine',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Jagat Sachdeva Portfolio',
  description: 'Product designer and developer.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn(crimsonPro.variable, cousine.variable)}>
      <body
        className='min-h-dvh bg-neutral-950 text-white antialiased'
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
