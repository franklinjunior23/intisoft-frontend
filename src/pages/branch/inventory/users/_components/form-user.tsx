import { useFieldArray, useForm } from 'react-hook-form'
import { typedocument, user } from '@/types/users'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import InputSearch from '@/components/ui/input-search'
import { useState } from 'react'

const shema = z.object({
    name: z.string(),
    lastName: z.string(),
    email: z
        .array(
            z.object({
                type: z.string(),
                direction: z.string(),
                password: z.string().optional(),
            })
        )
        .optional(),
    post: z.string().optional(),
    document: z.object({ type: z.string(), number: z.string() }),
    gender: z.enum(['masculino', 'femenino']).transform((val) => {
        return val === 'masculino'
    }),
    status: z.string(),
    area: z.object({ id: z.string(), name: z.string() }),
    device: z
        .object({
            id: z.string(),
            name: z.string(),
            nickName: z.string(),
            status: z.string(),
        })
        .optional(),
})

export function FormUser({ data }: { data: user }) {
    const [dataCargo, setdataCargo] = useState<string[]>(['Cargo 1', 'Cargo 2'])
    const formd = useForm<z.infer<typeof shema>>({
        resolver: zodResolver(shema),
        defaultValues: data as z.infer<typeof shema>,
    })
    const fieldDoc = Object.values(typedocument)

    const FieldEmail = useFieldArray({
        control: formd.control,
        name: 'email',
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Form {...formd}>
            <form onSubmit={formd.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-3 ">
                    <FormField
                        control={formd.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formd.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 ">
                    <FormField
                        control={formd.control}
                        name="document.type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de doc.</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar el tipo de documento" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fieldDoc.map((item) => (
                                            <SelectItem key={item} value={item}>
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
                        control={formd.control}
                        name="document.number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numero</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3 ">
                    <FormField
                        control={formd.control}
                        name="post"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cargo" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formd.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genero</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={
                                        field.value ? 'masculino' : 'femenino'
                                    }
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar el tipo de documento" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="masculino">
                                            Masculino
                                        </SelectItem>
                                        <SelectItem value="femenino">
                                            Femenino
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <h3>Email</h3>
                    <div>
                        {FieldEmail.fields.map((item, index) => (
                            <div key={item.id}>
                                <FormField
                                    control={formd.control}
                                    name={`email.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Tipo"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formd.control}
                                    name={`email.${index}.direction`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formd.control}
                                    name={`email.${index}.password`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
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
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}
