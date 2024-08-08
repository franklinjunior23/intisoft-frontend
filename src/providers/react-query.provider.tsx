import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
                _optimisticResults: 'optimistic',
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools position="top" initialIsOpen={false} />
        </QueryClientProvider>
    )
}
