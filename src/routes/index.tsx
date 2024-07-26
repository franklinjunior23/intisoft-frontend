import { Route, Routes } from 'react-router-dom'
import { MidlewareRoute } from '@/midleware.route'
import { UseAuth } from '@/providers/auth.provider'
import { ROLE } from '@/types/role'
import { AdminRoutes } from './admin.route'
import { ClientRoutes } from './client.route'

export function PageIndex() {
    return (
        <Routes>
            <Route path="*" element={<MidlewareRoute />} />
        </Routes>
    )
}

export const RouteUser = () => {
    const { profile } = UseAuth()
    if (profile?.role === ROLE.ADMIN) return AdminRoutes
    if (profile?.role === ROLE.SOPORTE) return AdminRoutes
    if (profile?.role === ROLE.CLIENTE) return ClientRoutes

    throw new Error('Error en la ruta programada')
}
