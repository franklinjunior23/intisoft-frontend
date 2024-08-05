import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { SchemaDevice } from '@/pages/branch/inventory/validate/device-validate'
import { Control } from 'react-hook-form'
import { z } from 'zod'

interface CpuItemProps {
    control: Control<z.infer<typeof SchemaDevice>>
}

export function CpuItem({ control }: CpuItemProps) {
    return (
        <div>
            <h3 className="py-2">Procesador</h3>
            <div className="grid grid-cols-2 gap-2 gap-y-1">
                <FormField
                    name="cpu.brand"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marca</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo de OS" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={'Amd'}>AMD</SelectItem>
                                    <SelectItem value={'Intel'}>
                                        Intel   
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="cpu.model"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Modelo del procesador .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="cpu.cores"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nucleos</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Nucleos del procesador .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="cpu.threads"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hilos</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Hilos del procesador .."
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
