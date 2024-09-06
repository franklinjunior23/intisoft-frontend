import { KeyQuerys } from '@/constants/keys-query'
import { InstanceAxios } from '@/helper/axios-config'
import { UseAuth } from '@/providers/auth.provider'
import { UsersLoged } from '@/types/users-loged'
import { useQuery } from '@tanstack/react-query'

export function GetAdministrators() {
    const { token } = UseAuth()
    return useQuery<UsersLoged[]>({
        queryKey: [KeyQuerys.getAdministrators],
        queryFn: async () => {
            console.log(token)
            const { data } = await InstanceAxios.get('/auth', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        },
    })
}
