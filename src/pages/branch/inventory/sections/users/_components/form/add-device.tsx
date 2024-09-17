import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { GetDevice } from '@/pages/branch/action/device-actiion.service'
import { Control, FieldValues } from 'react-hook-form'
import { CreateDevice } from '../../../device/_components/form/create-device'

export interface deviceId {
    deviceId: string
}

export function DeviceVincule({ control }: { control: Control<FieldValues> }) {
    const { data, isLoading } = GetDevice()
    if (isLoading) return <div>Cargando...</div>

    return (
        <div className="grid grid-cols-1 gap-2 items-end">
            <h3 className="text-lg font-medium mb-2">Dispositivo</h3>
            <div className="grid grid-cols-[1fr_50px] gap-2 items-end justify-between">
                <FormField
                    name="deviceId"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dispositivo</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el dispositivo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data?.data.map((device) => (
                                        <SelectItem
                                            key={device.id}
                                            value={device.id}
                                        >
                                            {device.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <CreateDevice />
            </div>
        </div>
    )
}
