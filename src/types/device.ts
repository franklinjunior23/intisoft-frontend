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

export enum deviceType {
    DESKTOP = 'Pc',
    SERVER = 'Servidor',
    LAPTOP = 'Laptop',
    RED = 'Red',
    PRINTER = 'Impresora',
}

export enum Os {
    WINDOWS = 'Windows',
    LINUX = 'Linux',
    MAC = 'Mac',
}
export const distroOs = [
    'Windows 11 Pro',
    'Windows 11 Pro Education',
    'Windows 11 Pro for Workstations',
    'Windows 11 Home',
    'Windows 10 Pro',
    'Windows 10 Home',
    'Windows 8.1 Pro',
    'Windows 8.1 Home',
    'Windows 7 Home Basic',
    'Windows 7 Home Premium',
    'Windows 7 Professional',
]

export const architecture = ['x86', 'x64', 'ARM']
