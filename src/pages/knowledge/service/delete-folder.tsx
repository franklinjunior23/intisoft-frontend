import { InstanceAxios } from '@/helper/axios-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
type FolderDeleteProps = {
    onSuccess?: (data: { success: boolean; message: string }) => void
    onError?: (data) => void
}

export function DeleteFold({ onSuccess, onError }: FolderDeleteProps) {
    const queryclien = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await InstanceAxios.delete(
                `knowledge/folder/${id}`
            )
            return response.data
        },
        onSuccess: (data) => {
            queryclien.refetchQueries()
            if (data) onSuccess(data)
        },
        onError: (error) => {
            if (error) onError(error)
        },
    })
}
