import { company } from '@/types/company'
import { create } from 'zustand'

interface StateCompany {
    state: null | company[] | undefined // Define the state shape here
    setAdd: (data: company[]) => void // Function to add/update state
}

/**
 * Represents the state of the company.
 */
export const useStateCompany = create<StateCompany>((set) => ({
    state: null, // Initial state is null
    setAdd: (data: company[]) => set({ state: data }), // Function to set or update the state
}))
