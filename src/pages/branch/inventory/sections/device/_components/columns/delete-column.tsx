import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DeleteDevice } from '@/pages/branch/action/device-actiion.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
interface DeleteItemProps {
    id: string
    close: () => void
}

export function DeleteItem({ id, close }: DeleteItemProps) {
    const client = useQueryClient()
    const MUTATE = useMutation({
        mutationFn: async () => {
            return await DeleteDevice(id)
        },
        onSuccess: (data) => {
            client.refetchQueries()
            if (data.success) {
                toast.success(data.message ?? 'Dispositivo eliminado')
                return close()
            }
            toast.info(data.message ?? 'Dispositivo eliminado')
            return close()
        },
        onError: (error) => {
            console.log(error)
            toast.error('Error al eliminar el dispositivo')
        },
    })

    function handleDelete() {
        MUTATE.mutate()
    }

    return (
        <DropdownMenuItem onClick={handleDelete}>
            {MUTATE.isPending ? 'Eliminando...' : 'Eliminar'}
        </DropdownMenuItem>
    )
}
