import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Errors, InstanceAxios } from '@/helper/axios-config'
import { UseAuth } from '@/providers/auth.provider'
import { company } from '@/types/company'
import { ROLE } from '@/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function AddUser() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)

    return (
        <>
            <Button size={'icon'} onClick={() => setStateDialog(true)}>
                <PlusCircledIcon className="w-5 h-5" />
            </Button>
            <ModalUser state={StateDialog} setState={setStateDialog} />
        </>
    )
}

const SchemaUser = z.object({
    role: z.string().min(3),
    email: z.string().email(),
    user: z.string().min(3),
    password: z.string().min(6),
    companyId: z.string().optional(),
})

function FormUser({ close }: { close: () => void }) {
    const queryClient = useQueryClient()
    const formd = useForm<z.infer<typeof SchemaUser>>({
        resolver: zodResolver(SchemaUser),
    })
    const { token } = UseAuth()
    const { control, handleSubmit, watch } = formd

    const MUTATEUSER = useMutation({
        mutationFn: async (datos: z.infer<typeof SchemaUser>) => {
            const { data } = await InstanceAxios.post('auth/register', datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        },
        onSuccess: (data) => {
            const { success, message } = data
            if (success) {
                toast.success(message)
                close()
                return queryClient.refetchQueries()
            }
            toast.warning(message ?? 'Error al crear el usuario')
        },
        onError: (Error: Errors) => {
            const {
                response: {
                    data: { message },
                },
            } = Error
            toast.error(message)
        },
    })

    function OnSubmit(data: z.infer<typeof SchemaUser>) {
        MUTATEUSER.mutate(data)
    }

    return (
        <>
            <Form {...formd}>
                <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="user"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Usuario"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Contraseña"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <FormField
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar el rol del usuario" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ROLE).map((role) => (
                                                <SelectItem
                                                    key={role}
                                                    value={role}
                                                >
                                                    {role}
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Verificar que el email sea correcto,
                                        ademas que el email debe ser unico
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {watch('role') == ROLE.CLIENTE && (
                        <ItemCompany control={control} />
                    )}

                    <footer className="grid grid-cols-2 gap-4 mt-5">
                        <Button onClick={close} variant="ghost">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={MUTATEUSER.isPending}>
                            Confirmar
                        </Button>
                    </footer>
                </form>
            </Form>
        </>
    )
}

function ModalUser({
    state,
    setState,
}: {
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <AlertDialog open={state} onOpenChange={setState}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Crear un nuevo usuario en el sistema
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Crear un nuevo usuario
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <FormUser close={() => setState(false)} />
            </AlertDialogContent>
        </AlertDialog>
    )
}

function ItemCompany({
    control,
}: {
    control: Control<z.infer<typeof SchemaUser>>
}) {
    const [DataCompany, setDataCompany] = useState<company[]>([])
    useEffect(() => {
        async function GetCompanies() {
            const { data } = await InstanceAxios.get('companies')
            setDataCompany(data.data)
        }
        GetCompanies()
    }, [])

    return (
        <FormField
            control={control}
            name="companyId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar la empresa del cliente" />
                            </SelectTrigger>
                        </FormControl>
                        {DataCompany.length !== 0 && (
                            <SelectContent>
                                {DataCompany.map((company: company) => (
                                    <SelectItem
                                        key={company.id}
                                        value={company.id}
                                    >
                                        {company.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                        {DataCompany.length === 0 && (
                            <SelectContent>
                                <SelectItem value="0">
                                    No hay empresas registradas
                                </SelectItem>
                            </SelectContent>
                        )}
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
