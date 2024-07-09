import { Route, Routes } from 'react-router-dom'
import { MidlewareRoute } from '@/midleware.route'

export function PageIndex() {
    return (
        <Routes>
            <Route path="*" element={<MidlewareRoute />} />
        </Routes>
    )
}
