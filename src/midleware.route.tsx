import { Navigate, Route, Routes } from 'react-router-dom'
import { UseAuth } from '@/providers/auth.provider'
import { ROLE } from '@/types/role'
import SignIn from '@/pages/Sign-In'
import Default from '@/layaout/defaullt'
import PageHome from '@/pages/home'
import { PageCompanie } from '@/pages/company'
import { PageBranch } from '@/pages/branch'
import PageDevices from '@/pages/branch/inventory/sections/device'
import ClientHome from '@/pages/home/index.client'
import PageUsers from '@/pages/branch/inventory/sections/users'
import { PageUserOne } from '@/pages/branch/inventory/sections/users/user-id'

export function ClientCompany() {
    return (
        <Routes>
            <Route element={<Default />}>
                <Route path="/" element={<ClientHome />} />
                <Route path="usuarios" element={<PageUsers />} />
                <Route path="dispositivos" element={<PageUsers />} />
                <Route path="visitas-tecnicas" element={<PageUsers />} />
            </Route>
        </Routes>
    )
}

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
            {profile?.role === ROLE.CLIENTE && <ClientCompany />}
            {!profile?.role && <PublicRoutes />}
        </>
    )
}
