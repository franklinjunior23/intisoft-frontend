import { deviceStatus, deviceType } from '@/types/device'
import { z } from 'zod'

export const SchemaDesktop = z.object({})

export const SchemaDetailsDevice = z.object({
    network: z
        .array(
            z.object({
                name: z.string(),
                mac: z.string(),
                ip4: z.string().optional(),
                ip6: z.string().optional(),
                type: z.string().optional(),
                speed: z.string().optional(),
                status: z.string().optional(),
                isDhcp: z.boolean().optional(),
                isVirtual: z.boolean().optional(),
            })
        )
        .optional(),
    anydesk: z
        .object({
            id: z.string(),
            password: z.string().optional(),
        })
        .optional(),
    os: z
        .object({
            platform: z.string(),
            distro: z.string(),
            release: z.string(),
            kernel: z.string().optional(),
            architecture: z.string().optional(),
            build: z.string().optional(),
            serial: z.string().optional(),
            uefi: z.boolean().optional(),
            fqdn: z.string().optional(),
        })
        .optional(),
    motherboard: z
        .object({
            brand: z.string(),
            model: z.string(),
            quantitySlots: z.string(),
            socket: z.string(),
        })
        .optional(),
    cpu: z
        .object({
            brand: z.string(),
            model: z.string(),
            cores: z.string(),
            threads: z.string(),
        })
        .optional(),
    ram: z
        .array(
            z.object({
                brand: z.string(),
                model: z.string(),
                type: z.string(),
                capacity: z.string(),
                speed: z.string(),
            })
        )
        .optional(),
    storage: z
        .array(
            z.object({
                brand: z.string(),
                model: z.string(),
                capacity: z.string(),
                type: z.string(),
            })
        )
        .optional(),
    gpu: z
        .array(
            z.object({
                brand: z.string(),
                model: z.string(),
                vram: z.string(),
                position: z.string(),
            })
        )
        .optional(),
    accounts: z
        .array(
            z.object({
                role: z.string(),
                name: z.string(),
                user: z.string(),
                password: z.string(),
            })
        )
        .optional(),
    networkPrint: z
        .object({
            ipv4: z.string(),
            ipv6: z.string().optional(),
        })
        .optional(),
})
export const SchemaDevice = z
    .object({
        branchId: z.string(),
        userId: z.string().optional(),
        AreaId: z.string().optional(),
        name: z.string(),
        nickName: z.string(),
        codeDevice: z.string().optional(),
        status: z.nativeEnum(deviceStatus),
        dateCreated: z
            ?.string() // Espera inicialmente un string
            ?.transform((dateStr) => {
                // Intenta crear un objeto `Date` desde el string
                const date = new Date(dateStr)
                if (isNaN(date.getTime())) {
                    // Si la fecha es inválida, lanza un error
                    throw new Error('Invalid date string')
                }
                return date
            })
            .refine((date) => date instanceof Date, {
                message: 'Expected Date',
            }),
        information: z.object({
            type: z.nativeEnum(deviceType),
            typeDevice: z.string(),
            brand: z.string(),
            model: z.string().optional(),
            serialNumber: z.string().optional(),
        }),
    })
    .merge(SchemaDetailsDevice)
