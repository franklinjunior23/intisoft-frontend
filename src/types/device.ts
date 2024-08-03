import { area } from './area'
import { user } from './users'

type OptionalArea = Omit<area, 'id'> & Partial<Pick<area, 'id'>>

export interface device {
    id: string
    name: string
    nickName: string
    status: deviceStatus
    codeDevice: string
    anydesk: {
        id: string
        password?: string
    }
    information: information
    dateCreated: Date
    isRegisterAgent: boolean
    notes: notes
    area?: OptionalArea
    user?: user
    createdAt: Date
    deletedAt?: Date
}
export interface notes {
    title: string
    tag: string[]
    description: string
    createdAt: Date
}

export interface information {
    type: string
    typeDevice: string
    brand: string
    model: string
    serialNumber: string
    typeConection: string
}

export enum deviceStatus {
    ACTIVE = 'Activo',
    INACTIVE = 'Inactivo',
    DISREPAIR = 'En mal estado',
    INREPAIR = 'En reparación',
    INMANTENANCE = 'En mantenimiento',
}
