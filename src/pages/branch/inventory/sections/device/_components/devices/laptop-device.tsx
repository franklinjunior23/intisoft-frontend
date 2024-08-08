import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { PcDevice } from './pc-device'

interface LaptopProps {
    control: Control<z.infer<typeof SchemaDevice>>
    watch: object
}

export function LaptopDevice({ control, watch }: LaptopProps) {
    return (
        <>
            <PcDevice control={control} watch={watch} />
        </>
    )
}
