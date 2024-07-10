import { Navigate, Route, Routes } from 'react-router-dom'
import { UseAuth } from './providers/auth.provider'
import { ROLE } from './types/role'
import SignIn from './pages/Sign-In'
import Default from './layaout/defaullt'
import PageHome from './pages/home'

export function MidlewareRoute() {
    const profile = UseAuth()?.profile

    return (
        <Routes>
            {profile?.role === ROLE.CLIENTE ? (
                <Route element={<Default />}>
                    <Route path="/" element={<PageHome />} />
                </Route>
            ) : (
                <>
                    <Route path="/" element={<SignIn />} />
                    <Route
                        path="*"
                        element={
                            <>
                                <Navigate to="/" />
                            </>
                        }
                    />
                </>
            )}
        </Routes>
    )
}
