import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UseAuth } from '@/providers/auth.provider'
import { ROLE } from '@/types/role'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical } from 'lucide-react'
import { deleteCompany } from '../action/company.service'
import { toast } from 'sonner'

interface EditCompany {
    id: string
    editing: () => void
}

export default function EllipsisEdit({ id, editing }: EditCompany) {
    const { profile } = UseAuth()
    const client = useQueryClient()

    const DELETCOMP = useMutation({
        mutationFn: async () => {
            return deleteCompany(id)
        },
        onSuccess: (data) => {
            if (!data.success)
                return toast.info(`No se pudo eliminar , ${data?.message}`)

            client.refetchQueries()
            return toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
    function deletecomp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault()
        DELETCOMP.mutate()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'link'} size={'icon'}>
                    <EllipsisVertical className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={editing}>
                        Editar
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>Reporte</DropdownMenuItem>
                {profile?.role === ROLE.ADMIN && (
                    <DropdownMenuItem onClick={deletecomp}>
                        {DELETCOMP.isPending ? 'Eliminando ...' : 'Eliminar'}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
