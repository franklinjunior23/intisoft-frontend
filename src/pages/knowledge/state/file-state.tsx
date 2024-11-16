import { create } from 'zustand'

type documentKnowledge = {
    id: string
    title: string
    content: string
    category: string[]
    files: unknown[] | undefined
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

type State = {
    data: documentKnowledge | null
    addKnowledge: (data: documentKnowledge) => void
}

const StoreFile = create<State>((set) => ({
    data: null,
    // state/file-state.ts
    addKnowledge: (data) => {
        console.log('Added document:', data.id)
        set({ data: { ...data } }) // Hacer una copia del objeto
    },
}))

export default StoreFile
