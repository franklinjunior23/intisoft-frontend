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
import { Control, FieldValues } from 'react-hook-form'
import { AddArea } from '../add-area'
import { useStateArea } from '@/pages/branch/inventory/state/state-area'

export default function FieldArea({
    control,
}: {
    control: Control<FieldValues>
}) {
    const { area } = useStateArea()

    return (
        <div className="">
            <h3 className="text-lg font-medium mb-2">Area</h3>
            <div className="grid grid-cols-[1fr_50px] gap-2 items-end">
                <FormField
                    name="areaId"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area</FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione la area " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {area?.map((area) => (
                                        <SelectItem
                                            key={area.name}
                                            value={String(area.id)}
                                        >
                                            {area.id} - {area.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AddArea />
            </div>
        </div>
    )
}
