import { BrowserRouter } from 'react-router-dom'
import { SonnerProvider } from './providers/sonner.provider'
import { ThemeProvider } from './providers/theme.provider'
import { ReactQueryProvider } from './providers/react-query.provider'
import { PageIndex } from './routes'
import { AuthProvider } from './providers/auth.provider'

function App() {
    return (
        <AuthProvider>
            <ReactQueryProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <PageIndex />
                    </BrowserRouter>

                    <SonnerProvider />
                </ThemeProvider>
            </ReactQueryProvider>
        </AuthProvider>
    )
}

export default App
