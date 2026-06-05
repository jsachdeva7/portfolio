import Navbar from '@/components/shared/Navbar'
import { cn } from '@/lib/utils'
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Roboto_Mono, Crimson_Pro } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap'
})

const cousine = Roboto_Mono({
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

// Lock zoom on phones so tapping the polaroid stage can't trigger a
// double-tap/pinch zoom jolt. Scrolling still works.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
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
        beVietnamPro.variable,
        // Clip horizontal overflow so polaroids that spin/hang past the edges
        // (especially while falling) can't widen the page and jolt mobile.
        'overflow-x-clip'
      )}
    >
      <body
        className='flex h-screen touch-manipulation flex-col bg-neutral-950 text-white antialiased'
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <div className='flex min-h-0 flex-1 flex-col'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
