import { z } from 'zod'

const SchemaProfile = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
})

export default SchemaProfile
