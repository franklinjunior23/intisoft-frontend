import { KeyQuerys } from '@/constants/keys-query'
import { LocalStorageKeys } from '@/constants/localstorage-keys'
import { InstanceAxios } from '@/helper/axios-config'
import { GetUserType } from '@/types/users'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

/**
 * Retrieves a list of users by branch.
 * @returns A query object that can be used to fetch the users.
 */
export function GetUsers() {
    return useQuery<GetUserType>({
        queryKey: [KeyQuerys.getUsersByBranch],
        queryFn: async () => {
            const { data } = await InstanceAxios.get(
                `user?branchId=${localStorage.getItem(LocalStorageKeys.branch)}`
            )
            return data
        },
    })
}

export function GetOneUser() {
    const { userId } = useParams()
    return useQuery({
        queryKey: [KeyQuerys.getUserByOne],
        queryFn: async () => {
            const { data } = await InstanceAxios.get(
                `user/${userId}`
            )
            return data
        },
    })
}
