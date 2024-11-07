import { InstanceAxios } from '@/helper/axios-config'
import { z } from 'zod'
import SchemaUser from '../../../validate/user-validate'
import { useMutation } from '@tanstack/react-query'

export async function createUser(datos: z.infer<typeof SchemaUser>) {
    const { data } = await InstanceAxios.post('user', {
        ...datos,
        gender: Boolean(datos.gender === 'Masculino' ? true : false),
        areaId: Number(datos.areaId),
    })
    return data
}

type mutationUpdate = {
    onSuccess?: (data: { success: boolean; message: string }) => void
    onError?: (data) => void
}

export function UpdateUser(id: string, { onSuccess, onError }: mutationUpdate) {
    return useMutation({
        mutationFn: async ({
            gender,
            areaId,
            ...datos
        }: z.infer<typeof SchemaUser>) => {
            const response = await InstanceAxios.patch(`user/${id}`, {
                gender: gender === 'Masculino' ? true : false,
                areaId: Number(areaId),
                ...datos,
            })
            return response.data
        },
        onSuccess: (data) => {
            if (data) onSuccess(data)
        },
        onError: (error) => {
            if (error) onError(error)
        },
    })
}
