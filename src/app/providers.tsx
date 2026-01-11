'use client'

import { Toaster } from '@/components/shared/Sonner'
import { setupConsoleFilter } from '@/lib/console-filter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())

  useEffect(() => {
    setupConsoleFilter()
  }, [])

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster position='bottom-center' />
    </QueryClientProvider>
  )
}
