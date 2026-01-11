import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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
    <html lang='en'>
      <body className='min-h-dvh antialiased' suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
