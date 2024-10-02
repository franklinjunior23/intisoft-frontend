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

    async function refrehs() {
        try {
            const { data } = await InstanceAxios.post('auth/refresh-token')
            console.log('Refrescando token')

            if (data?.success === false) {
                return console.log('No se pudo refrescar el token')
            }
            console.log('Token refrescado')

            setUser({
                name: data.profile.name,
                lastName: data.profile.lastName,
                role: data.profile.role,
                company: data.profile?.company,
            })
            setToken(data.token)
        } catch (error) {
            console.log('No se pudo refrescar el token')
            console.log(error)
        }
    }

    function login(data: data) {
        toast.success(
            `Bienvenido ${data.profile.name} ${data.profile.lastName}`
        )
        localStorage.setItem('profile', JSON.stringify(data.profile))

        setUser({
            name: data.profile.name,
            lastName: data.profile.lastName,
            role: data.profile.role,
            company: data.profile?.company,
        })
        setToken(data.token)
    }

    async function logout() {
        await InstanceAxios.post('auth/logout')
        toast.success(`Sesion cerrada ${User?.name}`)
        localStorage.removeItem('profile')
        setUser(null)
        setToken(null)
    }
    useEffect(() => {
        const handleLoad = () => {
            console.log(22)
        }

        // Use 'DOMContentLoaded' instead of 'load' if you want to run the code as soon as the DOM is ready
        if (document.readyState === 'complete') {
            refrehs()
        } else {
            window.addEventListener('load', handleLoad)
        }

        return () => {
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    return (
        <ContextAuth.Provider value={{ profile: User, token, login, logout }}>
            {children}
        </ContextAuth.Provider>
    )
}
