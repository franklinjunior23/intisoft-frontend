import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputDinamic from '@/components/ui/input-search'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { gender, StatusUser, typedocument } from '@/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircleIcon } from 'lucide-react'
import { Control, FieldValues, useForm } from 'react-hook-form'
import { TYPEPOST } from '../data/data.user'
import { DialogClose } from '@radix-ui/react-dialog'
import SchemaUser from '@/pages/branch/inventory/validate/user-validate'
import { z } from 'zod'
import FieldsEmail from './form/field-email'
import FieldArea from './form/field-area'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../service/user.service'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { toast } from 'sonner'
import { useState } from 'react'
import { DeviceVincule } from './form/add-device'

function FormUser({ CloseDialog }: { CloseDialog: () => void }) {
    const typedoc = Object.values(typedocument)
    const typegender = Object.values(gender)
    const statusUser = Object.values(StatusUser)
    const client = useQueryClient()
    const formd = useForm<z.infer<typeof SchemaUser>>({
        resolver: zodResolver(SchemaUser),
        defaultValues: {
            email: [{ type: 'Gmail', direction: '', password: '' }],
            branchId: localStorage.getItem(LocalStorageKeys.branch)!,
        },
    })

    const CREATEUSER = useMutation({
        mutationFn: async (datos: z.infer<typeof SchemaUser>) => {
            return await createUser(datos)
        },
        onSuccess: (data) => {
            if (!data.success)
                return toast.info(data.message ?? 'Error al crear un usuario ')
            toast.success(data.message)
            client.refetchQueries()
            CloseDialog()
        },
        onError: (err) => {
            toast.error(err.message)
        },
    })
    function Submit(data: z.infer<typeof SchemaUser>) {
        CREATEUSER.mutate(data)
    }
    return (
        <Form {...formd}>
            <form onSubmit={formd.handleSubmit(Submit)} className="w-full">
                <div className="grid md:grid-cols-2 gap-2 items-start">
                    <div className="grid grid-cols-2 gap-y-3 gap-2">
                        <FormField
                            name="name"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nombre .."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Apellido .."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="document.type"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Documento</FormLabel>
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
                                            {typedoc.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="document.number"
                            control={formd.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>N. de Documento</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Numero de documento .."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-2 gap-y-3 gap-2">
                            <FormField
                                name="gender"
                                control={formd.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genero</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar el Genero" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {typegender.map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="post"
                                control={formd.control}
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
                                name="status"
                                defaultValue={StatusUser.ACTIVE}
                                control={formd.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Estado del usuario
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione el estado del usuario" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statusUser.map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                   <div className='max-h-[200px] overflow-y-auto'>
                     <FieldsEmail
                         control={
                             formd.control as unknown as Control<FieldValues>
                         }
                     />
                   </div>
                    <div>
                        <FieldArea
                            control={
                                formd.control as unknown as Control<FieldValues>
                            }
                        />
                        <DeviceVincule control={formd.control} />
                    </div>
                </div>

                <DialogFooter className="mt-5">
                    <Button type="submit">Crear Usuarios</Button>
                    <DialogClose asChild>
                        <Button variant={'ghost'}>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default function AddUser() {
    const [StateDialog, setStateDialog] = useState<boolean>(false)

    function Close() {
        setStateDialog(false)
    }

    return (
        <div>
            <Dialog open={StateDialog} onOpenChange={setStateDialog}>
                <DialogTrigger asChild>
                    <Button size={'icon'}>
                        <PlusCircleIcon className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle>Crear Usuarios</DialogTitle>
                        <DialogDescription>
                            Crear un nuevo usuario
                        </DialogDescription>
                    </DialogHeader>

                    <FormUser CloseDialog={Close} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
