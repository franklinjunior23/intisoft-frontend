import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InstanceAxios } from '@/helper/axios-config'
import { UsersLoged } from '@/types/users-loged'
import { useMutation } from '@tanstack/react-query'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Action({ user }: { user: UsersLoged | null }) {
    const [OpenEdit, setOpenEdit] = useState<boolean>(false)
    return (
        <DropdownMenu open={OpenEdit} onOpenChange={setOpenEdit}>
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}>
                    <EllipsisVertical className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <span>Editar</span>
                    </DropdownMenuItem>
                    <DeleteUser id={user.id} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function DeleteUser({ id }: { id: string }) {
    const [OpenConfirm, setOpenConfirm] = useState<boolean>(false)

    const DELETEUSERLOGEG = useMutation({
        mutationFn: async (id: string) => {
            return await InstanceAxios.delete(`/auth/${id}`)
        },
        onSuccess: ({ data }) => {
            const { success, message } = data
            if (success) {
                setOpenConfirm(false)
                toast.success(message)
            }
        },
        onError: (data) => {
            const { name } = data
            console.log(name)
            toast.error(name)
        },
    })

    return (
        <>
            <DropdownMenuItem
                onClick={(e) => {
                    e.preventDefault()
                    setOpenConfirm(true)
                }}
            >
                <span>Eliminar</span>
            </DropdownMenuItem>
            <Dialog open={OpenConfirm} onOpenChange={setOpenConfirm}>
                <DialogContent>
                    <div className="">
                        <h2 className="text-xl font-bold">Eliminar Usuario</h2>
                        <p className="text-sm my-2">
                            <p className="text-sm mt-2">
                                Esta acción es irreversible y eliminará
                                permanentemente toda la información asociada con
                                este usuario. ¿Estás seguro de que deseas
                                continuar?
                            </p>
                        </p>
                    </div>
                    <DialogFooter className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => setOpenConfirm(false)}
                            variant={'ghost'}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant={'destructive'}
                            onClick={() => {
                                DELETEUSERLOGEG.mutate(id)
                            }}
                        >
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
