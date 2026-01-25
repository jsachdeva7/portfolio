import Navbar from '@/components/shared/Navbar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Cousine, Crimson_Pro, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Jagat Sachdeva Portfolio',
  description: 'Product designer and developer.',
  icons: {
    icon: '/Farfalle.png'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={cn(
        crimsonPro.variable,
        cousine.variable,
        beVietnamPro.variable
      )}
    >
      <body
        className='flex h-screen flex-col bg-neutral-950 text-white antialiased'
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <div className='flex-1 p-16'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
