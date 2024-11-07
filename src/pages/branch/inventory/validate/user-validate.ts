import { StatusUser } from '@/types/users'
import { z } from 'zod'
const SchemaUser = z.object({
    
    name: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(['Femenino', 'Masculino']),
    status: z.enum([StatusUser.ACTIVE, StatusUser.PROCES, StatusUser.RETIRED]),
    document: z.object({
        type: z.enum(['Dni', 'passport', 'docExtanjero', 'ruc']),
        number: z.string().min(5),
    }),
    post: z.string().min(3),
    email: z
        .array(
            z.object({
                type: z.string(),
                direction: z.string(),
                password: z.string(),
            })
        )
        .optional(),
    areaId: z.string().optional(),
    branchId: z.string(),
    deviceId: z.string().optional(),
})

export default SchemaUser
