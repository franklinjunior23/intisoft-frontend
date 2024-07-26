import { KeyQuerys } from '@/constants/keys-query'
import { InstanceAxios } from '@/helper/axios-config'
import { UseAuth } from '@/providers/auth.provider'
import { CompanyGet } from '@/types/company'
import { useQuery } from '@tanstack/react-query'

export function GetCompanyClient() {
    const { profile } = UseAuth()
    console.log(profile)
    return useQuery<CompanyGet>({
        queryKey: [KeyQuerys.getCompanyByClient],
        queryFn: async () => {
            const response = await InstanceAxios(
                `companies/${profile?.company}`
            )
            return response.data
        },
    })
}
