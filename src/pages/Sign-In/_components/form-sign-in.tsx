import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { data, ErrorAxios, sign } from '@/types/sign'
import { useMutation } from '@tanstack/react-query'
import { SignIn } from '../action/sign-in.service'
import { toast } from 'sonner'
import { UseAuth } from '@/providers/auth.provider'

const shemaSign = z.object({
    user: z
        .string({
            message: 'El usuario debe tener entre 3 y 20 caracteres',
        })
        .min(3)
        .max(20),
    password: z
        .string({
            message: 'La contraseña debe tener entre 3 y 20 caracteres',
        })
        .min(3)
        .max(20),
})

export function FormSign() {
    const Sign = UseAuth()?.login
    const mutateSign = useMutation({
        mutationKey: ['sigin'],
        mutationFn: async (data: sign) => SignIn(data),
        onSuccess: (data: data) => {
            if (!data.token) return toast.error('Error al iniciar sesion')
            if (Sign) Sign(data)
            console.log('success')
        },
        onError: (err: ErrorAxios) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const formd = useForm<z.infer<typeof shemaSign>>({
        resolver: zodResolver(shemaSign),
    })

    function Submit(data: sign) {
        mutateSign.mutate(data)
    }

    return (
        <Form {...formd}>
            <form
                id="form-sign-in"
                onSubmit={formd.handleSubmit(Submit)}
                className="mt-5 flex flex-col gap-5"
            >
                <FormField
                    control={formd.control}
                    name="user"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Usuario123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formd.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="******"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            <footer className="mt-6">
                <Button
                    form="form-sign-in"
                    disabled={mutateSign.isPending}
                    type="submit"
                    className="w-full"
                >
                    Ingresar
                </Button>
            </footer>
        </Form>
    )
}
