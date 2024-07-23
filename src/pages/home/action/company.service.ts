import { KeyQuerys } from '@/constants/keys-query'
import { InstanceAxios } from '@/helper/axios-config'
import { CompaniesGet, CompanyCreate, type editCompany } from '@/types/company'
import { useQuery } from '@tanstack/react-query'

export function GetCompanies() {
    return useQuery<CompaniesGet>({
        queryKey: [KeyQuerys.getCompanies],
        queryFn: async () => {
            const response = await InstanceAxios('companies')
            return response.data
        },
    })
}

export async function createCompany(dato: CompanyCreate) {
    const response = await InstanceAxios.post('companies', dato)
    return response.data
}

export async function editCompany({ id, ...datos }: editCompany) {
    const { data } = await InstanceAxios.put(`companies/${id}`, datos)
    return data
}

export async function deleteCompany(id: string) {
    const response = await InstanceAxios.delete(`companies/${id}`)
    return response.data
}
