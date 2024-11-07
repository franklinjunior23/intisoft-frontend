import { InstanceAxios } from '@/helper/axios-config'
import { GetKnowledgeResponse } from '@/types/knowledge'
import { useQuery } from '@tanstack/react-query'

export function GetKnowledge() {
    return useQuery<GetKnowledgeResponse>({
        queryKey: ['knowledge'],
        queryFn: async () => {
            const response = await InstanceAxios('knowledge')
            return response.data
        },
    })
}
