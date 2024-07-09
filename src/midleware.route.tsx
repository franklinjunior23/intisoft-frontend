import { Route, Routes } from 'react-router-dom'
import SignIn from './routes/sign-in/page'
import { UseAuth } from './providers/auth.provider'
import { ROLE } from './types/role'

export function MidlewareRoute() {
    const role = 'ee'

    return (
        <Routes>
            {role === ROLE.ADMIN ? (
                <Route path="/" element={<>tENES ADMIN PA</>} />
            ) : (
                <Route path="/" element={<SignIn />} />
            )}
        </Routes>
    )
}
