import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Control } from 'react-hook-form'
import { z } from 'zod'

interface AnydeskItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

export function AnydeskItem({ control }: AnydeskItemProps) {
    return (
        <div>
            <h3 className='py-2'>Anydesk</h3>
            <div className='grid grid-cols-2 gap-2 gap-y-1'>
                <FormField
                    name="anydesk.id"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Id</FormLabel>
                            <FormControl>
                                <Input placeholder="Anydesk Id .." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="anydesk.password"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Anydesk contraseña .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
