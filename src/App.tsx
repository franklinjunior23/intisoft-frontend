import { BrowserRouter } from 'react-router-dom'
import { SonnerProvider } from './providers/sonner.provider'
import { ThemeProvider } from './providers/theme.provider'
import { ReactQueryProvider } from './providers/react-query.provider'
import { PageIndex } from './routes'
import { AuthProvider } from './providers/auth.provider'
import NewUserProvider from './providers/new-user'

function App() {
    return (
        <AuthProvider>
            <ReactQueryProvider>
                <NewUserProvider>
                    <ThemeProvider>
                        <BrowserRouter>
                            <PageIndex />
                        </BrowserRouter>

                        <SonnerProvider />
                    </ThemeProvider>
                </NewUserProvider>
            </ReactQueryProvider>
        </AuthProvider>
    )
}

export default App
