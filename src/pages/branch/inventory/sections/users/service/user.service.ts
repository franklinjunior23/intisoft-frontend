import { InstanceAxios } from '@/helper/axios-config'
import { z } from 'zod'
import SchemaUser from '../../../validate/user-validate'

export async function createUser(datos: z.infer<typeof SchemaUser>) {
    const { data } = await InstanceAxios.post('user', {
        ...datos,
        gender: Boolean(datos.gender === 'Masculino' ? true : false),
        areaId: Number(datos.areaId),
    })
    return data
}
