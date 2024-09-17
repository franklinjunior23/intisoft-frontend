import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { StatusUser, typedocument, user } from '@/types/users'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
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
import InputDinamic from '@/components/ui/input-search'
import { TYPEACCOUNT, TYPEPOST } from '../data/data.user'
import { useEffect } from 'react'

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
    gender: z.boolean(
        z.enum(['masculino', 'femenino']).transform((val) => {
            return val === 'masculino' ? true : false
        })
    ),
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

export function FormUser({ data }: { data: user | null }) {
    const formd = useForm<z.infer<typeof shema>>({
        resolver: zodResolver(shema),
    })

    const status = Object.values(StatusUser)

    const fieldDoc = Object.values(typedocument)

    const FieldEmail = useFieldArray({
        control: formd.control,
        name: 'email',
    })

    const onSubmit = (data: unknown) => {
        console.log(data)
    }

    return (
        <Form {...formd}>
            <form onSubmit={formd.handleSubmit(onSubmit)}>
                <main className="grid md:grid-cols-3 gap-x-3 gap-y-1">
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
                    <Controller
                        control={formd.control}
                        name={`post`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                    <InputDinamic
                                        data={TYPEPOST}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formd.control}
                        name="document.type"
                        render={({ field }) => {
                            return (
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
                            )
                        }}
                    />
                    <FormField
                        control={formd.control}
                        name="document.number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numero de doc</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
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
                </main>

                <div className="grid grid-cols-2 gap-3 "></div>
                <div>
                    <h3>Email</h3>
                    <div>
                        {FieldEmail.fields.map((item, index) => (
                            <div key={item.id}>
                                <Controller
                                    control={formd.control}
                                    name={`email.${index}.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo</FormLabel>
                                            <FormControl>
                                                <InputDinamic
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
                                    control={formd.control}
                                    name={`email.${index}.direction`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirreción</FormLabel>
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
                                <Button
                                    type="button"
                                    onClick={() => FieldEmail.remove(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            onClick={() => {
                                FieldEmail.append({
                                    type: '',
                                    direction: '',
                                    password: '',
                                })
                            }}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
                <div>
                    <FormField
                        control={formd.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar el estado del usuario" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {status.map((item) => (
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

                    
                </div>

                <Button type="submit">Enviar</Button>
            </form>
        </Form>
    )
}
