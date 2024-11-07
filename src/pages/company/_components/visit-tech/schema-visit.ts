import { z } from 'zod'

export const SchemaVisita = z.object({
    companyId: z.string(),
    branchId: z.string(),
    type: z.string(),
    date: z.date().optional(),
    // typeAction: z.string(),
})

export const SchemaInformation = z.object({
    information: z.array(
        z.object({
            typeAction: z.string(),
            isGroup: z.boolean().optional(),
            diagnostic: z.string(),
            correctivo: z.string(),
            status: z.string().optional(),
            observation: z.string().optional(),
        })
    ),
})
