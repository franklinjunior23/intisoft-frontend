import { Button } from '@/components/ui/button'
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateBranch } from '../action/company.service'
import { toast } from 'sonner'

const schema = z.object({
    name: z.string().min(3, {
        message: 'El numero de caracteres tiene que ser mas de 3',
    }),
})

function FormBranch() {
    const client = useQueryClient()
    const formd = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const MUTATECREATE = useMutation({
        mutationFn: CreateBranch,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message)
                client.refetchQueries()
                formd.reset()
                return
            }
        },
    })

    function onSubmit(data: z.infer<typeof schema>) {
        MUTATECREATE.mutate({ name: data.name })
    }
    return (
        <Form {...formd}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    formd.handleSubmit(onSubmit)()
                }}
            >
                <FormField
                    control={formd.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-5">
                    <Button type="submit">
                        {MUTATECREATE.isPending ? 'Guardando...' : 'Crear'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default function AddBranch() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size={'icon'} className="ml-2">
                    <PlusCircle className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                <FormBranch />
            </PopoverContent>
        </Popover>
    )
}
