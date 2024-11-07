import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
    FormDescription,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import IsGroup from './is-group'
import { AlertDialogFooter } from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'
import { z } from 'zod'
import { SchemaInformation } from './schema-visit'
import { zodResolver } from '@hookform/resolvers/zod'

interface RegisterVisitProps {
    next: () => void
}

export default function RegisterVisit({ next }: RegisterVisitProps) {
    const [StateSelect, setStateSelect] = useState<Array<unknown>>([])
    const formd = useForm<z.infer<typeof SchemaInformation>>({
        defaultValues: {
            information: [{ typeAction: '' }],
        },
    })

    const { control, handleSubmit, watch } = formd
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'information',
    })
    function Submit(data: unknown) {
        console.log(data)
    }

    return (
        <Form {...formd}>
            <form onSubmit={handleSubmit(Submit)}>
                <main className="flex flex-col h-[400px] overflow-y-auto">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-[35%_60%] gap-3 border p-3"
                        >
                            <div className="flex flex-col gap-2">
                                <FormField
                                    control={control}
                                    name={`information.${index}.typeAction`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar el tipo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="user">
                                                        Usuario
                                                    </SelectItem>
                                                    <SelectItem value="device">
                                                        Dispositivo
                                                    </SelectItem>
                                                    <SelectItem value="area">
                                                        Area
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`information.${index}.isGroup`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5 ">
                                                <FormLabel className="text-base">
                                                    Seleccionar uno del tipo
                                                </FormLabel>
                                                <FormDescription>
                                                    Al seleccionar uno del tipo,
                                                    se podra marcar solamente
                                                    uno
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    aria-readonly
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <IsGroup
                                    control={control}
                                    index={index}
                                    typeOption={watch(
                                        `information.${index}.typeAction`
                                    )}
                                    isGroup={watch(
                                        `information.${index}.isGroup`
                                    )}
                                    setState={() => setStateSelect}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-x-2">
                                <FormField
                                    control={control}
                                    name={`information.${index}.diagnostic`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Diagnostico</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describir el diagnostico"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`information.${index}.correctivo`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correctivo</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describir el correctivo"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`information.${index}.status`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Estado"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name={`information.${index}.observation`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Observacions y recomendaciones
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Observaciones y recomendaciones"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    type="button"
                                    onClick={() => {
                                        remove(index)
                                    }}
                                >
                                    <Trash className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </main>
                <Button
                    type="button"
                    onClick={() => {
                        append({})
                    }}
                >
                    Agregar
                </Button>
                <AlertDialogFooter>
                    <Button type="submit">Guardar</Button>
                </AlertDialogFooter>
            </form>
        </Form>
    )
}
