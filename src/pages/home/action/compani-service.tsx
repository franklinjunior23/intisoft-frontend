import { InstanceAxios } from '@/helper/axios-config'
import { CompaniesGet } from '@/types/company'
import { useQuery } from '@tanstack/react-query'

export function GetCompanies() {
    return useQuery<CompaniesGet>({
        queryKey: ['companies'],
        queryFn: async () => {
            const response = await InstanceAxios('companies'
            )
            return response.data
        },
    })
}
