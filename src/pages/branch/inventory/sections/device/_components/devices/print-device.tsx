import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { AccountsItem } from '../form/accounts-item'

interface PrintProps {
    control: Control<z.infer<typeof SchemaDevice>>
    watch: object
}
export function PrintDevice({ control, watch }: PrintProps) {
    return (
        <>
            <AccountsItem control={control} />
        </>
    )
}
