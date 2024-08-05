import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { UpdateStatus } from '@/pages/branch/action/device-actiion.service'
import { deviceStatus } from '@/types/device'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface StatusItemProps {
    statusDevice: deviceStatus
    id: string
    close: () => void
}

export function StatusItem({ id, statusDevice, close }: StatusItemProps) {
    const STATUS = Object.values(deviceStatus)

    const client = useQueryClient()
    const MUTATE = useMutation({
        mutationFn: async (status: deviceStatus) => {
            return await UpdateStatus(id, status)
        },
        onSuccess: (data) => {
            client.refetchQueries()
            if (data.success) {
                toast.success(data.message ?? 'Estado actualizado')
                return close()
            }
            toast.info(data.message ?? 'Estado actualizado')
            return close()
        },
        onError: (error) => {
            console.log(error)
            toast.error('Error al actualizar el estado')
        },
    })
    function handle(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        status: deviceStatus
    ) {
        e.preventDefault()
        MUTATE.mutate(status)
    }

    return STATUS.map((status) => (
        <DropdownMenuCheckboxItem
            key={status}
            checked={status === statusDevice}
            onClick={(e) => handle(e, status)}
        >
            {status}
        </DropdownMenuCheckboxItem>
    ))
}
