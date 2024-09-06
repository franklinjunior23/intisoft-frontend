import PageRegisterClient from '@/components/register-client'
import { KEY_USERNEW } from '@/constants/new-user'
import React, { createContext, useContext, useState } from 'react'

type newUserContext = {
    isNew: boolean
    isRegister: (state: boolean) => void
    addDataUser: <K extends keyof UserNew>(key: K, value: UserNew[K]) => void;
}
type UserNew = {
    name: string
    lastName: string
}

const NewUserContext = createContext<newUserContext>({} as newUserContext)

export function UseNewUser() {
    return useContext(NewUserContext)
}

export default function NewUserProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [IsNew, setIsNew] = useState<boolean>(() => {
        return Boolean(localStorage.getItem(KEY_USERNEW)) ?? false
    })
    const [DataUserNew, setDataUserNew] = useState<UserNew | null>(null)

    function isRegister(state: boolean) {
        setIsNew(state)
    }

    function AddDataUser<K extends keyof UserNew>(key: K, value: UserNew[K]) {
        setDataUserNew((prevState) => ({
            ...prevState,
            [key]: value,
        }))
    }

    return (
        <NewUserContext.Provider
            value={{
                isNew: IsNew,
                isRegister,
                addDataUser: AddDataUser,
            }}
        >
            {/* {IsNew && <PageRegisterClient />} */}
            {children}
        </NewUserContext.Provider>
    )
}
