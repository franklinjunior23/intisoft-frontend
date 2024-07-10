import { InstanceAxios } from '@/helper/axios-config'
import { sign } from '@/types/sign'

export async function SignIn(body: sign) {
    const { data } = await InstanceAxios.post('auth/sign-in', body)
    return data
}
