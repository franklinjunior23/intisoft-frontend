import { KeyQuerys } from '@/constants/keys-query'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { InstanceAxios } from '@/helper/axios-config'
import { useQuery } from '@tanstack/react-query'

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

export async function DeleteDevice(id:string){
    const {data} = await InstanceAxios.delete(`device/${id}`)
    return data
}
