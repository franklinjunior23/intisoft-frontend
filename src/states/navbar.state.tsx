import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { create } from 'zustand'

interface NavbarState {
    isOpen: boolean
    toggleNavbar: () => void
}

export const useNavbarStore = create<NavbarState>((set) => {
    // Verificar si hay un valor en localStorage y convertirlo a booleano
    const initialIsOpen = localStorage.getItem(LocalStorageKeys.stateNavbar)
        ? localStorage.getItem(LocalStorageKeys.stateNavbar) === 'true'
        : true

    // Devolver el estado inicial y la función de toggle
    return {
        isOpen: initialIsOpen,
        toggleNavbar: () =>
            set((state) => {
                const newValue = !state.isOpen
                localStorage.setItem(
                    LocalStorageKeys.stateNavbar,
                    newValue.toString()
                )
                return { isOpen: newValue }
            }),
    }
})
