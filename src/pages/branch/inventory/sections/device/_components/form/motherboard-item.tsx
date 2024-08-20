import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { SchemaDevice } from '../../../../validate/device-validate'
import InputDinamic from '@/components/ui/input-search'
import { brandsAll } from '../../constants/brands-device'

interface MotherboardItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

export function MotherboardItem({ control }: MotherboardItemProps) {
    return (
        <div>
            <h3 className="py-2">Motherboard</h3>
            <div className="grid grid-cols-2 gap-2 gap-y-1">
                <FormField
                    name="motherboard.brand"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marca</FormLabel>
                            <FormControl>
                                <InputDinamic
                                    placeholder="Seleccione la marca"
                                    data={brandsAll}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="motherboard.model"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Modelo de la motherboard .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="motherboard.socket"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Socket</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Socket  de la motherboard .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="motherboard.quantitySlots"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ranuras Ram</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Ranuras de la motherboard .."
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
