import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
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
import {
    AlertDialogCancel,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import AddBranch from '../add-branch'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { SchemaVisita } from './schema-visit'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface FormVisitProps {
    next: () => void
}

export default function FormVisit({ next }: FormVisitProps) {
    const { company } = useParams()
    const formd = useForm<z.infer<typeof SchemaVisita>>({
        resolver: zodResolver(SchemaVisita),
        defaultValues: {
            companyId: company,
        },
    })
    const { control, watch, setValue, handleSubmit } = formd

    function Submit(data: z.infer<typeof SchemaVisita>) {
        localStorage.setItem('branchId', data.branchId) 
        next()
    }

    return (
        <Form {...formd}>
            <form onSubmit={handleSubmit(Submit)}>
                <header className="grid grid-cols-3 gap-x-2 gap-y-1 items-start">
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

                    <FormField
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de soporte</FormLabel>
                                <Select
                                    value={field.value}
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione el tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={'Presencial'}>
                                            Presencial
                                        </SelectItem>
                                        <SelectItem value={'Remoto'}>
                                            Remoto
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                field.value ??
                                                new Date(field.value)
                                            }
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('2020-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </header>
                <AlertDialogFooter className="mt-5">
                    <Button type="submit">Guardar</Button>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
            </form>
        </Form>
    )
}
