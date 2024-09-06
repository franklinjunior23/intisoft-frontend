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
import { BranchsGet } from '../../action/company.service'
import { Skeleton } from '@/components/ui/skeleton'

interface SelectBranchProps {
    control: Control
    watch: (name: string) => string
}

export default function SelectBranch({ control, watch }: SelectBranchProps) {
    const { data, isLoading, isError } = BranchsGet()
    console.log(watch('companyId'))
    if (isLoading) return <Skeleton className="w-full h-3" />
    return (
        <FormField
            control={control}
            name="branchId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Sucursal</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar una sucursal" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {data.data.branchs.map((branch) => (
                                <SelectItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
