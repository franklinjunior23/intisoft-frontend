import { ROLE } from './role'

export interface sign {
    user: string
    password: string
}

export interface ErrorAxios {
    response: {
        data: {
            message: string
        }
    }
}

export interface user {
    name: string
    lastName: string
    role: ROLE
    company?: string
}
export interface data {
    profile: user
    token: string
}
