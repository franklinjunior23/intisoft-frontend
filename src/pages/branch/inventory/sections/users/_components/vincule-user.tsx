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
import { Control } from 'react-hook-form'
import AddUser from './add-user'

interface VinculeUserProps {
    control: Control
}

export default function VinculeUser({ control }: VinculeUserProps) {
    return (
        <div>
            <h3 className="text-lg font-medium mb-2">Usuario</h3>
            <div className="flex items-end gap-2">
                <FormField
                    control={control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar el usuario a vincular" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">
                                        m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                        m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                        m@support.com
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AddUser />
            </div>
        </div>
    )
}
