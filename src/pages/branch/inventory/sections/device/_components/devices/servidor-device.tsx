import { Control } from 'react-hook-form'
import { PcDevice } from './pc-device'
import { z } from 'zod'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
interface ServerProps {
    control: Control<z.infer<typeof SchemaDevice>>
    watch: object
}

export function ServerDevice({ control, watch }: ServerProps) {
    return (
        <>
            <PcDevice control={control} watch={watch} />
        </>
    )
}
