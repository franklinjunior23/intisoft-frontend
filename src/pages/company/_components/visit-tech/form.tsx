import { useForm } from 'react-hook-form'
import {
    Form,
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
import { useParams } from 'react-router-dom'
import SelectBranch from './select-branch'

export default function FormVisit() {
    const { company } = useParams()
    const formd = useForm()
    const { control,watch } = formd
    return (
        <Form {...formd}>
            <form>
                <header className="grid grid-cols-2 gap-2">
                    <FormField
                        control={control}
                        name="companyId"
                        defaultValue={company}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Empresa</FormLabel>
                                <Select
                                    value={field.value}
                                    defaultValue={field.value}
                                    disabled
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione la empresa" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={company}>
                                            {company}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SelectBranch control={control} watch={watch} />
                </header>
            </form>
        </Form>
    )
}
