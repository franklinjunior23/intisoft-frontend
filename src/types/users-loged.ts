export interface UsersLoged {
    id: string
    name: string
    lastName: string
    email: string
    user: string
    createdAt: string
    deletedAt: Date
    role: {
        name: string
    }
    company?: {
        id: string
        name: string
    }
}

