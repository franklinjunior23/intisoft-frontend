import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import InputDinamic from '@/components/ui/input-search'
import { Control, FieldValues, useFieldArray } from 'react-hook-form'
import { TYPEACCOUNT } from '../../data/data.user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash } from 'lucide-react'

export default function FieldsEmail({
    control,
}: {
    control: Control<FieldValues>
}) {
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: 'email',
    })
    return (
        <div className=" overflow-hidden">
            <h2 className="text-lg font-medium mb-2">Email</h2>
            <main className="flex flex-col gap-1">
                {fields.map((email, index) => (
                    <div
                        key={email.id}
                        className="grid grid-cols-[100px_1fr_1fr_40px] gap-y-3 gap-2"
                    >
                        <FormField
                            name={`email.${index}.type`}
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de correo</FormLabel>
                                    <FormControl>
                                        <InputDinamic
                                            placeholder="Seleccione el tipo"
                                            data={TYPEACCOUNT}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`email.${index}.direction`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`email.${index}.password`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            className="self-end p-2"
                            size={'icon'}
                            onClick={() => remove(index)}
                        >
                            <Trash className="" />
                        </Button>
                    </div>
                ))}
            </main>
            <Button
                type="button"
                className="mt-3"
                onClick={() => {
                    append({ type: '' })
                }}
            >
                <Plus className="w-4 h-4" />
            </Button>
        </div>
    )
}
