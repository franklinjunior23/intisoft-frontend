import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { create } from 'zustand'

interface interfaceLocalStorageState {
    company: string | null
    branch: string | null
    setCompany: (company: string) => void
    setBranch: (branch: string) => void
}

export const LocalStorageState = create<interfaceLocalStorageState>((set) => ({
    company: localStorage.getItem(LocalStorageKeys.company),
    branch: localStorage.getItem(LocalStorageKeys.branch),
    setCompany: (company) => {
        localStorage.setItem(LocalStorageKeys.company, company)
        set({ company })
    },
    setBranch: (branch) => {
        localStorage.setItem(LocalStorageKeys.branch, branch)
        set({ branch })
    },
}))
