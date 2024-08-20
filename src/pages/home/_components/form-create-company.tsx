import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCompany } from '../action/company.service'
import { toast } from 'sonner'

const shema = z.object({
    name: z.string().min(3, {
        message: 'El numero de caracteres tiene que ser mas de 3',
    }),
    businessName: z.string().min(3, {
        message: 'El numero de caracteres tiene que ser mas de 3',
    }),
    place: z.string().min(3, {
        message: 'El numero de caracteres tiene que ser mas de 3',
    }),
})

export default function FormCompany() {
    const queryClien = useQueryClient()
    const formd = useForm<z.infer<typeof shema>>({
        resolver: zodResolver(shema),
    })

    const CREATECOMPANY = useMutation({
        mutationFn: async (data: z.infer<typeof shema>) =>
            await createCompany({
                name: data.name ?? '',
                businessName: data.businessName ?? '',
                place: data.place ?? '',
            }),
        onSuccess: (data) => {
            if (data.success) {
                toast.success(
                    data.message ??
                        `Empresa creada correctamente : ${formd.watch('name')}`
                )
                queryClien.refetchQueries()
                return formd.reset()
            }
        },
        onError: (err) => {
            toast.error(err.message)
        },
    })
    return (
        <Form {...formd}>
            <form
                onSubmit={formd.handleSubmit((data) =>
                    CREATECOMPANY.mutate(data)
                )}
            >
                <FormField
                    control={formd.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Empresa" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formd.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Razon social</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Razon Social .."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formd.control}
                    name="place"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ubicacion | lugar "
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant={'secondary'}>Crear Empresa</Button>
                    <Button variant={'ghost'} type="button">
                        Cancelar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}
