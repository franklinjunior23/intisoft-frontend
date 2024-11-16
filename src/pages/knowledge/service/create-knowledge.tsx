import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { SchemaKnowledge } from '../components/options/knowledge.schema'
import { InstanceAxios } from '@/helper/axios-config'

type CreateKnowledgeProps = {
    onSucces: (data) => void
    onError?: (error) => void
}

export function CreateKnowledge({ onSucces, onError }: CreateKnowledgeProps) {
    const clientQuery = useQueryClient()
    return useMutation({
        mutationFn: async (data: z.infer<typeof SchemaKnowledge>) => {
            const request = await InstanceAxios.post('knowledge', {
                ...data,
                category: data.category.map((cat) => cat.name),
            })
            return request.data
        },
        onError: (error) => {
            if (onError) onError(error)
        },
        onSuccess: (data) => {
            clientQuery.refetchQueries()
            onSucces(data)
        },
    })
}
