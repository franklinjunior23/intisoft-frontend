import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import SchemaProfile from '../validate-profile'
import { InstanceAxios } from '@/helper/axios-config'
import { UseAuth } from '@/providers/auth.provider'

interface ProfileServiceProps {
    succes?: (data: unknown) => void
    error?: (error: Error) => void
}

export function ProfileService({ error, succes }: ProfileServiceProps) {
    const { token } = UseAuth()
    return useMutation({
        mutationFn: async (datos: z.infer<typeof SchemaProfile>) => {
            const { data } = await InstanceAxios.patch('profile', datos, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        },
        onSuccess: (data) => {
            if (succes) {
                succes(data)
            }
        },
        onError: (err) => {
            if (error) {
                error(err)
            }
        },
    })
}
