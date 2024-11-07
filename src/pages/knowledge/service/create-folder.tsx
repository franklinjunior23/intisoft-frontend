import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { SchemaFolder } from '../components/options/folder-add'
import { InstanceAxios } from '@/helper/axios-config'

type FolderAddProps = {
    onSuccess?: (data: { success: boolean; message: string }) => void
    onError?: (data) => void
}

export function PostFolder({ onError, onSuccess }: FolderAddProps) {
    const queryclien = useQueryClient()
    return useMutation({
        mutationFn: async (data: z.infer<typeof SchemaFolder>) => {
            const response = await InstanceAxios.post('knowledge/folder', data)
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
