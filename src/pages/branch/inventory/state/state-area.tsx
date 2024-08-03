import { area } from '@/types/area'
import { create } from 'zustand'

interface StateArea {
    area: [] | area[] // Define the state shape here
    setArea: (data: area[]) => void // Function to add/update state
    addArea: (newArea: area) => void // Function to add a new area to the state
}

export const useStateArea = create<StateArea>((set) => ({
    area: [], // Initial state is null
    setArea: (data: area[]) => set({ area: data }), // Function to set or update the state
    addArea: (newArea: area) =>
        set((state) => ({
            area: [...state.area, newArea], // Add the new area to the existing array
        })),
}))
