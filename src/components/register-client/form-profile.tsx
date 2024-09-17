import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import SchemaProfile from './validate-profile'
import { z } from 'zod'
import { Button } from '../ui/button'

interface FormProfileProps {
    isloading: boolean
    Onsubmit: (data: z.infer<typeof SchemaProfile>) => void
}

export default function FormProfile({ Onsubmit, isloading }: FormProfileProps) {
    const formd = useForm<z.infer<typeof SchemaProfile>>({
        resolver: zodResolver(SchemaProfile),
    })
    const { handleSubmit, control } = formd
    return (
        <section>
            <Form {...formd}>
                <form onSubmit={handleSubmit(Onsubmit)}>
                    <section className="flex flex-col md:grid grid-cols-2 gap-2 my-5">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nombre.."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Apellido.."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isloading}
                    >
                        Finalizar Registro
                    </Button>
                </form>
            </Form>
        </section>
    )
}
