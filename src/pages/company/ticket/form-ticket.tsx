import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import SelectBranch from './select-branch'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Link } from 'react-router-dom'
import { PriorityTicket, TypeIncidences } from './data/priority.data'

type FormTicketType = {
    CloseDialog: () => void
}

export default function FormTicket({ CloseDialog }: FormTicketType) {
    const formd = useForm()
    const { control, handleSubmit } = formd

    function Submit(data) {
        console.log(data)
    }

    return (
        <Form {...formd}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSubmit(Submit)()
                }}
            >
                <main className="flex gap-4">
                    <section>
                        <div className="flex gap-1 ">
                            <FormField
                                name="problem"
                                control={control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Problema</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Problema presentado"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SelectBranch control={control} />
                        </div>
                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Descripción del problema
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Descripcion del problema"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full p-10 border mt-2">
                            Archivos Adjuntos
                        </div>
                    </section>
                    <section className="grid grid-cols-2 gap-x-2 grid-rows-4">
                        <FormField
                            control={control}
                            name="dateCreated"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel>Fecha de Creacion</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] pl-3  text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
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
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prioridad</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Prioridad del ticket" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PriorityTicket.map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Incidencia</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tipo de incidencia" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TypeIncidences.map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Categoria presentado"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                </main>
            </form>
        </Form>
    )
}
