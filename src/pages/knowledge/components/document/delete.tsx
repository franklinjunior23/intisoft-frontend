import { ContextMenuItem } from '@/components/ui/context-menu'
import { InstanceAxios } from '@/helper/axios-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

export function DeleteDocument({ id }: { id: string }) {
    const { isPending, mutate } = DeleteService({
        onSuccess(data) {
            if (data?.success) {
                toast.success(data?.message)
            }
        },
        onError(error) {
            toast.error(error?.message)
        },
    })
    return (
        <ContextMenuItem onClick={() => mutate(id)}>
            <div className="flex gap-2 items-center">
                <Trash className="h-4 w-4" />
                {isPending ? 'Eliminando...' : 'Eliminar'}
            </div>
        </ContextMenuItem>
    )
}

function DeleteService({ onSuccess, onError }: DeleteDocumentProps) {
    const clientQuery = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await InstanceAxios.delete(`knowledge/${id}`)
            return res.data
        },
        onError: (error) => {
            if (onError) onError(error)
        },
        onSuccess: (data) => {
            onSuccess(data)
            clientQuery.refetchQueries()
        },
    })
}

type DeleteDocumentProps = {
    onSuccess: (data) => void
    onError?: (error) => void
}
