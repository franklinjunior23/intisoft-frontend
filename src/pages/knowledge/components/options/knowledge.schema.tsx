import { z } from 'zod'

export const SchemaKnowledge = z.object({
    title: z.string(),
    content: z.string().optional(),
    category: z.array(
        z.object({
            name: z.string(),
        })
    ),
    folderId: z.string(),
    // status: z.string(),
    // tags: z.array(z.string()),
})
