import { Meta } from './company'

export interface user {
    id: string
    name: string
    lastName: string
    email?: email[] | null
    document?: { type: string; number: string }
    gender: boolean | string
    status: StatusUser
    post: string
    createdAt: Date
    area: {
        id: string
        name: string
    }
    device: {
        id: string
        name: string
        nickName: string
        status: string
    }
}

export interface userCreate extends user {
    branchId: string
}

export interface email {
    type: string
    direction: string
    password?: string
}

export enum StatusUser {
    ACTIVE = 'Activo',
    RETIRED = 'Retirado',
    PROCES = 'En proceso',
}

export interface GetUserType {
    data: user[] | []
    meta: Meta
}

export enum typedocument {
    DNI = 'Dni',
    PASSPORT = 'Pasaporte',
    DOCEXTANJERO = 'Carnet de extranjeria',
    RUC = 'RUC',
}
export enum gender {
    MASC = 'Masculino',
    FEM = 'Femenino',
}
