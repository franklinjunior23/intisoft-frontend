import { useMutation, useQueryClient } from '@tanstack/react-query'

import { InstanceAxios } from '@/helper/axios-config'
import { SchemaDevice } from '../../../validate/device-validate'
import { z } from 'zod'

type DeviceProps = {
    onSuccess?: () => void
    onError?: () => void
}

export function PutDevice({ onError, onSuccess }: DeviceProps) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: z.infer<typeof SchemaDevice>) => {
            const { id, branchId, ...body } = data
            const response = await InstanceAxios.patch(`device/${id}`, body)
            return response.data
        },
        onSuccess: (data) => {
            queryClient.refetchQueries()
            if (data) onSuccess()
        },
        onError: (error) => {
            if (error) onError()
        },
    })
}
