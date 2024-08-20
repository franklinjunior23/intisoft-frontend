import { device } from '@/types/device'
import { create } from 'zustand'

type Store = {
    data: device | null
    setDevice: (newDevice: device) => void
    setDeviceField: <K extends keyof device>(field: K, value: device[K]) => void
}

const useDeviceStore = create<Store>((set) => ({
    data: null,
    setDevice: (newDevice) => set({ data: newDevice }),
    setDeviceField: (field, value) =>
        set((state) => ({
            data: state.data ? { ...state.data, [field]: value } : null,
        })),
}))

export default useDeviceStore
