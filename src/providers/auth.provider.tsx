import { ROLE } from '@/types/role'
import { createContext, useContext } from 'react'

export type contextAuth = {
    user: {
        Name: string
        Role: ROLE
    }
    tokem: string
    login: (user: string, password: string) => void
    logout: () => void
}

const ContextAuth = createContext<contextAuth | null>(null)

export function UseAuth() {
    return useContext(ContextAuth)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const user = {
        Name: 'User',
        Role: ROLE.ADMIN,
    }
    const tokem = '123456'

    function login(user: string, password: string) {
        console.log(user, password)
    }

    function logout() {
        console.log('logout')
    }

    return (
        <ContextAuth.Provider value={{ user, tokem, login, logout }}>
            {children}
        </ContextAuth.Provider>
    )
}
