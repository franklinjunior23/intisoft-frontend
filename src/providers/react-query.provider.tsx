import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [Query] = useState<QueryClient>(() => new QueryClient())

    return (
        <QueryClientProvider client={Query}>
            {children}
            <ReactQueryDevtools position="bottom" initialIsOpen={false} />
        </QueryClientProvider>
    )
}
