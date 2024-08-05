import { KeyQuerys } from '@/constants/keys-query'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { InstanceAxios } from '@/helper/axios-config'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { SchemaDevice } from '../inventory/validate/device-validate'

export function GetDevice() {
    return useQuery({
        queryKey: [KeyQuerys.getDeviceByBranch],
        queryFn: async () => {
            const { data } = await InstanceAxios.get(
                `device?branchId=${localStorage.getItem(LocalStorageKeys.branch)}`
            )
            return data
        },
    })
}

export async function DeleteDevice(id: string) {
    const { data } = await InstanceAxios.delete(`device/${id}`)
    return data
}

export async function UpdateStatus(id: string, status: string) {
    const { data } = await InstanceAxios.patch(`device/${id}`, { status })
    return data
}

export async function ActionCreate(data: z.infer<typeof SchemaDevice>) {
    const { data: response } = await InstanceAxios.post(`device`, {
        ...data,
        dateCreated:   new Date(data.dateCreated)
    })
    return response
}
