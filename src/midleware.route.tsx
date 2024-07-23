import { Navigate, Route, Routes } from 'react-router-dom'
import { UseAuth } from './providers/auth.provider'
import { ROLE } from './types/role'
import SignIn from './pages/Sign-In'
import Default from './layaout/defaullt'
import PageHome from './pages/home'
import { PageCompanie } from './pages/company'
import { PageBranch } from './pages/branch'
import PageUsers from './pages/branch/inventory/users'
import PageDevices from './pages/branch/inventory/device'
import { PageUserOne } from './pages/branch/inventory/users/user-id'

export function ClientRoutes() {
    return (
        <Routes>
            <Route element={<Default />}>
                <Route path="/" element={<PageHome />} />
                <Route path=":company" element={<PageCompanie />} />
                <Route path=":company/:branch" element={<PageBranch />}>
                    <Route path="usuarios" element={<PageUsers />} />
                    <Route path="dispositivos" element={<PageDevices />} />
                    <Route
                        path=""
                        element={<Navigate replace to="usuarios" />}
                    />
                    <Route
                        path="*"
                        element={<Navigate replace to="usuarios" />}
                    />
                </Route>
                <Route
                    path=":company/:branch/usuarios/:userId"
                    element={<PageUserOne />}
                />
            </Route>
        </Routes>
    )
}

export function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export function MidlewareRoute() {
    const profile = UseAuth()?.profile

    return (
        <>
            {profile?.role === ROLE.ADMIN && <ClientRoutes />}
            {!profile?.role && <PublicRoutes />}
        </>
    )
}
