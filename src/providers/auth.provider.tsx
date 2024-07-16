import { InstanceAxios } from '@/helper/axios-config'
import { data, user } from '@/types/sign'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export type contextAuth = {
    profile: user | null
    token: string | null
    login: (data: data) => void
    logout: () => void
}

const ContextAuth = createContext<contextAuth>({} as contextAuth)

export function UseAuth() {
    return useContext(ContextAuth)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [User, setUser] = useState<user | null>(() =>
        localStorage.getItem('profile')
            ? JSON.parse(localStorage.getItem('profile') as string)
            : null
    )
    const [token, setToken] = useState<string | null>(null)

    const isLoged = localStorage.getItem('isLoged') ?? null

    async function refrehs() {
        const { data } = await InstanceAxios.post('auth/refresh-token')
        if (data?.success === false) {
            return localStorage.removeItem('isLoged')
        }

        setUser({
            name: data.profile.name,
            lastName: data.profile.lastName,
            role: data.profile.role,
        })
        setToken(data.token)
    }

    useEffect(() => {
        if (isLoged) {
            refrehs()
        }
    }, [])

    function login(data: data) {
        localStorage.setItem('isLoged', 'true')
        toast.success(
            `Bienvenido ${data.profile.name} ${data.profile.lastName}`
        )
        localStorage.setItem('profile', JSON.stringify(data.profile))
        setUser({
            name: data.profile.name,
            lastName: data.profile.lastName,
            role: data.profile.role,
        })
        setToken(data.token)
    }

    async function logout() {
        await InstanceAxios.post('auth/logout')
        toast.success(`Sesion cerrada ${User?.name}`)
        localStorage.removeItem('isLoged')
        setUser(null)
        setToken(null)
    }

    return (
        <ContextAuth.Provider value={{ profile: User, token, login, logout }}>
            {children}
        </ContextAuth.Provider>
    )
}
