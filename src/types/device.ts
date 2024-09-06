import { area } from './area'
import { user } from './users'

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
    notes: notes[] | null
    details: {
        os?: OperatingSystem
        cpu: Cpu
        motherboard: motherboard
        ram: Ram[] | null
        graphic: Gpu[] | null
        storage: Storage[] | null
        network: Network[] | null
        accounts?: Account[] | null
    }
    area?: area
    user?: user
    parentDevice: DeviceInformation | null
    children: DeviceInformation[] | null
    createdAt: Date
    deletedAt?: Date
}

export type DeviceInformation = {
    id: string
    name: string
    nickName: string
    codeDevice: string
    status: deviceStatus
    information: {
        type: deviceType
        typeDevice: string
    }
    branch: {
        name: string
        company: {
            name: string
        }
    }
}


export interface OperatingSystem {
    platform: string
    distro: string
    release: string
    architecture: string
    kernel?: string
    build?: string
    serial?: string
    uefi?: boolean
    fqdn?: string
}
export interface motherboard {
    brand: string
    model: string
    quantitySlots: string
    socket: string
}

export interface Cpu {
    brand: string
    model: string
    cores: string
    threads: string
}
export interface Gpu {
    brand: string
    model: string
    vram: string
    position: string
}
export interface Ram {
    brand?: string
    model?: string
    type: string
    capacity: number
    speed: string
}

export interface Storage {
    brand: string
    model: string
    capacity: string
    type: string
}

export interface Network {
    name: string
    mac: string
    ip4: string
    ip6: string
    type: string
    speed: string
    status: string
    isDhcp: boolean
    isVirtual: boolean
}

export interface Account {
    name: string
    role: string
    user: string
    password: string
}

export interface notes {
    title: string
    tag: string[]
    description: string
    createdAt: Date
}

export interface information {
    type: deviceType
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
