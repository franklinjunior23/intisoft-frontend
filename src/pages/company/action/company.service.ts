import { KeyQuerys } from '@/constants/keys-query'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { InstanceAxios } from '@/helper/axios-config'
import type { BranchsGet } from '@/types/branchs'
import { useQuery } from '@tanstack/react-query'

export function BranchsGet() {
    const company = localStorage.getItem(LocalStorageKeys.company)

    return useQuery<BranchsGet>({
        queryKey: [KeyQuerys.getBranchsByCompany],
        queryFn: async () => {
            const response = await InstanceAxios(`companies/${company}`)
            return response.data
        },
    })
}

export async function CreateBranch({ name }: { name: string }) {
    const idBranch = localStorage.getItem(LocalStorageKeys.company)
    const { data } = await InstanceAxios.post('branchs', {
        companyId: idBranch,
        name: name,
    })
    return data
}
